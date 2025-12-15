"use client";

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function ApplicationDetails() {
    const params = useParams();
    const id = params?.id as string;
    const [application, setApplication] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

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

    const updateStatus = async (status: string) => {
        if (!confirm(`Are you sure you want to mark this as ${status}?`)) return;

        try {
            const res = await fetch(`/api/application/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status }),
            });
            const data = await res.json();
            if (data.success) {
                setApplication(data.data);
                alert('Status updated successfully');
            }
        } catch (err) {
            alert('Failed to update status');
        }
    };

    const deleteApplication = async () => {
        if (!confirm('Are you sure you want to delete this application? This cannot be undone.')) return;

        try {
            const res = await fetch(`/api/application/${id}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (data.success) {
                alert('Application deleted');
                router.push('/admin/applications');
            }
        } catch (err) {
            alert('Failed to delete');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (!application) return <div>Application not found</div>;

    return (
        <div>
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
                    <h3 className="text-lg font-semibold border-b pb-2 mb-4">Documents</h3>

                    <div className="mb-6">
                        <h4 className="font-medium text-gray-700 mb-2">Passport Photo</h4>
                        {application.photo ? (
                            <img src={application.photo} alt="Passport" className="max-w-xs border rounded shadow-sm" />
                        ) : (
                            <p className="text-gray-500">No photo uploaded.</p>
                        )}
                    </div>

                    <div>
                        <h4 className="font-medium text-gray-700 mb-2">Attached Documents</h4>
                        {application.documents && application.documents.length > 0 ? (
                            <div className="flex flex-wrap gap-4">
                                {application.documents.map((doc: string, idx: number) => (
                                    <img key={idx} src={doc} alt={`Document ${idx}`} className="max-w-xs border rounded shadow-sm" />
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">No documents uploaded.</p>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
