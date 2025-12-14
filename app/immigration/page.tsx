import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function Immigration() {
    return (
        <div className="min-h-screen flex flex-col font-poppins">
            <Header />

            <main className="flex-grow pt-20">
                <div className="bg-gray-50 py-16">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl font-bold text-dark mb-4">Immigration Services</h1>
                        <p className="text-gray-500">Comprehensive support for your migration journey.</p>
                    </div>
                </div>

                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
                            <div>
                                <h2 className="text-3xl font-bold text-dark mb-6">Study Visa</h2>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    Pursue your education abroad with our expert study visa services. We guide you through university selection, application, and visa processing for top destinations like UK, USA, Canada, and Australia.
                                </p>
                                <ul className="space-y-3 mb-6">
                                    <li className="flex items-center gap-2 text-gray-700">✓ University Selection</li>
                                    <li className="flex items-center gap-2 text-gray-700">✓ SOP Assistance</li>
                                    <li className="flex items-center gap-2 text-gray-700">✓ Scholarship Guidance</li>
                                </ul>
                            </div>
                            <div className="rounded-2xl overflow-hidden shadow-lg">
                                <Image
                                    src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000&auto=format&fit=crop"
                                    alt="Study"
                                    width={600}
                                    height={400}
                                    className="w-full h-auto"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center flex-row-reverse">
                            <div className="order-1 md:order-2">
                                <h2 className="text-3xl font-bold text-dark mb-6">Work Permit</h2>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    Unlock global career opportunities. We assist professionals in securing work permits for various countries. Our team ensures your documentation is perfect.
                                </p>
                                <ul className="space-y-3 mb-6">
                                    <li className="flex items-center gap-2 text-gray-700">✓ Job Search Assistance</li>
                                    <li className="flex items-center gap-2 text-gray-700">✓ Employer Sponsorship</li>
                                    <li className="flex items-center gap-2 text-gray-700">✓ Work Visa Application</li>
                                </ul>
                            </div>
                            <div className="rounded-2xl overflow-hidden shadow-lg order-2 md:order-1">
                                <Image
                                    src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1000&auto=format&fit=crop"
                                    alt="Work"
                                    width={600}
                                    height={400}
                                    className="w-full h-auto"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
