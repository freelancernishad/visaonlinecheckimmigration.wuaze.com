import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/db';
import Admin from '@/models/Admin';

// Update Profile
export async function PUT(req: Request) {
    try {
        await connectDB();
        const body = await req.json();
        const { id, username } = body;

        if (!id || !username) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const admin = await Admin.findById(id);
        if (!admin) {
            return NextResponse.json({ error: 'Admin not found' }, { status: 404 });
        }

        // Check if username is taken by another admin
        const existing = await Admin.findOne({ username, _id: { $ne: id } });
        if (existing) {
            return NextResponse.json({ error: 'Username already in use' }, { status: 400 });
        }

        admin.username = username;
        await admin.save();

        return NextResponse.json({ success: true, message: 'Profile updated successfully', admin: { id: admin._id, username: admin.username } });

    } catch (error: any) {
        console.error('Update Profile Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// Change Password
export async function PATCH(req: Request) {
    try {
        await connectDB();
        const body = await req.json();
        const { id, currentPassword, newPassword } = body;

        if (!id || !currentPassword || !newPassword) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const admin = await Admin.findById(id);
        if (!admin) {
            return NextResponse.json({ error: 'Admin not found' }, { status: 404 });
        }

        // Verify current password
        const isMatch = await bcrypt.compare(currentPassword, admin.password);
        if (!isMatch) {
            // Fallback for plain text check if necessary, though ideally we move to hashing
            if (admin.password !== currentPassword) {
                return NextResponse.json({ error: 'Incorrect current password' }, { status: 400 });
            }
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        admin.password = hashedPassword;
        await admin.save();

        return NextResponse.json({ success: true, message: 'Password changed successfully' });

    } catch (error: any) {
        console.error('Change Password Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
