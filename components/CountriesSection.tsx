import Image from 'next/image';

const countries = [
    { name: "Brazil", flag: "https://flagcdn.com/w160/br.png", image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=600&auto=format&fit=crop" },
    { name: "India", flag: "https://flagcdn.com/w160/in.png", image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=600&auto=format&fit=crop" },
    { name: "New York", flag: "https://flagcdn.com/w160/us.png", image: "https://images.unsplash.com/photo-1496442226666-8d4a0e62e6e9?q=80&w=600&auto=format&fit=crop" },
    { name: "Italy", flag: "https://flagcdn.com/w160/it.png", image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=600&auto=format&fit=crop" },
];

export default function CountriesSection() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h4 className="text-primary font-bold uppercase mb-2">Countries We Offer</h4>
                    <h1 className="text-4xl lg:text-5xl font-bold text-dark mb-4">Immigration & visa services following Countries</h1>
                    <p className="text-gray-500 max-w-3xl mx-auto">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat deleniti amet at atque sequi quibusdam cumque itaque repudiandae temporibus.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {countries.map((country, index) => (
                        <div key={index} className="relative group mb-8 rounded-xl bg-white shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2">
                            <div className="h-64 relative overflow-hidden">
                                <Image
                                    src={country.image}
                                    alt={country.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300"></div>
                            </div>

                            {/* Flag Circle */}
                            <div className="absolute left-1/2 -translate-x-1/2 top-56 w-20 h-20 rounded-full border-[3px] border-white overflow-hidden shadow-lg z-10 bg-white group-hover:scale-110 transition-transform duration-300">
                                <Image
                                    src={country.flag}
                                    alt={country.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="text-center pt-14 pb-8 px-4">
                                <h3 className="text-2xl font-bold text-dark mb-2">{country.name}</h3>
                                <p className="text-gray-500 text-sm mb-4">Visa & Immigration</p>
                                <a href="#" className="text-primary font-bold uppercase text-xs tracking-wider border-b-2 border-transparent hover:border-primary transition-all">View Details</a>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-16">
                    <a href="#" className="inline-block px-10 py-4 bg-primary text-white rounded-full font-bold hover:bg-secondary transition-colors">
                        More Countries
                    </a>
                </div>
            </div>
        </section>
    );
}
