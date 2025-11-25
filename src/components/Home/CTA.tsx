import React from 'react';
import { motion } from "framer-motion";
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

const CTA = () => {
    return (
        <div>
            <section className="relative z-10 py-20 px-6 md:px-12">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto p-12 md:p-16 rounded-3xl linear-primary relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent" />
                    <div className="relative z-10 text-center">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Ready to Transform Your Productivity?
                        </h2>
                        <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                            Join thousands of users who have already supercharged their workflow with TaskLoop.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href={'/pricing'}>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 rounded-2xl bg-white text-purple-600 font-bold text-lg shadow-2xl hover:shadow-white/20 transition-shadow"
                                >
                                    Start Free Trial
                                </motion.button>
                                </Link>
                            <Link href={'/contact'}>
                                <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 rounded-2xl border-2 border-white/30 font-bold text-lg hover:bg-white/10 transition-colors"
                            >
                                Contact Sales
                            </motion.button>
                            </Link>
                        </div>
                        <p className="text-sm text-purple-200 mt-6">
                            <CheckCircle2 className="w-4 h-4 inline mr-1" />
                            No credit card required • 14-day free trial • Cancel anytime
                        </p>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default CTA;