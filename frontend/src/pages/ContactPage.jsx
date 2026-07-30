import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, CheckCircle2, Loader2, AlertCircle, ArrowLeft, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { api } from '@/lib/api';
import { services } from '@/data/site';

export default function ContactPage() {
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get('name') || '').trim(),
      email: String(data.get('email') || '').trim(),
      phone: String(data.get('phone') || '').trim(),
      service: String(data.get('service') || '').trim(),
      message: String(data.get('message') || '').trim(),
      source: 'contact',
    };
    if (!payload.name || !payload.email || !payload.message) {
      setStatus('error');
      setErrorMsg('Please fill in your name, email, and message.');
      return;
    }
    try {
      await api.submitForm(payload);
      setStatus('success');
      form.reset();
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    }
  }

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-slate-950 pt-32 pb-20">
        <div className="pointer-events-none absolute inset-0">
          <img src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop" alt="" className="h-full w-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/50" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
          <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-cyan-400"><ArrowLeft className="h-4 w-4" />Back to Home</Link>
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-cyan-400">Contact Us</p>
            <h1 className="text-4xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-6xl">Let's grow your brand together</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">Tell us about your goals and we'll get back to you within one business day with a tailored proposal — no obligation, no pressure.</p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Mail, label: 'Email Us', value: 'contact@codeorbit.com', href: 'mailto:contact@codeorbit.com' },
              { icon: Phone, label: 'Call Us', value: '+91 73176 51331', href: 'tel:+91 7317651331' },
              { icon: MapPin, label: 'Visit Us', value: 'Noida, Uttar Pradesh, India', href: '#map' },
              { icon: Clock, label: 'Working Hours', value: 'Mon - Fri, 10am - 7pm IST', href: null },
            ].map((c) => (
              <div key={c.label} className="rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300 hover:shadow-lg">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-50 to-blue-50 text-cyan-600"><c.icon className="h-6 w-6" /></span>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-400">{c.label}</p>
                {c.href ? <a href={c.href} className="mt-1 block text-base font-medium text-slate-900 transition-colors hover:text-cyan-600">{c.value}</a> : <p className="mt-1 text-base font-medium text-slate-900">{c.value}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-cyan-600">Send a Message</p>
              <h2 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">We'd love to hear from you</h2>
              <p className="mt-4 text-base text-slate-600">Whether you have a question about our services, need a quote, or want to discuss a project, our team is ready to help.</p>
              <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-7 shadow-xl sm:p-9">
                {status === 'success' ? (
                  <div className="flex h-full flex-col items-center justify-center py-16 text-center">
                    <CheckCircle2 className="h-16 w-16 text-cyan-500" />
                    <h3 className="mt-5 text-2xl font-bold text-slate-900">Thank you!</h3>
                    <p className="mt-2 text-base text-slate-600">Your message has been received. Our team will reach out within one business day.</p>
                    <button onClick={() => setStatus('idle')} className="mt-6 rounded-full border border-slate-300 px-6 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-cyan-400 hover:text-cyan-600">Send another message</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Full Name" name="name" placeholder="Jane Doe" required />
                      <Field label="Email" name="email" type="email" placeholder="jane@company.com" required />
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Phone" name="phone" placeholder="+1 555 000 0000" />
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700">Service of Interest</label>
                        <select name="service" defaultValue="" className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20">
                          <option value="" disabled>Select a service</option>
                          {services.map((s) => <option key={s.title} value={s.title}>{s.title}</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">Message <span className="text-red-500">*</span></label>
                      <textarea name="message" required rows={6} placeholder="Tell us about your project and goals..." className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20" />
                    </div>
                    {status === 'error' && <div className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600"><AlertCircle className="h-5 w-5 flex-shrink-0" />{errorMsg}</div>}
                    <button type="submit" disabled={status === 'loading'} className="group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/50 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70">
                      {status === 'loading' ? <><Loader2 className="h-5 w-5 animate-spin" />Sending...</> : <>Send Message<Send className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" /></>}
                    </button>
                  </form>
                )}
              </div>
            </div>
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-cyan-600">Find Us</p>
              <h2 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Our location</h2>
              <p className="mt-4 text-base text-slate-600">Visit our office in Noida, or reach out online — we work with clients across India, the USA, UK, UAE, and beyond.</p>
              <div id="map" className="mt-8 overflow-hidden rounded-3xl border border-slate-200 shadow-lg">
                <iframe title="Code Orbit Office Location" src="https://www.openstreetmap.org/export/embed.html?bbox=77.325%2C28.570%2C77.365%2C28.590&layer=mapnik&marker=28.580%2C77.345" className="h-80 w-full border-0" loading="lazy" />
              </div>
              <div className="mt-6 space-y-4">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5"><p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Headquarters</p><p className="mt-1 text-base font-medium text-slate-900">Noida, Uttar Pradesh, India</p></div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5"><p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Global Reach</p><p className="mt-1 text-base font-medium text-slate-900">India · USA · UK · UAE · Singapore · Australia · Canada</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({ label, name, type = 'text', placeholder, required }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-700">{label} {required && <span className="text-red-500">*</span>}</label>
      <input type={type} name={name} placeholder={placeholder} required={required} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20" />
    </div>
  );
}
