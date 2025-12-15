"use client";

import Image from 'next/image';
import { FaStar } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { useHomePage } from '@/hooks/useHomePage';

import 'swiper/css';

export default function DesktopTestimonials() {
    const { data, loading } = useHomePage();

    if (loading || !data?.testimonials) {
        return <div className="hidden lg:block py-20 bg-white animate-pulse"><div className="container mx-auto h-96 bg-gray-100 rounded-3xl"></div></div>;
    }

    const { testimonials } = data;

    return (
        <section className="hidden lg:block py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h4 className="text-primary font-bold uppercase mb-2">{testimonials.subtitle}</h4>
                    <h1 className="text-5xl font-bold text-dark mb-4">{testimonials.title}</h1>
                    <p className="text-gray-500 max-w-3xl mx-auto">
                        {testimonials.description}
                    </p>
                </div>

                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={30}
                    slidesPerView={3}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    loop={true}
                    className="pb-16"
                >
                    {testimonials.items.map((item: any, index: number) => (
                        <SwiperSlide key={index}>
                            <div className="bg-white px-2">
                                {/* Comment Box */}
                                <div className="bg-gray-50 p-8 mb-8 rounded relative shadow-sm hover:shadow-md transition-shadow">
                                    <p className="text-lg text-gray-500 italic mb-4">
                                        {item.text}
                                    </p>
                                    <div className="flex justify-end gap-1 text-secondary">
                                        {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                                    </div>
                                </div>

                                {/* Profile Info Below */}
                                <div className="flex items-center pl-4">
                                    <div className="w-20 h-20 rounded-full overflow-hidden mr-4 shadow-sm relative">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-dark text-lg">{item.name}</h5>
                                        <p className="text-gray-500 text-sm">{item.profession}</p>
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
