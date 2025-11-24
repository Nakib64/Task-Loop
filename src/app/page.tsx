"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  Zap,
  Target,
  TrendingUp,
  Users,
  Star,
  ArrowRight,
  BarChart3,
  Clock
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function LandingPage() {

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

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-purple-950 to-slate-900 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <Navbar />

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center px-6 py-20 md:py-32 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
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
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight max-w-5xl mb-6"
        >
          Master Your Tasks,
          <br />
          <span className="linear-text">Build Better Habits</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10"
        >
          The ultimate productivity platform that helps you organize tasks, track habits,
          and achieve your goals with beautiful, intuitive design.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(147, 51, 234, 0.6)" }}
            whileTap={{ scale: 0.95 }}
            className="group px-8 py-4 rounded-2xl linear-primary font-bold text-lg shadow-2xl flex items-center gap-2 justify-center"
          >
            Start Free Trial
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
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
          transition={{ duration: 0.8, delay: 0.8 }}
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

      {/* Features Section */}
      <section className="relative z-10 py-24 px-6 md:px-12">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
          <div className="absolute top-1/3 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 relative z-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect text-sm font-medium border border-purple-400/30 mb-6"
          >
            <Star className="w-4 h-4 text-yellow-400" />
            Premium Features
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6">
            Everything You Need to <span className="linear-text">Succeed</span>
          </h2>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
            Powerful features designed to transform your workflow and supercharge your productivity
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto relative z-10"
        >
          {[
            {
              icon: Target,
              title: "Smart Task Management",
              description: "Organize tasks with priorities, tags, and deadlines. AI-powered suggestions ensure you never miss what matters most.",
              linear: "from-purple-500 to-pink-500",
              stats: "10x faster",
              delay: 0
            },
            {
              icon: TrendingUp,
              title: "Habit Tracking",
              description: "Build lasting habits with intelligent streak tracking, visual progress charts, and motivational insights.",
              linear: "from-blue-500 to-cyan-500",
              stats: "95% success rate",
              delay: 0.1
            },
            {
              icon: BarChart3,
              title: "Analytics Dashboard",
              description: "Visualize your productivity with stunning real-time charts, deep insights, and personalized recommendations.",
              linear: "from-orange-500 to-yellow-500",
              stats: "Real-time data",
              delay: 0.2
            },
            {
              icon: Clock,
              title: "Time Blocking",
              description: "Plan your day with precision using our integrated calendar, smart scheduling, and focus time optimization.",
              linear: "from-green-500 to-emerald-500",
              stats: "Save 2hrs/day",
              delay: 0.3
            },
            {
              icon: Users,
              title: "Team Collaboration",
              description: "Share tasks, sync progress, and collaborate in real-time with your team using advanced permission controls.",
              linear: "from-indigo-500 to-purple-500",
              stats: "Unlimited teams",
              delay: 0.4
            },
            {
              icon: Zap,
              title: "Quick Actions",
              description: "Lightning-fast keyboard shortcuts, voice commands, and intelligent quick actions to 10x your workflow speed.",
              linear: "from-pink-500 to-rose-500",
              stats: "50+ shortcuts",
              delay: 0.5
            }
          ].map((feature, index) => (
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
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.linear} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

              {/* Subtle glow effect */}
              <div className={`absolute -inset-1 bg-gradient-to-br ${feature.linear} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10`} />

              <div className="relative z-10">
                {/* Icon with animated background */}
                <div className="relative mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.linear} flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                    <feature.icon className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
                  </div>
                  {/* Floating badge */}
                  <div className="absolute -top-2 -right-2 px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs font-semibold text-white border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
                    {feature.stats}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 leading-relaxed transition-colors">
                  {feature.description}
                </p>

                {/* Arrow indicator */}
                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-purple-400 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-2">
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16 relative z-10"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(147, 51, 234, 0.6)" }}
            whileTap={{ scale: 0.95 }}
            className="group px-10 py-5 rounded-2xl linear-primary font-bold text-lg shadow-2xl inline-flex items-center gap-3"
          >
            Explore All Features
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </motion.button>
        </motion.div>
      </section>

      {/* Social Proof Section */}
      <section className="relative z-10 py-20 px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Loved by <span className="linear-text">Thousands</span>
          </h2>
          <p className="text-gray-400 text-lg">See what our users have to say</p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {[
            {
              name: "Sarah Johnson",
              role: "Product Manager",
              content: "TaskLoop transformed how I manage my daily workflow. The habit tracking feature is a game-changer!",
              rating: 5
            },
            {
              name: "Michael Chen",
              role: "Software Engineer",
              content: "Clean interface, powerful features. This is exactly what I needed to stay organized and productive.",
              rating: 5
            },
            {
              name: "Emily Rodriguez",
              role: "Entrepreneur",
              content: "I've tried many productivity apps, but TaskLoop stands out with its beautiful design and ease of use.",
              rating: 5
            }
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              className="p-8 rounded-3xl glass-effect border border-white/10"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">`{testimonial.content}`</p>
              <div>
                <div className="font-semibold">{testimonial.name}</div>
                <div className="text-sm text-gray-400">{testimonial.role}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
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
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-2xl bg-white text-purple-600 font-bold text-lg shadow-2xl hover:shadow-white/20 transition-shadow"
              >
                Start Free Trial
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-2xl border-2 border-white/30 font-bold text-lg hover:bg-white/10 transition-colors"
              >
                Contact Sales
              </motion.button>
            </div>
            <p className="text-sm text-purple-200 mt-6">
              <CheckCircle2 className="w-4 h-4 inline mr-1" />
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
