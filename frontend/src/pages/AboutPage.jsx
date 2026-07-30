import { Link } from 'react-router-dom';
import { ArrowRight, BrainCircuit, CheckCircle2, Compass, HeartHandshake, Lightbulb, Rocket, Target, Users } from 'lucide-react';
import founderImage from '@/assets/vijay.png';

const principles = [
  { icon: Target, title: 'Business outcomes first', text: 'We begin with the problem, audience, and opportunity — then choose the technology that will create the most useful result.' },
  { icon: BrainCircuit, title: 'AI with a purpose', text: 'We use AI and automation to solve practical challenges, streamline work, and unlock better customer experiences.' },
  { icon: HeartHandshake, title: 'A partnership mindset', text: 'Every project is built on clear communication, honest guidance, and a shared commitment to long-term growth.' },
];

const journey = [
  { number: '01', title: 'A technical foundation', text: 'The founder’s journey began with a BTech in Computer Science Engineering, specialising in Artificial Intelligence and Machine Learning. It created a strong base in software, data, problem-solving, and the possibilities of emerging technology.' },
  { number: '02', title: 'An entrepreneurial vision', text: 'Code Orbit was created to turn that technical knowledge into meaningful business impact. The goal was not simply to build digital products, but to help businesses use technology with greater clarity and confidence.' },
  { number: '03', title: 'Leading a growing startup', text: 'Today, the startup is led with an AI-first, founder-led approach. We work closely with businesses across their digital journey — from the first idea and brand presence to scalable software, automation, and growth.' },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-slate-950 pb-20 pt-36 text-white sm:pb-24">
        <div className="absolute -right-20 top-0 h-96 w-96 rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="absolute -bottom-32 left-0 h-96 w-96 rounded-full bg-blue-600/15 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">Our story</p>
          <div className="mt-4 grid items-end gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div><h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">Building digital momentum for ambitious businesses</h1><p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">Code Orbit is a founder-led technology startup that brings together strategy, design, software, AI, and growth to help businesses build with purpose and move forward faster.</p></div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"><p className="text-sm font-semibold text-cyan-400">Our mission</p><p className="mt-3 text-base leading-relaxed text-slate-200">Make high-quality digital technology practical, accessible, and genuinely valuable for businesses at every stage of growth.</p></div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="relative mx-auto w-full max-w-md"><div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-cyan-100 to-blue-100 blur-xl" /><img src={founderImage} alt="Founder of Code Orbit" className="relative h-auto w-full rounded-3xl bg-slate-50 object-contain shadow-2xl shadow-slate-300/70" /><div className="absolute -bottom-5 -right-3 rounded-2xl bg-slate-950 px-5 py-4 text-white shadow-xl"><p className="text-xs font-bold uppercase tracking-widest text-cyan-400">Founder & leader</p><p className="mt-1 text-sm">Code Orbit</p></div></div>
            <div><p className="text-sm font-semibold uppercase tracking-widest text-cyan-600">Meet the founder</p><h2 className="mt-3 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">A BTech CSE graduate leading with technology and ambition</h2><p className="mt-5 text-base leading-relaxed text-slate-600">The founder of Code Orbit is a BTech Computer Science Engineering graduate with a specialisation in Artificial Intelligence and Machine Learning. This background brings together the technical depth to understand complex systems and the curiosity to use new technology in ways that create real-world value.</p><p className="mt-4 text-base leading-relaxed text-slate-600">Leading a startup means turning ideas into action every day. From understanding a client’s challenge to shaping the solution and guiding delivery, the focus remains on building work that helps businesses become more visible, efficient, and ready to scale.</p><div className="mt-7 grid gap-4 sm:grid-cols-3">{[['AI & ML', 'Technology foundation'], ['Startup leadership', 'Founder-led delivery'], ['Business growth', 'Impact-focused solutions']].map(([title, text]) => <div key={title} className="rounded-2xl border border-slate-100 bg-slate-50 p-4"><p className="text-sm font-bold text-slate-900">{title}</p><p className="mt-1 text-xs leading-relaxed text-slate-500">{text}</p></div>)}</div></div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-24"><div className="mx-auto max-w-7xl px-5 sm:px-8"><div className="max-w-2xl"><p className="text-sm font-semibold uppercase tracking-widest text-cyan-600">How we got here</p><h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">A startup built to make progress possible</h2></div><div className="mt-12 grid gap-6 lg:grid-cols-3">{journey.map((item) => <article key={item.number} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"><span className="text-sm font-bold text-cyan-600">{item.number}</span><h3 className="mt-5 text-xl font-bold text-slate-900">{item.title}</h3><p className="mt-3 text-sm leading-relaxed text-slate-600">{item.text}</p></article>)}</div></div></section>

      <section className="bg-white py-24"><div className="mx-auto max-w-7xl px-5 sm:px-8"><div className="mx-auto max-w-2xl text-center"><p className="text-sm font-semibold uppercase tracking-widest text-cyan-600">What guides us</p><h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">A stronger digital partner for every stage of growth</h2><p className="mt-4 text-base leading-relaxed text-slate-600">We help businesses create a practical foundation for growth — whether that means a stronger online presence, a custom product, smarter operations, or AI-powered capabilities.</p></div><div className="mt-12 grid gap-6 md:grid-cols-3">{principles.map(({ icon: Icon, title, text }) => <article key={title} className="rounded-3xl border border-slate-200 p-7"><span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600"><Icon className="h-6 w-6" /></span><h3 className="mt-5 text-xl font-bold text-slate-900">{title}</h3><p className="mt-3 text-sm leading-relaxed text-slate-600">{text}</p></article>)}</div></div></section>

      <section className="bg-slate-950 py-20 text-white"><div className="mx-auto max-w-4xl px-5 text-center sm:px-8"><Compass className="mx-auto h-9 w-9 text-cyan-400" /><h2 className="mt-5 text-3xl font-bold sm:text-4xl">Let’s build the next step of your growth story</h2><p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-300">Tell us where your business is today and where you want it to go. We will help you find the right digital path forward.</p><Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 transition hover:brightness-110">Start a conversation <ArrowRight className="h-4 w-4" /></Link></div></section>
    </>
  );
}
