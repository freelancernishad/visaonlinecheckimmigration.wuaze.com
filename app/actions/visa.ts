"use server";

import dbConnect from "@/lib/db";
import Application from "@/models/Application";

export async function getVisaStatus(passport: string) {
    try {
        await dbConnect();

        // Case insensitive search
        const application = await Application.findOne({
            passport: { $regex: new RegExp(`^${passport}$`, 'i') }
        }).lean();

        if (!application) {
            return { success: false, message: "No application found" };
        }

        // Convert _id to string to avoid serialization issues
        const serializedApp = {
            ...application,
            _id: application._id.toString(),
            createdAt: application.createdAt?.toISOString(),
            updatedAt: application.updatedAt?.toISOString(),
        };

        return { success: true, data: serializedApp };
    } catch (error) {
        console.error("Error fetching visa status:", error);
        return { success: false, message: "Internal server error" };
    }
}
