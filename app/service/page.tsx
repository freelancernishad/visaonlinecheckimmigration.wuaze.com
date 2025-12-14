import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import Services from "@/components/Services";
import CounterSection from "@/components/CounterSection";
import CountriesSection from "@/components/CountriesSection";
import TrainingSection from "@/components/TrainingSection";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export default function ServicePage() {
    return (
        <main className="min-h-screen bg-gray-50">
            <Header />

            <PageHeader
                title="Our Services"
                breadcrumb={[
                    { label: "Home", href: "/" },
                    { label: "Pages" },
                    { label: "Services" }
                ]}
            />

            <ScrollReveal>
                <Services />
            </ScrollReveal>

            <ScrollReveal>
                <CounterSection />
            </ScrollReveal>

            <ScrollReveal>
                <CountriesSection />
            </ScrollReveal>

            <ScrollReveal>
                <TrainingSection />
            </ScrollReveal>

            <Footer />
        </main>
    );
}
