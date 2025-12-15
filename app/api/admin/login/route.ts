import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Admin from '@/models/Admin';

export async function POST(req: Request) {
    try {
        await connectDB();
        const { username, password } = await req.json();

        // For initial setup, if no admin exists, create one (FOR DEV ONLY - REMOVE IN PROD)
        // This is a convenience for the user to get started without manual DB insertion
        const adminCount = await Admin.countDocuments();
        if (adminCount === 0) {
            if (username === 'admin' && password === 'admin123') {
                await Admin.create({ username, password });
                return NextResponse.json({ success: true, message: 'Admin setup complete. Logged in.' });
            }
        }

        const admin = await Admin.findOne({ username });

        if (!admin) {
            return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
        }

        // Check if password matches (bcrypt)
        const isMatch = await import('bcryptjs').then(bcrypt => bcrypt.compare(password, admin.password));

        if (!isMatch) {
            // Fallback for legacy plain text passwords (optional, can be removed if all are hashed)
            if (admin.password !== password) {
                return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
            }
        }

        // In a real app, return a JWT or set a cookie here.
        // For this simple request, we'll just return success and let the client handle "auth" state (localStorage)
        // or we can set a simple cookie.

        return NextResponse.json({ success: true, message: 'Login successful' });

    } catch (error: any) {
        console.error('Login Error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
