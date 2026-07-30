import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import webDevelopmentHero from '@/assets/web-development-hero.png';

const slides = [
  { eyebrow: 'Digital Marketing Excellence', title: 'Elevate Your Online Presence', subtitle: 'Transform Your Brand With Code Orbit', image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop' },
  { eyebrow: 'Expert Web & App Development', title: 'Build Better Digital Experiences', subtitle: 'Code Orbit Your Path to Success', image: webDevelopmentHero },
  { eyebrow: 'Grow Your Business Online', title: 'Data-Driven Growth Strategies', subtitle: 'Partner With Code Orbit Today', image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop' },
];

export default function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-slate-950">
      {slides.map((slide, i) => (
        <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ${i === active ? 'opacity-100' : 'opacity-0'}`}>
          <img src={slide.image} alt="" className={`h-full w-full object-cover ${i === 1 ? 'object-[70%_center]' : ''}`} loading={i === 0 ? 'eager' : 'lazy'} />
          <div className={`absolute inset-0 ${i === 1 ? 'bg-gradient-to-r from-slate-950 via-slate-950/60 to-slate-950/5' : 'bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/40'}`} />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/60" />
        </div>
      ))}

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-5 pt-24 sm:px-8">
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 backdrop-blur-sm">
            <div className="flex">{[0,1,2,3,4].map((s) => <Star key={s} className="h-3.5 w-3.5 fill-cyan-400 text-cyan-400" />)}</div>
            <span className="text-xs font-medium text-cyan-200">Rated 5.0 by 250+ clients</span>
          </div>
          <p key={`eyebrow-${active}`} className="mb-4 text-lg font-medium text-cyan-400 animate-[fadeUp_0.8s_ease]">{slides[active].eyebrow}</p>
          <h1 key={`title-${active}`} className="text-4xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-6xl animate-[fadeUp_0.8s_ease]">{slides[active].title}</h1>
          <p key={`sub-${active}`} className="mt-5 text-xl text-slate-300 animate-[fadeUp_0.8s_ease]">{slides[active].subtitle}</p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-400">We are a full-service digital marketing agency helping brands rank higher, convert better, and grow faster — with SEO, PPC, web development, content, and social media under one roof.</p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link to="/contact" className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 px-7 py-3.5 text-base font-semibold text-white shadow-xl shadow-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/50 hover:brightness-110">
              Get a Free Consultation <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <a href="#services" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/10">Explore Services</a>
          </div>
        </div>
        <div className="mt-12 flex gap-3">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} aria-label={`Go to slide ${i + 1}`} className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? 'w-10 bg-cyan-400' : 'w-4 bg-white/30 hover:bg-white/50'}`} />
          ))}
        </div>
      </div>
      <style>{`@keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </section>
  );
}
