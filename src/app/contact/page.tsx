"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-linear-to-br from-slate-950 via-purple-950 to-slate-900 text-white overflow-hidden flex flex-col">
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
            </div>

            <Navbar />

            <main className="flex-grow relative z-10 py-20 px-6 md:px-12">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Get in <span className="linear-text">Touch</span>
                        </h1>
                        <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                            Have questions about TaskLoop? We're here to help. Send us a message and we'll respond as soon as possible.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                                    <Mail className="w-6 h-6 text-purple-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">Email Us</h3>
                                    <p className="text-gray-400">support@taskloop.com</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                                    <Phone className="w-6 h-6 text-purple-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">Call Us</h3>
                                    <p className="text-gray-400">+1 (555) 123-4567</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                                    <MapPin className="w-6 h-6 text-purple-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">Visit Us</h3>
                                    <p className="text-gray-400">123 Innovation Dr, Tech City, TC 90210</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10"
                    >
                        <form className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">First Name</label>
                                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors" placeholder="John" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Last Name</label>
                                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors" placeholder="Doe" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Email</label>
                                <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors" placeholder="john@example.com" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Message</label>
                                <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors resize-none" placeholder="How can we help you?" />
                            </div>
                            <button className="w-full py-4 rounded-xl linear-primary font-bold text-lg shadow-lg hover:shadow-purple-500/30 transition-all flex items-center justify-center gap-2">
                                Send Message
                                <Send className="w-5 h-5" />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
