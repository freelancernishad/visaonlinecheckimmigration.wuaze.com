import { FaDollarSign, FaCcVisa, FaAtlas, FaUsers } from 'react-icons/fa';

const features = [
    { icon: <FaDollarSign />, title: "Cost-Effective", desc: "Affordable pricing" },
    { icon: <FaCcVisa />, title: "Visa Assistance", desc: "Expert guidance" },
    { icon: <FaAtlas />, title: "Fast Process", desc: "Quick turnaround" },
    { icon: <FaUsers />, title: "Interviews", desc: "Direct support" },
];

export default function MobileWhyChooseUs() {
    return (
        <section className="lg:hidden py-10 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <h4 className="text-primary font-bold uppercase text-xs mb-1">Why Choose Us</h4>
                    <h1 className="text-3xl font-bold text-dark">Our Benefits</h1>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {features.map((feature, index) => (
                        <div key={index} className="text-center p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
                            <div className="inline-flex items-center justify-center p-3 mb-3 rounded-full bg-primary/5 text-primary">
                                <div className="text-2xl">
                                    {feature.icon}
                                </div>
                            </div>
                            <h5 className="text-sm font-bold text-dark mb-1">{feature.title}</h5>
                            <p className="text-gray-400 text-xs text-center">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
