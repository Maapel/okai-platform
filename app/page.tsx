'use client';
import { createClient } from '@/utils/supabase/client';
import Leaderboard from '@/components/Leaderboard';
import Navbar from '@/components/Navbar';
import { Terminal, Code2, GitFork, Trophy, Clock, Copy, Check, ArrowRight, Play } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Home() {
  const supabase = createClient();
  const [copied, setCopied] = useState(false);
  const [challengeStarted, setChallengeStarted] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo: `${location.origin}/auth/callback` }
    });
  };

  const startChallenge = async () => {
    try {
      const response = await fetch('/api/challenge/start', {
        method: 'POST',
      });

      if (response.ok) {
        const data = await response.json();
        setStartTime(new Date(data.startTime));
        setChallengeStarted(true);
      }
    } catch (error) {
      console.error('Failed to start challenge:', error);
    }
  };

  const copyCommand = () => {
    navigator.clipboard.writeText("git clone https://github.com/Maapel/okai-challenge-01.git && cd okai-challenge-01 && npm install");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Timer effect
  useEffect(() => {
    if (startTime && challengeStarted) {
      const timer = setInterval(() => {
        const now = new Date();
        const diff = Math.floor((now.getTime() - startTime.getTime()) / 1000);
        setElapsedTime(diff);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [startTime, challengeStarted]);

  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
            <div className="group bg-[#121214] border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition-all">
              <div className="p-6 md:p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                      API Rate Limiter & Resilience
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 font-medium font-mono">
                      <span className="text-emerald-400 px-2 py-1 bg-emerald-500/10 rounded">Node.js</span>
                      <span>Backend</span>
                      <span>Async/Await</span>
                      <span>Difficulty: Hard</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono text-zinc-600 block mb-1">ID: CHAOS-01</span>
                    {challengeStarted && (
                      <div className="text-emerald-400 font-mono font-bold">
                        {formatTime(elapsedTime)}
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-sm text-zinc-400 leading-relaxed mb-6 max-w-2xl">
                  A legacy data ingestion client is crashing under high load. It fails to handle
                  <code className="mx-1 px-1 bg-black border border-zinc-800 rounded text-zinc-300">429 Too Many Requests</code>
                  and "Silent Failure" responses. Your task is to refactor the client to implement exponential backoff
                  and ensure 100% data integrity.
                </p>

                {!challengeStarted ? (
                  /* Start Timer Button */
                  <button
                    onClick={startChallenge}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Play size={18} />
                    Start Challenge (45m limit)
                  </button>
                ) : (
                  /* Clone Bar - Revealed after start */
                  <div className="flex flex-col sm:flex-row gap-3 items-stretch">
                    <div
                      onClick={copyCommand}
                      className="flex-1 bg-black rounded-lg border border-zinc-900 flex items-center px-4 py-3 cursor-pointer hover:border-emerald-500/30 transition-colors group/cmd"
                    >
                      <span className="text-emerald-500 mr-3">$</span>
                      <code className="flex-1 font-mono text-xs text-zinc-300 truncate">
                        git clone https://github.com/Maapel/okai-challenge-01.git && npm install
                      </code>
                      <div className="ml-3 text-zinc-600 group-hover/cmd:text-white transition-colors">
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                      </div>
                    </div>
                    <button
                      onClick={handleLogin}
                      className="px-6 bg-zinc-100 hover:bg-white text-black font-medium rounded-lg text-sm transition-colors whitespace-nowrap"
                    >
                      Submit Solution
                    </button>
                  </div>
                )}
              </div>

              <div className="bg-zinc-900/30 px-6 py-3 border-t border-zinc-800/50 flex gap-6 text-xs text-zinc-500 font-medium">
                <span className="flex items-center gap-2"><Clock size={14} /> ~45 mins</span>
                <span className="flex items-center gap-2"><GitFork size={14} /> 128 forks</span>
                <span className="flex items-center gap-2"><Trophy size={14} /> Top Score: 100% (12m)</span>
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
