"use client";

import { motion } from "framer-motion";
import {
  Users,
  Target,
  BookOpen,
  BarChart3,
  Bell,
  CheckCircle,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Zap,
  Shield,
  Heart
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function FeaturePage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const features = [
    {
      title: "User Profiles & Authentication",
      description:
        "Personalized profiles with secure email/password login. Track skills, progress, and learning history in one beautiful dashboard.",
      icon: Users,
      linear: "from-purple-500 to-pink-500",
      delay: 0
    },
    {
      title: "Learning Goals",
      description:
        "Set ambitious goals, add actionable milestones, track deadlines, and build consistent learning habits that stick.",
      icon: Target,
      linear: "from-blue-500 to-cyan-500",
      delay: 0.1
    },
    {
      title: "Micro-Courses",
      description:
        "Structured mini-courses created by expert instructors. Mark lessons complete, save notes, and follow your personalized learning path.",
      icon: BookOpen,
      linear: "from-orange-500 to-yellow-500",
      delay: 0.2
    },
    {
      title: "Social Connections",
      description:
        "Follow inspiring learners, view progress feeds, comment on achievements, and learn together as a thriving community.",
      icon: Heart,
      linear: "from-rose-500 to-pink-500",
      delay: 0.3
    },
    {
      title: "Dashboard & Analytics",
      description:
        "View your study streaks, completed milestones, time invested, and learning velocity — all visualized with stunning charts.",
      icon: BarChart3,
      linear: "from-green-500 to-emerald-500",
      delay: 0.4
    },
    {
      title: "Smart Notifications",
      description:
        "Stay informed with intelligent alerts when friends follow you, new course content drops, and milestone deadlines approach.",
      icon: Bell,
      linear: "from-indigo-500 to-purple-500",
      delay: 0.5
    },
  ];

  const workflow = [
    {
      step: "1. Create Goals",
      desc: "Define what you want to learn and set meaningful milestones.",
      icon: Target,
      color: "purple"
    },
    {
      step: "2. Learn & Track",
      desc: "Take engaging lessons, update progress, and stay consistent.",
      icon: TrendingUp,
      color: "blue"
    },
    {
      step: "3. Celebrate Growth",
      desc: "Gain actionable insights and share achievements with the community.",
      icon: Sparkles,
      color: "orange"
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-purple-950 to-slate-900 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <Navbar />

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect text-sm font-medium border border-purple-400/30">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            Feature-Rich Platform
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-5xl md:text-7xl font-extrabold leading-tight max-w-5xl mx-auto mb-6"
        >
          Powerful Features to <span className="linear-text">Supercharge Your Learning</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
        >
          TaskLoop brings structure, motivation, and community to your learning journey — all in one beautifully designed platform.
        </motion.p>
      </section>

      {/* Feature Grid */}
      <section className="relative z-10 py-20 px-6 md:px-12">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: feature.delay }}
              whileHover={{
                y: -12,
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              className="group relative p-8 rounded-3xl glass-effect border border-white/10 hover:border-white/30 transition-all cursor-pointer overflow-hidden"
            >
              {/* linear overlay on hover */}
              <div className={`absolute inset-0 bg-linear-to-br ${feature.linear} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

              {/* Subtle glow effect */}
              <div className={`absolute -inset-1 bg-linear-to-br ${feature.linear} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10`} />

              <div className="relative z-10">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-linear-to-br ${feature.linear} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                  <feature.icon className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 leading-relaxed transition-colors">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Workflow Section */}
      <section className="relative z-10 py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-extrabold mb-4">
              How <span className="linear-text">TaskLoop</span> Works
            </h2>
            <p className="text-gray-300 text-xl max-w-2xl mx-auto">
              Start learning in 3 simple steps — we keep it clean, intuitive, and motivating.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {workflow.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="relative p-8 rounded-3xl glass-effect border border-white/10 hover:border-white/30 transition-all text-center group"
              >
                {/* Number badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {i + 1}
                </div>

                <item.icon className="w-16 h-16 mx-auto mb-6 text-purple-400 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold mb-4">{item.step}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features Section */}
      <section className="relative z-10 py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Even More to <span className="linear-text">Love</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: Shield,
                title: "Secure & Private",
                desc: "Your data is encrypted and protected with industry-standard security measures."
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                desc: "Optimized performance ensures you can focus on learning without any lag."
              },
              {
                icon: Heart,
                title: "Community Driven",
                desc: "Built with feedback from thousands of learners just like you."
              },
              {
                icon: Sparkles,
                title: "Beautiful Design",
                desc: "Enjoy a stunning interface that makes learning delightful and engaging."
              }
            ].map((extra, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex items-start gap-4 p-6 rounded-2xl glass-effect border border-white/10 hover:border-white/20 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <extra.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">{extra.title}</h4>
                  <p className="text-gray-400">{extra.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24 px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center p-12 md:p-16 rounded-3xl glass-effect border border-white/20 relative overflow-hidden"
        >
          {/* Background linear */}
          <div className="absolute inset-0 bg-linear-to-br from-purple-600/20 to-blue-600/20" />

          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
              Ready to Start Learning <span className="linear-text">Better</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Join thousands of learners on TaskLoop and build habits that last a lifetime.
            </p>
            <motion.a
              href="/register"
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(147, 51, 234, 0.6)" }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center gap-3 px-10 py-5 rounded-2xl linear-primary font-bold text-lg shadow-2xl"
            >
              Get Started for Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </motion.a>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
