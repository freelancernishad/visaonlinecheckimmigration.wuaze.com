import Image from 'next/image';
import { FaCheckCircle, FaPhoneAlt } from 'react-icons/fa';

export default function MobileAbout() {
    return (
        <section className="lg:hidden py-10 bg-white">
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <p className="text-primary font-bold uppercase tracking-[0.2em] text-xs mb-2">Who We Are</p>
                    <h2 className="text-2xl font-extrabold text-dark leading-snug">
                        Your Trusted Partner <br /> <span className="text-primary">in Immigration</span>
                    </h2>
                </div>

                {/* Main Image with Floating Badge */}
                <div className="relative mb-8 px-2">
                    <div className="relative h-56 w-full rounded-2xl overflow-hidden shadow-xl">
                        <Image
                            src="https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=800&auto=format&fit=crop"
                            alt="Team Meeting"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-primary/10"></div>
                    </div>
                    {/* Floating Experience Badge */}
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-lg p-4 flex flex-col items-center justify-center min-w-[140px] border border-gray-100">
                        <span className="text-3xl font-black text-primary leading-none">34+</span>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">Years Exp.</span>
                    </div>
                </div>

                {/* Content */}
                <div className="mt-10 text-center">
                    <p className="text-gray-500 text-sm leading-relaxed mb-8 px-2">
                        Navigate the complex landscape of visa applications with confidence. We have successfully processed over 10,000+ visas with a 98% approval rate.
                    </p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-gray-50 p-4 rounded-xl text-center">
                            <h3 className="text-xl font-bold text-dark mb-1">98%</h3>
                            <p className="text-xs text-gray-500">Success Rate</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-xl text-center">
                            <h3 className="text-xl font-bold text-dark mb-1">10k+</h3>
                            <p className="text-xs text-gray-500">Happy Clients</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-xl text-center">
                            <h3 className="text-xl font-bold text-dark mb-1">50+</h3>
                            <p className="text-xs text-gray-500">Expert Agents</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-xl text-center">
                            <h3 className="text-xl font-bold text-dark mb-1">24/7</h3>
                            <p className="text-xs text-gray-500">Online Support</p>
                        </div>
                    </div>

                    <button className="w-full py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/30 active:scale-95 transition-transform">
                        Read More About Us
                    </button>
                </div>
            </div>
        </section>
    );
}
