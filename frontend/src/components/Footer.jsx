import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { navLinks, services } from '@/data/site';
import logo from '@/assets/logo.png';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <img src={logo} alt="Code Orbit logo" className="h-20 w-auto object-contain" />
            </Link>
            <p className="mt-4 text-sm leading-relaxed">A full-service digital marketing agency helping brands rank higher, convert better, and grow faster — worldwide.</p>
            <div className="mt-6 flex gap-3">
              {[Facebook, Instagram, Linkedin, Twitter].map((Icon, i) => (<a key={i} href="#" aria-label="Social link" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-all duration-300 hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-cyan-400"><Icon className="h-4 w-4" /></a>))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Company</h4>
            <ul className="mt-4 space-y-3 text-sm">{navLinks.map((l) => (<li key={l.href}><Link to={l.href} className="transition-colors hover:text-cyan-400">{l.label}</Link></li>))}</ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Services</h4>
            <ul className="mt-4 space-y-3 text-sm">{services.slice(0, 6).map((s) => (<li key={s.title}><Link to={s.slug === 'web-development' ? '/services/web-development' : '/contact'} className="transition-colors hover:text-cyan-400">{s.title}</Link></li>))}</ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-3"><Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-cyan-400" />contact@codeorbit.com</li>
              <li className="flex items-start gap-3"><Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-cyan-400" />+91 7317651331</li>
              <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-cyan-400" />Noida, Uttar Pradesh, India</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-slate-500">&copy; {new Date().getFullYear()} CodeOribit Technologies Pvt. Ltd All rights reserved.</div>
      </div>
    </footer>
  );
}
