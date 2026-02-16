import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { API_BASE_URL } from '../config';

export default function Feedback() {
    const navigate = useNavigate();
    const [rating, setRating] = useState(0);
    const [likedMost, setLikedMost] = useState("");
    const [suggestions, setSuggestions] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async () => {
        if (rating === 0) {
            alert("Please select a rating.");
            return;
        }

        setSubmitting(true);
        try {
            const res = await fetch(`${API_BASE_URL}/api/feedback`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ rating, likedMost, suggestions })
            });

            if (res.ok) {
                setSubmitted(true);
                setTimeout(() => navigate('/'), 3000);
            } else {
                alert("Failed to submit feedback. Please try again.");
            }
        } catch (err) {
            console.error(err);
            alert("Network error.");
        } finally {
            setSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark items-center justify-center p-6 text-center">
                <div className="size-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6 animate-scale-up">
                    <span className="material-symbols-outlined text-4xl text-green-600 dark:text-green-400">check_circle</span>
                </div>
                <h2 className="text-2xl font-bold text-[#111418] dark:text-white mb-2">Thank You!</h2>
                <p className="text-gray-500 dark:text-gray-400">Your feedback has been submitted successfully.</p>
                <button
                    onClick={() => navigate('/')}
                    className="mt-8 px-6 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl font-bold text-gray-700 dark:text-gray-300"
                >
                    Return Home
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark text-[#111418] dark:text-white pb-28">
            <div className="sticky top-0 z-50 flex items-center bg-white/80 dark:bg-background-dark/80 backdrop-blur-md p-4 pb-2 justify-between border-b border-gray-100 dark:border-gray-800" style={{ paddingTop: 'calc(env(safe-area-inset-top) + 1rem)' }}>
                <div
                    className="flex size-10 shrink-0 items-center justify-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                    onClick={() => navigate(-1)}
                >
                    <span className="material-symbols-outlined text-[#111418] dark:text-white">arrow_back_ios_new</span>
                </div>
                <h2 className="text-[#111418] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-10">Event Feedback</h2>
            </div>

            <main className="flex-1 p-4 max-w-md mx-auto w-full">
                <div className="flex flex-col gap-6">
                    <div className="text-center py-4">
                        <h1 className="text-2xl font-bold mb-2">How was your experience?</h1>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">Your feedback helps us improve future events.</p>
                    </div>

                    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col items-center gap-4">
                        <h3 className="font-semibold text-lg">Rate the Event</h3>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    onClick={() => setRating(star)}
                                    className="text-4xl transition-transform active:scale-90 hover:scale-110 focus:outline-none"
                                >
                                    <span className={`material-symbols-outlined ${star <= rating ? 'text-yellow-400 font-variation-FILL' : 'text-gray-300 dark:text-gray-600'}`}>
                                        star
                                    </span>
                                </button>
                            ))}
                        </div>
                        <p className="text-sm font-medium text-primary">
                            {rating === 5 ? 'Excellent!' : rating === 4 ? 'Very Good' : rating === 3 ? 'Good' : rating === 2 ? 'Fair' : rating === 1 ? 'Poor' : 'Select a rating'}
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold ml-1">What did you like most?</label>
                            <textarea
                                className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 min-h-[100px] focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none text-sm"
                                placeholder="The speakers were amazing..."
                                value={likedMost}
                                onChange={(e) => setLikedMost(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold ml-1">Suggestions for improvement</label>
                            <textarea
                                className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 min-h-[100px] focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none text-sm"
                                placeholder="It would be better if..."
                                value={suggestions}
                                onChange={(e) => setSuggestions(e.target.value)}
                            ></textarea>
                        </div>
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={submitting}
                        className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 active:scale-[0.98] transition-all mt-4 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {submitting && <span className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>}
                        {submitting ? 'Submitting...' : 'Submit Feedback'}
                    </button>
                </div>
            </main>
        </div>
    );
}
