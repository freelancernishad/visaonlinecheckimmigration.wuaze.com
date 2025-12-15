"use client";

import { FaPassport, FaUsers, FaUserCheck, FaHandshake } from "react-icons/fa";
import { useHomePage } from '@/hooks/useHomePage';

export default function MobileCounter() {
    const { data, loading } = useHomePage();

    if (loading || !data?.counter) {
        return <div className="lg:hidden py-10 bg-white animate-pulse"><div className="container mx-auto h-40 bg-gray-100 rounded-lg"></div></div>;
    }

    const { counter } = data;

    // Mapping icons by index since icons aren't dynamic in DB
    const icons = [<FaPassport key={0} />, <FaUsers key={1} />, <FaUserCheck key={2} />, <FaHandshake key={3} />];

    return (
        <section className="lg:hidden py-10 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 gap-4">
                    {counter.items.map((item: any, index: number) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-xl text-center border border-gray-100">
                            <div className="text-primary text-2xl mb-2 flex justify-center">
                                {icons[index % icons.length]}
                            </div>
                            <h3 className="text-2xl font-bold text-dark mb-0">{item.count}{item.suffix}</h3>
                            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{item.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
