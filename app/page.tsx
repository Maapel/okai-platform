'use client';
import { createClient } from '@/utils/supabase/client';
import Leaderboard from '@/components/Leaderboard';
import Navbar from '@/components/Navbar';
import { Terminal, ArrowRight, Code2, GitFork, Trophy, Clock, Copy, Check } from 'lucide-react';
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

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-20">

        {/* HERO: Direct and Clear */}
        <div className="max-w-3xl mb-24">
          <h1 className="text-5xl sm:text-6xl font-bold text-white tracking-tight mb-6">
            Real-world engineering challenges.
          </h1>
          <p className="text-xl text-zinc-400 leading-relaxed mb-8">
            OkAI is a platform for practicing production-grade development.
            Clone repositories, fix broken systems, and verify your skills with automated test suites.
          </p>
          <div className="flex gap-4">
            <button
              onClick={handleLogin}
              className="h-12 px-6 bg-white text-black font-semibold rounded-lg hover:bg-zinc-200 transition-all"
            >
              Get Started
            </button>
            <a href="#challenges" className="h-12 px-6 flex items-center justify-center border border-zinc-800 text-zinc-300 font-medium rounded-lg hover:bg-zinc-900 transition-all">
              View Challenges
            </a>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12" id="challenges">

          {/* LEFT COLUMN: The Challenge List */}
          <div className="lg:col-span-8 space-y-8">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <Code2 size={20} className="text-emerald-500" />
              Active Challenges
            </h2>

            {/* Challenge Card 01 */}
            <div className="bg-[#121214] border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition-colors">
              <div className="p-6 md:p-8">
                <div className="flex justify-between items-start mb-4">
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-white">API Rate Limiter & Resilience</h3>
                    <div className="flex items-center gap-3 text-xs text-zinc-500 font-medium">
                      <span className="text-emerald-400">Node.js</span>
                      <span>•</span>
                      <span>Backend</span>
                      <span>•</span>
                      <span>Hard</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-xs font-mono text-zinc-500">ID: CHAOS-01</span>
                  </div>
                </div>

                <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                  A legacy API client is crashing under load. It fails to handle 429 errors and "Silent Failure" 200 OK responses. Your task is to refactor the ingestion script to implement exponential backoff and 100% data reliability.
                </p>

                {/* Quick Start Bar */}
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center bg-black/40 rounded-lg p-3 border border-zinc-900">
                  <div className="flex-1 font-mono text-xs text-zinc-400 truncate w-full">
                    <span className="text-zinc-600 select-none mr-2">$</span>
                    git clone https://github.com/Maapel/okai-challenge-01.git
                  </div>
                  <button
                    onClick={copyCommand}
                    className="shrink-0 flex items-center gap-2 text-xs font-medium text-emerald-500 hover:text-emerald-400"
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    {copied ? "Copied" : "Copy Clone Command"}
                  </button>
                </div>
              </div>

              <div className="bg-zinc-900/50 px-6 md:px-8 py-3 border-t border-zinc-800 flex justify-between items-center text-xs text-zinc-500">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5"><Clock size={14} /> ~45 mins</span>
                  <span className="flex items-center gap-1.5"><GitFork size={14} /> 128 forks</span>
                </div>
                <button onClick={handleLogin} className="text-white hover:underline">
                  View Details {'>'}
                </button>
              </div>
            </div>

            {/* Placeholder for Challenge 02 (To show it's a list) */}
            <div className="bg-[#121214] border border-zinc-800/50 rounded-xl p-8 opacity-50 grayscale hover:opacity-75 hover:grayscale-0 transition-all cursor-not-allowed">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-white">Next.js Server Actions Mutation</h3>
                <span className="text-xs border border-zinc-700 px-2 py-1 rounded text-zinc-500">Coming Soon</span>
              </div>
              <p className="text-sm text-zinc-500">
                Fix a race condition in a high-traffic voting component using Optimistic UI and Supabase Realtime.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: Sidebar Stats */}
          <div className="lg:col-span-4 space-y-8">

            {/* Leaderboard Widget */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Trophy size={16} className="text-emerald-500" />
                  Recent Completions
                </h2>
              </div>
              <Leaderboard />
            </div>

            {/* Info Card */}
            <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-sm font-bold text-white mb-3">How it works</h3>
              <ol className="space-y-4 text-sm text-zinc-400">
                <li className="flex gap-3">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-zinc-800 text-xs font-medium text-white shrink-0">1</span>
                  <span>Clone the repository locally. Use your own IDE and tools.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-zinc-800 text-xs font-medium text-white shrink-0">2</span>
                  <span>Solve the problem constraints listed in the README.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-zinc-800 text-xs font-medium text-white shrink-0">3</span>
                  <span>Push to main. Our GitHub Action runs the test suite instantly.</span>
                </li>
              </ol>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
