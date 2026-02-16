import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL, getAuthHeaders } from '../config';
import { useBackButton } from '../hooks/useBackButton';

const ManagerManagement = () => {
    const navigate = useNavigate();
    useBackButton();

    const [managers, setManagers] = useState([]);
    const [newManager, setNewManager] = useState({ username: '', password: '' });
    const [managerError, setManagerError] = useState('');
    const [managerSuccess, setManagerSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Edit/Delete State
    const [editingManager, setEditingManager] = useState(null);
    const [editForm, setEditForm] = useState({ username: '', password: '' });
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [managerToDelete, setManagerToDelete] = useState(null);

    // Fetch Managers
    const fetchManagers = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/admin/managers`, {
                headers: getAuthHeaders()
            });
            if (res.ok) {
                const data = await res.json();
                setManagers(data);
            }
        } catch (err) {
            console.error("Failed to fetch managers", err);
        }
    };

    React.useEffect(() => {
        fetchManagers();
    }, []);

    const handleCreateManager = async (e) => {
        e.preventDefault();
        setManagerError('');
        setManagerSuccess('');
        setIsLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/api/admin/managers`, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify(newManager)
            });

            const data = await response.json();

            if (response.ok) {
                setManagerSuccess(`Manager '${data.username}' created!`);
                setNewManager({ username: '', password: '' });
                fetchManagers(); // Refresh list

                // Clear success message after 3 seconds
                setTimeout(() => setManagerSuccess(''), 3000);
            } else {
                setManagerError(data.error || 'Failed to create manager');
            }
        } catch (err) {
            setManagerError('Network error. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateManager = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_BASE_URL}/api/admin/managers/${editingManager._id}`, {
                method: 'PUT',
                headers: getAuthHeaders(),
                body: JSON.stringify(editForm)
            });

            const data = await res.json();
            if (res.ok) {
                setEditingManager(null);
                fetchManagers();
            } else {
                alert(data.error || "Update failed");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteManager = async () => {
        if (!managerToDelete) return;
        try {
            const res = await fetch(`${API_BASE_URL}/api/admin/managers/${managerToDelete._id}`, {
                method: 'DELETE',
                headers: getAuthHeaders()
            });

            if (res.ok) {
                setIsDeleteModalOpen(false);
                setManagerToDelete(null);
                fetchManagers();
            } else {
                alert("Delete failed");
            }
        } catch (err) {
            console.error(err);
        }
    };

    // Helper to generate initials
    const getInitials = (name) => {
        if (!name) return "MG";
        return name.substring(0, 2).toUpperCase();
    };

    return (
        <div className="max-w-[480px] mx-auto bg-slate-50 dark:bg-[#0a0a0a] min-h-screen flex flex-col relative transition-colors duration-500 font-sans overflow-x-hidden">

            {/* Animated Mesh Gradient Background (Blue theme for Managers) */}
            <div className="fixed inset-0 z-0 pointer-events-none max-w-[480px] mx-auto">
                <div className="absolute -top-[10%] -left-[10%] w-[300px] h-[300px] bg-blue-400/30 dark:bg-blue-600/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-[80px] opacity-70 animate-pulse"></div>
                <div className="absolute top-[30%] -right-[10%] w-[250px] h-[250px] bg-cyan-400/20 dark:bg-cyan-600/10 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-[80px] opacity-60"></div>
            </div>

            {/* --- HEADER --- */}
            <header className="relative z-10 pt-[env(safe-area-inset-top)] pb-2 px-5 mt-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/superadmin')}
                        className="size-10 flex items-center justify-center rounded-full bg-white/50 dark:bg-white/10 border border-white/40 dark:border-white/5 text-gray-700 dark:text-gray-300 shadow-sm active:scale-90 transition-all"
                    >
                        <span className="material-symbols-outlined text-[20px]">arrow_back_ios_new</span>
                    </button>
                    <div>
                        <h1 className="text-[20px] font-black tracking-tight text-gray-900 dark:text-white leading-none mb-0.5">
                            Add Manager
                        </h1>
                        <p className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                            IYRC 2026 • QR Management
                        </p>
                    </div>
                </div>
            </header>

            <main className="relative z-10 flex-1 px-5 pt-4 pb-8 flex flex-col gap-6">

                {/* 1. CREATE FORM CARD (Matches Image Layout) */}
                <section className="bg-white/60 dark:bg-black/40 backdrop-blur-2xl rounded-[32px] p-6 border border-white/60 dark:border-white/10 shadow-xl shadow-blue-500/10 dark:shadow-blue-900/20">
                    <form onSubmit={handleCreateManager} className="space-y-5">

                        {/* Username Input */}
                        <div className="space-y-1.5">
                            <label className="block text-[12px] font-bold text-gray-700 dark:text-gray-300 ml-1">Manager Username</label>
                            <input
                                type="text"
                                className="w-full px-4 py-3.5 bg-white/50 dark:bg-white/5 border border-white/50 dark:border-white/10 rounded-[16px] text-gray-900 dark:text-white text-[14px] font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder-gray-400"
                                placeholder="e.g. john_doe"
                                value={newManager.username}
                                onChange={(e) => setNewManager({ ...newManager, username: e.target.value })}
                                required
                            />
                        </div>

                        {/* Password Input */}
                        <div className="space-y-1.5">
                            <label className="block text-[12px] font-bold text-gray-700 dark:text-gray-300 ml-1">Access Password</label>
                            <input
                                type="text"
                                className="w-full px-4 py-3.5 bg-white/50 dark:bg-white/5 border border-white/50 dark:border-white/10 rounded-[16px] text-gray-900 dark:text-white text-[14px] font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder-gray-400"
                                placeholder="Enter secure password"
                                value={newManager.password}
                                onChange={(e) => setNewManager({ ...newManager, password: e.target.value })}
                                required
                            />
                        </div>

                        {/* Status Messages */}
                        {managerError && (
                            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400">
                                <span className="material-symbols-outlined text-[18px]">error</span>
                                <p className="text-[12px] font-bold">{managerError}</p>
                            </div>
                        )}
                        {managerSuccess && (
                            <div className="flex items-center gap-2 p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400">
                                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                                <p className="text-[12px] font-bold">{managerSuccess}</p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full mt-2 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-[16px] shadow-lg shadow-blue-500/30 active:scale-[0.98] transition-all text-[15px] flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <span className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                            ) : (
                                'Create Manager'
                            )}
                        </button>
                    </form>
                </section>

                {/* 2. MANAGER LIST (Separated Cards Layout) */}
                <section className="flex flex-col gap-3">
                    {/* Header matching the image */}
                    <div className="flex items-center justify-between px-1 mb-1">
                        <h3 className="text-[16px] font-black text-gray-900 dark:text-white tracking-tight">
                            Existing Managers
                        </h3>
                        <span className="text-[10px] font-bold bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 px-2.5 py-1 rounded-md border border-green-200 dark:border-green-500/20 tracking-wider">
                            ACTIVE
                        </span>
                    </div>

                    <div className="flex flex-col gap-3">
                        {managers.length === 0 ? (
                            <div className="p-8 text-center bg-white/40 dark:bg-white/5 backdrop-blur-md rounded-[24px] border border-white/50 dark:border-white/10 text-gray-400 text-sm font-medium">
                                No managers found.
                            </div>
                        ) : (
                            managers.map((m, index) => {
                                // Dynamic pastel colors for initials based on index (matching the image's colorful circles)
                                const colors = [
                                    "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 border-blue-200 dark:border-blue-500/20",
                                    "bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400 border-purple-200 dark:border-purple-500/20",
                                    "bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400 border-amber-200 dark:border-amber-500/20"
                                ];
                                const colorClass = colors[index % colors.length];

                                return (
                                    <div key={m._id} className="bg-white/60 dark:bg-black/40 backdrop-blur-xl p-4 rounded-[24px] shadow-sm border border-white/60 dark:border-white/10 flex items-center justify-between group hover:bg-white/80 dark:hover:bg-white/5 transition-all">

                                        <div className="flex items-center gap-3.5">
                                            {/* Initials Circle */}
                                            <div className={`size-11 rounded-full flex items-center justify-center font-black text-[14px] border shadow-sm ${colorClass}`}>
                                                {getInitials(m.username)}
                                            </div>

                                            {/* Details */}
                                            <div className="flex flex-col">
                                                <p className="font-bold text-[15px] text-gray-900 dark:text-gray-100 leading-tight">
                                                    {m.username}
                                                </p>
                                                <p className="text-[11px] font-medium text-gray-500 dark:text-gray-400 mt-0.5 flex items-center gap-1">
                                                    System Manager <span className="opacity-50">•</span> {new Date(m.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Actions (Pencil & Trash) */}
                                        <div className="flex items-center gap-1 pr-1">
                                            <button
                                                onClick={() => {
                                                    setEditingManager(m);
                                                    setEditForm({ username: m.username, password: '' });
                                                }}
                                                className="size-9 flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 bg-white/50 dark:bg-white/5 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-[12px] transition-all border border-white/50 dark:border-white/5"
                                            >
                                                <span className="material-symbols-outlined text-[18px]">edit</span>
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setManagerToDelete(m);
                                                    setIsDeleteModalOpen(true);
                                                }}
                                                className="size-9 flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 bg-white/50 dark:bg-white/5 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-[12px] transition-all border border-white/50 dark:border-white/5"
                                            >
                                                <span className="material-symbols-outlined text-[18px]">delete</span>
                                            </button>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </section>
            </main>

            {/* EDIT MODAL (Frosted Glass) */}
            {editingManager && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-5 bg-black/40 backdrop-blur-md animate-fade-in">
                    <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-2xl border border-white/50 dark:border-white/10 rounded-[32px] w-full max-w-sm p-7 shadow-2xl animate-scale-up">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="size-10 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                <span className="material-symbols-outlined text-[20px]">edit</span>
                            </div>
                            <h3 className="text-[18px] font-black text-gray-900 dark:text-white">Edit Manager</h3>
                        </div>

                        <form onSubmit={handleUpdateManager} className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="block text-[12px] font-bold text-gray-600 dark:text-gray-400 ml-1">Username</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 bg-white dark:bg-black/50 border border-gray-200 dark:border-gray-700 rounded-[16px] text-[14px] focus:ring-2 focus:ring-blue-500/50"
                                    value={editForm.username}
                                    onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-[12px] font-bold text-gray-600 dark:text-gray-400 ml-1">New Password</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 bg-white dark:bg-black/50 border border-gray-200 dark:border-gray-700 rounded-[16px] text-[14px] focus:ring-2 focus:ring-blue-500/50 placeholder-gray-400"
                                    placeholder="Leave blank to keep current"
                                    value={editForm.password}
                                    onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
                                />
                            </div>

                            <div className="flex gap-2 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setEditingManager(null)}
                                    className="flex-1 py-3.5 text-[14px] font-bold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-[16px] transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-3.5 text-[14px] font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-[16px] shadow-md transition-colors"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* DELETE MODAL (Frosted Glass) */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-5 bg-black/40 backdrop-blur-md animate-fade-in">
                    <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-2xl border border-white/50 dark:border-white/10 rounded-[32px] w-full max-w-sm p-7 shadow-2xl animate-scale-up text-center">

                        <div className="size-16 bg-red-100 dark:bg-red-500/20 border border-red-200 dark:border-red-500/30 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600 dark:text-red-400 shadow-sm">
                            <span className="material-symbols-outlined text-[32px]">warning</span>
                        </div>

                        <h3 className="text-[20px] font-black text-gray-900 dark:text-white mb-2">Delete Manager?</h3>
                        <p className="text-[14px] text-gray-500 dark:text-gray-400 mb-6 font-medium leading-relaxed">
                            Are you sure you want to remove <br/>
                            <strong className="text-gray-800 dark:text-gray-200">{managerToDelete?.username}</strong>? This cannot be undone.
                        </p>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="flex-1 py-3.5 text-[14px] font-bold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-[16px] transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteManager}
                                className="flex-1 py-3.5 text-[14px] font-bold bg-red-600 hover:bg-red-700 text-white rounded-[16px] shadow-lg shadow-red-500/20 transition-all active:scale-95"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManagerManagement;