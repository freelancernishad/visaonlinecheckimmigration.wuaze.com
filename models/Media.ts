import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMedia extends Document {
    url: string;
    filename: string;
    createdAt: Date;
    data?: Buffer;
    contentType?: string;
}

const MediaSchema = new Schema<IMedia>(
    {
        url: { type: String, required: true },
        filename: { type: String, required: true },
        data: { type: Buffer, required: false }, // Binary data
        contentType: { type: String, required: false }, // MIME type
    },
    { timestamps: true }
);

const Media: Model<IMedia> =
    mongoose.models.Media || mongoose.model<IMedia>("Media", MediaSchema);

export default Media;
