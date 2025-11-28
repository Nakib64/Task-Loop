"use client";

import { motion } from "framer-motion";
import { Users, Target, Heart, Globe } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function AboutPage() {
    const fadeInUp = {
        initial: { opacity: 0, y: 60 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-950 via-purple-950 to-slate-900 text-white overflow-hidden flex flex-col">
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
            </div>

            <Navbar />

            <main className="flex-grow relative z-10 py-20 px-6 md:px-12">
                {/* Hero */}
                <div className="text-center mb-20">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="text-4xl md:text-6xl font-bold mb-6"
                    >
                        We're Building the <span className="linear-text">Future of Work</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="text-lg text-gray-300 max-w-3xl mx-auto"
                    >
                        TaskLoop was born from a simple idea: productivity shouldn't be complicated.
                        We're on a mission to help people achieve more with less stress.
                    </motion.p>
                </div>

                {/* Values */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-20">
                    {[
                        { icon: Users, title: "User First", desc: "We build for people, not just for efficiency." },
                        { icon: Target, title: "Simplicity", desc: "Complex problems, simple solutions." },
                        { icon: Heart, title: "Passion", desc: "We love what we do and it shows." },
                        { icon: Globe, title: "Global", desc: "Connecting teams around the world." }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            variants={fadeInUp}
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-6 rounded-2xl glass-effect border border-white/10 text-center"
                        >
                            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                                <item.icon className="w-6 h-6 text-purple-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                            <p className="text-gray-400 text-sm">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Story */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="max-w-4xl mx-auto bg-white/5 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-white/10"
                >
                    <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                    <div className="space-y-4 text-gray-300 leading-relaxed">
                        <p>
                            Founded in 2024, TaskLoop started as a side project to solve our own productivity challenges.
                            We were tired of clunky, over-complicated tools that made work feel like... work.
                        </p>
                        <p>
                            What began as a simple to-do list has evolved into a comprehensive platform used by thousands
                            of professionals worldwide. But our core philosophy remains the same: create tools that are
                            powerful enough for teams but simple enough for individuals.
                        </p>
                        <p>
                            Today, we're a diverse team of designers, engineers, and dreamers working together to
                            redefine productivity for the modern era.
                        </p>
                    </div>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
}
