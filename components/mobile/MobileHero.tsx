"use client";

import Image from 'next/image';
import Button from '../Button';
import { motion } from 'framer-motion';

export default function MobileHero() {
    return (
        <section className="lg:hidden relative h-[calc(100vh-80px)] w-full overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1436491865332-7a61a1002c67?q=80&w=2000&auto=format&fit=crop"
                    alt="Mobile Hero Background"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
            </div>

            <div className="relative z-10 h-full flex flex-col justify-end pb-24 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest text-primary uppercase bg-white rounded-full">
                        Welcome to VisaOnline
                    </span>
                    <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
                        Your Gateway to <br />
                        <span className="text-primary">Global</span> Opportunities
                    </h1>
                    <p className="text-gray-300 text-lg mb-8 max-w-sm">
                        Fast, secure, and reliable immigration services at your fingertips.
                    </p>

                    <div className="flex flex-col gap-3 w-full">
                        <Button className="w-full justify-center py-4 text-lg bg-primary rounded-xl shadow-lg shadow-primary/30">
                            Check Visa Status
                        </Button>
                        <Button variant="outline" className="w-full justify-center py-4 text-lg text-white border-white/30 bg-white/10 backdrop-blur-md rounded-xl">
                            Our Services
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
