"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { FaSearch } from "react-icons/fa";

export default function AddFingerprint() {
    return (
        <main>
            <Header />
            <PageHeader
                title="Biometrics Status"
                breadcrumb={[
                    { label: "Home", href: "/" },
                    { label: "Biometrics Status" }
                ]}
            />

            <div className="container mx-auto px-4 mb-20">
                <div className="max-w-2xl mx-auto">
                    <form
                        action="#" // In a real app, handle submission via onSubmit
                        className="w-full flex flex-col py-8 px-8 border border-gray-300 rounded-2xl items-center bg-white shadow-sm"
                    >
                        {/* Placeholder for image if it existed in public/img/finger.jpeg */}
                        <div className="w-28 h-28 mb-4 relative flex items-center justify-center bg-gray-100 rounded-full">
                            {/* Using an icon as placeholder since image is missing */}
                            <span className="text-4xl text-primary">👆</span>
                        </div>

                        <h2 className="text-2xl font-normal mt-3 text-[#E21B89]">Add Your Finger Print</h2>

                        <input
                            className="w-full px-4 py-2 text-lg text-dark mt-4 border border-gray-800 rounded-lg focus:outline-none focus:border-primary transition-colors"
                            type="text"
                            name="passport"
                            placeholder="Passport number"
                            required
                        />

                        <button
                            type="submit"
                            className="btn btn-success text-white bg-green-500 hover:bg-green-600 py-2 px-8 rounded-md mt-12 mb-12 transition-colors font-medium"
                        >
                            Search
                        </button>

                        <div className="w-full p-2">
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                <strong>Sorry! </strong> আপনার এজেন্টের এই ফিঙ্গার প্রিন্ট পরিষেবা ব্যবহার করার অনুমতি নেই
                                {/* Close button functionality would require state */}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </main>
    );
}
