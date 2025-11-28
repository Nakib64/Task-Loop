import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import React from 'react';

const Hero = () => {
  return (
    <section className="relative z-10 flex flex-col items-center justify-center px-6 py-20 md:py-32 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect text-sm font-medium border border-purple-400/30">
          <Zap className="w-4 h-4 text-yellow-400" />
          Supercharge Your Productivity
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight max-w-5xl mb-6"
      >
        Master Your Tasks,
        <br />
        <span className="linear-text">Build Better Habits</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10"
      >
        The ultimate productivity platform that helps you organize tasks, track habits,
        and achieve your goals with beautiful, intuitive design.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Link href={'/pricing'}>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(147, 51, 234, 0.6)" }}
            whileTap={{ scale: 0.95 }}
            className="group px-8 py-4 rounded-2xl linear-primary font-bold text-lg shadow-2xl flex items-center gap-2 justify-center"
          >
            Start Free Trial
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </Link>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 rounded-2xl glass-effect font-bold text-lg border border-white/20 hover:border-white/40 transition-colors"
        >
          Watch Demo
        </motion.button>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="grid grid-cols-3 gap-8 md:gap-16 mt-20 max-w-3xl"
      >
        {[
          { number: "50K+", label: "Active Users" },
          { number: "1M+", label: "Tasks Completed" },
          { number: "99%", label: "Satisfaction" }
        ].map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-3xl md:text-4xl font-bold linear-text mb-2">{stat.number}</div>
            <div className="text-sm text-gray-400">{stat.label}</div>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default Hero;