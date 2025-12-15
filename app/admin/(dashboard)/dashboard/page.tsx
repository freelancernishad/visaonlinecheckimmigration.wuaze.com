"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
    const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0 });

    useEffect(() => {
        // Fetch stats (we can reuse the fetch all endpoint and filter locally for now strictly for simplicity,
        // or creating a specific stats endpoint would be better but keeping it minimal)
        fetch('/api/application')
            .then(res => res.json())
            .then(data => {
                if (data.success && Array.isArray(data.data)) {
                    const apps = data.data;
                    setStats({
                        total: apps.length,
                        pending: apps.filter((a: any) => a.status === 'pending').length,
                        approved: apps.filter((a: any) => a.status === 'approved').length,
                    });
                }
            });
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                    <h3 className="text-gray-500 text-sm font-medium uppercase">Total Applications</h3>
                    <p className="text-3xl font-bold text-gray-800 mt-2">{stats.total}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
                    <h3 className="text-gray-500 text-sm font-medium uppercase">Pending Review</h3>
                    <p className="text-3xl font-bold text-gray-800 mt-2">{stats.pending}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                    <h3 className="text-gray-500 text-sm font-medium uppercase">Approved</h3>
                    <p className="text-3xl font-bold text-gray-800 mt-2">{stats.approved}</p>
                </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                <div className="flex gap-4">
                    <Link href="/admin/applications" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                        View All Applications
                    </Link>
                </div>
            </div>
        </div>
    );
}
