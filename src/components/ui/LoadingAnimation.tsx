"use client";

import { motion } from "framer-motion";

interface LoadingAnimationProps {
    size?: "sm" | "md" | "lg" | "xl";
    text?: string;
    fullScreen?: boolean;
}

export default function LoadingAnimation({
    size = "md",
    text = "Loading...",
    fullScreen = false
}: LoadingAnimationProps) {
    const sizeClasses = {
        sm: "w-8 h-8",
        md: "w-12 h-12",
        lg: "w-16 h-16",
        xl: "w-24 h-24"
    };

    const dotSizes = {
        sm: "w-2 h-2",
        md: "w-3 h-3",
        lg: "w-4 h-4",
        xl: "w-6 h-6"
    };

    const containerClass = fullScreen
        ? "min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex items-center justify-center"
        : "flex items-center justify-center p-8";

    return (
        <div className={containerClass}>
            <div className="flex flex-col items-center gap-6">
                {/* Animated Logo/Icon */}
                <motion.div
                    className="relative"
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <div className={`${sizeClasses[size]} rounded-2xl linear-primary flex items-center justify-center shadow-2xl shadow-purple-500/50`}>
                        <motion.div
                            animate={{
                                scale: [1, 0.8, 1],
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <svg
                                className="w-1/2 h-1/2 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                            </svg>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Bouncing Dots */}
                <div className="flex items-center gap-2">
                    {[0, 1, 2].map((index) => (
                        <motion.div
                            key={index}
                            className={`${dotSizes[size]} rounded-full bg-gradient-to-r from-purple-500 to-pink-500`}
                            animate={{
                                y: [0, -12, 0],
                                scale: [1, 1.2, 1],
                            }}
                            transition={{
                                duration: 0.6,
                                repeat: Infinity,
                                delay: index * 0.15,
                                ease: "easeInOut"
                            }}
                        />
                    ))}
                </div>

                {/* Loading Text */}
                {text && (
                    <motion.p
                        className="text-white text-lg font-medium"
                        animate={{
                            opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        {text}
                    </motion.p>
                )}

                {/* Circular Progress Ring */}
                <svg className={sizeClasses[size]} viewBox="0 0 100 100">
                    <motion.circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{
                            pathLength: [0, 1, 0],
                            rotate: [0, 360]
                        }}
                        transition={{
                            pathLength: {
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            },
                            rotate: {
                                duration: 2,
                                repeat: Infinity,
                                ease: "linear"
                            }
                        }}
                        style={{ originX: "50%", originY: "50%" }}
                    />
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#a855f7" />
                            <stop offset="100%" stopColor="#ec4899" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        </div>
    );
}

// Spinner variant for inline use
export function LoadingSpinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
    const sizeClasses = {
        sm: "w-4 h-4",
        md: "w-6 h-6",
        lg: "w-8 h-8"
    };

    return (
        <motion.div
            className={`${sizeClasses[size]} border-2 border-purple-500 border-t-transparent rounded-full`}
            animate={{ rotate: 360 }}
            transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear"
            }}
        />
    );
}
