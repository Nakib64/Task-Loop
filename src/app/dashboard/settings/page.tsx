"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { User, Lock, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function SettingsPage() {
    const { data: session, update } = useSession();
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState(session?.user?.name || "");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (newPassword && newPassword !== confirmPassword) {
            toast.error("New passwords do not match");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/user/settings", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    currentPassword: currentPassword || undefined,
                    newPassword: newPassword || undefined,
                }),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Profile updated successfully");
                await update({ name: data.user.name });
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
            } else {
                toast.error(data.error || "Failed to update profile");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white p-6 md:p-12">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-4xl font-extrabold mb-8">
                    Account <span className="linear-text">Settings</span>
                </h1>

                <div className="glass-effect rounded-3xl border border-white/10 p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Profile Info */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <User className="w-5 h-5 text-purple-400" />
                                Profile Information
                            </h2>

                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Full Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                                    placeholder="Your Name"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Email Address</label>
                                <input
                                    type="email"
                                    value={session?.user?.email || ""}
                                    disabled
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-gray-500 cursor-not-allowed"
                                />
                                <p className="text-xs text-gray-500">Email cannot be changed</p>
                            </div>
                        </div>

                        <div className="border-t border-white/10 my-6" />

                        {/* Password Change */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <Lock className="w-5 h-5 text-purple-400" />
                                Change Password
                            </h2>

                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Current Password</label>
                                <input
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                                    placeholder="••••••••"
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">New Password</label>
                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                                        placeholder="••••••••"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Confirm New Password</label>
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 rounded-xl linear-primary font-bold shadow-lg hover:shadow-purple-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-5 h-5" />
                                        Save Changes
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
