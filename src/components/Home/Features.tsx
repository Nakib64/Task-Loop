import { motion } from "framer-motion";
import { Star, Target, TrendingUp, BarChart3, Clock, Users, Zap, ArrowRight, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function FeaturesWithCourses() {
    const staggerContainer = {
        initial: {},
        animate: { transition: { staggerChildren: 0.15 } },
    };

    const features = [
        {
            icon: Target,
            title: "Smart Task Management",
            description:
                "Organize tasks with priorities, tags, and deadlines. AI-powered suggestions ensure you never miss what matters most.",
            linear: "from-purple-500 to-pink-500",
            stats: "10x faster",
            delay: 0,
        },
        {
            icon: TrendingUp,
            title: "Habit Tracking",
            description:
                "Build lasting habits with intelligent streak tracking, visual progress charts, and motivational insights.",
            linear: "from-blue-500 to-cyan-500",
            stats: "95% success rate",
            delay: 0.1,
        },
        {
            icon: BarChart3,
            title: "Analytics Dashboard",
            description:
                "Visualize your productivity with real-time charts, deep insights, and personalized recommendations.",
            linear: "from-orange-500 to-yellow-500",
            stats: "Real-time data",
            delay: 0.2,
        },
        {
            icon: Clock,
            title: "Time Blocking",
            description:
                "Plan your day with precision using integrated calendars, smart scheduling, and focus optimization.",
            linear: "from-green-500 to-emerald-500",
            stats: "Save 2hrs/day",
            delay: 0.3,
        },
        {
            icon: Users,
            title: "Team Collaboration",
            description:
                "Share tasks, sync progress, and collaborate in real-time with advanced permission controls.",
            linear: "from-indigo-500 to-purple-500",
            stats: "Unlimited teams",
            delay: 0.4,
        },
        {
            icon: Zap,
            title: "Quick Actions",
            description:
                "Lightning-fast keyboard shortcuts, voice commands, and intelligent quick actions to boost productivity.",
            linear: "from-pink-500 to-rose-500",
            stats: "50+ shortcuts",
            delay: 0.5,
        },
    ];

    const courseFeatures = [
        {
            title: "Buy Courses Instantly",
            description:
                "Purchase premium productivity, habit-building, and personal development courses directly on the platform.",
            icon: ShoppingCart,
            linear: "from-purple-500 to-indigo-500",
        },
        {
            title: "Continue Learning Anytime",
            description:
                "Your purchased courses sync across all your devices, so you can resume right where you left off.",
            icon: ArrowRight,
            linear: "from-blue-500 to-cyan-500",
        },
    ];

    return (
        <section className="relative z-10 py-24 px-6 md:px-12">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
                <div className="absolute top-1/3 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
            </div>

            {/* Header */}
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
                    Powerful features plus a built-in course marketplace designed to help you grow and perform at your best.
                </p>
            </motion.div>

            {/* Feature grid */}
            <motion.div
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto relative z-10"
            >
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: feature.delay }}
                        whileHover={{ y: -12, scale: 1.02, transition: { duration: 0.3 } }}
                        className="group relative p-8 rounded-3xl glass-effect border border-white/10 hover:border-white/30 transition-all cursor-pointer overflow-hidden"
                    >
                        <div className={`absolute inset-0 bg-linear-to-br ${feature.linear} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                        <div className={`absolute -inset-1 bg-linear-to-br ${feature.linear} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10`} />

                        <div className="relative z-10">
                            <div className="relative mb-6">
                                <div
                                    className={`w-16 h-16 rounded-2xl bg-linear-to-br ${feature.linear} flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}
                                >
                                    <feature.icon className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
                                </div>
                                <div className="absolute -top-2 -right-2 px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs font-semibold text-white border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
                                    {feature.stats}
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors">
                                {feature.title}
                            </h3>

                            <p className="text-gray-400 group-hover:text-gray-300 leading-relaxed transition-colors">
                                {feature.description}
                            </p>

                            <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-purple-400 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-2">
                                <span>Learn more</span>
                                <ArrowRight className="w-4 h-4" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Course marketplace CTA */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-center mt-24 relative z-10"
            >
                <h3 className="text-4xl font-bold mb-10">Master Productivity with Premium Courses</h3>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {courseFeatures.map((item, i) => (
                        <div
                            key={i}
                            className={`p-8 rounded-3xl glass-effect border border-white/10 bg-linear-to-br ${item.linear}`}
                        >
                            <item.icon className="w-10 h-10 mb-4 text-white" />
                            <h4 className="text-2xl font-semibold mb-3 text-white">{item.title}</h4>
                            <p className="text-gray-200">{item.description}</p>
                        </div>
                    ))}
                </div>

                <Link href={'/dashboard/courses/browse'}>
                    <motion.button
                        whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(147, 51, 234, 0.6)" }}
                        whileTap={{ scale: 0.95 }}
                        className="group px-10 py-5 rounded-2xl linear-primary font-bold text-lg shadow-2xl inline-flex items-center gap-3 mt-12"
                    >
                        Browse Courses
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </motion.button>
                </Link>

            </motion.div>
        </section>
    );
}