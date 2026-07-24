import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { navLinks } from '@/data/site';
import logo from '@/assets/logo.png';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);
  const isHome = location.pathname === '/';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || !isHome ? 'bg-slate-950/85 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20' : 'bg-transparent'}`}>
      <nav className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link to="/" className="group flex items-center gap-2.5">
            <img src={logo} alt="Code Orbit logo" className="h-16 w-auto object-contain" />
          </Link>
          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                {link.href.startsWith('/#') ? (
                  <a href={link.href} className="relative px-4 py-2 text-sm font-medium text-slate-200 transition-colors hover:text-cyan-400 after:absolute after:inset-x-4 after:bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:bg-cyan-400 after:transition-transform after:duration-300 hover:after:scale-x-100">{link.label}</a>
                ) : (
                  <Link to={link.href} className="relative px-4 py-2 text-sm font-medium text-slate-200 transition-colors hover:text-cyan-400 after:absolute after:inset-x-4 after:bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:bg-cyan-400 after:transition-transform after:duration-300 hover:after:scale-x-100">{link.label}</Link>
                )}
              </li>
            ))}
          </ul>
          <Link to="/contact" className="hidden rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/50 hover:brightness-110 lg:inline-block">Get a Quote</Link>
          <button onClick={() => setOpen((v) => !v)} className="text-white lg:hidden" aria-label="Toggle menu">{open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}</button>
        </div>
        {open && (
          <div className="border-t border-white/10 py-4 lg:hidden">
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  {link.href.startsWith('/#') ? (
                    <a href={link.href} onClick={() => setOpen(false)} className="block rounded-lg px-4 py-3 text-base font-medium text-slate-200 transition-colors hover:bg-white/5 hover:text-cyan-400">{link.label}</a>
                  ) : (
                    <Link to={link.href} onClick={() => setOpen(false)} className="block rounded-lg px-4 py-3 text-base font-medium text-slate-200 transition-colors hover:bg-white/5 hover:text-cyan-400">{link.label}</Link>
                  )}
                </li>
              ))}
              <li><Link to="/contact" onClick={() => setOpen(false)} className="mt-2 block rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 px-6 py-3 text-center text-sm font-semibold text-white">Get a Quote</Link></li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
