"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
    BookOpen,
    Clock,
    Users,
    ArrowLeft,
    ChevronLeft,
    ChevronRight,
    Loader2
} from "lucide-react";
import { toast } from "sonner";
import LoadingAnimation from "@/components/ui/LoadingAnimation";
import VideoPlayer from "@/components/dashboard/courses/VideoPlayer";
import ModuleList from "@/components/dashboard/courses/ModuleList";

interface LessonWithStatus {
    id: string;
    title: string;
    content: string;
    videoUrl: string | null;
    order: number;
    sectionId: string;
    sectionTitle: string;
    sectionOrder: number;
    isUnlocked: boolean;
    isCompleted: boolean;
}

interface Section {
    id: string;
    title: string;
    order: number;
    lessons: any[];
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
    const [lessons, setLessons] = useState<LessonWithStatus[]>([]);
    const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [enrolling, setEnrolling] = useState(false);
    const [completing, setCompleting] = useState(false);

    const courseId = params?.courseId as string;
    const currentLesson = lessons[currentLessonIndex];

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
                setLessons(data.lessons || []);

                // Set current lesson to first unlocked lesson
                if (data.lessons && data.lessons.length > 0) {
                    const firstUnlocked = data.lessons.findIndex((l: LessonWithStatus) => l.isUnlocked && !l.isCompleted);
                    setCurrentLessonIndex(firstUnlocked >= 0 ? firstUnlocked : 0);
                }
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

    const handleCompleteLesson = async (lessonId: string) => {
        setCompleting(true);
        try {
            const res = await fetch(`/api/courses/${courseId}/lessons/${lessonId}/complete`, {
                method: "POST",
            });

            if (res.ok) {
                toast.success("Lesson completed!");
                // Refresh course data to update unlock status
                await fetchCourse();
            } else {
                const data = await res.json();
                toast.error(data.error || "Failed to complete lesson");
            }
        } catch (error) {
            console.error("Error completing lesson:", error);
            toast.error("An error occurred");
        } finally {
            setCompleting(false);
        }
    };

    const handleNext = async () => {
        if (!currentLesson) return;

        // If current lesson is not completed, mark it as complete
        if (!currentLesson.isCompleted) {
            await handleCompleteLesson(currentLesson.id);
        }

        // Move to next lesson if available
        if (currentLessonIndex < lessons.length - 1) {
            setCurrentLessonIndex(currentLessonIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentLessonIndex > 0) {
            setCurrentLessonIndex(currentLessonIndex - 1);
        }
    };

    const handleSelectLesson = (lessonId: string) => {
        const index = lessons.findIndex(l => l.id === lessonId);
        if (index >= 0 && lessons[index].isUnlocked) {
            setCurrentLessonIndex(index);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex items-center justify-center">
                <div className="text-white text-xl flex items-center gap-3">
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Loading course...
                </div>
            </div>
        );
    }

    if (!course) return null;

    const totalLessons = lessons.length;
    const completedCount = lessons.filter(l => l.isCompleted).length;
    const progress = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

    // Not enrolled view
    if (!isEnrolled) {
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
                            <div className="text-center">
                                <h3 className="text-2xl font-bold mb-2">Start Learning</h3>
                                <p className="text-gray-400 text-sm mb-6">
                                    Enroll now to access all video lessons and track your progress.
                                </p>
                                <button
                                    onClick={handleEnroll}
                                    disabled={enrolling}
                                    className="w-full py-3 rounded-xl linear-primary font-bold shadow-lg hover:shadow-purple-500/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {enrolling ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Enrolling...
                                        </>
                                    ) : (
                                        "Enroll for Free"
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Course Preview */}
                    <div className="glass-effect rounded-2xl border border-white/10 p-6">
                        <h2 className="text-2xl font-bold mb-6">Course Curriculum</h2>
                        <p className="text-gray-400 mb-4">
                            Enroll to unlock {totalLessons} video lessons across {course.sections.length} sections.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // Enrolled view with video player
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white p-6 md:p-12">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Courses
                    </button>

                    {/* Progress Badge */}
                    <div className="glass-effect px-4 py-2 rounded-full border border-white/10">
                        <span className="text-sm font-medium">
                            Progress: <span className="text-purple-400 font-bold">{progress}%</span>
                        </span>
                    </div>
                </div>

                {/* Course Title */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-extrabold mb-2">{course.title}</h1>
                    {currentLesson && (
                        <p className="text-gray-400">
                            Current: <span className="text-purple-300">{currentLesson.title}</span>
                        </p>
                    )}
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content - Video Player */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Video Player */}
                        {currentLesson ? (
                            <VideoPlayer
                                videoUrl={currentLesson.videoUrl}
                                title={currentLesson.title}
                            />
                        ) : (
                            <div className="w-full aspect-video bg-gradient-to-br from-slate-900 to-purple-900 rounded-2xl flex items-center justify-center border border-white/10">
                                <p className="text-white/70">No lesson selected</p>
                            </div>
                        )}

                        {/* Navigation Controls */}
                        <div className="flex items-center justify-between gap-4">
                            <button
                                onClick={handlePrevious}
                                disabled={currentLessonIndex === 0}
                                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed font-medium"
                            >
                                <ChevronLeft className="w-5 h-5" />
                                Previous
                            </button>

                            <div className="text-center">
                                <p className="text-sm text-gray-400">
                                    Lesson {currentLessonIndex + 1} of {totalLessons}
                                </p>
                            </div>

                            <button
                                onClick={handleNext}
                                disabled={completing || currentLessonIndex === lessons.length - 1}
                                className="flex items-center gap-2 px-6 py-3 rounded-xl linear-primary hover:shadow-lg hover:shadow-purple-500/25 transition-all disabled:opacity-30 disabled:cursor-not-allowed font-medium"
                            >
                                {completing ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Completing...
                                    </>
                                ) : (
                                    <>
                                        {currentLesson && !currentLesson.isCompleted ? "Complete & Next" : "Next"}
                                        <ChevronRight className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Lesson Content */}
                        {currentLesson && (
                            <div className="glass-effect rounded-2xl border border-white/10 p-6">
                                <h2 className="text-2xl font-bold mb-4">{currentLesson.title}</h2>
                                <div
                                    className="prose prose-invert max-w-none"
                                    dangerouslySetInnerHTML={{ __html: currentLesson.content }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Sidebar - Module List */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-6">
                            <ModuleList
                                lessons={lessons}
                                currentLessonId={currentLesson?.id || null}
                                onSelectLesson={handleSelectLesson}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
