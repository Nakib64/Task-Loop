"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Plus, X, Calendar, Target } from "lucide-react";

export default function CreateGoalPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "Tech",
        deadline: "",
    });
    const [milestones, setMilestones] = useState<string[]>([""]);

    const categories = ["Tech", "Design", "Language", "Business", "Personal"];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/goals", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    milestones: milestones
                        .filter((m) => m.trim())
                        .map((title) => ({ title })),
                }),
            });

            if (res.ok) {
                router.push("/dashboard/goals");
            } else {
                console.error("Failed to create goal");
            }
        } catch (error) {
            console.error("Error creating goal:", error);
        } finally {
            setLoading(false);
        }
    };

    const addMilestone = () => {
        setMilestones([...milestones, ""]);
    };

    const removeMilestone = (index: number) => {
        setMilestones(milestones.filter((_, i) => i !== index));
    };

    const updateMilestone = (index: number, value: string) => {
        const updated = [...milestones];
        updated[index] = value;
        setMilestones(updated);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white p-6 md:p-12">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-2">
                        Create New <span className="linear-text">Goal</span>
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Set a new learning objective and track your progress
                    </p>
                </motion.div>

                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    onSubmit={handleSubmit}
                    className="glass-effect rounded-3xl border border-white/10 p-8 space-y-6"
                >
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            Goal Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.title}
                            onChange={(e) =>
                                setFormData({ ...formData, title: e.target.value })
                            }
                            placeholder="e.g., Master SQL Basics"
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none transition-colors"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            Description
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({ ...formData, description: e.target.value })
                            }
                            placeholder="Describe your learning goal..."
                            rows={4}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none transition-colors resize-none"
                        />
                    </div>

                    {/* Category and Deadline */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold mb-2">
                                Category <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={formData.category}
                                onChange={(e) =>
                                    setFormData({ ...formData, category: e.target.value })
                                }
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none transition-colors"
                            >
                                {categories.map((cat) => (
                                    <option key={cat} value={cat} className="bg-slate-900">
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                Deadline (Optional)
                            </label>
                            <input
                                type="date"
                                value={formData.deadline}
                                onChange={(e) =>
                                    setFormData({ ...formData, deadline: e.target.value })
                                }
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none transition-colors"
                            />
                        </div>
                    </div>

                    {/* Milestones */}
                    <div>
                        <label className="block text-sm font-semibold mb-3 flex items-center gap-2">
                            <Target className="w-4 h-4" />
                            Milestones
                        </label>
                        <div className="space-y-3">
                            {milestones.map((milestone, index) => (
                                <div key={index} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={milestone}
                                        onChange={(e) => updateMilestone(index, e.target.value)}
                                        placeholder={`Milestone ${index + 1}`}
                                        className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none transition-colors"
                                    />
                                    {milestones.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeMilestone(index)}
                                            className="px-4 py-3 rounded-xl bg-red-500/20 border border-red-500/30 hover:bg-red-500/30 transition-colors"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addMilestone}
                                className="flex items-center gap-2 px-4 py-3 rounded-xl glass-effect border border-white/10 hover:border-white/20 transition-colors w-full justify-center"
                            >
                                <Plus className="w-5 h-5" />
                                Add Milestone
                            </button>
                        </div>
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex gap-4 pt-6">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="flex-1 px-6 py-3 rounded-xl glass-effect border border-white/10 hover:border-white/20 font-semibold transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 px-6 py-3 rounded-xl linear-primary font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                        >
                            {loading ? "Creating..." : "Create Goal"}
                        </button>
                    </div>
                </motion.form>
            </div>
        </div>
    );
}
