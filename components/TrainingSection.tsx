import Link from 'next/link';
import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa';

const trainings = [
    { title: "IELTS", type: "Coaching", image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=800&auto=format&fit=crop" },
    { title: "TOEFL", type: "Coaching", image: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?q=80&w=800&auto=format&fit=crop" },
    { title: "PTE", type: "Coaching", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop" },
    { title: "OET", type: "Coaching", image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop" },
];

export default function TrainingSection() {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h4 className="text-primary font-bold uppercase mb-2">CHECK OUR TRAINING</h4>
                    <h1 className="text-4xl lg:text-5xl font-bold text-dark mb-4">Get the Best Coaching Service Training with Our Visa</h1>
                    <p className="text-gray-500 max-w-3xl mx-auto">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat deleniti amet at atque sequi quibusdam cumque itaque repudiandae temporibus.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {trainings.map((item, index) => (
                        <div key={index} className="group">
                            <div className="relative h-64 rounded-t-lg overflow-hidden">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute top-4 left-4 bg-primary text-white p-2 rounded">
                                    <div className="text-lg font-bold">{item.title}</div>
                                    <div className="text-sm">{item.type}</div>
                                </div>
                            </div>
                            <div className="bg-secondary p-6 rounded-b-lg text-white">
                                <h4 className="text-xl font-bold mb-2">{item.title} Coaching</h4>
                                <p className="text-white/80 mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, veritatis.</p>
                                <Link href="#" className="inline-flex items-center text-white hover:text-white/80 font-medium">
                                    Read More <FaArrowRight className="ml-2" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link href="#" className="inline-block px-10 py-4 bg-primary text-white rounded-full font-bold hover:bg-secondary transition-colors">
                        View More
                    </Link>
                </div>
            </div>
        </section>
    );
}
