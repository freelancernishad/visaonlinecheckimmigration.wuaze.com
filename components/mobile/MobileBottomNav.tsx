"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaServicestack, FaSearch, FaUser } from "react-icons/fa";

export default function MobileBottomNav() {
    const pathname = usePathname();

    const navItems = [
        { name: "Home", href: "/", icon: FaHome },
        { name: "Service", href: "/service", icon: FaServicestack },
        { name: "Status", href: "/check-visa", icon: FaSearch },
        { name: "Apply", href: "/application", icon: FaUser },
    ];

    return (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50 border-t border-gray-200">
            <div className="grid grid-cols-4 h-16">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex flex-col items-center justify-center gap-1 transition-colors ${isActive ? 'text-[#0F5E9C]' : 'text-gray-500 hover:text-[#0F5E9C]'}`}
                        >
                            <item.icon size={20} />
                            <span className="text-xs font-medium">{item.name}</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
