"use client";

import { motion } from "framer-motion";
import {
    LayoutDashboard,
    CheckSquare,
    TrendingUp,
    Settings,
    LogOut,
    Sparkles,
    Calendar,
    Users,
    Target,
    BookOpen
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

export function Sidebar() {
    const pathname = usePathname();

    const links = [
        { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
        { name: "Goals", href: "/dashboard/goals", icon: Target },
        { name: "Courses", href: "/dashboard/courses", icon: BookOpen },
        { name: "My Tasks", href: "/dashboard/tasks", icon: CheckSquare },
        { name: "Habits", href: "/dashboard/habits", icon: TrendingUp },
        { name: "Calendar", href: "/dashboard/calendar", icon: Calendar },
        { name: "Team", href: "/dashboard/team", icon: Users },
        { name: "Settings", href: "/dashboard/settings", icon: Settings },
    ];

    return (
        <aside className="w-64 h-screen bg-slate-900 border-r border-white/10 flex flex-col fixed left-0 top-0 z-40 hidden md:flex">
            <div className="p-6">
                <Link href="/" className="flex items-center gap-2 mb-8">
                    <div className="w-8 h-8 rounded-lg linear-primary flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold text-white">TaskLoop</span>
                </Link>

                <nav className="space-y-2">
                    {links.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link key={link.href} href={link.href}>
                                <div
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                        ? "bg-purple-600 text-white shadow-lg shadow-purple-500/20"
                                        : "text-gray-400 hover:text-white hover:bg-white/5"
                                        }`}
                                >
                                    <link.icon className="w-5 h-5" />
                                    <span className="font-medium">{link.name}</span>
                                </div>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="mt-auto p-6 border-t border-white/10">
                <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 w-full transition-all"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Sign Out</span>
                </button>
            </div>
        </aside>
    );
}
