"use client";

import { useState, ChangeEvent } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";

export default function ApplicationPage() {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [documentPreviews, setDocumentPreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const formData = new FormData(e.target as HTMLFormElement);
    const data: any = {};

    // Collect logic text fields
    formData.forEach((value, key) => {
      if (!key.includes('[]') && key !== 'user_photo' && key !== 'document[]') {
        data[key] = value;
      }
    });

    // Add Base64 images
    if (photoPreview) {
      data.photo = photoPreview;
    }
    if (documentPreviews.length > 0) {
      data.documents = documentPreviews;
    }

    try {
      const response = await fetch('/api/application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setMessage({ type: 'success', text: 'Application submitted successfully!' });
        // Reset form
        (e.target as HTMLFormElement).reset();
        setPhotoPreview(null);
        setDocumentPreviews([]);
      } else {
        setMessage({ type: 'error', text: result.error || 'Submission failed.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          setPhotoPreview(ev.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDocumentsChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      Promise.all(files.map(file => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (ev) => resolve(ev.target?.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      })).then(images => {
        setDocumentPreviews(images);
      });
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <PageHeader
        title="Visa Application"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Pages" },
          { label: "Visa Application" },
        ]}
      />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Visa Application</h2>

          {message && (
            <div className={`p-4 mb-6 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
                <input type="text" id="name" name="name" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-red-500" />
              </div>
              <div>
                <label htmlFor="fatherName" className="block text-gray-700 font-medium mb-2">Father Name</label>
                <input type="text" id="fatherName" name="father_name" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-red-500" />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="motherName" className="block text-gray-700 font-medium mb-2">Mother Name</label>
                <input type="text" id="motherName" name="mother_name" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-red-500" />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                <input type="email" id="email" name="email" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-red-500" />
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone Number</label>
                <input type="text" id="phone" name="phone" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-red-500" />
              </div>
              <div>
                <label htmlFor="nid" className="block text-gray-700 font-medium mb-2">NID No</label>
                <input type="text" id="nid" name="nid" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-red-500" />
              </div>
            </div>

            {/* Row 4 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="passport" className="block text-gray-700 font-medium mb-2">Passport No</label>
                <input type="text" id="passport" name="passport" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-red-500" />
              </div>
              <div>
                <label htmlFor="visaType" className="block text-gray-700 font-medium mb-2">Visa Type</label>
                <select id="visaType" name="visa_type" defaultValue="job_visa" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-red-500 bg-white">
                  <option value="job_visa">Job Visa</option>
                  <option value="business_visa" disabled>Business Visa</option>
                  <option value="diplomatic_visa" disabled>Diplomatic Visa</option>
                  <option value="student_visa" disabled>Student Visa</option>
                  <option value="residence_visa" disabled>Residence Visa</option>
                  <option value="tourist_visa" disabled>Tourist Visa</option>
                </select>
              </div>
            </div>

            {/* Row 5 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="currentAddress" className="block text-gray-700 font-medium mb-2">Current Address</label>
                <input type="text" id="currentAddress" name="current_address" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-red-500" />
              </div>
              <div>
                <label htmlFor="permanentAddress" className="block text-gray-700 font-medium mb-2">Permanent Address</label>
                <input type="text" id="permanentAddress" name="permanent_address" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-red-500" />
              </div>
            </div>

            {/* Row 6 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="jobName" className="block text-gray-700 font-medium mb-2">Job Name</label>
                <input type="text" id="jobName" name="job_name" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-red-500" />
              </div>
              <div>
                <label htmlFor="jobCategory" className="block text-gray-700 font-medium mb-2">Job Category</label>
                <input type="text" id="jobCategory" name="job_category" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-red-500" />
              </div>
            </div>

            {/* Experience */}
            <div>
              <label htmlFor="experience" className="block text-gray-700 font-medium mb-2">Experience</label>
              <textarea id="experience" name="experience" rows={3} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-red-500"></textarea>
            </div>

            {/* Photo Upload */}
            <div className="mt-4">
              {photoPreview && (
                <div className="mb-2">
                  <img src={photoPreview} alt="Passport Preview" className="max-w-[300px] border p-1 rounded" />
                </div>
              )}
              <label className="block w-full cursor-pointer bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-center transition">
                Add Passport Size Photo Browse…
                <input type="file" name="user_photo" accept="image/*" onChange={handlePhotoChange} className="hidden" />
              </label>
            </div>

            {/* Documents Upload */}
            <div className="mt-4">
              {documentPreviews.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {documentPreviews.map((src, index) => (
                    <img key={index} src={src} alt={`Document ${index + 1}`} className="w-[300px] border p-1 rounded" />
                  ))}
                </div>
              )}
              <label className="block w-full cursor-pointer bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-center transition">
                Add Documents (Multiple Files/Photos)…
                <input type="file" name="document[]" multiple onChange={handleDocumentsChange} className="hidden" />
              </label>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <button type="submit" disabled={isSubmitting} className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 disabled:opacity-50">
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>

          </form>
        </div>
      </div>

      <Footer />
    </main>
  );
}
