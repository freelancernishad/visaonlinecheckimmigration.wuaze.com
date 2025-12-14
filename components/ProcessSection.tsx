import { FaRegFileAlt, FaRegPaperPlane, FaStamp, FaPassport } from 'react-icons/fa';

const steps = [
    {
        icon: <FaRegFileAlt />,
        title: "Fill Application",
        description: "Complete the online application form with accurate details."
    },
    {
        icon: <FaRegPaperPlane />,
        title: "Submit Documents",
        description: "Upload all necessary documents securely on our portal."
    },
    {
        icon: <FaStamp />,
        title: "Get Approved",
        description: "Our experts review and process your application for approval."
    },
    {
        icon: <FaPassport />,
        title: "Receive Visa",
        description: "Collect your visa and get ready for your journey."
    }
];

export default function ProcessSection() {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h4 className="text-primary font-bold uppercase mb-2 tracking-wider">How It Works</h4>
                    <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Simple Online Process</h2>
                    <p className="text-gray-500 text-lg">Four simple steps to get your visa approved quickly.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                    {/* Connector Line (Hidden on mobile) */}
                    <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gray-200 -z-10"></div>

                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center text-center bg-white p-8 rounded-xl shadow-sm lg:shadow-none lg:bg-transparent">
                            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-primary text-3xl shadow-md mb-6 border-4 border-gray-50">
                                {step.icon}
                            </div>
                            <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-4">
                                {index + 1}
                            </div>
                            <h3 className="text-xl font-bold text-dark mb-3">{step.title}</h3>
                            <p className="text-gray-500">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
