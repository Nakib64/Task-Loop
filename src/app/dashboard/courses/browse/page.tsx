"use client";

import { useEffect, useState } from "react";
import { Search, BookOpen } from "lucide-react";
import CourseCard from "@/components/dashboard/courses/CourseCard";
import { toast } from "sonner";

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
    _count: {
        sections: number;
        enrollments: number;
    };
}

export default function BrowseCoursesPage() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const res = await fetch("/api/courses");
            const data = await res.json();
            setCourses(data.courses || []);
            setEnrolledCourseIds(data.enrolledCourseIds || []);
        } catch (error) {
            console.error("Error fetching courses:", error);
            toast.error("Failed to load courses");
        } finally {
            setLoading(false);
        }
    };

    const filteredCourses = courses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDifficulty = selectedDifficulty ? course.difficulty === selectedDifficulty : true;
        return matchesSearch && matchesDifficulty;
    });

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex items-center justify-center">
                <div className="text-white text-xl">Loading courses...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white p-6 md:p-12">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                        Explore <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Micro-Courses</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl">
                        Bite-sized learning modules to help you master new skills quickly.
                        Track your progress and earn achievements.
                    </p>
                </div>

                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search courses..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/5 border border-blue-500/20 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all"
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                        {["Beginner", "Intermediate", "Advanced"].map((diff) => (
                            <button
                                key={diff}
                                onClick={() => setSelectedDifficulty(selectedDifficulty === diff ? null : diff)}
                                className={`px-4 py-2 rounded-xl border transition-all whitespace-nowrap ${selectedDifficulty === diff
                                    ? "bg-blue-500 border-blue-500 text-white shadow-lg shadow-blue-500/30"
                                    : "bg-white/5 border-blue-500/20 text-gray-400 hover:bg-white/10 hover:border-blue-500/40"
                                    }`}
                            >
                                {diff}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Course Grid */}
                {filteredCourses.length === 0 ? (
                    <div className="text-center py-20 glass-effect rounded-3xl border border-blue-500/20">
                        <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-500" />
                        <h3 className="text-2xl font-bold mb-2">No courses found</h3>
                        <p className="text-gray-400">Try adjusting your search or filters</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCourses.map((course, index) => (
                            <CourseCard
                                key={course.id}
                                course={course}
                                index={index}
                                isEnrolled={enrolledCourseIds.includes(course.id)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
