import Button from './Button';

export default function CallToAction() {
    return (
        <section className="py-20 bg-primary text-white">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
                <p className="text-gray-100 text-lg max-w-2xl mx-auto mb-10">
                    Contact us today for a free consultation. Our expert team is ready to assist you with all your visa and immigration needs.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-gray-100">Contact Us Now</Button>
                    <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">Check Visa Status</Button>
                </div>
            </div>
        </section>
    );
}
