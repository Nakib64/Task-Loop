import { motion } from "framer-motion";
import { BookOpen, Users, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

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

interface CourseCardProps {
    course: Course;
    index: number;
    isEnrolled: boolean;
}

export default function CourseCard({ course, index, isEnrolled }: CourseCardProps) {
    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty.toLowerCase()) {
            case "beginner": return "text-green-400 bg-green-400/10";
            case "intermediate": return "text-yellow-400 bg-yellow-400/10";
            case "advanced": return "text-red-400 bg-red-400/10";
            default: return "text-gray-400 bg-gray-400/10";
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="group flex flex-col h-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl overflow-hidden hover:border-purple-500/50 transition-all"
        >
            {/* Course Image */}
            <div className="h-48 bg-gray-800 relative overflow-hidden">
                {course.imageUrl ? (
                    <img
                        src={course.imageUrl}
                        alt={course.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900 to-slate-900">
                        <BookOpen className="w-12 h-12 text-white/20" />
                    </div>
                )}
                <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md ${getDifficultyColor(course.difficulty)}`}>
                        {course.difficulty}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-purple-400 transition-colors">
                    {course.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-1">
                    {course.description}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-6">
                    <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{course._count.enrollments} enrolled</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        <span>{course._count.sections} sections</span>
                    </div>
                </div>

                {/* Action */}
                <Link href={`/dashboard/courses/${course.id}`} className="mt-auto">
                    <button className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${isEnrolled
                        ? "bg-green-500/20 text-green-400 border border-green-500/50"
                        : "bg-white/10 hover:bg-white/20 text-white"
                        }`}>
                        {isEnrolled ? (
                            <>
                                <CheckCircle2 className="w-5 h-5" />
                                Continue Learning
                            </>
                        ) : (
                            <>
                                View Course
                                <ArrowRight className="w-5 h-5" />
                            </>
                        )}
                    </button>
                </Link>
            </div>
        </motion.div>
    );
}
