import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import FormSubmission from '../models/FormSubmission.js';
import fetch from 'node-fetch';

dotenv.config();

const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
  : null;
const DEFAULT_GEMINI_MODEL = 'gemini-2.5-flash';
const GEMINI_MODELS = [
  process.env.GEMINI_MODEL || DEFAULT_GEMINI_MODEL,
  DEFAULT_GEMINI_MODEL,
  'gemini-2.0-flash',
].filter((model, index, models) => model && models.indexOf(model) === index);
const MAX_OUTPUT_TOKENS = Number(process.env.GEMINI_MAX_OUTPUT_TOKENS || 500);
const CONTACT_FALLBACK =
  "I'm having trouble connecting right now. Please reach us at hello@digitalprisma.com or +91 89209 28177.";
const SYSTEM_INSTRUCTION =
  'You are a friendly and helpful assistant for Code Orbit, a full-service digital marketing and web development agency. ' +
  'Answer questions about Code Orbit, web development, app development, digital marketing, SEO, PPC, content creation, design, branding, ecommerce, and project inquiries. ' +
  'Keep answers concise, practical, and warm. When a user asks for pricing or a custom quote, ask for the project scope and suggest contacting the team. ' +
  'If you do not know the answer, say you will connect them with a human expert and share hello@codeorbit.com or +91 89209 28177.';

// In-memory store for chat histories (for a single session)
const chatHistories = {};

/**
 * Helper function to convert an image URL to a Gemini-compatible format.
 */
async function urlToGenerativePart(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch image from URL: ${response.statusText}`);
  }
  const mimeType = response.headers.get('content-type');
  if (!mimeType || !mimeType.startsWith('image/')) {
    throw new Error('URL does not point to a valid image file.');
  }
  const buffer = await response.arrayBuffer();
  return {
    inlineData: {
      data: Buffer.from(buffer).toString('base64'),
      mimeType,
    },
  };
}

/**
 * Saves a chat message to the database, including an optional image URL.
 */
async function saveChatMessage(sessionId, role, message, imageUrl = null) {
  try {
    await FormSubmission.create({
      source: 'chat',
      form_type: 'chat_message',
      raw: {
        sessionId,
        role,
        message,
        imageUrl, // Store the image URL
      },
      message: `[${role}] ${message ? message.substring(0, 100) : 'Image'}...`,
    });
  } catch (error) {
    console.error('Failed to save chat message:', error);
  }
}

/**
 * Converts stored message history to a format the Gemini API understands.
 * This version simplifies history by not including past images to save tokens.
 */
function toGeminiHistory(messages = []) {
  return messages.map((msg) => {
    const parts = [];
    if (msg.message) {
      parts.push({ text: msg.message });
    }
    return {
      role: msg.role === 'user' ? 'user' : 'model',
      parts,
    };
  });
}

function extractText(result) {
  const response = result?.response || result;
  if (typeof response?.text === 'string') return response.text;
  if (typeof response?.text === 'function') return response.text();

  const parts = response?.candidates?.[0]?.content?.parts || [];
  return parts.map((part) => part.text).filter(Boolean).join('\n').trim();
}

function buildGenerationConfig() {
  return {
    systemInstruction: SYSTEM_INSTRUCTION,
    maxOutputTokens: MAX_OUTPUT_TOKENS,
  };
}

/**
 * Calls the Gemini API with retry logic for transient errors.
 */
async function generateContentWithRetry(ai, models, request, retries = 5, delay = 1500) {
  let lastError;

  for (const [modelIndex, model] of models.entries()) {
    let retryDelay = delay;

    for (let i = 0; i < retries; i++) {
      try {
        return await ai.models.generateContent({ model, ...request });
      } catch (error) {
        lastError = error;

        if (error.status === 404 && modelIndex < models.length - 1) {
          console.warn(`Gemini model "${model}" is unavailable. Trying "${models[modelIndex + 1]}".`);
          break;
        }

        if (error.status === 503 && i < retries - 1) {
          console.warn(
            `Gemini API is unavailable (503). Retrying in ${retryDelay}ms... (${
              i + 1
            }/${retries})`
          );
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
          retryDelay *= 2; // Exponential backoff
        } else {
          console.error('Gemini API request failed:', JSON.stringify(error, null, 2));
          throw error;
        }
      }
    }
  }

  throw lastError;
}

export async function handleChat(req, res) {
  const { message, session_id: sessionId, image_url: imageUrl } = req.body;

  if ((!message && !imageUrl) || !sessionId) {
    return res.status(400).json({ error: 'Session ID and either a message or an image URL are required' });
  }
  if (!ai) {
    return res.status(503).json({ error: CONTACT_FALLBACK });
  }

  try {
    if (!chatHistories[sessionId]) {
      chatHistories[sessionId] = [];
    }

    const userParts = [];
    if (imageUrl) {
      const imagePart = await urlToGenerativePart(imageUrl);
      userParts.push(imagePart);
    }
    if (message) {
      userParts.push({ text: message });
    }

    const history = toGeminiHistory(chatHistories[sessionId]);
    const result = await generateContentWithRetry(
      ai,
      GEMINI_MODELS,
      {
        contents: [...history, { role: 'user', parts: userParts }],
        config: buildGenerationConfig(),
      }
    );
    
    const botMessage = extractText(result) || CONTACT_FALLBACK;

    // Update in-memory history and save to DB
    chatHistories[sessionId].push({ role: 'user', message, imageUrl });
    chatHistories[sessionId].push({ role: 'assistant', message: botMessage });

    await Promise.all([
      saveChatMessage(sessionId, 'user', message, imageUrl),
      saveChatMessage(sessionId, 'assistant', botMessage),
    ]);

    res.json({ reply: botMessage });
  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(503).json({ error: CONTACT_FALLBACK });
  }
}

export async function getChatHistory(req, res) {
  const { session_id: sessionId } = req.query;
  if (!sessionId) {
    return res.status(400).json({ error: 'session_id is required' });
  }

  try {
    const messages = await FormSubmission.find({
      source: 'chat',
      'raw.sessionId': sessionId,
    }).sort({ createdAt: 1 });

    const history = messages.map((msg) => ({
      id: msg._id,
      role: msg.raw.role,
      content: msg.raw.message,
      imageUrl: msg.raw.imageUrl || null,
      timestamp: msg.createdAt,
    }));

    res.json({ history });
  } catch (error) {
    console.error('Failed to get chat history:', error);
    res.status(500).json({ error: 'Failed to retrieve chat history.' });
  }
}
