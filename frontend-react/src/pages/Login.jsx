import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import upesLogo from '../assets/upeslogo.jpeg'; // Assuming you have this like in other files

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Added loading state for a smooth UI
    const navigate = useNavigate();

    // Redirect if already logged in (Fixed: Changed from useState to useEffect)
    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        if (token) {
            if (role === 'manager') navigate('/manager');
            else navigate('/superadmin');
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', data.username);
                localStorage.setItem('role', data.role); // Store role

                // Redirect based on role
                if (data.role === 'manager') {
                    navigate('/manager');
                } else {
                    navigate('/superadmin');
                }
            } else {
                setError(data.error || 'Login failed');
            }
        } catch (err) {
            setError('Network error, please try again');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-[480px] mx-auto bg-slate-50 dark:bg-[#0a0a0a] min-h-screen flex flex-col relative transition-colors duration-500 font-sans overflow-hidden">

            {/* Animated Mesh Gradient Background (Secure Indigo/Purple Theme) */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[350px] h-[350px] bg-indigo-500/30 dark:bg-indigo-600/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-[90px] opacity-80 animate-pulse"></div>
                <div className="absolute top-[40%] -right-[10%] w-[300px] h-[300px] bg-purple-500/20 dark:bg-purple-600/10 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-[80px] opacity-70"></div>
            </div>

            <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12">

                {/* Branding / Logo */}
                <div className="flex flex-col items-center mb-8 animate-fade-in">
                    <div className="size-20 rounded-full bg-white/90 dark:bg-white/10 backdrop-blur-xl flex items-center justify-center p-1.5 shadow-lg border border-white/50 dark:border-white/10 mb-4">
                        {/* Fallback icon if upesLogo is missing, otherwise it shows the logo */}
                        <img
                            src={upesLogo}
                            alt="UPES"
                            className="w-full h-full object-contain rounded-full"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'block';
                            }}
                        />
                        <span className="material-symbols-outlined text-4xl text-indigo-600 dark:text-indigo-400 hidden">shield_person</span>
                    </div>
                    <h1 className="text-[28px] font-black tracking-tight text-gray-900 dark:text-white leading-none mb-1 text-center">
                        IYRC 2026
                    </h1>
                    <p className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest text-center">
                        QR Management Portal
                    </p>
                </div>

                {/* Login Form Card (Frosted Glass) */}
                <div className="w-full bg-white/60 dark:bg-black/40 backdrop-blur-2xl rounded-[32px] p-7 border border-white/60 dark:border-white/10 shadow-xl shadow-indigo-500/10 dark:shadow-indigo-900/20">
                    <h2 className="text-[18px] font-bold text-gray-900 dark:text-white mb-6 text-center">
                        Secure Login
                    </h2>

                    <form onSubmit={handleLogin} className="space-y-4">

                        {/* Username Input */}
                        <div className="space-y-1.5">
                            <label className="block text-[12px] font-bold text-gray-600 dark:text-gray-400 ml-1">Username</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]">person</span>
                                <input
                                    type="text"
                                    className="w-full pl-11 pr-4 py-3.5 bg-white/50 dark:bg-white/5 border border-white/50 dark:border-white/10 rounded-[16px] text-gray-900 dark:text-white text-[14px] font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder-gray-400"
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="space-y-1.5">
                            <label className="block text-[12px] font-bold text-gray-600 dark:text-gray-400 ml-1">Password</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]">lock</span>
                                <input
                                    type="password"
                                    className="w-full pl-11 pr-4 py-3.5 bg-white/50 dark:bg-white/5 border border-white/50 dark:border-white/10 rounded-[16px] text-gray-900 dark:text-white text-[14px] font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder-gray-400"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="flex items-center gap-2 p-3 rounded-[12px] bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 animate-fade-in mt-2">
                                <span className="material-symbols-outlined text-[18px]">error</span>
                                <p className="text-[12px] font-bold">{error}</p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full mt-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-[16px] shadow-lg shadow-indigo-500/30 active:scale-[0.98] transition-all text-[15px] flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <span className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                            ) : (
                                <>
                                    <span>Sign In</span>
                                    <span className="material-symbols-outlined text-[18px]">login</span>
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </main>

            {/* Custom Watermark Footer */}
            <div className="relative z-10 pt-4 pb-8 flex flex-col items-center justify-center gap-1.5 opacity-70">
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                    <span className="text-[10px] font-bold tracking-widest uppercase">Powered By</span>
                    <span className="w-3 h-[1px] bg-gray-300 dark:bg-gray-700"></span>
                    <span className="text-[11px] font-black tracking-tight uppercase">UPES | R&D</span>
                </div>
                <p className="text-[10px] font-medium text-gray-500 dark:text-gray-500">
                    Developed by Om Agarwal <span className="mx-1.5 opacity-40">|</span> Guided by Shubhi Sharma
                </p>
            </div>
        </div>
    );
};

export default Login;