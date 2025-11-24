import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth.config";
import prisma from "@/lib/prisma";

// GET - Fetch all goals for the logged-in user
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

        const goals = await prisma.goal.findMany({
            where: { userId: user.id },
            include: {
                milestones: true,
            },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json({ goals });
    } catch (error) {
        console.error("Error fetching goals:", error);
        return NextResponse.json(
            { error: "Failed to fetch goals" },
            { status: 500 }
        );
    }
}

// POST - Create a new goal
export async function POST(request: NextRequest) {
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

        const body = await request.json();
        const { title, description, category, deadline, milestones } = body;

        if (!title || !category) {
            return NextResponse.json(
                { error: "Title and category are required" },
                { status: 400 }
            );
        }

        const goal = await prisma.goal.create({
            data: {
                title,
                description,
                category,
                deadline: deadline ? new Date(deadline) : null,
                userId: user.id,
                milestones: {
                    create: milestones?.map((m: { title: string }) => ({
                        title: m.title,
                    })) || [],
                },
            },
            include: {
                milestones: true,
            },
        });

        // Create activity log
        await prisma.activityLog.create({
            data: {
                userId: user.id,
                action: "CREATED_GOAL",
                details: `Created goal: ${title}`,
            },
        });

        return NextResponse.json({ goal }, { status: 201 });
    } catch (error) {
        console.error("Error creating goal:", error);
        return NextResponse.json(
            { error: "Failed to create goal" },
            { status: 500 }
        );
    }
}
