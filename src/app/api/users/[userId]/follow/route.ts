import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth.config";
import prisma from "@/lib/prisma";

// POST - Follow a user
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ userId: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        const { userId } = await params;

        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const currentUser = await prisma.user.findUnique({
            where: { email: session.user.email }
        });

        if (!currentUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        if (currentUser.id === userId) {
            return NextResponse.json(
                { error: "Cannot follow yourself" },
                { status: 400 }
            );
        }

        // Check if already following
        const existing = await prisma.follows.findUnique({
            where: {
                followerId_followingId: {
                    followerId: currentUser.id,
                    followingId: userId,
                },
            },
        });

        if (existing) {
            return NextResponse.json(
                { error: "Already following" },
                { status: 400 }
            );
        }

        await prisma.follows.create({
            data: {
                followerId: currentUser.id,
                followingId: userId,
            },
        });

        // Create notification for the followed user
        await prisma.notification.create({
            data: {
                userId: userId,
                type: "FOLLOW",
                message: `${currentUser.name || "Someone"} started following you`,
                link: `/users/${currentUser.id}`,
            },
        });

        return NextResponse.json({ message: "Followed successfully" });
    } catch (error) {
        console.error("Error following user:", error);
        return NextResponse.json(
            { error: "Failed to follow user" },
            { status: 500 }
        );
    }
}

// DELETE - Unfollow a user
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ userId: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        const { userId } = await params;

        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const currentUser = await prisma.user.findUnique({
            where: { email: session.user.email }
        });

        if (!currentUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        await prisma.follows.delete({
            where: {
                followerId_followingId: {
                    followerId: currentUser.id,
                    followingId: userId,
                },
            },
        });

        return NextResponse.json({ message: "Unfollowed successfully" });
    } catch (error) {
        console.error("Error unfollowing user:", error);
        return NextResponse.json(
            { error: "Failed to unfollow user" },
            { status: 500 }
        );
    }
}
