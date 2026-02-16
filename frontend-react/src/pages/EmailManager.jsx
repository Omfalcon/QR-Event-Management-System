import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL, getAuthHeaders } from '../config';
import { useBackButton } from '../hooks/useBackButton';

const EmailManager = () => {
    const navigate = useNavigate();
    useBackButton(); // Handle back button

    const [sentParticipants, setSentParticipants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);
    const [fileToUpload, setFileToUpload] = useState(null);
    const [analysisResult, setAnalysisResult] = useState(null);
    const [progress, setProgress] = useState({ status: 'idle', current: 0, total: 0, message: '' });

    const startUploadStream = async () => {
        if (!fileToUpload) return;

        setAnalysisResult(null); // Hide confirmation
        setUploading(true);
        setProgress({ status: 'starting', current: 0, total: 0, message: 'Initializing...' });

        const formData = new FormData();
        formData.append('file', fileToUpload);

        try {
            const headers = getAuthHeaders();
            delete headers['Content-Type'];

            const response = await fetch(`${API_BASE_URL}/api/upload/stream`, {
                method: 'POST',
                headers: headers,
                body: formData
            });

            if (!response.ok) throw new Error("Upload failed");

            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value);
                const lines = chunk.split("\n\n");

                for (const line of lines) {
                    if (line.startsWith("data: ")) {
                        const jsonStr = line.replace("data: ", "");
                        try {
                            const data = JSON.parse(jsonStr);
                            if (data.error) {
                                console.error(data.error);
                                setProgress({ status: 'error', current: 0, total: 0, message: `Error: ${data.error}` });
                                setUploading(false);
                                return;
                            }

                            if (data.status === 'start') {
                                setProgress(prev => ({ ...prev, total: data.total, status: 'sending', message: 'Starting...' }));
                            } else if (data.status === 'sending') {
                                setProgress(prev => ({
                                    ...prev,
                                    current: data.current,
                                    message: `Sending to ${data.name}...`
                                }));
                            } else if (data.status === 'complete') {
                                setUploading(false);
                                setFileToUpload(null);
                                fetchSentParticipants();
                                setProgress({
                                    status: 'success',
                                    current: data.processed,
                                    total: data.processed,
                                    message: `Done! Sent: ${data.emails_sent}, Errors: ${data.errors.length}`
                                });
                            }
                        } catch (e) {
                            console.error("Parse error", e);
                        }
                    }
                }
            }
        } catch (err) {
            console.error(err);
            setProgress({ status: 'error', current: 0, total: 0, message: "Upload Failed: " + err.message });
            setUploading(false);
        }
    };

    const fetchSentParticipants = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/participants/sent`, {
                headers: getAuthHeaders()
            });
            if (res.ok) {
                const data = await res.json();
                setSentParticipants(data);
            }
        } catch (err) {
            console.error("Failed to fetch sent participants", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSentParticipants();
    }, []);

    return (
        <div className="max-w-[480px] mx-auto bg-slate-50 dark:bg-[#0a0a0a] min-h-screen flex flex-col relative transition-colors duration-500 font-sans overflow-x-hidden">

            {/* Animated Mesh Gradient Background (Indigo/Blue theme for emails) */}
            <div className="fixed inset-0 z-0 pointer-events-none max-w-[480px] mx-auto">
                <div className="absolute -top-[10%] -left-[10%] w-[300px] h-[300px] bg-indigo-400/40 dark:bg-indigo-600/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-[80px] opacity-70 animate-pulse"></div>
                <div className="absolute top-[30%] -right-[10%] w-[250px] h-[250px] bg-blue-400/30 dark:bg-blue-600/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-[80px] opacity-60"></div>
            </div>

            {/* Transparent Header */}
            <header className="relative z-10 pt-[env(safe-area-inset-top)] pb-2 px-5 mt-4">
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => navigate('/superadmin')}
                        className="size-10 flex items-center justify-center rounded-full bg-white/50 dark:bg-black/50 backdrop-blur-md border border-white/40 dark:border-white/10 text-gray-700 dark:text-gray-300 shadow-sm active:scale-90 transition-all"
                    >
                        <span className="material-symbols-outlined text-[20px]">arrow_back_ios_new</span>
                    </button>
                    <h1 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                        Email Manager
                    </h1>
                    <div className="size-10"></div> {/* Spacer to center the title */}
                </div>
            </header>

            <main className="relative z-10 flex-1 px-5 pt-4 pb-8 flex flex-col gap-6">

                {/* 1. Upload Section - Frosted Glass Card */}
                <section className="relative overflow-hidden rounded-[32px] p-6 transition-all duration-300 shadow-xl shadow-indigo-500/10 dark:shadow-indigo-900/20 bg-white/60 dark:bg-black/40 backdrop-blur-2xl border border-white/60 dark:border-white/10 flex flex-col gap-5">

                    <div className="flex items-center gap-3">
                        <div className="size-10 rounded-full bg-indigo-100/80 dark:bg-indigo-500/20 flex items-center justify-center border border-indigo-200/50 dark:border-indigo-500/10 shadow-sm">
                            <span className="material-symbols-outlined text-indigo-600 dark:text-indigo-400">cloud_upload</span>
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">Upload & Send</h2>
                            <p className="text-[11px] font-semibold text-indigo-600/70 dark:text-indigo-400/70 uppercase tracking-widest">Excel Data</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <button
                            onClick={() => window.open(`${API_BASE_URL}/auth/microsoft`, '_blank')}
                            className="w-full bg-white/50 dark:bg-white/5 border border-white/80 dark:border-white/10 text-gray-800 dark:text-gray-200 font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 hover:bg-white/80 dark:hover:bg-white/10 transition-colors shadow-sm active:scale-[0.98]"
                        >
                            <span>Connect Outlook</span>
                        </button>

                        {/* UPLOAD / ANALYZE BUTTON */}
                        {!analysisResult ? (
                            <label className={`block w-full cursor-pointer ${uploading || analyzing ? 'opacity-50 pointer-events-none' : ''}`}>
                                <div className="bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-500/30 active:scale-[0.98]">
                                    {analyzing ? (
                                        <span className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                    ) : (
                                        <span className="material-symbols-outlined">upload_file</span>
                                    )}
                                    <span>{analyzing ? 'Analyzing Data...' : 'Select Excel File'}</span>
                                </div>
                                <input
                                    type="file"
                                    accept=".xlsx"
                                    className="hidden"
                                    disabled={uploading || analyzing}
                                    onChange={async (e) => {
                                        const file = e.target.files[0];
                                        if (!file) return;

                                        setFileToUpload(file);
                                        setAnalyzing(true);

                                        const formData = new FormData();
                                        formData.append('file', file);

                                        try {
                                            const headers = getAuthHeaders();
                                            delete headers['Content-Type'];

                                            const res = await fetch(`${API_BASE_URL}/api/upload/analyze`, {
                                                method: 'POST',
                                                headers: headers,
                                                body: formData
                                            });
                                            const data = await res.json();

                                            if (data.error) {
                                                alert("Analysis Failed: " + data.error);
                                                setFileToUpload(null);
                                            } else {
                                                setAnalysisResult(data);
                                            }
                                        } catch (err) {
                                            alert("Analysis Error: " + err.message);
                                            setFileToUpload(null);
                                        } finally {
                                            setAnalyzing(false);
                                            e.target.value = null; // Reset input
                                        }
                                    }}
                                />
                            </label>
                        ) : (
                            /* CONFIRMATION UI */
                            <div className="bg-white/40 dark:bg-black/20 border border-white/50 dark:border-white/10 rounded-2xl p-4 backdrop-blur-md">
                                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3 text-center">Ready to Dispatch?</h3>

                                <div className="grid grid-cols-3 gap-2 text-center mb-4">
                                    <div className="bg-white/60 dark:bg-white/5 py-2 px-1 rounded-xl border border-white/50 dark:border-white/5 shadow-sm">
                                        <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Total</div>
                                        <div className="font-black text-gray-800 dark:text-gray-200">{analysisResult.total}</div>
                                    </div>
                                    <div className="bg-green-500/10 dark:bg-green-500/10 py-2 px-1 rounded-xl border border-green-500/20 shadow-sm">
                                        <div className="text-[10px] font-bold text-green-600 dark:text-green-400 uppercase tracking-wider">Sent</div>
                                        <div className="font-black text-green-700 dark:text-green-300">{analysisResult.already_sent}</div>
                                    </div>
                                    <div className="bg-blue-500/10 dark:bg-blue-500/10 py-2 px-1 rounded-xl border border-blue-500/20 shadow-sm">
                                        <div className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Pending</div>
                                        <div className="font-black text-blue-700 dark:text-blue-300">{analysisResult.pending}</div>
                                    </div>
                                </div>

                                {analysisResult.pending > 0 ? (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => {
                                                setAnalysisResult(null);
                                                setFileToUpload(null);
                                            }}
                                            className="flex-1 py-2.5 text-sm font-bold text-gray-600 dark:text-gray-300 bg-white/50 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 rounded-xl transition-colors border border-white/40 dark:border-white/5"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={startUploadStream}
                                            className="flex-1 py-2.5 text-sm font-bold bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-xl shadow-md active:scale-[0.98] transition-transform"
                                        >
                                            Send {analysisResult.pending} Emails
                                        </button>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">All emails have already been sent!</p>
                                        <button
                                            onClick={() => {
                                                setAnalysisResult(null);
                                                setFileToUpload(null);
                                            }}
                                            className="px-6 py-2.5 text-sm font-bold bg-white/50 dark:bg-white/10 text-gray-700 dark:text-gray-200 rounded-xl hover:bg-white/80 dark:hover:bg-white/20 transition-colors border border-white/40 dark:border-white/5"
                                        >
                                            Close
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* STATUS / PROGRESS UI */}
                    {progress.status !== 'idle' && (
                        <div className={`mt-2 rounded-2xl p-4 border backdrop-blur-md ${
                            progress.status === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-700 dark:text-red-400' :
                            progress.status === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-400' :
                            'bg-white/40 dark:bg-white/5 border-white/50 dark:border-white/10 text-gray-800 dark:text-gray-200'
                        }`}>
                            <div className="flex justify-between items-center mb-2.5">
                                <span className="font-bold text-sm flex items-center gap-2">
                                    {progress.status === 'sending' && <span className="size-4 border-2 border-indigo-600 dark:border-indigo-400 border-t-transparent rounded-full animate-spin"></span>}
                                    {progress.status === 'success' && <span className="material-symbols-outlined text-[18px]">check_circle</span>}
                                    {progress.status === 'error' && <span className="material-symbols-outlined text-[18px]">error</span>}
                                    <span className="truncate max-w-[200px]">{progress.message}</span>
                                </span>
                                {progress.status !== 'sending' && (
                                    <button
                                        onClick={() => setProgress({ status: 'idle', current: 0, total: 0, message: '' })}
                                        className="text-[11px] font-bold opacity-60 hover:opacity-100 uppercase tracking-wider"
                                    >
                                        Dismiss
                                    </button>
                                )}
                            </div>

                            {progress.status === 'sending' && (
                                <div className="w-full bg-white/50 dark:bg-black/50 rounded-full h-1.5 overflow-hidden border border-white/20 dark:border-white/5">
                                    <div
                                        className="bg-gradient-to-r from-indigo-500 to-blue-500 h-1.5 rounded-full transition-all duration-300 ease-out"
                                        style={{ width: `${(progress.current / (progress.total || 1)) * 100}%` }}
                                    ></div>
                                </div>
                            )}
                        </div>
                    )}
                </section>

                {/* 2. Sent Emails List - Sleek Frosted Hub */}
                <section className="flex flex-col gap-2 mt-2">
                    <div className="flex items-center justify-between px-2 mb-1">
                        <h3 className="text-[12px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                            Delivery Log
                        </h3>
                        <span className="text-[10px] font-bold bg-green-500/10 text-green-600 dark:text-green-400 px-2 py-0.5 rounded-md border border-green-500/20">
                            {sentParticipants.length} Sent
                        </span>
                    </div>

                    <div className="bg-white/50 dark:bg-black/30 backdrop-blur-xl border border-white/50 dark:border-white/5 rounded-[24px] overflow-hidden shadow-sm">
                        {loading ? (
                            <div className="p-8 text-center text-sm font-medium text-gray-400">Syncing data...</div>
                        ) : sentParticipants.length === 0 ? (
                            <div className="p-8 text-center text-sm font-medium text-gray-400">No emails sent yet.</div>
                        ) : (
                            <div className="divide-y divide-gray-200/50 dark:divide-gray-800/50 max-h-[300px] overflow-y-auto custom-scrollbar">
                                {sentParticipants.map((p, i) => (
                                    <div key={i} className="p-4 flex items-center justify-between hover:bg-white/40 dark:hover:bg-white/5 transition-colors">
                                        <div className="flex flex-col">
                                            <p className="font-semibold text-[14px] text-gray-900 dark:text-gray-100 leading-tight">{p.name}</p>
                                            <p className="text-[12px] font-medium text-gray-500 dark:text-gray-400 mt-0.5">{p.email}</p>
                                        </div>
                                        <div className="size-8 rounded-full bg-green-50 dark:bg-green-500/10 flex items-center justify-center border border-green-200 dark:border-green-500/20 shrink-0">
                                            <span className="material-symbols-outlined text-green-500 dark:text-green-400 text-[18px]">check</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default EmailManager;