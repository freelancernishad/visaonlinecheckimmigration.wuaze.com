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
        // Play audio on load if possible (browsers might block autoplay)
        if (audioRef.current) {
            audioRef.current.play().catch(e => console.log("Audio autoplay blocked", e));
        }
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
                <style jsx global>{`
                    :root {
                        --primary-color: #2c3e50;
                        --secondary-color: #3498db;
                        --accent-color: #e74c3c;
                        --gradient: linear-gradient(135deg, #3498db 0%, #2c3e50 100%);
                    }
                    
                    .status-card {
                        background: white;
                        border-radius: 15px;
                        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                        transition: all 0.3s ease;
                        transform-style: preserve-3d;
                        perspective: 1000px;
                        border: none;
                        overflow: hidden;
                        position: relative;
                    }
                    
                    .status-card:hover {
                        transform: translateY(-5px) rotateX(5deg);
                        box-shadow: 0 15px 35px rgba(0,0,0,0.15);
                    }
                    
                    .status-card::before {
                        content: "";
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        height: 5px;
                        background: var(--gradient);
                    }
                    
                    .btn-premium {
                        background: var(--gradient);
                        border: none;
                        color: white;
                        font-weight: 600;
                        padding: 12px 30px;
                        border-radius: 50px;
                        position: relative;
                        overflow: hidden;
                        transition: all 0.3s;
                        box-shadow: 0 5px 15px rgba(52, 152, 219, 0.4);
                    }
                    
                    .btn-premium:hover {
                        transform: translateY(-3px);
                        box-shadow: 0 8px 20px rgba(52, 152, 219, 0.6);
                        color: white;
                    }
                    
                    .instructions-container {
                        background: white;
                        border-radius: 15px;
                        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                        padding: 30px;
                        margin-top: 30px;
                    }
                    
                    .instructions-container h1 {
                        color: var(--primary-color);
                        margin-bottom: 20px;
                        position: relative;
                        padding-bottom: 10px;
                    }
                    
                    .instructions-container h1::after {
                        content: "";
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        width: 60px;
                        height: 3px;
                        background: var(--gradient);
                    }
                    
                    .instructions-container ul {
                        list-style-type: none;
                        padding-left: 0;
                    }
                    
                    .instructions-container li {
                        padding: 10px 0;
                        border-bottom: 1px solid #eee;
                        position: relative;
                        padding-left: 25px;
                    }
                    
                    .instructions-container li::before {
                        content: "•";
                        color: var(--secondary-color);
                        font-weight: bold;
                        display: inline-block;
                        width: 1em;
                        margin-left: -1em;
                        position: absolute;
                        left: 0;
                    }

                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    
                    .animated-card {
                        animation: fadeIn 0.6s ease-out forwards;
                    }
                `}</style>

                <div className="container mx-auto px-4">
                    <div className="row justify-content-center flex justify-center">
                        <div className="col-lg-8 w-full max-w-3xl">
                            {/* Status Check Card */}
                            <div className="status-card animated-card mb-5 p-8 bg-white rounded-2xl relative">
                                <div className="card-body">
                                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                                        <div className="text-center mb-4">
                                            {/* Placeholder for optional image */}
                                            {/* <img src="./img/e-visa11pgp1.png" alt="evisa" className="max-w-[250px] mx-auto img-fluid" /> */}
                                            <h2 className="mt-3 text-2xl font-bold" style={{ color: 'var(--primary-color)' }}>Visa & Application Check Status</h2>
                                            <p className="text-gray-500">Enter your passport number to check your visa status</p>
                                        </div>

                                        <div className="form-group mb-4">
                                            <div className="flex border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 ring-blue-400 transition-all">
                                                <span className="bg-[#2c3e50] text-white px-4 py-3 flex items-center justify-center">
                                                    <FaPassport size={20} />
                                                </span>
                                                <input
                                                    type="text"
                                                    name="passport"
                                                    className="flex-grow px-4 py-3 outline-none text-lg text-dark"
                                                    placeholder="Enter Passport Number"
                                                    required
                                                    value={passport}
                                                    onChange={(e) => setPassport(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <div className="text-center">
                                            <button type="submit" name="visacheck" className="btn-premium flex items-center justify-center gap-2 mx-auto cursor-pointer">
                                                <FaSearch /> Check Status
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            {/* Instructions Section */}
                            <div className="instructions-container animated-card delay-300 animate-fill-forwards" style={{ animationDelay: '0.3s' }}>
                                <h1 className="text-2xl font-bold flex items-center gap-2">
                                    <FaInfoCircle /> Important Information
                                </h1>
                                <div className="bg-blue-50 border-l-4 border-[#3498db] text-blue-700 p-4 rounded mb-6">
                                    <strong>Note:</strong> You can use the 'Track your application' service only if you have already submitted a visa application.
                                </div>

                                <ul className="flex flex-col gap-2 text-gray-700">
                                    <li><strong>Online Applications:</strong> If you submitted your visa application online directly, status updates can only be obtained from our website.</li>
                                    <li><strong>Tracking Process:</strong> Once submitted at the Visa Application Centre, track your passport using the "Track your application" service.</li>
                                    <li><strong>Tracking Methods:</strong>
                                        <ul className="pl-6 mt-2 list-disc">
                                            <li>Online tracking via our website</li>
                                            <li>Web chat support</li>
                                            <li>Helpline number/email provided</li>
                                        </ul>
                                    </li>
                                    <li><strong>SMS Service:</strong> Available for status updates (additional charges apply).</li>
                                    <li><strong>Appointments:</strong>
                                        <ul className="pl-6 mt-2 list-disc">
                                            <li>Request for earlier appointment dates</li>
                                            <li>Reschedule existing appointments</li>
                                            <li>Cancel appointments when needed</li>
                                        </ul>
                                    </li>
                                    <li><strong>Individual Appointments:</strong> Each family member requires a separate booking.</li>
                                </ul>

                                <div className="mt-8 text-center flex justify-center gap-4">
                                    <Link href="/application" className="border border-blue-500 text-blue-500 hover:bg-blue-50 px-6 py-2 rounded-full flex items-center gap-2 transition-colors">
                                        <FaFileAlt /> Apply Now
                                    </Link>
                                    <Link href="/contact" className="border border-gray-500 text-gray-500 hover:bg-gray-50 px-6 py-2 rounded-full flex items-center gap-2 transition-colors">
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
