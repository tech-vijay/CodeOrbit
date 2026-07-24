import { CheckCircle2, Users, Target, Award } from 'lucide-react';
import { stats } from '@/data/site';

const points = [
  'Full-service digital marketing under one roof',
  'Dedicated account managers for every client',
  'Transparent reporting tied to real revenue',
  'Proven results across 20+ industries worldwide',
];

const features = [
  { icon: Users, title: 'Client-First Approach', desc: 'Your goals drive every decision we make.' },
  { icon: Target, title: 'Outcome-Oriented', desc: 'We measure success by your revenue, not vanity metrics.' },
  { icon: Award, title: 'Award-Winning Team', desc: 'Certified specialists across SEO, PPC, and web.' },
];

export default function About() {
  return (
    <section id="about" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div className="relative">
            <img src="https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=900&h=1000&fit=crop" alt="Our team collaborating" className="rounded-3xl object-cover shadow-2xl shadow-slate-300" />
            <div className="absolute -bottom-8 -right-4 hidden rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 p-6 text-white shadow-xl sm:block lg:-right-8">
              <p className="text-3xl font-bold">8+</p><p className="text-sm text-cyan-100">Years of Excellence</p>
            </div>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-cyan-600">About Us</p>
            <h2 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Your trusted partner for digital growth</h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600">Code Orbit is a full-service digital marketing and web development agency. We specialize in SEO, PPC, web development, content creation, and digital branding. Our expert team combines strategic thinking, creative excellence, and cutting-edge technology to drive measurable growth for businesses of all sizes. From startups to enterprises, we've helped hundreds of brands achieve their digital ambitions.</p>
            <ul className="mt-7 space-y-3">
              {points.map((p) => (<li key={p} className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-cyan-500" /><span className="text-slate-700">{p}</span></li>))}
            </ul>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((s) => (<div key={s.label} className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-lg"><p className="text-2xl font-bold text-slate-900">{s.value}</p><p className="mt-1 text-xs font-medium text-slate-500">{s.label}</p></div>))}
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {features.map((f) => (<div key={f.title} className="flex flex-col gap-2"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600"><f.icon className="h-5 w-5" /></span><p className="text-sm font-semibold text-slate-900">{f.title}</p><p className="text-xs text-slate-500">{f.desc}</p></div>))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
