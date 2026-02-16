import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { API_BASE_URL, getAuthHeaders } from '../config';
import upesLogo from '../assets/upeslogo.jpeg';
import { useBackButton } from '../hooks/useBackButton';
import ScannerList from '../components/ScannerList';

const ManagerDashboard = () => {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    useBackButton();

    // Verify Session on Load
    useEffect(() => {
        const verifySession = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
                    headers: getAuthHeaders()
                });
                if (res.status === 401) {
                    // Token invalid or user deleted -> Logout
                    localStorage.clear();
                    navigate('/');
                }
            } catch (err) {
                console.error("Session verification failed", err);
            }
        };
        verifySession();
    }, [navigate]);

    return (
        <div className="max-w-[480px] mx-auto bg-white dark:bg-background-dark h-screen overflow-hidden shadow-xl flex flex-col relative">
            {/* MANAGER HEADER */}
            <header className="sticky top-0 z-10 bg-white/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 pt-[env(safe-area-inset-top)]">
                <div className="flex items-center px-4 py-4 gap-3">
                    <div className="size-12 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 shrink-0">
                        <img src={upesLogo} alt="UPES" className="w-full h-full object-contain p-1" />
                    </div>
                    <div className="flex flex-col justify-center flex-1">
                        <div className="flex items-center justify-between mb-1">
                            <h1 className="text-2xl font-black tracking-tighter text-gray-900 dark:text-white leading-none">
                                IYRC 2026
                            </h1>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => window.location.reload()}
                                    className="size-9 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                >
                                    <span className="material-symbols-outlined text-lg">sync</span>
                                </button>
                                <button
                                    onClick={toggleTheme}
                                    className="size-9 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                >
                                    <span className="material-symbols-outlined text-lg">
                                        {theme === 'light' ? 'dark_mode' : 'light_mode'}
                                    </span>
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 opacity-90 h-6">
                            <span className="text-[14px] font-extrabold text-gray-700 dark:text-gray-200 uppercase tracking-tight">
                                QR Management
                            </span>
                            <span className="text-gray-300 dark:text-gray-600 text-xs">|</span>
                            <span className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm border border-blue-400">
                                Manager
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            {/* MAIN SCROLLABLE CONTENT AREA */}
            <main className="flex-1 overflow-y-auto pt-4 pb-24 custom-scrollbar">

                {/* SCANNER LIST (MANAGER MODE - NO LOGS) */}
                <ScannerList isSuperAdmin={false} />

                {/* MANAGER FOOTER TEXT */}
                <div className="p-4 text-center text-gray-400 dark:text-gray-600 space-y-1 opacity-80 mt-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">Powered By</p>
                    <div className="flex items-center justify-center gap-3">
                        <span className="font-black text-xl tracking-tighter text-gray-600 dark:text-gray-300">UPES</span>
                        <span className="text-gray-300 dark:text-gray-700 text-lg font-light">|</span>
                        <span className="font-bold text-xs tracking-wide">R&D TEAM</span>
                    </div>
                </div>
            </main>

            {/* MANAGER BOTTOM NAV */}
            <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white/90 dark:bg-background-dark/90 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 px-6 py-3 flex justify-between items-center z-20">

                {/* Dashboard / Scanners Button */}
                <div className="flex-1 flex flex-col items-center gap-1 text-blue-600 dark:text-blue-500 cursor-pointer">
                    <span className="material-symbols-outlined">grid_view</span>
                    <span className="text-[10px] font-bold">Dashboard</span>
                </div>

                {/* Keynotes Button (Moved from Center) */}
                <button
                    onClick={() => navigate('/keynote-manager')}
                    className="flex-1 flex flex-col items-center gap-1 text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                    <span className="material-symbols-outlined">mic_external_on</span>
                    <span className="text-[10px] font-bold">Keynotes</span>
                </button>

                {/* Logout Button */}
                <button
                    onClick={() => {
                        localStorage.clear();
                        navigate('/');
                    }}
                    className="flex-1 flex flex-col items-center gap-1 text-gray-400 hover:text-red-500 transition-colors"
                >
                    <span className="material-symbols-outlined">logout</span>
                    <span className="text-[10px] font-bold">Logout</span>
                </button>

            </nav>
        </div>
    );
};

export default ManagerDashboard;