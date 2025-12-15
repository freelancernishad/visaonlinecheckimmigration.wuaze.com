"use client";

import { FaPassport, FaUsers, FaUserCheck, FaHandshake } from "react-icons/fa";
import { useHomePage } from '@/hooks/useHomePage';

export default function DesktopCounter() {
    const { data, loading } = useHomePage();

    if (loading || !data?.counter) {
        return <div className="hidden lg:block py-20 bg-white animate-pulse"><div className="container mx-auto h-40 bg-gray-100 rounded-lg"></div></div>;
    }

    const { counter } = data;

    // Mapping icons by index since icons aren't dynamic in DB
    const icons = [<FaPassport key={0} />, <FaUsers key={1} />, <FaUserCheck key={2} />, <FaHandshake key={3} />];

    return (
        <section className="hidden lg:block py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-4 gap-8">
                    {counter.items.map((item: any, index: number) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-lg border-b-4 border-primary text-center hover:-translate-y-2 transition-transform duration-300 group">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary text-4xl mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                {icons[index % icons.length]}
                            </div>
                            <h3 className="text-lg font-bold text-gray-700 mb-2">{item.label}</h3>
                            <div className="flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                                <span className="text-4xl font-bold">{item.count}</span>
                                <span className="text-2xl font-bold ml-1">{item.suffix}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
