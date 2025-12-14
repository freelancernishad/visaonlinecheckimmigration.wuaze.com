import { FaDollarSign, FaCcVisa, FaAtlas, FaUsers, FaArrowRight } from 'react-icons/fa';

const features = [
    { icon: <FaDollarSign />, title: "Cost-Effective" },
    { icon: <FaCcVisa />, title: "Visa Assistance" },
    { icon: <FaAtlas />, title: "Faster Processing" },
    { icon: <FaUsers />, title: "Direct Interviews" },
];

export default function WhyChooseUs() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h4 className="text-primary font-bold uppercase mb-2">Why Choose Us</h4>
                    <h1 className="text-4xl lg:text-5xl font-bold text-dark mb-4 max-w-4xl mx-auto">Offer Tailor Made Services That Our Client Requires</h1>
                    <p className="text-gray-500 max-w-3xl mx-auto">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat deleniti amet at atque sequi quibusdam cumque itaque repudiandae temporibus.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="text-center p-8 rounded-2xl bg-white border border-gray-100 hover:border-primary shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-2">
                            <div className="inline-flex items-center justify-center p-6 mb-6 rounded-full bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                <div className="text-5xl">
                                    {feature.icon}
                                </div>
                            </div>
                            <h5 className="text-xl font-bold text-dark mb-3 group-hover:text-primary transition-colors">{feature.title}</h5>
                            <p className="text-gray-500 mb-6 text-sm leading-relaxed">
                                Experience world-class service tailored to your immigration needs with our expert team.
                            </p>
                            <a href="#" className="inline-flex items-center text-sm font-bold text-primary group-hover:text-secondary transition-colors">
                                Read More <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <a href="#" className="inline-block px-10 py-4 bg-primary text-white rounded-full font-bold hover:bg-secondary transition-colors">
                        More Features
                    </a>
                </div>
            </div>
        </section>
    );
}
