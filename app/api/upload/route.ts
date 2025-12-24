import { NextResponse } from 'next/server';
import { writeFile, readdir, mkdir } from 'fs/promises';
import path from 'path';
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
        const uploadDir = path.join(process.cwd(), 'public/uploads');

        // Ensure upload directory exists
        try {
            await readdir(uploadDir);
        } catch (e) {
            await mkdir(uploadDir, { recursive: true });
        }

        const filepath = path.join(uploadDir, filename);
        await writeFile(filepath, buffer);

        const fileUrl = `/uploads/${filename}`;

        // Save to Database
        const newMedia = await Media.create({
            url: fileUrl,
            filename: filename
        });

        return NextResponse.json({
            success: true,
            url: fileUrl,
            filename: filename,
            data: newMedia
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
        const files = await Media.find({}).sort({ createdAt: -1 });

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
