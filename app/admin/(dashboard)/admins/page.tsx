"use client";

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { FiPlus, FiTrash2, FiEdit2, FiX } from 'react-icons/fi';

interface AdminUser {
    _id: string;
    username: string;
    createdAt: string;
}

export default function AdminsPage() {
    const [admins, setAdmins] = useState<AdminUser[]>([]);
    const [loading, setLoading] = useState(true);
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
        fetchAdmins();
    }, []);

    const fetchAdmins = async () => {
        try {
            const res = await fetch('/api/admin/users');
            if (res.ok) {
                const data = await res.json();
                setAdmins(data);
            }
        } catch (error) {
            toast.error('Failed to load admins');
        } finally {
            setLoading(false);
        }
    };

    // Reusable Confirmation Toast
    const ConfirmationToast = ({
        message,
        subMessage,
        onConfirm,
        confirmText = "Confirm",
        confirmColor = "bg-blue-600 hover:bg-blue-700",
        t
    }: {
        message: React.ReactNode,
        subMessage?: React.ReactNode,
        onConfirm: () => Promise<void>,
        confirmText?: string,
        confirmColor?: string,
        t: any
    }) => {
        const [loading, setLoading] = useState(false);

        const handleConfirm = async () => {
            setLoading(true);
            try {
                await onConfirm();
                toast.dismiss(t.id);
            } catch (error) {
                setLoading(false);
            }
        };

        return (
            <div className="flex flex-col gap-3 min-w-[350px] bg-white p-2">
                <p className="font-medium text-gray-800 text-center text-lg">
                    {message}
                    {subMessage && (
                        <>
                            <br />
                            <span className="text-base text-red-500 font-normal mt-1 block">
                                {subMessage}
                            </span>
                        </>
                    )}
                </p>
                <div className="flex justify-center gap-4 mt-2">
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg border border-gray-300 transition-colors"
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        className={`px-4 py-2 text-sm font-medium text-white rounded-lg shadow-md transition-colors flex items-center gap-2 ${confirmColor} ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading && (
                            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        )}
                        {loading ? 'Processing...' : confirmText}
                    </button>
                </div>
            </div>
        );
    };

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
                    try {
                        const res = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' });
                        if (res.ok) {
                            toast.success('Admin deleted');
                            fetchAdmins();
                        } else {
                            toast.error('Failed to delete');
                        }
                    } catch (error) {
                        toast.error('Error deleting admin');
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
                fetchAdmins();
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
                        {admins.map((admin) => (
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
                        {admins.length === 0 && (
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
