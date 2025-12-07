'use client';
import { createClient } from '@/utils/supabase/client';
import Leaderboard from '@/components/Leaderboard';
import { Terminal, ArrowRight, Activity, ShieldCheck, Users } from 'lucide-react';

export default function Home() {
  const supabase = createClient();

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo: `${location.origin}/auth/callback` }
    });
  };

  return (
    <div className="min-h-screen flex flex-col relative selection:bg-emerald-500/20">

      {/* Navigation: Minimal & Functional */}
      <nav className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold tracking-tight">
            <div className="w-5 h-5 bg-emerald-500 rounded-sm flex items-center justify-center">
              <span className="text-black font-bold text-xs">O</span>
            </div>
            <span>OkAI Protocol</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-zinc-400">
            <span className="hover:text-white cursor-pointer transition-colors">Simulations</span>
            <span className="hover:text-white cursor-pointer transition-colors">Enterprise</span>
            <button
              onClick={handleLogin}
              className="text-white hover:text-emerald-400 transition-colors font-medium"
            >
              Sign In
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-12 lg:py-20 grid lg:grid-cols-2 gap-16 items-start">

        {/* Left Column: The Value Prop */}
        <div className="space-y-10">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Live Simulation Active</span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-white leading-[1.1]">
              Don't Interview. <br />
              <span className="text-zinc-500">Just Simulate.</span>
            </h1>

            <p className="text-lg text-zinc-400 leading-relaxed max-w-md">
              The modern hiring standard. Prove your engineering velocity by solving real-world production incidents, not abstract algorithms.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={handleLogin}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-zinc-200 transition-all active:scale-95"
              >
                Start Simulation
                <ArrowRight size={16} />
              </button>
              <div className="flex items-center gap-4 px-4 text-sm text-zinc-500">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-zinc-950 bg-zinc-800" />
                  ))}
                </div>
                <span>200+ Engineers racing</span>
              </div>
            </div>
          </div>

          {/* Trust Signals / Features */}
          <div className="grid grid-cols-2 gap-6 pt-8 border-t border-zinc-900">
            <div className="space-y-2">
              <Activity className="text-zinc-500" size={20} />
              <h3 className="font-medium text-white">Real Latency</h3>
              <p className="text-sm text-zinc-500">Simulations mimic prod: flaky APIs, rate limits, and bad docs.</p>
            </div>
            <div className="space-y-2">
              <ShieldCheck className="text-zinc-500" size={20} />
              <h3 className="font-medium text-white">Verified Skill</h3>
              <p className="text-sm text-zinc-500">Your code is analyzed for performance, not just correctness.</p>
            </div>
          </div>
        </div>

        {/* Right Column: The "Active Task" Card */}
        <div className="space-y-6">
          <div className="glass-card rounded-xl p-1 overflow-hidden shadow-2xl shadow-black/50">
            {/* Window Header */}
            <div className="bg-zinc-900/80 border-b border-zinc-800 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-emerald-500/10 rounded text-emerald-500">
                  <Terminal size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Chaos_API Integration</h3>
                  <div className="text-xs text-zinc-500">Difficulty: Hard • Time: 30m</div>
                </div>
              </div>
              <div className="text-xs font-mono text-zinc-500 bg-zinc-900 px-2 py-1 rounded">ID: SIM-01</div>
            </div>

            {/* Content */}
            <div className="p-6 bg-zinc-950 space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3 text-sm text-zinc-300">
                  <div className="min-w-[4px] h-4 mt-1 rounded-full bg-zinc-700" />
                  <p>
                    <span className="text-zinc-500 uppercase text-xs font-bold tracking-wider block mb-1">Scenario</span>
                    Our legacy API provider is unstable. It returns 500 errors and silent failures.
                  </p>
                </div>
                <div className="flex items-start gap-3 text-sm text-zinc-300">
                  <div className="min-w-[4px] h-4 mt-1 rounded-full bg-emerald-500" />
                  <p>
                    <span className="text-zinc-500 uppercase text-xs font-bold tracking-wider block mb-1">Objective</span>
                    Write a resilient ingestion script that handles retries and captures 100% of the data without crashing.
                  </p>
                </div>
              </div>

              {/* Code Snippet */}
              <div className="bg-black/50 rounded-lg p-4 font-mono text-xs text-zinc-400 border border-zinc-900">
                <div className="flex justify-between select-none mb-2 opacity-50">
                  <span>terminal</span>
                  <span>bash</span>
                </div>
                <div className="space-y-1">
                  <p><span className="text-emerald-500">➜</span> git clone https://github.com/Maapel/okai-simulation-01.git</p>
                  <p><span className="text-emerald-500">➜</span> cd okai-simulation-01</p>
                  <p><span className="text-emerald-500">➜</span> npm install</p>
                  <p><span className="text-emerald-500">➜</span> npm start <span className="animate-pulse">_</span></p>
                </div>
              </div>

              <button
                onClick={handleLogin}
                className="w-full py-3 bg-zinc-100 hover:bg-white text-black font-medium rounded text-sm transition-colors"
              >
                Accept Challenge
              </button>
            </div>
          </div>

          {/* Live Activity Feed */}
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Users size={16} className="text-zinc-500" />
                Live Leaderboard
              </h3>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
            </div>

            {/* Embedding the Leaderboard Logic Here (Simplified for clean look) */}
            <Leaderboard />
          </div>
        </div>
      </main>
    </div>
  );
}
