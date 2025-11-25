"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Home,
    CheckSquare,
    Target,
    BookOpen,
    Calendar,
    Dumbbell,
    Settings,
    ChevronRight,
    GraduationCap,
    LogOut,
    Menu,
    X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

// Navigation items
const navItems = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: Home,
    },
    {
        title: "Tasks",
        url: "/dashboard/tasks",
        icon: CheckSquare,
    },
    {
        title: "Goals",
        url: "/dashboard/goals",
        icon: Target,
        items: [
            {
                title: "My Goals",
                url: "/dashboard/goals",
            },
            {
                title: "Create Goal",
                url: "/dashboard/goals/create",
            },
        ],
    },
    {
        title: "Courses",
        url: "/dashboard/courses",
        icon: BookOpen,
        items: [
            {
                title: "My Courses",
                url: "/dashboard/courses",
            },
            {
                title: "Browse Courses",
                url: "/dashboard/courses/browse",
            },
        ],
    },
    {
        title: "Calendar",
        url: "/dashboard/calendar",
        icon: Calendar,
    },
    {
        title: "Habits",
        url: "/dashboard/habits",
        icon: Dumbbell,
    },
    {
        title: "Settings",
        url: "/dashboard/settings",
        icon: Settings,
    },
];

export function AppSidebar() {
    const pathname = usePathname();
    const [openItems, setOpenItems] = React.useState<string[]>([]);
    const [isMobileOpen, setIsMobileOpen] = React.useState(false);

    const toggleItem = (title: string) => {
        setOpenItems((prev) =>
            prev.includes(title)
                ? prev.filter((item) => item !== title)
                : [...prev, title]
        );
    };

    const closeMobile = () => setIsMobileOpen(false);

    const SidebarContent = ({ mobile = false }: { mobile?: boolean }) => (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="border-b border-blue-500/20 p-6 bg-linear-to-r from-blue-900/30 to-cyan-900/30">
                <Link
                    href="/"
                    className="flex items-center gap-3"
                    onClick={mobile ? closeMobile : undefined}
                >
                    <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/50">
                        <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">TaskLoop</h2>
                        <p className="text-xs text-blue-300">Learning Platform</p>
                    </div>
                </Link>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-1">
                    <p className="px-3 py-2 text-xs font-semibold text-blue-400/60 uppercase tracking-wider">
                        Navigation
                    </p>
                    {navItems.map((item) => {
                        const isActive =
                            pathname === item.url || pathname.startsWith(item.url + "/");
                        const hasSubItems = item.items && item.items.length > 0;
                        const isOpen = openItems.includes(item.title);

                        return (
                            <div key={item.title}>
                                {hasSubItems ? (
                                    <>
                                        <button
                                            onClick={() => toggleItem(item.title)}
                                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${isActive
                                                    ? "bg-linear-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 border-l-2 border-blue-500"
                                                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                                                }`}
                                        >
                                            {item.icon && <item.icon className="w-5 h-5 flex-shrink-0" />}
                                            <span className="font-medium flex-1 text-left">{item.title}</span>
                                            <ChevronRight
                                                className={`w-4 h-4 transition-transform ${isOpen ? "rotate-90" : ""
                                                    }`}
                                            />
                                        </button>
                                        <AnimatePresence>
                                            {isOpen && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="ml-8 mt-1 space-y-1">
                                                        {item.items.map((subItem) => {
                                                            const isSubActive = pathname === subItem.url;
                                                            return (
                                                                <Link
                                                                    key={subItem.title}
                                                                    href={subItem.url}
                                                                    onClick={mobile ? closeMobile : undefined}
                                                                    className={`block px-3 py-2 rounded-lg text-sm transition-all ${isSubActive
                                                                            ? "bg-linear-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 border-l-2 border-blue-400"
                                                                            : "text-gray-400 hover:bg-white/5 hover:text-blue-200"
                                                                        }`}
                                                                >
                                                                    {subItem.title}
                                                                </Link>
                                                            );
                                                        })}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </>
                                ) : (
                                    <Link
                                        href={item.url}
                                        onClick={mobile ? closeMobile : undefined}
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${isActive
                                                ? "bg-linear-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 border-l-2 border-blue-500"
                                                : "text-gray-300 hover:bg-white/5 hover:text-white"
                                            }`}
                                    >
                                        {item.icon && <item.icon className="w-5 h-5" />}
                                        <span className="font-medium">{item.title}</span>
                                    </Link>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Footer */}
            <div className="border-t border-blue-500/20 p-4 bg-linear-to-r from-blue-900/20 to-cyan-900/20">
                <button
                    onClick={() => {
                        signOut({ callbackUrl: "/" });
                        mobile && closeMobile();
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-all"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Sign Out</span>
                </button>
                <p className="text-xs text-blue-400/60 text-center font-medium mt-3">
                    © 2025 TaskLoop
                </p>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex w-64 h-screen bg-linear-to-b from-slate-950 to-slate-900 border-r border-blue-500/20 flex-col fixed left-0 top-0 z-40">
                <SidebarContent />
            </aside>

            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="md:hidden fixed top-4 left-4 z-50 p-2.5 rounded-xl bg-slate-900/90 backdrop-blur-sm border border-blue-500/20 text-white hover:bg-slate-800 transition-all shadow-lg"
                aria-label="Toggle menu"
            >
                {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {isMobileOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                            onClick={closeMobile}
                        />

                        {/* Sidebar */}
                        <motion.aside
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="md:hidden w-72 h-screen bg-linear-to-b from-slate-950 to-slate-900 border-r border-blue-500/20 flex flex-col fixed left-0 top-0 z-50 shadow-2xl"
                        >
                            <SidebarContent mobile />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
