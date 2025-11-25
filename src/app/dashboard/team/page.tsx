"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, UserPlus, Search, Mail, Calendar, TrendingUp } from "lucide-react";
import LoadingAnimation from "@/components/ui/LoadingAnimation";

interface TeamMember {
    id: string;
    name: string;
    email: string;
    image: string | null;
    joinedAt: string;
    tasksCompleted: number;
    goalsAchieved: number;
}

export default function TeamPage() {
    const [loading, setLoading] = useState(true);
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        // Simulate loading - in real app, fetch from API
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    const filteredMembers = teamMembers.filter(member =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return <LoadingAnimation fullScreen text="Loading team..." />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white p-6 md:p-12">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div>
                        <h1 className="text-4xl font-extrabold mb-2">Team</h1>
                        <p className="text-gray-400">Collaborate with your team members</p>
                    </div>

                    <button className="flex items-center gap-2 px-6 py-3 rounded-xl linear-primary font-bold shadow-lg hover:shadow-purple-500/25 transition-all w-fit">
                        <UserPlus className="w-5 h-5" />
                        Invite Members
                    </button>
                </div>

                {/* Search Bar */}
                <div className="glass-effect rounded-2xl border border-white/10 p-6 mb-8">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search team members..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all"
                        />
                    </div>
                </div>

                {/* Team Members Grid */}
                {filteredMembers.length === 0 ? (
                    <div className="glass-effect rounded-2xl border border-white/10 p-12 text-center">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
                            <Users className="w-10 h-10 text-gray-500" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">No Team Members Yet</h3>
                        <p className="text-gray-400 mb-6">
                            Start collaborating by inviting team members to join your workspace
                        </p>
                        <button className="px-6 py-3 rounded-xl linear-primary font-bold shadow-lg hover:shadow-purple-500/25 transition-all inline-flex items-center gap-2">
                            <UserPlus className="w-5 h-5" />
                            Invite Your First Member
                        </button>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredMembers.map((member, index) => (
                            <motion.div
                                key={member.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="glass-effect rounded-2xl border border-white/10 p-6 hover:border-purple-500/30 transition-all"
                            >
                                {/* Avatar & Name */}
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl font-bold">
                                        {member.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-lg truncate">{member.name}</h3>
                                        <div className="flex items-center gap-1 text-sm text-gray-400">
                                            <Mail className="w-4 h-4" />
                                            <span className="truncate">{member.email}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                                    <div>
                                        <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                                            <TrendingUp className="w-4 h-4" />
                                            Tasks
                                        </div>
                                        <p className="text-2xl font-bold text-purple-400">{member.tasksCompleted}</p>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                                            <Calendar className="w-4 h-4" />
                                            Goals
                                        </div>
                                        <p className="text-2xl font-bold text-green-400">{member.goalsAchieved}</p>
                                    </div>
                                </div>

                                {/* Joined Date */}
                                <div className="mt-4 pt-4 border-t border-white/10">
                                    <p className="text-xs text-gray-500">
                                        Joined {new Date(member.joinedAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
