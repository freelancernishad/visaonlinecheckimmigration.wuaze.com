
import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import TrainingSection from "@/components/TrainingSection";
import CounterSection from "@/components/CounterSection";
import CountriesSection from "@/components/CountriesSection";
import Footer from "@/components/Footer";

export default function Training() {
    return (
        <main className="min-h-screen bg-white">
            <Header />

            <PageHeader
                title="Our Training"
                breadcrumb={[
                    { label: "Home", href: "/" },
                    { label: "Pages" },
                    { label: "Training" }
                ]}
            />

            {/* Training Start */}
            <TrainingSection />

            {/* Counter Facts Start */}
            <CounterSection />

            {/* Countries We Offer Start */}
            <CountriesSection />

            <Footer />
        </main>
    );
}
