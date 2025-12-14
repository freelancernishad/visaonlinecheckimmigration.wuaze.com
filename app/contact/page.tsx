"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import OfficesSection from "@/components/OfficesSection";
import Button from "@/components/Button";
import { FaPhoneAlt, FaEnvelope, FaMapMarkedAlt, FaClock, FaFacebookF, FaTwitter, FaInstagram, FaChevronCircleRight } from "react-icons/fa";

export default function Contact() {
    return (
        <div className="min-h-screen flex flex-col font-poppins text-gray-800">
            <Header />
            <PageHeader title="Contact Us" breadcrumb={[{ label: "Home", href: "/" }, { label: "Pages" }, { label: "Contact" }]} />

            <main className="flex-grow">
                {/* Contact Start */}
                <div className="container mx-auto px-4 py-20 overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div className="animate-fade-in-left">
                            <div className="mb-4">
                                <h5 className="text-primary font-bold uppercase mb-2">Quick Contact</h5>
                                <h1 className="text-4xl lg:text-5xl font-bold text-dark mb-4">Have Questions? Don't Hesitate to Contact Us</h1>
                                <p className="text-gray-500 mb-8">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat totam deserunt tempora. Tempore neque necessitatibus corporis error earum sint quae?
                                </p>
                            </div>

                            <div className="flex items-start bg-white border-b border-gray-100 pb-8 mb-8">
                                <FaMapMarkedAlt className="text-primary text-5xl bg-gray-50 p-3 rounded" />
                                <div className="ps-4">
                                    <h5 className="font-bold text-xl text-dark mb-1">Location</h5>
                                    <p className="text-gray-500">123, First Floor, 123 St Roots Terrace, Los Angeles 90010 Unitd States of America.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
                                <div className="flex items-start">
                                    <FaPhoneAlt className="text-primary text-4xl" />
                                    <div className="ps-4">
                                        <h5 className="font-bold text-xl text-dark mb-3">Quick Contact</h5>
                                        <div className="mb-3">
                                            <h6 className="font-bold text-dark mb-0">Phone:</h6>
                                            <a href="#" className="text-primary text-lg font-medium">+012 3456 7890</a>
                                        </div>
                                        <div className="mb-3">
                                            <h6 className="font-bold text-dark mb-0">Email:</h6>
                                            <a href="#" className="text-primary text-lg font-medium">travisa@example.com</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <FaClock className="text-primary text-4xl" />
                                    <div className="ps-4">
                                        <h5 className="font-bold text-xl text-dark mb-3">Opening Hrs</h5>
                                        <div className="mb-3">
                                            <h6 className="font-bold text-dark mb-0">Mon - Friday:</h6>
                                            <a href="#" className="text-primary text-lg font-medium">09.00 am to 07.00 pm</a>
                                        </div>
                                        <div className="mb-3">
                                            <h6 className="font-bold text-dark mb-0">Satday:</h6>
                                            <a href="#" className="text-primary text-lg font-medium">10.00 am to 05.00 pm</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center pt-3">
                                <div className="me-6">
                                    <div className="bg-gray-50 w-24 h-24 flex items-center justify-center rounded-lg">
                                        <FaChevronCircleRight className="text-primary text-4xl" />
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <a href="#" className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors border border-gray-200 px-4 py-2 rounded-lg hover:border-primary">
                                        facebook <FaChevronCircleRight />
                                    </a>
                                    <a href="#" className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors border border-gray-200 px-4 py-2 rounded-lg hover:border-primary">
                                        twitter <FaChevronCircleRight />
                                    </a>
                                    <a href="#" className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors border border-gray-200 px-4 py-2 rounded-lg hover:border-primary">
                                        instagram <FaChevronCircleRight />
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="animate-fade-in-right">
                            <div className="mb-4">
                                <h5 className="text-primary font-bold uppercase mb-2">Let’s Connect</h5>
                                <h1 className="text-4xl lg:text-5xl font-bold text-dark mb-4">Send Your Message</h1>
                                <p className="text-gray-500 mb-6">
                                    The contact form is currently inactive. Get a functional and working contact form with Ajax & PHP in a few minutes. Just copy and paste the files, add a little code and you're done. <a href="https://htmlcodex.com/contact-form" className="text-primary font-bold hover:text-primary/80">Download Now</a>.
                                </p>
                            </div>

                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="relative">
                                        <input type="text" id="name" placeholder="Your Name" className="w-full px-4 py-4 rounded-lg bg-white border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder-gray-400" />
                                        {/* <label htmlFor="name" className="absolute left-4 top-4 text-gray-400 pointer-events-none transition-all peer-focus:text-xs peer-focus:-top-2 peer-focus:bg-white peer-focus:px-1 peer-focus:text-primary">Your Name</label> */}
                                    </div>
                                    <div className="relative">
                                        <input type="email" id="email" placeholder="Your Email" className="w-full px-4 py-4 rounded-lg bg-white border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder-gray-400" />
                                    </div>
                                    <div className="relative">
                                        <input type="tel" id="phone" placeholder="Your Phone" className="w-full px-4 py-4 rounded-lg bg-white border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder-gray-400" />
                                    </div>
                                    <div className="relative">
                                        <input type="text" id="project" placeholder="Your Project" className="w-full px-4 py-4 rounded-lg bg-white border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder-gray-400" />
                                    </div>
                                </div>
                                <div className="relative">
                                    <input type="text" id="subject" placeholder="Subject" className="w-full px-4 py-4 rounded-lg bg-white border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder-gray-400" />
                                </div>
                                <div className="relative">
                                    <textarea id="message" rows={6} placeholder="Leave a message here" className="w-full px-4 py-4 rounded-lg bg-white border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder-gray-400 resize-none"></textarea>
                                </div>

                                <Button className="w-full py-4 text-lg font-bold rounded-lg uppercase tracking-wider hover:shadow-lg transition-transform hover:-translate-y-1">Send Message</Button>
                            </form>
                        </div>
                    </div>

                    <OfficesSection />

                    <div className="pt-20 animate-zoom-in">
                        <div className="rounded-xl h-[500px] w-full overflow-hidden shadow-lg border border-gray-100 relative">
                            <iframe
                                className="w-full h-full border-0"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387191.33750346623!2d-73.97968099999999!3d40.6974881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1694259649153!5m2!1sen!2sbd"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </div>
                {/* Contact End */}
            </main>

            <Footer />
        </div>
    );
}
