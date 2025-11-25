"use client";

import { motion } from "framer-motion";
import { GraduationCap, Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
    variant?: "default" | "minimal" | "dots" | "pulse";
    size?: "sm" | "md" | "lg";
    fullScreen?: boolean;
    message?: string;
}

export function LoadingSpinner({
    variant = "default",
    size = "md",
    fullScreen = false,
    message,
}: LoadingSpinnerProps) {
    const sizeClasses = {
        sm: "w-8 h-8",
        md: "w-12 h-12",
        lg: "w-16 h-16",
    };

    const dotSizes = {
        sm: "w-2 h-2",
        md: "w-3 h-3",
        lg: "w-4 h-4",
    };

    const containerClass = fullScreen
        ? "fixed inset-0 flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 z-50"
        : "flex items-center justify-center";

    // Default variant - Spinning logo with gradient
    const DefaultLoader = () => (
        <div className="flex flex-col items-center gap-4">
            <motion.div
                className={`${sizeClasses[size]} rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/50`}
                animate={{
                    rotate: 360,
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    rotate: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                    },
                    scale: {
                        duration: 1,
                        repeat: Infinity,
                        ease: "easeInOut",
                    },
                }}
            >
                <GraduationCap className={`${size === "sm" ? "w-4 h-4" : size === "md" ? "w-6 h-6" : "w-8 h-8"} text-white`} />
            </motion.div>
            {message && (
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-blue-300 text-sm font-medium"
                >
                    {message}
                </motion.p>
            )}
        </div>
    );

    // Minimal variant - Simple spinner
    const MinimalLoader = () => (
        <div className="flex flex-col items-center gap-3">
            <Loader2 className={`${sizeClasses[size]} text-blue-500 animate-spin`} />
            {message && (
                <p className="text-blue-300 text-sm font-medium">{message}</p>
            )}
        </div>
    );

    // Dots variant - Three bouncing dots
    const DotsLoader = () => (
        <div className="flex flex-col items-center gap-4">
            <div className="flex gap-2">
                {[0, 1, 2].map((index) => (
                    <motion.div
                        key={index}
                        className={`${dotSizes[size]} rounded-full bg-gradient-to-r from-blue-500 to-cyan-500`}
                        animate={{
                            y: [0, -12, 0],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: index * 0.15,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>
            {message && (
                <p className="text-blue-300 text-sm font-medium">{message}</p>
            )}
        </div>
    );

    // Pulse variant - Pulsing circles
    const PulseLoader = () => (
        <div className="flex flex-col items-center gap-4">
            <div className="relative">
                {[0, 1, 2].map((index) => (
                    <motion.div
                        key={index}
                        className={`absolute inset-0 ${sizeClasses[size]} rounded-full border-2 border-blue-500`}
                        animate={{
                            scale: [1, 2, 2],
                            opacity: [1, 0.5, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.6,
                            ease: "easeOut",
                        }}
                    />
                ))}
                <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/50`} />
            </div>
            {message && (
                <p className="text-blue-300 text-sm font-medium mt-8">{message}</p>
            )}
        </div>
    );

    const renderLoader = () => {
        switch (variant) {
            case "minimal":
                return <MinimalLoader />;
            case "dots":
                return <DotsLoader />;
            case "pulse":
                return <PulseLoader />;
            default:
                return <DefaultLoader />;
        }
    };

    return <div className={containerClass}>{renderLoader()}</div>;
}

// Page-level loading component
export function PageLoader({ message = "Loading..." }: { message?: string }) {
    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <LoadingSpinner variant="default" size="lg" message={message} />
        </div>
    );
}

// Full screen loading overlay
export function FullScreenLoader({ message = "Loading..." }: { message?: string }) {
    return <LoadingSpinner variant="default" size="lg" fullScreen message={message} />;
}

// Inline loading component
export function InlineLoader({ message }: { message?: string }) {
    return <LoadingSpinner variant="dots" size="sm" message={message} />;
}
