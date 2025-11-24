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
    User,
    CheckCircle2,
    AlertCircle,
    Loader2
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormData } from "@/lib/validations/auth";

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterFormData) => {
        setIsLoading(true);
        try {
            // Call registration API
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    confirmPassword: data.confirmPassword,
                    acceptTerms: data.acceptTerms,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Registration failed");
            }

            // Auto-login after successful registration
            const { signIn } = await import("next-auth/react");
            
            const signInResult = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false,
            });

            if (signInResult?.error) {
                alert("Registration successful, but login failed. Please try logging in manually.");
                window.location.href = "/login";
            } else {
                // Redirect to home page
                window.location.href = "/";
            }
        } catch (error: any) {
            console.error("Registration error:", error);
            alert(error.message || "Registration failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const features = [
        "Unlimited tasks and projects",
        "Advanced analytics dashboard",
        "Team collaboration tools",
        "Priority support"
    ];

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-950 via-purple-950 to-slate-900 text-white overflow-hidden flex items-center justify-center p-6">
            {/* Animated background elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
            </div>

            {/* Register Container */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 w-full max-w-6xl"
            >
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                    {/* Left Side - Features */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="hidden lg:block"
                    >
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 mb-8">
                            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                                <Sparkles className="w-7 h-7" />
                            </div>
                            <span className="text-3xl font-bold gradient-text">TaskLoop</span>
                        </Link>

                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Start Your
                            <br />
                            <span className="gradient-text">Productivity Journey</span>
                        </h2>
                        <p className="text-gray-400 text-lg mb-8">
                            Join thousands of professionals who have transformed their workflow with TaskLoop.
                        </p>

                        {/* Features List */}
                        <div className="space-y-4">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                                    className="flex items-center gap-3"
                                >
                                    <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                                        <CheckCircle2 className="w-5 h-5" />
                                    </div>
                                    <span className="text-gray-300">{feature}</span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10">
                            {[
                                { number: "50K+", label: "Users" },
                                { number: "1M+", label: "Tasks" },
                                { number: "99%", label: "Satisfaction" }
                            ].map((stat, index) => (
                                <div key={index}>
                                    <div className="text-2xl font-bold gradient-text">{stat.number}</div>
                                    <div className="text-sm text-gray-400">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Side - Register Form */}
                    <div>
                        {/* Mobile Logo */}
                        <Link href="/" className="flex lg:hidden items-center justify-center gap-2 mb-8">
                            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                                <Sparkles className="w-7 h-7" />
                            </div>
                            <span className="text-3xl font-bold gradient-text">TaskLoop</span>
                        </Link>

                        {/* Card */}
                        <div className="glass-effect rounded-3xl p-8 md:p-10 border border-white/10">
                            {/* Header */}
                            <div className="text-center mb-8">
                                <h1 className="text-3xl md:text-4xl font-bold mb-2">Create Account</h1>
                                <p className="text-gray-400">Get started with your free account</p>
                            </div>

                            {/* Social Register Buttons */}
                            <div className="space-y-3 mb-6">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="button"
                                    className="w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 transition-all font-medium"
                                >
                                    <Chrome className="w-5 h-5" />
                                    Sign up with Google
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="button"
                                    className="w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 transition-all font-medium"
                                >
                                    <Github className="w-5 h-5" />
                                    Sign up with GitHub
                                </motion.button>
                            </div>

                            {/* Divider */}
                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-white/10"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-transparent text-gray-400">Or register with email</span>
                                </div>
                            </div>

                            {/* Register Form */}
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                {/* Full Name Input */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-300">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            id="name"
                                            type="text"
                                            placeholder="John Doe"
                                            {...register("name")}
                                            className={`w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 border ${errors.name ? "border-red-500" : "border-white/10"
                                                } focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all placeholder:text-gray-500`}
                                        />
                                    </div>
                                    {errors.name && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="mt-2 text-sm text-red-400 flex items-center gap-1"
                                        >
                                            <AlertCircle className="w-4 h-4" />
                                            {errors.name.message}
                                        </motion.p>
                                    )}
                                </div>

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

                                {/* Confirm Password Input */}
                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2 text-gray-300">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            id="confirmPassword"
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            {...register("confirmPassword")}
                                            className={`w-full pl-12 pr-12 py-3.5 rounded-xl bg-white/5 border ${errors.confirmPassword ? "border-red-500" : "border-white/10"
                                                } focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all placeholder:text-gray-500`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                        >
                                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                    {errors.confirmPassword && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="mt-2 text-sm text-red-400 flex items-center gap-1"
                                        >
                                            <AlertCircle className="w-4 h-4" />
                                            {errors.confirmPassword.message}
                                        </motion.p>
                                    )}
                                </div>

                                {/* Terms Checkbox */}
                                <div>
                                    <label className="flex items-start gap-3 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            {...register("acceptTerms")}
                                            className="w-4 h-4 mt-0.5 rounded border-white/20 bg-white/5 text-purple-500 focus:ring-2 focus:ring-purple-500/20"
                                        />
                                        <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                                            I agree to the{" "}
                                            <Link href="/terms" className="text-purple-400 hover:text-purple-300">Terms of Service</Link>
                                            {" "}and{" "}
                                            <Link href="/privacy" className="text-purple-400 hover:text-purple-300">Privacy Policy</Link>
                                        </span>
                                    </label>
                                    {errors.acceptTerms && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="mt-2 text-sm text-red-400 flex items-center gap-1"
                                        >
                                            <AlertCircle className="w-4 h-4" />
                                            {errors.acceptTerms.message}
                                        </motion.p>
                                    )}
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
                                            Creating Account...
                                        </>
                                    ) : (
                                        <>
                                            Create Account
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </motion.button>
                            </form>

                            {/* Sign In Link */}
                            <p className="text-center text-sm text-gray-400 mt-6">
                                Already have an account?{" "}
                                <Link href="/login" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
