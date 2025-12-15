"use client";

import Image from 'next/image';
import Button from '../Button';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const slides = [
    {
        image: "https://images.unsplash.com/photo-1436491865332-7a61a1002c67?q=80&w=2000&auto=format&fit=crop",
        subtitle: "Welcome to VisaOnline",
        title: "Best Visa \n Immigrations Services",
        text: "We provide expert guidance and support for all your visa and immigration needs."
    },
    {
        image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2000&auto=format&fit=crop",
        subtitle: "Trusted Partners",
        title: "Your Journey \n Starts Here",
        text: "Experience seamless visa processing with our dedicated team of professionals."
    },
    {
        image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?q=80&w=2000&auto=format&fit=crop",
        subtitle: "Global Reach",
        title: "Explore The \n World With Us",
        text: "Connecting you to opportunities worldwide through simplified immigration."
    }
];

import { useHomePage } from '@/hooks/useHomePage';

export default function DesktopHero() {
    const [activeIndex, setActiveIndex] = useState(0);
    const { data, loading } = useHomePage();

    if (loading || !data?.hero?.slides) {
        return <div className="hidden lg:block h-[850px] bg-gray-100 animate-pulse"></div>;
    }

    const slides = data.hero.slides;

    return (
        <section className="hidden lg:block relative h-[850px] group">
            <Swiper
                modules={[Autoplay, EffectFade, Navigation, Pagination]}
                effect="fade"
                autoplay={{ delay: 6000, disableOnInteraction: false }}
                pagination={{
                    clickable: true,
                    bulletClass: 'swiper-pagination-bullet !w-3 !h-3 !bg-white/50 !opacity-100',
                    bulletActiveClass: '!bg-primary !w-8 transition-all duration-300'
                }}
                navigation={{
                    nextEl: '.custom-next',
                    prevEl: '.custom-prev',
                }}
                loop={true}
                className="h-full w-full"
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            >
                {slides.map((slide: any, index: number) => (
                    <SwiperSlide key={index} className="relative h-full flex items-center overflow-hidden">
                        {/* Background Image with Ken Burns Effect */}
                        <div className="absolute inset-0 z-0">
                            <motion.div
                                initial={{ scale: 1 }}
                                animate={{ scale: activeIndex === index ? 1.1 : 1 }}
                                transition={{ duration: 7, ease: "linear" }}
                                className="relative h-full w-full"
                            >
                                <Image
                                    src={slide.image}
                                    alt="Visa Background"
                                    fill
                                    className="object-cover"
                                    priority={index === 0}
                                />
                            </motion.div>
                            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
                        </div>

                        {/* Content */}
                        <div className="container mx-auto px-4 relative z-10 h-full flex items-center justify-start">
                            <AnimatePresence mode="wait">
                                {activeIndex === index && (
                                    <div className="max-w-3xl text-left pl-12 border-l-4 border-primary/80">
                                        <motion.h4
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.6, delay: 0.2 }}
                                            className="text-primary font-bold mb-4 tracking-[4px] text-lg uppercase bg-white/10 w-fit px-4 py-1 rounded backdrop-blur-sm"
                                        >
                                            {slide.subtitle}
                                        </motion.h4>

                                        <motion.h1
                                            initial={{ opacity: 0, x: -50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 50 }}
                                            transition={{ duration: 0.8, delay: 0.4 }}
                                            className="text-8xl font-bold text-white mb-6 leading-tight whitespace-pre-line drop-shadow-lg"
                                        >
                                            {slide.title}
                                        </motion.h1>

                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.8, delay: 0.6 }}
                                            className="text-gray-200 text-xl mb-10 max-w-2xl font-light"
                                        >
                                            {slide.text}
                                        </motion.p>

                                        <motion.div
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.6, delay: 0.8 }}
                                            className="flex gap-4"
                                        >
                                            <Button className="rounded-none px-10 py-4 text-lg bg-primary hover:bg-white hover:text-primary border-2 border-primary transition-all duration-300 shadow-xl shadow-primary/30">
                                                Discover Plus
                                            </Button>
                                            <Button variant="outline" className="rounded-none px-10 py-4 text-lg text-white border-white hover:bg-white hover:text-dark">
                                                Contact Us
                                            </Button>
                                        </motion.div>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    </SwiperSlide>
                ))}

                {/* Custom Navigation */}
                <div className="custom-prev absolute left-10 top-1/2 -translate-y-1/2 z-20 w-12 h-12 border border-white/30 rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-primary hover:border-primary transition-all duration-300 opacity-0 group-hover:opacity-100">
                    <FaChevronLeft size={20} />
                </div>
                <div className="custom-next absolute right-10 top-1/2 -translate-y-1/2 z-20 w-12 h-12 border border-white/30 rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-primary hover:border-primary transition-all duration-300 opacity-0 group-hover:opacity-100">
                    <FaChevronRight size={20} />
                </div>
            </Swiper>
        </section>
    );
}
