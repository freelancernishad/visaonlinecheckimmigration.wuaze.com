"use client";

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

import 'swiper/css';
import 'swiper/css/navigation';

const offices = [
    { country: "Australia", phone: "+123.456.7890", email: "visa@example.com", address: "123, First Floor, 123 St Roots Terrace, Los Angeles 90010 United States of America.", image: "https://images.unsplash.com/photo-1523482580638-0167791a9055?q=80&w=600&auto=format&fit=crop" },
    { country: "Canada", phone: "(012) 0345 6789", email: "visa@example.com", address: "123, First Floor, 123 St Roots Terrace, Los Angeles 90010 United States of America.", image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?q=80&w=600&auto=format&fit=crop" },
    { country: "United Kingdom", phone: "01234.567.890", email: "visa@example.com", address: "123, First Floor, 123 St Roots Terrace, Los Angeles 90010 United States of America.", image: "https://images.unsplash.com/photo-1486299267070-83823f5448dd?q=80&w=600&auto=format&fit=crop" },
    { country: "India", phone: "+123.45.67890", email: "visa@example.com", address: "123, First Floor, 123 St Roots Terrace, Los Angeles 90010 United States of America.", image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=600&auto=format&fit=crop" },
    { country: "Germany", phone: "+49 30 123456", email: "visa@example.com", address: "Alexanderplatz 1, 10178 Berlin, Germany.", image: "https://images.unsplash.com/photo-1467269204594-9661b1331c56?q=80&w=600&auto=format&fit=crop" },
];

export default function DesktopOffices() {
    return (
        <section className="hidden lg:block py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h4 className="text-primary font-bold uppercase mb-2">Worldwide Offices</h4>
                    <h1 className="text-5xl font-bold text-dark mb-4">Explore Our Office Worldwide</h1>
                    <p className="text-gray-500 max-w-3xl mx-auto">
                        Global presence to serve you better. Find the nearest office for personalized immigration assistance and support.
                    </p>
                </div>

                <Swiper
                    modules={[Autoplay, Navigation]}
                    spaceBetween={30}
                    slidesPerView={4}
                    autoplay={{ delay: 3500, disableOnInteraction: false }}
                    loop={true}
                    className="pb-16"
                >
                    {offices.map((office, index) => (
                        <SwiperSlide key={index} className="h-full">
                            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group h-full border border-gray-100">
                                <div className="relative h-48 overflow-hidden">
                                    <Image
                                        src={office.image}
                                        alt={office.country}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                        <span className="text-white font-bold border-2 border-white px-4 py-2 rounded uppercase tracking-wider text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">View Map</span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h4 className="text-xl font-bold text-dark mb-4 flex items-center gap-2">
                                        <span className="w-2 h-8 bg-primary rounded-full block"></span>
                                        {office.country}
                                    </h4>

                                    <div className="space-y-3 text-sm text-gray-500">
                                        <p className="flex items-center gap-3">
                                            <FaPhoneAlt className="text-primary" />
                                            <span className="font-medium text-gray-700 hover:text-primary transition-colors cursor-pointer">{office.phone}</span>
                                        </p>
                                        <p className="flex items-center gap-3">
                                            <FaEnvelope className="text-primary" />
                                            <span className="hover:text-primary transition-colors cursor-pointer">{office.email}</span>
                                        </p>
                                        <p className="flex items-start gap-3">
                                            <FaMapMarkerAlt className="text-primary mt-1 flex-shrink-0" />
                                            <span className="leading-relaxed">{office.address}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
