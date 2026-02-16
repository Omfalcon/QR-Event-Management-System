import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBackButton } from '../hooks/useBackButton';
import ScannerList from '../components/ScannerList';

const ScannerSelection = () => {
    const navigate = useNavigate();
    useBackButton();

    return (
        <div className="max-w-[480px] mx-auto bg-white dark:bg-background-dark h-screen overflow-hidden shadow-xl flex flex-col relative">
            {/* ADMIN HEADER */}
            <header className="sticky top-0 z-10 bg-white/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 pt-[env(safe-area-inset-top)]">
                <div className="flex items-center px-4 py-4 gap-3">
                    <button
                        onClick={() => navigate('/superadmin')}
                        className="size-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <div className="flex flex-col justify-center flex-1">
                        <h1 className="text-xl font-bold text-gray-900 dark:text-white leading-none">
                            Scanner Menu
                        </h1>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Select an event to scan</p>
                    </div>
                </div>
            </header>

            {/* SCANNER LIST (ADMIN MODE - WITH LOGS) */}
            <ScannerList isSuperAdmin={true} />
        </div>
    );
};

export default ScannerSelection;
