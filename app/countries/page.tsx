
import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import CountriesSection from "@/components/CountriesSection";
import CounterSection from "@/components/CounterSection";
import TrainingSection from "@/components/TrainingSection";
import Footer from "@/components/Footer";

export default function Countries() {
    return (
        <main className="min-h-screen bg-white">
            <Header />

            <PageHeader
                title="Our Countries Offer"
                breadcrumb={[
                    { label: "Home", href: "/" },
                    { label: "Pages" },
                    { label: "Countries" }
                ]}
            />

            {/* Countries We Offer Start */}
            <CountriesSection />

            {/* Counter Facts Start */}
            <CounterSection />

            {/* Training Start */}
            <TrainingSection />

            <Footer />
        </main>
    );
}
