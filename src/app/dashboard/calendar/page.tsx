"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronLeft,
    ChevronRight,
    Plus,
    Calendar as CalendarIcon,
    Clock,
    CheckCircle2,
    Target,
    X
} from "lucide-react";
import { toast } from "sonner";
import AddEventDialog from "@/components/dashboard/calendar/AddEventDialog";

interface CalendarEvent {
    id: string;
    title: string;
    description: string | null;
    startTime: string;
    endTime: string;
    color: string;
    allDay: boolean;
    type: "EVENT";
}

interface Task {
    id: string;
    title: string;
    dueDate: string | null;
    status: string;
    type: "TASK";
}

interface Goal {
    id: string;
    title: string;
    deadline: string | null;
    type: "GOAL";
}

type CalendarItem = CalendarEvent | Task | Goal;

export default function CalendarPage() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [items, setItems] = useState<CalendarItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [showEventModal, setShowEventModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    // New Event Form State
    const [newEventTitle, setNewEventTitle] = useState("");
    const [newEventDesc, setNewEventDesc] = useState("");
    const [newEventStart, setNewEventStart] = useState("");
    const [newEventEnd, setNewEventEnd] = useState("");
    const [newEventColor, setNewEventColor] = useState("purple");

    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        try {
            const [tasksRes, goalsRes, eventsRes] = await Promise.all([
                fetch("/api/tasks"),
                fetch("/api/goals"),
                fetch("/api/calendar")
            ]);

            const tasksData = await tasksRes.json();
            const goalsData = await goalsRes.json();
            const eventsData = await eventsRes.json();

            const formattedTasks = (tasksData.tasks || []).map((t: any) => ({ ...t, type: "TASK" }));
            const formattedGoals = (goalsData.goals || []).map((g: any) => ({ ...g, type: "GOAL" }));
            const formattedEvents = (eventsData.events || []).map((e: any) => ({ ...e, type: "EVENT" }));

            setItems([...formattedTasks, ...formattedGoals, ...formattedEvents]);
        } catch (error) {
            console.error("Error fetching calendar data:", error);
            toast.error("Failed to load calendar data");
        } finally {
            setLoading(false);
        }
    };

    const createEvent = async () => {
        if (!newEventTitle || !newEventStart || !newEventEnd) {
            toast.error("Please fill in all required fields");
            return;
        }

        try {
            const res = await fetch("/api/calendar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: newEventTitle,
                    description: newEventDesc,
                    startTime: newEventStart,
                    endTime: newEventEnd,
                    color: newEventColor,
                }),
            });

            if (res.ok) {
                toast.success("Event created!");
                setShowEventModal(false);
                fetchAllData();
                resetForm();
            } else {
                toast.error("Failed to create event");
            }
        } catch (error) {
            console.error("Error creating event:", error);
            toast.error("An error occurred");
        }
    };

    const resetForm = () => {
        setNewEventTitle("");
        setNewEventDesc("");
        setNewEventStart("");
        setNewEventEnd("");
        setNewEventColor("purple");
    };

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const days = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();
        return { days, firstDay };
    };

    const { days, firstDay } = getDaysInMonth(currentDate);
    const daysArray = Array.from({ length: days }, (_, i) => i + 1);
    const blanksArray = Array.from({ length: firstDay }, (_, i) => i);

    const getItemsForDate = (day: number) => {
        const dateStr = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toISOString().split('T')[0];

        return items.filter(item => {
            let itemDate = "";
            if (item.type === "TASK" && item.dueDate) itemDate = item.dueDate.split('T')[0];
            if (item.type === "GOAL" && item.deadline) itemDate = item.deadline.split('T')[0];
            if (item.type === "EVENT") itemDate = item.startTime.split('T')[0];

            return itemDate === dateStr;
        });
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleDateClick = (day: number) => {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        setSelectedDate(date);

        // Pre-fill start/end time for the modal
        const dateStr = date.toISOString().split('T')[0];
        setNewEventStart(`${dateStr}T09:00`);
        setNewEventEnd(`${dateStr}T10:00`);

        setShowEventModal(true);
    };

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white p-6 md:p-12">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-extrabold mb-2">
                            My <span className="linear-text">Calendar</span>
                        </h1>
                        <p className="text-gray-400">Manage your schedule and deadlines</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setShowEventModal(true)}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl linear-primary font-bold shadow-lg"
                        >
                            <Plus className="w-5 h-5" />
                            Add Event
                        </button>
                    </div>
                </div>

                {/* Calendar Controls */}
                <div className="glass-effect rounded-3xl border border-white/10 p-6 mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold">
                            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                        </h2>
                        <div className="flex gap-2">
                            <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-7 gap-4 mb-4 text-center text-gray-400 font-semibold">
                        <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
                    </div>
                    <div className="grid grid-cols-7 gap-4">
                        {blanksArray.map((_, i) => (
                            <div key={`blank-${i}`} className="h-32 rounded-xl bg-white/5 border border-white/5 opacity-50" />
                        ))}
                        {daysArray.map((day) => {
                            const dayItems = getItemsForDate(day);
                            const isToday =
                                day === new Date().getDate() &&
                                currentDate.getMonth() === new Date().getMonth() &&
                                currentDate.getFullYear() === new Date().getFullYear();

                            return (
                                <motion.div
                                    key={day}
                                    whileHover={{ scale: 1.02 }}
                                    onClick={() => handleDateClick(day)}
                                    className={`h-32 p-3 rounded-xl border transition-all cursor-pointer overflow-y-auto scrollbar-hide ${isToday
                                        ? "bg-purple-500/20 border-purple-500"
                                        : "bg-white/5 border-white/10 hover:border-white/30"
                                        }`}
                                >
                                    <div className={`text-sm font-bold mb-2 ${isToday ? "text-purple-400" : "text-gray-400"}`}>
                                        {day}
                                    </div>
                                    <div className="space-y-1">
                                        {dayItems.map((item) => (
                                            <div
                                                key={`${item.type}-${item.id}`}
                                                className={`text-xs p-1.5 rounded-md truncate ${item.type === "TASK" ? "bg-blue-500/20 text-blue-300 border border-blue-500/30" :
                                                    item.type === "GOAL" ? "bg-pink-500/20 text-pink-300 border border-pink-500/30" :
                                                        "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                                                    }`}
                                            >
                                                {item.title}
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Add Event Modal */}
                <AddEventDialog
                    open={showEventModal}
                    onOpenChange={setShowEventModal}
                    newEventTitle={newEventTitle}
                    setNewEventTitle={setNewEventTitle}
                    newEventDesc={newEventDesc}
                    setNewEventDesc={setNewEventDesc}
                    newEventStart={newEventStart}
                    setNewEventStart={setNewEventStart}
                    newEventEnd={newEventEnd}
                    setNewEventEnd={setNewEventEnd}
                    createEvent={createEvent}
                />
            </div>
        </div>
    );
}
