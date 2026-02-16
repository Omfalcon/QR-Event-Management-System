import { Outlet, Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

export default function Layout() {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path;
    };

    const isKeynotes = location.pathname === '/keynotes' || location.pathname === '/themes';

    return (
        <div className={clsx("bg-background-light dark:bg-background-dark min-h-screen text-[#111418] dark:text-white", !isKeynotes && "pb-28")}>
            <main>
                <Outlet />
            </main>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-background-dark/95 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800 pb-[env(safe-area-inset-bottom,20px)] pt-3 px-1 flex justify-around items-center z-[100]">
                <Link
                    to="/"
                    className={clsx(
                        "flex flex-col items-center gap-1 px-1 min-w-[64px] transition-colors",
                        isActive('/') ? "active-nav text-primary" : "text-gray-400 dark:text-gray-500 active:text-primary"
                    )}
                >
                    <span className="material-symbols-outlined text-[24px]">home</span>
                    <span className="text-[10px] font-bold">Home</span>
                </Link>
                <Link
                    to="/schedule"
                    className={clsx(
                        "flex flex-col items-center gap-1 px-1 min-w-[64px] transition-colors",
                        isActive('/schedule') ? "active-nav text-primary" : "text-gray-400 dark:text-gray-500 active:text-primary"
                    )}
                >
                    <span className="material-symbols-outlined text-[24px]">calendar_today</span>
                    <span className="text-[10px] font-semibold">Schedule</span>
                </Link>


                <Link
                    to="/keynotes"
                    className={clsx(
                        "flex flex-col items-center gap-1 px-1 min-w-[64px] transition-colors",
                        isActive('/keynotes') ? "active-nav text-primary" : "text-gray-400 dark:text-gray-500 active:text-primary"
                    )}
                >
                    <span className="material-symbols-outlined text-[24px]">person_celebrate</span>
                    <span className="text-[10px] font-semibold">Keynotes</span>
                </Link>
            </nav>
        </div>
    );
}
