import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth.config";
import prisma from "@/lib/prisma";

// GET - Fetch all tasks for the logged-in user
export async function GET(request: NextRequest) {
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

        const { searchParams } = new URL(request.url);
        const status = searchParams.get("status");

        const tasks = await prisma.task.findMany({
            where: {
                userId: user.id,
                ...(status && { status }),
            },
            orderBy: [
                { status: "asc" },
                { priority: "desc" },
                { dueDate: "asc" },
            ],
        });

        return NextResponse.json({ tasks });
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return NextResponse.json(
            { error: "Failed to fetch tasks" },
            { status: 500 }
        );
    }
}

// POST - Create a new task
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
        const { title, description, priority, dueDate, tags } = body;

        if (!title) {
            return NextResponse.json(
                { error: "Title is required" },
                { status: 400 }
            );
        }

        const task = await prisma.task.create({
            data: {
                title,
                description: description || null,
                priority: priority || "MEDIUM",
                dueDate: dueDate ? new Date(dueDate) : null,
                tags: Array.isArray(tags) && tags.length > 0 ? tags : [],
                userId: user.id,
            },
        });

        return NextResponse.json({ task }, { status: 201 });
    } catch (error) {
        console.error("Error creating task:", error);
        return NextResponse.json(
            { error: "Failed to create task" },
            { status: 500 }
        );
    }
}
