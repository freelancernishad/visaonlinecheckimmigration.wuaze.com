import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/db';
import Admin from '@/models/Admin';

// Update Admin (Other user)
export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        const { id } = params;
        const { username, password } = await req.json();

        const admin = await Admin.findById(id);
        if (!admin) {
            return NextResponse.json({ error: 'Admin not found' }, { status: 404 });
        }

        // Check unique username
        if (username && username !== admin.username) {
            const existing = await Admin.findOne({ username });
            if (existing) {
                return NextResponse.json({ error: 'Username already exists' }, { status: 400 });
            }
            admin.username = username;
        }

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            admin.password = hashedPassword;
        }

        await admin.save();
        return NextResponse.json({ success: true, message: 'Admin updated successfully' });

    } catch (error) {
        console.error('Update Admin Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// Delete Admin
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        const { id } = params;

        // Prevent deleting the last admin? (Optional safety check)
        // const count = await Admin.countDocuments();
        // if (count <= 1) {
        //     return NextResponse.json({ error: 'Cannot delete the last admin' }, { status: 400 });
        // }

        const deleted = await Admin.findByIdAndDelete(id);
        if (!deleted) {
            return NextResponse.json({ error: 'Admin not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'Admin deleted successfully' });

    } catch (error) {
        console.error('Delete Admin Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
