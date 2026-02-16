import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import upesLogo from '../assets/upeslogo.jpeg';
import AboutFooter from '../components/AboutFooter';

export default function Home() {
    const { theme, toggleTheme } = useTheme();
    const [isProfileOpen, setIsProfileOpen] = useState(false);


    return (
        <>
            {/* Header */}
            <div className="sticky top-0 z-50 flex items-center bg-white/95 dark:bg-background-dark/95 backdrop-blur-md p-4 pb-3 justify-between border-b border-gray-100 dark:border-gray-800" style={{ paddingTop: 'calc(env(safe-area-inset-top) + 1rem)' }}>
                <div className="flex size-10 shrink-0 items-center">
                    <img
                        src={upesLogo}
                        alt="UPES Logo"
                        className="size-10 rounded-full object-cover shadow-sm border border-gray-100 dark:border-gray-800"
                    />
                </div>
                <h2 className="text-[#111418] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 ml-3 text-center">IYRC 2026</h2>
                <div className="flex items-center justify-end relative gap-2">
                    <button
                        className="flex cursor-pointer items-center justify-center rounded-lg h-10 w-10 bg-transparent text-[#111418] dark:text-white active:scale-95 transition-transform"
                        onClick={toggleTheme}
                    >
                        <span className="material-symbols-outlined">
                            {theme === 'light' ? 'dark_mode' : 'light_mode'}
                        </span>
                    </button>
                    <button
                        className="flex cursor-pointer items-center justify-center rounded-lg h-10 w-10 bg-transparent text-[#111418] dark:text-white active:scale-95 transition-transform"
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                    >
                        <span className="material-symbols-outlined">account_circle</span>
                    </button>

                    {/* Profile Dropdown */}
                    {isProfileOpen && (
                        <div className="absolute top-12 right-0 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 py-2 animate-in fade-in zoom-in-95 duration-200">
                            <Link
                                to="/login"
                                onClick={() => setIsProfileOpen(false)}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 no-underline"
                            >
                                <span className="material-symbols-outlined text-[18px]">login</span>
                                Sign In
                            </Link>
                        </div>
                    )}

                </div>
            </div>

            <div className="@container animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <div className="px-4 py-4">
                    <div
                        className="bg-cover bg-center flex flex-col justify-end overflow-hidden bg-primary rounded-3xl min-h-[280px] relative shadow-lg group transition-all duration-500 hover:shadow-primary/20 hover:scale-[1.01]"
                        style={{
                            backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(10, 25, 47, 0.9) 100%), linear-gradient(0deg, rgba(19, 109, 236, 0.3) 0%, rgba(19, 109, 236, 0.1) 100%), url("https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2070&auto=format&fit=crop")'
                        }}
                    >
                        {/* Subtle Glows */}
                        <div className="absolute top-4 right-4 size-20 bg-blue-400/20 rounded-full blur-3xl animate-blob"></div>

                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500"></div>

                        <div className="flex flex-col p-6 relative z-10">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="bg-white/10 backdrop-blur-md text-white border border-white/20 text-[10px] font-extrabold uppercase tracking-[0.1em] px-3 py-1 rounded-full shadow-lg">UPES</span>
                            </div>
                            <h1 className="text-white tracking-tight text-3xl font-extrabold leading-tight drop-shadow-lg mb-2">
                                4th International <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-100 to-white">Young Researchers</span> <br />
                                Conclave
                            </h1>
                            <p className="text-blue-100/90 text-sm font-medium max-w-[90%] leading-relaxed">
                                Advancing Frontiers in Science &amp; Technology
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="px-4 py-2 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="flex justify-between gap-2 overflow-x-auto no-scrollbar pb-2">
                    <div className="bg-blue-50 dark:bg-blue-900/10 min-w-[100px] flex-1 p-3 rounded-2xl flex flex-col items-center justify-center border border-blue-100 dark:border-blue-800">
                        <span className="text-2xl font-black text-primary mb-1">50+</span>
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Speakers</span>
                    </div>
                    <div className="bg-orange-50 dark:bg-orange-900/10 min-w-[100px] flex-1 p-3 rounded-2xl flex flex-col items-center justify-center border border-orange-100 dark:border-orange-800">
                        <span className="text-2xl font-black text-accent-orange mb-1">10+</span>
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Countries</span>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/10 min-w-[100px] flex-1 p-3 rounded-2xl flex flex-col items-center justify-center border border-green-100 dark:border-green-800">
                        <span className="text-2xl font-black text-green-600 mb-1">3</span>
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Days</span>
                    </div>
                </div>
            </div>

            <div className="mt-2 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <h3 className="text-[#111418] dark:text-white tracking-tight text-xl font-bold leading-tight px-4 text-left pb-2 flex items-center gap-2">
                    Explore Event
                    <span className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded-full">New</span>
                </h3>
            </div>

            <div className="mt-2 px-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <div className="grid grid-cols-2 gap-3">
                    <Link to="/about" className="group bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col gap-3 active:bg-gray-50 dark:active:bg-gray-700 transition-all hover:border-primary/30 hover:shadow-lg hover:-translate-y-1 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-[40px] -mr-4 -mt-4 transition-transform group-hover:scale-125 duration-500"></div>
                        <div className="size-12 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent flex items-center justify-center text-primary z-10 shadow-sm group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                            <span className="material-symbols-outlined text-[28px]">science</span>
                        </div>
                        <div className="z-10">
                            <h4 className="font-bold text-[#111418] dark:text-white text-[16px] group-hover:text-primary transition-colors">About UPES</h4>
                            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 leading-tight font-medium">Host University info</p>
                        </div>
                    </Link>
                    <Link to="/themes" className="group bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col gap-3 active:bg-gray-50 dark:active:bg-gray-700 transition-all hover:border-accent-orange/30 hover:shadow-lg hover:-translate-y-1 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-accent-orange/5 to-transparent rounded-bl-[40px] -mr-4 -mt-4 transition-transform group-hover:scale-125 duration-500"></div>
                        <div className="size-12 rounded-2xl bg-gradient-to-br from-accent-orange/10 to-transparent flex items-center justify-center text-accent-orange z-10 shadow-sm group-hover:bg-accent-orange group-hover:text-white transition-colors duration-300">
                            <span className="material-symbols-outlined text-[28px]">biotech</span>
                        </div>
                        <div className="z-10">
                            <h4 className="font-bold text-[#111418] dark:text-white text-[16px] group-hover:text-accent-orange transition-colors">Themes</h4>
                            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 leading-tight font-medium">Research tracks</p>
                        </div>
                    </Link>
                    <Link to="/committee" className="group bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col gap-3 active:bg-gray-50 dark:active:bg-gray-700 transition-all hover:border-blue-500/30 hover:shadow-lg hover:-translate-y-1 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/5 to-transparent rounded-bl-[40px] -mr-4 -mt-4 transition-transform group-hover:scale-125 duration-500"></div>
                        <div className="size-12 rounded-2xl bg-gradient-to-br from-blue-500/10 to-transparent flex items-center justify-center text-blue-600 z-10 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                            <span className="material-symbols-outlined text-[28px]">groups</span>
                        </div>
                        <div className="z-10">
                            <h4 className="font-bold text-[#111418] dark:text-white text-[16px] group-hover:text-blue-600 transition-colors">Committee</h4>
                            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 leading-tight font-medium">Meet the organizers</p>
                        </div>
                    </Link>
                    <Link to="/map" className="group bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col gap-3 active:bg-gray-50 dark:active:bg-gray-700 transition-all hover:border-green-500/30 hover:shadow-lg hover:-translate-y-1 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-500/5 to-transparent rounded-bl-[40px] -mr-4 -mt-4 transition-transform group-hover:scale-125 duration-500"></div>
                        <div className="size-12 rounded-2xl bg-gradient-to-br from-green-500/10 to-transparent flex items-center justify-center text-green-600 z-10 shadow-sm group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
                            <span className="material-symbols-outlined text-[28px]">map</span>
                        </div>
                        <div className="z-10">
                            <h4 className="font-bold text-[#111418] dark:text-white text-[16px] group-hover:text-green-600 transition-colors">Venue Map</h4>
                            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 leading-tight font-medium">Navigate campus</p>
                        </div>
                    </Link>
                    <Link to="/speakers" className="group bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col gap-3 active:bg-gray-50 dark:active:bg-gray-700 transition-all hover:border-purple-500/30 hover:shadow-lg hover:-translate-y-1 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/5 to-transparent rounded-bl-[40px] -mr-4 -mt-4 transition-transform group-hover:scale-125 duration-500"></div>
                        <div className="size-12 rounded-2xl bg-gradient-to-br from-purple-500/10 to-transparent flex items-center justify-center text-purple-600 z-10 shadow-sm group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                            <span className="material-symbols-outlined text-[28px]">record_voice_over</span>
                        </div>
                        <div className="z-10">
                            <h4 className="font-bold text-[#111418] dark:text-white text-[16px] group-hover:text-purple-600 transition-colors">Speakers</h4>
                            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 leading-tight font-medium">Expert lineup</p>
                        </div>
                    </Link>
                    <Link to="/feedback" className="group bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col gap-3 active:bg-gray-50 dark:active:bg-gray-700 transition-all hover:border-yellow-500/30 hover:shadow-lg hover:-translate-y-1 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-500/5 to-transparent rounded-bl-[40px] -mr-4 -mt-4 transition-transform group-hover:scale-125 duration-500"></div>
                        <div className="size-12 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-transparent flex items-center justify-center text-yellow-600 z-10 shadow-sm group-hover:bg-yellow-600 group-hover:text-white transition-colors duration-300">
                            <span className="material-symbols-outlined text-[28px]">rate_review</span>
                        </div>
                        <div className="z-10">
                            <h4 className="font-bold text-[#111418] dark:text-white text-[16px] group-hover:text-yellow-600 transition-colors">Feedback</h4>
                            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 leading-tight font-medium">Rate the event</p>
                        </div>
                    </Link>
                </div>
            </div>

            <div className="mt-6 px-4 mb-0 animate-slide-up" style={{ animationDelay: '0.5s' }}>
                <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 p-4 rounded-2xl flex items-start gap-4 shadow-sm relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 size-24 bg-primary/5 rounded-full blur-xl animate-pulse"></div>
                    <div className="bg-white dark:bg-primary p-2.5 rounded-xl text-primary dark:text-white shadow-sm z-10">
                        <span className="material-symbols-outlined text-xl animate-wiggle">campaign</span>
                    </div>
                    <div className="z-10">
                        <h4 className="font-bold text-primary text-sm flex items-center gap-2">
                            Latest Update
                            <span className="size-1.5 rounded-full bg-red-500 animate-ping"></span>
                        </h4>
                        <p className="text-sm text-[#111418] dark:text-gray-300 mt-1 font-medium leading-relaxed">Full conference schedule is now live! Check the timeline to plan your sessions.</p>
                    </div>
                </div>
            </div>

            {/* About Popup */}
            <AboutFooter />
        </>
    );
}
