"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiCalendar, FiCreditCard, FiMail, FiUser, FiEye, FiFileText } from 'react-icons/fi';

export default function ApplicationsList() {
    const [applications, setApplications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/application')
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setApplications(data.data);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <svg className="animate-spin h-10 w-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Applications</h1>

            {/* Desktop View */}
            <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visa Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {applications.map((app) => (
                            <tr key={app._id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(app.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{app.name}</div>
                                    <div className="text-sm text-gray-500">{app.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {app.visa_type}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${app.status === 'approved' ? 'bg-green-100 text-green-800' :
                                            app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                                'bg-yellow-100 text-yellow-800'}`}>
                                        {app.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <Link href={`/admin/applications/${app._id}`} className="text-indigo-600 hover:text-indigo-900">
                                        View
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        {applications.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">No applications found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile View */}
            <div className="md:hidden space-y-4">
                {applications.map((app) => (
                    <div key={app._id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 transition-shadow hover:shadow-md">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center space-x-3">
                                <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                    <FiUser className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-gray-900">{app.name}</h3>
                                    <div className="flex items-center text-xs text-gray-500 mt-0.5">
                                        <FiMail className="mr-1.5 h-3 w-3" />
                                        {app.email}
                                    </div>
                                </div>
                            </div>
                            <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border 
                    ${app.status === 'approved' ? 'bg-green-50 text-green-700 border-green-200' :
                                    app.status === 'rejected' ? 'bg-red-50 text-red-700 border-red-200' :
                                        'bg-yellow-50 text-yellow-700 border-yellow-200'}`}>
                                {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="text-gray-500 text-xs uppercase font-medium flex items-center mb-1">
                                    <FiCalendar className="mr-1.5 h-3.5 w-3.5" /> Date
                                </p>
                                <p className="font-semibold text-gray-800 text-sm">
                                    {new Date(app.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="text-gray-500 text-xs uppercase font-medium flex items-center mb-1">
                                    <FiCreditCard className="mr-1.5 h-3.5 w-3.5" /> Visa Type
                                </p>
                                <p className="font-semibold text-gray-800 text-sm">
                                    {app.visa_type}
                                </p>
                            </div>
                        </div>

                        <Link
                            href={`/admin/applications/${app._id}`}
                            className="flex items-center justify-center w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors text-sm"
                        >
                            <FiEye className="mr-2 h-4 w-4" /> View Details
                        </Link>
                    </div>
                ))}
                {applications.length === 0 && (
                    <div className="bg-white p-8 rounded-xl shadow-sm text-center border border-gray-100">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 mb-4">
                            <FiFileText className="h-6 w-6 text-gray-400" />
                        </div>
                        <p className="text-gray-500">No applications found.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
