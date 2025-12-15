"use client";

import Link from "next/link";
import { useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaTwitter, FaFacebookF, FaLinkedinIn, FaInstagram, FaYoutube, FaSearch, FaBars, FaTimes } from "react-icons/fa";
import Button from "./Button";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="font-poppins relative z-50">
            {/* Topbar */}
            <div className="bg-primary text-white py-3 hidden lg:block">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-6 text-sm">
                            <div className="flex items-center gap-2">
                                <FaEnvelope className="text-gray-300" />
                                <span>Example@gmail.com</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaPhoneAlt className="text-gray-300" />
                                <span>+01234567890</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex gap-2">
                                <a href="#" className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-primary transition-colors"><FaTwitter size={12} /></a>
                                <a href="#" className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-primary transition-colors"><FaFacebookF size={12} /></a>
                                <a href="#" className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-primary transition-colors"><FaLinkedinIn size={12} /></a>
                                <a href="#" className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-primary transition-colors"><FaInstagram size={12} /></a>
                                <a href="#" className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-primary transition-colors"><FaYoutube size={12} /></a>
                            </div>
                            <div className="h-4 w-px bg-white/30 mx-2"></div>
                            <div className="flex gap-3 text-sm text-gray-200">
                                <a href="#" className="hover:text-white">Help</a> /
                                <a href="#" className="hover:text-white">Support</a> /
                                <a href="#" className="hover:text-white">Contact</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navbar */}
            <div className="bg-white shadow-sm sticky top-0">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center h-20">
                        {/* Brand */}
                        <Link href="/" className="text-3xl font-bold text-primary flex items-center gap-2 z-50 relative">
                            E-VISA
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden lg:flex items-center gap-8 font-medium text-gray-600">
                            <Link href="/" className="text-primary hover:text-primary transition-colors">Home</Link>
                            <Link href="/about" className="hover:text-primary transition-colors">About</Link>
                            <Link href="/service" className="hover:text-primary transition-colors">Service</Link>
                            <div className="group relative">
                                <button className="hover:text-primary transition-colors flex items-center gap-1 py-4">
                                    Other <span className="text-xs">▼</span>
                                </button>
                                <div className="absolute top-full -left-4 w-48 bg-white shadow-lg rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 border-t-4 border-primary z-50">
                                    <Link href="/feature" className="block px-4 py-2 hover:bg-gray-50 hover:text-primary transition-colors text-sm">Feature</Link>
                                    <Link href="/countries" className="block px-4 py-2 hover:bg-gray-50 hover:text-primary transition-colors text-sm">Countries</Link>
                                    <Link href="/testimonial" className="block px-4 py-2 hover:bg-gray-50 hover:text-primary transition-colors text-sm">Testimonial</Link>
                                    <Link href="/training" className="block px-4 py-2 hover:bg-gray-50 hover:text-primary transition-colors text-sm">Training</Link>
                                </div>
                            </div>
                            <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
                            <Link href="/application" className="hover:text-primary transition-colors">Apply</Link>
                        </nav>

                        {/* Desktop Actions */}
                        <div className="hidden lg:flex items-center gap-3">
                            <Link href="/addfingerprint"><Button variant="primary" size="sm" className="rounded-full px-4 flex items-center gap-2"><FaSearch /> Biometrics</Button></Link>
                            <Link href="/check-visa"><Button variant="primary" size="sm" className="rounded-full px-4 flex items-center gap-2"><FaSearch /> Check Visa</Button></Link>
                            <Link href="/application">
                                <Button variant="primary" size="sm" className="rounded-full px-4">
                                    Apply Now
                                </Button>
                            </Link>
                        </div>

                        {/* Mobile Toggle */}
                        <button
                            className="lg:hidden text-2xl text-dark z-50 relative"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Drawer */}
            <div className={`fixed inset-0 bg-white z-40 transform transition-transform duration-300 lg:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col items-center justify-center h-full gap-8 text-xl font-medium text-dark">
                    <Link href="/" onClick={() => setIsMenuOpen(false)} className="hover:text-primary">Home</Link>
                    <Link href="/about" onClick={() => setIsMenuOpen(false)} className="hover:text-primary">About</Link>
                    <Link href="/service" onClick={() => setIsMenuOpen(false)} className="hover:text-primary">Service</Link>
                    <Link href="/feature" onClick={() => setIsMenuOpen(false)} className="hover:text-primary">Feature</Link>
                    <Link href="/countries" onClick={() => setIsMenuOpen(false)} className="hover:text-primary">Countries</Link>
                    <Link href="/testimonial" onClick={() => setIsMenuOpen(false)} className="hover:text-primary">Testimonial</Link>
                    <Link href="/training" onClick={() => setIsMenuOpen(false)} className="hover:text-primary">Training</Link>
                    <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="hover:text-primary">Contact</Link>
                    <div className="flex flex-col gap-4 mt-8">
                        <Button onClick={() => setIsMenuOpen(false)}>Check Visa Status</Button>
                        <Button variant="outline" onClick={() => setIsMenuOpen(false)}>Apply Now</Button>
                    </div>
                </div>
            </div>
        </header>
    );
}
