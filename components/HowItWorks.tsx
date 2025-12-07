'use client';

import { motion } from 'framer-motion';
import { GitFork, Terminal, Trophy, ArrowRight } from 'lucide-react';

const steps = [
    {
        icon: GitFork,
        title: "Fork & Clone",
        description: "Start a challenge by forking a real-world repository. It's broken, buggy, or slow—just like real production code."
    },
    {
        icon: Terminal,
        title: "Fix & Optimize",
        description: "Write code to pass the test suite. Fix race conditions, optimize queries, and handle edge cases locally."
    },
    {
        icon: Trophy,
        title: "Verify & Rank",
        description: "Push your changes. Our engine verifies your solution instantly and calculates your global Velocity Rating."
    }
];

export default function HowItWorks() {
    return (
        <section className="py-24 relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How it works</h2>
                    <p className="text-zinc-400 max-w-xl">
                        No whiteboards, no LeetCode. Just real engineering problems.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-zinc-800 via-emerald-500/50 to-zinc-800 border-t border-dashed border-zinc-700/50 z-0"></div>

                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className="relative z-10 group"
                        >
                            <div className="glass-card p-8 rounded-2xl h-full hover:border-emerald-500/30 transition-colors duration-300">
                                <div className="w-12 h-12 bg-zinc-900 rounded-xl border border-zinc-800 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-emerald-500/50 transition-all duration-300 shadow-lg shadow-black/50">
                                    <step.icon className="text-emerald-500" size={24} />
                                </div>

                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">{step.title}</h3>
                                <p className="text-zinc-400 leading-relaxed text-sm">
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
