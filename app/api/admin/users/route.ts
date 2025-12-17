import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/db';
import Admin from '@/models/Admin';

// List Admins
export async function GET() {
    try {
        await connectDB();
        // Exclude password from the result
        const admins = await Admin.find({}, '-password').sort({ createdAt: -1 });
        return NextResponse.json(admins);
    } catch (error) {
        console.error('Fetch Admins Error:', error);
        return NextResponse.json({ error: 'Failed to fetch admins' }, { status: 500 });
    }
}

// Create New Admin (Protected/Internal)
export async function POST(req: Request) {
    try {
        await connectDB();
        const { username, password } = await req.json();

        if (!username || !password) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const existing = await Admin.findOne({ username });
        if (existing) {
            return NextResponse.json({ error: 'Username already exists' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({
            username,
            password: hashedPassword,
        });

        await newAdmin.save();

        return NextResponse.json({ success: true, message: 'Admin created successfully' }, { status: 201 });

    } catch (error) {
        console.error('Create Admin Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
