"use client";

import { useState, useEffect } from 'react';
import { FiSave, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

export default function SettingsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const [settings, setSettings] = useState({
        email: '',
        phone: '',
        socialLinks: {
            facebook: '',
            twitter: '',
            linkedin: '',
            instagram: '',
            youtube: '',
        },
        siteTitle: '',
        footerText: '',
        copyrightText: '',
        adminRegistrationOpen: true,
    });

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await fetch('/api/settings');
            if (res.ok) {
                const data = await res.json();
                setSettings({
                    email: data.email || '',
                    phone: data.phone || '',
                    socialLinks: {
                        facebook: data.socialLinks?.facebook || '',
                        twitter: data.socialLinks?.twitter || '',
                        linkedin: data.socialLinks?.linkedin || '',
                        instagram: data.socialLinks?.instagram || '',
                        youtube: data.socialLinks?.youtube || '',
                    },
                    siteTitle: data.siteTitle || '',
                    footerText: data.footerText || '',
                    copyrightText: data.copyrightText || '',
                    adminRegistrationOpen: data.adminRegistrationOpen !== undefined ? data.adminRegistrationOpen : true,
                });
            }
        } catch (error) {
            console.error('Error fetching settings:', error);
            setMessage({ type: 'error', text: 'Failed to load settings.' });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name.startsWith('social_')) {
            const socialKey = name.replace('social_', '');
            setSettings(prev => ({
                ...prev,
                socialLinks: {
                    ...prev.socialLinks,
                    [socialKey]: value
                }
            }));
        } else {
            setSettings(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage(null);

        try {
            const res = await fetch('/api/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings),
            });

            if (res.ok) {
                setMessage({ type: 'success', text: 'Settings updated successfully!' });
            } else {
                setMessage({ type: 'error', text: 'Failed to update settings.' });
            }
        } catch (error) {
            console.error('Error updating settings:', error);
            setMessage({ type: 'error', text: 'An error occurred while saving.' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="p-8 text-center text-gray-500">Loading settings...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Site Settings</h1>
            </div>

            {message && (
                <div className={`p-4 rounded-lg flex items-center gap-2 ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                    }`}>
                    {message.type === 'success' ? <FiCheckCircle /> : <FiAlertCircle />}
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-8">

                {/* General Information */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">General Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Site Title</label>
                            <input
                                type="text"
                                name="siteTitle"
                                value={settings.siteTitle}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                placeholder="E-VISA"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                            <input
                                type="email"
                                name="email"
                                value={settings.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                placeholder="admin@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
                            <input
                                type="text"
                                name="phone"
                                value={settings.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                placeholder="+123456789"
                            />
                        </div>

                    </div>
                </div>

                {/* Admin Registration Control */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Admin Settings</h2>
                    <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div>
                            <h3 className="font-medium text-gray-900">Public Admin Registration</h3>
                            <p className="text-sm text-gray-500">Allow new admins to register via the public registration page.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                name="adminRegistrationOpen"
                                checked={settings.adminRegistrationOpen}
                                onChange={(e) => setSettings(prev => ({ ...prev, adminRegistrationOpen: e.target.checked }))}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                </div>

                {/* Footer Content */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Footer Content</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Copyright Text</label>
                            <input
                                type="text"
                                name="copyrightText"
                                value={settings.copyrightText}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                placeholder="© 2024 My Company. All rights reserved."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Footer Text (Optional)</label>
                            <input
                                type="text"
                                name="footerText"
                                value={settings.footerText}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                placeholder="Additional footer text..."
                            />
                        </div>
                    </div>
                </div>

                {/* Social Links */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Social Links</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Facebook URL</label>
                            <input
                                type="text"
                                name="social_facebook"
                                value={settings.socialLinks.facebook}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                placeholder="https://facebook.com/..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Twitter URL</label>
                            <input
                                type="text"
                                name="social_twitter"
                                value={settings.socialLinks.twitter}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                placeholder="https://twitter.com/..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
                            <input
                                type="text"
                                name="social_linkedin"
                                value={settings.socialLinks.linkedin}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                placeholder="https://linkedin.com/..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Instagram URL</label>
                            <input
                                type="text"
                                name="social_instagram"
                                value={settings.socialLinks.instagram}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                placeholder="https://instagram.com/..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">YouTube URL</label>
                            <input
                                type="text"
                                name="social_youtube"
                                value={settings.socialLinks.youtube}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                placeholder="https://youtube.com/..."
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-4 flex justify-end">
                    <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-900/20 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                    >
                        {saving ? (
                            <>
                                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                                Saving...
                            </>
                        ) : (
                            <>
                                <FiSave className="w-5 h-5" />
                                Save Changes
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
