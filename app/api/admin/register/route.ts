import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/db';
import Admin from '@/models/Admin';
import SiteSettings from '@/models/SiteSettings';

export async function POST(req: Request) {
    try {
        await connectDB();

        // Check if registration is allowed
        const settings = await SiteSettings.findOne();
        if (settings && !settings.adminRegistrationOpen) {
            return NextResponse.json({ error: 'Admin registration is currently closed.' }, { status: 403 });
        }

        const { username, password } = await req.json();

        if (!username || !password) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }



        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ username });
        if (existingAdmin) {
            return NextResponse.json({ error: 'Admin username already exists' }, { status: 400 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new admin
        const newAdmin = new Admin({
            username,
            password: hashedPassword,
        });

        await newAdmin.save();

        return NextResponse.json({ success: true, message: 'Admin registered successfully' }, { status: 201 });

    } catch (error) {
        console.error('Admin registration error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
