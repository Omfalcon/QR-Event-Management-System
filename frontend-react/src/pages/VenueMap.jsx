import { useNavigate } from 'react-router-dom';

export default function VenueMap() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col h-full bg-white dark:bg-background-dark">
            <div className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-gray-100 dark:border-gray-800" style={{ paddingTop: 'calc(env(safe-area-inset-top) + 0.75rem)' }}>
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center size-10 rounded-full bg-gray-100 dark:bg-gray-800 text-[#111418] dark:text-white cursor-pointer" onClick={() => navigate('/')}>
                        <span className="material-symbols-outlined">arrow_back_ios_new</span>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">University Map</h2>
                        <p className="text-xs text-gray-500 dark:text-gray-400">4th IYRC • UPES Campus</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <button className="flex items-center justify-center size-10 rounded-full bg-primary/10 text-primary">
                        <span className="material-symbols-outlined">info</span>
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar pb-32">
                <div className="px-4 py-3">
                    <label className="flex flex-col min-w-40 h-12 w-full">
                        <div className="flex w-full flex-1 items-stretch rounded-xl h-full shadow-sm">
                            <div className="text-[#617289] flex border-none bg-gray-100 dark:bg-gray-800 items-center justify-center pl-4 rounded-l-xl">
                                <span className="material-symbols-outlined">search</span>
                            </div>
                            <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-xl text-[#111418] dark:text-white focus:outline-0 focus:ring-0 border-none bg-gray-100 dark:bg-gray-800 placeholder:text-[#617289] px-4 pl-2 text-base font-normal leading-normal" placeholder="Search for a room, building, or session..." />
                        </div>
                    </label>
                </div>

                <div className="flex gap-2 px-4 pb-2 overflow-x-auto custom-scrollbar">
                    <div className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-primary text-white px-4">
                        <span className="material-symbols-outlined text-sm">event_seat</span>
                        <p className="text-sm font-medium">Sessions</p>
                    </div>
                    <div className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-gray-100 dark:bg-gray-800 text-[#111418] dark:text-white px-4">
                        <span className="material-symbols-outlined text-sm">restaurant</span>
                        <p className="text-sm font-medium">Food</p>
                    </div>
                    <div className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-gray-100 dark:bg-gray-800 text-[#111418] dark:text-white px-4">
                        <span className="material-symbols-outlined text-sm">wc</span>
                        <p className="text-sm font-medium">Restrooms</p>
                    </div>
                    <div className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-gray-100 dark:bg-gray-800 text-[#111418] dark:text-white px-4">
                        <span className="material-symbols-outlined text-sm">local_parking</span>
                        <p className="text-sm font-medium">Parking</p>
                    </div>
                </div>

                <div className="relative px-4 py-3">
                    <div className="relative w-full aspect-[4/3] bg-gray-200 dark:bg-gray-700 rounded-2xl overflow-hidden shadow-inner group">
                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD9gXHltjyvTQxI_1VPFauGwc4kl4IjUxtNpd6HgQcWXSq68AtTRw1l2aSkjoWikcmEczvnMUdrNZI_bmYc-8QxG69dlAkG0UpZMzehfx98S6c9QAXo3jSpjccfsZYl3bsiM293ti2uTNHwhyYH-e46OOuW_sl5ilrqxAef2O-akUeyQpI9QykhWjbOTYvC0gmzM8f1-ohXMcf5PDCXx0S4Z5W-Fu1RgS3FXNBYt6-19h20WMhx2_ZXT8z3VYNdMgcpSbZlde5ttKc')" }}></div>

                        <div className="absolute top-[30%] left-[45%] flex flex-col items-center">
                            <div className="bg-white dark:bg-gray-900 px-2 py-1 rounded-lg text-[10px] font-bold shadow-md mb-1 border border-primary/20">Auditorium</div>
                            <div className="size-8 bg-primary rounded-full flex items-center justify-center text-white ring-4 ring-white/30 map-marker">
                                <span className="material-symbols-outlined text-base">theater_comedy</span>
                            </div>
                        </div>

                        <div className="absolute top-[60%] left-[20%] flex flex-col items-center">
                            <div className="size-8 bg-orange-500 rounded-full flex items-center justify-center text-white ring-4 ring-white/30 map-marker">
                                <span className="material-symbols-outlined text-base">restaurant</span>
                            </div>
                        </div>

                        <div className="absolute top-[45%] left-[70%] flex flex-col items-center">
                            <div className="size-8 bg-primary rounded-full flex items-center justify-center text-white ring-4 ring-white/30 map-marker">
                                <span className="material-symbols-outlined text-base">school</span>
                            </div>
                        </div>

                        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                            <button className="size-10 bg-white dark:bg-gray-900 rounded-lg shadow-lg flex items-center justify-center">
                                <span className="material-symbols-outlined">add</span>
                            </button>
                            <button className="size-10 bg-white dark:bg-gray-900 rounded-lg shadow-lg flex items-center justify-center">
                                <span className="material-symbols-outlined">remove</span>
                            </button>
                            <button className="size-10 bg-primary rounded-lg shadow-lg flex items-center justify-center text-white">
                                <span className="material-symbols-outlined">my_location</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="px-4 pt-4 flex items-center justify-between">
                    <h3 className="text-[#111418] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Key Locations</h3>
                    <span className="text-primary text-sm font-semibold">View All</span>
                </div>

                <div className="px-4 py-2 space-y-3">
                    <div className="flex gap-4 p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                        <div className="size-16 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                            <span className="material-symbols-outlined text-3xl">theater_comedy</span>
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                            <div>
                                <h4 className="font-bold text-sm">Main Auditorium</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Opening Ceremony • 09:00 AM</p>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                                <button className="bg-primary text-white text-xs font-bold py-1.5 px-3 rounded-lg flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">near_me</span> Directions
                                </button>
                                <span className="text-[10px] text-gray-400">2 min walk • Floor 1</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                        <div className="size-16 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                            <span className="material-symbols-outlined text-3xl">meeting_room</span>
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                            <div>
                                <h4 className="font-bold text-sm">Block A - Room 102</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Keynote Sessions • AI in Research</p>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                                <button className="bg-primary/20 text-primary text-xs font-bold py-1.5 px-3 rounded-lg flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">near_me</span> Directions
                                </button>
                                <span className="text-[10px] text-gray-400">5 min walk • Floor 2</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                        <div className="size-16 rounded-lg bg-orange-100 flex items-center justify-center text-orange-500 shrink-0">
                            <span className="material-symbols-outlined text-3xl">restaurant</span>
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                            <div>
                                <h4 className="font-bold text-sm">Student Center</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Lunch &amp; Networking Area</p>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                                <button className="bg-primary/20 text-primary text-xs font-bold py-1.5 px-3 rounded-lg flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">near_me</span> Directions
                                </button>
                                <span className="text-[10px] text-gray-400">3 min walk • Ground</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
