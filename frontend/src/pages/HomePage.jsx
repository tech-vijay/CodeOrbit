import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <Portfolio />
      <Testimonials />
      <CTA />
    </>
  );
}
