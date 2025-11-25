"use client";

import { useSession } from "next-auth/react";
import { Search } from "lucide-react";
import { NotificationBell } from "@/components/NotificationBell";

export function Header() {
    const { data: session } = useSession();

    return (
        <header className="h-16 border-b border-blue-500/20 bg-slate-900/80 backdrop-blur-xl items-center justify-between px-6 sticky top-0 z-30 hidden md:flex">
            <div className="flex items-center gap-4 w-full max-w-xl">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search tasks, projects, or tags..."
                        className="w-full bg-white/5 border border-blue-500/20 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <NotificationBell />

                <div className="flex items-center gap-3 pl-4 border-l border-blue-500/20">
                    <div className="text-right hidden sm:block">
                        <div className="text-sm font-medium text-white">{session?.user?.name}</div>
                        <div className="text-xs text-gray-400">{session?.user?.email}</div>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/30">
                        {session?.user?.name?.[0]?.toUpperCase() || "U"}
                    </div>
                </div>
            </div>
        </header>
    );
}
