import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth.config";
import prisma from "@/lib/prisma";

// GET - Fetch a single goal
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ goalId: string }> }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { goalId } = await params;

        const goal = await prisma.goal.findUnique({
            where: { id: goalId },
            include: {
                milestones: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });

        if (!goal) {
            return NextResponse.json({ error: "Goal not found" }, { status: 404 });
        }

        // Check if user owns this goal
        if (goal.user.email !== session.user.email) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        return NextResponse.json({ goal });
    } catch (error) {
        console.error("Error fetching goal:", error);
        return NextResponse.json(
            { error: "Failed to fetch goal" },
            { status: 500 }
        );
    }
}

// PUT - Update a goal
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ goalId: string }> }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { goalId } = await params;

        const goal = await prisma.goal.findUnique({
            where: { id: goalId },
            include: { user: true },
        });

        if (!goal) {
            return NextResponse.json({ error: "Goal not found" }, { status: 404 });
        }

        if (goal.user.email !== session.user.email) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const body = await request.json();
        const { title, description, category, deadline } = body;

        const updatedGoal = await prisma.goal.update({
            where: { id: goalId },
            data: {
                title: title || goal.title,
                description: description !== undefined ? description : goal.description,
                category: category || goal.category,
                deadline: deadline ? new Date(deadline) : goal.deadline,
            },
            include: {
                milestones: true,
            },
        });

        return NextResponse.json({ goal: updatedGoal });
    } catch (error) {
        console.error("Error updating goal:", error);
        return NextResponse.json(
            { error: "Failed to update goal" },
            { status: 500 }
        );
    }
}

// DELETE - Delete a goal
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ goalId: string }> }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { goalId } = await params;

        const goal = await prisma.goal.findUnique({
            where: { id: goalId },
            include: { user: true },
        });

        if (!goal) {
            return NextResponse.json({ error: "Goal not found" }, { status: 404 });
        }

        if (goal.user.email !== session.user.email) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        await prisma.goal.delete({
            where: { id: goalId },
        });

        return NextResponse.json({ message: "Goal deleted successfully" });
    } catch (error) {
        console.error("Error deleting goal:", error);
        return NextResponse.json(
            { error: "Failed to delete goal" },
            { status: 500 }
        );
    }
}
