"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Clock, TrendingUp, AlertCircle } from "lucide-react";
import { useSession } from "next-auth/react";

export default function DashboardPage() {
    const { data: session } = useSession();

    const stats = [
        {
            label: "Total Tasks",
            value: "12",
            change: "+2 this week",
            icon: CheckCircle2,
            color: "text-blue-400",
            bg: "bg-blue-500/10"
        },
        {
            label: "In Progress",
            value: "4",
            change: "Active now",
            icon: Clock,
            color: "text-yellow-400",
            bg: "bg-yellow-500/10"
        },
        {
            label: "Completed",
            value: "8",
            change: "+5 this week",
            icon: TrendingUp,
            color: "text-green-400",
            bg: "bg-green-500/10"
        },
        {
            label: "Overdue",
            value: "1",
            change: "Needs attention",
            icon: AlertCircle,
            color: "text-red-400",
            bg: "bg-red-500/10"
        }
    ];

    return (
        <div className="space-y-8 p-6">
            <div>
                <h1 className="text-3xl font-bold mb-2">
                    Welcome back, <span className="linear-text">{session?.user?.name?.split(" ")[0]}</span> 👋
                </h1>
                <p className="text-gray-400">Here's what's happening with your projects today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl ${stat.bg}`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${stat.color === 'text-red-400' ? 'bg-red-500/10 text-red-400' : 'bg-white/5 text-gray-400'}`}>
                                {stat.change}
                            </span>
                        </div>
                        <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                        <p className="text-sm text-gray-400">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 p-6 rounded-2xl bg-white/5 border border-white/10">
                    <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
                    <div className="space-y-6">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="flex items-center gap-4 pb-4 border-b border-white/5 last:border-0 last:pb-0">
                                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold text-sm">
                                    JD
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium">John Doe completed "Update Documentation"</p>
                                    <p className="text-xs text-gray-400">2 hours ago • Project Alpha</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <h2 className="text-xl font-bold mb-6">Upcoming Deadlines</h2>
                    <div className="space-y-4">
                        {[
                            { title: "Design System Review", date: "Today, 2:00 PM", urgent: true },
                            { title: "Client Meeting", date: "Tomorrow, 10:00 AM", urgent: false },
                            { title: "Sprint Planning", date: "Mon, 9:00 AM", urgent: false }
                        ].map((item, i) => (
                            <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-medium text-sm">{item.title}</h4>
                                    {item.urgent && (
                                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                    )}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-400">
                                    <Clock className="w-3 h-3" />
                                    {item.date}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
