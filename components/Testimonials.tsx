"use client";

import Image from 'next/image';
import { FaStar } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
  { name: "John Doe", profession: "Business Traveler", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  { name: "Sarah Smith", profession: "Student", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  { name: "Michael Brown", profession: "Tourist", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  { name: "Emily Davis", profession: "Migrant Worker", image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=200&auto=format&fit=crop", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
           <h4 className="text-primary font-bold uppercase mb-2">Our Clients Reviews</h4>
           <h1 className="text-4xl lg:text-5xl font-bold text-dark mb-4">What Our Clients Say</h1>
           <p className="text-gray-500 max-w-3xl mx-auto">
             Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat deleniti amet at atque sequi quibusdam cumque itaque repudiandae temporibus.
           </p>
        </div>

        <Swiper
           modules={[Pagination, Autoplay]}
           spaceBetween={30}
           slidesPerView={1}
           pagination={{ clickable: true }}
           autoplay={{ delay: 3000, disableOnInteraction: false }}
           breakpoints={{
             640: { slidesPerView: 1 },
             768: { slidesPerView: 2 },
             1024: { slidesPerView: 3 },
           }}
           className="pb-16"
        >
           {testimonials.map((item, index) => (
             <SwiperSlide key={index}>
                 <div className="bg-white px-2">
                    {/* Original Design Structure: Comment Box */}
                    <div className="bg-gray-50 p-8 mb-8 rounded relative shadow-sm hover:shadow-md transition-shadow">
                       <p className="text-lg text-gray-500 italic mb-4">
                          {item.text}
                       </p>
                       <div className="flex justify-end gap-1 text-secondary">
                          {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                       </div>
                    </div>

                    {/* Original Design Structure: Profile Info Below */}
                    <div className="flex items-center pl-4">
                       <div className="w-20 h-20 rounded-full overflow-hidden mr-4 shadow-sm relative">
                          <Image 
                            src={item.image} 
                            alt={item.name} 
                            fill 
                            className="object-cover"
                          />
                       </div>
                       <div>
                          <h5 className="font-bold text-dark text-lg">{item.name}</h5>
                          <p className="text-gray-500 text-sm">{item.profession}</p>
                       </div>
                    </div>
                 </div>
             </SwiperSlide>
           ))}
        </Swiper>
      </div>
    </section>
  );
}
