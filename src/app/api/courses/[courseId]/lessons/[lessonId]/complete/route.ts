import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth.config";
import prisma from "@/lib/prisma";

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ courseId: string; lessonId: string }> }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { courseId, lessonId } = await params;

        // Get user
        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: { id: true }
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Check if user is enrolled
        const enrollment = await prisma.enrollment.findUnique({
            where: {
                userId_courseId: {
                    userId: user.id,
                    courseId: courseId,
                }
            }
        });

        if (!enrollment) {
            return NextResponse.json({ error: "Not enrolled in this course" }, { status: 403 });
        }

        // Check if lesson exists and belongs to this course
        const lesson = await prisma.lesson.findFirst({
            where: {
                id: lessonId,
                section: {
                    courseId: courseId
                }
            }
        });

        if (!lesson) {
            return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
        }

        // Mark lesson as complete (create or update)
        await prisma.enrollmentLesson.upsert({
            where: {
                enrollmentId_lessonId: {
                    enrollmentId: enrollment.id,
                    lessonId: lessonId
                }
            },
            create: {
                enrollmentId: enrollment.id,
                lessonId: lessonId
            },
            update: {
                completedAt: new Date()
            }
        });

        return NextResponse.json({
            success: true,
            message: "Lesson marked as complete"
        });
    } catch (error) {
        console.error("Error completing lesson:", error);
        return NextResponse.json(
            { error: "Failed to complete lesson" },
            { status: 500 }
        );
    }
}
