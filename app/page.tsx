'use client';
import { createClient } from '@/utils/supabase/client';
import Leaderboard from '@/components/Leaderboard';
import { Terminal, Github, BarChart3 } from 'lucide-react';

export default function Home() {
  const supabase = createClient();

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo: typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : undefined }
    });
  };

  return (
    <div className='min-h-screen bg-[#050505] text-[#ededed] font-mono overflow-hidden relative'>
      {/* Scanlines Overlay */}
      <div className='fixed inset-0 pointer-events-none z-50'>
        <div className='scanlines' />
      </div>

      {/* Header Status Bar */}
      <header className='fixed top-0 left-0 right-0 z-40 bg-[#050505] border-b border-[#00ff9d]/30 backdrop-blur-sm'>
        <div className='flex items-center justify-between px-6 py-3 text-xs'>
          <div className='flex items-center gap-4'>
            <div className='flex items-center gap-2'>
              <div className='w-2 h-2 bg-[#00ff9d] rounded-full animate-pulse' />
              <span className='text-[#00ff9d]'>SYSTEM: ONLINE</span>
            </div>
            <span className='text-zinc-500'>|</span>
            <span className='text-zinc-400 uppercase'>OkAI Mission Control</span>
          </div>
          <div className='flex items-center gap-4'>
            <div className='flex items-center gap-2'>
              <Terminal className='w-4 h-4 text-[#00ff9d]' />
              <span className='text-zinc-400'>OKAI_PROTOCOL_V2.0</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className='pt-16 min-h-screen'>
        <div className='w-full max-w-7xl mx-auto p-6'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 h-full'>

            {/* Left Column: Mission Briefing */}
            <div className='space-y-8'>
              {/* Mission Title */}
              <div className='text-center lg:text-left mb-8'>
                <h1 className='text-6xl font-black tracking-tighter mb-3 text-white'>
                  PROJECT <span className='text-[#00ff9d]'>CHAOS</span>
                  <span className='text-red-500'>_API</span>
                </h1>
                <p className='text-xl text-zinc-400 font-mono leading-relaxed'>
                  TARGET: Unstable simulation server <br />
                  OBJECTIVE: Extract 50 user records from chaotic endpoints
                </p>
              </div>

              {/* Mission Parameters */}
              <div className=' bg-zinc-900/50 border border-zinc-800 rounded-lg p-6 backdrop-blur-sm'>
                <div className='flex items-center gap-3 mb-4'>
                  <Terminal className='w-5 h-5 text-[#00ff9d]' />
                  <h3 className='text-lg font-bold text-white uppercase tracking-wider'>MISSION PARAMETERS</h3>
                </div>
                <div className='space-y-3 text-zinc-300 font-mono text-sm'>
                  <div className='flex items-start gap-2'>
                    <span className='text-red-400 mt-0.5'>⟩</span>
                    <span>API fails 50% of requests with 500 errors</span>
                  </div>
                  <div className='flex items-start gap-2'>
                    <span className='text-red-400 mt-0.5'>⟩</span>
                    <span>Success responses may contain hidden error flags</span>
                  </div>
                  <div className='flex items-start gap-2'>
                    <span className='text-[#00ff9d] mt-0.5'>⟩</span>
                    <span>Pagination required: 10 pages × 5 users each</span>
                  </div>
                  <div className='flex items-start gap-2'>
                    <span className='text-[#00ff9d] mt-0.5'>⟩</span>
                    <span>30-second execution window</span>
                  </div>
                </div>
              </div>

              {/* Action Commands */}
              <div className='bg-zinc-900/50 border border-zinc-800 rounded-lg p-6 backdrop-blur-sm'>
                <div className='flex items-center gap-3 mb-4'>
                  <Github className='w-5 h-5 text-zinc-400' />
                  <h3 className='text-lg font-bold text-white uppercase tracking-wider'>INITIALIZE SIMULATION</h3>
                </div>

                {/* Terminal Window */}
                <div className='bg-black border border-zinc-700 rounded p-4 font-mono text-sm'>
                  <div className='text-green-400 mb-2'>$ git clone https://github.com/Maapel/okai-simulation-01.git</div>
                  <div className='text-green-400 mb-2'>$ cd okai-simulation-01</div>
                  <div className='text-green-400 mb-2'>$ npm install</div>
                  <div className='text-green-400 mb-2'>$ npm start</div>
                  <div className='text-zinc-500 mt-3'>// Your code here: implement resilient API fetching</div>
                </div>
              </div>

              {/* Launch Button */}
              <button
                onClick={handleLogin}
                className='w-full bg-[#00ff9d] hover:bg-[#00ff9d]/80 text-black font-black py-6 text-xl uppercase tracking-widest rounded-lg transition-all duration-300 shadow-lg shadow-[#00ff9d]/25 hover:shadow-[#00ff9d]/40 font-mono border-2 border-[#00ff9d]'
              >
                [ START SIMULATION ]
              </button>
            </div>

            {/* Right Column: Live Feed */}
            <div className='space-y-8'>
              <div className='text-center lg:text-left mb-8'>
                <div className='flex items-center gap-3 mb-3'>
                  <BarChart3 className='w-8 h-8 text-[#00ff9d]' />
                  <h2 className='text-3xl font-black tracking-tighter text-white'>LIVE MISSION LOG</h2>
                </div>
                <p className='text-zinc-400 font-mono text-sm'>
                  Real-time monitoring of active simulations
                  <br />
                  <span className='text-[#00ff9d]'>REFRESH: <100ms</span>
                </p>
              </div>

              <Leaderboard />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className='fixed bottom-0 left-0 right-0 bg-[#050505] border-t border-zinc-800/50 backdrop-blur-sm'>
        <div className='px-6 py-3'>
          <a
            href="mailto:contact@ok-ai.dev?subject=OkAI Simulation Request"
            className='text-zinc-500 hover:text-[#00ff9d] transition-colors text-sm font-mono underline'
          >
            CTOs: Submit a Simulation Request →
          </a>
        </div>
      </footer>
    </div>
  );
}
