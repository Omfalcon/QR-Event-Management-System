import React from 'react';
import { useNavigate } from 'react-router-dom';

const ScannerList = ({ isSuperAdmin }) => {
    const navigate = useNavigate();
    const [selectedDay, setSelectedDay] = React.useState(1);

    const schedules = {
        1: [
            {
                title: 'Morning Tea',
                slot: 'morning-tea',
                time: '09:30 AM - 10:30 AM',
                icon: 'coffee',
                bgClass: 'bg-orange-100 dark:bg-orange-900/20',
                textClass: 'text-orange-600 dark:text-orange-400'
            },
            {
                title: 'Buffet Lunch',
                slot: 'lunch',
                time: '12:30 PM - 02:00 PM',
                icon: 'restaurant',
                bgClass: 'bg-blue-100 dark:bg-blue-900/20',
                textClass: 'text-blue-600 dark:text-blue-400'
            },
            {
                title: 'Afternoon Tea',
                slot: 'afternoon-tea',
                time: '03:30 PM - 04:15 PM',
                icon: 'bakery_dining',
                bgClass: 'bg-purple-100 dark:bg-purple-900/20',
                textClass: 'text-purple-600 dark:text-purple-400'
            }
        ],
        2: [
            {
                title: 'Morning Tea',
                slot: 'morning-tea',
                time: '09:30 AM - 10:30 AM',
                icon: 'coffee',
                bgClass: 'bg-orange-100 dark:bg-orange-900/20',
                textClass: 'text-orange-600 dark:text-orange-400'
            },
            {
                title: 'Buffet Lunch',
                slot: 'lunch',
                time: '12:30 PM - 02:00 PM',
                icon: 'restaurant',
                bgClass: 'bg-blue-100 dark:bg-blue-900/20',
                textClass: 'text-blue-600 dark:text-blue-400'
            },
            {
                title: 'Afternoon Tea',
                slot: 'afternoon-tea',
                time: '03:30 PM - 04:15 PM',
                icon: 'bakery_dining',
                bgClass: 'bg-purple-100 dark:bg-purple-900/20',
                textClass: 'text-purple-600 dark:text-purple-400'
            }
        ],
        3: [
            {
                title: 'Morning Tea',
                slot: 'morning-tea',
                time: '09:30 AM - 10:30 AM',
                icon: 'coffee',
                bgClass: 'bg-orange-100 dark:bg-orange-900/20',
                textClass: 'text-orange-600 dark:text-orange-400'
            }
        ]
    };

    return (
        <div className="flex-1 overflow-y-auto pb-24">
            {/* Day Selector */}
            <section className="px-4 mt-4">
                <div className="flex gap-2 overflow-x-auto no-scrollbar">
                    {[1, 2, 3].map((day) => (
                        <button
                            key={day}
                            onClick={() => setSelectedDay(day)}
                            className={`flex-1 min-w-[80px] py-2.5 rounded-full font-bold text-sm shadow-sm transition-all ${selectedDay === day
                                ? 'bg-primary text-white'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                                }`}
                        >
                            Day {day}
                        </button>
                    ))}
                </div>
            </section>

            {/* ATTENDANCE SECTION */}
            <section className="p-4">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold">Attendance</h2>
                    <span className="text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-full uppercase tracking-wider">Live</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    {/* MAC Card */}
                    <div className="col-span-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-sm">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="font-bold">MAC</h3>
                            <span className="material-symbols-outlined text-primary">admin_panel_settings</span>
                        </div>
                        <div className={`grid ${isSuperAdmin ? 'grid-cols-2' : 'grid-cols-1'} gap-3`}>
                            <button
                                onClick={() => navigate(`/scan?type=attendance&room=Mac&day=${selectedDay}`)}
                                className="bg-primary text-white font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
                            >
                                <span className="material-symbols-outlined text-[20px]">qr_code_scanner</span>
                                <span>Scan</span>
                            </button>
                            {isSuperAdmin && (
                                <button
                                    onClick={() => navigate(`/logs?type=attendance&room=Mac&day=${selectedDay}`)}
                                    className="border border-primary text-primary font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-transform hover:bg-primary/5"
                                >
                                    <span className="material-symbols-outlined text-[20px]">list_alt</span>
                                    <span>Logs</span>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Room Cards */}
                    {(selectedDay === 2
                        ? ['Room 1005', 'Trust Room', 'AB1', 'BUZZ']
                        : ['Room 1005', 'Room 1006', 'AB1', 'BUZZ']
                    ).map((room, index) => (
                        <div key={index} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 flex flex-col gap-3 shadow-sm">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-sm">{room}</h3>
                                    <p className="text-[10px] text-gray-500">{index === 0 ? 'Main Hall A' : index === 1 ? 'Workshop B' : index === 2 ? 'Exec Lounge' : 'Media Center'}</p>
                                </div>
                                <span className="material-symbols-outlined text-primary text-lg">meeting_room</span>
                            </div>
                            <div className="mt-1 space-y-2">
                                <button
                                    onClick={() => navigate(`/scan?type=attendance&room=${room}&day=${selectedDay}`)}
                                    className="w-full bg-primary text-white font-bold py-2 rounded-lg flex items-center justify-center gap-2 text-sm"
                                >
                                    <span className="material-symbols-outlined text-[18px]">qr_code_scanner</span>
                                    <span>Scan</span>
                                </button>
                                {isSuperAdmin && (
                                    <button
                                        onClick={() => navigate(`/logs?type=attendance&room=${room}&day=${selectedDay}`)}
                                        className="w-full text-primary text-[10px] font-bold py-1 hover:underline"
                                    >
                                        View Logs
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* FOOD SECTION */}
            <section className="px-4 pb-6">
                <h2 className="text-lg font-bold mb-4">Food & Beverage</h2>
                <div className="space-y-3">
                    {schedules[selectedDay].map((item, index) => (
                        <div key={index} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-3 shadow-sm flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className={`size-10 rounded-lg ${item.bgClass} ${item.textClass} flex items-center justify-center`}>
                                    <span className="material-symbols-outlined text-lg">{item.icon}</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm">{item.title}</h4>
                                    <p className="text-[10px] text-gray-500">{item.time}</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                                <button
                                    onClick={() => navigate(`/scan?type=${item.slot}&day=${selectedDay}`)}
                                    className="bg-primary px-3 py-1.5 rounded-lg text-white font-bold text-xs flex items-center gap-1"
                                >
                                    <span className="material-symbols-outlined text-xs">qr_code_scanner</span> Scan
                                </button>
                                {isSuperAdmin && (
                                    <button
                                        onClick={() => navigate(`/logs?type=${item.slot}&day=${selectedDay}`)}
                                        className="text-primary text-[10px] font-bold hover:underline"
                                    >
                                        View Logs
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default ScannerList;
