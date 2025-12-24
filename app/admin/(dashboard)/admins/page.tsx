"use client";

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { FiPlus, FiTrash2, FiEdit2, FiX } from 'react-icons/fi';
import ConfirmationToast from '@/components/ConfirmationToast';
import useSWR from 'swr';

interface AdminUser {
    _id: string;
    username: string;
    createdAt: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function AdminsPage() {
    const { data: admins, error, isLoading: loading, mutate } = useSWR<AdminUser[]>('/api/admin/users', fetcher);

    // Fallback to empty array if data isn't ready
    const adminList = admins || [];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAdmin, setEditingAdmin] = useState<AdminUser | null>(null);
    const [currentAdminId, setCurrentAdminId] = useState<string | null>(null);

    const [form, setForm] = useState({
        username: '',
        password: '',
    });

    useEffect(() => {
        const stored = localStorage.getItem('adminUser');
        if (stored) {
            const parsed = JSON.parse(stored);
            setCurrentAdminId(parsed.id);
        }
    }, []);

    const handleDelete = async (id: string) => {
        if (id === currentAdminId) {
            toast.error("You cannot delete your own account.");
            return;
        }

        toast((t) => (
            <ConfirmationToast
                t={t}
                message="Are you sure you want to delete this admin?"
                subMessage="This action cannot be undone."
                confirmText="Delete"
                confirmColor="bg-red-600 hover:bg-red-700"
                onConfirm={async () => {
                    // Optimistic delete
                    mutate(adminList.filter(a => a._id !== id), false);
                    try {
                        const res = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' });
                        if (res.ok) {
                            toast.success('Admin deleted');
                            mutate(); // Revalidate
                        } else {
                            toast.error('Failed to delete');
                            mutate(); // Rollback
                        }
                    } catch (error) {
                        toast.error('Error deleting admin');
                        mutate(); // Rollback
                    }
                }}
            />
        ), {
            duration: Infinity,
            position: 'top-center',
            style: {
                minWidth: '350px',
                borderRadius: '12px',
                boxShadow: '0 10px 30px -10px rgba(0,0,0,0.3)',
                padding: '20px',
                border: '1px solid #e2e8f0'
            }
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const url = editingAdmin ? `/api/admin/users/${editingAdmin._id}` : '/api/admin/users';
            const method = editingAdmin ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });

            const data = await res.json();
            if (res.ok) {
                toast.success(editingAdmin ? 'Admin updated' : 'Admin created');
                setIsModalOpen(false);
                setForm({ username: '', password: '' });
                setEditingAdmin(null);
                mutate(); // Refresh list
            } else {
                toast.error(data.error || 'Operation failed');
            }

        } catch (error) {
            toast.error('Something went wrong');
        }
    };

    const openModal = (admin: AdminUser | null = null) => {
        setEditingAdmin(admin);
        setForm({ username: admin?.username || '', password: '' });
        setIsModalOpen(true);
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading admins...</div>;

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">System Admins</h1>
                <button
                    onClick={() => openModal()}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    <FiPlus /> Add New Admin
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-gray-700">Username</th>
                            <th className="px-6 py-4 font-semibold text-gray-700">Created At</th>
                            <th className="px-6 py-4 font-semibold text-gray-700 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {adminList.map((admin) => (
                            <tr key={admin._id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">{admin.username}</td>
                                <td className="px-6 py-4 text-gray-500 text-sm">{new Date(admin.createdAt).toLocaleDateString()}</td>
                                <td className="px-6 py-4 text-right space-x-2">
                                    <button
                                        onClick={() => openModal(admin)}
                                        className="text-blue-600 hover:text-blue-800 p-2 rounded hover:bg-blue-50 transition"
                                    >
                                        <FiEdit2 />
                                    </button>
                                    {admin._id !== currentAdminId && (
                                        <button
                                            onClick={() => handleDelete(admin._id)}
                                            className="text-red-600 hover:text-red-800 p-2 rounded hover:bg-red-50 transition"
                                        >
                                            <FiTrash2 />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {adminList.length === 0 && (
                            <tr>
                                <td colSpan={3} className="px-6 py-8 text-center text-gray-500">No admins found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/30 backdrop-blur-md transition-all duration-300">
                    <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 transform transition-all scale-100">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-800">
                                {editingAdmin ? 'Edit Admin' : 'Add New Admin'}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <FiX className="w-6 h-6" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                                <input
                                    type="text"
                                    value={form.username}
                                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {editingAdmin ? 'New Password (leave blank to keep)' : 'Password'}
                                </label>
                                <input
                                    type="password"
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                    required={!editingAdmin}
                                />
                            </div>
                            <div className="pt-2 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                >
                                    {editingAdmin ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
