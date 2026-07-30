import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, CheckCircle2, Loader2, AlertCircle, ArrowRight, ArrowLeft, Check, Plus, Minus, Star, CreditCard, X, Lock, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { api } from '@/lib/api';
import { services } from '@/data/site';

export default function ServiceTemplate({ serviceData }) {
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [openFAQ, setOpenFAQ] = useState(0);
  const [payModalOpen, setPayModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [payStatus, setPayStatus] = useState('idle');
  const [payError, setPayError] = useState('');
  const [paySuccess, setPaySuccess] = useState(false);
  const [razorpayReady, setRazorpayReady] = useState(false);

  const data = serviceData || {};
  const hero = data.hero || {};
  const subServices = data.subServices || [];
  const processSteps = data.processSteps || [];
  const techStack = data.techStack || [];
  const projects = data.projects || [];
  const pricing = data.pricing || [];
  const faqs = data.faqs || [];
  const inquiry = data.inquiry || {};
  const projectTypes = data.projectTypes || ['Other'];
  const budgets = data.budgets || ['Not sure yet'];
  const timelines = data.timelines || ['Flexible'];

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
    if (existingScript) {
      if (window.Razorpay) {
        setRazorpayReady(true);
      }
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => setRazorpayReady(true);
    script.onerror = () => {
      setPayError('Razorpay checkout could not be loaded. Please refresh and try again.');
    };
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get('name') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      phone: String(formData.get('phone') || '').trim(),
      company: String(formData.get('company') || '').trim(),
      project_type: String(formData.get('project_type') || '').trim(),
      budget: String(formData.get('budget') || '').trim(),
      timeline: String(formData.get('timeline') || '').trim(),
      message: String(formData.get('message') || '').trim(),
      source: inquiry.source || `${data.slug || 'service'}-inquiry`,
    };
    if (!payload.name || !payload.email || !payload.message) {
      setStatus('error');
      setErrorMsg('Please fill in your name, email, and project details.');
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

  function openPaymentModal(plan) {
    setSelectedPlan(plan);
    setPayStatus('idle');
    setPayError('');
    setPaySuccess(false);
    setPayModalOpen(true);
  }

  function closePaymentModal() {
    setPayModalOpen(false);
    setSelectedPlan(null);
    setPayStatus('idle');
    setPayError('');
    setPaySuccess(false);
  }

  async function handlePayment(e) {
    e.preventDefault();
    if (!selectedPlan || selectedPlan.amount_paise === 0) return;
    setPayStatus('loading');
    setPayError('');
    const form = e.currentTarget;
    const formData = new FormData(form);
    const customer_name = String(formData.get('pay_name') || '').trim();
    const customer_email = String(formData.get('pay_email') || '').trim();
    const customer_phone = String(formData.get('pay_phone') || '').trim();
    if (!customer_name || !customer_email) {
      setPayStatus('error');
      setPayError('Please enter your name and email to continue.');
      return;
    }
    try {
      if (!razorpayReady || !window.Razorpay) {
        setPayStatus('error');
        setPayError('Razorpay checkout is still loading. Please try again in a moment.');
        return;
      }

      const orderData = await api.createOrder({
        plan_name: selectedPlan.name,
        amount: selectedPlan.amount_paise,
        currency: 'INR',
        customer_name, customer_email, customer_phone,
      });

      const razorpay = new window.Razorpay({
        key: orderData.key_id,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Code Orbit',
        description: `${selectedPlan.name} Plan — ${data.hero?.title || 'Service'}`,
        image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
        order_id: orderData.order_id,
        prefill: { name: customer_name, email: customer_email, contact: customer_phone },
        theme: { color: '#06b6d4' },
        handler: async (response) => {
          try {
            const verifyData = await api.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            if (verifyData.verified) {
              setPayStatus('idle');
              setPaySuccess(true);
            } else {
              setPayStatus('error');
              setPayError('Payment verification failed. Please contact support.');
            }
          } catch {
            setPayStatus('error');
            setPayError('Could not verify payment. Please contact support at hello@digitalprisma.com.');
          }
        },
        modal: { ondismiss: () => { setPayStatus('idle'); } },
      });

      razorpay.on('payment.failed', () => {
        setPayStatus('error');
        setPayError('Payment failed. Please try again or use a different payment method.');
      });

      razorpay.open();
      setPayStatus('idle');
    } catch (err) {
      setPayStatus('error');
      setPayError(err.message || 'Something went wrong. Please try again.');
    }
  }

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-slate-950 pt-32 pb-20">
        <div className="pointer-events-none absolute inset-0">
          <img src={hero.image || 'https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop'} alt="" className="h-full w-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/50" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
          <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-cyan-400"><ArrowLeft className="h-4 w-4" />Back to Home</Link>
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-cyan-400">{hero.badge || 'Service'}</p>
            <h1 className="text-4xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-6xl">{hero.title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">{hero.description}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href={hero.primaryCta?.href || '#inquiry'} className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 px-7 py-3.5 text-base font-semibold text-white shadow-xl shadow-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/50 hover:brightness-110">{hero.primaryCta?.label || 'Start Your Project'}<ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" /></a>
              <a href={hero.secondaryCta?.href || '#pricing'} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/10">{hero.secondaryCta?.label || 'View Pricing'}</a>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
              {(hero.highlights || []).map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-slate-300"><Check className="h-4 w-4 text-cyan-400" />{item}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-cyan-600">{data.subServicesHeading || 'What We Build'}</p>
            <h2 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">{data.subServicesTitle || 'Full-spectrum service delivery'}</h2>
            <p className="mt-4 text-base text-slate-600">{data.subServicesDescription || 'We cover every aspect of this service with strategy, delivery, and ongoing optimization.'}</p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {subServices.map((s) => (
              <div key={s.title} className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-300 hover:shadow-xl hover:shadow-cyan-500/10">
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-50 to-blue-50 text-cyan-600 transition-all duration-300 group-hover:from-cyan-400 group-hover:to-blue-600 group-hover:text-white"><s.icon className="h-6 w-6" /></span>
                <h3 className="text-base font-bold text-slate-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-cyan-600">{data.processHeading || 'Our Process'}</p>
            <h2 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">{data.processTitle || 'A proven path from idea to launch'}</h2>
            <p className="mt-4 text-base text-slate-600">{data.processDescription || 'Every engagement follows a structured, transparent workflow designed to deliver on time and on budget.'}</p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((step) => (
              <div key={step.number} className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:border-cyan-300 hover:shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600"><step.icon className="h-6 w-6" /></span>
                  <span className="text-4xl font-bold text-slate-100 transition-colors group-hover:text-cyan-100">{step.number}</span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-cyan-400">{data.techStackHeading || 'Our Tech Stack'}</p>
            <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl">{data.techStackTitle || 'Modern tools, built to last'}</h2>
            <p className="mt-4 text-base text-slate-400">{data.techStackDescription || 'We use battle-tested technologies that keep your solution fast, secure, and scalable.'}</p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {techStack.map((cat) => (
              <div key={cat.category} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/30 hover:bg-white/[0.07]">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-cyan-400">{cat.category}</h3>
                <ul className="mt-4 space-y-2.5">{cat.items.map((item) => (<li key={item} className="flex items-center gap-2 text-sm text-slate-300"><span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />{item}</li>))}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-cyan-600">{data.projectsHeading || 'Recent Work'}</p>
            <h2 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">{data.projectsTitle || 'Projects we are proud to deliver'}</h2>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {projects.map((p) => (
              <article key={p.title} className="group relative overflow-hidden rounded-2xl shadow-lg">
                <img src={p.image} alt={p.title} loading="lazy" className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <span className="inline-block rounded-full bg-cyan-400 px-3 py-1 text-xs font-semibold text-slate-950">{p.category}</span>
                  <h3 className="mt-3 text-xl font-bold text-white">{p.title}</h3>
                  <p className="mt-1 text-sm text-slate-300">{p.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-cyan-600">{data.pricingHeading || 'Pricing'}</p>
            <h2 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">{data.pricingTitle || 'Transparent pricing for every budget'}</h2>
            <p className="mt-4 text-base text-slate-600">{data.pricingDescription || 'Choose a plan that fits your needs and growth stage.'}</p>
          </div>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {pricing.map((plan) => (
              <div key={plan.name} className={`relative rounded-3xl border p-8 transition-all duration-300 hover:-translate-y-1 ${plan.highlighted ? 'border-cyan-400 bg-slate-950 shadow-2xl shadow-cyan-500/20 lg:scale-105' : 'border-slate-200 bg-white shadow-lg'}`}>
                {plan.highlighted && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 px-4 py-1 text-xs font-bold text-white">MOST POPULAR</span>}
                <h3 className={`text-lg font-bold ${plan.highlighted ? 'text-white' : 'text-slate-900'}`}>{plan.name}</h3>
                <p className={`mt-1 text-sm ${plan.highlighted ? 'text-slate-400' : 'text-slate-500'}`}>{plan.description}</p>
                <div className="mt-5 flex items-baseline gap-1.5">
                  <span className={`text-4xl font-bold ${plan.highlighted ? 'text-cyan-400' : 'text-slate-900'}`}>{plan.price}</span>
                  <span className={`text-sm ${plan.highlighted ? 'text-slate-400' : 'text-slate-500'}`}>/ {plan.period}</span>
                </div>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className={`flex items-start gap-2.5 text-sm ${plan.highlighted ? 'text-slate-300' : 'text-slate-600'}`}>
                      <Check className={`mt-0.5 h-4 w-4 flex-shrink-0 ${plan.highlighted ? 'text-cyan-400' : 'text-cyan-500'}`} />{f}
                    </li>
                  ))}
                </ul>
                {plan.amount_paise > 0 ? (
                  <button onClick={() => openPaymentModal(plan)} className={`mt-8 flex w-full items-center justify-center gap-2 rounded-full py-3 text-center text-sm font-semibold transition-all duration-300 ${plan.highlighted ? 'bg-gradient-to-r from-cyan-400 to-blue-600 text-white shadow-lg shadow-cyan-500/30 hover:brightness-110' : 'border border-slate-300 text-slate-700 hover:border-cyan-400 hover:text-cyan-600'}`}>
                    <CreditCard className="h-4 w-4" />Pay {plan.price_inr} & Get Started
                  </button>
                ) : (
                  <a href="#inquiry" className={`mt-8 block rounded-full py-3 text-center text-sm font-semibold transition-all duration-300 ${plan.highlighted ? 'bg-gradient-to-r from-cyan-400 to-blue-600 text-white shadow-lg shadow-cyan-500/30 hover:brightness-110' : 'border border-slate-300 text-slate-700 hover:border-cyan-400 hover:text-cyan-600'}`}>Get Started</a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Services Section */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-cyan-600">Our Services</p>
            <h2 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Everything your brand needs to win online</h2>
            <p className="mt-4 text-base text-slate-600">From search visibility to conversion, we cover the full digital marketing spectrum with senior-level expertise on every channel.</p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.filter((s) => s.slug !== data.slug).map((s) => {
              const route = `/services/${s.slug}`;
              return (
                <Link key={s.title} to={route} className="block h-full">
                  <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-300 hover:shadow-xl hover:shadow-cyan-500/10">
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50 text-cyan-600 transition-all duration-300 group-hover:from-cyan-400 group-hover:to-blue-600 group-hover:text-white"><s.icon className="h-7 w-7" /></div>
                    <h3 className="text-lg font-bold text-slate-900">{s.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">{s.description}</p>
                    <div className="mt-5 flex items-center gap-1 text-sm font-semibold text-cyan-600">View full details<ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></div>
                    <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-cyan-400/0 blur-2xl transition-all duration-500 group-hover:bg-cyan-400/20" />
                  </article>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <div className="text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-cyan-600">{data.faqHeading || 'FAQ'}</p>
            <h2 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">{data.faqTitle || 'Frequently asked questions'}</h2>
          </div>
          <div className="mt-12 space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                <button onClick={() => setOpenFAQ(openFAQ === i ? null : i)} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left">
                  <span className="text-base font-semibold text-slate-900">{faq.question}</span>
                  {openFAQ === i ? <Minus className="h-5 w-5 flex-shrink-0 text-cyan-600" /> : <Plus className="h-5 w-5 flex-shrink-0 text-slate-400" />}
                </button>
                {openFAQ === i && <div className="px-6 pb-5 text-sm leading-relaxed text-slate-600">{faq.answer}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="inquiry" className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-cyan-600">{inquiry.heading || 'Request a Quote'}</p>
              <h2 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">{inquiry.title || 'Let’s discuss your project'}</h2>
              <p className="mt-4 text-base text-slate-600">{inquiry.description || 'Share your goals and we will map out a tailored solution that fits your team and roadmap.'}</p>
              <div className="mt-8 space-y-4">
                {(inquiry.contacts || [{ label: 'Email', value: 'hello@digitalprisma.com' }, { label: 'Phone / WhatsApp', value: '+91 89209 28177' }, { label: 'Office', value: 'Noida, Uttar Pradesh, India' }]).map((c) => (
                  <div key={c.label} className="rounded-2xl border border-slate-200 bg-white p-5"><p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{c.label}</p><p className="mt-1 text-base font-medium text-slate-900">{c.value}</p></div>
                ))}
              </div>
              <div className="mt-8 flex items-center gap-3 rounded-2xl border border-cyan-200 bg-cyan-50 p-5">
                <div className="flex">{[0,1,2,3,4].map((s) => <Star key={s} className="h-4 w-4 fill-cyan-500 text-cyan-500" />)}</div>
                <p className="text-sm text-slate-700">{inquiry.ratingText || 'Rated 5.0 by clients for reliable delivery and strategic support'}</p>
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xl sm:p-9">
              {status === 'success' ? (
                <div className="flex h-full flex-col items-center justify-center py-16 text-center">
                  <CheckCircle2 className="h-16 w-16 text-cyan-500" />
                  <h3 className="mt-5 text-2xl font-bold text-slate-900">Thank you!</h3>
                  <p className="mt-2 text-base text-slate-600">{inquiry.successMessage || 'Your inquiry has been received. Our team will reach out soon.'}</p>
                  <button onClick={() => setStatus('idle')} className="mt-6 rounded-full border border-slate-300 px-6 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-cyan-400 hover:text-cyan-600">Submit another inquiry</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Full Name" name="name" placeholder="Jane Doe" required />
                    <Field label="Email" name="email" type="email" placeholder="jane@company.com" required />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Phone" name="phone" placeholder="+1 555 000 0000" />
                    <Field label="Company" name="company" placeholder="Acme Inc." />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-3">
                    <SelectField label="Project Type" name="project_type" options={projectTypes} />
                    <SelectField label="Budget" name="budget" options={budgets} />
                    <SelectField label="Timeline" name="timeline" options={timelines} />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">Project Details <span className="text-red-500">*</span></label>
                    <textarea name="message" required rows={5} placeholder={inquiry.placeholder || 'Tell us about your project...'} className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20" />
                  </div>
                  {status === 'error' && <div className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600"><AlertCircle className="h-5 w-5 flex-shrink-0" />{errorMsg}</div>}
                  <button type="submit" disabled={status === 'loading'} className="group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/50 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70">
                    {status === 'loading' ? <><Loader2 className="h-5 w-5 animate-spin" />Sending...</> : <>Submit Inquiry<Send className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" /></>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {payModalOpen && selectedPlan && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={closePaymentModal} />
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl animate-[slideUp_0.3s_ease]">
            {paySuccess ? (
              <div className="flex flex-col items-center justify-center px-8 py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100"><CheckCircle2 className="h-8 w-8 text-green-600" /></div>
                <h3 className="mt-5 text-2xl font-bold text-slate-900">Payment Successful!</h3>
                <p className="mt-2 text-base text-slate-600">Your <strong>{selectedPlan.name}</strong> plan payment has been received. Our team will contact you within 24 hours to kick off your project.</p>
                <button onClick={closePaymentModal} className="mt-6 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 transition-all hover:brightness-110">Done</button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20"><CreditCard className="h-5 w-5 text-white" /></span>
                    <div><p className="text-sm font-bold text-white">Complete Your Payment</p><p className="text-xs text-cyan-50">{selectedPlan.name} Plan · {selectedPlan.price_inr}</p></div>
                  </div>
                  <button onClick={closePaymentModal} className="rounded-full p-1.5 text-white/80 transition-colors hover:bg-white/10 hover:text-white"><X className="h-5 w-5" /></button>
                </div>
                <form onSubmit={handlePayment} className="space-y-4 p-6">
                  <div><label className="mb-1.5 block text-sm font-medium text-slate-700">Full Name <span className="text-red-500">*</span></label><input type="text" name="pay_name" required placeholder="Jane Doe" className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20" /></div>
                  <div><label className="mb-1.5 block text-sm font-medium text-slate-700">Email <span className="text-red-500">*</span></label><input type="email" name="pay_email" required placeholder="jane@company.com" className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20" /></div>
                  <div><label className="mb-1.5 block text-sm font-medium text-slate-700">Phone (optional)</label><input type="tel" name="pay_phone" placeholder="+91 98765 43210" className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20" /></div>
                  <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3"><span className="text-sm font-medium text-slate-600">Total</span><span className="text-lg font-bold text-slate-900">{selectedPlan.price_inr}</span></div>
                  {payStatus === 'error' && <div className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600"><AlertCircle className="h-5 w-5 flex-shrink-0" />{payError}</div>}
                  <button type="submit" disabled={payStatus === 'loading'} className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70">
                    {payStatus === 'loading' ? <><Loader2 className="h-5 w-5 animate-spin" />Processing...</> : <><Lock className="h-4 w-4" />Pay Securely</>}
                  </button>
                  <div className="flex items-center justify-center gap-2 text-xs text-slate-400"><ShieldCheck className="h-4 w-4" />Secured by Razorpay · 256-bit encryption</div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
      <style>{`@keyframes slideUp { from { opacity: 0; transform: translateY(16px) scale(0.96); } to { opacity: 1; transform: translateY(0) scale(1); } }`}</style>
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

function SelectField({ label, name, options }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-700">{label}</label>
      <select name={name} defaultValue="" className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20">
        <option value="" disabled>Select...</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}
