"use client";

import Image from 'next/image';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';

const testimonials = [
    { name: "John Doe", profession: "Business Traveler", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop", text: "Great service! Helped me get my business visa in no time." },
    { name: "Sarah Smith", profession: "Student", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop", text: "Very helpful team for student visa applications. Highly recommended!" },
    { name: "Michael Brown", profession: "Tourist", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop", text: "Made my vacation planning so much easier. Thank you!" },
];

export default function MobileTestimonials() {
    return (
        <section className="lg:hidden py-10 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <h4 className="text-primary font-bold uppercase text-xs mb-1">Reviews</h4>
                    <h1 className="text-3xl font-bold text-dark">Client Stories</h1>
                </div>

                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={20}
                    slidesPerView={1}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    loop={true}
                    className="pb-12"
                >
                    {testimonials.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="bg-white p-6 rounded-2xl shadow-sm text-center mx-2">
                                <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-4 relative border-2 border-primary">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                <div className="mb-3 text-secondary flex justify-center gap-1 text-sm">
                                    {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                                </div>

                                <p className="text-gray-600 italic mb-4 text-sm leading-relaxed relative px-4">
                                    <FaQuoteLeft className="absolute -top-2 left-0 text-gray-200 text-xl" />
                                    "{item.text}"
                                </p>

                                <div>
                                    <h5 className="font-bold text-dark">{item.name}</h5>
                                    <p className="text-primary text-xs font-semibold">{item.profession}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
