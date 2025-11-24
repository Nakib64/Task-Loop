import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth.config";
import prisma from "@/lib/prisma";

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
                }
            }
        }

        return NextResponse.json({
            course,
            isEnrolled,
            completedLessonIds
        });
    } catch (error) {
        console.error("Error fetching course:", error);
        return NextResponse.json(
            { error: "Failed to fetch course" },
            { status: 500 }
        );
    }
}
