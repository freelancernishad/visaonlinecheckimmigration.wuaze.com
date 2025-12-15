import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Application from '@/models/Application';

export async function POST(req: Request) {
    try {
        await connectDB();
        const body = await req.json();

        // Basic validation could go here
        const { name, email, phone } = body;
        if (!name || !email || !phone) {
            return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
        }

        const newApplication = await Application.create(body);

        return NextResponse.json({ success: true, data: newApplication }, { status: 201 });
    } catch (error: any) {
        console.error('Submission Error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        await connectDB();
        const applications = await Application.find({}).sort({ createdAt: -1 });

        return NextResponse.json({ success: true, data: applications });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
