import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import upesLogo from '../assets/upeslogo.jpeg';
import { useBackButton } from '../hooks/useBackButton';
import AboutFooter from '../components/AboutFooter';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();


    // Prevent back navigation on dashboard
    useBackButton();

    const adminActions = [
        { title: 'Email Manager', desc: 'Excel & Logs', icon: 'mail', path: '/emails', color: 'text-indigo-500' },
        { title: 'QR Generator', desc: 'Name · Email · Phone', icon: 'qr_code_2', path: '/qr-generator', color: 'text-green-500' },
        { title: 'Add Manager', desc: 'New accounts', icon: 'person_add', path: '/addmanagers', color: 'text-blue-500' },
        { title: 'View Logs', desc: 'Live attendance', icon: 'history', path: '/logs', color: 'text-teal-500' },
        { title: 'Manage Keynotes', desc: 'Speakers & Schedule', icon: 'mic_external_on', path: '/keynote-manager', color: 'text-orange-500' },
        { title: 'Event Feedback', desc: 'User Reviews', icon: 'reviews', path: '/feedback-stats', color: 'text-pink-500' },
    ];

    // Direct logout without alert
    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    return (
        <div className="max-w-[480px] mx-auto bg-slate-50 dark:bg-[#0a0a0a] h-screen overflow-hidden flex flex-col relative transition-colors duration-500 font-sans">

            {/* Animated Mesh Gradient Background */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[300px] h-[300px] bg-purple-400/40 dark:bg-purple-600/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-[80px] opacity-70 animate-pulse"></div>
                <div className="absolute top-[20%] -right-[10%] w-[300px] h-[300px] bg-blue-400/40 dark:bg-blue-600/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-[80px] opacity-70"></div>
                <div className="absolute -bottom-[10%] left-[10%] w-[350px] h-[350px] bg-teal-400/30 dark:bg-teal-600/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-[100px] opacity-60"></div>
            </div>

            {/* Transparent Header */}
            <header className="relative z-10 pt-[env(safe-area-inset-top)] pb-2 px-5 mt-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="size-11 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-md flex items-center justify-center p-1 shadow-sm border border-white/50 dark:border-white/10">
                            <img src={upesLogo} alt="UPES" className="w-full h-full object-contain rounded-full" />
                        </div>
                        <div>
                            <h1 className="text-xl font-black tracking-tight text-gray-900 dark:text-white leading-none">
                                IYRC 2026
                            </h1>
                            <span className="text-[11px] font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500 dark:from-purple-400 dark:to-blue-400 uppercase tracking-widest">
                                Super Admin
                            </span>
                        </div>
                    </div>

                    {/* Top Right Action Buttons */}
                    <div className="flex gap-2">
                        <button
                            onClick={toggleTheme}
                            className="size-10 flex items-center justify-center rounded-full bg-white/50 dark:bg-black/50 backdrop-blur-md border border-white/40 dark:border-white/10 text-gray-700 dark:text-gray-300 shadow-sm active:scale-90 transition-all hover:bg-white/80 dark:hover:bg-white/10"
                            title="Toggle Theme"
                        >
                            <span className="material-symbols-outlined text-[20px]">
                                {theme === 'light' ? 'dark_mode' : 'light_mode'}
                            </span>
                        </button>

                        <button
                            onClick={handleLogout}
                            className="size-10 flex items-center justify-center rounded-full bg-white/50 dark:bg-black/50 backdrop-blur-md border border-white/40 dark:border-white/10 text-gray-700 dark:text-gray-300 shadow-sm active:scale-90 transition-all hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10 dark:hover:text-red-400 dark:border-red-500/10"
                            title="Logout"
                        >
                            <span className="material-symbols-outlined text-[20px]">
                                logout
                            </span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="relative z-10 flex-1 px-5 pt-4 pb-8 overflow-y-auto flex flex-col gap-6 custom-scrollbar">

                {/* Massive Hero Action - QR Scanner */}
                <button
                    onClick={() => navigate('/scan-menu')}
                    className="w-full relative group overflow-hidden rounded-[32px] p-8 text-left transition-all duration-300 active:scale-[0.98] shadow-2xl shadow-purple-500/20 dark:shadow-purple-900/40 bg-white/60 dark:bg-black/40 backdrop-blur-2xl border border-white/60 dark:border-white/10"
                >
                    {/* Inner glowing effect for the card */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 dark:from-purple-500/20 dark:to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative z-10 flex flex-col items-center justify-center gap-4 py-4">
                        <div className="relative">
                            {/* Scanning line animation effect mockup */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/50 to-transparent h-1 w-full top-1/2 blur-[2px]"></div>
                            <span className="material-symbols-outlined text-[80px] text-gray-800 dark:text-white font-light drop-shadow-md">
                                qr_code_scanner
                            </span>
                        </div>
                        <div className="text-center mt-2">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Launch Scanner</h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mt-1">Verify visitor IDs at the gate</p>
                        </div>
                    </div>
                </button>

                {/* Management Section - Sleek Frosted List */}
                <div className="flex flex-col gap-2 mt-2">
                    <h3 className="text-[12px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest pl-2 mb-1">
                        Management Hub
                    </h3>

                    <div className="bg-white/50 dark:bg-black/30 backdrop-blur-xl border border-white/50 dark:border-white/5 rounded-[24px] overflow-hidden shadow-sm">
                        {adminActions.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => navigate(item.path)}
                                className={`w-full flex items-center justify-between p-4 active:bg-black/5 dark:active:bg-white/5 transition-colors hover:bg-white/40 dark:hover:bg-white/5 ${index !== adminActions.length - 1 ? 'border-b border-gray-200/50 dark:border-gray-800/50' : ''
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-full bg-white/80 dark:bg-white/10 flex items-center justify-center shadow-sm border border-white/50 dark:border-white/5`}>
                                        <span className={`material-symbols-outlined text-[20px] ${item.color}`}>{item.icon}</span>
                                    </div>
                                    <div className="text-left">
                                        <h2 className="text-[15px] font-semibold text-gray-800 dark:text-gray-100 leading-tight">
                                            {item.title}
                                        </h2>
                                        <p className="text-[12px] font-medium text-gray-500 dark:text-gray-400 mt-0.5">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                                <span className="material-symbols-outlined text-[18px] text-gray-400 dark:text-gray-600">
                                    chevron_right
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                <AboutFooter />
            </main>
        </div>
    );
};

export default AdminDashboard;