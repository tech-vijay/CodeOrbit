import { Quote } from 'lucide-react';
import { testimonials } from '@/data/site';

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative overflow-hidden bg-slate-950 py-24">
      <div className="pointer-events-none absolute top-0 left-1/2 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-cyan-400">Testimonials</p>
          <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl">What our clients say</h2>
          <p className="mt-4 text-base text-slate-400">We let the results speak for themselves — and so do the people we work with.</p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <figure key={t.name} className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/30 hover:bg-white/[0.07]">
              <Quote className="h-8 w-8 text-cyan-400/60" />
              <blockquote className="mt-4 text-base leading-relaxed text-slate-200">"{t.quote}"</blockquote>
              <figcaption className="mt-6 flex items-center gap-4">
                <img src={t.avatar} alt={t.name} loading="lazy" className="h-12 w-12 rounded-full object-cover ring-2 ring-cyan-400/40" />
                <div><p className="font-semibold text-white">{t.name}</p><p className="text-sm text-slate-400">{t.role}</p></div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
