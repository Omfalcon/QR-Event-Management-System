import { useSearchParams, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { API_BASE_URL, getAuthHeaders } from "../config";

const ScanPage = () => {
    const [params] = useSearchParams();
    const navigate = useNavigate();

    // Params

    const day = params.get("day");
    const type = params.get("type");
    const room = params.get("room");
    const slot = params.get("slot");

    // Logic State
    const qrRef = useRef(null);
    const isRunningRef = useRef(false); // ✅ Fix: Ref to track running state instantly

    const [user, setUser] = useState(null);
    const [msg, setMsg] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isCameraRunning, setIsCameraRunning] = useState(false); // Only for UI updates

    // --- UI HEADERS ---
    const isAttendance = type === 'attendance';
    const bigTitle = isAttendance
        ? `${room}`
        : (slot || type)?.replace(/-/g, " ").toUpperCase();
    const subTitle = `DAY ${day} • ${isAttendance ? "ATTENDANCE" : "FOOD COUNTER"}`;

    // ✅ ROBUST CLEANUP FUNCTION
    useEffect(() => {
        // Init the instance if it doesn't exist
        if (!qrRef.current) {
            qrRef.current = new Html5Qrcode("qr-reader");
        }

        return () => {
            // Logic: If camera is running, STOP it first, THEN clear.
            if (qrRef.current) {
                if (isRunningRef.current) {
                    qrRef.current.stop()
                        .then(() => {
                            try { qrRef.current.clear(); } catch (e) { console.log("Clear ignored", e); }
                        })
                        .catch((err) => { console.log("Stop failed during cleanup", err); });
                } else {
                    // If not running, just clear purely
                    try { qrRef.current.clear(); } catch (e) { console.log("Clear ignored", e); }
                }
            }
        };
    }, []);

    const startScanner = async () => {
        if (isRunningRef.current) return; // Prevent double clicks

        setMsg(null);
        setIsCameraRunning(true);
        isRunningRef.current = true;

        const startCamera = async (retry = false) => {
            try {
                await qrRef.current.start(
                    { facingMode: "environment" },
                    { fps: 10, qrbox: 250 },
                    async (decodedText) => {
                        // SUCCESS: Stop camera immediately
                        try {
                            await qrRef.current.stop();
                            setIsCameraRunning(false);
                            isRunningRef.current = false;
                        } catch (e) {
                            console.log("Error stopping camera", e);
                        }
                        handleScanSuccess(decodedText);
                    },
                    (errorMessage) => { }
                );
            } catch (err) {
                console.error(`Camera start error (retry=${retry}):`, err);

                if (!retry) {
                    console.log("Retrying camera start in 300ms...");
                    await new Promise(r => setTimeout(r, 300));
                    return startCamera(true);
                }

                setIsCameraRunning(false);
                isRunningRef.current = false;
                setMsg({ type: "error", text: "Camera Error: Refresh Page" });
            }
        };

        await startCamera(false);
    };

    const stopScannerManual = async () => {
        if (qrRef.current && isRunningRef.current) {
            try {
                await qrRef.current.stop();
            } catch (e) { console.log(e); }

            setIsCameraRunning(false);
            isRunningRef.current = false;
        }
    };

    const handleHardRefresh = () => {
        window.location.reload();
    };

    const handleScanSuccess = async (decodedText) => {
        let uuid;
        try {
            const parsed = JSON.parse(decodedText);
            uuid = parsed.uuid;

            // ✅ FIX #7: Validate UUID format (prevents XSS and injection)
            const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
            if (!uuid || !uuidRegex.test(uuid)) {
                setMsg({ type: "error", text: "Invalid QR Code Format" });
                return;
            }
        } catch (e) {
            // Handle plain UUID strings (backward compatibility)
            uuid = decodedText;
            const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
            if (!uuidRegex.test(uuid)) {
                setMsg({ type: "error", text: "Invalid QR Code" });
                return;
            }
        }

        if (!uuid) {
            setMsg({ type: "error", text: "Invalid QR Format" });
            return;
        }

        setLoading(true);

        try {
            const res = await fetch(`${API_BASE_URL}/api/qr/validate`, {
                method: "POST",
                headers: getAuthHeaders(),
                body: JSON.stringify({ uuid })
            });

            const data = await res.json();
            setLoading(false);

            if (!res.ok) {
                if (res.status === 401) {
                    alert("Session expired or access revoked. Logging out.");
                    localStorage.clear();
                    window.location.href = "/";
                    return;
                }
                setMsg({ type: "error", text: data.error || "User not found" });
                return;
            }
            setUser({ ...data, uuid });

        } catch (error) {
            setLoading(false);
            setMsg({ type: "error", text: "Connection Failed" });
        }
    };

    const confirmScan = async () => {
        if (!user?.uuid) return;

        // ✅ FIX #4: Validate day parameter
        const dayNum = parseInt(day);
        if (isNaN(dayNum) || dayNum < 1 || dayNum > 3) {
            setMsg({ type: "error", text: "Invalid day parameter" });
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`${API_BASE_URL}/api/scan/confirm`, {
                method: "POST",
                headers: getAuthHeaders(),
                body: JSON.stringify({
                    uuid: user.uuid,
                    day: dayNum,  // Use validated number
                    type,
                    slot,
                    room
                })
            });

            const data = await res.json();
            setLoading(false);

            if (res.status === 200) {
                setMsg({ type: "success", text: "✅ Entry Confirmed!" });

                setTimeout(() => {
                    setUser(null);
                    setMsg(null);
                    // Restart logic immediately
                    startScanner();
                }, 800); // Reduced from 1500ms for faster scanning
            } else if (res.status === 401) {
                alert("Session expired or access revoked. Logging out.");
                localStorage.clear();
                window.location.href = "/";
            } else {
                setMsg({ type: "error", text: `${data.message}` });
            }
        } catch (error) {
            setLoading(false);
            setMsg({ type: "error", text: "Confirmation Failed" });
        }
    };

    return (
        <div className="h-screen overflow-hidden bg-gray-50 dark:bg-black text-gray-900 dark:text-white flex flex-col font-sans">

            {/* HEADER */}
            <header className="flex-none px-6 pb-6 pt-[calc(1.5rem+env(safe-area-inset-top))] bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 flex justify-between items-center z-10 shadow-sm gap-4">
                {/* BACK BUTTON */}
                <button
                    onClick={() => {
                        const role = localStorage.getItem('role');
                        if (role === 'manager') {
                            navigate(`/manager?day=${day}`);
                        } else {
                            navigate(`/scan-menu?day=${day}`);
                        }
                    }}
                    className="size-10 flex-shrink-0 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-all border border-gray-200 dark:border-gray-700"
                >
                    <span className="material-symbols-outlined text-xl">arrow_back</span>
                </button>

                {/* TITLE INFO */}
                <div className="text-right flex flex-col items-end flex-1 overflow-hidden">
                    <h1 className="text-2xl md:text-4xl font-black tracking-tighter text-gray-900 dark:text-white leading-none mb-1 truncate w-full text-right">
                        {bigTitle}
                    </h1>
                    <p className="text-[10px] md:text-sm font-bold text-primary uppercase tracking-widest bg-primary/10 px-2 py-0.5 rounded text-primary whitespace-nowrap">
                        {subTitle}
                    </p>
                </div>

                {/* ✅ REFRESH BUTTON */}
                <button
                    onClick={handleHardRefresh}
                    className="size-10 flex-shrink-0 flex items-center justify-center rounded-full bg-red-900/20 text-red-500 hover:bg-red-900/40 hover:text-red-400 transition-all border border-red-900/50"
                    title="Force Reload Camera"
                >
                    <span className="material-symbols-outlined text-xl">refresh</span>
                </button>
            </header>

            {/* MAIN CONTENT */}
            <main className="flex-1 overflow-y-auto flex flex-col items-center justify-center p-6 relative">

                {/* ALERTS */}
                {msg && (
                    <div className={`absolute top-4 left-6 right-6 p-4 rounded-xl text-center font-bold shadow-2xl z-20 border-2 ${msg.type === 'error' ? 'bg-red-600 border-red-400 text-white' : 'bg-green-500 border-green-300 text-black'
                        }`}>
                        {msg.text}
                    </div>
                )}

                {/* SCANNER UI */}
                {!user && (
                    <div className="w-full max-w-md flex flex-col items-center gap-6">

                        <div className="relative w-full aspect-square bg-white dark:bg-gray-900 rounded-[2rem] overflow-hidden border border-gray-200 dark:border-gray-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none flex items-center justify-center">
                            {/* The div ID must match the logic */}
                            <div id="qr-reader" className="w-full h-full object-cover"></div>

                            {!isCameraRunning && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                    <span className="material-symbols-outlined text-6xl text-gray-400 dark:text-gray-700 mb-4">qr_code_scanner</span>
                                    <p className="text-gray-600 dark:text-gray-500 text-sm font-medium">Camera is off</p>
                                </div>
                            )}
                        </div>

                        {!isCameraRunning ? (
                            <button
                                onClick={startScanner}
                                className="w-full bg-primary text-white hover:bg-primary/90 font-extrabold py-4 rounded-xl text-xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-3"
                            >
                                <span className="material-symbols-outlined">photo_camera</span>
                                START SCAN
                            </button>
                        ) : (
                            <button
                                onClick={stopScannerManual}
                                className="px-6 py-2.5 bg-white border-2 border-red-500 text-red-600 rounded-lg font-bold uppercase tracking-wider text-sm hover:bg-red-50 dark:bg-red-900/30 dark:text-red-400 dark:border-red-900/50 dark:hover:bg-red-900/50 transition-colors shadow-sm"
                            >
                                Stop Camera
                            </button>
                        )}
                    </div>
                )}

                {/* CONFIRMATION UI */}
                {user && (
                    <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-xl dark:shadow-2xl border border-gray-200 dark:border-gray-700 animate-slide-up overflow-hidden">
                        <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-8 text-center relative">
                            <div className="size-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mx-auto mb-4 flex items-center justify-center border-4 border-white dark:border-gray-900 shadow-sm">
                                <span className="material-symbols-outlined text-5xl text-emerald-600 dark:text-emerald-400">qr_code_2</span>
                            </div>
                            <h2 className="text-2xl font-black leading-tight mb-1">QR Code Scanned</h2>
                            {user.name && (
                                <div className="mb-2">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{user.name}</h3>
                                </div>
                            )}
                            <p className="text-gray-600 dark:text-gray-400 font-medium text-sm">Confirm to validate entry</p>
                        </div>

                        <div className="p-6 bg-gray-50 dark:bg-gray-800/50 border-t border-dashed border-gray-300 dark:border-gray-700 relative">
                            <div className="absolute -left-3 top-[-12px] w-6 h-6 bg-gray-50 dark:bg-black rounded-full shadow-inner"></div>
                            <div className="absolute -right-3 top-[-12px] w-6 h-6 bg-gray-50 dark:bg-black rounded-full shadow-inner"></div>

                            <div className="flex gap-3 mt-2">
                                <button
                                    onClick={() => setUser(null)}
                                    className="flex-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-bold py-3.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-transparent transition-colors shadow-sm"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmScan}
                                    disabled={loading}
                                    className="flex-[2] bg-emerald-600 text-white font-extrabold py-3.5 rounded-xl hover:bg-emerald-500 shadow-lg shadow-emerald-600/20 active:scale-95 transition-all flex justify-center items-center gap-2"
                                >
                                    {loading ? (
                                        <span className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                    ) : (
                                        <>
                                            <span className="material-symbols-outlined font-bold">check_circle</span>
                                            CONFIRM
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
};

export default ScanPage;