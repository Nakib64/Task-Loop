import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth.config";
import prisma from "@/lib/prisma";

// PUT - Update a task
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ taskId: string }> }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { taskId } = await params;

        const task = await prisma.task.findUnique({
            where: { id: taskId },
            include: { user: true },
        });

        if (!task) {
            return NextResponse.json({ error: "Task not found" }, { status: 404 });
        }

        if (task.user.email !== session.user.email) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const body = await request.json();
        const { title, description, status, priority, dueDate, tags } = body;

        const updatedTask = await prisma.task.update({
            where: { id: taskId },
            data: {
                title: title || task.title,
                description: description !== undefined ? description : task.description,
                status: status || task.status,
                priority: priority || task.priority,
                dueDate: dueDate ? new Date(dueDate) : task.dueDate,
                tags: tags || task.tags,
            },
        });

        return NextResponse.json({ task: updatedTask });
    } catch (error) {
        console.error("Error updating task:", error);
        return NextResponse.json(
            { error: "Failed to update task" },
            { status: 500 }
        );
    }
}

// DELETE - Delete a task
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ taskId: string }> }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { taskId } = await params;

        const task = await prisma.task.findUnique({
            where: { id: taskId },
            include: { user: true },
        });

        if (!task) {
            return NextResponse.json({ error: "Task not found" }, { status: 404 });
        }

        if (task.user.email !== session.user.email) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        await prisma.task.delete({
            where: { id: taskId },
        });

        return NextResponse.json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("Error deleting task:", error);
        return NextResponse.json(
            { error: "Failed to delete task" },
            { status: 500 }
        );
    }
}
