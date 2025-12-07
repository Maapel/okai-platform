'use client';
import { createClient } from '@/utils/supabase/client';
import Leaderboard from '@/components/Leaderboard';
import Navbar from '@/components/Navbar';
import { Terminal, ArrowRight, Activity, ShieldCheck, Cpu, Lock, Copy, Check } from 'lucide-react';
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
    navigator.clipboard.writeText("git clone https://github.com/Maapel/okai-simulation-01.git");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-300 font-sans selection:bg-emerald-500/30">

      <Navbar />

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-16">

          {/* Left Column: The "Hook" (60% width) */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-10">

            {/* The "Live" Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-xs font-mono w-fit">
              <Activity size={12} />
              <span>SIMULATION #001: LIVE NOW</span>
            </div>

            <div className="space-y-6">
              <h1 className="text-6xl md:text-7xl font-bold text-white tracking-tighter leading-[0.9]">
                Don't Interview.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-700">
                  Just Ship.
                </span>
              </h1>
              <p className="text-xl text-zinc-400 max-w-lg leading-relaxed">
                The first engineering league where your code is your resume. Solve production disasters, not algorithm puzzles.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleLogin}
                className="h-14 px-8 bg-white text-black font-bold rounded-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
              >
                <Terminal size={18} />
                Start Simulation
              </button>
              <div className="h-14 px-6 rounded-lg border border-white/10 flex items-center justify-center gap-3 text-sm text-zinc-400">
                <div className="flex -space-x-3">
                  {[1,2,3].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-zinc-800 border-2 border-[#09090b]" />
                  ))}
                </div>
                <span>128 Engineers Online</span>
              </div>
            </div>

            {/* The "Proof" Section */}
            <div className="pt-12 border-t border-white/5 grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-white font-semibold mb-1 flex items-center gap-2">
                  <Cpu size={16} className="text-emerald-500"/>
                  Real Environments
                </h3>
                <p className="text-sm text-zinc-500">
                  No sandboxes. You get a real repo, real APIs, and real broken code.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1 flex items-center gap-2">
                  <Lock size={16} className="text-emerald-500"/>
                  Bounties Unlocked
                </h3>
                <p className="text-sm text-zinc-500">
                  Top 5% performers get direct intros to YC Founders.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: The "Console" (40% width) */}
          <div className="lg:col-span-5 space-y-6">

            {/* The Active Mission Card */}
            <div className="bg-zinc-900/50 border border-white/10 rounded-xl overflow-hidden backdrop-blur-md">
              <div className="bg-white/5 px-4 py-3 border-b border-white/5 flex justify-between items-center">
                <span className="text-xs font-mono text-zinc-400">MISSION_BRIEF.md</span>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/50" />
                </div>
              </div>
              <div className="p-6 space-y-4 font-mono text-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-white font-bold text-lg">Chaos API Integration</h3>
                    <p className="text-emerald-500 text-xs mt-1">DIFFICULTY: HARD</p>
                  </div>
                  <div className="text-right">
                    <p className="text-zinc-500 text-xs">REWARD</p>
                    <p className="text-white font-bold">2500 XP</p>
                  </div>
                </div>

                <div className="space-y-2 text-zinc-400 text-xs">
                  <p className="flex gap-2">
                    <span className="text-emerald-500">➜</span>
                    <span>Handle 429 Rate Limits without crashing</span>
                  </p>
                  <p className="flex gap-2">
                    <span className="text-emerald-500">➜</span>
                    <span>Parse "Silent Error" 200 OK responses</span>
                  </p>
                  <p className="flex gap-2">
                    <span className="text-emerald-500">➜</span>
                    <span>Implement exponential backoff</span>
                  </p>
                </div>

                <div className="pt-4 border-t border-dashed border-white/10">
                   <div
                     onClick={copyCommand}
                     className="bg-black rounded p-3 text-xs text-zinc-500 font-mono relative group cursor-pointer hover:border-zinc-700 transition-colors"
                   >
                     <div className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity">
                       {copied ? <Check size={14} className="text-emerald-500"/> : <Copy size={14} />}
                     </div>
                     <div className="space-y-1">
                       <p><span className="text-emerald-500">➜</span> git clone https://github.com/Maapel/okai-simulation-01.git</p>
                       <p><span className="text-emerald-500">➜</span> cd okai-simulation-01</p>
                       <p><span className="text-emerald-500">➜</span> npm install</p>
                       <p><span className="text-emerald-500">➜</span> npm start <span className="animate-pulse">_</span></p>
                     </div>
                   </div>
                </div>
              </div>
            </div>

            {/* The Live Leaderboard Widget */}
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500/5 blur-3xl rounded-full pointer-events-none" />
              <Leaderboard />
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
