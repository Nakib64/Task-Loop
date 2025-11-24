"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    CheckCircle2,
    Circle,
    Calendar,
    Edit,
    Trash2,
    Plus
} from "lucide-react";
import { toast } from "sonner";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

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

export default function GoalDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [goal, setGoal] = useState<Goal | null>(null);
    const [loading, setLoading] = useState(true);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const goalId = params?.goalId as string;

    useEffect(() => {
        if (goalId) {
            fetchGoal();
        }
    }, [goalId]);

    const fetchGoal = async () => {
        try {
            const res = await fetch(`/api/goals/${goalId}`);
            const data = await res.json();
            setGoal(data.goal);
        } catch (error) {
            console.error("Error fetching goal:", error);
        } finally {
            setLoading(false);
        }
    };

    const toggleMilestone = async (milestoneId: string) => {
        try {
            const res = await fetch(`/api/milestones/${milestoneId}`, {
                method: "PUT",
            });

            if (res.ok) {
                fetchGoal();
                toast.success("Milestone updated!");
            } else {
                toast.error("Failed to update milestone");
            }
        } catch (error) {
            console.error("Error toggling milestone:", error);
            toast.error("An error occurred while updating milestone");
        }
    };

    const deleteGoal = () => {
        setShowDeleteDialog(true);
    };

    const confirmDelete = async () => {
        try {
            const res = await fetch(`/api/goals/${goalId}`, {
                method: "DELETE",
            });

            if (res.ok) {
                toast.success("Goal deleted successfully!");
                router.push("/dashboard/goals");
            } else {
                toast.error("Failed to delete goal");
            }
        } catch (error) {
            console.error("Error deleting goal:", error);
            toast.error("An error occurred while deleting goal");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex items-center justify-center">
                <div className="text-white text-xl">Loading goal...</div>
            </div>
        );
    }

    if (!goal) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex items-center justify-center">
                <div className="text-white text-xl">Goal not found</div>
            </div>
        );
    }

    const progress =
        goal.milestones.length > 0
            ? Math.round(
                (goal.milestones.filter((m) => m.isCompleted).length /
                    goal.milestones.length) *
                100
            )
            : 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white p-6 md:p-12">
            <div className="max-w-4xl mx-auto">
                {/* Back button */}
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Goals
                </button>

                {/* Goal Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-effect rounded-3xl border border-white/10 p-8 mb-8"
                >
                    <div className="flex items-start justify-between mb-6">
                        <div className="flex-1">
                            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 bg-gradient-to-r from-purple-500 to-pink-500">
                                {goal.category}
                            </div>
                            <h1 className="text-4xl font-extrabold mb-4">{goal.title}</h1>
                            {goal.description && (
                                <p className="text-gray-300 text-lg">{goal.description}</p>
                            )}
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={deleteGoal}
                                className="p-3 rounded-xl glass-effect border border-red-500/30 hover:bg-red-500/20 transition-colors"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Progress */}
                    <div className="mb-6">
                        <div className="flex justify-between mb-2">
                            <span className="text-sm font-semibold">Overall Progress</span>
                            <span className="text-2xl font-bold linear-text">{progress}%</span>
                        </div>
                        <div className="h-4 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 1 }}
                                className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                            />
                        </div>
                    </div>

                    {/* Meta info */}
                    <div className="flex gap-6 text-sm text-gray-400">
                        {goal.deadline && (
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                Deadline: {new Date(goal.deadline).toLocaleDateString()}
                            </div>
                        )}
                        <div>
                            Created: {new Date(goal.createdAt).toLocaleDateString()}
                        </div>
                    </div>
                </motion.div>

                {/* Milestones */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass-effect rounded-3xl border border-white/10 p-8"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold">
                            Milestones ({goal.milestones.filter((m) => m.isCompleted).length}/
                            {goal.milestones.length})
                        </h2>
                    </div>

                    {goal.milestones.length === 0 ? (
                        <div className="text-center py-12 text-gray-400">
                            <Circle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                            <p>No milestones yet</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {goal.milestones.map((milestone, index) => (
                                <motion.div
                                    key={milestone.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => toggleMilestone(milestone.id)}
                                    className={`flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer ${milestone.isCompleted
                                        ? "bg-green-500/10 border-green-500/30"
                                        : "bg-white/5 border-white/10 hover:border-white/20"
                                        }`}
                                >
                                    {milestone.isCompleted ? (
                                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                                    ) : (
                                        <Circle className="w-6 h-6 text-gray-500 flex-shrink-0" />
                                    )}
                                    <span
                                        className={`flex-1 ${milestone.isCompleted
                                            ? "line-through text-gray-500"
                                            : "text-white"
                                            }`}
                                    >
                                        {milestone.title}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>

                {/* Delete Confirmation Dialog */}
                <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                    <DialogContent className="bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 border-white/20">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-bold text-white">Delete Goal</DialogTitle>
                        </DialogHeader>
                        <div className="text-gray-300 py-4">
                            Are you sure you want to delete this goal? This action cannot be undone.
                        </div>
                        <DialogFooter className="gap-4">
                            <button
                                onClick={() => setShowDeleteDialog(false)}
                                className="flex-1 px-4 py-2 rounded-lg glass-effect border border-white/10 hover:border-white/20 font-semibold text-white"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="flex-1 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 font-bold text-white transition-colors"
                            >
                                Delete
                            </button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
