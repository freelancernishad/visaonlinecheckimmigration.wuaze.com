import Image from 'next/image';

const countries = [
    { name: "Brazil", flag: "https://flagcdn.com/w160/br.png", image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=600&auto=format&fit=crop" },
    { name: "India", flag: "https://flagcdn.com/w160/in.png", image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=600&auto=format&fit=crop" },
    { name: "New York", flag: "https://flagcdn.com/w160/us.png", image: "https://images.unsplash.com/photo-1496442226666-8d4a0e62e6e9?q=80&w=600&auto=format&fit=crop" },
    { name: "Italy", flag: "https://flagcdn.com/w160/it.png", image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=600&auto=format&fit=crop" },
];

export default function MobileCountries() {
    return (
        <section className="lg:hidden py-10 bg-white">
            <div className="container mx-auto px-4 mb-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-dark">Destinations</h2>
                    <a href="#" className="text-sm font-semibold text-primary">View All</a>
                </div>
            </div>

            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 gap-4">
                    {countries.map((country, index) => (
                        <div key={index} className="relative rounded-xl overflow-hidden shadow-md h-48 group">
                            <Image
                                src={country.image}
                                alt={country.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                            <div className="absolute bottom-3 left-3 text-white z-10">
                                <h3 className="font-bold text-lg leading-none mb-1">{country.name}</h3>
                                <p className="text-[10px] opacity-90 uppercase tracking-wider">Immigration</p>
                            </div>

                            <div className="absolute top-2 right-2 w-8 h-8 rounded-full border-2 border-white overflow-hidden shadow-sm z-10">
                                <Image
                                    src={country.flag}
                                    alt={country.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
