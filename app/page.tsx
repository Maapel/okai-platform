'use client';
import { createClient } from '@/utils/supabase/client';
import Leaderboard from '@/components/Leaderboard';
import Navbar from '@/components/Navbar';
import ChallengeCard from '@/components/ChallengeCard';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  const supabase = createClient();
  const [status, setStatus] = useState<'idle' | 'starting' | 'active'>('idle');
  const [repoUrl, setRepoUrl] = useState('');
  const [userHandle, setUserHandle] = useState('');

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

  return (
    <div className="min-h-screen text-zinc-300 font-sans selection:bg-emerald-500/30 overflow-x-hidden">
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-32">
        {/* HERO: Grounded & Direct */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mb-24 relative"
        >
          <div className="absolute -left-20 -top-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

          <h1 className="text-6xl md:text-7xl font-bold text-white tracking-tighter mb-8 leading-[1.1]">
            Real-world <br />
            <span className="text-gradient-primary">engineering challenges.</span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed mb-8 max-w-2xl font-light">
            OkAI is the standard for proving engineering talent.
            Fix broken production systems, optimize legacy code, and build a verified portfolio of your work.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12" id="challenges">
          {/* LEFT: Challenge Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-8 space-y-6"
          >
            <ChallengeCard
              userHandle={userHandle}
              onStart={handleStart}
              status={status}
              repoUrl={repoUrl}
              elapsed={elapsed}
            />
          </motion.div>

          {/* RIGHT: Leaderboard */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="lg:col-span-4 space-y-8"
          >
            <Leaderboard />
          </motion.div>
        </div>
      </main>
    </div>
  );
}
