import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import SiteSettings from '@/models/SiteSettings';

export async function GET() {
    try {
        await connectToDatabase();
        let settings = await SiteSettings.findOne();

        if (!settings) {
            settings = await SiteSettings.create({});
        }

        return NextResponse.json(settings);
    } catch (error) {
        console.error("Error fetching settings:", error);
        return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        await connectToDatabase();

        let settings = await SiteSettings.findOne();

        if (!settings) {
            settings = new SiteSettings(body);
        } else {
            Object.assign(settings, body);
        }

        await settings.save();

        return NextResponse.json(settings);
    } catch (error) {
        console.error("Error updating settings:", error);
        return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
    }
}
