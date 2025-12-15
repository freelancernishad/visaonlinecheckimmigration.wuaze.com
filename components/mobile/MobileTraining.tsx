import Link from 'next/link';
import Image from 'next/image';

const trainings = [
    { title: "IELTS", type: "Coaching", image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=800&auto=format&fit=crop" },
    { title: "TOEFL", type: "Coaching", image: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?q=80&w=800&auto=format&fit=crop" },
    { title: "PTE", type: "Coaching", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop" },
    { title: "OET", type: "Coaching", image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop" },
];

export default function MobileTraining() {
    return (
        <section className="lg:hidden py-10 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-dark">Our Coaching</h2>
                    <Link href="#" className="text-sm font-semibold text-primary">View All</Link>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {trainings.map((item, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                            <div className="relative h-32">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute top-2 left-2 bg-primary/90 text-white px-2 py-0.5 rounded text-xs font-bold">
                                    {item.title}
                                </div>
                            </div>
                            <div className="p-4 text-center">
                                <h4 className="text-sm font-bold text-dark mb-2">{item.type} Class</h4>
                                <button className="w-full py-1.5 border border-primary text-primary text-xs font-bold rounded hover:bg-primary hover:text-white transition-colors">
                                    Enroll Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
