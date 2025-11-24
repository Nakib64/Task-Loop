import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth.config";
import prisma from "@/lib/prisma";

// POST - Log a habit completion
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ habitId: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        const { habitId } = await params;

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
        const { date } = body;

        const logDate = date ? new Date(date) : new Date();
        logDate.setHours(0, 0, 0, 0);

        // Check if already logged for this date
        const existing = await prisma.habitLog.findUnique({
            where: {
                habitId_date: {
                    habitId: habitId,
                    date: logDate,
                },
            },
        });

        if (existing) {
            // Delete the log (uncheck)
            await prisma.habitLog.delete({
                where: { id: existing.id },
            });
            return NextResponse.json({ message: "Habit unchecked" });
        } else {
            // Create new log
            const log = await prisma.habitLog.create({
                data: {
                    habitId: habitId,
                    userId: user.id,
                    date: logDate,
                },
            });
            return NextResponse.json({ log }, { status: 201 });
        }
    } catch (error) {
        console.error("Error logging habit:", error);
        return NextResponse.json(
            { error: "Failed to log habit" },
            { status: 500 }
        );
    }
}
