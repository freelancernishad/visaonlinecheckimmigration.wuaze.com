import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IApplication extends Document {
    name: string;
    father_name: string;
    mother_name: string;
    email: string;
    phone: string;
    nid: string;
    passport?: string;
    visa_for?: string;
    visa_type: string;
    current_address: string;
    permanent_address: string;
    job_name?: string;
    job_category?: string;
    experience?: string;
    photo?: string; // URL or base64
    documents?: string[]; // Array of URLs or base64
    status: 'pending' | 'approved' | 'rejected';
    createdAt: Date;
    updatedAt: Date;
}

const ApplicationSchema: Schema<IApplication> = new Schema(
    {
        name: { type: String, required: true },
        father_name: { type: String, required: true },
        mother_name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        nid: { type: String, required: true },
        passport: { type: String },
        visa_for: { type: String },
        visa_type: { type: String, required: true, default: 'job_visa' },
        current_address: { type: String, required: true },
        permanent_address: { type: String, required: true },
        job_name: { type: String },
        job_category: { type: String },
        experience: { type: String },
        photo: { type: String },
        documents: [{ type: String }],
        status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    },
    { timestamps: true }
);

// Prevent overwrite model error in development
if (process.env.NODE_ENV !== 'production') delete mongoose.models.Application;
const Application: Model<IApplication> = mongoose.models.Application || mongoose.model<IApplication>('Application', ApplicationSchema);

export default Application;
