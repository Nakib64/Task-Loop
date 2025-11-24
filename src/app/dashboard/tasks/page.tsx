"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    Plus,
    CheckSquare,
    Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import TaskCard from "@/components/dashboard/tasks/TaskCard";

interface Task {
    id: string;
    title: string;
    description: string | null;
    status: string;
    priority: string;
    dueDate: string | null;
    tags: string[];
    createdAt: string;
}

export default function TasksPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("ALL");
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newTask, setNewTask] = useState({
        title: "",
        description: "",
        priority: "MEDIUM",
        dueDate: "",
        tags: "",
    });

    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const res = await fetch("/api/tasks");
            const data = await res.json();
            setTasks(data.tasks || []);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        } finally {
            setLoading(false);
        }
    };

    const createTask = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/tasks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...newTask,
                    tags: newTask.tags.split(",").map((t) => t.trim()).filter(Boolean),
                }),
            });

            if (res.ok) {
                setNewTask({ title: "", description: "", priority: "MEDIUM", dueDate: "", tags: "" });
                setShowCreateModal(false);
                fetchTasks();
                toast.success("Task created successfully!");
            } else {
                toast.error("Failed to create task");
            }
        } catch (error) {
            console.error("Error creating task:", error);
            toast.error("An error occurred while creating the task");
        }
    };

    const updateTaskStatus = async (taskId: string, newStatus: string) => {
        try {
            const res = await fetch(`/api/tasks/${taskId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });

            if (res.ok) {
                fetchTasks();
                const statusMessages: Record<string, string> = {
                    COMPLETED: "Task marked as completed!",
                    TODO: "Task moved to To Do",
                    IN_PROGRESS: "Task marked as in progress",
                };
                toast.success(statusMessages[newStatus] || "Task updated");
            } else {
                toast.error("Failed to update task status");
            }
        } catch (error) {
            console.error("Error updating task:", error);
            toast.error("An error occurred while updating the task");
        }
    };

    const deleteTask = (taskId: string) => {
        setTaskToDelete(taskId);
        setShowDeleteDialog(true);
    };

    const confirmDelete = async () => {
        if (!taskToDelete) return;

        try {
            const res = await fetch(`/api/tasks/${taskToDelete}`, { method: "DELETE" });

            if (res.ok) {
                fetchTasks();
                toast.success("Task deleted successfully!");
                setShowDeleteDialog(false);
                setTaskToDelete(null);
            } else {
                toast.error("Failed to delete task");
            }
        } catch (error) {
            console.error("Error deleting task:", error);
            toast.error("An error occurred while deleting the task");
        }
    };

    const filteredTasks = tasks.filter((task) => {
        if (filter === "ALL") return true;
        return task.status === filter;
    });

    const getPriorityColor = (priority: string) => {
        const colors: Record<string, string> = {
            LOW: "from-green-500 to-emerald-500",
            MEDIUM: "from-orange-500 to-yellow-500",
            HIGH: "from-red-500 to-pink-500",
        };
        return colors[priority] || "from-gray-500 to-gray-600";
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex items-center justify-center">
                <div className="text-white text-xl">Loading tasks...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white p-6 md:p-12">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-2">
                            My <span className="linear-text">Tasks</span>
                        </h1>
                        <p className="text-gray-400 text-lg">
                            Stay organized and productive
                        </p>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowCreateModal(true)}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl linear-primary font-bold shadow-lg"
                    >
                        <Plus className="w-5 h-5" />
                        New Task
                    </motion.button>
                </div>

                {/* Stats */}
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                    {[
                        { label: "All", value: tasks.length, filter: "ALL" },
                        { label: "To Do", value: tasks.filter((t) => t.status === "TODO").length, filter: "TODO" },
                        { label: "In Progress", value: tasks.filter((t) => t.status === "IN_PROGRESS").length, filter: "IN_PROGRESS" },
                        { label: "Completed", value: tasks.filter((t) => t.status === "COMPLETED").length, filter: "COMPLETED" },
                    ].map((stat, idx) => (
                        <button
                            key={idx}
                            onClick={() => setFilter(stat.filter)}
                            className={`p-6 rounded-2xl border transition-all ${filter === stat.filter
                                ? "glass-effect border-purple-500"
                                : "glass-effect border-white/10 hover:border-white/20"
                                }`}
                        >
                            <div className="text-3xl font-bold mb-2">{stat.value}</div>
                            <div className="text-sm text-gray-400">{stat.label}</div>
                        </button>
                    ))}
                </div>

                {/* Tasks List */}
                {filteredTasks.length === 0 ? (
                    <div className="text-center py-20 glass-effect rounded-3xl border border-white/10">
                        <CheckSquare className="w-16 h-16 mx-auto mb-4 text-gray-500" />
                        <h3 className="text-2xl font-bold mb-2">No tasks found</h3>
                        <p className="text-gray-400">Create your first task to get started</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredTasks.map((task, index) => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                index={index}
                                onUpdateStatus={updateTaskStatus}
                                onDelete={deleteTask}
                            />
                        ))}
                    </div>
                )}

                {/* Create Modal */}
                <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
                    <DialogContent className="sm:max-w-2xl bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 border-white/20">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold text-white">Create New Task</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={createTask} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-white">
                                    Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={newTask.title}
                                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none text-white"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2 text-white">Description</label>
                                <textarea
                                    value={newTask.description}
                                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                                    rows={3}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none resize-none text-white"
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-2 text-white">Priority</label>
                                    <select
                                        value={newTask.priority}
                                        onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none text-white"
                                    >
                                        <option value="LOW" className="bg-slate-900">Low</option>
                                        <option value="MEDIUM" className="bg-slate-900">Medium</option>
                                        <option value="HIGH" className="bg-slate-900">High</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2 text-white">Due Date</label>
                                    <input
                                        type="date"
                                        value={newTask.dueDate}
                                        onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none text-white"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2 text-white">Tags (comma separated)</label>
                                <input
                                    type="text"
                                    value={newTask.tags}
                                    onChange={(e) => setNewTask({ ...newTask, tags: e.target.value })}
                                    placeholder="work, urgent, personal"
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none text-white placeholder:text-gray-400"
                                />
                            </div>

                            <DialogFooter className="gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowCreateModal(false)}
                                    className="flex-1 px-6 py-3 rounded-xl glass-effect border border-white/10 hover:border-white/20 font-semibold text-white"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-6 py-3 rounded-xl linear-primary font-bold"
                                >
                                    Create Task
                                </button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>

                {/* Delete Confirmation Dialog */}
                <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                    <DialogContent className="bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 border-white/20">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-bold text-white">Delete Task</DialogTitle>
                        </DialogHeader>
                        <div className="text-gray-300 py-4">
                            Are you sure you want to delete this task? This action cannot be undone.
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
