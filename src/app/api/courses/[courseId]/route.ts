import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth.config";
import prisma from "@/lib/prisma";

interface LessonWithUnlock {
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

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ courseId: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        const { courseId } = await params;

        // Fetch course with full curriculum
        const course = await prisma.course.findUnique({
            where: { id: courseId },
            include: {
                author: {
                    select: {
                        name: true,
                        image: true,
                    }
                },
                sections: {
                    include: {
                        lessons: {
                            orderBy: { order: "asc" }
                        }
                    },
                    orderBy: { order: "asc" }
                },
                _count: {
                    select: {
                        enrollments: true,
                    }
                }
            },
        });

        if (!course) {
            return NextResponse.json({ error: "Course not found" }, { status: 404 });
        }

        let isEnrolled = false;
        let completedLessonIds: string[] = [];
        let lessonsWithStatus: LessonWithUnlock[] = [];

        // Flatten all lessons across sections
        const allLessons = course.sections.flatMap(section =>
            section.lessons.map(lesson => ({
                ...lesson,
                sectionTitle: section.title,
                sectionOrder: section.order
            }))
        ).sort((a, b) => {
            if (a.sectionOrder !== b.sectionOrder) {
                return a.sectionOrder - b.sectionOrder;
            }
            return a.order - b.order;
        });

        // Check enrollment and progress
        if (session?.user?.email) {
            const user = await prisma.user.findUnique({
                where: { email: session.user.email },
                select: { id: true }
            });

            if (user) {
                const enrollment = await prisma.enrollment.findUnique({
                    where: {
                        userId_courseId: {
                            userId: user.id,
                            courseId: course.id,
                        }
                    },
                    include: {
                        completedLessons: {
                            select: { lessonId: true }
                        }
                    }
                });

                if (enrollment) {
                    isEnrolled = true;
                    completedLessonIds = enrollment.completedLessons.map(cl => cl.lessonId);

                    // Calculate unlock status for each lesson
                    lessonsWithStatus = allLessons.map((lesson, index) => {
                        const isCompleted = completedLessonIds.includes(lesson.id);

                        // First lesson is always unlocked
                        if (index === 0) {
                            return {
                                id: lesson.id,
                                title: lesson.title,
                                content: lesson.content,
                                videoUrl: lesson.videoUrl,
                                order: lesson.order,
                                sectionId: lesson.sectionId,
                                sectionTitle: lesson.sectionTitle,
                                sectionOrder: lesson.sectionOrder,
                                isUnlocked: true,
                                isCompleted
                            };
                        }

                        // Check if all previous lessons are completed
                        const previousLessons = allLessons.slice(0, index);
                        const allPreviousCompleted = previousLessons.every(
                            prevLesson => completedLessonIds.includes(prevLesson.id)
                        );

                        return {
                            id: lesson.id,
                            title: lesson.title,
                            content: lesson.content,
                            videoUrl: lesson.videoUrl,
                            order: lesson.order,
                            sectionId: lesson.sectionId,
                            sectionTitle: lesson.sectionTitle,
                            sectionOrder: lesson.sectionOrder,
                            isUnlocked: allPreviousCompleted,
                            isCompleted
                        };
                    });
                }
            }
        }

        return NextResponse.json({
            course,
            isEnrolled,
            completedLessonIds,
            lessons: lessonsWithStatus
        });
    } catch (error) {
        console.error("Error fetching course:", error);
        return NextResponse.json(
            { error: "Failed to fetch course" },
            { status: 500 }
        );
    }
}

