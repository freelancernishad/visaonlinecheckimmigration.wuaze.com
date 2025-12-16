"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { FaPassport, FaSearch, FaInfoCircle, FaFileAlt, FaHeadset } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckVisa() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const router = useRouter();
    const [passport, setPassport] = useState("");

    useEffect(() => {
        const playAudio = () => {
            if (audioRef.current) {
                audioRef.current.play().catch(e => {
                    console.log("Audio autoplay blocked", e);
                });
            }
        };

        // Try to play immediately
        if (audioRef.current) {
            audioRef.current.play().catch(() => {
                // If blocked, play on first interaction
                document.addEventListener('click', playAudio, { once: true });
            });
        }

        return () => {
            document.removeEventListener('click', playAudio);
        };
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (passport.trim()) {
            router.push(`/visastatus?passport=${encodeURIComponent(passport)}`);
        }
    };

    return (
        <div className="min-h-screen flex flex-col font-poppins bg-[#f8f9fa]">
            <Header />

            <div className="flex-grow py-12">
                <div className="container mx-auto px-4 z-10 relative">
                    <div className="flex justify-center">
                        <div className="w-full max-w-2xl">
                            {/* Status Check Card */}
                            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 relative overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl border-t-4 border-secondary/50">
                                {/* Gradient Line */}
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary to-primary"></div>

                                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                                    <div className="text-center mb-2">
                                        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">Visa & Application Check Status</h2>
                                        <p className="text-gray-500 text-sm md:text-base">Enter your passport number to check your visa status</p>
                                    </div>

                                    <div className="mb-2">
                                        <div className="flex bg-white border border-gray-200 rounded-lg overflow-hidden ring-offset-2 focus-within:ring-2 focus-within:ring-secondary/50 transition-all shadow-sm">
                                            <span className="bg-primary text-white px-4 py-3 flex items-center justify-center min-w-[50px]">
                                                <FaPassport size={20} />
                                            </span>
                                            <input
                                                type="text"
                                                name="passport"
                                                className="flex-grow px-4 py-3 outline-none text-dark bg-transparent w-full"
                                                placeholder="Enter Passport Number"
                                                required
                                                value={passport}
                                                onChange={(e) => setPassport(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="text-center">
                                        <button
                                            type="submit"
                                            className="bg-gradient-to-tr from-secondary to-primary text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto"
                                        >
                                            <FaSearch /> Check Status
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Instructions Section */}
                            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 relative animate-in fade-in slide-in-from-bottom-4 duration-700">
                                <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2 text-primary mb-6 border-b-2 border-gradient pb-2">
                                    <FaInfoCircle /> Important Information
                                </h1>
                                <div className="bg-blue-50 border-l-4 border-secondary text-blue-800 p-4 rounded mb-6 text-sm md:text-base">
                                    <strong>Note:</strong> You can use the 'Track your application' service only if you have already submitted a visa application.
                                </div>

                                <ul className="flex flex-col gap-3 text-gray-700 text-sm md:text-base">
                                    <li className="pl-4 border-l-2 border-gray-100"><strong>Online Applications:</strong> If you submitted your visa application online directly, status updates can only be obtained from our website.</li>
                                    <li className="pl-4 border-l-2 border-gray-100"><strong>Tracking Process:</strong> Once submitted at the Visa Application Centre, track your passport using the "Track your application" service.</li>
                                    <li className="pl-4 border-l-2 border-gray-100"><strong>Tracking Methods:</strong>
                                        <ul className="pl-5 mt-2 list-disc marker:text-secondary">
                                            <li>Online tracking via our website</li>
                                            <li>Web chat support</li>
                                            <li>Helpline number/email provided</li>
                                        </ul>
                                    </li>
                                    <li className="pl-4 border-l-2 border-gray-100"><strong>SMS Service:</strong> Available for status updates (additional charges apply).</li>
                                    <li className="pl-4 border-l-2 border-gray-100"><strong>Appointments:</strong>
                                        <ul className="pl-5 mt-2 list-disc marker:text-secondary">
                                            <li>Request for earlier appointment dates</li>
                                            <li>Reschedule existing appointments</li>
                                            <li>Cancel appointments when needed</li>
                                        </ul>
                                    </li>
                                    <li className="pl-4 border-l-2 border-gray-100"><strong>Individual Appointments:</strong> Each family member requires a separate booking.</li>
                                </ul>

                                <div className="mt-8 text-center flex flex-col sm:flex-row justify-center gap-4">
                                    <Link href="/application" className="border border-secondary text-secondary hover:bg-secondary hover:text-white px-6 py-3 rounded-full flex items-center justify-center gap-2 transition-all duration-300 font-medium">
                                        <FaFileAlt /> Apply Now
                                    </Link>
                                    <Link href="/contact" className="border border-gray-400 text-gray-600 hover:bg-gray-800 hover:text-white px-6 py-3 rounded-full flex items-center justify-center gap-2 transition-all duration-300 font-medium">
                                        <FaHeadset /> Contact Support
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <Footer />
            <audio ref={audioRef} src="/audio/HomePass.mp3" />
        </div>
    );
}
