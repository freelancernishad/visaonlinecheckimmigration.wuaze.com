import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import WhyChooseUs from "@/components/WhyChooseUs";
import CounterSection from "@/components/CounterSection";
import CountriesSection from "@/components/CountriesSection";
import Footer from "@/components/Footer";

export default function Feature() {
    return (
        <main className="min-h-screen bg-white">
            <Header />

            <PageHeader
                title="Our Features"
                breadcrumb={[
                    { label: "Home", href: "/" },
                    { label: "Pages" },
                    { label: "Feature" }
                ]}
            />

            {/* Features / Why Choose Us Section */}
            <WhyChooseUs />

            {/* Counter Facts Start */}
            <CounterSection />

            {/* Countries We Offer Start */}
            <CountriesSection />

            <Footer />
        </main>
    );
}
