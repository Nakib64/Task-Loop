import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth.config";
import prisma from "@/lib/prisma";

// GET - Fetch all habits for the logged-in user
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

        const habits = await prisma.habit.findMany({
            where: { userId: user.id },
            include: {
                logs: {
                    orderBy: { date: "desc" },
                    take: 30,
                },
            },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json({ habits });
    } catch (error) {
        console.error("Error fetching habits:", error);
        return NextResponse.json(
            { error: "Failed to fetch habits" },
            { status: 500 }
        );
    }
}

// POST - Create a new habit
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
        const { name, description, frequency, goal } = body;

        if (!name || !frequency) {
            return NextResponse.json(
                { error: "Name and frequency are required" },
                { status: 400 }
            );
        }

        const habit = await prisma.habit.create({
            data: {
                name,
                description,
                frequency,
                goal: goal || 1,
                userId: user.id,
            },
        });

        return NextResponse.json({ habit }, { status: 201 });
    } catch (error) {
        console.error("Error creating habit:", error);
        return NextResponse.json(
            { error: "Failed to create habit" },
            { status: 500 }
        );
    }
}
