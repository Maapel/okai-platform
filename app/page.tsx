'use client';
import { createClient } from '@/utils/supabase/client';
import Leaderboard from '@/components/Leaderboard';
import Navbar from '@/components/Navbar';
import { Terminal, ArrowRight, Zap, Cpu, Bot, TrendingUp, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export default function Home() {
  const supabase = createClient();
  const [copied, setCopied] = useState(false);

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo: `${location.origin}/auth/callback` }
    });
  };

  const copyCommand = () => {
    navigator.clipboard.writeText("git clone https://github.com/Maapel/okai-challenge-01.git");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-300 font-sans selection:bg-emerald-500/30">

      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-24">

        {/* HERO: Velocity Focus */}
        <div className="max-w-4xl mb-32">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full bg-emerald-500/5 border border-emerald-500/10 text-emerald-500 text-xs font-medium uppercase tracking-wider">
            <Zap size={12} />
            <span>AI-Native Engineering Protocol</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold text-white tracking-tight mb-8 leading-[1.0]">
            Speed is the <br />
            <span className="text-zinc-600">new signal.</span>
          </h1>

          <p className="text-xl text-zinc-400 leading-relaxed mb-10 max-w-2xl">
            Most platforms test if you can write code from scratch.
            <strong className="text-white font-medium"> OkAI tests if you can ship. </strong>
            <br />
            Bring your own Agent. Fix broken production systems. Get a certified
            <span className="text-emerald-500 font-mono mx-2">Velocity Rating</span>
            that proves you're ready for the big leagues.
          </p>

          <div className="flex gap-4">
            <button
              onClick={handleLogin}
              className="h-14 px-8 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition-all flex items-center gap-2"
            >
              Start Calibration
              <ArrowRight size={18} />
            </button>
            <a href="#challenges" className="h-14 px-8 flex items-center justify-center border border-zinc-800 text-zinc-300 font-medium rounded-lg hover:bg-zinc-900 transition-all">
              View Active Bounties
            </a>
          </div>
        </div>

        {/* COMPARISON / FEATURES */}
        <div className="grid md:grid-cols-3 gap-8 border-t border-zinc-900 pt-16 mb-32">
          <div className="space-y-4">
            <div className="w-10 h-10 bg-zinc-900 rounded-lg flex items-center justify-center border border-zinc-800">
              <Bot size={20} className="text-white" />
            </div>
            <h3 className="text-lg font-bold text-white">AI-Native Workflow</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              We don't ban AI; we expect it. Repos come with <code className="text-zinc-300">.cursorrules</code> pre-configured. Can you guide Copilot/Cursor to fix a race condition in 5 minutes?
            </p>
          </div>

          <div className="space-y-4">
            <div className="w-10 h-10 bg-zinc-900 rounded-lg flex items-center justify-center border border-zinc-800">
              <TrendingUp size={20} className="text-white" />
            </div>
            <h3 className="text-lg font-bold text-white">Velocity Rating (VR)</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Your "MMR" for engineering. Based on time-to-merge, test coverage, and code stability. Higher VR = Higher Hireability.
            </p>
          </div>

          <div className="space-y-4">
            <div className="w-10 h-10 bg-zinc-900 rounded-lg flex items-center justify-center border border-zinc-800">
              <Cpu size={20} className="text-white" />
            </div>
            <h3 className="text-lg font-bold text-white">Production Incidents</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              No "invert a binary tree." You'll face rate limits, memory leaks, and dependency hell. Just like the real job.
            </p>
          </div>
        </div>

        {/* CHALLENGE & LEADERBOARD SECTION */}
        <div className="grid lg:grid-cols-12 gap-16" id="challenges">

          {/* Active Challenge */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Active Calibration</h2>
            </div>

            <div className="bg-[#121214] border border-zinc-800 rounded-xl p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                <span className="text-xs font-mono text-emerald-500 border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 rounded">
                  VR WEIGHT: 2500
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">Resilience: The Chaos API</h3>
              <div className="flex gap-3 text-xs text-zinc-500 font-mono mb-6">
                <span>NODE.JS</span>
                <span>•</span>
                <span>BACKEND</span>
                <span>•</span>
                <span>EST: 30M</span>
              </div>

              <p className="text-zinc-400 leading-relaxed mb-8">
                Your mission: Write a client that ingests 100% of data from a intentionally flaky API.
                It throws 500s, 429s, and silent errors. If your script crashes, you fail.
              </p>

              {/* Terminal Block */}
              <div className="bg-black rounded-lg border border-zinc-800 p-4 font-mono text-xs mb-6 group/term cursor-pointer hover:border-zinc-700 transition-colors" onClick={copyCommand}>
                <div className="flex justify-between text-zinc-600 mb-2 group-hover/term:text-emerald-500 transition-colors">
                  <span>bash</span>
                  <span>{copied ? "Copied" : "Copy"}</span>
                </div>
                <div className="space-y-1 text-zinc-300">
                  <p>$ git clone https://github.com/Maapel/okai-challenge-01.git</p>
                  <p>$ cd okai-challenge-01</p>
                  <p>$ npm install && npm test</p>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleLogin}
                  className="px-6 py-3 bg-white text-black font-semibold rounded hover:bg-zinc-200 transition-all text-sm"
                >
                  Accept Challenge
                </button>
              </div>
            </div>
          </div>

          {/* Live Leaderboard */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Global Velocity Rankings</h2>
              <div className="text-[10px] text-zinc-600 font-mono">LIVE</div>
            </div>

            <Leaderboard />

            <div className="p-4 bg-zinc-900/30 border border-zinc-800 rounded-lg text-xs text-zinc-500 text-center">
              <p>Top 1% VR holders are scouted by partner startups weekly.</p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
