import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth.config";
import prisma from "@/lib/prisma";

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ courseId: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        const { courseId } = await params;

        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Check if already enrolled
        const existingEnrollment = await prisma.enrollment.findUnique({
            where: {
                userId_courseId: {
                    userId: user.id,
                    courseId: courseId,
                },
            },
        });

        if (existingEnrollment) {
            return NextResponse.json(
                { error: "Already enrolled in this course" },
                { status: 400 }
            );
        }

        // Create enrollment
        const enrollment = await prisma.enrollment.create({
            data: {
                userId: user.id,
                courseId: courseId,
            },
        });

        // Log activity
        await prisma.activityLog.create({
            data: {
                userId: user.id,
                action: "ENROLLED_COURSE",
                details: `Enrolled in course: ${courseId}`,
            },
        });

        return NextResponse.json({ enrollment }, { status: 201 });
    } catch (error) {
        console.error("Error enrolling in course:", error);
        return NextResponse.json(
            { error: "Failed to enroll in course" },
            { status: 500 }
        );
    }
}
