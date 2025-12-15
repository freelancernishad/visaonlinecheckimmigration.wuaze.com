import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import HomePage from '@/models/HomePage';

const defaultData = {
    hero: {
        slides: [
            {
                image: "https://images.unsplash.com/photo-1436491865332-7a61a1002c67?q=80&w=2000&auto=format&fit=crop",
                subtitle: "Welcome to VisaOnline",
                title: "Best Visa \n Immigrations Services",
                text: "We provide expert guidance and support for all your visa and immigration needs."
            },
            {
                image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2000&auto=format&fit=crop",
                subtitle: "Trusted Partners",
                title: "Your Journey \n Starts Here",
                text: "Experience seamless visa processing with our dedicated team of professionals."
            },
            {
                image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?q=80&w=2000&auto=format&fit=crop",
                subtitle: "Global Reach",
                title: "Explore The \n World With Us",
                text: "Connecting you to opportunities worldwide through simplified immigration."
            }
        ]
    },
    about: {
        images: {
            main: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
            secondary: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=600&auto=format&fit=crop"
        },
        stats: {
            value: "10k+",
            label: "Happy Clients"
        },
        title: "Providing The Best \n Immigration Services.",
        subtitle: "About Our Company",
        description: "We have been counseling students for educational opportunities in Foreign countries and helping them realize their dream of studying abroad.",
        features: [
            { title: "Certified Experts", description: "Our team consists of certified immigration consultants." },
            { title: "Global Reach", description: "We assist with visa applications for over 50 countries." }
        ],
        experience: {
            years: "34+",
            text: "We have a proven track record of success.",
            points: ["98% Visa Approval Rate", "Initial Consultation Free"]
        }
    },
    services: {
        title: "Enabling Your Immigration \n Successfully",
        subtitle: "Our Services",
        description: "We provide comprehensive solutions for all your visa and immigration requirements.",
        items: [
            { title: "Job Visa", image: "https://images.unsplash.com/photo-1586769852044-692d6e3703f0?q=80&w=800&auto=format&fit=crop", description: "Professional assistance for your job visa application process with high success rates." },
            { title: "Business Visa", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop", description: "Professional assistance for your business visa application process with high success rates." },
            { title: "Diplometic Visa", image: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=800&auto=format&fit=crop", description: "Professional assistance for your diplometic visa application process with high success rates." },
            { title: "Students Visa", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop", description: "Professional assistance for your students visa application process with high success rates." },
            { title: "Residence Visa", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop", description: "Professional assistance for your residence visa application process with high success rates." },
            { title: "Tourist Visa", image: "https://images.unsplash.com/photo-1500835556837-99ac94a94552?q=80&w=800&auto=format&fit=crop", description: "Professional assistance for your tourist visa application process with high success rates." }
        ]
    },
    whyChooseUs: {
        title: "Offer Tailor Made Services That Our Client Requires",
        subtitle: "Why Choose Us",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat deleniti amet at atque sequi quibusdam cumque itaque repudiandae temporibus.",
        features: [
            { title: "Cost-Effective", description: "Experience world-class service tailored to your immigration needs with our expert team." },
            { title: "Visa Assistance", description: "Experience world-class service tailored to your immigration needs with our expert team." },
            { title: "Faster Processing", description: "Experience world-class service tailored to your immigration needs with our expert team." },
            { title: "Direct Interviews", description: "Experience world-class service tailored to your immigration needs with our expert team." }
        ]
    },
    countries: {
        title: "Immigration & visa services following Countries",
        subtitle: "Countries We Offer",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat deleniti amet at atque sequi quibusdam cumque itaque repudiandae temporibus.",
        items: [
            { name: "Brazil", flag: "https://flagcdn.com/w160/br.png", image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=600&auto=format&fit=crop" },
            { name: "India", flag: "https://flagcdn.com/w160/in.png", image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=600&auto=format&fit=crop" },
            { name: "New York", flag: "https://flagcdn.com/w160/us.png", image: "https://images.unsplash.com/photo-1496442226666-8d4a0e62e6e9?q=80&w=600&auto=format&fit=crop" },
            { name: "Italy", flag: "https://flagcdn.com/w160/it.png", image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=600&auto=format&fit=crop" },
        ]
    },
    testimonials: {
        title: "What Our Clients Say",
        subtitle: "Our Clients Reviews",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat deleniti amet at atque sequi quibusdam cumque itaque repudiandae temporibus.",
        items: [
            { name: "John Doe", profession: "Business Traveler", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
            { name: "Sarah Smith", profession: "Student", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
            { name: "Michael Brown", profession: "Tourist", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
            { name: "Emily Davis", profession: "Migrant Worker", image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=200&auto=format&fit=crop", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
        ]
    },
    counter: {
        items: [
            { count: "31", label: "Visa Categories", suffix: "+" },
            { count: "377", label: "Team Members", suffix: "+" },
            { count: "4.9", label: "Visa Process", suffix: "K" },
            { count: "98", label: "Success Rates", suffix: "%" }
        ]
    }
};

export async function GET() {
    try {
        await connectToDatabase();
        let homePage = await HomePage.findOne();

        if (!homePage) {
            homePage = await HomePage.create(defaultData);
        } else if (!homePage.counter || !homePage.counter.items) {
            // If homepage exists but counter is missing (migration for existing data)
            homePage.counter = defaultData.counter;
            await homePage.save();
        }

        return NextResponse.json(homePage);
    } catch (error) {
        console.error("Error fetching homepage data:", error);
        return NextResponse.json({ error: "Failed to fetch homepage data" }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        await connectToDatabase();

        let homePage = await HomePage.findOne();

        if (!homePage) {
            homePage = new HomePage(body);
        } else {
            Object.assign(homePage, body);
        }

        await homePage.save();

        return NextResponse.json(homePage);
    } catch (error) {
        console.error("Error updating homepage data:", error);
        return NextResponse.json({ error: "Failed to update homepage data" }, { status: 500 });
    }
}
