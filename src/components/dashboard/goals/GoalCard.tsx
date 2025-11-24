import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import Link from "next/link";

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

interface GoalCardProps {
    goal: Goal;
    index: number;
}

export default function GoalCard({ goal, index }: GoalCardProps) {
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

    const progress = calculateProgress(goal.milestones);
    const daysUntilDeadline = goal.deadline
        ? Math.ceil(
            (new Date(goal.deadline).getTime() - Date.now()) /
            (1000 * 60 * 60 * 24)
        )
        : null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group relative p-6 rounded-3xl glass-effect border border-white/10 hover:border-white/30 transition-all cursor-pointer overflow-hidden"
        >
            <Link href={`/dashboard/goals/${goal.id}`}>
                {/* Category badge */}
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 bg-gradient-to-r ${getCategoryColor(goal.category)}`}>
                    {goal.category}
                </div>

                <h3 className="text-2xl font-bold mb-3 group-hover:text-white transition-colors">
                    {goal.title}
                </h3>

                {goal.description && (
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                        {goal.description}
                    </p>
                )}

                {/* Progress bar */}
                <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Progress</span>
                        <span className="font-semibold">{progress}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            className={`h-full bg-gradient-to-r ${getCategoryColor(goal.category)}`}
                        />
                    </div>
                </div>

                {/* Milestones count */}
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                    <span>
                        {goal.milestones.filter((m) => m.isCompleted).length} / {goal.milestones.length} milestones
                    </span>
                    {daysUntilDeadline !== null && (
                        <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {daysUntilDeadline > 0
                                ? `${daysUntilDeadline}d left`
                                : daysUntilDeadline === 0
                                    ? "Due today"
                                    : "Overdue"}
                        </span>
                    )}
                </div>
            </Link>
        </motion.div>
    );
}
