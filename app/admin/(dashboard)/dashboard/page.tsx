"use client";

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import ApplicationsList from '../applications/page';
import { FiFileText, FiClock, FiCheckCircle, FiPieChart, FiBarChart2 } from 'react-icons/fi';
import {
    PieChart, Pie, Cell, ResponsiveContainer,
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';

export default function AdminDashboard() {
    const [applications, setApplications] = useState<any[]>([]);
    const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/application')
            .then(res => res.json())
            .then(data => {
                if (data.success && Array.isArray(data.data)) {
                    const apps = data.data;
                    setApplications(apps);
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

    // Prepare data for Status Distribution (Pie Chart)
    const statusData = useMemo(() => {
        const counts: any = { pending: 0, approved: 0, rejected: 0 };
        applications.forEach(app => {
            if (counts[app.status] !== undefined) {
                counts[app.status]++;
            } else {
                // If there are other statuses not accounted for
                counts['pending'] = (counts['pending'] || 0) + 1;
            }
        });

        return [
            { name: 'Pending', value: counts.pending, color: '#F59E0B' }, // Yellow
            { name: 'Approved', value: counts.approved, color: '#10B981' }, // Green
            { name: 'Rejected', value: counts.rejected, color: '#EF4444' }, // Red
        ].filter(item => item.value > 0);
    }, [applications]);

    // Prepare data for Applications Over Time (Bar Chart) - Last 7 days
    const timelineData = useMemo(() => {
        const last7Days = [...Array(7)].map((_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - i);
            return d.toISOString().split('T')[0];
        }).reverse();

        const dataMap = last7Days.reduce((acc: any, date) => {
            acc[date] = 0;
            return acc;
        }, {});

        applications.forEach(app => {
            const date = app.createdAt.split('T')[0];
            if (dataMap[date] !== undefined) {
                dataMap[date]++;
            }
        });

        return Object.keys(dataMap).map(date => ({
            date: new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
            count: dataMap[date]
        }));
    }, [applications]);


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

            {/* Stats Cards */}
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

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Status Distribution */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-gray-800 flex items-center">
                            <FiPieChart className="mr-2 text-blue-500" /> Application Status
                        </h2>
                    </div>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={statusData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {statusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Applications Trend */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-gray-800 flex items-center">
                            <FiBarChart2 className="mr-2 text-blue-500" /> New Applications (Last 7 Days)
                        </h2>
                    </div>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={timelineData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="date" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} allowDecimals={false} />
                                <Tooltip
                                    cursor={{ fill: '#F3F4F6' }}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                />
                                <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={30} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Recent Applications List */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Recent Applications</h2>
                    <Link href="/admin/applications" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                        View All
                    </Link>
                </div>
                <ApplicationsList />
            </div>
        </div>
    );
}
