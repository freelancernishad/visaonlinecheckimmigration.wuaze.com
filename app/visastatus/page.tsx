"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, Suspense } from "react";
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

function VisaStatusContent() {
    const searchParams = useSearchParams();
    const passport = searchParams.get("passport") || "N/A";
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.play().catch(e => console.log("Audio autoplay blocked", e));
        }
    }, []);

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
                    <p className="mb-0 text-xl">Your Work Permit Visa has been approved successfully</p>
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
                                    <div className="col-7 field-value w-7/12">816</div>
                                </div>

                                <div className="row mb-2 flex mb-4">
                                    <div className="col-5 field-label w-5/12">Full Name</div>
                                    <div className="col-7 field-value w-7/12">FARIDUL ISLAM</div>
                                </div>

                                <div className="row mb-2 flex mb-4">
                                    <div className="col-5 field-label w-5/12">Fathers Name</div>
                                    <div className="col-7 field-value w-7/12">LOIMODDIN</div>
                                </div>

                                <div className="row mb-2 flex mb-4">
                                    <div className="col-5 field-label w-5/12">Mothers Name</div>
                                    <div className="col-7 field-value w-7/12">SHEFALI BEGUM</div>
                                </div>

                                <div className="row mb-2 flex mb-4">
                                    <div className="col-5 field-label w-5/12">Passport No</div>
                                    <div className="col-7 field-value w-7/12">{passport !== "N/A" ? passport : "A01976052"}</div>
                                </div>

                                <div className="row mb-2 flex mb-4">
                                    <div className="col-5 field-label w-5/12">Email</div>
                                    <div className="col-7 field-value w-7/12"></div>
                                </div>

                                <div className="row mb-2 flex mb-4">
                                    <div className="col-5 field-label w-5/12">Phone No</div>
                                    <div className="col-7 field-value w-7/12">N/A</div>
                                </div>

                                <div className="row mb-2 flex mb-4">
                                    <div className="col-5 field-label w-5/12">Current Address</div>
                                    <div className="col-7 field-value w-7/12">BANGLADESH</div>
                                </div>

                                <div className="row mb-2 flex mb-4">
                                    <div className="col-5 field-label w-5/12">Permanent Address</div>
                                    <div className="col-7 field-value w-7/12">BANGLADESH</div>
                                </div>

                                <div className="row mb-2 flex mb-4">
                                    <div className="col-5 field-label w-5/12">Job Details</div>
                                    <div className="col-7 field-value w-7/12">Food Packaging</div>
                                </div>

                                <div className="row mb-2 flex mb-4">
                                    <div className="col-5 field-label w-5/12">Experience</div>
                                    <div className="col-7 field-value w-7/12">2</div>
                                </div>

                                <div className="row mb-2 flex mb-4">
                                    <div className="col-5 field-label w-5/12">Job Category</div>
                                    <div className="col-7 field-value w-7/12">D CATEGORY</div>
                                </div>

                                <div className="row mb-2 flex mb-4">
                                    <div className="col-5 field-label w-5/12">Message</div>
                                    <div className="col-7 field-value w-7/12">0</div>
                                </div>
                            </div>

                            {/* Photo Section */}
                            <div className="col-lg-5 w-full lg:w-5/12 text-center">
                                <div className="photo-container">
                                    {/* Placeholder for uploaded photo */}
                                    <div className="photo-badge bg-gray-200 h-64 flex items-center justify-center">
                                        <span className="text-gray-400">Photo</span>
                                    </div>
                                    {/* <img src="./admin/upload/68fbc57e7736c8.58537582.jpg" className="photo-badge img-fluid" /> */}

                                    {/* Approved Badge Placeholder */}
                                    <div className="approved-badge bg-green-500 text-white p-2 rounded-full text-xs font-bold shadow-lg flex items-center justify-center">
                                        APPROVED
                                    </div>
                                    {/* <img src="./img/approved.png" className="approved-badge" alt="Approved Badge" /> */}
                                </div>
                                <h4 className="font-bold mt-2 text-xl text-[#2c3e50]">FARIDUL ISLAM</h4>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Approval Message */}
                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded mb-8">
                    <h5 className="font-bold flex items-center gap-2"><i className="fas fa-check-circle"></i> Approval Notice</h5>
                    <p className="mb-0">Hi FARIDUL ISLAM, we are delighted to inform you that your visa processing has been successfully completed!</p>
                </div>

                {/* Footer Elements */}
                <div className="row mb-8 flex flex-col md:flex-row justify-center gap-4">
                    <div className="col-md-6 mb-3 md:w-1/3">
                        <div className="p-3 text-center bg-white rounded shadow-sm h-full flex items-center justify-center">
                            {/* <img src="./img/bar-qr.png" alt="QR Code" className="img-fluid max-h-[120px]" /> */}
                            <span className="text-gray-400">[QR Code]</span>
                        </div>
                    </div>
                    <div className="col-md-3 mb-3 md:w-1/4">
                        <div className="p-3 text-center bg-white rounded shadow-sm h-full flex items-center justify-center">
                            {/* <img src="./img/signature.png" alt="Signature" className="img-fluid max-h-[120px]" /> */}
                            <span className="text-gray-400">[Signature]</span>
                        </div>
                    </div>
                    <div className="col-md-3 md:w-1/4">
                        <div className="p-3 text-center bg-white rounded shadow-sm h-full flex items-center justify-center">
                            {/* <img src="./img/e-visa11pgp1.png" alt="E-Visa Logo" className="img-fluid max-h-[120px]" /> */}
                            <span className="text-gray-400">[Logo]</span>
                        </div>
                    </div>
                </div>

                {/* Documents Section */}
                <div className="info-card">
                    <div className="info-card-header flex items-center gap-2">
                        <i className="fas fa-file-alt"></i> Your Important Files
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {[1, 2, 3, 4, 5, 6].map((item) => (
                                <div key={item} className="p-2 bg-white rounded border border-gray-100">
                                    <div className="document-image bg-gray-100 h-48 flex items-center justify-center text-gray-400">
                                        Document {item}
                                    </div>
                                    {/* <img src="..." className="document-image img-fluid" /> */}
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
            </div>

            <Footer />
        </div>
    );
}
