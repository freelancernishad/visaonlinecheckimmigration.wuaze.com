import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Media from '@/models/Media';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await connectDB();

        const { id } = await params;
        const media = await Media.findById(id);

        if (!media || !media.data) {
            return new NextResponse('File not found', { status: 404 });
        }

        // Return the binary data with correct content type
        return new NextResponse(media.data as any, {
            headers: {
                'Content-Type': media.contentType || 'application/octet-stream',
                'Content-Disposition': `inline; filename="${media.filename}"`,
                'Cache-Control': 'public, max-age=31536000, immutable'
            },
        });
    } catch (error) {
        console.error('File Serve Error:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
