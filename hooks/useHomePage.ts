"use client";

import { useState, useEffect } from 'react';

export function useHomePage() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHomePage = async () => {
            try {
                const res = await fetch('/api/homepage');
                if (res.ok) {
                    const fetchedData = await res.json();
                    setData(fetchedData);
                }
            } catch (error) {
                console.error("Error fetching homepage data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHomePage();
    }, []);

    return { data, loading };
}
