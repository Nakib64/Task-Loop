import React from 'react';
import { motion } from "framer-motion";
import { Star } from 'lucide-react';

const Social = () => {

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };
    return (
        <div>
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
        </div>
    );
};

export default Social;