import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth.config";
import prisma from "@/lib/prisma";

// GET - Fetch all calendar events for the logged-in user
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

        const events = await prisma.calendarEvent.findMany({
            where: { userId: user.id },
            orderBy: { startTime: "asc" },
        });

        return NextResponse.json({ events });
    } catch (error) {
        console.error("Error fetching events:", error);
        return NextResponse.json(
            { error: "Failed to fetch events" },
            { status: 500 }
        );
    }
}

// POST - Create a new calendar event
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
        const { title, description, startTime, endTime, color, allDay } = body;

        if (!title || !startTime || !endTime) {
            return NextResponse.json(
                { error: "Title, start time, and end time are required" },
                { status: 400 }
            );
        }

        const event = await prisma.calendarEvent.create({
            data: {
                title,
                description,
                startTime: new Date(startTime),
                endTime: new Date(endTime),
                color: color || "purple",
                allDay: allDay || false,
                userId: user.id,
            },
        });

        return NextResponse.json({ event }, { status: 201 });
    } catch (error) {
        console.error("Error creating event:", error);
        return NextResponse.json(
            { error: "Failed to create event" },
            { status: 500 }
        );
    }
}
