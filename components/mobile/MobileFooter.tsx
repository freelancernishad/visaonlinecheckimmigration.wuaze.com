"use client";

import { FaCopyright } from 'react-icons/fa';
import { useSiteSettings } from "@/hooks/useSiteSettings";

export default function MobileFooter() {
    const { settings } = useSiteSettings();

    return (
        <footer className="lg:hidden bg-secondary py-4 text-white pb-20"> {/* pb-20 for bottom nav */}
            <div className="container mx-auto px-4 text-center">
                <p className="flex items-center justify-center gap-2 text-xs text-white/60">
                    <FaCopyright className="text-[10px]" /> {settings?.copyrightText || '2024 VisaOnline'}
                </p>
            </div>
        </footer>
    );
}
