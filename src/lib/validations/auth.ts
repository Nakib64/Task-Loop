import { z } from "zod";

// Login Schema
export const loginSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Please enter a valid email address"),
    password: z
        .string()
        .min(1, "Password is required")
        .min(6, "Password must be at least 6 characters"),
    rememberMe: z.boolean().optional(),
});

// Register Schema
export const registerSchema = z
    .object({
        name: z
            .string()
            .min(1, "Full name is required")
            .min(2, "Name must be at least 2 characters")
            .max(50, "Name must be less than 50 characters"),
        email: z
            .string()
            .min(1, "Email is required")
            .email("Please enter a valid email address"),
        password: z
            .string()
            .min(1, "Password is required")
            .min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string().min(1, "Please confirm your password"),
        acceptTerms: z
            .boolean()
            .refine((val) => val === true, {
                message: "You must accept the terms and conditions",
            }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

// Type exports
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
