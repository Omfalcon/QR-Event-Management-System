import React, { useState } from 'react';

const AboutFooter = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Clickable 'About' Link at the bottom of the page */}
            <div className="relative z-10 pt-1 pb-6 flex justify-center opacity-70">
                <button
                    onClick={() => setIsOpen(true)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full hover:bg-gray-200/50 dark:hover:bg-white/5 transition-colors text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 group"
                >
                    <span className="material-symbols-outlined text-[16px] group-hover:scale-110 transition-transform">info</span>
                    <span className="text-[11px] font-bold uppercase tracking-widest">About</span>
                </button>
            </div>

            {/* The Glassmorphism Popup Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-5 bg-black/40 backdrop-blur-md animate-fade-in">
                    <div className="bg-white/95 dark:bg-[#121212]/95 backdrop-blur-3xl border border-white/50 dark:border-white/10 rounded-[32px] w-full max-w-[340px] p-7 shadow-2xl animate-scale-up relative overflow-hidden">

                        {/* Background glow effects */}
                        <div className="absolute -top-10 -left-10 w-32 h-32 bg-indigo-500/20 rounded-full blur-[40px] pointer-events-none"></div>
                        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-[40px] pointer-events-none"></div>

                        {/* Close Button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 size-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-white/5 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors border border-transparent dark:border-white/5"
                            aria-label="Close"
                        >
                            <span className="material-symbols-outlined text-[18px]">close</span>
                        </button>

                        {/* Heading - omshubhiX */}
                        <div className="text-center mb-6 mt-2 relative z-10">
                            <h2 className="text-[32px] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 drop-shadow-sm leading-none">
                                OmShubhX
                            </h2>
                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.3em] mt-2">Project Credits</p>
                        </div>

                        {/* Detail Cards */}
                        <div className="space-y-3 relative z-10">

                            {/* Developer Section */}
                            <div className="bg-white/60 dark:bg-white/5 p-4 rounded-[20px] border border-gray-200/50 dark:border-white/5 shadow-sm">
                                <p className="text-[10px] font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-wider mb-0.5">Developed By</p>
                                <div className="flex items-center justify-between">
                                    <h3 className="text-[17px] font-black text-gray-900 dark:text-white leading-tight">Om Agarwal</h3>
                                    <div className="flex gap-1.5">
                                        <a href="#" className="size-8 rounded-full bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 hover:scale-105 transition-transform" aria-label="LinkedIn">
                                            <span className="material-symbols-outlined text-[16px]">link</span>
                                        </a>
                                        <a href="#" className="size-8 rounded-full bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 hover:scale-105 transition-transform" aria-label="Email">
                                            <span className="material-symbols-outlined text-[16px]">alternate_email</span>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Guide Section */}
                            <div className="bg-white/60 dark:bg-white/5 p-4 rounded-[20px] border border-gray-200/50 dark:border-white/5 shadow-sm">
                                <p className="text-[10px] font-bold text-purple-500 dark:text-purple-400 uppercase tracking-wider mb-0.5">Guided By</p>
                                <div className="flex items-center justify-between">
                                    <h3 className="text-[17px] font-black text-gray-900 dark:text-white leading-tight">Dr. Shubhi Sharma</h3>
                                    <div className="flex gap-1.5">
                                        <a href="#" className="size-8 rounded-full bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400 hover:scale-105 transition-transform" aria-label="LinkedIn">
                                            <span className="material-symbols-outlined text-[16px]">link</span>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Powered By Section */}
                            <div className="pt-3 pb-1 text-center">
                                <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1.5">Supported By</p>
                                <h4 className="text-[15px] font-black text-gray-800 dark:text-gray-200 tracking-tight flex items-center justify-center gap-2">
                                    UPES <span className="w-1 h-1 bg-gray-400 rounded-full"></span> R&D
                                </h4>
                            </div>
                        </div>

                        {/* Copyright Footer */}
                        <div className="mt-5 pt-4 border-t border-gray-200 dark:border-gray-800 text-center relative z-10">
                            <p className="text-[10px] font-medium text-gray-400">
                                &copy; {new Date().getFullYear()} IYRC <span className="mx-1">•</span> All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AboutFooter;