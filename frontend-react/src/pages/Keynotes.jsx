import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';

// --- ROOM MAPPING (Display Fix) ---
const ROOM_NAMES = {
    1: "Room 1005",
    2: "Room 1006",
    3: "AB1",
    4: "BUZZ"
};

export default function Keynotes() {
    const navigate = useNavigate();
    const [activeDay, setActiveDay] = useState(1);

    // Backend uses IDs 1, 2, 3, 4
    const [activeRoom, setActiveRoom] = useState(1);
    const [scheduleData, setScheduleData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/keynotes`);
                if (res.ok) {
                    const data = await res.json();
                    setScheduleData(data);
                }
            } catch (err) {
                console.error("Failed to fetch keynotes", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();

        // Poll for updates every 30 seconds
        const interval = setInterval(fetchData, 30000);
        return () => clearInterval(interval);
    }, []);

    // --- FULL PAGE LOADING STATE ---
    if (loading) {
        return (
            <div className="max-w-[480px] mx-auto min-h-screen bg-slate-50 dark:bg-[#0a0a0a] flex flex-col items-center justify-center gap-3">
                <div className="size-10 border-4 border-indigo-200/50 border-t-indigo-600 rounded-full animate-spin"></div>
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest animate-pulse">Loading Schedule...</p>
            </div>
        );
    }

    // --- COMPLETE FAILURE STATE ---
    if (!scheduleData) {
        return (
            <div className="max-w-[480px] mx-auto min-h-screen bg-slate-50 dark:bg-[#0a0a0a] flex flex-col items-center justify-center p-10 text-center">
                <div className="size-16 bg-white/50 dark:bg-white/5 rounded-full flex items-center justify-center border border-white/50 dark:border-white/10 shadow-sm mb-4">
                    <span className="material-symbols-outlined text-3xl text-gray-400">event_busy</span>
                </div>
                <p className="text-[15px] font-bold text-gray-600 dark:text-gray-300">Unable to load schedule.</p>
                <p className="text-[12px] font-medium text-gray-400 mt-1">Please check your connection.</p>
            </div>
        );
    }

    const currentDay = scheduleData[activeDay] || {};
    const currentRoom = currentDay.rooms?.[activeRoom] || {};

    return (
        <div className="max-w-[480px] mx-auto bg-slate-50 dark:bg-[#0a0a0a] min-h-screen flex flex-col relative transition-colors duration-500 font-sans overflow-x-hidden pb-24">

            {/* Animated Mesh Gradient Background */}
            <div className="fixed inset-0 z-0 pointer-events-none max-w-[480px] mx-auto">
                <div className="absolute -top-[10%] -left-[10%] w-[300px] h-[300px] bg-indigo-400/30 dark:bg-indigo-600/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-[80px] opacity-70 animate-pulse"></div>
                <div className="absolute top-[30%] -right-[10%] w-[250px] h-[250px] bg-blue-400/20 dark:bg-blue-600/10 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-[80px] opacity-60"></div>
            </div>

            {/* --- HEADER --- */}
            <header className="sticky top-0 z-50 bg-white/70 dark:bg-black/50 backdrop-blur-2xl border-b border-white/50 dark:border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.03)] pt-[env(safe-area-inset-top)]">
                <div className="px-5 pt-4 pb-3 flex flex-col gap-4">

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate(-1)}
                            className="size-10 flex items-center justify-center rounded-full bg-white/50 dark:bg-white/10 border border-white/40 dark:border-white/5 text-gray-700 dark:text-gray-300 shadow-sm active:scale-90 transition-all"
                        >
                            <span className="material-symbols-outlined text-[20px]">arrow_back_ios_new</span>
                        </button>
                        <div>
                            <h1 className="text-[20px] font-black tracking-tight text-gray-900 dark:text-white leading-none mb-0.5">
                                Event Schedule
                            </h1>
                            <p className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                                Keynotes & Sessions
                            </p>
                        </div>
                    </div>

                    {/* Day Selector - iOS Pill Style */}
                    <div className="flex p-1 bg-white/40 dark:bg-black/40 border border-white/50 dark:border-white/5 rounded-[16px] shadow-inner">
                        {[1, 2].map(day => (
                            <button
                                key={day}
                                onClick={() => { setActiveDay(day); setActiveRoom(1); }} // Reset room to 1 on day change
                                className={`flex-1 py-2.5 rounded-[12px] text-[13px] font-bold transition-all duration-300 ${activeDay === day
                                    ? "bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 shadow-sm"
                                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                                    }`}
                            >
                                Day {day}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            <main className="relative z-10 flex-1 px-5 pt-4 flex flex-col gap-6">

                {/* Session/Room Selector - Updated with Actual Room Names */}
                <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-1">
                    {[1, 2, 3, 4].map(rId => (
                        <button
                            key={rId}
                            onClick={() => setActiveRoom(rId)}
                            className={`whitespace-nowrap px-5 py-2.5 rounded-xl text-[13px] font-bold border transition-all active:scale-[0.97] flex flex-col items-center justify-center min-w-[100px] ${activeRoom === rId
                                ? "bg-indigo-600 text-white border-transparent shadow-md shadow-indigo-500/20"
                                : "bg-white/60 dark:bg-white/5 text-gray-600 dark:text-gray-400 border-white/50 dark:border-white/10 hover:bg-white/80 dark:hover:bg-white/10"
                                }`}
                        >
                            <span className="text-[10px] uppercase tracking-wider opacity-70 mb-0.5">Location</span>
                            <span>{ROOM_NAMES[rId]}</span>
                        </button>
                    ))}
                </div>

                {/* --- GRACEFUL EMPTY STATE IF ROOM DATA IS MISSING --- */}
                {!currentRoom.sessions || currentRoom.sessions.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center pt-20 pb-10 text-center opacity-70">
                        <div className="size-16 bg-white/40 dark:bg-white/5 rounded-full flex items-center justify-center border border-white/50 dark:border-white/10 shadow-sm mb-3">
                            <span className="material-symbols-outlined text-3xl text-gray-400">event_upcoming</span>
                        </div>
                        <p className="text-[14px] font-bold text-gray-600 dark:text-gray-300">No schedule posted yet.</p>
                        <p className="text-[12px] text-gray-500 dark:text-gray-500 mt-1">Check back later for updates in {ROOM_NAMES[activeRoom]}.</p>
                    </div>
                ) : (
                    <>
                        {/* --- LIVE NOW CARD --- */}
                        <section className="bg-indigo-600 dark:bg-indigo-900/40 backdrop-blur-xl p-5 rounded-[24px] shadow-lg shadow-indigo-500/20 border border-indigo-500/30 relative overflow-hidden group">
                            <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-[120px] text-white/10 rotate-12 group-hover:rotate-0 transition-transform duration-700">
                                podium
                            </span>

                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2 bg-white/20 dark:bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                        </span>
                                        <span className="text-[10px] font-black text-white uppercase tracking-widest">Live Now</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-white/80 bg-black/10 px-2 py-1 rounded-lg">
                                        <span className="material-symbols-outlined text-[14px]">location_on</span>
                                        <span className="text-[11px] font-bold">{currentRoom.location || ROOM_NAMES[activeRoom]}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex flex-col">
                                        <h2 className="text-[22px] font-black text-white leading-tight mb-1">
                                            {currentRoom.live?.speaker || 'No Speaker Active'}
                                        </h2>
                                        <p className="text-[13px] font-medium text-indigo-100 dark:text-indigo-200">
                                            {currentRoom.live?.topic || 'Waiting for session to begin...'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* --- CHAIR INFO CARD --- */}
                        <section className="bg-white/60 dark:bg-black/40 backdrop-blur-xl p-4 rounded-[20px] shadow-sm border border-white/60 dark:border-white/10">
                            <h3 className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3 px-1">Room Leadership</h3>
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-3 bg-white/50 dark:bg-white/5 p-3 rounded-[16px] border border-white/50 dark:border-white/5">
                                    <div className="size-10 rounded-full bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                                        <span className="material-symbols-outlined text-[20px]">gavel</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Session Chair</span>
                                        <span className="text-[14px] font-bold text-gray-900 dark:text-white leading-tight">{currentRoom.chair || 'TBA'}</span>
                                    </div>
                                </div>

                                {currentRoom.coChair && (
                                    <div className="flex items-center gap-3 bg-white/50 dark:bg-white/5 p-3 rounded-[16px] border border-white/50 dark:border-white/5">
                                        <div className="size-10 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                                            <span className="material-symbols-outlined text-[20px]">person_check</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Co-Chair</span>
                                            <span className="text-[14px] font-bold text-gray-900 dark:text-white leading-tight">{currentRoom.coChair}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* --- SESSIONS LIST --- */}
                        <section className="flex flex-col gap-3">
                            <h3 className="text-[14px] font-black text-gray-900 dark:text-white tracking-tight px-1 mt-2">
                                {currentRoom.title || `${ROOM_NAMES[activeRoom]} Schedule`}
                            </h3>

                            <div className="flex flex-col gap-3">
                                {currentRoom.sessions.map((session, index) => (
                                    <div
                                        key={index}
                                        className={`flex flex-col gap-3 p-4 rounded-[24px] backdrop-blur-xl transition-all duration-300 ${session.active
                                            ? 'bg-white/90 dark:bg-gray-900/90 border-2 border-indigo-500 shadow-lg shadow-indigo-500/10'
                                            : 'bg-white/60 dark:bg-black/40 border border-white/60 dark:border-white/10 shadow-sm hover:bg-white/80 dark:hover:bg-white/5'
                                            }`}
                                    >
                                        <div className="flex items-start gap-4">
                                            {/* Icon / Time Column */}
                                            <div className="flex flex-col items-center gap-2 shrink-0">
                                                <div className={`size-12 rounded-[16px] flex items-center justify-center border ${session.active
                                                    ? 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/30'
                                                    : 'bg-white/50 dark:bg-white/5 text-gray-500 dark:text-gray-400 border-white/50 dark:border-white/5'
                                                    }`}>
                                                    <span className="material-symbols-outlined">
                                                        {session.topic?.toLowerCase().includes('break') || session.name?.toLowerCase().includes('tea')
                                                            ? 'coffee'
                                                            : 'mic_external_on'}
                                                    </span>
                                                </div>
                                                <span className={`text-[11px] font-black tracking-tight ${session.active ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'}`}>
                                                    {session.time}
                                                </span>
                                            </div>

                                            {/* Details Column */}
                                            <div className="flex flex-col justify-center flex-1 pt-1">
                                                <p className={`text-[15px] leading-tight mb-1 ${session.active ? 'font-black text-gray-900 dark:text-white' : 'font-bold text-gray-800 dark:text-gray-200'}`}>
                                                    {session.name}
                                                </p>
                                                <p className={`text-[13px] font-medium leading-snug line-clamp-2 ${session.active ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'}`}>
                                                    {session.topic}
                                                </p>

                                                <div className="flex items-center gap-2 mt-3">
                                                    {session.id && (
                                                        <span className="px-2 py-1 bg-gray-100 dark:bg-black/50 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-800 rounded-md text-[10px] font-bold font-mono tracking-wider">
                                                            ID: {session.id}
                                                        </span>
                                                    )}
                                                    {session.status && (
                                                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase border ${
                                                            session.status === 'Done' ? 'bg-green-50 text-green-600 border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20' :
                                                            session.status === 'Ongoing' || session.active ? 'bg-indigo-50 text-indigo-600 border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/20' :
                                                            'bg-gray-100 text-gray-500 border-gray-200 dark:bg-white/5 dark:text-gray-400 dark:border-white/5'
                                                            }`}>
                                                            {session.active ? 'Live Now' : session.status}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </>
                )}
            </main>
        </div>
    );
}