import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth.config";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function PUT(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { name, currentPassword, newPassword } = body;

        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const updateData: any = { name };

        // Handle password update if provided
        if (newPassword) {
            if (!currentPassword) {
                return NextResponse.json(
                    { error: "Current password is required to set a new password" },
                    { status: 400 }
                );
            }

            // Verify current password
            // Note: If user signed up with OAuth, they might not have a password.
            // In that case, we might need a different flow, but assuming credentials for now or allowing setting password.
            if (user.password) {
                const isValid = await bcrypt.compare(currentPassword, user.password);
                if (!isValid) {
                    return NextResponse.json(
                        { error: "Incorrect current password" },
                        { status: 400 }
                    );
                }
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            updateData.password = hashedPassword;
        }

        const updatedUser = await prisma.user.update({
            where: { email: session.user.email },
            data: updateData,
        });

        return NextResponse.json({
            user: {
                name: updatedUser.name,
                email: updatedUser.email,
            }
        });
    } catch (error) {
        console.error("Error updating profile:", error);
        return NextResponse.json(
            { error: "Failed to update profile" },
            { status: 500 }
        );
    }
}
