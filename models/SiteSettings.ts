import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISiteSettings extends Document {
    email: string;
    phone: string;
    socialLinks: {
        facebook: string;
        twitter: string;
        linkedin: string;
        instagram: string;
        youtube: string;
    };
    siteTitle: string;
    footerText: string;
    copyrightText: string;
    adminRegistrationOpen: boolean;
}

const SiteSettingsSchema: Schema<ISiteSettings> = new Schema(
    {
        email: { type: String, default: 'Example@gmail.com' },
        phone: { type: String, default: '+01234567890' },
        socialLinks: {
            facebook: { type: String, default: '#' },
            twitter: { type: String, default: '#' },
            linkedin: { type: String, default: '#' },
            instagram: { type: String, default: '#' },
            youtube: { type: String, default: '#' },
        },
        siteTitle: { type: String, default: 'E-VISA' },
        footerText: { type: String, default: '' },
        copyrightText: { type: String, default: '2024 VisaOnline. All right reserved.' },
        adminRegistrationOpen: { type: Boolean, default: true },
    },
    { timestamps: true }
);

// Prevent overwrite model error in development
const SiteSettings: Model<ISiteSettings> = mongoose.models.SiteSettings || mongoose.model<ISiteSettings>('SiteSettings', SiteSettingsSchema);

export default SiteSettings;
