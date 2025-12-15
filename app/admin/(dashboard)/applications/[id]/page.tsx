"use client";

import { useEffect, useState, useMemo, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function ApplicationDetails() {
    const params = useParams();
    const id = params?.id as string;
    const [application, setApplication] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Lightbox State
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

    useEffect(() => {
        if (id) {
            fetch(`/api/application/${id}`)
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        setApplication(data.data);
                    }
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        }
    }, [id]);


    // Reusable Confirmation Toast Component
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
                // Error handling is done inside onConfirm typically via toast.error, 
                // but we can also handle it here if needed.
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

    const updateStatus = async (status: string) => {
        toast((t) => (
            <ConfirmationToast
                t={t}
                message={<span>Are you sure you want to mark this as <span className="font-bold">{status}</span>?</span>}
                onConfirm={async () => {
                    try {
                        const res = await fetch(`/api/application/${id}`, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ status }),
                        });
                        const data = await res.json();
                        if (data.success) {
                            setApplication(data.data);
                            toast.success('Status updated successfully');
                        } else {
                            toast.error('Failed to update status');
                        }
                    } catch (err) {
                        toast.error('Failed to update status');
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

    const deleteApplication = async () => {
        toast((t) => (
            <ConfirmationToast
                t={t}
                message="Are you sure you want to delete this application?"
                subMessage="This action cannot be undone."
                confirmText="Delete"
                confirmColor="bg-red-600 hover:bg-red-700"
                onConfirm={async () => {
                    try {
                        const res = await fetch(`/api/application/${id}`, {
                            method: 'DELETE',
                        });
                        const data = await res.json();
                        if (data.success) {
                            toast.success('Application deleted');
                            router.push('/admin/applications');
                        } else {
                            toast.error('Failed to delete');
                        }
                    } catch (err) {
                        toast.error('Failed to delete');
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

    // Flatten all images into a single array for navigation
    const allImages = useMemo(() => {
        if (!application) return [];
        const images = [];
        if (application.photo) images.push({ src: application.photo, type: 'Passport Photo' });
        if (application.documents && application.documents.length > 0) {
            application.documents.forEach((doc: string, idx: number) => {
                images.push({ src: doc, type: `Document ${idx + 1}` });
            });
        }
        return images;
    }, [application]);

    const handleNext = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (selectedImageIndex === null) return;
        setSelectedImageIndex((prev) => (prev! + 1) % allImages.length);
    }, [selectedImageIndex, allImages.length]);

    const handlePrev = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (selectedImageIndex === null) return;
        setSelectedImageIndex((prev) => (prev! - 1 + allImages.length) % allImages.length);
    }, [selectedImageIndex, allImages.length]);

    // Keyboard navigation
    useEffect(() => {
        if (selectedImageIndex === null) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'Escape') setSelectedImageIndex(null);
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImageIndex, handleNext, handlePrev]);


    if (loading) {
        return (
            <div className="flex h-[80vh] items-center justify-center">
                <svg className="animate-spin h-12 w-12 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div>
        );
    }
    if (!application) return <div>Application not found</div>;

    const currentImage = selectedImageIndex !== null ? allImages[selectedImageIndex] : null;

    return (
        <div>
            {/* Navigable Lightbox Modal */}
            {currentImage && (
                <div
                    className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-95 backdrop-blur-sm p-4 animate-in fade-in duration-200"
                    onClick={() => setSelectedImageIndex(null)}
                >
                    <div className="relative w-full h-full flex items-center justify-center pointer-events-none">

                        {/* Wrapper for content to catch clicks and prevent closing */}
                        <div className="relative max-h-screen w-full flex flex-col items-center justify-center pointer-events-auto" onClick={e => e.stopPropagation()}>

                            {/* Close Button */}
                            <button
                                className="absolute top-4 right-4 text-white/70 hover:text-white z-50 p-2 rounded-full hover:bg-white/10 transition"
                                onClick={() => setSelectedImageIndex(null)}
                            >
                                <FiX className="h-8 w-8" />
                            </button>

                            {/* Main Image */}
                            <img
                                src={currentImage.src}
                                alt="Full screen"
                                className="max-h-[85vh] max-w-full object-contain shadow-2xl rounded-lg"
                            />
                            <p className="text-gray-400 mt-4 font-medium text-lg px-4 py-2 bg-black/50 rounded-full">
                                {currentImage.type} <span className="text-gray-600 text-sm ml-2">({selectedImageIndex! + 1} / {allImages.length})</span>
                            </p>

                            {/* Prev Button */}
                            <button
                                className="absolute left-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition backdrop-blur-sm group"
                                onClick={handlePrev}
                            >
                                <FiChevronLeft className="h-8 w-8 group-hover:-translate-x-1 transition-transform" />
                            </button>

                            {/* Next Button */}
                            <button
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition backdrop-blur-sm group"
                                onClick={handleNext}
                            >
                                <FiChevronRight className="h-8 w-8 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Application Details</h1>
                <Link href="/admin/applications" className="text-blue-600 hover:underline">
                    ← Back to List
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow p-8">
                <div className="flex justify-between items-start mb-8 border-b pb-6">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">{application.name}</h2>
                        <p className="text-gray-500">Submitted on {new Date(application.createdAt).toLocaleString()}</p>
                        <div className="mt-2">
                            <span className={`px-3 py-1 text-sm font-semibold rounded-full 
                        ${application.status === 'approved' ? 'bg-green-100 text-green-800' :
                                    application.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                        'bg-yellow-100 text-yellow-800'}`}>
                                {application.status.toUpperCase()}
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {application.status !== 'approved' && (
                            <button onClick={() => updateStatus('approved')} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                                Approve
                            </button>
                        )}
                        {application.status !== 'rejected' && (
                            <button onClick={() => updateStatus('rejected')} className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700">
                                Reject
                            </button>
                        )}
                        <button onClick={deleteApplication} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                            Delete
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold border-b pb-2">Personal Information</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <span className="block text-sm text-gray-500">Father's Name</span>
                                <span className="text-gray-900">{application.father_name}</span>
                            </div>
                            <div>
                                <span className="block text-sm text-gray-500">Mother's Name</span>
                                <span className="text-gray-900">{application.mother_name}</span>
                            </div>
                            <div>
                                <span className="block text-sm text-gray-500">Email</span>
                                <span className="text-gray-900">{application.email}</span>
                            </div>
                            <div>
                                <span className="block text-sm text-gray-500">Phone</span>
                                <span className="text-gray-900">{application.phone}</span>
                            </div>
                            <div>
                                <span className="block text-sm text-gray-500">NID</span>
                                <span className="text-gray-900">{application.nid}</span>
                            </div>
                            <div>
                                <span className="block text-sm text-gray-500">Passport</span>
                                <span className="text-gray-900">{application.passport || 'N/A'}</span>
                            </div>
                            <div>
                                <span className="block text-sm text-gray-500">Visa Type</span>
                                <span className="text-gray-900">{application.visa_type}</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold border-b pb-2">Address & Job</h3>
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <span className="block text-sm text-gray-500">Current Address</span>
                                <span className="text-gray-900">{application.current_address}</span>
                            </div>
                            <div>
                                <span className="block text-sm text-gray-500">Permanent Address</span>
                                <span className="text-gray-900">{application.permanent_address}</span>
                            </div>
                            <div>
                                <span className="block text-sm text-gray-500">Job Name</span>
                                <span className="text-gray-900">{application.job_name || 'N/A'}</span>
                            </div>
                            <div>
                                <span className="block text-sm text-gray-500">Job Category</span>
                                <span className="text-gray-900">{application.job_category || 'N/A'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <h3 className="text-lg font-semibold border-b pb-2 mb-4">Experience</h3>
                    <p className="text-gray-700 whitespace-pre-wrap">{application.experience || 'No experience details provided.'}</p>
                </div>

                <div className="mt-8">
                    <h3 className="text-lg font-semibold border-b pb-2 mb-4">Documents Gallery</h3>

                    <div className="mb-6">
                        <h4 className="font-medium text-gray-700 mb-2">Passport</h4>
                        {application.photo ? (
                            <div
                                className="inline-block border-4 border-white shadow-lg rounded-xl overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300 bg-gray-50"
                                onClick={() => {
                                    // Find index of passport photo
                                    const idx = allImages.findIndex(img => img.src === application.photo);
                                    if (idx !== -1) setSelectedImageIndex(idx);
                                }}
                            >
                                <img src={application.photo} alt="Passport" className="max-w-xs h-auto block" />
                            </div>
                        ) : (
                            <p className="text-gray-500 italic">No passport photo uploaded.</p>
                        )}
                    </div>

                    <div>
                        <h4 className="font-medium text-gray-700 mb-4">Supporting Documents</h4>
                        {application.documents && application.documents.length > 0 ? (
                            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 mx-auto">
                                {application.documents.map((doc: string, idx: number) => (
                                    <div
                                        key={idx}
                                        className="break-inside-avoid relative group rounded-xl overflow-hidden border border-gray-100 shadow-md cursor-zoom-in bg-white"
                                        onClick={() => {
                                            // Find index of this document
                                            // Note: using findIndex is safer than assuming offsets because the array order is static but safe
                                            const globalIdx = allImages.findIndex(img => img.src === doc);
                                            if (globalIdx !== -1) setSelectedImageIndex(globalIdx);
                                        }}
                                    >
                                        <img
                                            src={doc}
                                            alt={`Document ${idx}`}
                                            className="w-full h-auto block transform group-hover:scale-110 transition-transform duration-500 ease-out"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                                            <span className="text-white text-xs font-medium px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                                                View Fullscreen
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 italic">No supporting documents uploaded.</p>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
