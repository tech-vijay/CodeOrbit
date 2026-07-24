import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-cyan-500 via-blue-600 to-blue-700 py-20">
      <div className="pointer-events-none absolute inset-0 opacity-20"><img src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop" alt="" className="h-full w-full object-cover" /></div>
      <div className="relative z-10 mx-auto max-w-4xl px-5 text-center sm:px-8">
        <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">Ready to grow your brand online?</h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-cyan-50">Get a free consultation with our digital marketing experts. We'll analyze your current strategy and show you exactly where the opportunities are.</p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link to="/contact" className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-semibold text-blue-700 shadow-xl transition-all duration-300 hover:shadow-2xl hover:brightness-95">Get a Free Consultation <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" /></Link>
          <Link to="/services/web-development" className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-7 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20">Explore Web Development</Link>
        </div>
      </div>
    </section>
  );
}
