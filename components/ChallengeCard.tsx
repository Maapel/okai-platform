'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitFork, Copy, Check, Play, Loader2, Wifi, Terminal, ArrowRight } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

interface ChallengeCardProps {
    userHandle: string;
    onStart: () => void;
    status: 'idle' | 'starting' | 'active';
    repoUrl: string;
    elapsed: string;
}

export default function ChallengeCard({ userHandle, onStart, status, repoUrl, elapsed }: ChallengeCardProps) {
    const [copied, setCopied] = useState(false);

    const copyCommand = () => {
        const forkUrl = `https://github.com/${userHandle}/okai-challenge-01.git`;
        navigator.clipboard.writeText(`git clone ${forkUrl}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative group">
            {/* Background Glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>

            <div className="glass-card rounded-xl overflow-hidden relative">
                {/* Status Bar */}
                <AnimatePresence>
                    {status === 'active' && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-emerald-500/10 border-b border-emerald-500/20 px-6 py-3 flex items-center justify-between"
                        >
                            <div className="flex items-center gap-3">
                                <div className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                                </div>
                                <span className="text-xs font-mono text-emerald-400 font-bold tracking-wider">LIVE SESSION</span>
                            </div>
                            <div className="font-mono text-lg font-bold text-white tabular-nums tracking-tight">
                                {elapsed}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="p-6 md:p-8">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <span className="px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/20">
                                    Backend
                                </span>
                                <span className="px-2 py-1 rounded-md bg-zinc-800/50 text-zinc-400 text-[10px] font-bold uppercase tracking-wider border border-zinc-700/50">
                                    Hard
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">API Rate Limiter & Resilience</h3>
                        </div>
                        <span className="text-xs font-mono text-zinc-600 border border-zinc-800 px-2 py-1 rounded bg-zinc-900/50">ID: CHAOS-01</span>
                    </div>

                    <p className="text-zinc-400 leading-relaxed mb-8 max-w-2xl">
                        A legacy API client is failing under load. It returns 429s and silent failures.
                        Your task is to refactor it to handle backoff strategies, implement a circuit breaker, and ensure 100% data integrity.
                    </p>

                    {/* ACTION AREA */}
                    <AnimatePresence mode="wait">
                        {status === 'active' ? (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-4"
                            >
                                {/* Step 1: Direct Fork Button */}
                                <div className="flex items-center gap-4 p-4 bg-zinc-900/50 rounded-lg border border-zinc-800/50 hover:border-zinc-700 transition-colors">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-sm font-bold text-white border border-zinc-700 shadow-inner">1</div>
                                    <div className="flex-1">
                                        <p className="text-sm text-zinc-200 font-medium">Fork the Repository</p>
                                        <p className="text-xs text-zinc-500">Create your copy on GitHub to start working.</p>
                                    </div>
                                    <a
                                        href={`${repoUrl}/fork`}
                                        target="_blank"
                                        className="px-4 py-2 bg-white text-black font-bold rounded-lg text-xs hover:bg-zinc-200 transition-colors flex items-center gap-2 shadow-lg shadow-white/5"
                                    >
                                        <GitFork size={14} /> Fork Now
                                    </a>
                                </div>

                                {/* Step 2: Smart Clone */}
                                <div className="flex items-center gap-4 p-4 bg-zinc-900/50 rounded-lg border border-zinc-800/50 hover:border-zinc-700 transition-colors">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-sm font-bold text-white border border-zinc-700 shadow-inner">2</div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-zinc-200 font-medium mb-2">Clone your Fork</p>
                                        <div
                                            onClick={copyCommand}
                                            className="bg-black border border-zinc-800 rounded-lg px-4 py-3 flex items-center justify-between cursor-pointer group/cmd hover:border-emerald-500/50 transition-all shadow-inner"
                                        >
                                            <code className="text-xs font-mono text-emerald-500 truncate mr-4">
                                                git clone https://github.com/{userHandle}/okai-challenge-01.git
                                            </code>
                                            {copied ? <Check size={14} className="text-emerald-500 flex-shrink-0" /> : <Copy size={14} className="text-zinc-600 group-hover/cmd:text-white flex-shrink-0 transition-colors" />}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={onStart}
                                disabled={status === 'starting'}
                                className="w-full h-14 bg-gradient-to-r from-white to-zinc-200 text-black font-bold rounded-xl hover:to-white transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:scale-[1.01] active:scale-[0.99]"
                            >
                                {status === 'starting' ? (
                                    <><Loader2 className="animate-spin" /> Initializing Environment...</>
                                ) : (
                                    <><Play size={18} fill="currentColor" /> Start Challenge</>
                                )}
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
