"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ApplicationsList from '../applications/page';
import { FiFileText, FiClock, FiCheckCircle } from 'react-icons/fi';

export default function AdminDashboard() {
    const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0 });

    const [loading, setLoading] = useState(true);

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
            })
            .catch(error => console.error('Error loading stats:', error))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
                <svg className="animate-spin h-12 w-12 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div>
        );
    }


    return (
        <div>


            <h1 className="text-3xl font-bold mb-2 text-gray-800">Dashboard</h1>
            <p className="text-gray-500 mb-8">Welcome back, here is an overview of your applications.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl shadow-lg text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-blue-100 text-sm font-medium uppercase tracking-wider">Total Applications</h3>
                                <p className="text-4xl font-bold mt-2">{stats.total}</p>
                            </div>
                            <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                                <FiFileText className="h-6 w-6 text-white" />
                            </div>
                        </div>
                        <div className="mt-4 text-blue-100 text-xs flex items-center">
                            All time submissions
                        </div>
                    </div>
                    {/* Decorative Background Icon */}
                    <FiFileText className="absolute -bottom-4 -right-4 h-32 w-32 text-white opacity-10 transform rotate-12" />
                </div>

                <div className="bg-gradient-to-br from-yellow-500 to-amber-600 p-6 rounded-xl shadow-lg text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-yellow-100 text-sm font-medium uppercase tracking-wider">Pending Review</h3>
                                <p className="text-4xl font-bold mt-2">{stats.pending}</p>
                            </div>
                            <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                                <FiClock className="h-6 w-6 text-white" />
                            </div>
                        </div>
                        <div className="mt-4 text-yellow-100 text-xs flex items-center">
                            Requires action
                        </div>
                    </div>
                    <FiClock className="absolute -bottom-4 -right-4 h-32 w-32 text-white opacity-10 transform rotate-12" />
                </div>

                <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-xl shadow-lg text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-green-100 text-sm font-medium uppercase tracking-wider">Approved</h3>
                                <p className="text-4xl font-bold mt-2">{stats.approved}</p>
                            </div>
                            <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                                <FiCheckCircle className="h-6 w-6 text-white" />
                            </div>
                        </div>
                        <div className="mt-4 text-green-100 text-xs flex items-center">
                            Successfully processed
                        </div>
                    </div>
                    <FiCheckCircle className="absolute -bottom-4 -right-4 h-32 w-32 text-white opacity-10 transform rotate-12" />
                </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                <div className="flex gap-4">
                    <Link href="/admin/applications" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                        View All Applications
                    </Link>
                </div>
                <ApplicationsList />
            </div>
        </div>
    );
}
