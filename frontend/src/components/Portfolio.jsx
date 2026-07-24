import { portfolio } from '@/data/site';

export default function Portfolio() {
  return (
    <section id="portfolio" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-cyan-600">Our Work</p>
          <h2 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Results we are proud of</h2>
          <p className="mt-4 text-base text-slate-600">A selection of campaigns and projects that delivered real, measurable growth for our clients.</p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {portfolio.map((item) => (
            <article key={item.title} className="group relative overflow-hidden rounded-2xl shadow-lg">
              <img src={item.image} alt={item.title} loading="lazy" className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <span className="inline-block rounded-full bg-cyan-400 px-3 py-1 text-xs font-semibold text-slate-950">{item.category}</span>
                <h3 className="mt-3 text-lg font-bold text-white">{item.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
