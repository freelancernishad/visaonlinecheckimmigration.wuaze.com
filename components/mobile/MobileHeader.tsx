"use client";

import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Button from "../Button";

export default function MobileHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="lg:hidden">
            {/* Mobile Navbar */}
            <div className="container mx-auto px-4 relative">
                <div className="flex justify-between items-center h-20">
                    {/* Brand */}
                    <Link href="/" className="text-3xl font-bold text-primary flex items-center gap-2">
                        E-VISA
                    </Link>

                    {/* Mobile Toggle */}
                    <button
                        className="text-2xl text-dark"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Drawer */}
            <div className={`fixed inset-0 bg-white z-[9999] transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} overflow-y-auto`}>
                <div className="flex flex-col min-h-full relative">
                    {/* Drawer Header */}
                    <div className="flex justify-between items-center p-5 border-b border-gray-200 bg-white w-full sticky top-0 z-10">
                        <Link href="/" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold text-[#0F5E9C] flex items-center gap-2">
                            E-VISA
                        </Link>
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 text-black hover:bg-[#0F5E9C] hover:text-white transition-colors"
                            aria-label="Close Menu"
                        >
                            <FaTimes size={24} />
                        </button>
                    </div>

                    {/* Drawer Content */}
                    <div className="flex flex-col p-6 gap-6 text-lg font-medium text-[#212529]">
                        <Link href="/" onClick={() => setIsMenuOpen(false)} className="hover:text-[#0F5E9C] transition-colors border-b border-gray-100 pb-2">Home</Link>
                        <Link href="/about" onClick={() => setIsMenuOpen(false)} className="hover:text-[#0F5E9C] transition-colors border-b border-gray-100 pb-2">About</Link>
                        <Link href="/service" onClick={() => setIsMenuOpen(false)} className="hover:text-[#0F5E9C] transition-colors border-b border-gray-100 pb-2">Service</Link>

                        {/* Mobile Other Dropdown Items */}
                        <div className="flex flex-col gap-3 pl-4 border-l-2 border-[#0F5E9C]/20">
                            <span className="text-gray-400 text-sm uppercase tracking-wider font-bold mb-1">More</span>
                            <Link href="/feature" onClick={() => setIsMenuOpen(false)} className="text-gray-600 hover:text-[#0F5E9C] transition-colors">Feature</Link>
                            <Link href="/countries" onClick={() => setIsMenuOpen(false)} className="text-gray-600 hover:text-[#0F5E9C] transition-colors">Countries</Link>
                            <Link href="/testimonial" onClick={() => setIsMenuOpen(false)} className="text-gray-600 hover:text-[#0F5E9C] transition-colors">Testimonial</Link>
                            <Link href="/training" onClick={() => setIsMenuOpen(false)} className="text-gray-600 hover:text-[#0F5E9C] transition-colors">Training</Link>
                        </div>

                        <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="hover:text-[#0F5E9C] transition-colors border-b border-gray-100 pb-2">Contact</Link>
                    </div>

                    <div className="mt-auto p-6 flex flex-col gap-4">
                        <Link href="/check-visa" onClick={() => setIsMenuOpen(false)} className="w-full">
                            <Button className="w-full justify-center py-4 bg-[#0A3D66] text-white">Check Visa Status</Button>
                        </Link>
                        <Link href="/application" onClick={() => setIsMenuOpen(false)} className="w-full">
                            <Button variant="outline" className="w-full justify-center py-4 border-2 border-[#0F5E9C] text-[#0F5E9C]">Apply Now</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
