import React from 'react';
import { useNavigate } from 'react-router-dom';

const THEMES = [
    {
        id: "01",
        title: "Biomaterials & Bioengineering",
        description: "Innovative materials and engineering solutions for healthcare and biological applications.",
        image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=800", // using high-res placeholder
        topics: [
            "Microfluidics and Lab-on-Chip",
            "Bio-Medical Sensors",
            "Drug Delivery",
            "Therapeutics & Pharmaceutics",
            "Food and Nutrition",
            "AI/ ML in healthcare"
        ]
    },
    {
        id: "02",
        title: "Advanced Technologies",
        description: "Cutting-edge advancements in materials science, simulation, and nanotechnology.",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
        topics: [
            "Emerging Smart Materials",
            "Design, Simulation & Modelling",
            "Nanomaterials & Nano-Engineering",
            "Novel Synthesis Techniques",
            "Composite Materials",
            "Materials at extreme conditions"
        ]
    },
    {
        id: "03",
        title: "Design and Creativity",
        description: "Exploring the intersection of aesthetics, functionality, and user experience.",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800",
        topics: [
            "Graphics Design",
            "Ergonomics and Human Factors",
            "Fashion and Textile Design",
            "Industrial Design",
            "User Interface and User Experience",
            "Sustainable Design",
            "Service and System Design",
            "Animation and Game Design"
        ]
    },
    {
        id: "04",
        title: "Energy and Environment",
        description: "Sustainable solutions for energy generation, storage, and environmental protection.",
        image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800",
        topics: [
            "Environmental Quality Monitoring",
            "Batteries & Super capacitors",
            "Hydrogen Generation and Storage",
            "Clean Energy",
            "Sustainable Development",
            "Safety and Security",
            "Fire safety"
        ]
    },
    {
        id: "05",
        title: "General Management and Law",
        description: "Modern perspectives on business strategy, law, and digital transformation.",
        image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800",
        topics: [
            "Entrepreneurship & e-governance",
            "Intellectual Property Rights",
            "Strategic Business Management",
            "Data Mining",
            "Corporate Skills",
            "Metaverse & Blockchain management",
            "Liberal arts and modern media"
        ]
    }
];

export default function Themes() {
    const navigate = useNavigate();

    return (
        <div className="max-w-[480px] mx-auto bg-slate-50 dark:bg-[#0a0a0a] min-h-screen flex flex-col relative transition-colors duration-500 font-sans overflow-x-hidden pb-20">

            {/* Animated Mesh Gradient Background (Research/Academic Theme) */}
            <div className="fixed inset-0 z-0 pointer-events-none max-w-[480px] mx-auto">
                <div className="absolute -top-[5%] -left-[10%] w-[350px] h-[350px] bg-blue-400/30 dark:bg-blue-600/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-[90px] opacity-70 animate-pulse"></div>
                <div className="absolute top-[40%] -right-[10%] w-[300px] h-[300px] bg-indigo-400/20 dark:bg-indigo-600/10 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-[90px] opacity-60"></div>
            </div>

            {/* --- HEADER (Frosted Glass) --- */}
            <header className="relative z-50 sticky top-0 bg-white/70 dark:bg-black/50 backdrop-blur-2xl border-b border-white/50 dark:border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.03)] pt-[env(safe-area-inset-top)]">
                <div className="px-5 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate('/')}
                            className="size-10 flex items-center justify-center rounded-full bg-white/50 dark:bg-white/10 border border-white/40 dark:border-white/5 text-gray-700 dark:text-gray-300 shadow-sm active:scale-90 transition-all"
                        >
                            <span className="material-symbols-outlined text-[20px]">arrow_back_ios_new</span>
                        </button>
                        <div>
                            <h1 className="text-[20px] font-black tracking-tight text-gray-900 dark:text-white leading-none mb-0.5">
                                IYRC Tracks
                            </h1>
                            <p className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                                Research Themes
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="relative z-10 flex-1 flex flex-col">

                {/* Intro Section */}
                <div className="px-6 pt-8 pb-4">
                    <h3 className="text-[28px] font-black tracking-tight text-gray-900 dark:text-white leading-tight">
                        Explore <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">The Future.</span>
                    </h3>
                    <p className="text-[13px] font-medium text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
                        Discover the diverse fields of research driving innovation at UPES University.
                    </p>
                </div>

                {/* Theme Cards List */}
                <div className="px-5 pb-12 flex flex-col gap-6 mt-2">
                    {THEMES.map((theme) => (
                        <div
                            key={theme.id}
                            className="bg-white/60 dark:bg-black/40 backdrop-blur-xl rounded-[32px] overflow-hidden shadow-lg shadow-blue-500/5 border border-white/60 dark:border-white/10 transition-all hover:shadow-xl hover:bg-white/80 dark:hover:bg-white/5 group"
                        >
                            {/* Hero Image Container */}
                            <div className="h-[220px] w-full bg-gray-200 dark:bg-gray-800 relative overflow-hidden">
                                {/* Image with zoom effect on hover */}
                                <div
                                    className="absolute inset-0 bg-center bg-no-repeat bg-cover transition-transform duration-700 group-hover:scale-105"
                                    style={{ backgroundImage: `url("${theme.image}")` }}
                                ></div>

                                {/* Deep dark gradient overlay so text is always readable */}
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/40 to-transparent"></div>

                                <div className="absolute bottom-5 left-5 right-5">
                                    <span className="inline-block bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-widest shadow-sm mb-2">
                                        Track {theme.id}
                                    </span>
                                    <h4 className="text-white text-[20px] font-black leading-tight drop-shadow-md pr-4">
                                        {theme.title}
                                    </h4>
                                </div>
                            </div>

                            {/* Card Content Details */}
                            <div className="p-6 pt-5">
                                <p className="text-gray-600 dark:text-gray-300 text-[13px] font-medium leading-relaxed mb-5">
                                    {theme.description}
                                </p>

                                <div className="flex flex-col gap-2">
                                    <h5 className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1 ml-1">
                                        Core Topics
                                    </h5>
                                    <div className="flex flex-wrap gap-2">
                                        {theme.topics.map((topic, index) => (
                                            <span
                                                key={index}
                                                className="bg-white/80 dark:bg-white/5 text-gray-700 dark:text-gray-300 border border-white/50 dark:border-white/10 shadow-sm text-[11.5px] font-bold px-3 py-1.5 rounded-[12px] transition-colors hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
                                            >
                                                {topic}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}