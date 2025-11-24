"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    BookOpen,
    Clock,
    Users,
    CheckCircle2,
    Circle,
    ChevronDown,
    ChevronUp,
    PlayCircle,
    Lock,
    ArrowLeft
} from "lucide-react";
import { toast } from "sonner";

interface Lesson {
    id: string;
    title: string;
    content: string;
    order: number;
}

interface Section {
    id: string;
    title: string;
    order: number;
    lessons: Lesson[];
}

interface Course {
    id: string;
    title: string;
    description: string;
    difficulty: string;
    imageUrl: string | null;
    author: {
        name: string | null;
        image: string | null;
    };
    sections: Section[];
    _count: {
        enrollments: number;
    };
}

export default function CourseDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [course, setCourse] = useState<Course | null>(null);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedSections, setExpandedSections] = useState<string[]>([]);
    const [enrolling, setEnrolling] = useState(false);

    const courseId = params?.courseId as string;

    useEffect(() => {
        if (courseId) {
            fetchCourse();
        }
    }, [courseId]);

    const fetchCourse = async () => {
        try {
            const res = await fetch(`/api/courses/${courseId}`);
            const data = await res.json();

            if (res.ok) {
                setCourse(data.course);
                setIsEnrolled(data.isEnrolled);
                setCompletedLessonIds(data.completedLessonIds || []);
                // Expand all sections by default
                setExpandedSections(data.course.sections.map((s: Section) => s.id));
            } else {
                toast.error("Failed to load course");
                router.push("/dashboard/courses");
            }
        } catch (error) {
            console.error("Error fetching course:", error);
            toast.error("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const handleEnroll = async () => {
        setEnrolling(true);
        try {
            const res = await fetch(`/api/courses/${courseId}/enroll`, {
                method: "POST",
            });

            if (res.ok) {
                setIsEnrolled(true);
                toast.success("Successfully enrolled!");
                // Refresh to get updated state if needed
                fetchCourse();
            } else {
                const data = await res.json();
                toast.error(data.error || "Failed to enroll");
            }
        } catch (error) {
            console.error("Error enrolling:", error);
            toast.error("An error occurred during enrollment");
        } finally {
            setEnrolling(false);
        }
    };

    const toggleSection = (sectionId: string) => {
        setExpandedSections(prev =>
            prev.includes(sectionId)
                ? prev.filter(id => id !== sectionId)
                : [...prev, sectionId]
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex items-center justify-center">
                <div className="text-white text-xl">Loading course...</div>
            </div>
        );
    }

    if (!course) return null;

    const totalLessons = course.sections.reduce((acc, sec) => acc + sec.lessons.length, 0);
    const completedCount = completedLessonIds.length;
    const progress = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white p-6 md:p-12">
            <div className="max-w-5xl mx-auto">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Courses
                </button>

                {/* Hero Section */}
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="md:col-span-2">
                        <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 bg-purple-500/20 text-purple-300 border border-purple-500/30">
                            {course.difficulty}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">{course.title}</h1>
                        <p className="text-gray-300 text-lg leading-relaxed mb-8">
                            {course.description}
                        </p>

                        <div className="flex items-center gap-6 text-sm text-gray-400">
                            <div className="flex items-center gap-2">
                                <BookOpen className="w-5 h-5 text-purple-400" />
                                <span>{totalLessons} Lessons</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="w-5 h-5 text-blue-400" />
                                <span>{course._count.enrollments} Students</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5 text-green-400" />
                                <span>Self-paced</span>
                            </div>
                        </div>
                    </div>

                    {/* Enrollment Card */}
                    <div className="glass-effect rounded-3xl border border-white/10 p-6 h-fit sticky top-6">
                        {isEnrolled ? (
                            <div className="text-center">
                                <div className="mb-4">
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-gray-400">Your Progress</span>
                                        <span className="font-bold text-purple-400">{progress}%</span>
                                    </div>
                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progress}%` }}
                                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                                        />
                                    </div>
                                </div>
                                <button className="w-full py-3 rounded-xl bg-white/10 text-white font-bold cursor-default">
                                    Enrolled
                                </button>
                            </div>
                        ) : (
                            <div className="text-center">
                                <h3 className="text-2xl font-bold mb-2">Start Learning</h3>
                                <p className="text-gray-400 text-sm mb-6">
                                    Enroll now to track your progress and earn a certificate.
                                </p>
                                <button
                                    onClick={handleEnroll}
                                    disabled={enrolling}
                                    className="w-full py-3 rounded-xl linear-primary font-bold shadow-lg hover:shadow-purple-500/25 transition-all disabled:opacity-50"
                                >
                                    {enrolling ? "Enrolling..." : "Enroll for Free"}
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Curriculum */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold mb-6">Course Curriculum</h2>
                    {course.sections.map((section) => (
                        <div key={section.id} className="glass-effect rounded-xl border border-white/10 overflow-hidden">
                            <button
                                onClick={() => toggleSection(section.id)}
                                className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-gray-500 font-mono text-sm">
                                        Section {section.order}
                                    </span>
                                    <h3 className="font-bold text-lg">{section.title}</h3>
                                </div>
                                {expandedSections.includes(section.id) ? (
                                    <ChevronUp className="w-5 h-5 text-gray-400" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-gray-400" />
                                )}
                            </button>

                            <AnimatePresence>
                                {expandedSections.includes(section.id) && (
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: "auto" }}
                                        exit={{ height: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="border-t border-white/5">
                                            {section.lessons.map((lesson) => (
                                                <div
                                                    key={lesson.id}
                                                    className={`flex items-center gap-4 p-4 border-b border-white/5 last:border-0 ${isEnrolled ? "hover:bg-white/5 cursor-pointer" : "opacity-75"
                                                        }`}
                                                >
                                                    {completedLessonIds.includes(lesson.id) ? (
                                                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                                    ) : isEnrolled ? (
                                                        <PlayCircle className="w-5 h-5 text-purple-400 flex-shrink-0" />
                                                    ) : (
                                                        <Lock className="w-5 h-5 text-gray-500 flex-shrink-0" />
                                                    )}

                                                    <div className="flex-1">
                                                        <p className="font-medium">{lesson.title}</p>
                                                    </div>

                                                    {!isEnrolled && (
                                                        <span className="text-xs text-gray-500 uppercase tracking-wider">
                                                            Locked
                                                        </span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
