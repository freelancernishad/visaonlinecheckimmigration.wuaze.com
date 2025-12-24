import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Media from '@/models/Media';

export async function POST(req: Request) {
    try {
        await connectDB();
        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = Date.now() + '_' + file.name.replace(/\s/g, '_');

        // Save to Database with binary data
        const newMedia = await Media.create({
            url: '', // Will update after ID is generated
            filename: filename,
            data: buffer,
            contentType: file.type
        });

        // Set the URL to the serve endpoint
        newMedia.url = `/api/file/${newMedia._id}`;
        await newMedia.save();

        return NextResponse.json({
            success: true,
            url: newMedia.url,
            filename: filename,
            data: { ...newMedia.toObject(), data: undefined } // Exclude binary from response
        }, { status: 201 });
    } catch (error: any) {
        console.error('Upload Error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        await connectDB();
        // Fetch from Database
        // Fetch from Database, exclude binary data
        const files = await Media.find({}).select('-data').sort({ createdAt: -1 });

        // Map to match the expected frontend format if needed, but Media model fields are compatible
        const fileUrls = files.map(file => ({
            url: file.url,
            name: file.filename,
            _id: file._id
        }));

        return NextResponse.json({ success: true, files: fileUrls });
    } catch (error: any) {
        console.error('Fetch Error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
