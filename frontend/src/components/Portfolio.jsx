import { portfolio } from '@/data/site';
import { ExternalLink, Sparkles } from 'lucide-react';

export default function Portfolio() {
  return (
    <section id="portfolio" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-cyan-600">Our Work & Showcase</p>
          <h2 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Featured Projects & Live Web Apps</h2>
          <p className="mt-4 text-base text-slate-600">Explore live applications and digital solutions engineered and delivered by Code Orbit.</p>
        </div>
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {portfolio.map((item) => (
            <article
              key={item.title}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-100 bg-slate-950 shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:border-cyan-500/30"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90" />
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="rounded-full bg-slate-950/80 px-3 py-1 text-xs font-semibold text-cyan-400 backdrop-blur-md border border-cyan-500/20">
                    {item.category}
                  </span>
                  {item.isLive && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/90 px-2.5 py-1 text-[11px] font-bold text-white shadow-sm backdrop-blur-md">
                      <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                      Live Project
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>

                {item.liveUrl ? (
                  <a
                    href={item.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all hover:brightness-110 hover:shadow-cyan-500/40"
                  >
                    <span>Visit Live Site</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                ) : (
                  <div className="mt-6 flex items-center justify-between text-xs text-slate-400 font-medium">
                    <span>Delivered Solution</span>
                    <Sparkles className="h-3.5 w-3.5 text-cyan-500" />
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
