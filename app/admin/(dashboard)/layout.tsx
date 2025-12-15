import Link from 'next/link';
import { ReactNode } from 'react';

// This layout only applies to routes inside (dashboard) group
export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-800 text-white flex-shrink-0 hidden md:flex flex-col">
                <div className="p-4 text-center text-2xl font-bold bg-slate-900 shadow-md">
                    Admin Panel
                </div>
                <nav className="mt-6 flex-1 px-4 space-y-2">
                    <Link href="/admin/dashboard" className="block py-2.5 px-4 rounded hover:bg-slate-700 transition">
                        Dashboard
                    </Link>
                    <Link href="/admin/applications" className="block py-2.5 px-4 rounded hover:bg-slate-700 transition">
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
            <main className="flex-1 overflow-y-auto p-4 md:p-8">
                {children}
            </main>
        </div>
    );
}
