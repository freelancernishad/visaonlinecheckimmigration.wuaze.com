"use client";

import { useState } from 'react';
import toast from 'react-hot-toast';

interface ConfirmationToastProps {
    message: React.ReactNode;
    subMessage?: React.ReactNode;
    onConfirm: () => Promise<void>;
    confirmText?: string;
    confirmColor?: string;
    t: any;
}

export default function ConfirmationToast({
    message,
    subMessage,
    onConfirm,
    confirmText = "Confirm",
    confirmColor = "bg-blue-600 hover:bg-blue-700",
    t
}: ConfirmationToastProps) {
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
}
