import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IHomePage extends Document {
    hero: {
        slides: Array<{
            image: string;
            subtitle: string;
            title: string;
            text: string;
        }>;
    };
    about: {
        images: {
            main: string;
            secondary: string;
        };
        stats: {
            value: string;
            label: string;
        };
        title: string;
        subtitle: string;
        description: string;
        features: Array<{
            title: string;
            description: string;
        }>;
        experience: {
            years: string;
            text: string;
            points: string[];
        };
    };
    services: {
        title: string;
        subtitle: string;
        description: string;
        items: Array<{
            title: string;
            image: string;
            description: string;
        }>;
    };
    whyChooseUs: {
        title: string;
        subtitle: string;
        description: string;
        features: Array<{
            title: string;
            description: string;
        }>;
    };
    countries: {
        title: string;
        subtitle: string;
        description: string;
        items: Array<{
            name: string;
            image: string;
            flag: string;
        }>;
    };
    testimonials: {
        title: string;
        subtitle: string;
        description: string;
        items: Array<{
            name: string;
            profession: string;
            image: string;
            text: string;
        }>;
    };
    counter: {
        items: Array<{
            count: string;
            label: string;
            suffix: string;
        }>;
    };
}

const HomePageSchema: Schema<IHomePage> = new Schema(
    {
        hero: {
            slides: [{
                image: String,
                subtitle: String,
                title: String,
                text: String
            }]
        },
        about: {
            images: {
                main: String,
                secondary: String
            },
            stats: {
                value: String,
                label: String
            },
            title: String,
            subtitle: String,
            description: String,
            features: [{
                title: String,
                description: String
            }],
            experience: {
                years: String,
                text: String,
                points: [String]
            }
        },
        services: {
            title: String,
            subtitle: String,
            description: String,
            items: [{
                title: String,
                image: String,
                description: String
            }]
        },
        whyChooseUs: {
            title: String,
            subtitle: String,
            description: String,
            features: [{
                title: String,
                description: String
            }]
        },
        countries: {
            title: String,
            subtitle: String,
            description: String,
            items: [{
                name: String,
                image: String,
                flag: String
            }]
        },
        testimonials: {
            title: String,
            subtitle: String,
            description: String,
            items: [{
                name: String,
                profession: String,
                image: String,
                text: String
            }]
        },
        counter: {
            items: [{
                count: String,
                label: String,
                suffix: String
            }]
        }
    },
    { timestamps: true }
);

// Prevent overwrite model error in development
if (mongoose.models.HomePage) {
    delete mongoose.models.HomePage;
}
const HomePage: Model<IHomePage> = mongoose.model<IHomePage>('HomePage', HomePageSchema);

export default HomePage;
