"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { FiSave, FiUser, FiLock } from 'react-icons/fi';

export default function ProfilePage() {
    const router = useRouter();
    const [adminType, setAdminType] = useState<{ id: string; username: string } | null>(null);
    const [username, setUsername] = useState('');
    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('adminUser');
        if (stored) {
            const parsed = JSON.parse(stored);
            setAdminType(parsed);
            setUsername(parsed.username);
        } else {
            toast.error("Please log in again to manage your profile");
            router.push('/admin/login');
        }
    }, []);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('/api/admin/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: adminType?.id, username })
            });
            const data = await res.json();
            if (res.ok) {
                toast.success('Username updated');
                // Update local storage
                const updated = { ...adminType!, username: data.admin.username };
                localStorage.setItem('adminUser', JSON.stringify(updated));
                setAdminType(updated);
            } else {
                toast.error(data.error || 'Failed to update user');
            }
        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (passwords.newPassword !== passwords.confirmPassword) {
            toast.error('New passwords do not match');
            return;
        }
        setLoading(true);
        try {
            const res = await fetch('/api/admin/profile', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: adminType?.id,
                    currentPassword: passwords.currentPassword,
                    newPassword: passwords.newPassword
                })
            });
            const data = await res.json();
            if (res.ok) {
                toast.success('Password changed successfully');
                setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
            } else {
                toast.error(data.error || 'Failed to change password');
            }
        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    if (!adminType) return <div className="p-8 text-center text-gray-500">Loading profile...</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Update info */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-lg font-semibold text-gray-800 border-b pb-4 mb-4 flex items-center gap-2">
                        <FiUser /> Update Details
                    </h2>
                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition w-full disabled:opacity-50"
                        >
                            Save Changes
                        </button>
                    </form>
                </div>

                {/* Change Password */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-lg font-semibold text-gray-800 border-b pb-4 mb-4 flex items-center gap-2">
                        <FiLock /> Change Password
                    </h2>
                    <form onSubmit={handleChangePassword} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                            <input
                                type="password"
                                value={passwords.currentPassword}
                                onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                            <input
                                type="password"
                                value={passwords.newPassword}
                                onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                            <input
                                type="password"
                                value={passwords.confirmPassword}
                                onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition w-full disabled:opacity-50"
                        >
                            Update Password
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
