import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL, getAuthHeaders } from '../config';

// --- ROOM MAPPING ---
const ROOM_NAMES = {
    1: "Room 1005",
    2: "Room 1006",
    3: "AB1",
    4: "BUZZ"
};

// --- CUSTOM STATUS DROPDOWN COMPONENT ---
const CustomStatusDropdown = ({ value, onChange, bgClass }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const options = [
        { label: 'Upcoming', bg: 'bg-blue-400' },
        { label: 'Ongoing', bg: 'bg-amber-500' },
        { label: 'Done', bg: 'bg-emerald-500' },
        { label: 'Cancelled', bg: 'bg-red-500' }
    ];

    const currentOpt = options.find(o => o.label === value);
    const buttonBg = bgClass || "bg-white/60 dark:bg-black/20 border-white/50 dark:border-white/10";

    return (
        <div className="relative w-full" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 border rounded-[12px] text-[12px] font-bold text-gray-700 dark:text-gray-300 shadow-sm active:scale-95 transition-all focus:outline-none focus:ring-1 focus:ring-indigo-500/50 ${buttonBg}`}
            >
                <div className="flex items-center gap-2">
                    <span className={`size-2 rounded-full ${currentOpt ? currentOpt.bg : 'bg-transparent border border-gray-400'}`}></span>
                    <span>{value || 'Status'}</span>
                </div>
                <span className={`material-symbols-outlined text-[16px] opacity-50 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                    expand_more
                </span>
            </button>

            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-full bg-white/95 dark:bg-[#1a1a1a]/95 backdrop-blur-2xl border border-white/50 dark:border-white/10 rounded-[16px] shadow-xl shadow-black/10 z-50 overflow-hidden py-1.5 animate-fade-in origin-top">
                    {options.map((opt) => (
                        <button
                            key={opt.label}
                            onClick={() => {
                                onChange(opt.label);
                                setIsOpen(false);
                            }}
                            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-[12px] font-bold transition-colors ${value === opt.label
                                ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5'
                                }`}
                        >
                            <span className={`size-2 rounded-full ${opt.bg}`}></span>
                            {opt.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};


// --- MAIN KEYNOTE MANAGER COMPONENT ---
export default function KeynoteManager() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [scheduleData, setScheduleData] = useState({});
    const [activeDay, setActiveDay] = useState(1);

    // BACKEND ID = 1 (Data Fix)
    const [activeRoom, setActiveRoom] = useState(1);
    const [saving, setSaving] = useState(false);

    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
    const [sessionToDelete, setSessionToDelete] = useState(null);

    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
    };

    useEffect(() => {
        fetchSchedule();
    }, []);

    const fetchSchedule = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/keynotes`);
            if (res.ok) {
                const data = await res.json();
                setScheduleData(data);
            }
        } catch (err) {
            console.error("Failed to fetch schedule", err);
        } finally {
            setLoading(false);
        }
    };

    const currentDay = scheduleData[activeDay] || {};
    const currentRoom = currentDay.rooms?.[activeRoom] || {};

    const handleUpdate = async () => {
        setSaving(true);
        try {
            const res = await fetch(`${API_BASE_URL}/api/keynotes/${activeDay}/${activeRoom}`, {
                method: 'PUT',
                headers: getAuthHeaders(),
                body: JSON.stringify(currentRoom)
            });

            if (res.ok) {
                showToast("Schedule saved successfully!", "success");
                fetchSchedule();
            } else {
                showToast("Failed to save schedule.", "error");
            }
        } catch (err) {
            console.error(err);
            showToast("Network error saving data.", "error");
        } finally {
            setSaving(false);
        }
    };

    const updateRoomField = (field, value) => {
        const updated = { ...scheduleData };
        if (!updated[activeDay]) updated[activeDay] = { rooms: {} };
        if (!updated[activeDay].rooms[activeRoom]) updated[activeDay].rooms[activeRoom] = { sessions: [], live: {} };
        updated[activeDay].rooms[activeRoom][field] = value;
        setScheduleData(updated);
    };

    const updateSession = (index, field, value) => {
        const updated = { ...scheduleData };
        updated[activeDay].rooms[activeRoom].sessions[index][field] = value;
        setScheduleData(updated);
    };

    const toggleSessionActive = (index) => {
        const updated = { ...scheduleData };
        updated[activeDay].rooms[activeRoom].sessions.forEach(s => s.active = false);
        const selectedSession = updated[activeDay].rooms[activeRoom].sessions[index];
        selectedSession.active = true;

        if (selectedSession.name) {
            if (!updated[activeDay].rooms[activeRoom].live) updated[activeDay].rooms[activeRoom].live = {};
            updated[activeDay].rooms[activeRoom].live.speaker = selectedSession.name;
            updated[activeDay].rooms[activeRoom].live.topic = selectedSession.topic;
        }
        setScheduleData(updated);
    };

    const addSession = () => {
        const updated = { ...scheduleData };
        if (!updated[activeDay]) updated[activeDay] = { rooms: {} };
        if (!updated[activeDay].rooms[activeRoom]) updated[activeDay].rooms[activeRoom] = { sessions: [], live: {} };
        if (!updated[activeDay].rooms[activeRoom].sessions) updated[activeDay].rooms[activeRoom].sessions = [];

        updated[activeDay].rooms[activeRoom].sessions.push({
            name: "",
            topic: "",
            id: "",
            time: "",
            status: "Upcoming",
            active: false
        });
        setScheduleData(updated);
    };

    const initiateRemoveSession = (index) => {
        setSessionToDelete(index);
    };

    // 🔥 FIXED: Removing a session properly resets Live Now if the session was active
    const confirmRemoveSession = () => {
        if (sessionToDelete === null) return;

        const updated = { ...scheduleData };
        const room = updated[activeDay].rooms[activeRoom];
        const session = room.sessions[sessionToDelete];

        // ✅ If deleted session was active → clear live speaker
        if (session?.active) {
            room.live = {};
        }

        room.sessions.splice(sessionToDelete, 1);

        setScheduleData(updated);
        setSessionToDelete(null);
        showToast("Session removed.", "success");
    };

    return (
        <div className="max-w-[480px] mx-auto bg-slate-50 dark:bg-[#0a0a0a] min-h-screen flex flex-col relative transition-colors duration-500 font-sans overflow-x-hidden">

            {toast.show && (
                <div className={`fixed top-[100px] left-1/2 -translate-x-1/2 z-[60] px-5 py-2.5 rounded-full flex items-center gap-2 shadow-xl backdrop-blur-xl animate-fade-in ${toast.type === 'success'
                    ? 'bg-emerald-500/90 text-white shadow-emerald-500/20 border border-emerald-400/50'
                    : 'bg-red-500/90 text-white shadow-red-500/20 border border-red-400/50'
                    }`}>
                    <span className="material-symbols-outlined text-[18px]">
                        {toast.type === 'success' ? 'check_circle' : 'error'}
                    </span>
                    <span className="text-[13px] font-bold tracking-wide">{toast.message}</span>
                </div>
            )}

            <div className="fixed inset-0 z-0 pointer-events-none max-w-[480px] mx-auto">
                <div className="absolute -top-[10%] -left-[10%] w-[300px] h-[300px] bg-indigo-400/30 dark:bg-indigo-600/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-[80px] opacity-70 animate-pulse"></div>
                <div className="absolute top-[30%] -right-[10%] w-[250px] h-[250px] bg-blue-400/20 dark:bg-blue-600/10 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-[80px] opacity-60"></div>
            </div>

            <header className="relative z-10 pt-[env(safe-area-inset-top)] pb-2 px-5 mt-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate(-1)}
                            className="size-10 flex items-center justify-center rounded-full bg-white/50 dark:bg-white/10 border border-white/40 dark:border-white/5 text-gray-700 dark:text-gray-300 shadow-sm active:scale-90 transition-all"
                        >
                            <span className="material-symbols-outlined text-[20px]">arrow_back_ios_new</span>
                        </button>
                        <div>
                            <h1 className="text-[20px] font-black tracking-tight text-gray-900 dark:text-white leading-none mb-0.5">
                                Keynote Manager
                            </h1>
                            <p className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                                Live Schedule Control
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={handleUpdate}
                        disabled={saving || loading}
                        className="size-10 flex items-center justify-center rounded-full bg-indigo-600 text-white shadow-md shadow-indigo-500/30 active:scale-90 transition-all disabled:opacity-60"
                        title="Save Changes"
                    >
                        {saving ? (
                            <span className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        ) : (
                            <span className="material-symbols-outlined text-[20px]">save</span>
                        )}
                    </button>
                </div>
            </header>

            {loading ? (
                <div className="flex-1 flex flex-col items-center justify-center pt-20 opacity-80 gap-3 relative z-10">
                    <div className="size-8 border-4 border-indigo-200/50 border-t-indigo-500 rounded-full animate-spin"></div>
                    <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest animate-pulse">Syncing Schedule...</p>
                </div>
            ) : (
                <main className="relative z-10 flex-1 px-5 pt-4 pb-8 flex flex-col gap-5">

                    <div className="flex flex-col gap-3">
                        <div className="flex p-1 bg-white/40 dark:bg-black/40 border border-white/50 dark:border-white/5 rounded-[16px] shadow-inner">
                            {[1, 2].map(d => (
                                <button
                                    key={d}
                                    onClick={() => { setActiveDay(d); setActiveRoom(1); }} // RESET ROOM TO 1 ON DAY CHANGE
                                    className={`flex-1 py-2.5 rounded-[12px] text-[13px] font-bold transition-all duration-300 ${activeDay === d ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm" : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"}`}
                                >
                                    Day {d}
                                </button>
                            ))}
                        </div>

                        {/* Room Selector mapped perfectly */}
                        <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-1">
                            {[1, 2, 3, 4].map(rId => (
                                <button
                                    key={rId}
                                    onClick={() => setActiveRoom(rId)}
                                    className={`whitespace-nowrap px-4 py-2 rounded-xl text-[13px] font-bold border transition-all active:scale-[0.97] flex-1 text-center ${activeRoom === rId
                                        ? "bg-gray-900 dark:bg-white text-white dark:text-black border-transparent shadow-md"
                                        : "bg-white/60 dark:bg-white/5 text-gray-600 dark:text-gray-400 border-white/50 dark:border-white/10 hover:bg-white/80 dark:hover:bg-white/10"
                                        }`}
                                >
                                    {ROOM_NAMES[rId]}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Room Details Form */}
                    <div className="bg-white/60 dark:bg-black/40 backdrop-blur-xl p-5 rounded-[24px] shadow-sm border border-white/60 dark:border-white/10">
                        <h3 className="text-[12px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3">
                            {ROOM_NAMES[activeRoom]} Leadership
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                                <label className="block text-[11px] font-bold text-gray-400 ml-1">Chair</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2.5 bg-white/50 dark:bg-black/20 border border-white/50 dark:border-white/10 rounded-[12px] text-[13px] font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                                    value={currentRoom.chair || ''}
                                    onChange={(e) => updateRoomField('chair', e.target.value)}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="block text-[11px] font-bold text-gray-400 ml-1">Co-Chair</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2.5 bg-white/50 dark:bg-black/20 border border-white/50 dark:border-white/10 rounded-[12px] text-[13px] font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                                    value={currentRoom.coChair || ''}
                                    onChange={(e) => updateRoomField('coChair', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/60 dark:bg-black/40 backdrop-blur-xl p-5 rounded-[24px] border border-white/60 dark:border-white/10 shadow-sm relative overflow-hidden">
                        <div className="flex items-center gap-2 mb-3 relative z-10">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                            </span>
                            <h3 className="text-[12px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">Live Speaker Feed</h3>
                        </div>

                        <div className="grid grid-cols-1 gap-2.5 relative z-10">
                            <input
                                type="text"
                                className="w-full px-4 py-3 bg-white/50 dark:bg-black/20 border border-white/50 dark:border-white/10 rounded-[16px] text-[14px] font-bold text-gray-800 dark:text-gray-200 cursor-not-allowed"
                                value={currentRoom.live?.speaker || 'No active speaker'}
                                readOnly
                            />
                            <input
                                type="text"
                                className="w-full px-4 py-3 bg-white/50 dark:bg-black/20 border border-white/50 dark:border-white/10 rounded-[16px] text-[13px] font-medium text-gray-600 dark:text-gray-400 cursor-not-allowed"
                                value={currentRoom.live?.topic || 'No active topic'}
                                readOnly
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 pb-10">
                        <div className="flex items-center justify-between px-1">
                            <h3 className="text-[16px] font-black text-gray-900 dark:text-white tracking-tight">Event Schedule</h3>
                            <span className="text-[10px] font-bold bg-white/50 dark:bg-white/10 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-md border border-white/50 dark:border-white/5">
                                {currentRoom.sessions?.length || 0} Sessions
                            </span>
                        </div>

                        {currentRoom.sessions?.map((session, index) => {
                            let cardBg = "bg-blue-50/60 dark:bg-blue-500/5 border-blue-200/50 dark:border-blue-500/10 hover:bg-blue-50/80 dark:hover:bg-blue-500/10";
                            let inputBg = "bg-white/60 dark:bg-black/20 border-blue-100 dark:border-blue-500/20";
                            let textAccent = "text-blue-500 dark:text-blue-400";

                            if (session.active) {
                                cardBg = "bg-indigo-50/90 dark:bg-indigo-900/40 border-2 border-indigo-500 shadow-lg shadow-indigo-500/20";
                                inputBg = "bg-white/80 dark:bg-black/40 border-indigo-200 dark:border-indigo-500/30";
                                textAccent = "text-indigo-600 dark:text-indigo-400";
                            } else if (session.status === 'Done') {
                                cardBg = "bg-emerald-50/80 dark:bg-emerald-500/5 border-emerald-200/50 dark:border-emerald-500/20";
                                inputBg = "bg-white/60 dark:bg-black/30 border-emerald-100 dark:border-emerald-500/20";
                                textAccent = "text-emerald-600 dark:text-emerald-400";
                            } else if (session.status === 'Ongoing') {
                                cardBg = "bg-amber-50/80 dark:bg-amber-500/5 border-amber-200/50 dark:border-amber-500/20";
                                inputBg = "bg-white/60 dark:bg-black/30 border-amber-100 dark:border-amber-500/20";
                                textAccent = "text-amber-600 dark:text-amber-400";
                            } else if (session.status === 'Cancelled') {
                                cardBg = "bg-red-50/80 dark:bg-red-500/5 border-red-200/50 dark:border-red-500/20";
                                inputBg = "bg-white/60 dark:bg-black/30 border-red-100 dark:border-red-500/20";
                                textAccent = "text-red-500 dark:text-red-400";
                            }

                            return (
                                <div
                                    key={index}
                                    style={{ zIndex: 50 - index }}
                                    className={`relative backdrop-blur-xl p-5 rounded-[24px] shadow-sm transition-all duration-300 border ${cardBg}`}
                                >
                                    <div className="flex justify-between items-start gap-3 mb-4">
                                        <div className="flex-1 flex flex-col gap-2.5">
                                            <input
                                                type="text"
                                                className={`w-full px-3.5 py-2.5 border rounded-[12px] text-[14px] font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500/50 transition-colors placeholder-gray-400 ${inputBg}`}
                                                value={session.name}
                                                onChange={(e) => updateSession(index, 'name', e.target.value)}
                                                placeholder="Speaker / Session Name"
                                            />
                                            <input
                                                type="text"
                                                className={`w-full px-3.5 py-2.5 border rounded-[12px] text-[13px] font-medium text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 transition-colors placeholder-gray-400 ${inputBg}`}
                                                value={session.topic}
                                                onChange={(e) => updateSession(index, 'topic', e.target.value)}
                                                placeholder="Session Topic"
                                            />
                                        </div>

                                        <div className="w-[130px] flex flex-col items-end gap-2.5 relative">
                                            <input
                                                type="text"
                                                className={`w-full px-3 py-2.5 text-center border rounded-[12px] text-[13px] font-black text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500/50 transition-colors placeholder-gray-400 ${inputBg}`}
                                                value={session.time}
                                                onChange={(e) => updateSession(index, 'time', e.target.value)}
                                                placeholder="e.g. 10:00 AM"
                                            />

                                            <CustomStatusDropdown
                                                value={session.status}
                                                onChange={(val) => updateSession(index, 'status', val)}
                                                bgClass={inputBg}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center pt-3 border-t border-gray-300/30 dark:border-gray-700/50 mt-1">
                                        <div className="flex items-center gap-2">
                                            <span className={`text-[11px] font-bold ${textAccent}`}>ID:</span>
                                            <input
                                                type="text"
                                                className={`w-16 text-[12px] font-mono font-bold text-center text-gray-700 dark:text-gray-200 border rounded-[8px] py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 transition-colors placeholder-gray-400 ${inputBg}`}
                                                value={session.id || ''}
                                                onChange={(e) => updateSession(index, 'id', e.target.value)}
                                                placeholder="000"
                                            />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => initiateRemoveSession(index)}
                                                className="size-8 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                                                title="Delete Session"
                                            >
                                                <span className="material-symbols-outlined text-[18px]">delete</span>
                                            </button>
                                            <button
                                                onClick={() => toggleSessionActive(index)}
                                                className={`px-4 py-1.5 rounded-full text-[11px] font-bold tracking-wide uppercase transition-all shadow-sm ${session.active
                                                    ? 'bg-indigo-600 text-white shadow-indigo-500/30'
                                                    : `bg-white/80 dark:bg-white/10 ${textAccent} border border-white/50 dark:border-white/5`
                                                    }`}
                                            >
                                                {session.active ? 'Live Now' : 'Set Active'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        <button
                            onClick={addSession}
                            className="w-full mt-2 py-4 rounded-[20px] border-2 border-dashed border-indigo-300/50 dark:border-indigo-700/50 bg-indigo-50/50 dark:bg-indigo-500/5 text-indigo-500 dark:text-indigo-400 font-bold hover:border-indigo-500 hover:bg-indigo-500/10 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                        >
                            <span className="material-symbols-outlined text-[20px]">add_circle</span>
                            <span className="text-[14px]">Add New Session</span>
                        </button>
                    </div>

                </main>
            )}

            {sessionToDelete !== null && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-5 bg-black/40 backdrop-blur-md animate-fade-in">
                    <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-2xl border border-white/50 dark:border-white/10 rounded-[32px] w-full max-w-[360px] p-7 shadow-2xl animate-scale-up text-center">

                        <div className="size-16 bg-red-100 dark:bg-red-500/20 border border-red-200 dark:border-red-500/30 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600 dark:text-red-400 shadow-sm">
                            <span className="material-symbols-outlined text-[32px]">delete_forever</span>
                        </div>

                        <h3 className="text-[20px] font-black text-gray-900 dark:text-white mb-2">Remove Session?</h3>
                        <p className="text-[13px] text-gray-500 dark:text-gray-400 mb-6 font-medium leading-relaxed">
                            Are you sure you want to remove this session? <br />
                            <span className="text-red-500 dark:text-red-400 font-bold">This cannot be undone</span> unless you refresh without saving.
                        </p>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setSessionToDelete(null)}
                                className="flex-1 py-3.5 text-[14px] font-bold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-[16px] transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmRemoveSession}
                                className="flex-1 py-3.5 text-[14px] font-bold bg-red-600 hover:bg-red-700 text-white rounded-[16px] shadow-lg shadow-red-500/20 transition-all active:scale-95"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}