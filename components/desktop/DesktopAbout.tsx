"use client";

import Image from 'next/image';
import { FaMapMarkedAlt, FaPassport, FaTicketAlt, FaCheckCircle, FaPhoneAlt, FaCommentDots, FaUserFriends, FaGlobeAmericas, FaAward } from 'react-icons/fa';
import Button from '../Button';

import { useHomePage } from '@/hooks/useHomePage';

export default function DesktopAbout() {
    const { data, loading } = useHomePage();

    if (loading || !data?.about) {
        return <div className="hidden lg:block py-24 bg-white animate-pulse"><div className="container mx-auto h-96 bg-gray-100 rounded-3xl"></div></div>;
    }

    const { about } = data;

    return (
        <section className="hidden lg:block py-24 bg-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50 -z-10 rounded-l-[100px]"></div>

            <div className="container mx-auto px-4">
                <div className="flex flex-row items-center gap-16">
                    {/* Images Column */}
                    <div className="w-1/2 relative">
                        <div className="relative z-10">
                            <Image
                                src={about.images.main}
                                alt="Main About"
                                width={500}
                                height={600}
                                className="rounded-3xl shadow-2xl object-cover h-[600px] w-[450px]"
                            />
                            {/* Floating Stats Card */}
                            <div className="absolute -bottom-10 left-10 bg-white p-6 rounded-2xl shadow-xl flex items-center gap-4 border border-gray-100 animate-bounce-slow">
                                <div className="bg-primary/10 p-4 rounded-full text-primary">
                                    <FaUserFriends size={32} />
                                </div>
                                <div>
                                    <h4 className="text-3xl font-bold text-dark">{about.stats.value}</h4>
                                    <p className="text-sm text-gray-500 font-medium">{about.stats.label}</p>
                                </div>
                            </div>
                        </div>

                        {/* Secondary Image */}
                        <div className="absolute -top-12 right-12 -z-10">
                            <Image
                                src={about.images.secondary}
                                alt="Secondary About"
                                width={350}
                                height={450}
                                className="rounded-3xl shadow-lg object-cover h-[450px] w-[350px] opacity-90"
                            />
                        </div>

                        {/* Decorative Circle */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary/10 rounded-full -z-20"></div>
                    </div>

                    {/* Content Column */}
                    <div className="w-1/2">
                        <div className="mb-2 flex items-center gap-2">
                            <span className="w-10 h-[2px] bg-primary"></span>
                            <span className="text-primary font-bold uppercase tracking-widest text-sm">{about.subtitle}</span>
                        </div>

                        <h1 className="text-5xl font-extrabold text-dark mb-6 leading-tight whitespace-pre-line">
                            {about.title}
                        </h1>

                        <p className="text-gray-500 mb-8 leading-relaxed text-lg max-w-xl">
                            {about.description}
                        </p>

                        <div className="grid grid-cols-2 gap-6 mb-10">
                            {about.features.map((feature: any, index: number) => (
                                <div key={index} className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-300">
                                    <div className="mt-1 bg-white p-2 rounded-lg shadow-sm text-primary border border-gray-100">
                                        <FaAward size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-dark mb-1">{feature.title}</h4>
                                        <p className="text-sm text-gray-500">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-primary/5 rounded-2xl p-8 border border-primary/10 relative overflow-hidden">
                            <div className="relative z-10 flex justify-between items-center">
                                <div>
                                    <h3 className="text-2xl font-bold text-dark mb-2">{about.experience.years} Experience</h3>
                                    <p className="text-gray-600 mb-4">{about.experience.text}</p>
                                    <ul className="space-y-2">
                                        {about.experience.points.map((point: string, i: number) => (
                                            <li key={i} className="flex items-center gap-2 font-medium text-dark"><FaCheckCircle className="text-primary" /> {point}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <button className="px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/30 hover:bg-secondary transition-all hover:-translate-y-1">
                                        Discover More
                                    </button>
                                </div>
                            </div>
                            {/* Background Pattern */}
                            <div className="absolute -right-10 -bottom-10 opacity-10 rotate-12">
                                <FaAward size={150} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
