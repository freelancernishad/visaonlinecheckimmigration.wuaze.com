"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useHomePage } from '@/hooks/useHomePage';

export default function DesktopServices() {
    const { data, loading } = useHomePage();

    if (loading || !data?.services) {
        return <div className="hidden lg:block py-20 bg-gray-50 animate-pulse"><div className="container mx-auto h-96 bg-gray-200 rounded-3xl"></div></div>;
    }

    const { services } = data;

    return (
        <section className="hidden lg:block py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h4 className="text-primary font-bold uppercase mb-2 tracking-widest text-base">{services.subtitle}</h4>
                    <h1 className="text-5xl font-bold text-dark mb-4 whitespace-pre-line">{services.title}</h1>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        {services.description}
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-8">
                    {services.items.map((service: any, index: number) => (
                        <div key={index} className="group rounded-2xl overflow-hidden relative shadow-lg bg-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                            {/* Image Container */}
                            <div className="relative h-64 overflow-hidden">
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>

                            {/* Floating Icon */}
                            <div className="absolute top-56 left-8 bg-white p-3 rounded-lg shadow-lg z-10 group-hover:scale-110 transition-transform duration-300">
                                <div className="bg-primary text-white w-12 h-12 flex items-center justify-center rounded font-bold text-lg">
                                    VS
                                </div>
                            </div>

                            {/* Content */}
                            <div className="pt-12 p-8 relative">
                                <h3 className="text-2xl font-bold text-dark mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                                <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                                    {service.description}
                                </p>

                                <div className="flex items-center justify-between border-t border-gray-100 pt-6">
                                    <Link href="#" className="flex items-center text-primary font-bold uppercase text-xs tracking-wider group/link">
                                        Read More
                                        <span className="ml-2 transform group-hover/link:translate-x-1 transition-transform">→</span>
                                    </Link>
                                    <span className="text-gray-300 text-xs font-medium">Verified</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
