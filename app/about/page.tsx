import PageHeader from "@/components/PageHeader";
import AboutSection from "@/components/AboutSection";
import CounterSection from "@/components/CounterSection";
import CountriesSection from "@/components/CountriesSection";
import TrainingSection from "@/components/TrainingSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function About() {
    return (
        <main className="min-h-screen bg-white">
            <Header />

            <PageHeader
                title="About Us"
                breadcrumb={[
                    { label: "Home", href: "/" },
                    { label: "Pages" },
                    { label: "About" }
                ]}
            />

            {/* About Section */}
            <AboutSection />

            {/* Counter Facts Start */}
            <CounterSection />

            {/* Countries We Offer Start */}
            <CountriesSection />

            {/* Training Start */}
            <TrainingSection />

            <Footer />
        </main>
    );
}
