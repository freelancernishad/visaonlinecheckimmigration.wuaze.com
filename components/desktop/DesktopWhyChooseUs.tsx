"use client";

import { FaDollarSign, FaCcVisa, FaAtlas, FaUsers, FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import { useHomePage } from '@/hooks/useHomePage';

export default function DesktopWhyChooseUs() {
    const { data, loading } = useHomePage();

    if (loading || !data?.whyChooseUs) {
        return <div className="hidden lg:block py-20 bg-white animate-pulse"><div className="container mx-auto h-80 bg-gray-100 rounded-3xl"></div></div>;
    }

    const { whyChooseUs } = data;

    // Helper to get random icons since icons aren't stored in DB directly
    const getIcon = (index: number) => {
        const icons = [<FaDollarSign key={0} />, <FaCcVisa key={1} />, <FaAtlas key={2} />, <FaUsers key={3} />];
        return icons[index % icons.length];
    };

    return (
        <section className="hidden lg:block py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h4 className="text-primary font-bold uppercase mb-2">{whyChooseUs.subtitle}</h4>
                    <h1 className="text-5xl font-bold text-dark mb-4 max-w-4xl mx-auto">{whyChooseUs.title}</h1>
                    <p className="text-gray-500 max-w-3xl mx-auto">
                        {whyChooseUs.description}
                    </p>
                </div>

                <div className="grid grid-cols-4 gap-8">
                    {whyChooseUs.features.map((feature: any, index: number) => (
                        <div key={index} className="text-center p-8 rounded-2xl bg-white border border-gray-100 hover:border-primary shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-2">
                            <div className="inline-flex items-center justify-center p-6 mb-6 rounded-full bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                <div className="text-5xl">
                                    {getIcon(index)}
                                </div>
                            </div>
                            <h5 className="text-xl font-bold text-dark mb-3 group-hover:text-primary transition-colors">{feature.title}</h5>
                            <p className="text-gray-500 mb-6 text-sm leading-relaxed">
                                {feature.description}
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
