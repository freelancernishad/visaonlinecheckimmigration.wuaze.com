"use client";

import { useState, useEffect } from 'react';
import { FiSave, FiAlertCircle, FiCheckCircle, FiPlus, FiTrash, FiImage, FiType, FiLayers, FiFlag, FiMessageSquare } from 'react-icons/fi';

export default function HomePageEditor() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [activeTab, setActiveTab] = useState('hero');

    const [data, setData] = useState<any>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await fetch('/api/homepage');
            if (res.ok) {
                const fetchedData = await res.json();

                // Ensure counter data exists and has items
                if (!fetchedData.counter || !fetchedData.counter.items || fetchedData.counter.items.length === 0) {
                    fetchedData.counter = {
                        items: [
                            { count: "31", label: "Visa Categories", suffix: "+" },
                            { count: "377", label: "Team Members", suffix: "+" },
                            { count: "4.9", label: "Visa Process", suffix: "K" },
                            { count: "98", label: "Success Rates", suffix: "%" }
                        ]
                    };
                }

                setData(fetchedData);
            }
        } catch (error) {
            console.error('Error fetching homepage data:', error);
            setMessage({ type: 'error', text: 'Failed to load data.' });
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage(null);

        try {
            const res = await fetch('/api/homepage', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                setMessage({ type: 'success', text: 'Home page updated successfully!' });
            } else {
                setMessage({ type: 'error', text: 'Failed to update home page.' });
            }
        } catch (error) {
            console.error('Error updating home page:', error);
            setMessage({ type: 'error', text: 'An error occurred while saving.' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading editor...</div>;
    if (!data) return <div className="p-8 text-center text-red-500">Error loading data.</div>;

    const tabs = [
        { id: 'hero', label: 'Hero Slider', icon: <FiImage /> },
        { id: 'about', label: 'About Section', icon: <FiType /> },
        { id: 'services', label: 'Services', icon: <FiLayers /> },
        { id: 'countries', label: 'Countries', icon: <FiFlag /> },
        { id: 'whyChooseUs', label: 'Why Choose Us', icon: <FiCheckCircle /> },
        { id: 'testimonials', label: 'Testimonials', icon: <FiMessageSquare /> },
        { id: 'counter', label: 'Counter', icon: <FiLayers /> },
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-6 pb-20">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Home Page Editor</h1>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-900/20 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                    {saving ? 'Saving...' : <><FiSave /> Save Changes</>}
                </button>
            </div>

            {message && (
                <div className={`p-4 rounded-lg flex items-center gap-2 ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {message.type === 'success' ? <FiCheckCircle /> : <FiAlertCircle />}
                    {message.text}
                </div>
            )}

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex overflow-hidden min-h-[600px]">
                {/* Sidebar Tabs */}
                <div className="w-64 bg-gray-50 border-r border-gray-100 flex-shrink-0">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3 px-6 py-4 text-left font-medium transition-colors ${activeTab === tab.id ? 'bg-white text-blue-600 border-l-4 border-blue-600 shadow-sm' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}
                        >
                            <span className="text-lg">{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="flex-1 p-8 overflow-y-auto max-h-[800px]">
                    {activeTab === 'hero' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-gray-800 border-b pb-4">Hero Slides</h2>
                            {data.hero.slides.map((slide: any, index: number) => (
                                <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-200 relative">
                                    <button
                                        onClick={() => {
                                            const newSlides = data.hero.slides.filter((_: any, i: number) => i !== index);
                                            setData({ ...data, hero: { ...data.hero, slides: newSlides } });
                                        }}
                                        className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                                    >
                                        <FiTrash />
                                    </button>
                                    <h3 className="font-semibold mb-4 text-gray-700">Slide {index + 1}</h3>
                                    <div className="grid grid-cols-1 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                                            <input
                                                type="text"
                                                value={slide.image}
                                                onChange={(e) => {
                                                    const newSlides = [...data.hero.slides];
                                                    newSlides[index].image = e.target.value;
                                                    setData({ ...data, hero: { ...data.hero, slides: newSlides } });
                                                }}
                                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                                            <input
                                                type="text"
                                                value={slide.subtitle}
                                                onChange={(e) => {
                                                    const newSlides = [...data.hero.slides];
                                                    newSlides[index].subtitle = e.target.value;
                                                    setData({ ...data, hero: { ...data.hero, slides: newSlides } });
                                                }}
                                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                            <input
                                                type="text"
                                                value={slide.title}
                                                onChange={(e) => {
                                                    const newSlides = [...data.hero.slides];
                                                    newSlides[index].title = e.target.value;
                                                    setData({ ...data, hero: { ...data.hero, slides: newSlides } });
                                                }}
                                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Text</label>
                                            <textarea
                                                value={slide.text}
                                                onChange={(e) => {
                                                    const newSlides = [...data.hero.slides];
                                                    newSlides[index].text = e.target.value;
                                                    setData({ ...data, hero: { ...data.hero, slides: newSlides } });
                                                }}
                                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                                rows={3}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <button
                                onClick={() => setData({ ...data, hero: { ...data.hero, slides: [...data.hero.slides, { image: '', subtitle: '', title: '', text: '' }] } })}
                                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors flex items-center justify-center gap-2 font-medium"
                            >
                                <FiPlus /> Add Slide
                            </button>
                        </div>
                    )}

                    {activeTab === 'about' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-gray-800 border-b pb-4">About Section</h2>
                            <div className="space-y-4">
                                <h3 className="font-semibold text-gray-700">Content</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                        <input
                                            type="text"
                                            value={data.about.title}
                                            onChange={(e) => setData({ ...data, about: { ...data.about, title: e.target.value } })}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                                        <input
                                            type="text"
                                            value={data.about.subtitle}
                                            onChange={(e) => setData({ ...data, about: { ...data.about, subtitle: e.target.value } })}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                        <textarea
                                            value={data.about.description}
                                            onChange={(e) => setData({ ...data, about: { ...data.about, description: e.target.value } })}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                            rows={4}
                                        />
                                    </div>
                                </div>

                                <h3 className="font-semibold text-gray-700 pt-4">Images</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Main Image URL</label>
                                        <input
                                            type="text"
                                            value={data.about.images.main}
                                            onChange={(e) => setData({ ...data, about: { ...data.about, images: { ...data.about.images, main: e.target.value } } })}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Image URL</label>
                                        <input
                                            type="text"
                                            value={data.about.images.secondary}
                                            onChange={(e) => setData({ ...data, about: { ...data.about, images: { ...data.about.images, secondary: e.target.value } } })}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'services' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-gray-800 border-b pb-4">Services Section</h2>
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
                                    <input
                                        type="text"
                                        value={data.services.title}
                                        onChange={(e) => setData({ ...data, services: { ...data.services, title: e.target.value } })}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Section Subtitle</label>
                                    <input
                                        type="text"
                                        value={data.services.subtitle}
                                        onChange={(e) => setData({ ...data, services: { ...data.services, subtitle: e.target.value } })}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Section Description</label>
                                    <textarea
                                        value={data.services.description}
                                        onChange={(e) => setData({ ...data, services: { ...data.services, description: e.target.value } })}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        rows={2}
                                    />
                                </div>
                            </div>

                            <h3 className="font-semibold text-gray-700">Service Items</h3>
                            {data.services.items.map((item: any, index: number) => (
                                <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-200 relative">
                                    <button
                                        onClick={() => {
                                            const newItems = data.services.items.filter((_: any, i: number) => i !== index);
                                            setData({ ...data, services: { ...data.services, items: newItems } });
                                        }}
                                        className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                                    >
                                        <FiTrash />
                                    </button>
                                    <div className="grid grid-cols-1 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                            <input
                                                type="text"
                                                value={item.title}
                                                onChange={(e) => {
                                                    const newItems = [...data.services.items];
                                                    newItems[index].title = e.target.value;
                                                    setData({ ...data, services: { ...data.services, items: newItems } });
                                                }}
                                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                                            <input
                                                type="text"
                                                value={item.image}
                                                onChange={(e) => {
                                                    const newItems = [...data.services.items];
                                                    newItems[index].image = e.target.value;
                                                    setData({ ...data, services: { ...data.services, items: newItems } });
                                                }}
                                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                            <textarea
                                                value={item.description}
                                                onChange={(e) => {
                                                    const newItems = [...data.services.items];
                                                    newItems[index].description = e.target.value;
                                                    setData({ ...data, services: { ...data.services, items: newItems } });
                                                }}
                                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                                rows={2}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <button
                                onClick={() => setData({ ...data, services: { ...data.services, items: [...data.services.items, { title: '', image: '', description: '' }] } })}
                                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors flex items-center justify-center gap-2 font-medium"
                            >
                                <FiPlus /> Add Service
                            </button>
                        </div>
                    )}

                    {activeTab === 'countries' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-gray-800 border-b pb-4">Countries Section</h2>
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
                                    <input
                                        type="text"
                                        value={data.countries.title}
                                        onChange={(e) => setData({ ...data, countries: { ...data.countries, title: e.target.value } })}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Section Description</label>
                                    <textarea
                                        value={data.countries.description}
                                        onChange={(e) => setData({ ...data, countries: { ...data.countries, description: e.target.value } })}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        rows={2}
                                    />
                                </div>
                            </div>

                            <h3 className="font-semibold text-gray-700">Country Items</h3>
                            {data.countries.items.map((item: any, index: number) => (
                                <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-200 relative">
                                    <button
                                        onClick={() => {
                                            const newItems = data.countries.items.filter((_: any, i: number) => i !== index);
                                            setData({ ...data, countries: { ...data.countries, items: newItems } });
                                        }}
                                        className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                                    >
                                        <FiTrash />
                                    </button>
                                    <div className="grid grid-cols-1 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Country Name</label>
                                            <input
                                                type="text"
                                                value={item.name}
                                                onChange={(e) => {
                                                    const newItems = [...data.countries.items];
                                                    newItems[index].name = e.target.value;
                                                    setData({ ...data, countries: { ...data.countries, items: newItems } });
                                                }}
                                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                                            <input
                                                type="text"
                                                value={item.image}
                                                onChange={(e) => {
                                                    const newItems = [...data.countries.items];
                                                    newItems[index].image = e.target.value;
                                                    setData({ ...data, countries: { ...data.countries, items: newItems } });
                                                }}
                                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Flag URL</label>
                                            <input
                                                type="text"
                                                value={item.flag}
                                                onChange={(e) => {
                                                    const newItems = [...data.countries.items];
                                                    newItems[index].flag = e.target.value;
                                                    setData({ ...data, countries: { ...data.countries, items: newItems } });
                                                }}
                                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <button
                                onClick={() => setData({ ...data, countries: { ...data.countries, items: [...data.countries.items, { name: '', image: '', flag: '' }] } })}
                                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors flex items-center justify-center gap-2 font-medium"
                            >
                                <FiPlus /> Add Country
                            </button>
                        </div>
                    )}

                    {activeTab === 'whyChooseUs' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-gray-800 border-b pb-4">Why Choose Us Section</h2>
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
                                    <input
                                        type="text"
                                        value={data.whyChooseUs.title}
                                        onChange={(e) => setData({ ...data, whyChooseUs: { ...data.whyChooseUs, title: e.target.value } })}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Section Subtitle</label>
                                    <input
                                        type="text"
                                        value={data.whyChooseUs.subtitle}
                                        onChange={(e) => setData({ ...data, whyChooseUs: { ...data.whyChooseUs, subtitle: e.target.value } })}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Section Description</label>
                                    <textarea
                                        value={data.whyChooseUs.description}
                                        onChange={(e) => setData({ ...data, whyChooseUs: { ...data.whyChooseUs, description: e.target.value } })}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        rows={2}
                                    />
                                </div>
                            </div>

                            <h3 className="font-semibold text-gray-700">Features</h3>
                            {data.whyChooseUs.features.map((feature: any, index: number) => (
                                <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-200 relative">
                                    <button
                                        onClick={() => {
                                            const newFeatures = data.whyChooseUs.features.filter((_: any, i: number) => i !== index);
                                            setData({ ...data, whyChooseUs: { ...data.whyChooseUs, features: newFeatures } });
                                        }}
                                        className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                                    >
                                        <FiTrash />
                                    </button>
                                    <div className="grid grid-cols-1 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Feature Title</label>
                                            <input
                                                type="text"
                                                value={feature.title}
                                                onChange={(e) => {
                                                    const newFeatures = [...data.whyChooseUs.features];
                                                    newFeatures[index].title = e.target.value;
                                                    setData({ ...data, whyChooseUs: { ...data.whyChooseUs, features: newFeatures } });
                                                }}
                                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Feature Description</label>
                                            <textarea
                                                value={feature.description}
                                                onChange={(e) => {
                                                    const newFeatures = [...data.whyChooseUs.features];
                                                    newFeatures[index].description = e.target.value;
                                                    setData({ ...data, whyChooseUs: { ...data.whyChooseUs, features: newFeatures } });
                                                }}
                                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                                rows={2}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <button
                                onClick={() => setData({ ...data, whyChooseUs: { ...data.whyChooseUs, features: [...data.whyChooseUs.features, { title: '', description: '' }] } })}
                                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors flex items-center justify-center gap-2 font-medium"
                            >
                                <FiPlus /> Add Feature
                            </button>
                        </div>
                    )}

                    {activeTab === 'testimonials' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-gray-800 border-b pb-4">Testimonials Section</h2>
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
                                    <input
                                        type="text"
                                        value={data.testimonials.title}
                                        onChange={(e) => setData({ ...data, testimonials: { ...data.testimonials, title: e.target.value } })}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Section Subtitle</label>
                                    <input
                                        type="text"
                                        value={data.testimonials.subtitle}
                                        onChange={(e) => setData({ ...data, testimonials: { ...data.testimonials, subtitle: e.target.value } })}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Section Description</label>
                                    <textarea
                                        value={data.testimonials.description}
                                        onChange={(e) => setData({ ...data, testimonials: { ...data.testimonials, description: e.target.value } })}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        rows={2}
                                    />
                                </div>
                            </div>

                            <h3 className="font-semibold text-gray-700">Client Reviews</h3>
                            {data.testimonials.items.map((item: any, index: number) => (
                                <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-200 relative">
                                    <button
                                        onClick={() => {
                                            const newItems = data.testimonials.items.filter((_: any, i: number) => i !== index);
                                            setData({ ...data, testimonials: { ...data.testimonials, items: newItems } });
                                        }}
                                        className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                                    >
                                        <FiTrash />
                                    </button>
                                    <div className="grid grid-cols-1 gap-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                                                <input
                                                    type="text"
                                                    value={item.name}
                                                    onChange={(e) => {
                                                        const newItems = [...data.testimonials.items];
                                                        newItems[index].name = e.target.value;
                                                        setData({ ...data, testimonials: { ...data.testimonials, items: newItems } });
                                                    }}
                                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Profession</label>
                                                <input
                                                    type="text"
                                                    value={item.profession}
                                                    onChange={(e) => {
                                                        const newItems = [...data.testimonials.items];
                                                        newItems[index].profession = e.target.value;
                                                        setData({ ...data, testimonials: { ...data.testimonials, items: newItems } });
                                                    }}
                                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                                            <input
                                                type="text"
                                                value={item.image}
                                                onChange={(e) => {
                                                    const newItems = [...data.testimonials.items];
                                                    newItems[index].image = e.target.value;
                                                    setData({ ...data, testimonials: { ...data.testimonials, items: newItems } });
                                                }}
                                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Review Text</label>
                                            <textarea
                                                value={item.text}
                                                onChange={(e) => {
                                                    const newItems = [...data.testimonials.items];
                                                    newItems[index].text = e.target.value;
                                                    setData({ ...data, testimonials: { ...data.testimonials, items: newItems } });
                                                }}
                                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                                rows={2}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <button
                                onClick={() => setData({ ...data, testimonials: { ...data.testimonials, items: [...data.testimonials.items, { name: '', profession: '', image: '', text: '' }] } })}
                                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors flex items-center justify-center gap-2 font-medium"
                            >
                                <FiPlus /> Add Testimonial
                            </button>
                        </div>
                    )}

                    {activeTab === 'counter' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-gray-800 border-b pb-4">Counter Section</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {data.counter?.items.map((item: any, index: number) => (
                                    <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                                        <h3 className="font-semibold mb-3 text-gray-700">Counter {index + 1}</h3>
                                        <div className="space-y-3">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                                                <input
                                                    type="text"
                                                    value={item.label}
                                                    onChange={(e) => {
                                                        const newItems = [...data.counter.items];
                                                        newItems[index].label = e.target.value;
                                                        setData({ ...data, counter: { ...data.counter, items: newItems } });
                                                    }}
                                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-2">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Count</label>
                                                    <input
                                                        type="text"
                                                        value={item.count}
                                                        onChange={(e) => {
                                                            const newItems = [...data.counter.items];
                                                            newItems[index].count = e.target.value;
                                                            setData({ ...data, counter: { ...data.counter, items: newItems } });
                                                        }}
                                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Suffix</label>
                                                    <input
                                                        type="text"
                                                        value={item.suffix}
                                                        onChange={(e) => {
                                                            const newItems = [...data.counter.items];
                                                            newItems[index].suffix = e.target.value;
                                                            setData({ ...data, counter: { ...data.counter, items: newItems } });
                                                        }}
                                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
