"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Zap } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function PricingPage() {
    const fadeInUp = {
        initial: { opacity: 0, y: 60 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const plans = [
        {
            name: "Free",
            price: "$0",
            description: "Perfect for getting started",
            features: ["Up to 5 projects", "Basic task management", "7-day history", "Community support"],
            cta: "Get Started",
            popular: false
        },
        {
            name: "Pro",
            price: "$12",
            description: "For power users and freelancers",
            features: ["Unlimited projects", "Advanced analytics", "Unlimited history", "Priority support", "Custom workflows"],
            cta: "Start Free Trial",
            popular: true
        },
        {
            name: "Team",
            price: "$29",
            description: "For growing teams and businesses",
            features: ["Everything in Pro", "Team collaboration", "Admin controls", "SSO integration", "Dedicated success manager"],
            cta: "Contact Sales",
            popular: false
        }
    ];

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-950 via-purple-950 to-slate-900 text-white overflow-hidden flex flex-col">
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
            </div>

            <Navbar />

            <main className="flex-grow relative z-10 py-20 px-6 md:px-12">
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="text-4xl md:text-6xl font-bold mb-6"
                    >
                        Simple, Transparent <span className="linear-text">Pricing</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="text-lg text-gray-300 max-w-2xl mx-auto"
                    >
                        Choose the plan that fits your needs. No hidden fees. Cancel anytime.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            variants={fadeInUp}
                            initial="initial"
                            animate="animate"
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -8 }}
                            className={`relative p-8 rounded-3xl glass-effect border ${plan.popular ? 'border-purple-500 shadow-purple-500/20 shadow-2xl' : 'border-white/10'} flex flex-col`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-purple-600 text-xs font-bold uppercase tracking-wider">
                                    Most Popular
                                </div>
                            )}
                            <div className="mb-8">
                                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold">{plan.price}</span>
                                    <span className="text-gray-400">/month</span>
                                </div>
                                <p className="text-gray-400 mt-2 text-sm">{plan.description}</p>
                            </div>
                            <ul className="space-y-4 mb-8 flex-grow">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                                        <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <button className={`w-full py-3 rounded-xl font-bold transition-all ${plan.popular ? 'linear-primary hover:shadow-lg hover:shadow-purple-500/30' : 'bg-white/10 hover:bg-white/20'}`}>
                                {plan.cta}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
