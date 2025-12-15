"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';

const services = [
    { title: "Job Visa", image: "https://images.unsplash.com/photo-1586769852044-692d6e3703f0?q=80&w=800&auto=format&fit=crop" },
    { title: "Business Visa", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop" },
    { title: "Diplometic Visa", image: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=800&auto=format&fit=crop" },
    { title: "Students Visa", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop" },
    { title: "Residence Visa", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop" },
    { title: "Tourist Visa", image: "https://images.unsplash.com/photo-1500835556837-99ac94a94552?q=80&w=800&auto=format&fit=crop" },
];

export default function MobileServices() {
    return (
        <section className="lg:hidden py-10 bg-gray-50">
            <div className="container mx-auto px-4 mb-6">
                <div className="flex justify-between items-end">
                    <div>
                        <h4 className="text-primary font-bold uppercase tracking-widest text-xs mb-1">Our Services</h4>
                        <h2 className="text-2xl font-bold text-dark">Visa Solutions</h2>
                    </div>
                    <Link href="/service" className="text-primary text-sm font-semibold">See All</Link>
                </div>
            </div>

            <div className="pl-4 pr-0">
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={16}
                    slidesPerView={1.2}
                    centeredSlides={false}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    loop={true}
                    breakpoints={{
                        640: { slidesPerView: 2.2 },
                    }}
                    className="pb-10 !px-4"
                >
                    {services.map((service, index) => (
                        <SwiperSlide key={index}>
                            <div className="bg-white rounded-xl shadow-md overflow-hidden h-full">
                                <div className="relative h-40">
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-primary">
                                        VS
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-bold text-dark mb-1">{service.title}</h3>
                                    <p className="text-gray-500 text-xs mb-4 line-clamp-2">
                                        Professional assistance for {service.title.toLowerCase()} applications.
                                    </p>
                                    <button className="w-full py-2 border border-primary text-primary rounded-lg text-sm font-semibold hover:bg-primary hover:text-white transition-colors">
                                        Details
                                    </button>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
