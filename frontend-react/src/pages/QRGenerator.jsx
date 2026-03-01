import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { API_BASE_URL, getAuthHeaders } from '../config';

const QRGenerator = () => {
    const navigate = useNavigate();
    const { theme } = useTheme();

    const [form, setForm] = useState({ name: '', email: '', phone: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
        setSuccess('');
    };

    const handleGenerate = async () => {
        const { name, email, phone } = form;
        if (!name.trim() || !email.trim() || !phone.trim()) {
            setError('Please fill in all three fields.');
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            setError('Please enter a valid email address.');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const res = await fetch(`${API_BASE_URL}/api/participants/generate-qr`, {
                method: 'POST',
                headers: {
                    ...getAuthHeaders(),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name.trim(),
                    email: email.trim(),
                    phone: phone.trim(),
                }),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || 'Failed to generate QR code');
            }

            // Get filename from Content-Disposition header if available
            const disposition = res.headers.get('Content-Disposition');
            let filename = `${name.trim().replace(/\s+/g, '_')}_QR.png`;
            if (disposition) {
                const match = disposition.match(/filename="?([^"]+)"?/);
                if (match) filename = match[1];
            }

            // Trigger download
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            link.click();
            URL.revokeObjectURL(url);

            setSuccess(`✅ QR code for ${name.trim()} saved to your device & stored in database!`);
            setForm({ name: '', email: '', phone: '' });
        } catch (err) {
            setError(err.message || 'Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-[480px] mx-auto bg-slate-50 dark:bg-[#0a0a0a] min-h-screen flex flex-col relative transition-colors duration-500 font-sans">

            {/* Animated Mesh Gradient Background */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[300px] h-[300px] bg-green-400/30 dark:bg-green-600/15 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-[80px] opacity-70 animate-pulse"></div>
                <div className="absolute top-[30%] -right-[10%] w-[280px] h-[280px] bg-teal-400/30 dark:bg-teal-600/15 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-[80px] opacity-60"></div>
                <div className="absolute -bottom-[10%] left-[10%] w-[320px] h-[320px] bg-emerald-400/20 dark:bg-emerald-600/10 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-[100px] opacity-50"></div>
            </div>

            {/* Header */}
            <header className="relative z-10 pt-[env(safe-area-inset-top)] pb-2 px-5 mt-4">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate('/superadmin')}
                        className="size-10 flex items-center justify-center rounded-full bg-white/50 dark:bg-black/50 backdrop-blur-md border border-white/40 dark:border-white/10 text-gray-700 dark:text-gray-300 shadow-sm active:scale-90 transition-all"
                    >
                        <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                    </button>
                    <div>
                        <h1 className="text-xl font-black tracking-tight text-gray-900 dark:text-white leading-none">
                            QR Generator
                        </h1>
                        <span className="text-[11px] font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-500 dark:from-green-400 dark:to-teal-400 uppercase tracking-widest">
                            IYRC2026 · Instant Download
                        </span>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="relative z-10 flex-1 px-5 pt-5 pb-10 overflow-y-auto flex flex-col gap-5 custom-scrollbar">

                {/* Info Banner */}
                <div className="flex items-start gap-3 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-[16px] p-4">
                    <span className="material-symbols-outlined text-[20px] text-green-600 dark:text-green-400 mt-0.5">info</span>
                    <p className="text-[13px] text-green-800 dark:text-green-300 leading-relaxed">
                        Generates an official <strong>IYRC2026</strong> QR code, stores the participant in the database, and downloads the PNG directly to your device.
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white/60 dark:bg-black/40 backdrop-blur-xl border border-white/60 dark:border-white/10 rounded-[24px] p-5 shadow-sm flex flex-col gap-4">
                    <h2 className="text-[13px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                        Participant Details
                    </h2>

                    {/* Name */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[12px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Full Name
                        </label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-gray-400 dark:text-gray-500">person</span>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="e.g. John Doe"
                                className="w-full pl-10 pr-4 py-3 rounded-[14px] bg-white/70 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-[14px] placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500/40 dark:focus:ring-green-400/30 transition-all"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[12px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Email Address
                        </label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-gray-400 dark:text-gray-500">mail</span>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="e.g. john@example.com"
                                className="w-full pl-10 pr-4 py-3 rounded-[14px] bg-white/70 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-[14px] placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500/40 dark:focus:ring-green-400/30 transition-all"
                            />
                        </div>
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[12px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Phone Number
                        </label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-gray-400 dark:text-gray-500">phone</span>
                            <input
                                type="tel"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="e.g. +91 9876543210"
                                className="w-full pl-10 pr-4 py-3 rounded-[14px] bg-white/70 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-[14px] placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500/40 dark:focus:ring-green-400/30 transition-all"
                            />
                        </div>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="flex items-center gap-2 text-red-500 dark:text-red-400 text-[13px] font-medium bg-red-50 dark:bg-red-500/10 px-3 py-2.5 rounded-xl border border-red-100 dark:border-red-500/20">
                            <span className="material-symbols-outlined text-[16px]">error</span>
                            {error}
                        </div>
                    )}

                    {/* Success */}
                    {success && (
                        <div className="flex items-center gap-2 text-green-700 dark:text-green-400 text-[13px] font-medium bg-green-50 dark:bg-green-500/10 px-3 py-2.5 rounded-xl border border-green-200 dark:border-green-500/20">
                            <span className="material-symbols-outlined text-[16px]">check_circle</span>
                            {success}
                        </div>
                    )}

                    {/* Generate Button */}
                    <button
                        onClick={handleGenerate}
                        disabled={loading}
                        className="w-full py-3.5 rounded-[16px] bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold text-[15px] shadow-lg shadow-green-500/25 active:scale-[0.97] transition-all disabled:opacity-60 flex items-center justify-center gap-2 mt-1"
                    >
                        {loading ? (
                            <>
                                <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                                Generating & Saving…
                            </>
                        ) : (
                            <>
                                <span className="material-symbols-outlined text-[18px]">qr_code_2</span>
                                Generate & Download QR
                            </>
                        )}
                    </button>
                </div>

                {/* How it works */}
                {/* <div className="bg-white/40 dark:bg-black/20 backdrop-blur-xl border border-white/40 dark:border-white/5 rounded-[20px] p-4 flex flex-col gap-3">
                    <h3 className="text-[12px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">How it works</h3>
                    {[
                        { icon: 'person_add', text: 'Participant is stored in the database (or updated if already exists)' },
                        { icon: 'qr_code_2', text: 'An official IYRC2026 QR code is generated using the participant\'s UUID' },
                        { icon: 'download', text: 'The QR PNG downloads directly to your device — no email required' },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-500/15 flex items-center justify-center flex-shrink-0">
                                <span className="material-symbols-outlined text-[16px] text-green-600 dark:text-green-400">{item.icon}</span>
                            </div>
                            <p className="text-[13px] text-gray-600 dark:text-gray-400">{item.text}</p>
                        </div>
                    ))}
                </div> */}
            </main>
        </div>
    );
};

export default QRGenerator;
