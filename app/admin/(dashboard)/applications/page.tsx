"use client";

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import {
    FiCalendar,
    FiCreditCard,
    FiMail,
    FiUser,
    FiEye,
    FiFileText,
    FiPhone,
    FiSidebar,
    FiCheck,
    FiX,
    FiTrash2,
    FiMoreVertical,
    FiBriefcase,
    FiHash,
    FiChevronDown,
    FiMapPin,
    FiSearch,
    FiChevronLeft,
    FiChevronRight,
    FiFilter
} from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function ApplicationsList() {
    const [applications, setApplications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const [menuPosition, setMenuPosition] = useState<'up' | 'down'>('down');

    // Filter States
    const [searchTerm, setSearchTerm] = useState(''); // Global Search
    const [statusFilter, setStatusFilter] = useState('');
    const [passportFilter, setPassportFilter] = useState('');
    const [mobileFilter, setMobileFilter] = useState('');
    const [emailFilter, setEmailFilter] = useState('');

    const [isSearchFocused, setIsSearchFocused] = useState(false);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const menuRef = useRef<HTMLDivElement>(null);

    const fetchApplications = () => {
        setLoading(true);
        fetch('/api/application')
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setApplications(data.data);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpenMenuId(null);
            }
        };

        if (openMenuId) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openMenuId]);

    // Reset to first page when any filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, statusFilter, passportFilter, mobileFilter, emailFilter]);

    const toggleMenu = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();

        if (openMenuId === id) {
            setOpenMenuId(null);
            return;
        }

        // Determine direction based on available space
        const button = e.currentTarget as HTMLButtonElement;
        const rect = button.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const estimatedMenuHeight = 220; // 5 items * ~40px + padding

        // If less space below than menu height, open up
        if (spaceBelow < estimatedMenuHeight) {
            setMenuPosition('up');
        } else {
            setMenuPosition('down');
        }

        setOpenMenuId(id);
    };

    // Filter applications based on ALL filters
    const filteredApplications = applications.filter(app => {
        const searchLower = searchTerm.toLowerCase();

        // Global Search (checks name, passport, phone, email, nid, visa_type)
        const matchesSearch = (
            app.name?.toLowerCase().includes(searchLower) ||
            app.passport?.toLowerCase().includes(searchLower) ||
            app.phone?.toLowerCase().includes(searchLower) ||
            app.email?.toLowerCase().includes(searchLower) ||
            app.nid?.toLowerCase().includes(searchLower) ||
            app.visa_type?.toLowerCase().includes(searchLower)
        );

        // Specific Filters
        const matchesStatus = statusFilter ? app.status === statusFilter : true;
        const matchesPassport = passportFilter ? app.passport?.toLowerCase().includes(passportFilter.toLowerCase()) : true;
        const matchesMobile = mobileFilter ? app.phone?.toLowerCase().includes(mobileFilter.toLowerCase()) : true;
        const matchesEmail = emailFilter ? app.email?.toLowerCase().includes(emailFilter.toLowerCase()) : true;

        return matchesSearch && matchesStatus && matchesPassport && matchesMobile && matchesEmail;
    });

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredApplications.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    // Calculate visible pages for smart pagination (same logic as before)
    const getVisiblePages = () => {
        if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
        if (currentPage <= 4) return [1, 2, 3, 4, 5, '...', totalPages];
        if (currentPage >= totalPages - 3) return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
        return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
    };

    const visiblePages = getVisiblePages();

    // Reusable Confirmation Toast Component (same as before)
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

    const updateStatus = async (id: string, status: string) => {
        setOpenMenuId(null);
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
                            setApplications(prev => prev.map(app => app._id === id ? { ...app, status } : app));
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
                boxShadow: '0 10px 30px -10px, rgba(0,0,0,0.3)',
                padding: '20px',
                border: '1px solid #e2e8f0'
            }
        });
    };

    const deleteApplication = async (id: string) => {
        setOpenMenuId(null);
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
                            setApplications(prev => prev.filter(app => app._id !== id));
                            toast.success('Application deleted');
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

    // Helper for input classes to keep code clean
    const inputClasses = "pl-10 pr-4 py-2.5 w-full border border-gray-200 rounded-xl shadow-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all duration-200 text-sm";
    const iconContainerClasses = "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400";

    return (
        <div className="min-h-[80vh]">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Applications</h1>

            {/* Filter Grid */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">

                    {/* 1. Global Search */}
                    <div className="relative">
                        <div className={iconContainerClasses}>
                            <FiSearch />
                        </div>
                        <input
                            type="text"
                            placeholder="General Search..."
                            className={inputClasses}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* 2. Status Filter */}
                    <div className="relative">
                        <div className={iconContainerClasses}>
                            <FiFilter />
                        </div>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className={`${inputClasses} appearance-none cursor-pointer`}
                        >
                            <option value="">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                            <FiChevronDown size={14} />
                        </div>
                    </div>

                    {/* 3. Passport Filter */}
                    <div className="relative">
                        <div className={iconContainerClasses}>
                            <FiSidebar />
                        </div>
                        <input
                            type="text"
                            placeholder="Passport No..."
                            className={inputClasses}
                            value={passportFilter}
                            onChange={(e) => setPassportFilter(e.target.value)}
                        />
                    </div>

                    {/* 4. Mobile Filter */}
                    <div className="relative">
                        <div className={iconContainerClasses}>
                            <FiPhone />
                        </div>
                        <input
                            type="text"
                            placeholder="Mobile No..."
                            className={inputClasses}
                            value={mobileFilter}
                            onChange={(e) => setMobileFilter(e.target.value)}
                        />
                    </div>

                    {/* 5. Email Filter */}
                    <div className="relative">
                        <div className={iconContainerClasses}>
                            <FiMail />
                        </div>
                        <input
                            type="text"
                            placeholder="Email Address..."
                            className={inputClasses}
                            value={emailFilter}
                            onChange={(e) => setEmailFilter(e.target.value)}
                        />
                    </div>

                </div>
            </div>

            {/* Desktop View Table */}
            <div className="hidden md:block bg-white rounded-lg shadow overflow-visible mb-6">
                <div className="overflow-visible">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Passport No</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NID / Job</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visa Type</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentItems.map((app, index) => (
                                <tr key={app._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-4 whitespace-nowrap text-xs text-gray-500">
                                        {new Date(app.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <div className="text-sm font-bold text-gray-900">{app.name}</div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            {app.father_name ? `F: ${app.father_name}` : ''}
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-1 text-xs text-gray-600">
                                            <FiPhone size={12} /> {app.phone}
                                        </div>
                                        <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                                            <FiMail size={12} /> {app.email}
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded font-mono text-sm font-medium border border-blue-100">
                                            {app.passport || 'N/A'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <div className="text-xs text-gray-600 flex items-center gap-1">
                                            <span className="font-semibold">NID:</span> {app.nid || 'N/A'}
                                        </div>
                                        <div className="text-xs text-gray-600 flex items-center gap-1 mt-1">
                                            <FiBriefcase size={12} /> {app.job_category || 'N/A'}
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {app.visa_type}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${app.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                                    'bg-yellow-100 text-yellow-800'}`}>
                                            {app.status.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-right font-medium relative">
                                        <button
                                            onClick={(e) => toggleMenu(app._id, e)}
                                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm transition-colors"
                                            title="Actions"
                                        >
                                            Actions <FiChevronDown />
                                        </button>

                                        {/* Dropdown Menu - Smart positioning */}
                                        {openMenuId === app._id && (
                                            <div
                                                ref={menuRef}
                                                className={`absolute right-4 w-48 bg-white rounded-lg shadow-xl z-[9999] border border-black ring-1 ring-black ring-opacity-5 focus:outline-none ${menuPosition === 'up' ? 'bottom-11 mb-2' : 'top-11 mt-2'
                                                    }`}
                                            >
                                                {/* Arrow Pointer */}
                                                <div
                                                    className={`absolute right-6 w-3 h-3 bg-white border border-black transform rotate-45 ${menuPosition === 'up' ? '-bottom-1.5 border-t-0 border-l-0 border-b border-r' : '-top-1.5 border-b-0 border-r-0 border-t border-l'
                                                        }`}
                                                ></div>

                                                <div className="py-1 text-left relative z-10 bg-white rounded-lg">
                                                    <Link
                                                        href={`/admin/applications/${app._id}`}
                                                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                                                    >
                                                        <FiEye size={16} /> View Details
                                                    </Link>

                                                    {app.status !== 'approved' && (
                                                        <button
                                                            onClick={() => updateStatus(app._id, 'approved')}
                                                            className="flex w-full items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
                                                        >
                                                            <FiCheck size={16} /> Approve
                                                        </button>
                                                    )}

                                                    {app.status !== 'rejected' && (
                                                        <button
                                                            onClick={() => updateStatus(app._id, 'rejected')}
                                                            className="flex w-full items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-700 transition-colors"
                                                        >
                                                            <FiX size={16} /> Reject
                                                        </button>
                                                    )}

                                                    <button
                                                        onClick={() => deleteApplication(app._id)}
                                                        className="flex w-full items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors border-t border-gray-50"
                                                    >
                                                        <FiTrash2 size={16} /> Delete
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {filteredApplications.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                                        {applications.length === 0
                                            ? "No applications found."
                                            : "No matching applications found."}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mobile View */}
            <div className="md:hidden space-y-4 mb-6">
                {currentItems.map((app) => (
                    <div key={app._id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center space-x-3">
                                <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold shrink-0">
                                    {app.name.charAt(0)}
                                </div>
                                <div className="min-w-0">
                                    <h3 className="text-base font-bold text-gray-900 truncate">{app.name}</h3>
                                    <div className="flex items-center text-xs text-gray-500 mt-0.5">
                                        <span className="truncate">{app.visa_type}</span>
                                    </div>
                                </div>
                            </div>
                            <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border shrink-0
                                ${app.status === 'approved' ? 'bg-green-50 text-green-700 border-green-200' :
                                    app.status === 'rejected' ? 'bg-red-50 text-red-700 border-red-200' :
                                        'bg-yellow-50 text-yellow-700 border-yellow-200'}`}>
                                {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                            </span>
                        </div>

                        <div className="bg-blue-50/50 p-3 rounded-lg mb-4 border border-blue-100">
                            <p className="text-gray-500 text-xs uppercase font-medium flex items-center mb-1">
                                <FiSidebar className="mr-1.5 h-3.5 w-3.5 text-blue-500" /> Passport No
                            </p>
                            <p className="font-mono font-bold text-blue-700 text-lg tracking-wide">
                                {app.passport || 'N/A'}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-4">
                            <div className="bg-gray-50 p-2.5 rounded-lg">
                                <p className="text-gray-500 text-xs uppercase font-medium flex items-center mb-1">
                                    <FiHash className="mr-1.5 h-3.5 w-3.5" /> NID No
                                </p>
                                <p className="font-semibold text-gray-800 text-sm truncate">
                                    {app.nid || 'N/A'}
                                </p>
                            </div>
                            <div className="bg-gray-50 p-2.5 rounded-lg">
                                <p className="text-gray-500 text-xs uppercase font-medium flex items-center mb-1">
                                    <FiPhone className="mr-1.5 h-3.5 w-3.5" /> Contact
                                </p>
                                <p className="font-semibold text-gray-800 text-xs truncate">
                                    {app.phone}
                                </p>
                                <p className="text-gray-500 text-xs truncate mt-0.5">
                                    {app.email}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-2 border-t pt-4 overflow-x-auto">
                            <Link
                                href={`/admin/applications/${app._id}`}
                                className="flex-1 flex items-center justify-center py-2 px-3 bg-indigo-50 text-indigo-700 font-medium rounded-lg hover:bg-indigo-100 transition-colors text-sm whitespace-nowrap"
                            >
                                <FiEye className="mr-2 h-4 w-4" /> View
                            </Link>

                            {app.status !== 'approved' && (
                                <button
                                    onClick={() => updateStatus(app._id, 'approved')}
                                    className="flex items-center justify-center py-2 px-3 bg-green-50 text-green-700 font-medium rounded-lg hover:bg-green-100 text-sm whitespace-nowrap"
                                >
                                    <FiCheck className="mr-1 h-4 w-4" /> Approve
                                </button>
                            )}
                            {app.status !== 'rejected' && (
                                <button
                                    onClick={() => updateStatus(app._id, 'rejected')}
                                    className="flex items-center justify-center py-2 px-3 bg-orange-50 text-orange-700 font-medium rounded-lg hover:bg-orange-100 text-sm whitespace-nowrap"
                                >
                                    <FiX className="mr-1 h-4 w-4" /> Reject
                                </button>
                            )}
                            <button
                                onClick={() => deleteApplication(app._id)}
                                className="flex items-center justify-center py-2 px-3 bg-red-50 text-red-700 font-medium rounded-lg hover:bg-red-100 text-sm whitespace-nowrap"
                            >
                                <FiTrash2 className="mr-1 h-4 w-4" /> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            {filteredApplications.length > 0 && (
                <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-lg shadow-sm mb-20">
                    <div className="flex flex-1 justify-between sm:hidden">
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`relative inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                        >
                            Next
                        </button>
                    </div>
                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to <span className="font-medium">{Math.min(indexOfLastItem, filteredApplications.length)}</span> of{' '}
                                <span className="font-medium">{filteredApplications.length}</span> results
                            </p>
                        </div>
                        <div>
                            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                <button
                                    onClick={() => paginate(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:bg-gray-100 disabled:opacity-50"
                                >
                                    <span className="sr-only">Previous</span>
                                    <FiChevronLeft className="h-5 w-5" aria-hidden="true" />
                                </button>

                                {visiblePages.map((page, index) => (
                                    <button
                                        key={index}
                                        onClick={() => typeof page === 'number' ? paginate(page) : null}
                                        disabled={page === '...'}
                                        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${page === currentPage
                                                ? 'z-10 bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                                                : page === '...'
                                                    ? 'text-gray-700 cursor-default ring-1 ring-inset ring-gray-300'
                                                    : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}

                                <button
                                    onClick={() => paginate(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:bg-gray-100 disabled:opacity-50"
                                >
                                    <span className="sr-only">Next</span>
                                    <FiChevronRight className="h-5 w-5" aria-hidden="true" />
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
