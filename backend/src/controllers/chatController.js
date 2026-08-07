import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import FormSubmission from '../models/FormSubmission.js';
import fetch from 'node-fetch';

dotenv.config();

const DEFAULT_GEMINI_MODEL = 'gemini-2.5-flash';
const GEMINI_MODELS = [
  process.env.GEMINI_MODEL || DEFAULT_GEMINI_MODEL,
  DEFAULT_GEMINI_MODEL,
  'gemini-2.0-flash',
].filter((model, index, models) => model && models.indexOf(model) === index);
const MAX_OUTPUT_TOKENS = Number(process.env.GEMINI_MAX_OUTPUT_TOKENS || 500);
const CONTACT_FALLBACK =
  "Welcome to Code Orbit! For inquiries, reach us at codeorbitsoftwaresolutions@gmail.com or +91 73176 51331.";
const SYSTEM_INSTRUCTION =
  'You are a friendly and helpful assistant for Code Orbit, a full-service digital marketing and web development agency. ' +
  'Answer questions about Code Orbit, web development, app development, digital marketing, SEO, PPC, content creation, design, branding, ecommerce, and project inquiries. ' +
  'Keep answers concise, practical, and warm. When a user asks for pricing or a custom quote, ask for the project scope and suggest contacting the team. ' +
  'If you do not know the answer, say you will connect them with a human expert and share codeorbitsoftwaresolutions@gmail.com or +91 73176 51331.';

function getOfflineResponse(message = '') {
  const msg = message.toLowerCase();

  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
    return "Hello! Welcome to Code Orbit. How can we help you with your web, app, or digital marketing project today?";
  }
  if (msg.includes('price') || msg.includes('cost') || msg.includes('quote') || msg.includes('rate') || msg.includes('pricing')) {
    return "Our pricing depends on project scope and custom requirements. Reach out to us at codeorbitsoftwaresolutions@gmail.com or +91 73176 51331 for a custom estimate!";
  }
  if (msg.includes('service') || msg.includes('offer') || msg.includes('do you do') || msg.includes('what do you do')) {
    return "Code Orbit offers Web Development, Mobile App Development, Digital Marketing, SEO, UI/UX Design, and Custom Software Solutions. How can we assist your business?";
  }
  if (msg.includes('contact') || msg.includes('email') || msg.includes('phone') || msg.includes('number') || msg.includes('call') || msg.includes('reach')) {
    return "You can reach the Code Orbit team via email at codeorbitsoftwaresolutions@gmail.com or call us directly at +91 73176 51331.";
  }
  if (msg.includes('web') || msg.includes('website') || msg.includes('frontend') || msg.includes('react')) {
    return "We specialize in modern, high-performance web application development using React, Node.js, Next.js, and custom stack solutions!";
  }
  if (msg.includes('seo') || msg.includes('marketing') || msg.includes('ppc') || msg.includes('growth')) {
    return "Our digital marketing services include SEO optimization, PPC management, content creation, and targeted lead generation strategies.";
  }

  return CONTACT_FALLBACK;
}

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

function getApiErrorStatus(error) {
  return error?.status || error?.error?.code || error?.error?.status;
}

function getRetryAfterSeconds(error) {
  const retryInfo = error?.error?.details?.find(
    (detail) => detail?.['@type'] === 'type.googleapis.com/google.rpc.RetryInfo'
  );
  const retryDelay = retryInfo?.retryDelay;
  const seconds = typeof retryDelay === 'string' ? Number.parseFloat(retryDelay) : NaN;
  return Number.isFinite(seconds) && seconds > 0 ? Math.ceil(seconds) : null;
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

        const status = getApiErrorStatus(error);

        if (status === 404 && modelIndex < models.length - 1) {
          console.warn(`Gemini model "${model}" is unavailable. Trying "${models[modelIndex + 1]}".`);
          break;
        }

        if (status === 503 && i < retries - 1) {
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

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    const fallbackMessage = getOfflineResponse(message);
    if (!chatHistories[sessionId]) chatHistories[sessionId] = [];
    chatHistories[sessionId].push({ role: 'user', message, imageUrl });
    chatHistories[sessionId].push({ role: 'assistant', message: fallbackMessage });
    await Promise.all([
      saveChatMessage(sessionId, 'user', message, imageUrl),
      saveChatMessage(sessionId, 'assistant', fallbackMessage),
    ]);
    return res.json({ reply: fallbackMessage });
  }

  const ai = new GoogleGenAI({ apiKey });

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
    const status = getApiErrorStatus(error);
    const retryAfter = getRetryAfterSeconds(error);

    if (status === 429) {
      console.warn(`Gemini quota exceeded${retryAfter ? `. Retry after ${retryAfter}s.` : '.'}`);
      return res.status(429).json({
        error: retryAfter
          ? `The chat service is temporarily busy. Please try again in about ${retryAfter} seconds.`
          : 'The chat service is temporarily busy. Please try again shortly.',
        retry_after: retryAfter,
      });
    }

    console.error('Gemini API Error:', error);
    res.json({ reply: CONTACT_FALLBACK });
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
