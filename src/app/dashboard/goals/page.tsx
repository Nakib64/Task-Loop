"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    Target,
    Plus,
    TrendingUp,
    CheckCircle2,
    Circle
} from "lucide-react";
import Link from "next/link";
import GoalCard from "@/components/dashboard/goals/GoalCard";

interface Milestone {
    id: string;
    title: string;
    isCompleted: boolean;
}

interface Goal {
    id: string;
    title: string;
    description: string | null;
    category: string;
    deadline: string | null;
    createdAt: string;
    milestones: Milestone[];
}

export default function GoalsPage() {
    const [goals, setGoals] = useState<Goal[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchGoals();
    }, []);

    const fetchGoals = async () => {
        try {
            const res = await fetch("/api/goals");
            const data = await res.json();
            setGoals(data.goals || []);
        } catch (error) {
            console.error("Error fetching goals:", error);
        } finally {
            setLoading(false);
        }
    };

    const calculateProgress = (milestones: Milestone[]) => {
        if (milestones.length === 0) return 0;
        const completed = milestones.filter((m) => m.isCompleted).length;
        return Math.round((completed / milestones.length) * 100);
    };

    const getCategoryColor = (category: string) => {
        const colors: Record<string, string> = {
            Tech: "from-blue-500 to-cyan-500",
            Design: "from-purple-500 to-pink-500",
            Language: "from-green-500 to-emerald-500",
            Business: "from-orange-500 to-yellow-500",
            Personal: "from-rose-500 to-pink-500",
        };
        return colors[category] || "from-gray-500 to-gray-600";
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex items-center justify-center">
                <div className="text-white text-xl">Loading goals...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white p-6 md:p-12">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-12">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-2">
                            My <span className="linear-text">Learning Goals</span>
                        </h1>
                        <p className="text-gray-400 text-lg">
                            Track your progress and achieve your learning objectives
                        </p>
                    </div>
                    <Link href="/dashboard/goals/create">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-6 py-3 rounded-xl linear-primary font-bold shadow-lg"
                        >
                            <Plus className="w-5 h-5" />
                            New Goal
                        </motion.button>
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid md:grid-cols-4 gap-6 mb-12">
                    {[
                        { label: "Total Goals", value: goals.length, icon: Target },
                        {
                            label: "Completed",
                            value: goals.filter(g => calculateProgress(g.milestones) === 100).length,
                            icon: CheckCircle2
                        },
                        {
                            label: "In Progress",
                            value: goals.filter(g => {
                                const progress = calculateProgress(g.milestones);
                                return progress > 0 && progress < 100;
                            }).length,
                            icon: TrendingUp
                        },
                        {
                            label: "Not Started",
                            value: goals.filter(g => calculateProgress(g.milestones) === 0).length,
                            icon: Circle
                        },
                    ].map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="p-6 rounded-2xl glass-effect border border-white/10"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <stat.icon className="w-6 h-6 text-purple-400" />
                                <span className="text-3xl font-bold">{stat.value}</span>
                            </div>
                            <p className="text-gray-400 text-sm">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Goals Grid */}
                {goals.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20 glass-effect rounded-3xl border border-white/10"
                    >
                        <Target className="w-16 h-16 mx-auto mb-4 text-gray-500" />
                        <h3 className="text-2xl font-bold mb-2">No goals yet</h3>
                        <p className="text-gray-400 mb-6">
                            Create your first learning goal to get started
                        </p>
                        <Link href="/dashboard/goals/create">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-3 rounded-xl linear-primary font-bold"
                            >
                                Create Goal
                            </motion.button>
                        </Link>
                    </motion.div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {goals.map((goal, index) => (
                            <GoalCard key={goal.id} goal={goal} index={index} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
