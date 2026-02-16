import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Schedule() {
    const navigate = useNavigate();
    const [activeDay, setActiveDay] = useState(1);

    const getHeaderDate = () => {
        switch (activeDay) {
            case 1: return "Day 1: Thursday, 26th Feb 2026";
            case 2: return "Day 2: Friday, 27th Feb 2026";
            case 3: return "Day 3: Saturday, 28th Feb 2026";
            default: return "Day 1: Thursday, 26th Feb 2026";
        }
    };

    const getHeaderShortDate = () => {
        switch (activeDay) {
            case 1: return "Feb 26, 2026";
            case 2: return "Feb 27, 2026";
            case 3: return "Feb 28, 2026";
            default: return "Feb 26, 2026";
        }
    };

    return (
        <div className="flex flex-col h-full bg-white dark:bg-background-dark">
            <div className="sticky top-0 z-30 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
                <div className="flex items-center p-4 pb-2">
                    <div className="flex w-10 shrink-0 items-center justify-start">
                        <button className="flex cursor-pointer items-center justify-center rounded-full h-10 w-10 -ml-2 bg-transparent text-[#111418] dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors active:scale-90" onClick={() => navigate(-1)}>
                            <span className="material-symbols-outlined">chevron_left</span>
                        </button>
                    </div>
                    <div className="flex-1 text-center">
                        <h2 className="text-[#111418] dark:text-white text-lg font-bold leading-tight tracking-tight">Program Schedule</h2>
                        <p className="text-[#617289] dark:text-gray-400 text-[10px] font-medium uppercase tracking-wider">{getHeaderDate()}</p>
                    </div>
                    <div className="flex w-10 shrink-0 items-center justify-end">
                        <button className="flex cursor-pointer items-center justify-center rounded-full h-10 w-10 -mr-2 bg-transparent text-[#111418] dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                            <span className="material-symbols-outlined">search</span>
                        </button>
                    </div>
                </div>
                <div className="px-4">
                    <div className="flex border-b border-gray-100 dark:border-gray-800 gap-6">
                        <button className={`flex flex-col items-center justify-center border-b-[3px] pb-3 pt-4 transition-colors ${activeDay === 1 ? 'border-primary text-primary' : 'border-transparent text-[#617289] dark:text-gray-400 hover:text-primary'}`} onClick={() => setActiveDay(1)}>
                            <p className="text-sm font-bold leading-normal tracking-wide uppercase">Day 1</p>
                        </button>
                        <button className={`flex flex-col items-center justify-center border-b-[3px] pb-3 pt-4 transition-colors ${activeDay === 2 ? 'border-primary text-primary' : 'border-transparent text-[#617289] dark:text-gray-400 hover:text-primary'}`} onClick={() => setActiveDay(2)}>
                            <p className="text-sm font-bold leading-normal tracking-wide uppercase">Day 2</p>
                        </button>
                        <button className={`flex flex-col items-center justify-center border-b-[3px] pb-3 pt-4 transition-colors ${activeDay === 3 ? 'border-primary text-primary' : 'border-transparent text-[#617289] dark:text-gray-400 hover:text-primary'}`} onClick={() => setActiveDay(3)}>
                            <p className="text-sm font-bold leading-normal tracking-wide uppercase">Day 3</p>
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col flex-1 pb-32 overflow-y-auto">
                <div className="p-4">
                    <div className="flex items-stretch justify-between gap-4 p-4 rounded-xl bg-primary/5 dark:bg-primary/10 border border-primary/20">
                        <div className="flex flex-[2_2_0px] flex-col gap-3">
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                    </span>
                                    <p className="text-primary text-[10px] font-bold tracking-widest uppercase">Happening Now</p>
                                </div>
                                <p className="text-[#111418] dark:text-white text-lg font-bold leading-tight">Registration Open</p>
                                <p className="text-[#617289] dark:text-gray-400 text-sm font-medium">Until 10:00 AM • MAC</p>
                            </div>
                            <button className="flex items-center justify-center rounded-lg h-9 px-4 bg-primary text-white gap-2 text-sm font-semibold w-fit shadow-sm active:scale-95 transition-all">
                                <span className="material-symbols-outlined text-[18px]">location_on</span>
                                <span className="truncate">Navigate</span>
                            </button>
                        </div>
                        <div className="w-32 bg-center bg-no-repeat aspect-square bg-cover rounded-lg flex-shrink-0" style={{ backgroundImage: "url('https://upeswebsitecdn-prod-hphqfhc0b8h2ffhf.a02.azurefd.net/drupal-data/2023-11/MAC.jpg')" }}></div>
                    </div>
                </div>

                <div className="flex items-center justify-between px-4 pb-2 pt-2">
                    <h3 className="text-[#111418] dark:text-white text-lg font-bold leading-tight tracking-tight">Timeline</h3>
                    <span className="text-primary text-xs font-semibold">{getHeaderShortDate()}</span>
                </div>

                {/* DAY 1 CONTENT */}
                {activeDay === 1 && (
                    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-2 duration-300">
                        {/* 09:00 AM */}
                        <div className="grid grid-cols-[64px_1fr] px-4 overflow-hidden">
                            <div className="flex flex-col items-center">
                                <div className="py-3 text-right pr-3">
                                    <p className="text-xs font-bold text-gray-800 dark:text-gray-200">09:00</p>
                                    <p className="text-[10px] text-gray-400 font-medium uppercase">AM</p>
                                </div>
                                <div className="flex flex-col items-center gap-1 h-full">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary shrink-0">
                                        <span className="material-symbols-outlined text-sm">how_to_reg</span>
                                    </div>
                                    <div className="w-[2px] bg-gray-200 dark:bg-gray-800 h-full"></div>
                                </div>
                            </div>
                            <div className="flex flex-col py-3 pb-8 pl-2">
                                <p className="text-[#111418] dark:text-white text-base font-semibold">Registration & Information Desk</p>
                                <p className="text-[#617289] dark:text-gray-400 text-sm mt-0.5">MAC</p>
                            </div>
                        </div>

                        {/* 10:00 AM */}
                        <div className="grid grid-cols-[64px_1fr] px-4 overflow-hidden">
                            <div className="flex flex-col items-center">
                                <div className="py-3 text-right pr-3">
                                    <p className="text-xs font-bold text-gray-800 dark:text-gray-200">10:00</p>
                                    <p className="text-[10px] text-gray-400 font-medium uppercase">AM</p>
                                </div>
                                <div className="flex flex-col items-center gap-1 h-full">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-primary bg-white dark:bg-background-dark shrink-0">
                                        <span className="material-symbols-outlined text-sm text-primary">celebration</span>
                                    </div>
                                    <div className="w-[2px] bg-gray-200 dark:bg-gray-800 h-full"></div>
                                </div>
                            </div>
                            <div className="flex flex-col py-3 pb-8 pl-2">
                                <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-3 rounded-lg shadow-sm">
                                    <p className="text-[#111418] dark:text-white text-base font-semibold">Opening Ceremony & Welcome Speech</p>
                                    <p className="text-[#617289] dark:text-gray-400 text-sm mt-0.5">MAC</p>
                                </div>
                            </div>
                        </div>

                        {/* 10:45 AM */}
                        <div className="grid grid-cols-[64px_1fr] px-4 overflow-hidden">
                            <div className="flex flex-col items-center">
                                <div className="py-3 text-right pr-3">
                                    <p className="text-xs font-bold text-gray-800 dark:text-gray-200">10:45</p>
                                    <p className="text-[10px] text-gray-400 font-medium uppercase">AM</p>
                                </div>
                                <div className="flex flex-col items-center gap-1 h-full">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 shrink-0">
                                        <span className="material-symbols-outlined text-sm">mic</span>
                                    </div>
                                    <div className="w-[2px] bg-gray-200 dark:bg-gray-800 h-full"></div>
                                </div>
                            </div>
                            <div className="flex flex-col py-3 pb-8 pl-2">
                                <span className="inline-block w-fit bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider mb-2">Plenary Lecture</span>
                                <p className="text-[#111418] dark:text-white text-base font-semibold">Dr. L.S. Shashidhara</p>
                                <p className="text-[#617289] dark:text-gray-400 text-xs mt-1 italic">Session Chair: ________________</p>
                            </div>
                        </div>

                        {/* 11:45 AM */}
                        <div className="grid grid-cols-[64px_1fr] px-4 overflow-hidden">
                            <div className="flex flex-col items-center">
                                <div className="py-3 text-right pr-3">
                                    <p className="text-xs font-bold text-gray-800 dark:text-gray-200">11:45</p>
                                    <p className="text-[10px] text-gray-400 font-medium uppercase">AM</p>
                                </div>
                                <div className="flex flex-col items-center gap-1 h-full">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-50 dark:bg-orange-900/30 text-orange-600 shrink-0">
                                        <span className="material-symbols-outlined text-sm">coffee</span>
                                    </div>
                                    <div className="w-[2px] bg-gray-200 dark:bg-gray-800 h-full"></div>
                                </div>
                            </div>
                            <div className="flex flex-col py-3 pb-8 pl-2">
                                <div className="bg-orange-50/50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/20 p-4 rounded-lg">
                                    <p className="text-orange-800 dark:text-orange-400 text-base font-bold">Tea Break</p>
                                    <p className="text-orange-700/70 dark:text-orange-500/70 text-sm">AB 1 Quadrangle</p>
                                </div>
                            </div>
                        </div>

                        {/* 12:15 PM */}
                        <div className="grid grid-cols-[64px_1fr] px-4 overflow-hidden">
                            <div className="flex flex-col items-center">
                                <div className="py-3 text-right pr-3">
                                    <p className="text-xs font-bold text-gray-800 dark:text-gray-200">12:15</p>
                                    <p className="text-[10px] text-gray-400 font-medium uppercase">PM</p>
                                </div>
                                <div className="flex flex-col items-center gap-1 h-full">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-50 dark:bg-purple-900/30 text-purple-600 shrink-0">
                                        <span className="material-symbols-outlined text-sm">psychology</span>
                                    </div>
                                    <div className="w-[2px] bg-gray-200 dark:bg-gray-800 h-full"></div>
                                </div>
                            </div>
                            <div className="flex flex-col py-3 pb-8 pl-2">
                                <span className="inline-block w-fit bg-purple-100 text-purple-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider mb-2">Invited Talk</span>
                                <p className="text-[#111418] dark:text-white text-base font-semibold">Dr. Vivek Polshettiver</p>
                                <p className="text-[#617289] dark:text-gray-400 text-xs mt-1 italic">Session Chair: Dr. ________________</p>
                            </div>
                        </div>

                        {/* 01:00 PM */}
                        <div className="grid grid-cols-[64px_1fr] px-4 overflow-hidden">
                            <div className="flex flex-col items-center">
                                <div className="py-3 text-right pr-3">
                                    <p className="text-xs font-bold text-gray-800 dark:text-gray-200">01:00</p>
                                    <p className="text-[10px] text-gray-400 font-medium uppercase">PM</p>
                                </div>
                                <div className="flex flex-col items-center gap-1 h-full">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-50 dark:bg-amber-900/30 text-amber-600 shrink-0">
                                        <span className="material-symbols-outlined text-sm">restaurant</span>
                                    </div>
                                    <div className="w-[2px] bg-gray-200 dark:bg-gray-800 h-full"></div>
                                </div>
                            </div>
                            <div className="flex flex-col py-3 pb-8 pl-2">
                                <div className="bg-amber-50/50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20 p-4 rounded-lg">
                                    <p className="text-amber-800 dark:text-amber-400 text-base font-bold">Lunch Break</p>
                                    <p className="text-amber-700/70 dark:text-amber-500/70 text-sm">AB 1 Quadrangle</p>
                                </div>
                            </div>
                        </div>

                        {/* 02:00 PM - CONCURRENT SESSIONS */}
                        <div className="grid grid-cols-[64px_1fr] px-4 overflow-hidden">
                            <div className="flex flex-col items-center">
                                <div className="py-3 text-right pr-3">
                                    <p className="text-xs font-bold text-gray-800 dark:text-gray-200">02:00</p>
                                    <p className="text-[10px] text-gray-400 font-medium uppercase">PM</p>
                                </div>
                                <div className="flex flex-col items-center gap-1 h-full">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white shrink-0">
                                        <span className="material-symbols-outlined text-sm">layers</span>
                                    </div>
                                    <div className="w-[2px] bg-gray-200 dark:bg-gray-800 h-full"></div>
                                </div>
                            </div>
                            <div className="flex flex-col py-3 pb-8">
                                <div className="flex items-center justify-between pl-2 pr-4 mb-2">
                                    <p className="text-xs font-bold text-primary uppercase tracking-tight">Concurrent Sessions</p>
                                    <div className="flex gap-1 items-center">
                                        <span className="text-[10px] text-gray-400">Scroll</span>
                                        <span className="material-symbols-outlined text-[12px] text-gray-400">arrow_forward</span>
                                    </div>
                                </div>

                                <div className="flex overflow-x-auto gap-3 pb-4 pl-2 hide-scrollbar snap-x snap-mandatory pr-4">

                                    {/* Session 1 */}
                                    <div className="min-w-[85%] shrink-0 snap-start bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 p-4 rounded-xl shadow-sm">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Session 1</span>
                                            <span className="text-[10px] text-gray-400 font-medium flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[12px]">meeting_room</span> Room 1005
                                            </span>
                                        </div>
                                        <p className="text-[#111418] dark:text-white text-base font-semibold leading-tight mb-2">Energy & Environment</p>
                                        <p className="text-[10px] text-[#617289] dark:text-gray-400 italic">Chair: Dr. Nilanjana Banerjee, Dr. Bikarama Prasad Yadav</p>
                                    </div>

                                    {/* Session 2 */}
                                    <div className="min-w-[85%] shrink-0 snap-start bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30 p-4 rounded-xl shadow-sm">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Session 2</span>
                                            <span className="text-[10px] text-gray-400 font-medium flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[12px]">meeting_room</span> Room 1006
                                            </span>
                                        </div>
                                        <p className="text-[#111418] dark:text-white text-base font-semibold leading-tight mb-2">Advanced Materials</p>
                                        <p className="text-[10px] text-[#617289] dark:text-gray-400 italic">Chair: Dr. Piyush Kuchhal & Dr. Ranjeet Brijpuriya</p>
                                    </div>

                                    {/* Session 3 */}
                                    <div className="min-w-[85%] shrink-0 snap-start bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-4 rounded-xl shadow-sm">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Session 3</span>
                                            <span className="text-[10px] text-gray-400 font-medium flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[12px]">meeting_room</span> AB1 Board Room
                                            </span>
                                        </div>
                                        <p className="text-[#111418] dark:text-white text-base font-semibold leading-tight mb-2">SEED</p>
                                        <p className="text-[10px] text-[#617289] dark:text-gray-400 italic">Chair: Dr. Vikas Saxena, Dr. Mukesh Kumar & Dr. Vikram Kumar</p>
                                    </div>

                                    {/* Session 4 */}
                                    <div className="min-w-[85%] shrink-0 snap-start bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-4 rounded-xl shadow-sm">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Session 4</span>
                                            <span className="text-[10px] text-gray-400 font-medium flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[12px]">meeting_room</span> Europe, MDC
                                            </span>
                                        </div>
                                        <p className="text-[#111418] dark:text-white text-base font-semibold leading-tight mb-2">PhD Flash Talks - BUZZ</p>
                                        <p className="text-[10px] text-[#617289] dark:text-gray-400 italic">Chair: Dr. Meenakshi Munshi, Dr. Kanchan Bahukhandi, Dr. Siddharth Jain, Dr. K. Asokan</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 04:00 PM */}
                        <div className="grid grid-cols-[64px_1fr] px-4 overflow-hidden">
                            <div className="flex flex-col items-center">
                                <div className="py-3 text-right pr-3">
                                    <p className="text-xs font-bold text-gray-800 dark:text-gray-200">04:00</p>
                                    <p className="text-[10px] text-gray-400 font-medium uppercase">PM</p>
                                </div>
                                <div className="flex flex-col items-center gap-1 h-full">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-50 dark:bg-amber-900/30 text-amber-600 shrink-0">
                                        <span className="material-symbols-outlined text-sm">coffee</span>
                                    </div>
                                    <div className="w-[2px] bg-gray-200 dark:bg-gray-800 h-full"></div>
                                </div>
                            </div>
                            <div className="flex flex-col py-3 pb-8 pl-2">
                                <div className="bg-amber-50/50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20 p-4 rounded-lg">
                                    <p className="text-amber-800 dark:text-amber-400 text-base font-bold">Tea Break & Poster Session</p>
                                    <p className="text-amber-700/70 dark:text-amber-500/70 text-sm">Outside MAC</p>
                                </div>
                            </div>
                        </div>

                        {/* 04:15 PM */}
                        <div className="grid grid-cols-[64px_1fr] px-4 overflow-hidden">
                            <div className="flex flex-col items-center">
                                <div className="py-3 text-right pr-3">
                                    <p className="text-xs font-bold text-gray-800 dark:text-gray-200">04:15</p>
                                    <p className="text-[10px] text-gray-400 font-medium uppercase">PM</p>
                                </div>
                                <div className="flex flex-col items-center gap-1 h-full pb-3">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-600 shrink-0">
                                        <span className="material-symbols-outlined text-sm">bar_chart</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col py-3 pb-24 pl-2">
                                <p className="text-[#111418] dark:text-white text-base font-semibold">Poster Session</p>
                                <p className="text-[#617289] dark:text-gray-400 text-sm mt-0.5">MAC</p>
                                <p className="text-xs text-gray-400 mt-2 italic">Judges: All Cluster Heads, Research Coordinators & Nominated Members</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* DAY 2 CONTENT */}
                {activeDay === 2 && (
                    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-2 duration-300">
                        {/* 09:00 AM */}
                        <div className="grid grid-cols-[64px_1fr] px-4 overflow-hidden">
                            <div className="flex flex-col items-center">
                                <div className="py-3 text-right pr-3">
                                    <p className="text-xs font-bold text-gray-800 dark:text-gray-200">09:00</p>
                                    <p className="text-[10px] text-gray-400 font-medium uppercase">AM</p>
                                </div>
                                <div className="flex flex-col items-center gap-1 h-full">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary shrink-0">
                                        <span className="material-symbols-outlined text-sm">how_to_reg</span>
                                    </div>
                                    <div className="w-[2px] bg-gray-200 dark:bg-gray-800 h-full"></div>
                                </div>
                            </div>
                            <div className="flex flex-col py-3 pb-8 pl-2">
                                <p className="text-[#111418] dark:text-white text-base font-semibold">Registration & Information Desk</p>
                                <p className="text-[#617289] dark:text-gray-400 text-sm mt-0.5">MAC</p>
                            </div>
                        </div>

                        {/* 09:30 AM */}
                        <div className="grid grid-cols-[64px_1fr] px-4 overflow-hidden">
                            <div className="flex flex-col items-center">
                                <div className="py-3 text-right pr-3">
                                    <p className="text-xs font-bold text-gray-800 dark:text-gray-200">09:30</p>
                                    <p className="text-[10px] text-gray-400 font-medium uppercase">AM</p>
                                </div>
                                <div className="flex flex-col items-center gap-1 h-full">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-primary bg-white dark:bg-background-dark shrink-0">
                                        <span className="material-symbols-outlined text-sm text-primary">person</span>
                                    </div>
                                    <div className="w-[2px] bg-gray-200 dark:bg-gray-800 h-full"></div>
                                </div>
                            </div>
                            <div className="flex flex-col py-3 pb-8 pl-2">
                                <p className="text-[#111418] dark:text-white text-base font-semibold">Dr. S.K. Sopory</p>
                                <p className="text-[#617289] dark:text-gray-400 text-sm mt-0.5">Session Chair: Trust Hubble</p>
                            </div>
                        </div>

                        {/* 10:30 AM - CONCURRENT SESSIONS */}
                        <div className="grid grid-cols-[64px_1fr] px-4 overflow-hidden">
                            <div className="flex flex-col items-center">
                                <div className="py-3 text-right pr-3">
                                    <p className="text-xs font-bold text-gray-800 dark:text-gray-200">10:30</p>
                                    <p className="text-[10px] text-gray-400 font-medium uppercase">AM</p>
                                </div>
                                <div className="flex flex-col items-center gap-1 h-full">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white shrink-0">
                                        <span className="material-symbols-outlined text-sm">layers</span>
                                    </div>
                                    <div className="w-[2px] bg-gray-200 dark:bg-gray-800 h-full"></div>
                                </div>
                            </div>
                            <div className="flex flex-col py-3 pb-8">
                                <div className="flex items-center justify-between pl-2 pr-4 mb-2">
                                    <p className="text-xs font-bold text-primary uppercase tracking-tight">Concurrent Sessions</p>
                                    <div className="flex gap-1 items-center">
                                        <span className="text-[10px] text-gray-400">Scroll</span>
                                        <span className="material-symbols-outlined text-[12px] text-gray-400">arrow_forward</span>
                                    </div>
                                </div>

                                <div className="flex overflow-x-auto gap-3 pb-4 pl-2 hide-scrollbar snap-x snap-mandatory pr-4">
                                    {/* Session 1 */}
                                    <div className="min-w-[85%] shrink-0 snap-start bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 p-4 rounded-xl shadow-sm">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Session 1</span>
                                            <span className="text-[10px] text-blue-600/70 font-medium flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[12px]">meeting_room</span> Room 1005
                                            </span>
                                        </div>
                                        <p className="text-[#111418] dark:text-white text-base font-semibold leading-tight mb-2">Healthcare & AI</p>
                                        <p className="text-[10px] text-[#617289] dark:text-gray-400 italic">Chair: Dr. Kuldeep Kumar Roy & Dr. Tanupriya Chaudhary</p>
                                    </div>

                                    {/* Session 2 */}
                                    <div className="min-w-[85%] shrink-0 snap-start bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30 p-4 rounded-xl shadow-sm">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Session 2</span>
                                            <span className="text-[10px] text-emerald-600/70 font-medium flex items-center gap-1">
                                                Trust Hubble
                                            </span>
                                        </div>
                                        <p className="text-[#111418] dark:text-white text-base font-semibold leading-tight mb-2">Online Sessions</p>
                                        <p className="text-[10px] text-[#617289] dark:text-gray-400 italic">Session Chair: Online</p>
                                    </div>

                                    {/* Session 3 */}
                                    <div className="min-w-[85%] shrink-0 snap-start bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-4 rounded-xl shadow-sm">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Session 3</span>
                                            <span className="text-[10px] text-slate-500 font-medium flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[12px]">meeting_room</span> SEED AB1
                                            </span>
                                        </div>
                                        <p className="text-[#111418] dark:text-white text-base font-semibold leading-tight mb-2">Faculty Session</p>
                                        <p className="text-[10px] text-[#617289] dark:text-gray-400 italic">Chair: Dr. Vikas Saxena, Dr. Mukesh Kumar & Dr. Vikram Kumar</p>
                                    </div>

                                    {/* Session 4 */}
                                    <div className="min-w-[85%] shrink-0 snap-start bg-amber-50/50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 p-4 rounded-xl shadow-sm">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Session 4</span>
                                            <span className="text-[10px] text-amber-600/70 font-medium flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[12px]">meeting_room</span> Europe, MDC
                                            </span>
                                        </div>
                                        <p className="text-[#111418] dark:text-white text-base font-semibold leading-tight mb-2">PhD Scholar Session</p>
                                        <p className="text-[10px] text-[#617289] dark:text-gray-400 italic">Chair: Dr. K Asokan, Dr. Meenakshi Munshi & others</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 11:30 AM */}
                        <div className="grid grid-cols-[64px_1fr] px-4 overflow-hidden">
                            <div className="flex flex-col items-center">
                                <div className="py-3 text-right pr-3">
                                    <p className="text-xs font-bold text-gray-800 dark:text-gray-200">11:30</p>
                                    <p className="text-[10px] text-gray-400 font-medium uppercase">AM</p>
                                </div>
                                <div className="flex flex-col items-center gap-1 h-full">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-50 dark:bg-orange-900/30 text-orange-600 shrink-0">
                                        <span className="material-symbols-outlined text-sm">coffee</span>
                                    </div>
                                    <div className="w-[2px] bg-gray-200 dark:bg-gray-800 h-full"></div>
                                </div>
                            </div>
                            <div className="flex flex-col py-3 pb-8 pl-2">
                                <div className="bg-orange-50/50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/20 p-4 rounded-lg">
                                    <p className="text-orange-800 dark:text-orange-400 text-base font-bold">Tea Break</p>
                                    <p className="text-orange-700/70 dark:text-orange-500/70 text-sm">AB 1 Quadrangle</p>
                                </div>
                            </div>
                        </div>

                        {/* 12:00 PM - CONCURRENT SESSIONS */}
                        <div className="grid grid-cols-[64px_1fr] px-4 overflow-hidden">
                            <div className="flex flex-col items-center">
                                <div className="py-3 text-right pr-3">
                                    <p className="text-xs font-bold text-gray-800 dark:text-gray-200">12:00</p>
                                    <p className="text-[10px] text-gray-400 font-medium uppercase">PM</p>
                                </div>
                                <div className="flex flex-col items-center gap-1 h-full">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white shrink-0">
                                        <span className="material-symbols-outlined text-sm">layers</span>
                                    </div>
                                    <div className="w-[2px] bg-gray-200 dark:bg-gray-800 h-full"></div>
                                </div>
                            </div>
                            <div className="flex flex-col py-3 pb-8">
                                <div className="flex items-center justify-between pl-2 pr-4 mb-2">
                                    <p className="text-xs font-bold text-primary uppercase tracking-tight">Concurrent Sessions</p>
                                    <div className="flex gap-1 items-center">
                                        <span className="text-[10px] text-gray-400">Scroll</span>
                                        <span className="material-symbols-outlined text-[12px] text-gray-400">arrow_forward</span>
                                    </div>
                                </div>

                                <div className="flex overflow-x-auto gap-3 pb-4 pl-2 hide-scrollbar snap-x snap-mandatory pr-4">
                                    {/* Session 1 */}
                                    <div className="min-w-[85%] shrink-0 snap-start bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 p-4 rounded-xl shadow-sm">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Session 1</span>
                                            <span className="text-[10px] text-blue-600/70 font-medium flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[12px]">meeting_room</span> Room 1005
                                            </span>
                                        </div>
                                        <p className="text-[#111418] dark:text-white text-base font-semibold leading-tight mb-2">Healthcare & AI</p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 italic">Chair: Dr. Rajendra Awasthi</p>
                                    </div>

                                    {/* Session 2 */}
                                    <div className="min-w-[85%] shrink-0 snap-start bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30 p-4 rounded-xl shadow-sm">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Session 2</span>
                                            <span className="text-[10px] text-emerald-600/70 font-medium flex items-center gap-1">
                                                Trust Hubble
                                            </span>
                                        </div>
                                        <p className="text-[#111418] dark:text-white text-base font-semibold leading-tight mb-2">Online Sessions</p>
                                        <p className="text-[10px] text-[#617289] dark:text-gray-400 italic">Session Chair: Online</p>
                                    </div>

                                    {/* Session 3 */}
                                    <div className="min-w-[85%] shrink-0 snap-start bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-4 rounded-xl shadow-sm">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Session 3</span>
                                            <span className="text-[10px] text-slate-500 font-medium flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[12px]">meeting_room</span> SEED AB1
                                            </span>
                                        </div>
                                        <p className="text-[#111418] dark:text-white text-base font-semibold leading-tight mb-2">Faculty Session</p>
                                    </div>

                                    {/* Session 4 */}
                                    <div className="min-w-[85%] shrink-0 snap-start bg-amber-50/50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 p-4 rounded-xl shadow-sm">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Session 4</span>
                                            <span className="text-[10px] text-amber-600/70 font-medium flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[12px]">meeting_room</span> Europe, MDC
                                            </span>
                                        </div>
                                        <p className="text-[#111418] dark:text-white text-base font-semibold leading-tight mb-2">PhD Scholar Session</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 01:00 PM */}
                        <div className="grid grid-cols-[64px_1fr] px-4 overflow-hidden">
                            <div className="flex flex-col items-center">
                                <div className="py-3 text-right pr-3">
                                    <p className="text-xs font-bold text-gray-800 dark:text-gray-200">01:00</p>
                                    <p className="text-[10px] text-gray-400 font-medium uppercase">PM</p>
                                </div>
                                <div className="flex flex-col items-center gap-1 h-full">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-50 dark:bg-amber-900/30 text-amber-600 shrink-0">
                                        <span className="material-symbols-outlined text-sm">restaurant</span>
                                    </div>
                                    <div className="w-[2px] bg-gray-200 dark:bg-gray-800 h-full"></div>
                                </div>
                            </div>
                            <div className="flex flex-col py-3 pb-8 pl-2">
                                <div className="bg-amber-50/50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20 p-4 rounded-lg">
                                    <p className="text-amber-800 dark:text-amber-400 text-base font-bold">Lunch Break</p>
                                    <p className="text-amber-700/70 dark:text-amber-500/70 text-sm">AB 1 Quadrangle</p>
                                </div>
                            </div>
                        </div>

                        {/* 02:00 PM - CONCURRENT SESSIONS */}
                        <div className="grid grid-cols-[64px_1fr] px-4 overflow-hidden">
                            <div className="flex flex-col items-center">
                                <div className="py-3 text-right pr-3">
                                    <p className="text-xs font-bold text-gray-800 dark:text-gray-200">02:00</p>
                                    <p className="text-[10px] text-gray-400 font-medium uppercase">PM</p>
                                </div>
                                <div className="flex flex-col items-center gap-1 h-full">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white shrink-0">
                                        <span className="material-symbols-outlined text-sm">layers</span>
                                    </div>
                                    <div className="w-[2px] bg-gray-200 dark:bg-gray-800 h-full"></div>
                                </div>
                            </div>
                            <div className="flex flex-col py-3 pb-8">
                                <div className="flex items-center justify-between pl-2 pr-4 mb-2">
                                    <p className="text-xs font-bold text-primary uppercase tracking-tight">Concurrent Sessions</p>
                                    <div className="flex gap-1 items-center">
                                        <span className="text-[10px] text-gray-400">Scroll</span>
                                        <span className="material-symbols-outlined text-[12px] text-gray-400">arrow_forward</span>
                                    </div>
                                </div>

                                <div className="flex overflow-x-auto gap-3 pb-4 pl-2 hide-scrollbar snap-x snap-mandatory pr-4">
                                    {/* Session 1 */}
                                    <div className="min-w-[85%] shrink-0 snap-start bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 p-4 rounded-xl shadow-sm">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Session 1</span>
                                            <span className="text-[10px] text-blue-600/70 font-medium flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[12px]">meeting_room</span> Room 1005
                                            </span>
                                        </div>
                                        <p className="text-[#111418] dark:text-white text-base font-semibold leading-tight mb-2">Healthcare & AI</p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">Chair: Dr. Rajendra Awasthi</p>
                                    </div>

                                    {/* Session 2 */}
                                    <div className="min-w-[85%] shrink-0 snap-start bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30 p-4 rounded-xl shadow-sm">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Session 2</span>
                                            <span className="text-[10px] text-emerald-600/70 font-medium flex items-center gap-1">
                                                Trust Hubble
                                            </span>
                                        </div>
                                        <p className="text-[#111418] dark:text-white text-base font-semibold leading-tight mb-2">Online Sessions</p>
                                        <p className="text-[10px] text-[#617289] dark:text-gray-400 italic">Session Chair: Online</p>
                                    </div>

                                    {/* Session 3 */}
                                    <div className="min-w-[85%] shrink-0 snap-start bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-4 rounded-xl shadow-sm">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Session 3</span>
                                            <span className="text-[10px] text-slate-500 font-medium flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[12px]">meeting_room</span> SEED AB1
                                            </span>
                                        </div>
                                        <p className="text-[#111418] dark:text-white text-base font-semibold leading-tight mb-2">Faculty Session</p>
                                    </div>

                                    {/* Session 4 */}
                                    <div className="min-w-[85%] shrink-0 snap-start bg-amber-50/50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 p-4 rounded-xl shadow-sm">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Session 4</span>
                                            <span className="text-[10px] text-amber-600/70 font-medium flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[12px]">meeting_room</span> Europe, MDC
                                            </span>
                                        </div>
                                        <p className="text-[#111418] dark:text-white text-base font-semibold leading-tight mb-2">PhD Scholar Session</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 04:00 PM */}
                        <div className="grid grid-cols-[64px_1fr] px-4 overflow-hidden">
                            <div className="flex flex-col items-center">
                                <div className="py-3 text-right pr-3">
                                    <p className="text-xs font-bold text-gray-800 dark:text-gray-200">04:00</p>
                                    <p className="text-[10px] text-gray-400 font-medium uppercase">PM</p>
                                </div>
                                <div className="flex flex-col items-center gap-1 h-full">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-50 dark:bg-amber-900/30 text-amber-600 shrink-0">
                                        <span className="material-symbols-outlined text-sm">coffee</span>
                                    </div>
                                    <div className="w-[2px] bg-gray-200 dark:bg-gray-800 h-full"></div>
                                </div>
                            </div>
                            <div className="flex flex-col py-3 pb-8 pl-2">
                                <div className="bg-amber-50/50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20 p-4 rounded-lg">
                                    <p className="text-amber-800 dark:text-amber-400 text-base font-bold">Tea Break & Poster Session</p>
                                    <p className="text-amber-700/70 dark:text-amber-500/70 text-sm">Outside MAC</p>
                                </div>
                            </div>
                        </div>

                        {/* 04:15 PM */}
                        <div className="grid grid-cols-[64px_1fr] px-4 overflow-hidden">
                            <div className="flex flex-col items-center">
                                <div className="py-3 text-right pr-3">
                                    <p className="text-xs font-bold text-gray-800 dark:text-gray-200">04:15</p>
                                    <p className="text-[10px] text-gray-400 font-medium uppercase">PM</p>
                                </div>
                                <div className="flex flex-col items-center gap-1 h-full pb-3">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-600 shrink-0">
                                        <span className="material-symbols-outlined text-sm">bar_chart</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col py-3 pb-24 pl-2">
                                <p className="text-[#111418] dark:text-white text-base font-semibold">Poster Session</p>
                                <p className="text-[#617289] dark:text-gray-400 text-sm mt-0.5">MAC</p>
                                <p className="text-xs text-gray-400 mt-2 italic">Judges: All Cluster Heads, Research Coordinators & Nominated Members</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* DAY 3 CONTENT */}
                {activeDay === 3 && (
                    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-2 duration-300">
                        {/* 10:00 AM */}
                        <div className="grid grid-cols-[64px_1fr] px-4 overflow-hidden">
                            <div className="flex flex-col items-center">
                                <div className="py-3 text-right pr-3">
                                    <p className="text-xs font-bold text-gray-800 dark:text-gray-200">10:00</p>
                                    <p className="text-[10px] text-gray-400 font-medium uppercase">AM</p>
                                </div>
                                <div className="flex flex-col items-center gap-1 h-full">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 shrink-0">
                                        <span className="material-symbols-outlined text-sm">person</span>
                                    </div>
                                    <div className="w-[2px] bg-gray-200 dark:bg-gray-800 h-full"></div>
                                </div>
                            </div>
                            <div className="flex flex-col py-3 pb-8 pl-2">
                                <p className="text-[#111418] dark:text-white text-base font-semibold">Dr. Gobardhan Das</p>
                                <p className="text-[#617289] dark:text-gray-400 text-sm mt-0.5">Buzz II - 9th block 1st floor</p>
                                <p className="text-xs text-gray-400 mt-1 italic">Session Chair: ________________</p>
                            </div>
                        </div>

                        {/* 11:00 AM */}
                        <div className="grid grid-cols-[64px_1fr] px-4 overflow-hidden">
                            <div className="flex flex-col items-center">
                                <div className="py-3 text-right pr-3">
                                    <p className="text-xs font-bold text-gray-800 dark:text-gray-200">11:00</p>
                                    <p className="text-[10px] text-gray-400 font-medium uppercase">AM</p>
                                </div>
                                <div className="flex flex-col items-center gap-1 h-full">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 shrink-0">
                                        <span className="material-symbols-outlined text-sm">groups</span>
                                    </div>
                                    <div className="w-[2px] bg-gray-200 dark:bg-gray-800 h-full"></div>
                                </div>
                            </div>
                            <div className="flex flex-col py-3 pb-8 pl-2">
                                <p className="text-[#111418] dark:text-white text-base font-semibold">Presentation / Panel Discussion</p>
                                <p className="text-[#617289] dark:text-gray-400 text-sm mt-0.5">TRL Rankings in India</p>
                                <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium mt-1">Discussion Leader: Dr. Mukesh Kumar</p>
                            </div>
                        </div>

                        {/* 11:30 AM */}
                        <div className="grid grid-cols-[64px_1fr] px-4 overflow-hidden">
                            <div className="flex flex-col items-center">
                                <div className="py-3 text-right pr-3">
                                    <p className="text-xs font-bold text-gray-800 dark:text-gray-200">11:30</p>
                                    <p className="text-[10px] text-gray-400 font-medium uppercase">AM</p>
                                </div>
                                <div className="flex flex-col items-center gap-1 h-full">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-50 dark:bg-orange-900/30 text-orange-600 shrink-0">
                                        <span className="material-symbols-outlined text-sm">coffee</span>
                                    </div>
                                    <div className="w-[2px] bg-gray-200 dark:bg-gray-800 h-full"></div>
                                </div>
                            </div>
                            <div className="flex flex-col py-3 pb-8 pl-2">
                                <div className="bg-orange-50/50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/20 p-4 rounded-lg">
                                    <p className="text-orange-800 dark:text-orange-400 text-base font-bold">Tea Break</p>
                                    <p className="text-orange-700/70 dark:text-orange-500/70 text-sm">AB 1 Quadrangle</p>
                                </div>
                            </div>
                        </div>

                        {/* 12:00 PM */}
                        <div className="grid grid-cols-[64px_1fr] px-4 overflow-hidden">
                            <div className="flex flex-col items-center">
                                <div className="py-3 text-right pr-3">
                                    <p className="text-xs font-bold text-gray-800 dark:text-gray-200">12:00</p>
                                    <p className="text-[10px] text-gray-400 font-medium uppercase">PM</p>
                                </div>
                                <div className="flex flex-col items-center gap-1 h-full pb-3">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white shrink-0">
                                        <span className="material-symbols-outlined text-sm">workspace_premium</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col py-3 pb-24 pl-2">
                                <div className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 border border-primary/20 p-4 rounded-xl">
                                    <p className="text-[#111418] dark:text-white text-lg font-bold">Valedictory Session</p>
                                    <p className="text-[#617289] dark:text-gray-400 text-sm mt-1 mb-2">Prizes and Certificates Distribution</p>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-xs text-gray-600 dark:text-gray-400">Concluding Remarks by Dr. ________________</p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">Vote of Thanks by Dr. ________________</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}