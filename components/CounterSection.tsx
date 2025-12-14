import { FaPassport, FaUsers, FaUserCheck, FaHandshake } from "react-icons/fa";

export default function CounterSection() {
    const facts = [
        { icon: <FaPassport />, count: "31", label: "Visa Categories", suffix: "+" },
        { icon: <FaUsers />, count: "377", label: "Team Members", suffix: "+" },
        { icon: <FaUserCheck />, count: "4.9", label: "Visa Process", suffix: "K" },
        { icon: <FaHandshake />, count: "98", label: "Success Rates", suffix: "%" },
    ];

    return (
        <div className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {facts.map((item, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-lg border-b-4 border-primary text-center hover:-translate-y-2 transition-transform duration-300 group">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary text-4xl mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                {item.icon}
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
        </div>
    );
}
