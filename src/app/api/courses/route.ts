import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth.config";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        const { searchParams } = new URL(request.url);
        const filter = searchParams.get("filter");

        let userId: string | undefined;

        if (session?.user?.email) {
            const user = await prisma.user.findUnique({
                where: { email: session.user.email },
                select: { id: true }
            });
            userId = user?.id;
        }

        let whereClause: any = {};

        if (filter === "enrolled" && userId) {
            whereClause = {
                enrollments: {
                    some: {
                        userId: userId
                    }
                }
            };
        }

        // Fetch courses with author details
        const courses = await prisma.course.findMany({
            where: whereClause,
            include: {
                author: {
                    select: {
                        name: true,
                        image: true,
                    }
                },
                _count: {
                    select: {
                        sections: true,
                        enrollments: true,
                    }
                }
            },
            orderBy: { createdAt: "desc" },
        });

        let enrolledCourseIds: string[] = [];

        // If user is logged in, fetch their enrollments to mark enrolled status
        if (userId) {
            const enrollments = await prisma.enrollment.findMany({
                where: { userId: userId },
                select: { courseId: true }
            });
            enrolledCourseIds = enrollments.map(e => e.courseId);
        }

        return NextResponse.json({
            courses,
            enrolledCourseIds
        });
    } catch (error) {
        console.error("Error fetching courses:", error);
        return NextResponse.json(
            { error: "Failed to fetch courses" },
            { status: 500 }
        );
    }
}
