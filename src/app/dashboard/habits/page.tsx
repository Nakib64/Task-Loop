"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, CheckCircle2, Circle, TrendingUp, Flame } from "lucide-react";

interface HabitLog {
    id: string;
    date: string;
    completed: boolean;
}

interface Habit {
    id: string;
    name: string;
    description: string | null;
    frequency: string;
    goal: number;
    logs: HabitLog[];
}

export default function HabitsPage() {
    const [habits, setHabits] = useState<Habit[]>([]);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newHabit, setNewHabit] = useState({
        name: "",
        description: "",
        frequency: "DAILY",
        goal: 1,
    });

    useEffect(() => {
        fetchHabits();
    }, []);

    const fetchHabits = async () => {
        try {
            const res = await fetch("/api/habits");
            const data = await res.json();
            setHabits(data.habits || []);
        } catch (error) {
            console.error("Error fetching habits:", error);
        } finally {
            setLoading(false);
        }
    };

    const createHabit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/habits", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newHabit),
            });

            if (res.ok) {
                setNewHabit({ name: "", description: "", frequency: "DAILY", goal: 1 });
                setShowCreateModal(false);
                fetchHabits();
            }
        } catch (error) {
            console.error("Error creating habit:", error);
        }
    };

    const toggleHabitLog = async (habitId: string, date: string) => {
        try {
            await fetch(`/api/habits/${habitId}/log`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ date }),
            });
            fetchHabits();
        } catch (error) {
            console.error("Error logging habit:", error);
        }
    };

    const getStreak = (logs: HabitLog[]) => {
        if (logs.length === 0) return 0;

        const sortedLogs = [...logs].sort((a, b) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        let streak = 0;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (let i = 0; i < sortedLogs.length; i++) {
            const logDate = new Date(sortedLogs[i].date);
            logDate.setHours(0, 0, 0, 0);

            const diff = Math.floor((today.getTime() - logDate.getTime()) / (1000 * 60 * 60 * 24));

            if (diff === streak) {
                streak++;
            } else {
                break;
            }
        }

        return streak;
    };

    const getLast7Days = () => {
        const days = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            date.setHours(0, 0, 0, 0);
            days.push(date);
        }
        return days;
    };

    const isLoggedForDate = (logs: HabitLog[], date: Date) => {
        return logs.some((log) => {
            const logDate = new Date(log.date);
            logDate.setHours(0, 0, 0, 0);
            return logDate.getTime() === date.getTime();
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex items-center justify-center">
                <div className="text-white text-xl">Loading habits...</div>
            </div>
        );
    }

    const last7Days = getLast7Days();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white p-6 md:p-12">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-2">
                            My <span className="linear-text">Habits</span>
                        </h1>
                        <p className="text-gray-400 text-lg">
                            Build consistency and track your progress
                        </p>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowCreateModal(true)}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl linear-primary font-bold shadow-lg"
                    >
                        <Plus className="w-5 h-5" />
                        New Habit
                    </motion.button>
                </div>

                {/* Habits List */}
                {habits.length === 0 ? (
                    <div className="text-center py-20 glass-effect rounded-3xl border border-white/10">
                        <TrendingUp className="w-16 h-16 mx-auto mb-4 text-gray-500" />
                        <h3 className="text-2xl font-bold mb-2">No habits yet</h3>
                        <p className="text-gray-400">Create your first habit to start building consistency</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {habits.map((habit, index) => {
                            const streak = getStreak(habit.logs);

                            return (
                                <motion.div
                                    key={habit.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="p-6 rounded-3xl glass-effect border border-white/10 hover:border-white/20 transition-all"
                                >
                                    <div className="flex items-start justify-between mb-6">
                                        <div>
                                            <h3 className="text-2xl font-bold mb-2">{habit.name}</h3>
                                            {habit.description && (
                                                <p className="text-gray-400">{habit.description}</p>
                                            )}
                                            <div className="flex items-center gap-4 mt-2">
                                                <span className="text-sm text-gray-400">
                                                    {habit.frequency}
                                                </span>
                                                <div className="flex items-center gap-2 text-orange-400">
                                                    <Flame className="w-5 h-5" />
                                                    <span className="font-bold">{streak} day streak</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Last 7 Days Grid */}
                                    <div className="grid grid-cols-7 gap-2">
                                        {last7Days.map((date, i) => {
                                            const isLogged = isLoggedForDate(habit.logs, date);
                                            const isToday = date.toDateString() === new Date().toDateString();

                                            return (
                                                <button
                                                    key={i}
                                                    onClick={() => toggleHabitLog(habit.id, date.toISOString())}
                                                    className={`p-4 rounded-xl transition-all ${isLogged
                                                            ? "bg-green-500/20 border-2 border-green-500"
                                                            : "bg-white/5 border-2 border-white/10 hover:border-white/20"
                                                        } ${isToday ? "ring-2 ring-purple-500" : ""}`}
                                                >
                                                    <div className="text-xs text-gray-400 mb-2">
                                                        {date.toLocaleDateString("en-US", { weekday: "short" })}
                                                    </div>
                                                    <div className="flex items-center justify-center">
                                                        {isLogged ? (
                                                            <CheckCircle2 className="w-6 h-6 text-green-500" />
                                                        ) : (
                                                            <Circle className="w-6 h-6 text-gray-500" />
                                                        )}
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}

                {/* Create Modal */}
                {showCreateModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-full max-w-2xl glass-effect rounded-3xl border border-white/20 p-8"
                        >
                            <h3 className="text-2xl font-bold mb-6">Create New Habit</h3>
                            <form onSubmit={createHabit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-2">
                                        Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={newHabit.name}
                                        onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2">Description</label>
                                    <textarea
                                        value={newHabit.description}
                                        onChange={(e) => setNewHabit({ ...newHabit, description: e.target.value })}
                                        rows={3}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none resize-none"
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold mb-2">Frequency</label>
                                        <select
                                            value={newHabit.frequency}
                                            onChange={(e) => setNewHabit({ ...newHabit, frequency: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none"
                                        >
                                            <option value="DAILY" className="bg-slate-900">Daily</option>
                                            <option value="WEEKLY" className="bg-slate-900">Weekly</option>
                                            <option value="MONTHLY" className="bg-slate-900">Monthly</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold mb-2">Goal</label>
                                        <input
                                            type="number"
                                            min="1"
                                            value={newHabit.goal}
                                            onChange={(e) => setNewHabit({ ...newHabit, goal: parseInt(e.target.value) })}
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowCreateModal(false)}
                                        className="flex-1 px-6 py-3 rounded-xl glass-effect border border-white/10 hover:border-white/20 font-semibold"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-6 py-3 rounded-xl linear-primary font-bold"
                                    >
                                        Create Habit
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    );
}
