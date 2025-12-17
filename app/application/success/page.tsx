"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";

export default function ApplicationSuccessPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <PageHeader
        title="Application Status"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Application" },
          { label: "Success" },
        ]}
      />

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8 flex justify-center">
            <div className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center">
              <svg 
                className="w-12 h-12 text-green-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Application Successful
          </h2>
          
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Your application has been submitted successfully. <br />
            <span className="font-semibold text-gray-800">
              Please contact the admin to complete the rest of the process.
            </span>
          </p>

          <div className="flex justify-center gap-4">
            <Link 
              href="/"
              className="px-8 py-3 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition duration-300"
            >
              Back to Home
            </Link>
            <Link 
              href="/contact"
              className="px-8 py-3 bg-gray-100 text-gray-800 font-bold rounded-full hover:bg-gray-200 transition duration-300 border border-gray-200"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
