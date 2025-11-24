import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth.config";
import prisma from "@/lib/prisma";

// GET - Fetch all notifications for the logged-in user
export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const notifications = await prisma.notification.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: "desc" },
            take: 50,
        });

        const unreadCount = await prisma.notification.count({
            where: {
                userId: user.id,
                isRead: false,
            },
        });

        return NextResponse.json({ notifications, unreadCount });
    } catch (error) {
        console.error("Error fetching notifications:", error);
        return NextResponse.json(
            { error: "Failed to fetch notifications" },
            { status: 500 }
        );
    }
}

// PUT - Mark all notifications as read
export async function PUT() {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        await prisma.notification.updateMany({
            where: {
                userId: user.id,
                isRead: false,
            },
            data: {
                isRead: true,
            },
        });

        return NextResponse.json({ message: "All notifications marked as read" });
    } catch (error) {
        console.error("Error marking notifications as read:", error);
        return NextResponse.json(
            { error: "Failed to mark notifications as read" },
            { status: 500 }
        );
    }
}
