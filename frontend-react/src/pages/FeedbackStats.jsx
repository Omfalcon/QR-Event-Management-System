import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL, getAuthHeaders } from '../config';

export default function FeedbackStats() {
    const navigate = useNavigate();
    const [feedback, setFeedback] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFeedback();
    }, []);

    const fetchFeedback = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/feedback`, {
                headers: getAuthHeaders()
            });
            if (res.ok) {
                const data = await res.json();
                // Sort by timestamp desc
                const sorted = data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
                setFeedback(sorted);
            }
        } catch (err) {
            console.error("Failed to fetch feedback", err);
        } finally {
            setLoading(false);
        }
    };

    const averageRating = feedback.length > 0
        ? (feedback.reduce((acc, curr) => acc + curr.rating, 0) / feedback.length).toFixed(1)
        : 0;

    return (
        <div className="max-w-[480px] mx-auto bg-slate-50 dark:bg-[#0a0a0a] min-h-screen flex flex-col relative transition-colors duration-500 font-sans overflow-x-hidden">

            <header className="relative z-10 pt-[env(safe-area-inset-top)] pb-2 px-5 mt-4">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="size-10 flex items-center justify-center rounded-full bg-white/50 dark:bg-white/10 border border-white/40 dark:border-white/5 text-gray-700 dark:text-gray-300 shadow-sm active:scale-90 transition-all"
                    >
                        <span className="material-symbols-outlined text-[20px]">arrow_back_ios_new</span>
                    </button>
                    <div>
                        <h1 className="text-[20px] font-black tracking-tight text-gray-900 dark:text-white leading-none mb-0.5">
                            Feedback Stats
                        </h1>
                        <p className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                            User Reviews
                        </p>
                    </div>
                </div>
            </header>

            <main className="relative z-10 flex-1 px-5 pt-4 pb-8 flex flex-col gap-6">

                {/* Summary Card */}
                <div className="bg-indigo-600 dark:bg-indigo-900/40 p-6 rounded-[24px] text-white shadow-lg shadow-indigo-500/20 relative overflow-hidden">
                    <div className="relative z-10 flex items-center justify-between">
                        <div>
                            <p className="text-indigo-100 text-xs font-bold uppercase tracking-wider mb-1">Overall Rating</p>
                            <h2 className="text-4xl font-black">{averageRating} <span className="text-lg opacity-60 font-semibold">/ 5.0</span></h2>
                        </div>
                        <div className="text-right">
                            <p className="text-indigo-100 text-xs font-bold uppercase tracking-wider mb-1">Total Responses</p>
                            <h2 className="text-3xl font-bold">{feedback.length}</h2>
                        </div>
                    </div>
                    {/* Background decorations */}
                    <div className="absolute -right-6 -bottom-6 text-white/10">
                        <span className="material-symbols-outlined text-[100px]">star</span>
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-10 opacity-70 gap-3">
                        <div className="size-8 border-4 border-indigo-200/50 border-t-indigo-500 rounded-full animate-spin"></div>
                        <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Loading Feedback...</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {feedback.length === 0 ? (
                            <div className="text-center py-10 text-gray-400">
                                <span className="material-symbols-outlined text-4xl mb-2 opacity-50">rate_review</span>
                                <p className="text-sm font-medium">No feedback received yet.</p>
                            </div>
                        ) : (
                            feedback.map((item, index) => (
                                <div key={index} className="bg-white/60 dark:bg-white/5 backdrop-blur-xl p-5 rounded-[20px] border border-white/60 dark:border-white/10 shadow-sm flex flex-col gap-3">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i} className={`material-symbols-outlined text-[16px] ${i < item.rating ? 'text-yellow-400 font-variation-FILL' : 'text-gray-300 dark:text-gray-700'}`}>
                                                    star
                                                </span>
                                            ))}
                                        </div>
                                        <span className="text-[10px] font-bold text-gray-400">
                                            {new Date(item.timestamp).toLocaleDateString()}
                                        </span>
                                    </div>

                                    {item.likedMost && (
                                        <div className="bg-green-50/50 dark:bg-green-500/5 p-3 rounded-xl border border-green-100 dark:border-green-500/10">
                                            <p className="text-[10px] font-bold text-green-600 dark:text-green-400 uppercase tracking-wider mb-1">Liked Most</p>
                                            <p className="text-[13px] font-medium text-gray-800 dark:text-gray-200 leading-snug">"{item.likedMost}"</p>
                                        </div>
                                    )}

                                    {item.suggestions && (
                                        <div className="bg-blue-50/50 dark:bg-blue-500/5 p-3 rounded-xl border border-blue-100 dark:border-blue-500/10">
                                            <p className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">Suggestion</p>
                                            <p className="text-[13px] font-medium text-gray-800 dark:text-gray-200 leading-snug">"{item.suggestions}"</p>
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
