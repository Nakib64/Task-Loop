"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export function Navbar() {
    const session = useSession();

    return (
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
            <ul className="hidden md:flex gap-8 text-sm font-medium text-white">
                <Link href={"/features"}>
                    <li className="hover:text-purple-400 cursor-pointer transition-colors">Features</li>
                </Link>
                <Link href={"/pricing"}>
                    <li className="hover:text-purple-400 cursor-pointer transition-colors">Pricing</li>
                </Link>
                <Link href={"/contact"}>
                    <li className="hover:text-purple-400 cursor-pointer transition-colors">Contact</li>
                </Link>
                <Link href={"/about"}>
                    <li className="hover:text-purple-400 cursor-pointer transition-colors">About</li>
                </Link>
            </ul>

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
        </motion.nav>
    );
}
