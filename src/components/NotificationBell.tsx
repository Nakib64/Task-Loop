"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, CheckCheck } from "lucide-react";
import Link from "next/link";

interface Notification {
    id: string;
    type: string;
    message: string;
    isRead: boolean;
    createdAt: string;
    link: string | null;
}

export function NotificationBell() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNotifications();
        // Poll for new notifications every 30 seconds
        const interval = setInterval(fetchNotifications, 30000);
        return () => clearInterval(interval);
    }, []);

    const fetchNotifications = async () => {
        try {
            const res = await fetch("/api/notifications");
            const data = await res.json();
            setNotifications(data.notifications || []);
            setUnreadCount(data.unreadCount || 0);
        } catch (error) {
            console.error("Error fetching notifications:", error);
        } finally {
            setLoading(false);
        }
    };

    const markAllAsRead = async () => {
        try {
            await fetch("/api/notifications", {
                method: "PUT",
            });
            fetchNotifications();
        } catch (error) {
            console.error("Error marking notifications as read:", error);
        }
    };

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case "FOLLOW":
                return "👤";
            case "COURSE_UPDATE":
                return "📚";
            case "DEADLINE":
                return "⏰";
            default:
                return "🔔";
        }
    };

    return (
        <div className="relative">
            {/* Bell Icon */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-3 rounded-xl glass-effect border border-white/10 hover:border-white/20 transition-all"
            >
                <Bell className="w-6 h-6 text-white" />
                {unreadCount > 0 && (
                    <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold"
                    >
                        {unreadCount > 9 ? "9+" : unreadCount}
                    </motion.span>
                )}
            </button>

            {/* Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <div
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-40"
                        />

                        {/* Notification Panel */}
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute right-0 mt-2 w-96 max-h-[32rem] overflow-y-auto glass-effect rounded-2xl border border-white/20 shadow-2xl z-50"
                        >
                            {/* Header */}
                            <div className="sticky top-0 bg-slate-900/95 backdrop-blur-sm p-4 border-b border-white/10 flex items-center justify-between">
                                <h3 className="font-bold text-lg">Notifications</h3>
                                <div className="flex items-center gap-2">
                                    {unreadCount > 0 && (
                                        <button
                                            onClick={markAllAsRead}
                                            className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1"
                                        >
                                            <CheckCheck className="w-4 h-4" />
                                            Mark all read
                                        </button>
                                    )}
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Notifications List */}
                            <div className="p-2">
                                {loading ? (
                                    <div className="text-center py-12 text-gray-400">
                                        Loading...
                                    </div>
                                ) : notifications.length === 0 ? (
                                    <div className="text-center py-12 text-gray-400">
                                        <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                        <p>No notifications yet</p>
                                    </div>
                                ) : (
                                    notifications.map((notification) => (
                                        <Link
                                            key={notification.id}
                                            href={notification.link || "#"}
                                            onClick={() => setIsOpen(false)}
                                            className={`block p-4 rounded-xl mb-2 transition-all hover:bg-white/10 ${!notification.isRead
                                                    ? "bg-purple-500/10 border border-purple-500/30"
                                                    : "bg-white/5"
                                                }`}
                                        >
                                            <div className="flex gap-3">
                                                <div className="text-2xl flex-shrink-0">
                                                    {getNotificationIcon(notification.type)}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm text-white mb-1">
                                                        {notification.message}
                                                    </p>
                                                    <p className="text-xs text-gray-400">
                                                        {new Date(notification.createdAt).toLocaleString()}
                                                    </p>
                                                </div>
                                                {!notification.isRead && (
                                                    <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0 mt-2" />
                                                )}
                                            </div>
                                        </Link>
                                    ))
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
