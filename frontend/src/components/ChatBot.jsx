import { useEffect, useRef, useState } from 'react';
import { MessageCircle, X, Send, Sparkles, Loader2, Paperclip, XCircle } from 'lucide-react';
import { api } from '@/lib/api';

const SESSION_KEY = 'dp_chat_session';

function getOrCreateSessionId() {
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = `sess_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  
  // New state for image handling
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);
  const sessionIdRef = useRef(getOrCreateSessionId());

  useEffect(() => {
    async function loadHistory() {
      try {
        const res = await api.getChatHistory(sessionIdRef.current);
        const history = res.history || [];
        if (history.length > 0) {
          setHasGreeted(true);
          setMessages(history.map((m) => ({
            id: m.id || `${m.role}_${m.timestamp}`,
            role: m.role,
            content: m.content || '',
            imageUrl: m.imageUrl || null,
          })));
        }
      } catch { /* ignore */ }
    }
    loadHistory();
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, typing]);

  useEffect(() => {
    if (open && inputRef.current) setTimeout(() => inputRef.current?.focus(), 200);
  }, [open]);

  async function greet() {
    if (hasGreeted) return;
    setHasGreeted(true);
    const greeting = "Hello! I can now understand images. Try uploading one!";
    setMessages((prev) => [...prev, { id: `greet_${Date.now()}`, role: 'assistant', content: greeting }]);
  }

  function handleOpen() {
    setOpen(true);
    if (!hasGreeted) setTimeout(() => greet(), 400);
  }

  function handleFileSelect(event) {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setMessages((prev) => [...prev, {
          id: `file_error_${Date.now()}`,
          role: 'assistant',
          content: 'Please choose an image file (JPEG, PNG, GIF, or WEBP).',
        }]);
        event.target.value = '';
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      inputRef.current?.focus();
    }
  }

  function removeImage() {
    setImageFile(null);
    setImagePreview(null);
    if(fileInputRef.current) fileInputRef.current.value = '';
  }

  async function sendMessage() {
    const text = input.trim();
    if (!text && !imageFile) return;

    const userMessage = {
      id: `user_${Date.now()}`,
      role: 'user',
      content: text,
      imageUrl: imagePreview, // Use local preview for immediate display
    };
    
    setInput('');
    setMessages((prev) => [...prev, userMessage]);
    setTyping(true);
    
    let finalImageUrl = null;

    try {
      if (imageFile) {
        setUploading(true);
        const uploadRes = await api.uploadImage(imageFile);
        finalImageUrl = uploadRes.imageUrl;
        // Update the message with the final URL for consistency, though not strictly needed for display
        setMessages(prev => prev.map(m => m.id === userMessage.id ? { ...m, imageUrl: finalImageUrl } : m));
        setUploading(false);
      }
      
      removeImage(); // Clear image after starting the request

      const res = await api.chat({
        message: text,
        imageUrl: finalImageUrl,
        sessionId: sessionIdRef.current,
      });

      setMessages((prev) => [...prev, { id: `bot_${Date.now()}`, role: 'assistant', content: res.reply }]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message.toLowerCase() : '';
      const errorContent = err?.status === 429
        ? err.message
        : errorMessage.includes('upload') || errorMessage.includes('image')
        ? "Sorry, I couldn't upload that image. Please try another one."
        : "I'm having trouble reaching the service right now. Please contact us directly.";
      setMessages((prev) => [...prev, { id: `err_${Date.now()}`, role: 'assistant', content: errorContent }]);
    } finally {
      setTyping(false);
      setUploading(false);
      removeImage();
    }
  }

  function handleSubmit(e) { e.preventDefault(); sendMessage(); }

  return (
    <>
      <button onClick={() => (open ? setOpen(false) : handleOpen())} aria-label={open ? 'Close chat' : 'Open chat'} className={`fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-[60] flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full shadow-xl transition-all duration-300 ${open ? 'bg-slate-800 text-white rotate-90' : 'bg-gradient-to-br from-cyan-400 to-blue-600 text-white shadow-cyan-500/40 hover:scale-110 hover:shadow-cyan-500/60'}`}>
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
      {open && (
        <div className="fixed bottom-20 sm:bottom-24 right-3 sm:right-6 z-[60] flex h-[min(580px,80vh)] w-[calc(100vw-1.5rem)] sm:w-[390px] max-w-[390px] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/20 animate-[slideUp_0.3s_ease]">
          <div className="flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-3.5 sm:px-5 sm:py-4">
            <span className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm"><Sparkles className="h-5 w-5 text-white" /></span>
            <div>
              <p className="text-sm font-bold text-white">Code Orbit Support</p>
              <p className="flex items-center gap-1.5 text-xs text-cyan-50"><span className="h-2 w-2 rounded-full bg-green-400" />Online now</p>
            </div>
          </div>
          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto bg-slate-50 px-3.5 py-4 sm:px-4 sm:py-5">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex items-end gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                {msg.role !== 'user' && <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-600"><Sparkles className="h-4 w-4 text-white" /></span>}
                <div className={`max-w-[78%]`}>
                  <div className={`rounded-2xl px-3 py-2 text-sm leading-relaxed shadow-sm ${msg.role === 'user' ? 'rounded-br-md bg-gradient-to-br from-cyan-400 to-blue-600 text-white' : 'rounded-bl-md bg-white text-slate-700'}`}>
                    {msg.imageUrl && (
                      <img src={msg.imageUrl} alt="User upload" className="mb-2 rounded-lg border border-white/20" />
                    )}
                    {msg.content && msg.content.split('\n').map((line, i) => <p key={i}>{line}</p>)}
                  </div>
                </div>
              </div>
            ))}
            {typing && !uploading && (
              <div className="flex items-end gap-2">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-600"><Sparkles className="h-4 w-4 text-white" /></span>
                <div className="rounded-2xl rounded-bl-md bg-white px-4 py-3 shadow-sm"><div className="flex gap-1"><span className="h-2 w-2 animate-bounce rounded-full bg-slate-300 [animation-delay:-0.3s]" /><span className="h-2 w-2 animate-bounce rounded-full bg-slate-300 [animation-delay:-0.15s]" /><span className="h-2 w-2 animate-bounce rounded-full bg-slate-300" /></div></div>
              </div>
            )}
          </div>
          <div className="border-t border-slate-100 bg-white p-2.5 sm:p-3">
            {imagePreview && (
              <div className="relative mb-2 w-fit">
                <img src={imagePreview} alt="Preview" className="h-16 w-16 sm:h-20 sm:w-20 rounded-md object-cover" />
                <button onClick={removeImage} className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-white transition-transform hover:scale-110"><XCircle className="h-4 w-4" /></button>
              </div>
            )}
            <form onSubmit={handleSubmit} className="flex items-center gap-1.5 sm:gap-2">
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
              <button type="button" onClick={() => fileInputRef.current?.click()} disabled={typing || uploading} className="flex h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"><Paperclip className="h-4 w-4 sm:h-5 sm:w-5" /></button>
              <input ref={inputRef} type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder={uploading ? "Uploading..." : "Type a message..."} className="min-w-0 flex-1 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-2 sm:px-4 sm:py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-cyan-400" disabled={typing || uploading} />
              <button type="submit" disabled={(!input.trim() && !imageFile) || typing || uploading} className="flex h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 text-white transition-all disabled:opacity-50">{uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}</button>
            </form>
          </div>
        </div>
      )}
      <style>{`@keyframes slideUp { from { opacity: 0; transform: translateY(16px) scale(0.96); } to { opacity: 1; transform: translateY(0) scale(1); } }`}</style>
    </>
  );
}
