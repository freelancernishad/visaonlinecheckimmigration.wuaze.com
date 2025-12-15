"use client";

import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes, FaChevronDown, FaChevronUp } from "react-icons/fa";
import Button from "../Button";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export default function MobileHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isOtherOpen, setIsOtherOpen] = useState(false);
    const { settings } = useSiteSettings();

    return (
        <div className="lg:hidden">
            {/* Mobile Navbar */}
            <div className="container mx-auto px-4 relative">
                <div className="flex justify-between items-center h-20">
                    {/* Brand */}
                    <Link href="/" className="text-3xl font-bold text-primary flex items-center gap-2">
                        {settings?.siteTitle || 'E-VISA'}
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
                            {settings?.siteTitle || 'E-VISA'}
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
                        <div className="flex flex-col border-l-2 border-[#0F5E9C]/20 pl-4">
                            <button
                                onClick={() => setIsOtherOpen(!isOtherOpen)}
                                className="flex items-center justify-between w-full text-left text-[#212529] hover:text-[#0F5E9C] transition-colors py-2"
                            >
                                <span className="font-medium">Other</span>
                                {isOtherOpen ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
                            </button>

                            {/* Submenu */}
                            <div className={`flex flex-col gap-3 mt-2 overflow-hidden transition-all duration-300 ${isOtherOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <Link href="/feature" onClick={() => setIsMenuOpen(false)} className="text-gray-600 hover:text-[#0F5E9C] transition-colors pl-2">Feature</Link>
                                <Link href="/countries" onClick={() => setIsMenuOpen(false)} className="text-gray-600 hover:text-[#0F5E9C] transition-colors pl-2">Countries</Link>
                                <Link href="/testimonial" onClick={() => setIsMenuOpen(false)} className="text-gray-600 hover:text-[#0F5E9C] transition-colors pl-2">Testimonial</Link>
                                <Link href="/training" onClick={() => setIsMenuOpen(false)} className="text-gray-600 hover:text-[#0F5E9C] transition-colors pl-2">Training</Link>
                            </div>
                        </div>


                        <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="hover:text-[#0F5E9C] transition-colors border-b border-gray-100 pb-2">Contact</Link>

                        <div className="flex flex-wrap gap-3 mt-4">
                            <Link href="/addfingerprint" onClick={() => setIsMenuOpen(false)} className="flex-1 min-w-[140px]">
                                <Button variant="primary" className="w-full justify-center py-3 bg-[#0A3D66] text-sm">Biometrics</Button>
                            </Link>
                            <Link href="/check-visa" onClick={() => setIsMenuOpen(false)} className="flex-1 min-w-[140px]">
                                <Button variant="primary" className="w-full justify-center py-3 bg-[#0A3D66] text-sm">Check Visa</Button>
                            </Link>
                            <Link href="/application" onClick={() => setIsMenuOpen(false)} className="w-full">
                                <Button variant="outline" className="w-full justify-center py-3 border-2 border-[#0F5E9C] text-[#0F5E9C] text-sm">Apply Now</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
