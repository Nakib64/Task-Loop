"use client";

import { motion } from "framer-motion";
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    Sparkles,
    ArrowRight,
    Github,
    Chrome,
    AlertCircle,
    Loader2
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "@/lib/validations/auth";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        setIsLoading(true);
        try {
            const { signIn } = await import("next-auth/react");
            const result = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false,
            });

            if (result?.error) {
                alert("Invalid email or password");
            } else {
                // Redirect to home page
                window.location.href = "/";
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Login failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white overflow-hidden flex items-center justify-center p-6">
            {/* Animated background elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
            </div>

            {/* Login Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 w-full max-w-md"
            >
                {/* Logo */}
                <Link href="/" className="flex items-center justify-center gap-2 mb-8">
                    <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                        <Sparkles className="w-7 h-7" />
                    </div>
                    <span className="text-3xl font-bold gradient-text">TaskLoop</span>
                </Link>

                {/* Card */}
                <div className="glass-effect rounded-3xl p-8 md:p-10 border border-white/10">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome Back</h1>
                        <p className="text-gray-400">Sign in to continue your productivity journey</p>
                    </div>

                    {/* Social Login Buttons */}
                    <div className="space-y-3 mb-6">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="button"
                            className="w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 transition-all font-medium"
                        >
                            <Chrome className="w-5 h-5" />
                            Continue with Google
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="button"
                            className="w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 transition-all font-medium"
                        >
                            <Github className="w-5 h-5" />
                            Continue with GitHub
                        </motion.button>
                    </div>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/10"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-transparent text-gray-400">Or continue with email</span>
                        </div>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    {...register("email")}
                                    className={`w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 border ${errors.email ? "border-red-500" : "border-white/10"
                                        } focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all placeholder:text-gray-500`}
                                />
                            </div>
                            {errors.email && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-2 text-sm text-red-400 flex items-center gap-1"
                                >
                                    <AlertCircle className="w-4 h-4" />
                                    {errors.email.message}
                                </motion.p>
                            )}
                        </div>

                        {/* Password Input */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium mb-2 text-gray-300">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    {...register("password")}
                                    className={`w-full pl-12 pr-12 py-3.5 rounded-xl bg-white/5 border ${errors.password ? "border-red-500" : "border-white/10"
                                        } focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all placeholder:text-gray-500`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.password && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-2 text-sm text-red-400 flex items-center gap-1"
                                >
                                    <AlertCircle className="w-4 h-4" />
                                    {errors.password.message}
                                </motion.p>
                            )}
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    {...register("rememberMe")}
                                    className="w-4 h-4 rounded border-white/20 bg-white/5 text-purple-500 focus:ring-2 focus:ring-purple-500/20"
                                />
                                <span className="text-gray-400 group-hover:text-white transition-colors">Remember me</span>
                            </label>
                            <Link href="/forgot-password" className="text-purple-400 hover:text-purple-300 transition-colors font-medium">
                                Forgot password?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            whileHover={{ scale: isLoading ? 1 : 1.02 }}
                            whileTap={{ scale: isLoading ? 1 : 0.98 }}
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3.5 rounded-xl gradient-primary font-bold text-lg shadow-lg hover:shadow-purple-500/50 transition-shadow flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Signing In...
                                </>
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </motion.button>
                    </form>

                    {/* Sign Up Link */}
                    <p className="text-center text-sm text-gray-400 mt-6">
                        Don't have an account?{" "}
                        <Link href="/register" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                            Sign up for free
                        </Link>
                    </p>
                </div>

                {/* Footer Text */}
                <p className="text-center text-xs text-gray-500 mt-6">
                    By signing in, you agree to our{" "}
                    <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
                    {" "}and{" "}
                    <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
                </p>
            </motion.div>
        </div>
    );
}
