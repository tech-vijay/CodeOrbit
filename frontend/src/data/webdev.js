import {
  Globe, ShoppingCart, LayoutTemplate, Server, Palette,
  Search, Smartphone, Gauge, ShieldCheck, Code2, Rocket, RefreshCw,
} from 'lucide-react';

export const webDevSubServices = [
  { icon: Globe, title: 'Corporate Websites', description: 'Professional, fast, and SEO-ready corporate websites that establish your brand authority and convert visitors into leads.' },
  { icon: ShoppingCart, title: 'E-Commerce Development', description: 'Scalable online stores with secure checkout, inventory management, and integrations to grow your retail business.' },
  { icon: LayoutTemplate, title: 'Landing Page Design', description: 'High-converting landing pages engineered for campaigns — built to capture attention and drive measurable action.' },
  { icon: Server, title: 'Web Application Development', description: 'Custom web applications tailored to your business logic, built with modern frameworks and scalable architecture.' },
  { icon: Palette, title: 'UI/UX Design', description: 'User-centric interfaces backed by research and testing, ensuring every interaction is intuitive and delightful.' },
  { icon: Search, title: 'SEO-Ready Development', description: 'Clean, semantic code and technical SEO best practices baked in from day one so search engines love your site.' },
  { icon: Smartphone, title: 'Responsive Design', description: 'Flawless experiences across every device — mobile, tablet, and desktop — with no layout compromises.' },
  { icon: Gauge, title: 'Performance Optimization', description: 'Lightning-fast load times, Core Web Vitals compliance, and optimized assets for peak user experience.' },
];

export const webDevProcess = [
  { number: '01', title: 'Discovery & Strategy', description: 'We dive deep into your business, audience, and goals to define a clear project scope, sitemap, and technical strategy.', icon: Search },
  { number: '02', title: 'Design & Prototyping', description: 'Wireframes and high-fidelity mockups bring your vision to life. We iterate until every pixel serves a purpose.', icon: Palette },
  { number: '03', title: 'Development', description: 'Our engineers write clean, scalable code using modern frameworks. You get weekly demos and full transparency.', icon: Code2 },
  { number: '04', title: 'Testing & QA', description: 'Rigorous testing across browsers, devices, and edge cases ensures a flawless launch with zero surprises.', icon: ShieldCheck },
  { number: '05', title: 'Launch & Deploy', description: 'We handle the full deployment — DNS, SSL, CDN, and monitoring — so your site goes live smoothly and securely.', icon: Rocket },
  { number: '06', title: 'Support & Maintenance', description: 'Ongoing updates, security patches, performance tuning, and feature enhancements keep your site at its best.', icon: RefreshCw },
];

export const techStack = [
  { category: 'Frontend', items: ['React', 'Next.js', 'Vue.js', 'TypeScript', 'Tailwind CSS'] },
  { category: 'Backend', items: ['Node.js', 'Express', 'Python', 'PostgreSQL', 'GraphQL'] },
  { category: 'E-Commerce', items: ['Shopify', 'WooCommerce', 'Magento', 'Custom Cart'] },
  { category: 'DevOps & Cloud', items: ['AWS', 'Vercel', 'Docker', 'GitHub Actions', 'Cloudflare'] },
];

export const webDevPricing = [
  {
    name: 'Starter', price: '$1,499', price_inr: '₹1,499', amount_paise: 149900, period: 'project',
    description: 'Perfect for small businesses needing a professional online presence.',
    features: ['Up to 5 pages', 'Responsive design', 'Basic SEO setup', 'Contact form integration', '2 rounds of revisions', '2-week delivery'],
    highlighted: false,
  },
  {
    name: 'Business', price: '$4,999', price_inr: '₹4,999', amount_paise: 499900, period: 'project',
    description: 'Ideal for growing companies that need more functionality and scale.',
    features: ['Up to 15 pages', 'Custom UI/UX design', 'Advanced SEO optimization', 'CMS integration', 'Analytics & tracking setup', 'Unlimited revisions', '4-week delivery', '3 months free support'],
    highlighted: true,
  },
  {
    name: 'Enterprise', price: 'Custom', price_inr: 'Custom', amount_paise: 0, period: 'quote',
    description: 'Tailored solutions for complex web apps and large-scale platforms.',
    features: ['Unlimited pages', 'Custom web application', 'API & third-party integrations', 'Enterprise-grade security', 'Dedicated project manager', 'Performance optimization', 'Ongoing maintenance'],
    highlighted: false,
  },
];

export const webDevFAQs = [
  { question: 'How long does it take to build a website?', answer: 'A typical business website takes 3-4 weeks, while more complex web applications can take 8-12 weeks. We provide a detailed timeline after the discovery phase and keep you updated with weekly progress demos.' },
  { question: 'Do you provide ongoing maintenance after launch?', answer: 'Yes. Every project includes a free support period (2 weeks for Starter, 3 months for Business). After that, we offer flexible monthly maintenance plans covering updates, security patches, and feature enhancements.' },
  { question: 'Will my website be mobile-friendly?', answer: 'Absolutely. Every website we build is fully responsive by default, meaning it looks and works flawlessly on phones, tablets, and desktops. We test across real devices before launch.' },
  { question: 'Can you redesign my existing website?', answer: 'Yes, we handle both new builds and redesigns. For redesigns, we audit your current site, preserve what works (like SEO rankings and content), and modernize the design, performance, and user experience.' },
  { question: 'What technologies do you use?', answer: 'We use modern, battle-tested technologies including React, Next.js, Node.js, TypeScript, PostgreSQL, and cloud platforms like AWS and Vercel. The exact stack depends on your project requirements.' },
  { question: 'Do you offer e-commerce development?', answer: 'Yes. We build custom e-commerce solutions on Shopify, WooCommerce, Magento, or fully custom platforms — with secure checkout, inventory management, and payment gateway integration.' },
];

export const webDevProjects = [
  { title: 'Lumen Retail — E-Commerce Platform', category: 'E-Commerce', description: 'A full-scale online store with 10,000+ products and custom checkout flow.', image: 'https://images.pexels.com/photos/5632400/pexels-photo-5632400.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop' },
  { title: 'NorthPeak SaaS — Marketing Website', category: 'Corporate', description: 'A high-performance marketing site that tripled demo signups in one quarter.', image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop' },
  { title: 'Verve Hotels — Booking Web App', category: 'Web App', description: 'A custom reservation system with real-time availability and payment integration.', image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop' },
  { title: 'Atlas Fitness — Membership Portal', category: 'Web App', description: 'A member portal with class scheduling, progress tracking, and billing.', image: 'https://images.pexels.com/photos/4498152/pexels-photo-4498152.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop' },
];
