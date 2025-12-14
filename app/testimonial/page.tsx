
import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Testimonial() {
    return (
        <main className="min-h-screen bg-white">
            <Header />

            <PageHeader
                title="Our Testimonial"
                breadcrumb={[
                    { label: "Home", href: "/" },
                    { label: "Pages" },
                    { label: "Testimonial" }
                ]}
            />

            {/* Testimonial Start */}
            <Testimonials />

            <Footer />
        </main>
    );
}
