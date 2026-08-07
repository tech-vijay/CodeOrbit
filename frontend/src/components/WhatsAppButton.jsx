const WHATSAPP_NUMBER = '917317651331';
const DEFAULT_MESSAGE = "Hello Code Orbit, I would like to know more about your services.";

function WhatsAppIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M16.02 3.2a12.74 12.74 0 0 0-10.99 19.2L3.2 28.8l6.55-1.72A12.8 12.8 0 1 0 16.02 3.2Zm0 23.35c-2.04 0-4.03-.55-5.76-1.58l-.41-.24-3.89 1.02 1.04-3.78-.27-.4a10.47 10.47 0 1 1 9.29 4.98Zm5.74-7.83c-.31-.16-1.85-.91-2.14-1.02-.29-.1-.5-.16-.71.16-.21.31-.81 1.02-1 1.23-.18.21-.37.24-.68.08-1.84-.92-3.05-1.64-4.27-3.72-.32-.55.32-.51.91-1.7.1-.21.05-.39-.03-.55-.08-.16-.71-1.7-.97-2.33-.26-.62-.53-.54-.71-.55h-.61c-.21 0-.55.08-.84.39-.29.31-1.1 1.08-1.1 2.63s1.13 3.05 1.29 3.26c.16.21 2.22 3.38 5.38 4.74 2 .86 2.79.93 3.79.78.61-.09 1.85-.76 2.11-1.5.26-.73.26-1.36.18-1.5-.08-.13-.29-.21-.6-.37Z" />
    </svg>
  );
}

export default function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Code Orbit on WhatsApp"
      className="group fixed bottom-[5.25rem] right-5 sm:bottom-24 sm:right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-green-700/30 transition-transform duration-300 hover:scale-110 hover:bg-[#1ebe5a] focus:outline-none focus:ring-4 focus:ring-green-400/40"
    >
      <WhatsAppIcon className="h-7 w-7" />
      <span className="absolute right-[calc(100%+0.75rem)] whitespace-nowrap rounded-lg bg-slate-950 px-3 py-2 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">Chat on WhatsApp</span>
    </a>
  );
}
