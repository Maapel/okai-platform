'use client';
import { createClient } from '@/utils/supabase/client';
import Leaderboard from '@/components/Leaderboard';
import Navbar from '@/components/Navbar';
import { Code2, GitFork, Trophy, Clock, Copy, Check, ArrowRight, Lock, Loader2, Play } from 'lucide-react';
import { useState } from 'react';

export default function Home() {
  const supabase = createClient();
  const [status, setStatus] = useState<'idle' | 'starting' | 'active'>('idle');
  const [repoUrl, setRepoUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const handleStart = async () => {
    setStatus('starting');

    // 1. Check Auth
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: { redirectTo: `${location.origin}/auth/callback` }
      });
      return;
    }

    // 2. Start Timer API
    try {
      const res = await fetch('/api/challenge/start', { method: 'POST' });
      const data = await res.json();

      if (data.repoUrl) {
        setRepoUrl(data.repoUrl);
        setStatus('active');
      }
    } catch (e) {
      console.error("Failed to start challenge", e);
      setStatus('idle');
    }
  };

  const copyCommand = () => {
    navigator.clipboard.writeText(`git clone ${repoUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-300 font-sans selection:bg-emerald-500/30">

      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-16">

        {/* HERO: Functional & Direct */}
        <div className="max-w-3xl mb-20">
          <h1 className="text-5xl font-bold text-white tracking-tight mb-6">
            Real-world engineering challenges.
          </h1>
          <p className="text-xl text-zinc-400 leading-relaxed mb-8">
            OkAI is a verification protocol for software engineers.
            Clone production-grade repositories, fix broken systems, and get a verified
            <span className="text-emerald-500 font-medium mx-1.5">Velocity Rating</span>
            based on your speed and code quality.
          </p>
          <div className="flex gap-4">
            <button
              onClick={handleLogin}
              className="h-12 px-6 bg-white text-black font-semibold rounded-lg hover:bg-zinc-200 transition-all flex items-center gap-2"
            >
              Get Started <ArrowRight size={16} />
            </button>
            <a href="#challenges" className="h-12 px-6 flex items-center justify-center border border-zinc-800 text-zinc-300 font-medium rounded-lg hover:bg-zinc-900 transition-all">
              Browse Challenges
            </a>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12" id="challenges">

          {/* LEFT COLUMN: Challenge Directory */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-900">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Code2 size={20} className="text-emerald-500" />
                Active Challenges
              </h2>
              <span className="text-xs text-zinc-500 font-mono">1 ACTIVE</span>
            </div>

            {/* CARD 1: The Chaos API */}
            <div className="group bg-[#121214] border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition-all relative">

              {/* Card Content */}
              <div className="p-6 md:p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                      API Rate Limiter & Resilience
                    </h3>
                    <div className="flex gap-3 text-xs text-zinc-500 font-mono">
                      <span className="text-emerald-400">Node.js</span> • <span>Backend</span> • <span>Hard</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-zinc-600">ID: CHAOS-01</span>
                </div>

                <p className="text-sm text-zinc-400 leading-relaxed mb-8 max-w-2xl">
                  A legacy API client is failing. It returns 429s and silent failures. Refactor it to handle backoff strategies and ensure 100% data integrity.
                </p>

                {/* THE ACTION AREA */}
                {status === 'active' ? (
                  <div className="bg-zinc-900/50 rounded-lg border border-zinc-800 p-4 space-y-4 animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-center justify-between text-xs text-zinc-400">
                      <span className="text-emerald-500 flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        Timer Running...
                      </span>
                      <span>Step 1: Fork & Clone</span>
                    </div>

                    <div className="flex gap-3">
                      <div
                        onClick={copyCommand}
                        className="flex-1 bg-black border border-zinc-700 rounded flex items-center px-3 py-3 cursor-pointer hover:border-emerald-500/50 transition-colors"
                      >
                        <span className="text-emerald-500 mr-3">$</span>
                        <code className="flex-1 font-mono text-xs text-zinc-300 truncate">
                          git clone {repoUrl}
                        </code>
                        {copied ? <Check size={14} className="text-emerald-500"/> : <Copy size={14} />}
                      </div>
                      <a
                        href={repoUrl}
                        target="_blank"
                        className="px-4 bg-white text-black font-bold rounded flex items-center text-xs hover:bg-zinc-200"
                      >
                        Open Repo <ArrowRight size={14} className="ml-2"/>
                      </a>
                    </div>
                    <p className="text-[10px] text-zinc-500">
                      *Important: <strong>Fork</strong> the repository, then push to your fork's main branch to trigger the Judge.
                    </p>
                  </div>
                ) : (
                  <button
                    onClick={handleStart}
                    disabled={status === 'starting'}
                    className="w-full h-14 bg-white text-black font-bold rounded-lg hover:bg-zinc-200 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === 'starting' ? (
                      <><Loader2 className="animate-spin" /> Initializing Environment...</>
                    ) : (
                      <><Play size={18} fill="currentColor" /> Start Challenge</>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* CARD 2: Coming Soon (To show the platform scale) */}
            <div className="bg-zinc-900/20 border border-zinc-800/50 rounded-xl p-8 opacity-60 flex justify-between items-center cursor-not-allowed">
              <div>
                <h3 className="text-lg font-bold text-zinc-500">Next.js Server Actions Mutation</h3>
                <p className="text-sm text-zinc-600 mt-1">Fix a race condition in a high-traffic voting component.</p>
              </div>
              <span className="text-xs border border-zinc-800 px-3 py-1.5 rounded-full text-zinc-500">
                Coming Soon
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN: Sidebar */}
          <div className="lg:col-span-4 space-y-8">

            {/* Leaderboard Widget */}
            <div className="bg-[#121214] border border-zinc-800 rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-zinc-800 flex justify-between items-center">
                <h3 className="text-sm font-bold text-white">Recent Activity</h3>
                <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-mono uppercase">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  Live
                </div>
              </div>
              <Leaderboard />
            </div>

            {/* "How it Works" - Simple Text */}
            <div className="p-6">
              <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4">How it works</h4>
              <ol className="space-y-6 relative border-l border-zinc-800 ml-1.5">
                <li className="pl-6 relative">
                  <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-zinc-800 border-2 border-[#09090b]" />
                  <h5 className="text-sm font-medium text-white">1. Clone the Repo</h5>
                  <p className="text-xs text-zinc-500 mt-1">Work locally in VS Code. Use your own tools and AI agents.</p>
                </li>
                <li className="pl-6 relative">
                  <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-zinc-800 border-2 border-[#09090b]" />
                  <h5 className="text-sm font-medium text-white">2. Fix the Issue</h5>
                  <p className="text-xs text-zinc-500 mt-1">Solve the constraints listed in the README.</p>
                </li>
                <li className="pl-6 relative">
                  <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#09090b]" />
                  <h5 className="text-sm font-medium text-white">3. Push to Main</h5>
                  <p className="text-xs text-zinc-500 mt-1">Our system runs the test suite and verifies your solution instantly.</p>
                </li>
              </ol>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
