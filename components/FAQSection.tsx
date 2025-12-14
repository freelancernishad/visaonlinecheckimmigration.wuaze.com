export default function FAQSection() {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-12">
                    <div className="w-full lg:w-1/3">
                        <h4 className="text-primary font-bold uppercase mb-2 tracking-wider">FAQ</h4>
                        <h2 className="text-3xl md:text-4xl font-bold text-dark mb-6">Frequently Asked Questions</h2>
                        <p className="text-gray-500 mb-8">
                            Can't find the answer you're looking for? Reach out to our customer support team.
                        </p>
                        <a href="/contact" className="text-primary font-bold underline hover:text-dark">Contact Support</a>
                    </div>

                    <div className="w-full lg:w-2/3 space-y-4">
                        {[
                            { q: "How long does the visa process take?", a: "Processing times vary by country and visa type, typically ranging from 2 weeks to 3 months." },
                            { q: "What documents do I need?", a: "Standard documents include a valid passport, photographs, proof of funds, and travel itinerary. Specific requirements depend on the visa category." },
                            { q: "Is the application fee refundable?", a: "Application fees are generally non-refundable as they cover the administrative costs of processing your request." },
                            { q: "Can I track my application status?", a: "Yes, you can track your application status in real-time using our 'Check Visa' tool with your reference number." }
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <h3 className="text-lg font-bold text-dark mb-2">{item.q}</h3>
                                <p className="text-gray-500">{item.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
