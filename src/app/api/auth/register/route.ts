import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/auth/password";
import { registerSchema } from "@/lib/validations/auth";

export async function POST(request: NextRequest) {
    console.log("Register API called");
    try {
        const body = await request.json();
        console.log("Request body parsed:", body);

        // Validate request body
        const validatedData = registerSchema.parse(body);

        // Check if user already exists
        console.log("Checking for existing user...");
        const existingUser = await prisma.user.findUnique({
            where: {
                email: validatedData.email,
            },
        });
        console.log("Existing user check complete:", existingUser);

        if (existingUser) {
            return NextResponse.json(
                { error: "Email already exists" },
                { status: 409 }
            );
        }

        // Hash password
        const hashedPassword = await hashPassword(validatedData.password);

        
        // Create user
        const user = await prisma.user.create({
            data: {
                name: validatedData.name,
                email: validatedData.email,
                password: hashedPassword,
            },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
            },
        });
        
        return NextResponse.json(
            {
                message: "User created successfully (MOCK)",
                user
            },
            { status: 201 }
        );
    } catch (error: any) {
        // Zod validation error
        if (error.name === "ZodError") {
            return NextResponse.json(
                { error: "Validation failed", details: error.errors },
                { status: 400 }
            );
        }

        console.error("Registration error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
