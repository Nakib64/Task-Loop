"use client";

import { motion } from "framer-motion";
import { Sparkles, Menu, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export function Navbar() {
    const session = useSession();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { href: "/features", label: "Features" },
        { href: "/pricing", label: "Pricing" },
        { href: "/contact", label: "Contact" },
        { href: "/about", label: "About" },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-50 w-full py-6 px-6 md:px-12 flex justify-between items-center backdrop-blur-sm bg-white/5 border-b border-white/10"
            >
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl linear-primary flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold linear-text">TaskLoop</span>
                </Link>

                {/* Desktop Navigation */}
                <ul className="hidden md:flex gap-8 text-sm font-medium text-white">
                    {navLinks.map((link) => (
                        <Link key={link.href} href={link.href}>
                            <li className="hover:text-purple-400 cursor-pointer transition-colors">{link.label}</li>
                        </Link>
                    ))}
                </ul>

                {/* Desktop CTA */}
                <div className="hidden md:block">
                    {!session?.data?.user ? (
                        <Link href={"/login"}>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-2.5 rounded-xl linear-primary font-semibold text-sm shadow-lg hover:shadow-purple-500/50 transition-shadow text-white"
                            >
                                Get Started
                            </motion.button>
                        </Link>
                    ) : (
                        <Link href={"/dashboard"}>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-2.5 rounded-xl linear-primary font-semibold text-sm shadow-lg hover:shadow-purple-500/50 transition-shadow text-white"
                            >
                                {session?.data?.user?.name}
                            </motion.button>
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                    {mobileMenuOpen ? (
                        <X className="w-6 h-6 text-white" />
                    ) : (
                        <Menu className="w-6 h-6 text-white" />
                    )}
                </button>
            </motion.nav>

            {/* Mobile Sidebar */}
            {mobileMenuOpen && (
                <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-y-0 right-0 z-50 w-64 bg-gradient-to-b from-slate-950 to-slate-900 border-l border-blue-500/20 md:hidden shadow-2xl"
                >
                    <div className="flex flex-col h-full">
                        {/* Mobile Menu Header */}
                        <div className="p-6 border-b border-blue-500/20 bg-gradient-to-r from-blue-900/30 to-cyan-900/30">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/50">
                                        <Sparkles className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="text-lg font-bold text-white">TaskLoop</span>
                                </div>
                                <button
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                                >
                                    <X className="w-5 h-5 text-white" />
                                </button>
                            </div>
                        </div>

                        {/* Mobile Menu Links */}
                        <div className="flex-1 p-6">
                            <ul className="space-y-4">
                                {navLinks.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="block px-4 py-3 rounded-xl text-white hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-cyan-500/20 hover:border-l-2 hover:border-blue-500 transition-all"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Mobile Menu Footer */}
                        <div className="p-6 border-t border-blue-500/20 bg-gradient-to-r from-blue-900/20 to-cyan-900/20">
                            {!session?.data?.user ? (
                                <Link href={"/login"} onClick={() => setMobileMenuOpen(false)}>
                                    <button className="w-full px-6 py-3 rounded-xl linear-primary font-semibold text-sm shadow-lg text-white">
                                        Get Started
                                    </button>
                                </Link>
                            ) : (
                                <Link href={"/dashboard"} onClick={() => setMobileMenuOpen(false)}>
                                    <button className="w-full px-6 py-3 rounded-xl linear-primary font-semibold text-sm shadow-lg text-white">
                                        Go to Dashboard
                                    </button>
                                </Link>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Overlay */}
            {mobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setMobileMenuOpen(false)}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
                />
            )}
        </>
    );
}
