import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { API_BASE_URL, getAuthHeaders } from '../config';
import { useBackButton } from '../hooks/useBackButton';

const rooms = ["All", { label: "MAC", value: "Mac" }, "Room 1005", "Room 1006", "Room 1007", "Room 1008"];

const meals = [
    { label: "All", value: "All" },
    { label: "Morning Tea", value: "morning-tea" },
    { label: "Lunch", value: "lunch" },
    { label: "Afternoon Tea", value: "afternoon-tea" },
];

const LogsPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    useBackButton();

    // Read URL parameters
    const dayFromUrl = parseInt(searchParams.get('day')) || 1;
    const typeFromUrl = searchParams.get('type');
    const roomFromUrl = searchParams.get('room');

    // Determine initial tab based on type parameter
    const initialTab = typeFromUrl === 'attendance' ? 'attendance' :
        (typeFromUrl && typeFromUrl !== 'attendance') ? 'food' : 'attendance';

    // Determine initial filter based on room or type
    const initialFilter = roomFromUrl ||
        (typeFromUrl && typeFromUrl !== 'attendance' ? typeFromUrl : 'All');

    // --- STATE ---
    const [selectedDay, setSelectedDay] = useState(dayFromUrl);
    const [activeTab, setActiveTab] = useState(initialTab);
    const [filter, setFilter] = useState(initialFilter);

    const [logsData, setLogsData] = useState({ attendance: [], food: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- 1. FETCH DATA ---
    useEffect(() => {
        const fetchLogs = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`${API_BASE_URL}/api/logs?day=${selectedDay}`, {
                    headers: getAuthHeaders()
                });
                if (!res.ok) throw new Error("Failed to fetch logs");
                const data = await res.json();

                setLogsData({
                    attendance: data.attendance || [],
                    food: data.food || []
                });

            } catch (err) {
                console.error(err);
                setError("Could not load logs. Is the server running?");
            } finally {
                setLoading(false);
            }
        };

        fetchLogs();
    }, [selectedDay]);

    // --- 2. DOWNLOAD HANDLER ---
    const handleDownload = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/logs/download`, {
                headers: getAuthHeaders()
            });

            if (!res.ok) throw new Error("Download failed");

            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Event_Logs.xlsx';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (err) {
            console.error("Download error:", err);
            alert("Failed to download logs");
        }
    };

    // --- 3. FILTER LOGIC ---
    const filteredLogs = useMemo(() => {
        const rawList = activeTab === "attendance" ? logsData.attendance : logsData.food;
        if (filter === "All") return rawList;

        return rawList.filter((l) => {
            if (activeTab === "attendance") {
                return l.room === filter || `Room ${l.room}` === filter;
            } else {
                return l.slot === filter;
            }
        });
    }, [logsData, filter, activeTab]);

    // --- 4. STATS ---
    const stats = useMemo(() => {
        const total = filteredLogs.length;
        const valid = filteredLogs.filter(l => l.status === 'valid').length;
        return { total, valid };
    }, [filteredLogs]);

    // Helpers
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setFilter("All");
    };

    const formatSlot = (slot) => {
        if (!slot) return "";
        return slot.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
    };

    return (
        <div className="max-w-[480px] mx-auto bg-slate-50 dark:bg-[#0a0a0a] h-screen overflow-hidden flex flex-col relative transition-colors duration-500 font-sans">

            {/* Animated Mesh Gradient Background (Neutral, Cool Icy Tone) */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[300px] h-[300px] bg-indigo-400/20 dark:bg-indigo-600/10 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-[80px] opacity-70 animate-pulse"></div>
                <div className="absolute top-[20%] -right-[10%] w-[250px] h-[250px] bg-cyan-400/10 dark:bg-cyan-600/5 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-[80px] opacity-60"></div>
            </div>

            {/* --- HEADER (Frosted Glass) --- */}
            <header className="sticky top-0 z-20 bg-white/70 dark:bg-black/50 backdrop-blur-2xl border-b border-white/50 dark:border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.03)] pt-[env(safe-area-inset-top)] flex flex-col gap-4">

                {/* Top Row: Title + Controls */}
                <div className="px-5 pt-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate('/superadmin')}
                            className="size-10 flex items-center justify-center rounded-full bg-white/50 dark:bg-white/10 border border-white/40 dark:border-white/5 text-gray-700 dark:text-gray-300 shadow-sm active:scale-90 transition-all"
                        >
                            <span className="material-symbols-outlined text-[20px]">arrow_back_ios_new</span>
                        </button>
                        <div>
                            <h1 className="text-[20px] font-black text-gray-900 dark:text-white tracking-tight leading-none">Live Logs</h1>
                            <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mt-0.5">Real-time Feed</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Day Selector - Monochrome Pill Style */}
                        <div className="flex bg-white/50 dark:bg-white/5 p-1 rounded-full border border-white/50 dark:border-white/10 shadow-sm">
                            {[1, 2, 3].map((day) => (
                                <button
                                    key={day}
                                    onClick={() => setSelectedDay(day)}
                                    className={`size-8 rounded-full text-xs font-bold transition-all flex items-center justify-center ${selectedDay === day
                                        ? "bg-gray-900 dark:bg-white text-white dark:text-black shadow-md"
                                        : "text-gray-500 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-white/10"
                                        }`}
                                >
                                    {day}
                                </button>
                            ))}
                        </div>

                        {/* Export Button */}
                        <button
                            onClick={handleDownload}
                            className="size-10 flex items-center justify-center rounded-full bg-white/80 dark:bg-white/10 text-gray-700 dark:text-gray-300 border border-white/50 dark:border-white/10 shadow-sm hover:bg-gray-100 dark:hover:bg-white/20 transition-all active:scale-90"
                            title="Export Excel"
                        >
                            <span className="material-symbols-outlined text-[20px]">download</span>
                        </button>
                    </div>
                </div>

                {/* --- CONTROLS AREA --- */}
                <div className="px-5 pb-4 flex flex-col gap-4">

                    {/* 1. Stats Cards */}
                    <div className="grid grid-cols-2 gap-3">
                        <StatCard
                            label="Total Scans"
                            value={loading ? "-" : stats.total}
                            icon="qr_code_scanner"
                            color="bg-blue-500/10 border-blue-500/20 text-blue-700 dark:text-blue-400"
                        />
                        <StatCard
                            label="Valid Entries"
                            value={loading ? "-" : stats.valid}
                            icon="check_circle"
                            color="bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-400"
                        />
                    </div>

                    {/* 2. Tabs - iOS Style */}
                    <div className="flex p-1 bg-white/40 dark:bg-black/40 border border-white/50 dark:border-white/5 rounded-[16px] shadow-inner">
                        <TabButton
                            active={activeTab === "attendance"}
                            onClick={() => handleTabChange("attendance")}
                            label="Attendance"
                        />
                        <TabButton
                            active={activeTab === "food"}
                            onClick={() => handleTabChange("food")}
                            label="Food Court"
                        />
                    </div>

                    {/* 3. Filter Chips - Glassy Scroll */}
                    <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-1">
                        {(activeTab === "attendance" ? rooms : meals).map((item) => {
                            const label = typeof item === 'string' ? item : item.label;
                            const val = typeof item === 'string' ? item : item.value;

                            return (
                                <button
                                    key={val}
                                    onClick={() => setFilter(val)}
                                    className={`whitespace-nowrap px-4 py-2 rounded-xl text-[13px] font-bold border transition-all active:scale-[0.97] ${filter === val
                                        ? "bg-gray-900 dark:bg-white text-white dark:text-black border-transparent shadow-md"
                                        : "bg-white/60 dark:bg-white/5 text-gray-600 dark:text-gray-400 border-white/50 dark:border-white/10 hover:bg-white/80 dark:hover:bg-white/10"
                                        }`}
                                >
                                    {label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </header>

            {/* --- MAIN CONTENT (SCROLLABLE) --- */}
            <main className="relative z-10 flex-1 overflow-y-auto px-5 pt-4 pb-24 space-y-3 custom-scrollbar">

                {loading && (
                    <div className="flex flex-col items-center justify-center pt-20 opacity-80 gap-3">
                        <div className="size-8 border-4 border-gray-200/50 border-t-gray-900 dark:border-t-white rounded-full animate-spin"></div>
                        <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest animate-pulse">Syncing Logs...</p>
                    </div>
                )}

                {!loading && error && (
                    <div className="flex flex-col items-center justify-center pt-20 text-red-500 font-bold bg-red-500/10 p-6 rounded-[24px] border border-red-500/20 mx-4">
                        <span className="material-symbols-outlined text-4xl mb-2">wifi_off</span>
                        <p className="text-sm text-center">{error}</p>
                        <button onClick={() => window.location.reload()} className="mt-4 px-6 py-2 bg-red-500 text-white rounded-full text-sm shadow-md active:scale-95 transition-all">Retry</button>
                    </div>
                )}

                {!loading && !error && filteredLogs.length === 0 && (
                    <div className="flex flex-col items-center justify-center pt-24 opacity-50">
                        <div className="size-20 bg-white/50 dark:bg-white/5 rounded-full flex items-center justify-center border border-white/50 dark:border-white/10 shadow-sm mb-4">
                            <span className="material-symbols-outlined text-4xl text-gray-400 dark:text-gray-500">inbox</span>
                        </div>
                        <p className="text-[14px] font-bold text-gray-500 dark:text-gray-400">No logs found</p>
                        <p className="text-[11px] font-medium text-gray-400 mt-1 uppercase tracking-widest">For selected filters</p>
                    </div>
                )}

                {!loading && !error && filteredLogs.map((log, index) => (
                    <LogCard
                        key={index}
                        log={log}
                        type={activeTab}
                        formatSlot={formatSlot}
                    />
                ))}

            </main>
        </div>
    );
};

// --- SUB COMPONENTS ---

const StatCard = ({ label, value, color, icon }) => (
    <div className={`flex flex-col items-start justify-center p-3.5 rounded-[20px] border backdrop-blur-md shadow-sm ${color} bg-white/40 dark:bg-black/20`}>
        <div className="flex items-center gap-1.5 mb-1.5 opacity-80">
            <span className="material-symbols-outlined text-[16px]">{icon}</span>
            <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
        </div>
        <span className="text-[26px] font-black leading-none tracking-tight">{value}</span>
    </div>
);

const TabButton = ({ active, onClick, label }) => (
    <button
        onClick={onClick}
        className={`flex-1 py-2.5 rounded-[12px] text-[13px] font-bold transition-all duration-300 ${active
            ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
            : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            }`}
    >
        {label}
    </button>
);

const LogCard = ({ log, type, formatSlot }) => {
    const name = log.name || "Unknown";
    const initials = name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();
    const isValid = log.status === 'valid';

    const subText = type === 'attendance'
        ? (log.room ? (log.room === 'Mac' ? 'MAC' : (log.room.includes("Room") ? log.room : `Room ${log.room}`)) : "Unknown Room")
        : formatSlot(log.slot);

    return (
        <div className="bg-white/60 dark:bg-black/40 backdrop-blur-xl p-3.5 rounded-[24px] shadow-sm border border-white/60 dark:border-white/10 flex items-center gap-4 hover:bg-white/80 dark:hover:bg-white/5 transition-colors group">

            <div className={`size-12 flex-shrink-0 rounded-[16px] flex items-center justify-center text-sm font-black border transition-transform group-hover:scale-105 ${isValid
                ? "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20"
                : "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20"
                }`}>
                {initials}
            </div>

            <div className="flex-1 min-w-0">
                <h4 className="font-bold text-gray-900 dark:text-white text-[15px] truncate mb-0.5 leading-tight">
                    {name}
                </h4>

                <div className="flex items-center gap-1.5 text-[12px] text-gray-500 dark:text-gray-400 font-medium mb-1">
                    <span className="material-symbols-outlined text-[13px] opacity-70">call</span>
                    <span>{log.phone || "No Phone"}</span>
                </div>

                <p className="text-[11px] font-bold text-gray-400 dark:text-gray-500/80 uppercase tracking-wide">
                    {subText} <span className="mx-1">•</span> {log.time}
                </p>
            </div>

            <div className="flex flex-col items-end gap-2 pr-1">
                {log.phone && (
                    <a href={`tel:${log.phone}`} className="size-8 rounded-full bg-white/80 dark:bg-white/10 flex items-center justify-center text-gray-600 dark:text-gray-400 active:scale-90 transition-transform shadow-sm border border-white/50 dark:border-white/5">
                        <span className="material-symbols-outlined text-[16px]">phone</span>
                    </a>
                )}

                {isValid ? (
                    <span className="material-symbols-outlined text-green-500 dark:text-green-400 text-[22px] drop-shadow-sm">check_circle</span>
                ) : (
                    <span className="material-symbols-outlined text-red-500 dark:text-red-400 text-[22px] drop-shadow-sm">error</span>
                )}
            </div>
        </div>
    );
};

export default LogsPage;