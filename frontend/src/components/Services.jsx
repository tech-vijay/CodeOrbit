import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { services } from '@/data/site';

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-slate-50 py-24">
      <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-cyan-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-0 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-cyan-600">Our Specialized Services</p>
          <h2 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Everything your brand needs to win online</h2>
          <p className="mt-4 text-base text-slate-600">From search visibility to conversion, we cover the full digital marketing spectrum with senior-level expertise on every channel.</p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const isWebDev = s.slug === 'web-development';
            const Card = (
              <article className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-cyan-500/10 ${isWebDev ? 'border-cyan-300 ring-1 ring-cyan-200' : 'border-slate-200 hover:border-cyan-300'}`}>
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50 text-cyan-600 transition-all duration-300 group-hover:from-cyan-400 group-hover:to-blue-600 group-hover:text-white"><s.icon className="h-7 w-7" /></div>
                <h3 className="text-lg font-bold text-slate-900">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{s.description}</p>
                <div className="mt-5 flex items-center gap-1 text-sm font-semibold text-cyan-600">{isWebDev ? 'View full details' : 'Learn more'}<ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></div>
                {isWebDev && <span className="absolute right-4 top-4 rounded-full bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-700">Featured</span>}
                <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-cyan-400/0 blur-2xl transition-all duration-500 group-hover:bg-cyan-400/20" />
              </article>
            );
            return isWebDev ? <Link key={s.title} to="/services/web-development" className="block h-full">{Card}</Link> : <Link key={s.title} to="/contact" className="block h-full">{Card}</Link>;
          })}
        </div>
      </div>
    </section>
  );
}
