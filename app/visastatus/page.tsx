"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, Suspense, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function VisaStatus() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#f8f9fa]">Loading...</div>}>
            <VisaStatusContent />
        </Suspense>
    );
}

import { getVisaStatus } from "@/app/actions/visa";
import { IApplication } from "@/models/Application";

function VisaStatusContent() {
    const searchParams = useSearchParams();
    const passport = searchParams.get("passport");
    const audioRef = useRef<HTMLAudioElement>(null);
    const [application, setApplication] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchStatus = async () => {
            if (!passport) {
                setLoading(false);
                return;
            }

            try {
                const result = await getVisaStatus(passport);
                if (result.success) {
                    setApplication(result.data);
                } else {
                    setError(result.message || "Application not found");
                }
            } catch (err) {
                setError("Failed to fetch application data");
            } finally {
                setLoading(false);
            }
        };

        fetchStatus();
    }, [passport]);

    useEffect(() => {
        // Only play audio if application is loaded and status is approved
        if (!application || application.status !== 'approved') return;

        const playAudio = () => {
            if (audioRef.current) {
                audioRef.current.play().catch(e => {
                    console.log("Audio autoplay blocked", e);
                });
            }
        };

        // Try to play immediately
        if (audioRef.current) {
            audioRef.current.play().catch(() => {
                // If blocked, play on first interaction
                document.addEventListener('click', playAudio, { once: true });
            });
        }

        return () => {
            document.removeEventListener('click', playAudio);
        };
    }, [application, loading]); // Re-run when application data is loaded

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa] text-xl">Checking status...</div>;
    }

    if (!passport) {
        return (
            <div className="min-h-screen bg-[#f8f9fa] font-poppins flex flex-col">
                <Header />
                <div className="flex-grow flex items-center justify-center">
                    <div className="text-center p-8 bg-white shadow-xl rounded-2xl max-w-md mx-4">
                        <div className="text-6xl text-yellow-500 mb-4"><i className="fas fa-exclamation-triangle"></i></div>
                        <h2 className="text-2xl font-bold mb-2">No Passport Provided</h2>
                        <p className="text-gray-600 mb-6">Please go back and enter your passport number.</p>
                        <Link href="/check-visa" className="bg-[#1abc9c] text-white px-6 py-2 rounded-full hover:bg-[#16a085] transition">Go Back</Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (error || !application) {
        return (
            <div className="min-h-screen bg-[#f8f9fa] font-poppins flex flex-col">
                <Header />
                <div className="flex-grow flex items-center justify-center">
                    <div className="text-center p-8 bg-white shadow-xl rounded-2xl max-w-md mx-4">
                        <div className="text-6xl text-red-500 mb-4"><i className="fas fa-search-minus"></i></div>
                        <h2 className="text-2xl font-bold mb-2">No Record Found</h2>
                        <p className="text-gray-600 mb-6">We could not find any application with passport number: <strong>{passport}</strong></p>
                        <Link href="/check-visa" className="bg-[#1abc9c] text-white px-6 py-2 rounded-full hover:bg-[#16a085] transition">Check Another</Link>
                    </div>
                </div>
                <Footer />
                <audio ref={audioRef} src="/audio/voice.mp3" />
            </div>
        );
    }

    // Render based on status
    if (application.status === 'rejected') {
        return (
            <div className="min-h-screen bg-[#f8f9fa] font-poppins flex flex-col">
                <Header />
                <div className="flex-grow flex items-center justify-center">
                    <div className="text-center p-8 bg-white shadow-xl rounded-2xl max-w-md mx-4 border-t-4 border-red-500">
                        <div className="text-6xl text-red-500 mb-4"><i className="fas fa-times-circle"></i></div>
                        <h2 className="text-2xl font-bold mb-2 text-red-600">Application Rejected</h2>
                        <p className="text-gray-600 mb-6">Your visa application has been rejected. Please contact the administration for more details.</p>
                        <Link href="/contact" className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition">Contact Support</Link>
                    </div>
                </div>
                <Footer />
                <audio ref={audioRef} src="/audio/voice.mp3" />
            </div>
        );
    }

    if (application.status === 'pending') {
        return (
            <div className="min-h-screen bg-[#f8f9fa] font-poppins flex flex-col">
                <Header />
                <div className="flex-grow flex items-center justify-center">
                    <div className="text-center p-8 bg-white shadow-xl rounded-2xl max-w-md mx-4 border-t-4 border-yellow-500">
                        <div className="text-6xl text-yellow-500 mb-4"><i className="fas fa-hourglass-half"></i></div>
                        <h2 className="text-2xl font-bold mb-2 text-yellow-600">Application Pending</h2>
                        <p className="text-gray-600 mb-6">Your visa application is currently under review. Please wait for further updates or contact the administration.</p>
                        <Link href="/contact" className="bg-yellow-500 text-white px-6 py-2 rounded-full hover:bg-yellow-600 transition">Contact Admin</Link>
                    </div>
                </div>
                <Footer />
                <audio ref={audioRef} src="/audio/voice.mp3" />
            </div>
        );
    }

    // APPROVED STATUS UI
    return (
        <div className="min-h-screen bg-[#f8f9fa] font-poppins text-[#2c3e50]">
            <style jsx global>{`
                :root {
                    --primary-color: #2c3e50;
                    --secondary-color: #1abc9c;
                    --accent-color: #e74c3c;
                    --light-color: #ecf0f1;
                    --dark-color: #2c3e50;
                    --success-color: #27ae60;
                    --warning-color: #f39c12;
                    --gradient: linear-gradient(135deg, #1abc9c 0%, #3498db 100%);
                }
                
                .header-custom {
                    background: white;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    border-bottom: 3px solid #1abc9c;
                    padding: 10px 0;
                }
                
                .info-card {
                    background: white;
                    border-radius: 15px;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                    transition: all 0.3s ease;
                    margin-bottom: 20px;
                    overflow: hidden;
                }
                
                .info-card-header {
                    background: linear-gradient(135deg, #1abc9c 0%, #3498db 100%);
                    color: white;
                    padding: 10px 15px;
                    font-weight: 600;
                }
                
                .field-label {
                    background: linear-gradient(135deg, #1abc9c 0%, #3498db 100%);
                    color: white;
                    padding: 8px 15px;
                    font-weight: 500;
                    border-radius: 5px 0 0 5px;
                }
                
                .field-value {
                    background: rgba(236, 240, 241, 0.3);
                    padding: 8px 15px;
                    border-left: 3px solid #1abc9c;
                    word-break: break-all;
                }
                
                .photo-container {
                    position: relative;
                    width: 100%;
                    max-width: 220px;
                    margin: 0 auto 30px;
                }
                
                .photo-badge {
                    width: 100%;
                    border-radius: 10px;
                    overflow: hidden;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                    border: 3px solid white;
                }
                
                .approved-badge {
                    position: absolute;
                    bottom: -20px;
                    right: -20px;
                    width: 100px;
                    height: auto;
                    z-index: 10;
                }
                
                .congrats-section {
                    background: linear-gradient(135deg, #1abc9c 0%, #3498db 100%);
                    color: white;
                    border-radius: 10px;
                    padding: 20px;
                    margin: 20px 0;
                    text-align: center;
                }
                
                .document-image {
                    border-radius: 8px;
                    box-shadow: 0 3px 10px rgba(0,0,0,0.1);
                    max-height: 300px;
                    object-fit: contain;
                    width: 100%;
                }
                
                .action-btn {
                    background: linear-gradient(135deg, #1abc9c 0%, #3498db 100%);
                    color: white;
                    font-weight: 600;
                    padding: 10px 25px;
                    border-radius: 50px;
                    border: none;
                    transition: all 0.3s;
                    display: inline-block;
                }
                
                .action-btn:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                    color: white;
                }
            `}</style>

            <audio ref={audioRef} src="/audio/voice.mp3" />

            <Header />

            {/* Main Content */}
            <div className="container mx-auto px-4 my-8 max-w-6xl">
                {/* Congratulations Banner */}
                <div className="congrats-section">
                    <h1 className="mb-3 font-bold text-3xl">CONGRATULATIONS!</h1>
                    <p className="mb-0 text-xl">Your {application.visa_type.replace('_', ' ').toUpperCase()} has been approved successfully</p>
                </div>

                <div className="text-center mb-8">
                    <h2 className="font-bold text-2xl text-[#2c3e50]">Work Permit Visa Status Check Online</h2>
                    <p className="text-gray-500">Your visa application details are shown below</p>
                </div>

                {/* Visa Holder Information */}
                <div className="info-card">
                    <div className="info-card-header flex items-center gap-2">
                        <i className="fas fa-user-check"></i> Visa Holder Information
                    </div>
                    <div className="p-6">
                        <div className="row flex flex-col lg:flex-row gap-8">
                            <div className="col-lg-7 w-full lg:w-7/12">
                                {/* Personal Information Rows */}
                                <div className="row mb-2 flex mb-4">
                                    <div className="col-5 field-label w-5/12">VISA Serial No</div>
                                    <div className="col-7 field-value w-7/12">{application._id.substring(0, 8).toUpperCase()}</div>
                                </div>

                                <div className="row mb-2 flex mb-4">
                                    <div className="col-5 field-label w-5/12">Full Name</div>
                                    <div className="col-7 field-value w-7/12">{application.name.toUpperCase()}</div>
                                </div>

                                <div className="row mb-2 flex mb-4">
                                    <div className="col-5 field-label w-5/12">Fathers Name</div>
                                    <div className="col-7 field-value w-7/12">{application.father_name.toUpperCase()}</div>
                                </div>

                                <div className="row mb-2 flex mb-4">
                                    <div className="col-5 field-label w-5/12">Mothers Name</div>
                                    <div className="col-7 field-value w-7/12">{application.mother_name.toUpperCase()}</div>
                                </div>

                                <div className="row mb-2 flex mb-4">
                                    <div className="col-5 field-label w-5/12">Passport No</div>
                                    <div className="col-7 field-value w-7/12">{application.passport}</div>
                                </div>

                                <div className="row mb-2 flex mb-4">
                                    <div className="col-5 field-label w-5/12">Email</div>
                                    <div className="col-7 field-value w-7/12">{application.email}</div>
                                </div>

                                <div className="row mb-2 flex mb-4">
                                    <div className="col-5 field-label w-5/12">Phone No</div>
                                    <div className="col-7 field-value w-7/12">{application.phone}</div>
                                </div>

                                <div className="row mb-2 flex mb-4">
                                    <div className="col-5 field-label w-5/12">Current Address</div>
                                    <div className="col-7 field-value w-7/12">{application.current_address}</div>
                                </div>

                                <div className="row mb-2 flex mb-4">
                                    <div className="col-5 field-label w-5/12">Permanent Address</div>
                                    <div className="col-7 field-value w-7/12">{application.permanent_address}</div>
                                </div>

                                {application.job_name && (
                                    <div className="row mb-2 flex mb-4">
                                        <div className="col-5 field-label w-5/12">Job Details</div>
                                        <div className="col-7 field-value w-7/12">{application.job_name}</div>
                                    </div>
                                )}

                                {application.experience && (
                                    <div className="row mb-2 flex mb-4">
                                        <div className="col-5 field-label w-5/12">Experience</div>
                                        <div className="col-7 field-value w-7/12">{application.experience}</div>
                                    </div>
                                )}

                                {application.job_category && (
                                    <div className="row mb-2 flex mb-4">
                                        <div className="col-5 field-label w-5/12">Job Category</div>
                                        <div className="col-7 field-value w-7/12">{application.job_category.toUpperCase()}</div>
                                    </div>
                                )}
                            </div>

                            {/* Photo Section */}
                            <div className="col-lg-5 w-full lg:w-5/12 text-center">
                                <div className="photo-container">
                                    <div className="photo-badge bg-gray-200 min-h-[256px] flex items-center justify-center relative">
                                        {application.photo ? (
                                            <img src={application.photo} alt={application.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-gray-400">No Photo</span>
                                        )}
                                    </div>

                                    {/* Approved Badge */}
                                    <div className="approved-badge bg-green-500 text-white p-2 rounded-full text-xs font-bold shadow-lg flex items-center justify-center">
                                        APPROVED
                                    </div>
                                </div>
                                <h4 className="font-bold mt-2 text-xl text-[#2c3e50]">{application.name.toUpperCase()}</h4>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Approval Message */}
                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded mb-8">
                    <h5 className="font-bold flex items-center gap-2"><i className="fas fa-check-circle"></i> Approval Notice</h5>
                    <p className="mb-0">Hi {application.name.toUpperCase()}, we are delighted to inform you that your visa processing has been successfully completed!</p>
                </div>

                {/* Footer Elements */}
                <div className="row mb-8 flex flex-col md:flex-row justify-center gap-4">
                    <div className="col-md-6 mb-3 md:w-1/3">
                        <div className="p-3 text-center bg-white rounded shadow-sm h-full flex items-center justify-center">
                            <span className="text-gray-400 font-mono text-xs">{application._id}</span>
                        </div>
                    </div>
                    <div className="col-md-3 mb-3 md:w-1/4">
                        <div className="p-3 text-center bg-white rounded shadow-sm h-full flex items-center justify-center">
                            <span className="text-gray-400 font-serif italic text-lg">Signed</span>
                        </div>
                    </div>
                    <div className="col-md-3 md:w-1/4">
                        <div className="p-3 text-center bg-white rounded shadow-sm h-full flex items-center justify-center">
                            <div className="text-2xl font-bold text-secondary">VISA</div>
                        </div>
                    </div>
                </div>

                {/* Documents Section */}
                {application.documents && application.documents.length > 0 && (
                    <div className="info-card">
                        <div className="info-card-header flex items-center gap-2">
                            <i className="fas fa-file-alt"></i> Your Important Files
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                {application.documents.map((doc: string, index: number) => (
                                    <div key={index} className="p-2 bg-white rounded border border-gray-100">
                                        <div className="document-image bg-gray-100 h-48 flex items-center justify-center text-gray-400 overflow-hidden relative">
                                            <img src={doc} alt={`Document ${index + 1}`} className="w-full h-full object-contain" />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="text-center mt-3">
                                <Link href="/check-visa" className="action-btn text-decoration-none">
                                    <i className="fas fa-search me-2"></i> Check Again
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}
