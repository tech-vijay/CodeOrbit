import { ArrowRight, BrainCircuit, CheckCircle2, Lightbulb, Rocket, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import founderImage from '@/assets/vijay.png';

const strengths = [
  'Technology-led solutions tailored to real business needs',
  'Direct founder involvement from discovery through delivery',
  'A practical blend of AI, software, design, and growth strategy',
];

const milestones = [
  { year: 'The beginning', title: 'A problem worth solving', text: 'Code Orbit started with a simple belief: ambitious businesses deserve digital products that are clear, useful, and built to grow.' },
  { year: 'Today', title: 'Building for growth', text: 'We partner with founders and teams to turn ideas into websites, applications, AI solutions, and reliable digital systems.' },
  { year: 'Next', title: 'Growing with purpose', text: 'Our focus is to keep raising the standard for accessible, high-quality technology services for businesses everywhere.' },
];

export default function About() {
  return (
    <section id="about" className="overflow-hidden bg-white py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative mx-auto w-full max-w-md lg:mx-0">
            <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-cyan-100 to-blue-100 blur-xl" />
            <img src={founderImage} alt="Founder of Code Orbit" className="relative h-auto w-full rounded-3xl bg-slate-50 object-contain shadow-2xl shadow-slate-300/70" />
            <div className="absolute -bottom-6 -right-3 rounded-2xl bg-slate-950 px-5 py-4 text-white shadow-xl sm:-right-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400">Founder-led</p>
              <p className="mt-1 text-sm font-medium">Built with ambition & care</p>
            </div>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-cyan-600">About Code Orbit</p>
            <h2 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Technology with a clear purpose</h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600">Code Orbit is a founder-led technology company helping businesses build a stronger digital future. We bring together web development, custom software, AI, design, and digital growth services to create solutions that are useful today and ready for what comes next.</p>
            <p className="mt-4 text-base leading-relaxed text-slate-600">Our approach is simple: listen closely, solve the right problem, and deliver work that creates lasting value. Whether you are launching an idea, improving an operation, or scaling an established business, we work as an invested technology partner.</p>
            <ul className="mt-7 space-y-3">
              {strengths.map((strength) => <li key={strength} className="flex items-start gap-3 text-slate-700"><CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-cyan-500" />{strength}</li>)}
            </ul>
            <Link to="/about" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition hover:brightness-110">More About Us <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>

        <div className="mt-24 grid gap-12 border-t border-slate-100 pt-16 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-600">Meet the founder</p>
            <h3 className="mt-3 text-3xl font-bold text-slate-900">Leading Code Orbit with an AI-first mindset</h3>
            <p className="mt-5 text-base leading-relaxed text-slate-600">As a BTech Computer Science Engineering graduate specialising in Artificial Intelligence and Machine Learning, the founder of Code Orbit brings a strong technical foundation and an entrepreneurial perspective to every engagement.</p>
            <p className="mt-4 text-base leading-relaxed text-slate-600">Leading the startup means staying close to both the technology and the people it serves — turning emerging tools into practical, human-centred solutions that help clients move forward with confidence.</p>
            <div className="mt-7 grid gap-4 sm:grid-cols-3">
              {[
                { icon: BrainCircuit, label: 'AI & ML foundation' },
                { icon: Lightbulb, label: 'Product-led thinking' },
                { icon: Users, label: 'Client-first leadership' },
              ].map(({ icon: Icon, label }) => <div key={label} className="rounded-2xl border border-slate-100 bg-slate-50 p-4"><Icon className="h-5 w-5 text-cyan-600" /><p className="mt-3 text-sm font-semibold text-slate-800">{label}</p></div>)}
            </div>
          </div>

          <div className="rounded-3xl bg-slate-950 p-7 text-white sm:p-9">
            <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/15 text-cyan-400"><Rocket className="h-5 w-5" /></span><div><p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">Our story</p><p className="text-sm text-slate-400">Built for the next generation of business</p></div></div>
            <div className="mt-8 space-y-7">
              {milestones.map((milestone, index) => <div key={milestone.year} className="relative pl-7"><span className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-cyan-400 ring-4 ring-cyan-400/15" />{index < milestones.length - 1 && <span className="absolute bottom-[-30px] left-[5px] top-5 w-px bg-slate-700" />}<p className="text-xs font-bold uppercase tracking-widest text-cyan-400">{milestone.year}</p><h4 className="mt-1 text-lg font-bold">{milestone.title}</h4><p className="mt-2 text-sm leading-relaxed text-slate-300">{milestone.text}</p></div>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
