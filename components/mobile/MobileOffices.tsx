"use client";

import Image from 'next/image';
import { FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

const offices = [
    { country: "Australia", phone: "+123.456.7890", address: "123 Kings St, Melbourne", image: "https://images.unsplash.com/photo-1523482580638-0167791a9055?q=80&w=600&auto=format&fit=crop" },
    { country: "Canada", phone: "+1 234 567 890", address: "456 Queen St, Toronto", image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?q=80&w=600&auto=format&fit=crop" },
    { country: "UK", phone: "+44 20 7123 4567", address: "789 Oxford St, London", image: "https://images.unsplash.com/photo-1486299267070-83823f5448dd?q=80&w=600&auto=format&fit=crop" },
];

export default function MobileOffices() {
    return (
        <section className="lg:hidden py-10 bg-white">
            <div className="container mx-auto px-4">
                <div className="mb-6">
                    <h4 className="text-primary font-bold uppercase text-xs mb-1">Locations</h4>
                    <h1 className="text-3xl font-bold text-dark">Our Offices</h1>
                </div>

                <div className="flex flex-col gap-4">
                    {offices.map((office, index) => (
                        <div key={index} className="flex gap-4 p-3 rounded-xl border border-gray-100 shadow-sm bg-white items-center">
                            <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                <Image
                                    src={office.image}
                                    alt={office.country}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <h4 className="font-bold text-dark text-lg mb-1">{office.country} Office</h4>
                                <div className="space-y-1 text-sm text-gray-500">
                                    <p className="flex items-center gap-2 text-xs"><FaMapMarkerAlt className="text-primary" /> {office.address}</p>
                                    <p className="flex items-center gap-2 text-xs"><FaPhoneAlt className="text-primary" /> {office.phone}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
