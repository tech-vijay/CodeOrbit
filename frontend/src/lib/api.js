const DEPLOYED_API_URL = 'https://codeorbit-backend-jo5j.onrender.com/api';
const LOCAL_API_URL = 'http://localhost:5002/api';
const envApiUrl = import.meta.env.VITE_API_URL;
const isLocalhostApi = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?(\/|$)/i.test(envApiUrl || '');

function normalizeApiUrl(url) {
  const cleanUrl = url.replace(/\/$/, '');
  return cleanUrl.endsWith('/api') ? cleanUrl : `${cleanUrl}/api`;
}

const API_URL = normalizeApiUrl(
  import.meta.env.PROD && isLocalhostApi
    ? DEPLOYED_API_URL
    : envApiUrl || (import.meta.env.PROD ? DEPLOYED_API_URL : LOCAL_API_URL)
);

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    const error = new Error(data.error || `Request failed (${res.status})`);
    error.status = res.status;
    error.retryAfter = data.retry_after;
    throw error;
  }

  return res.json();
}

export const api = {
  // Generic form submission
  submitForm: (payload) =>
    request('/forms/submissions', { method: 'POST', body: JSON.stringify(payload) }),

  // Razorpay payments
  createOrder: (payload) =>
    request('/payments/create-order', { method: 'POST', body: JSON.stringify(payload) }),

  verifyPayment: (payload) =>
    request('/payments/verify', { method: 'POST', body: JSON.stringify(payload) }),

  // Gemini chatbot
  chat: ({ message, imageUrl, sessionId }) => {
    const payload = { message, image_url: imageUrl, session_id: sessionId };
    return request('/chat', { method: 'POST', body: JSON.stringify(payload) });
  },

  getChatHistory: (sessionId) =>
    request(`/chat/history?session_id=${sessionId}`),
  
  // New function for image uploads
  uploadImage: (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);
    // Let the browser set the 'Content-Type' header for multipart/form-data
    return fetch(`${API_URL}/upload`, {
      method: 'POST',
      body: formData,
    }).then(res => {
      if (!res.ok) {
        return res.json().then(data => {
          throw new Error(data.error || 'Image upload failed');
        });
      }
      return res.json();
    });
  },
};
