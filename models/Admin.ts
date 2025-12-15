import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAdmin extends Document {
    username: string;
    password: string; // In a real app, hash this!
}

const AdminSchema: Schema<IAdmin> = new Schema(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    { timestamps: true }
);

// Prevent overwrite model error in development
const Admin: Model<IAdmin> = mongoose.models.Admin || mongoose.model<IAdmin>('Admin', AdminSchema);

export default Admin;
