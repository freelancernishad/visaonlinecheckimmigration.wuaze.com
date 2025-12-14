import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import CounterSection from "@/components/CounterSection";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import CountriesSection from "@/components/CountriesSection";
import Testimonials from "@/components/Testimonials";
import TrainingSection from "@/components/TrainingSection";
import OfficesSection from "@/components/OfficesSection";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <Hero />

      <ScrollReveal>
        <AboutSection />
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <CounterSection />
      </ScrollReveal>

      <ScrollReveal>
        <Services />
      </ScrollReveal>

      <ScrollReveal>
        <WhyChooseUs />
      </ScrollReveal>

      <ScrollReveal>
        <CountriesSection />
      </ScrollReveal>

      <ScrollReveal>
        <Testimonials />
      </ScrollReveal>

      <ScrollReveal>
        <TrainingSection />
      </ScrollReveal>

      <ScrollReveal>
        <OfficesSection />
      </ScrollReveal>

      <Footer />
    </main>
  );
}
