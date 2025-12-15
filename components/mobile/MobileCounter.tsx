import { FaPassport, FaUsers, FaUserCheck, FaHandshake } from "react-icons/fa";

export default function MobileCounter() {
    const facts = [
        { icon: <FaPassport />, count: "31", label: "Visa Categories" },
        { icon: <FaUsers />, count: "377", label: "Team Members" },
        { icon: <FaUserCheck />, count: "4.9K", label: "Visa Process" },
        { icon: <FaHandshake />, count: "98%", label: "Success Rates" },
    ];

    return (
        <section className="lg:hidden py-10 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 gap-4">
                    {facts.map((item, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-xl text-center border border-gray-100">
                            <div className="text-primary text-2xl mb-2 flex justify-center">
                                {item.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-dark mb-0">{item.count}</h3>
                            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{item.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
