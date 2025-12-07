'use client';
import { createClient } from '@/utils/supabase/client';
import Leaderboard from '@/components/Leaderboard';
import Navbar from '@/components/Navbar';
import { Terminal, Code2, GitFork, Trophy, Clock, Copy, Check, ArrowRight, Play, Loader2, Wifi } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Home() {
  const supabase = createClient();
  const [status, setStatus] = useState<'idle' | 'starting' | 'active'>('idle');
  const [repoUrl, setRepoUrl] = useState('');
  const [userHandle, setUserHandle] = useState('');
  const [copied, setCopied] = useState(false);

  // TIMER STATE
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState('00:00');

  // 1. Live Timer Logic
  useEffect(() => {
    if (!startTime) return;
    const interval = setInterval(() => {
      const seconds = Math.floor((Date.now() - startTime) / 1000);
      const m = Math.floor(seconds / 60).toString().padStart(2, '0');
      const s = (seconds % 60).toString().padStart(2, '0');
      setElapsed(`${m}:${s}`);
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo: `${location.origin}/auth/callback` }
    });
  };

  const handleStart = async () => {
    setStatus('starting');

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: { redirectTo: `${location.origin}/auth/callback` }
      });
      return;
    }

    // Capture username for the "Smart Clone" command
    setUserHandle(user.user_metadata.user_name);

    try {
      const res = await fetch('/api/challenge/start', { method: 'POST' });
      const data = await res.json();

      if (data.repoUrl) {
        setRepoUrl(data.repoUrl);
        setStartTime(Date.now()); // Start local timer
        setStatus('active');
      }
    } catch (e) {
      console.error("Failed to start challenge", e);
      setStatus('idle');
    }
  };

  const copyCommand = () => {
    // SMART CLONE: We predict their fork URL so they don't clone the wrong one
    const forkUrl = `https://github.com/${userHandle}/okai-challenge-01.git`;
    navigator.clipboard.writeText(`git clone ${forkUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-300 font-sans selection:bg-emerald-500/30">

      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-16">

        {/* HERO: Grounded & Direct */}
        <div className="max-w-3xl mb-20">
          <h1 className="text-5xl font-bold text-white tracking-tight mb-6">
            Real-world engineering challenges.
          </h1>
          <p className="text-xl text-zinc-400 leading-relaxed mb-8">
            OkAI is the standard for proving engineering talent.
            Fix broken production systems, optimize legacy code, and build a verified portfolio of your work.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12" id="challenges">

          {/* LEFT: Challenge Card */}
          <div className="lg:col-span-8 space-y-6">

            {/* Status Bar */}
            {status === 'active' && (
              <div className="flex items-center justify-between bg-emerald-500/10 border border-emerald-500/20 px-4 py-3 rounded-lg animate-in slide-in-from-top-2">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <Wifi size={16} className="text-emerald-500 relative" />
                  </div>
                  <span className="text-xs font-mono text-emerald-400 font-bold tracking-wider">WAITING FOR PUSH...</span>
                </div>
                <div className="font-mono text-xl font-bold text-white tabular-nums">
                  {elapsed}
                </div>
              </div>
            )}

            <div className={`group bg-[#121214] border ${status === 'active' ? 'border-emerald-500/30' : 'border-zinc-800'} rounded-xl overflow-hidden transition-all relative`}>
              <div className="p-6 md:p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">API Rate Limiter & Resilience</h3>
                    <div className="flex gap-3 text-xs text-zinc-500 font-mono">
                      <span className="text-emerald-400">Node.js</span> • <span>Backend</span> • <span>Hard</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-zinc-600">ID: CHAOS-01</span>
                </div>

                <p className="text-sm text-zinc-400 leading-relaxed mb-8 max-w-2xl">
                  A legacy API client is failing. It returns 429s and silent failures. Refactor it to handle backoff strategies and ensure 100% data integrity.
                </p>

                {/* ACTION AREA */}
                {status === 'active' ? (
                  <div className="space-y-4">
                    {/* Step 1: Direct Fork Button */}
                    <div className="flex items-center gap-4 p-4 bg-zinc-900/50 rounded-lg border border-zinc-800">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-white border border-zinc-700">1</div>
                      <div className="flex-1">
                        <p className="text-xs text-zinc-300 font-medium">Fork the Repository</p>
                        <p className="text-[10px] text-zinc-500">Create your copy on GitHub.</p>
                      </div>
                      <a
                        href={`${repoUrl}/fork`}
                        target="_blank"
                        className="px-4 py-2 bg-white text-black font-bold rounded text-xs hover:bg-zinc-200 transition-colors flex items-center gap-2"
                      >
                        <GitFork size={14} /> Fork Now
                      </a>
                    </div>

                    {/* Step 2: Smart Clone */}
                    <div className="flex items-center gap-4 p-4 bg-zinc-900/50 rounded-lg border border-zinc-800">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-white border border-zinc-700">2</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-zinc-300 font-medium mb-2">Clone your Fork</p>
                        <div
                          onClick={copyCommand}
                          className="bg-black border border-zinc-700 rounded px-3 py-2 flex items-center justify-between cursor-pointer group/cmd hover:border-emerald-500/50 transition-colors"
                        >
                          <code className="text-xs font-mono text-emerald-500 truncate mr-4">
                            git clone https://github.com/{userHandle}/okai-challenge-01.git
                          </code>
                          {copied ? <Check size={14} className="text-emerald-500 flex-shrink-0"/> : <Copy size={14} className="text-zinc-600 group-hover/cmd:text-white flex-shrink-0"/>}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={handleStart}
                    disabled={status === 'starting'}
                    className="w-full h-14 bg-white text-black font-bold rounded-lg hover:bg-zinc-200 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === 'starting' ? (
                      <><Loader2 className="animate-spin" /> Initializing...</>
                    ) : (
                      <><Play size={18} fill="currentColor" /> Start Challenge</>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: Leaderboard */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-[#121214] border border-zinc-800 rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-zinc-800 flex justify-between items-center">
                <h3 className="text-sm font-bold text-white">Recent Activity</h3>
                <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-mono uppercase">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  Live
                </div>
              </div>
              <Leaderboard />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
