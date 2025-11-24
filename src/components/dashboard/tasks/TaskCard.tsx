import { motion } from "framer-motion";
import { Calendar, Tag, Trash2 } from "lucide-react";

interface Task {
    id: string;
    title: string;
    description: string | null;
    status: string;
    priority: string;
    dueDate: string | null;
    tags: string[];
}

interface TaskCardProps {
    task: Task;
    index: number;
    onUpdateStatus: (taskId: string, newStatus: string) => void;
    onDelete: (taskId: string) => void;
}

export default function TaskCard({ task, index, onUpdateStatus, onDelete }: TaskCardProps) {
    const getPriorityColor = (priority: string) => {
        const colors: Record<string, string> = {
            LOW: "from-green-500 to-emerald-500",
            MEDIUM: "from-orange-500 to-yellow-500",
            HIGH: "from-red-500 to-pink-500",
        };
        return colors[priority] || "from-gray-500 to-gray-600";
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`p-6 rounded-2xl glass-effect border transition-all ${task.status === "COMPLETED"
                ? "border-green-500/30 bg-green-500/5"
                : "border-white/10 hover:border-white/20"
                }`}
        >
            <div className="flex items-start gap-4">
                {/* Status Dropdown */}
                <select
                    value={task.status}
                    onChange={(e) => onUpdateStatus(task.id, e.target.value)}
                    className={`px-3 py-2 rounded-lg border font-semibold text-sm transition-all cursor-pointer ${task.status === "COMPLETED"
                        ? "bg-green-500/20 border-green-500/50 text-green-400"
                        : task.status === "IN_PROGRESS"
                            ? "bg-blue-500/20 border-blue-500/50 text-blue-400"
                            : "bg-gray-500/20 border-gray-500/50 text-gray-400"
                        }`}
                >
                    <option value="TODO" className="bg-slate-900">To Do</option>
                    <option value="IN_PROGRESS" className="bg-slate-900">In Progress</option>
                    <option value="COMPLETED" className="bg-slate-900">Completed</option>
                </select>

                <div className="flex-1">
                    <h3
                        className={`text-xl font-bold mb-2 ${task.status === "COMPLETED" ? "line-through text-gray-500" : ""
                            }`}
                    >
                        {task.title}
                    </h3>
                    {task.description && (
                        <p className="text-gray-400 text-sm mb-4">{task.description}</p>
                    )}

                    <div className="flex flex-wrap items-center gap-3 text-sm">
                        <span className={`px-3 py-1 rounded-full bg-gradient-to-r ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                        </span>

                        {task.dueDate && (
                            <span className="flex items-center gap-1 text-gray-400">
                                <Calendar className="w-4 h-4" />
                                {new Date(task.dueDate).toLocaleDateString()}
                            </span>
                        )}

                        {task.tags.length > 0 && (
                            <div className="flex items-center gap-1">
                                <Tag className="w-4 h-4 text-gray-400" />
                                {task.tags.map((tag, i) => (
                                    <span key={i} className="text-gray-400">
                                        {tag}
                                        {i < task.tags.length - 1 && ","}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <button
                    onClick={() => onDelete(task.id)}
                    className="p-2 rounded-lg hover:bg-red-500/20 transition-colors"
                >
                    <Trash2 className="w-5 h-5 text-red-500" />
                </button>
            </div>
        </motion.div>
    );
}
