"use client";

import { useSession } from "next-auth/react";
import { Search } from "lucide-react";
import { NotificationBell } from "@/components/NotificationBell";

export function Header() {
    const { data: session } = useSession();

    return (
        <header className="h-16 border-b border-white/10 bg-slate-900/50 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-30">
            <div className="flex items-center gap-4 w-full max-w-xl">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search tasks, projects, or tags..."
                        className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <NotificationBell />

                <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                    <div className="text-right hidden sm:block">
                        <div className="text-sm font-medium text-white">{session?.user?.name}</div>
                        <div className="text-xs text-gray-400">{session?.user?.email}</div>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                        {session?.user?.name?.[0]?.toUpperCase() || "U"}
                    </div>
                </div>
            </div>
        </header>
    );
}
