import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth.config";
import prisma from "@/lib/prisma";

// GET - Fetch activity feed (for followed users)
export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            include: {
                following: {
                    select: {
                        followingId: true,
                    },
                },
            },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const followingIds = user.following.map((f) => f.followingId);

        // Fetch activities from followed users
        const activities = await prisma.activityLog.findMany({
            where: {
                userId: {
                    in: [...followingIds, user.id], // Include own activities
                },
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                    },
                },
            },
            orderBy: { createdAt: "desc" },
            take: 50,
        });

        return NextResponse.json({ activities });
    } catch (error) {
        console.error("Error fetching activity feed:", error);
        return NextResponse.json(
            { error: "Failed to fetch activity feed" },
            { status: 500 }
        );
    }
}
