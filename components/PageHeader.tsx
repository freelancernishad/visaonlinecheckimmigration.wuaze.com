"use client";

import Link from "next/link";

interface PageHeaderProps {
    title: string;
    breadcrumb: { label: string; href?: string }[];
}

export default function PageHeader({ title, breadcrumb }: PageHeaderProps) {
    return (
        <div className="relative bg-cover bg-center bg-no-repeat py-24 mb-12" style={{ backgroundImage: 'linear-gradient(rgba(15, 94, 156, 0.9), rgba(15, 94, 156, 0.9)), url(https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2000&auto=format&fit=crop)' }}>
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-white text-4xl md:text-5xl font-bold mb-4 animate-fade-in-down">{title}</h1>
                <div className="flex justify-center items-center gap-2 text-white/80 text-lg animate-fade-in-down delay-100">
                    {breadcrumb.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                            {index > 0 && <span>/</span>}
                            {item.href ? (
                                <Link href={item.href} className="text-white hover:text-white/70 transition-colors">
                                    {item.label}
                                </Link>
                            ) : (
                                <span className="text-white font-medium">{item.label}</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
