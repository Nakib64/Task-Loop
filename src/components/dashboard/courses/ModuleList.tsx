"use client";

import { Lock, PlayCircle, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface LessonWithStatus {
    id: string;
    title: string;
    sectionTitle: string;
    sectionOrder: number;
    order: number;
    isUnlocked: boolean;
    isCompleted: boolean;
}

interface ModuleListProps {
    lessons: LessonWithStatus[];
    currentLessonId: string | null;
    onSelectLesson: (lessonId: string) => void;
}

export default function ModuleList({ lessons, currentLessonId, onSelectLesson }: ModuleListProps) {
    // Group lessons by section
    const groupedLessons = lessons.reduce((acc, lesson) => {
        const sectionKey = `${lesson.sectionOrder}-${lesson.sectionTitle}`;
        if (!acc[sectionKey]) {
            acc[sectionKey] = {
                title: lesson.sectionTitle,
                order: lesson.sectionOrder,
                lessons: []
            };
        }
        acc[sectionKey].lessons.push(lesson);
        return acc;
    }, {} as Record<string, { title: string; order: number; lessons: LessonWithStatus[] }>);

    const sections = Object.values(groupedLessons).sort((a, b) => a.order - b.order);

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Course Modules</h2>

            <div className="space-y-4">
                {sections.map((section, sectionIndex) => (
                    <div
                        key={`${section.order}-${section.title}`}
                        className="glass-effect rounded-xl border border-white/10 overflow-hidden"
                    >
                        <div className="bg-white/5 px-4 py-3 border-b border-white/10">
                            <div className="flex items-center gap-3">
                                <span className="text-gray-500 font-mono text-sm">
                                    Section {section.order}
                                </span>
                                <h3 className="font-bold text-white">{section.title}</h3>
                            </div>
                        </div>

                        <div className="divide-y divide-white/5">
                            {section.lessons.map((lesson, lessonIndex) => {
                                const isCurrent = lesson.id === currentLessonId;
                                const canClick = lesson.isUnlocked;

                                return (
                                    <motion.button
                                        key={lesson.id}
                                        onClick={() => canClick && onSelectLesson(lesson.id)}
                                        disabled={!canClick}
                                        whileHover={canClick ? { x: 4 } : {}}
                                        className={`w-full flex items-center gap-4 p-4 text-left transition-all ${isCurrent
                                                ? "bg-purple-500/20 border-l-4 border-purple-500"
                                                : canClick
                                                    ? "hover:bg-white/5 cursor-pointer"
                                                    : "opacity-60 cursor-not-allowed"
                                            }`}
                                    >
                                        {/* Icon */}
                                        <div className="flex-shrink-0">
                                            {lesson.isCompleted ? (
                                                <CheckCircle2 className="w-6 h-6 text-green-500" />
                                            ) : lesson.isUnlocked ? (
                                                <PlayCircle className="w-6 h-6 text-purple-400" />
                                            ) : (
                                                <Lock className="w-6 h-6 text-gray-500" />
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <p
                                                className={`font-medium truncate ${isCurrent
                                                        ? "text-purple-300"
                                                        : lesson.isUnlocked
                                                            ? "text-white"
                                                            : "text-gray-400"
                                                    }`}
                                            >
                                                {lesson.title}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                Module {sectionIndex + 1}.{lessonIndex + 1}
                                            </p>
                                        </div>

                                        {/* Status Badge */}
                                        {!lesson.isUnlocked && (
                                            <span className="text-xs text-gray-500 uppercase tracking-wider px-2 py-1 rounded-full bg-white/5">
                                                Locked
                                            </span>
                                        )}
                                        {lesson.isCompleted && (
                                            <span className="text-xs text-green-400 uppercase tracking-wider px-2 py-1 rounded-full bg-green-500/10">
                                                Completed
                                            </span>
                                        )}
                                    </motion.button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
