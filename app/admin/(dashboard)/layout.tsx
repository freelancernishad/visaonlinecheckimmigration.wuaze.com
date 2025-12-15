"use client";

import Link from 'next/link';
import { ReactNode, useState } from 'react';
import { FiMenu, FiX, FiGrid, FiList, FiLogOut, FiLayout, FiSettings } from 'react-icons/fi';
import { Toaster } from 'react-hot-toast';

// This layout only applies to routes inside (dashboard) group
export default function DashboardLayout({ children }: { children: ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-100 relative">
            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-slate-900 text-white flex items-center justify-between px-4 z-30 shadow-md">
                <div className="flex items-center space-x-2">
                    <div className="bg-blue-600 p-1.5 rounded">
                        <FiLayout className="h-5 w-5" />
                    </div>
                    <span className="font-bold text-xl tracking-tight">Admin Panel</span>
                </div>
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="p-2.5 rounded-lg hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-700"
                >
                    <FiMenu className="h-6 w-6" />
                </button>
            </div>

            {/* Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-800 text-white transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="h-16 flex items-center justify-between px-6 bg-slate-900 shadow-md">
                    <div className="flex items-center space-x-2">
                        <div className="bg-blue-600 p-1.5 rounded md:block hidden">
                            <FiLayout className="h-5 w-5" />
                        </div>
                        <span className="font-bold text-xl tracking-tight">Admin Panel</span>
                    </div>
                    {/* Close button for mobile inside sidebar */}
                    <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-400 hover:text-white transition-colors">
                        <FiX className="h-6 w-6" />
                    </button>
                </div>

                <nav className="mt-6 flex-1 px-4 space-y-2">
                    <Link
                        href="/admin/dashboard"
                        className="flex items-center px-4 py-3 text-gray-300 rounded-lg hover:bg-slate-700 hover:text-white transition-colors group"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <FiGrid className="mr-3 h-5 w-5 group-hover:text-blue-400 transition-colors" />
                        Dashboard
                    </Link>
                    <Link
                        href="/admin/applications"
                        className="flex items-center px-4 py-3 text-gray-300 rounded-lg hover:bg-slate-700 hover:text-white transition-colors group"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <FiList className="mr-3 h-5 w-5 group-hover:text-amber-400 transition-colors" />
                        Applications
                    </Link>
                    <Link
                        href="/admin/settings"
                        className="flex items-center px-4 py-3 text-gray-300 rounded-lg hover:bg-slate-700 hover:text-white transition-colors group"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <FiSettings className="mr-3 h-5 w-5 group-hover:text-cyan-400 transition-colors" />
                        Settings
                    </Link>
                    <Link
                        href="/admin/homepage"
                        className="flex items-center px-4 py-3 text-gray-300 rounded-lg hover:bg-slate-700 hover:text-white transition-colors group"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <FiLayout className="mr-3 h-5 w-5 group-hover:text-green-400 transition-colors" />
                        Home Page
                    </Link>
                </nav>
                <div className="p-4 bg-slate-900 border-t border-slate-700">
                    <button
                        onClick={() => {
                            // Determine logic for logout: e.g. clear cookie/localstorage
                            window.location.href = '/admin/login';
                        }}
                        className="flex items-center justify-center w-full py-2.5 px-4 rounded bg-red-600 hover:bg-red-700 text-white transition-colors shadow-lg shadow-red-900/20 text-sm font-medium"
                    >
                        <FiLogOut className="mr-2 h-4 w-4" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-4 md:p-8 pt-20 md:pt-8 bg-gray-100 w-full">
                <Toaster position="top-right" />
                {children}
            </main>
        </div>
    );
}
