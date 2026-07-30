import {
  BarChart3, BrainCircuit, Cloud, DatabaseZap, Palette, Search,
  ShoppingCart, Smartphone, Workflow, Wrench, Blocks, ShieldCheck,
  Rocket, Settings, LineChart, PenTool, Megaphone, Server, Code2,
} from 'lucide-react';

const image = 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop';

const definitions = {
  'ai-automation': {
    title: 'AI Automation', focus: 'automation systems that remove repetitive work and keep your teams moving',
    offerings: [['Workflow Automation', 'Connect the everyday tasks across your business into dependable, trigger-based workflows.'], ['Document Intelligence', 'Extract, classify, validate, and route information from invoices, forms, and contracts.'], ['CRM & Operations Automation', 'Keep leads, customer records, notifications, and follow-ups accurate without manual handoffs.']],
    stack: ['n8n', 'Zapier', 'Make', 'OpenAI', 'HubSpot'], icon: Workflow,
  },
  'machine-learning-solutions': {
    title: 'Data Science & Machine Learning', focus: 'data products that turn business information into clearer decisions',
    offerings: [['Predictive Analytics', 'Forecast demand, churn, revenue, and operational risks using models fitted to your data.'], ['Recommendation Systems', 'Give each customer smarter product, content, or next-best-action recommendations.'], ['Data Dashboards', 'Bring key metrics together in clear dashboards your team can use every day.']],
    stack: ['Python', 'Pandas', 'scikit-learn', 'TensorFlow', 'Power BI'], icon: DatabaseZap,
  },
  'ecommerce-development': {
    title: 'E-Commerce Solutions', focus: 'online stores that make browsing, buying, and managing orders effortless',
    offerings: [['Storefront Development', 'Create fast, responsive storefronts that reflect your brand and guide shoppers to checkout.'], ['Payments & Checkout', 'Implement secure payment gateways, tax rules, shipping, and conversion-focused checkout flows.'], ['Commerce Operations', 'Connect inventory, orders, fulfilment, analytics, and customer systems in one reliable setup.']],
    stack: ['Shopify', 'WooCommerce', 'Stripe', 'Razorpay', 'Klaviyo'], icon: ShoppingCart,
  },
  'mobile-app-development': {
    title: 'Mobile App Development', focus: 'mobile applications people enjoy using on iOS and Android',
    offerings: [['Product Discovery', 'Validate the app journey, feature priorities, and technical approach before development starts.'], ['Cross-Platform Apps', 'Build polished iOS and Android experiences efficiently from a shared, maintainable codebase.'], ['App Integrations', 'Connect your app to payments, maps, notifications, analytics, and existing business systems.']],
    stack: ['React Native', 'Flutter', 'Firebase', 'Node.js', 'App Store Connect'], icon: Smartphone,
  },
  'saas-development': {
    title: 'SaaS Product Development', focus: 'subscription software products built for a confident launch and sustainable scale',
    offerings: [['MVP Development', 'Turn a validated idea into a focused first release that is ready for real users.'], ['Multi-Tenant Platforms', 'Build secure account isolation, roles, onboarding, and usage controls for growing SaaS products.'], ['Subscriptions & Analytics', 'Implement billing, usage tracking, product analytics, and the insights needed to improve retention.']],
    stack: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS'], icon: Rocket,
  },
  'ui-ux-design': {
    title: 'UI/UX Design', focus: 'clear, accessible digital experiences that feel natural from the first interaction',
    offerings: [['UX Research', 'Use audience insights, journey mapping, and usability findings to shape the right experience.'], ['Interface Design', 'Create distinctive, responsive interfaces with hierarchy and interactions that support real user goals.'], ['Design Systems', 'Build reusable components and guidelines that keep product experiences consistent as they grow.']],
    stack: ['Figma', 'FigJam', 'Storybook', 'Maze', 'Hotjar'], icon: Palette,
  },
  'seo-optimization': {
    title: 'SEO Optimization', focus: 'search visibility built on sound technical foundations and useful content',
    offerings: [['Technical SEO', 'Fix crawlability, site speed, structured data, and Core Web Vitals issues that hold rankings back.'], ['On-Page Optimization', 'Align pages with search intent through stronger content structure, metadata, and internal linking.'], ['SEO Reporting', 'Track rankings, traffic, conversions, and priorities with reports tied to business outcomes.']],
    stack: ['Google Search Console', 'GA4', 'Ahrefs', 'Screaming Frog', 'Looker Studio'], icon: Search,
  },
  'digital-marketing': {
    title: 'Digital Marketing', focus: 'measurable campaigns that bring the right audiences closer to your business',
    offerings: [['Paid Media', 'Plan and optimise Google, Meta, LinkedIn, and other paid campaigns around qualified demand.'], ['Content & Social', 'Create channel-ready content and social campaigns that make your brand relevant and memorable.'], ['Growth Strategy', 'Connect targeting, landing pages, nurturing, and analytics into a practical growth plan.']],
    stack: ['Google Ads', 'Meta Ads', 'LinkedIn Ads', 'GA4', 'HubSpot'], icon: Megaphone,
  },
  'api-development': {
    title: 'API Development & Integration', focus: 'secure connections between the products, platforms, and data your business relies on',
    offerings: [['API Design', 'Create well-documented REST and GraphQL APIs with clear contracts and maintainable architecture.'], ['Third-Party Integrations', 'Connect CRMs, payment gateways, communications platforms, and AI services reliably.'], ['Integration Reliability', 'Add authentication, monitoring, retries, and error handling so critical data keeps flowing.']],
    stack: ['Node.js', 'REST', 'GraphQL', 'Postman', 'Docker'], icon: Blocks,
  },
  'cloud-devops': {
    title: 'Cloud & DevOps', focus: 'reliable infrastructure that lets your product deploy, recover, and scale with confidence',
    offerings: [['Cloud Architecture', 'Design secure, cost-aware cloud environments that match the needs of your application.'], ['CI/CD Pipelines', 'Automate testing and deployments so releases are faster, repeatable, and less risky.'], ['Monitoring & Reliability', 'Set up logs, alerts, backups, and performance monitoring to protect uptime.']],
    stack: ['AWS', 'Docker', 'GitHub Actions', 'Vercel', 'Cloudflare'], icon: Cloud,
  },
  'website-maintenance': {
    title: 'Website Maintenance', focus: 'proactive website care that keeps your digital presence secure, current, and dependable',
    offerings: [['Security & Updates', 'Apply updates, patches, access controls, and regular backups to reduce avoidable risk.'], ['Performance Care', 'Monitor speed and errors, then resolve issues before they affect visitors or conversions.'], ['Ongoing Improvements', 'Make content, design, and feature updates through a dependable support workflow.']],
    stack: ['UptimeRobot', 'Cloudflare', 'Google Analytics', 'Sentry', 'GitHub'], icon: Wrench,
  },
};

function createService(slug, entry) {
  const Icon = entry.icon;
  return {
    slug,
    hero: { badge: `Service — ${entry.title}`, title: `${entry.title} for teams ready to grow`, description: `We build ${entry.focus}. Our specialists combine strategy, implementation, and ongoing improvement to deliver work that supports your goals.`, image, highlights: ['Clear, practical strategy', 'Experienced specialists', 'Transparent delivery', 'Ongoing support'], primaryCta: { label: 'Discuss Your Project', href: '#inquiry' }, secondaryCta: { label: 'Explore Packages', href: '#pricing' } },
    subServicesHeading: 'What We Deliver', subServicesTitle: `Practical ${entry.title.toLowerCase()} services`, subServicesDescription: 'Every engagement is tailored to your goals, current systems, and the outcomes your customers and team need.',
    subServices: entry.offerings.map(([title, description]) => ({ icon: Icon, title, description })),
    processHeading: 'Our Process', processTitle: 'A focused route from priority to measurable progress', processDescription: 'We keep delivery collaborative, visible, and centred on the work that will make the greatest difference.',
    processSteps: [{ number: '01', title: 'Discover', description: 'Understand your goals, users, systems, and success measures.', icon: Search }, { number: '02', title: 'Plan', description: 'Define the scope, solution, milestones, and responsibilities.', icon: Settings }, { number: '03', title: 'Build', description: 'Deliver in clear stages with regular reviews and feedback.', icon: Code2 }, { number: '04', title: 'Measure', description: 'Test quality and track the indicators that matter to your business.', icon: LineChart }, { number: '05', title: 'Improve', description: 'Refine the solution and support the next stage of growth.', icon: Rocket }],
    techStackHeading: 'Tools & Platforms', techStackTitle: 'Selected for the work at hand', techStackDescription: 'We choose proven tools that fit your existing environment and give you a maintainable path forward.', techStack: [{ category: 'Core toolkit', items: entry.stack }, { category: 'Delivery', items: ['Discovery workshops', 'Documentation', 'Quality assurance', 'Performance reporting'] }],
    projectsHeading: 'Typical Engagements', projectsTitle: `How ${entry.title.toLowerCase()} creates impact`, projects: entry.offerings.slice(0, 2).map(([title, description]) => ({ title, category: entry.title, description, image })),
    pricingHeading: 'Engagement Options', pricingTitle: 'A scope that fits your next step', pricingDescription: 'We will recommend the right engagement after learning about your priorities and requirements.', pricing: [{ name: 'Project Discovery', price: 'Custom', price_inr: 'Custom', amount_paise: 0, period: 'scope', description: 'A focused plan for a clearly defined initiative.', features: ['Goals and requirements review', 'Recommended approach', 'Delivery roadmap', 'Detailed proposal'], highlighted: false }, { name: 'Growth Partnership', price: 'Custom', price_inr: 'Custom', amount_paise: 0, period: 'month', description: 'Ongoing delivery and optimisation for evolving needs.', features: ['Dedicated specialist support', 'Priority improvements', 'Regular reporting', 'Flexible monthly capacity'], highlighted: true }, { name: 'Enterprise', price: 'Custom', price_inr: 'Custom', amount_paise: 0, period: 'quote', description: 'A tailored programme for complex teams and systems.', features: ['Custom implementation', 'Integration planning', 'Security and governance', 'Dedicated delivery team'], highlighted: false }],
    faqHeading: 'FAQ', faqTitle: `Questions about ${entry.title.toLowerCase()}`, faqs: [{ question: 'How do we get started?', answer: 'We begin with a short conversation about your goals, existing setup, timeline, and success measures. We then provide a practical recommendation and proposal.' }, { question: 'Can you work with our existing tools and team?', answer: 'Yes. We design the engagement around your current systems and collaborate with internal stakeholders, vendors, or technical teams as needed.' }, { question: 'How will progress be communicated?', answer: 'You receive a clear delivery plan, regular check-ins, and updates tied to agreed milestones and outcomes.' }],
    inquiry: { heading: 'Request a Consultation', title: `Let’s talk about ${entry.title.toLowerCase()}`, description: 'Tell us what you want to improve and we will outline the most useful next step for your business.', ratingText: 'Trusted by teams that value clear communication and dependable delivery', successMessage: `Thanks — our ${entry.title} team will review your inquiry and reply within one business day.`, placeholder: `Tell us about your goals, current setup, and what you would like to achieve...`, source: `${slug}-inquiry` },
    projectTypes: entry.offerings.map(([title]) => title).concat('Not sure yet'), budgets: ['Under $2,000', '$2,000 - $5,000', '$5,000 - $15,000', '$15,000+', 'Not sure yet'], timelines: ['ASAP', '1-2 months', '3-4 months', '5+ months', 'Flexible'],
  };
}

export const catalogServiceData = Object.fromEntries(Object.entries(definitions).map(([slug, entry]) => [slug, createService(slug, entry)]));
