"use client";

import { useState, useMemo } from 'react';
import { FiUpload, FiCopy, FiCheck, FiImage, FiTrash2, FiSearch } from 'react-icons/fi';
import toast from 'react-hot-toast';
import useSWR from 'swr';

interface MediaFile {
    _id: string; // Database ID
    url: string;
    name: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function MediaPage() {
    const { data, error, isLoading, mutate } = useSWR('/api/upload', fetcher);

    const [uploading, setUploading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const files: MediaFile[] = data?.files || [];

    const filteredFiles = useMemo(() => {
        if (!searchTerm) return files;
        return files.filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [searchTerm, files]);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !e.target.files[0]) return;

        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        setUploading(true);
        const loadingToast = toast.loading('Uploading...');

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();

            if (data.success) {
                toast.success('Image uploaded successfully', { id: loadingToast });
                mutate(); // Refresh the list
            } else {
                toast.error(data.error || 'Upload failed', { id: loadingToast });
            }
        } catch (error) {
            toast.error('Upload failed', { id: loadingToast });
        } finally {
            setUploading(false);
            e.target.value = ''; // Reset input
        }
    };

    const copyToClipboard = (url: string) => {
        const fullUrl = window.location.origin + url;

        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(fullUrl).then(() => {
                toast.success('URL copied to clipboard');
            }).catch(() => {
                fallbackCopy(fullUrl);
            });
        } else {
            fallbackCopy(fullUrl);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this image?')) return;

        const loadingToast = toast.loading('Deleting...');
        // Optimistic update: Remove locally immediately
        mutate(
            { ...data, files: files.filter(f => f._id !== id) },
            false
        );

        try {
            const res = await fetch('/api/upload', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            });
            const resData = await res.json();

            if (resData.success) {
                toast.success('Image deleted', { id: loadingToast });
                mutate(); // Revalidate to be sure
            } else {
                toast.error(resData.error || 'Delete failed', { id: loadingToast });
                mutate(); // Revert on error
            }
        } catch (error) {
            toast.error('Delete failed', { id: loadingToast });
            mutate(); // Revert on error
        }
    };

    const fallbackCopy = (text: string) => {
        const textArea = document.createElement("textarea");
        textArea.value = text;

        // Avoid scrolling to bottom
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            const successful = document.execCommand('copy');
            if (successful) {
                toast.success('URL copied to clipboard');
            } else {
                toast.error('Failed to copy URL');
            }
        } catch (err) {
            toast.error('Failed to copy URL');
        }

        document.body.removeChild(textArea);
    };

    return (
        <div className="space-y-8 p-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Media Gallery</h1>
                    <p className="text-gray-500 mt-1">Manage and organize your uploaded images.</p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative group flex-1 md:w-64">
                        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search images..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        />
                    </div>

                    <div className="relative">
                        <input
                            type="file"
                            id="file-upload"
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileUpload}
                            disabled={uploading}
                        />
                        <label
                            htmlFor="file-upload"
                            className={`flex items-center justify-center px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all cursor-pointer ${uploading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {uploading ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Uploading...
                                </span>
                            ) : (
                                <>
                                    <FiUpload className="mr-2 h-5 w-5" />
                                    Upload New
                                </>
                            )}
                        </label>
                    </div>
                </div>
            </div>

            {/* Gallery Grid */}
            <div className="min-h-[400px]">
                {isLoading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <div key={i} className="aspect-square bg-gray-200 rounded-xl"></div>
                        ))}
                    </div>
                ) : filteredFiles.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-96 bg-white rounded-2xl border-2 border-dashed border-gray-200">
                        <div className="bg-gray-50 p-6 rounded-full mb-4">
                            <FiImage className="h-10 w-10 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700">No images found</h3>
                        <p className="text-gray-500 mt-2 max-w-sm text-center">
                            {searchTerm ? 'Try adjusting your search terms.' : 'Upload your first image to get started with the media gallery.'}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {filteredFiles.map((file, index) => (
                            <div key={file._id || index} className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                                <div className="aspect-square w-full relative overflow-hidden bg-gray-100">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={file.url}
                                        alt={file.name}
                                        className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 backdrop-blur-[2px]">
                                        <button
                                            onClick={() => copyToClipboard(file.url)}
                                            className="transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-white/90 hover:bg-white text-gray-900 px-4 py-2 rounded-lg font-medium shadow-lg flex items-center text-sm backdrop-blur-sm"
                                            title="Copy URL"
                                        >
                                            <FiCopy className="mr-2" /> Copy
                                        </button>
                                        <button
                                            onClick={() => handleDelete(file._id)}
                                            className="transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75 bg-red-500/90 hover:bg-red-600 text-white px-3 py-2 rounded-lg font-medium shadow-lg flex items-center backdrop-blur-sm"
                                            title="Delete"
                                        >
                                            <FiTrash2 />
                                        </button>
                                    </div>
                                </div>
                                <div className="p-3">
                                    <p className="text-sm font-medium text-gray-700 truncate select-all" title={file.name}>
                                        {file.name.split('_').slice(1).join('_') || file.name}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1 truncate">
                                        {new Date(parseInt(file.name.split('_')[0]) || Date.now()).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
