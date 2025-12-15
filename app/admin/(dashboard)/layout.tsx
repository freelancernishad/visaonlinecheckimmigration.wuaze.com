"use client";

import Link from 'next/link';
import { ReactNode, useState } from 'react';

// This layout only applies to routes inside (dashboard) group
export default function DashboardLayout({ children }: { children: ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-100 relative">
            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-slate-900 text-white flex items-center justify-between px-4 z-30 shadow-md">
                <span className="font-bold text-xl">Admin Panel</span>
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="p-2 rounded hover:bg-slate-800 focus:outline-none"
                >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {/* Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-800 text-white transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="p-4 text-center text-2xl font-bold bg-slate-900 shadow-md flex justify-between items-center md:block">
                    <span>Admin Panel</span>
                    {/* Close button for mobile inside sidebar */}
                    <button onClick={() => setSidebarOpen(false)} className="md:hidden">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <nav className="mt-6 flex-1 px-4 space-y-2">
                    <Link
                        href="/admin/dashboard"
                        className="block py-2.5 px-4 rounded hover:bg-slate-700 transition"
                        onClick={() => setSidebarOpen(false)}
                    >
                        Dashboard
                    </Link>
                    <Link
                        href="/admin/applications"
                        className="block py-2.5 px-4 rounded hover:bg-slate-700 transition"
                        onClick={() => setSidebarOpen(false)}
                    >
                        Applications
                    </Link>
                </nav>
                <div className="p-4 bg-slate-900">
                    <button
                        onClick={() => {
                            // Determine logic for logout: e.g. clear cookie/localstorage
                            window.location.href = '/admin/login';
                        }}
                        className="block w-full py-2 px-4 rounded bg-red-600 hover:bg-red-700 text-white text-center transition text-sm font-bold"
                    >
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-4 md:p-8 pt-20 md:pt-8 bg-gray-100 w-full">
                {children}
            </main>
        </div>
    );
}
