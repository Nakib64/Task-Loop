import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth.config";
import prisma from "@/lib/prisma";

// PUT - Toggle milestone completion
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ milestoneId: string }> }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { milestoneId } = await params;

        const milestone = await prisma.milestone.findUnique({
            where: { id: milestoneId },
            include: {
                goal: {
                    include: {
                        user: true,
                    },
                },
            },
        });

        if (!milestone) {
            return NextResponse.json(
                { error: "Milestone not found" },
                { status: 404 }
            );
        }

        if (milestone.goal.user.email !== session.user.email) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const updatedMilestone = await prisma.milestone.update({
            where: { id: milestoneId },
            data: {
                isCompleted: !milestone.isCompleted,
            },
        });

        // Create activity log if milestone was completed
        if (updatedMilestone.isCompleted) {
            await prisma.activityLog.create({
                data: {
                    userId: milestone.goal.userId,
                    action: "COMPLETED_MILESTONE",
                    details: `Completed milestone: ${milestone.title}`,
                },
            });
        }

        return NextResponse.json({ milestone: updatedMilestone });
    } catch (error) {
        console.error("Error updating milestone:", error);
        return NextResponse.json(
            { error: "Failed to update milestone" },
            { status: 500 }
        );
    }
}

// DELETE - Delete a milestone
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ milestoneId: string }> }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { milestoneId } = await params;

        const milestone = await prisma.milestone.findUnique({
            where: { id: milestoneId },
            include: {
                goal: {
                    include: {
                        user: true,
                    },
                },
            },
        });

        if (!milestone) {
            return NextResponse.json(
                { error: "Milestone not found" },
                { status: 404 }
            );
        }

        if (milestone.goal.user.email !== session.user.email) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        await prisma.milestone.delete({
            where: { id: milestoneId },
        });

        return NextResponse.json({ message: "Milestone deleted successfully" });
    } catch (error) {
        console.error("Error deleting milestone:", error);
        return NextResponse.json(
            { error: "Failed to delete milestone" },
            { status: 500 }
        );
    }
}
