import { useState, useEffect } from 'react';

interface SocialLinks {
    facebook: string;
    twitter: string;
    linkedin: string;
    instagram: string;
    youtube: string;
}

interface SiteSettings {
    email: string;
    phone: string;
    socialLinks: SocialLinks;
    siteTitle: string;
    footerText: string;
    copyrightText: string;
}

export function useSiteSettings() {
    const [settings, setSettings] = useState<SiteSettings | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await fetch('/api/settings');
                if (res.ok) {
                    const data = await res.json();
                    setSettings(data);
                }
            } catch (error) {
                console.error("Error fetching site settings:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    return { settings, loading };
}
