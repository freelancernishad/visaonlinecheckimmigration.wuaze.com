import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/Button";

export default function CheckVisa() {
    return (
        <div className="min-h-screen flex flex-col font-poppins">
            <Header />

            <main className="flex-grow pt-20">
                <div className="bg-gray-50 py-16">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl font-bold text-dark mb-4">Check Visa Status</h1>
                        <p className="text-gray-500">Track your application status in real-time.</p>
                    </div>
                </div>

                <section className="py-20">
                    <div className="container mx-auto px-4 max-w-2xl">
                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                            <form className="space-y-6">
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">Passport Number</label>
                                    <input type="text" placeholder="Enter your passport number" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">Application ID / Reference No.</label>
                                    <input type="text" placeholder="Enter Reference Number" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" />
                                </div>

                                <Button className="w-full py-4 text-lg">Check Status</Button>
                            </form>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
