import Image from 'next/image';
import { FaMapMarkedAlt, FaPassport, FaTicketAlt, FaCheckCircle, FaPhoneAlt, FaCommentDots } from 'react-icons/fa';
import Button from './Button';

export default function AboutSection() {
    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col xl:flex-row gap-12">
                    {/* Images Column */}
                    <div className="w-full xl:w-5/12 relative">
                        <div className="bg-gray-50 rounded p-4 relative">
                            <Image
                                src="https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=800&auto=format&fit=crop"
                                alt="About 2"
                                width={600}
                                height={400}
                                className="w-full h-auto rounded mb-[-7px] relative z-10"
                            />
                            <div className="relative">
                                <Image
                                    src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop"
                                    alt="About 3"
                                    width={600}
                                    height={400}
                                    className="w-full h-auto rounded-b-none border-b-[10px] border-primary"
                                    style={{ borderTopRightRadius: '300px', borderTopLeftRadius: '300px' }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Content Column */}
                    <div className="w-full xl:w-7/12">
                        <h5 className="text-primary font-bold uppercase mb-2 tracking-widest">About the company</h5>
                        <h1 className="text-4xl lg:text-5xl font-bold text-dark mb-6 leading-tight">We’re Trusted Immigration <br /> Consultant Agency.</h1>
                        <p className="text-gray-500 mb-8 leading-relaxed">
                            We offer a wide range of services to help you navigate the complex process of immigration. Our team of experts is here to guide you every step of the way.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                            <div className="flex items-center gap-4">
                                <FaMapMarkedAlt className="text-primary text-5xl opacity-80" />
                                <div>
                                    <h5 className="font-bold text-xl text-dark">Best Immigration</h5>
                                    <p className="text-sm text-gray-500">Resources & Guides</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <FaPassport className="text-primary text-5xl opacity-80" />
                                <div>
                                    <h5 className="font-bold text-xl text-dark">Return Visas</h5>
                                    <p className="text-sm text-gray-500">Available instantly</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap lg:flex-nowrap gap-8 items-center">
                            <div className="w-auto">
                                <div className="bg-gray-50 text-center rounded p-4 border border-gray-100 min-w-[150px]">
                                    <div className="mb-2 text-primary flex justify-center"><FaTicketAlt size={40} /></div>
                                    <h1 className="text-4xl font-bold text-dark mb-1">34</h1>
                                    <p className="text-gray-500 text-sm m-0">Years of Experience</p>
                                </div>
                            </div>

                            <div className="flex-grow">
                                <div className="space-y-3 mb-6">
                                    <p className="text-primary font-medium flex items-center gap-2"><FaCheckCircle className="text-secondary" /> Offer 100 % Genuine Assistance</p>
                                    <p className="text-primary font-medium flex items-center gap-2"><FaCheckCircle className="text-secondary" /> It’s Faster & Reliable Execution</p>
                                    <p className="text-primary font-medium flex items-center gap-2"><FaCheckCircle className="text-secondary" /> Accurate & Expert Advice</p>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="relative">
                                        <a href="#" className="flex items-center justify-center w-14 h-14 bg-white rounded-full text-primary border border-gray-100 shadow-sm relative z-10">
                                            <FaPhoneAlt size={24} />
                                        </a>
                                        <div className="absolute -top-1 -right-1 text-secondary"><FaCommentDots /></div>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-primary font-medium">Have any questions?</span>
                                        <span className="text-secondary font-bold text-xl tracking-wider">Free: +0123 456 7890</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
