'use client';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Trophy, Clock, Target } from 'lucide-react';

export default function Leaderboard() {
  const [scores, setScores] = useState<any[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchScores = async () => {
      const { data } = await supabase
        .from('submissions')
        .select('*')
        // Sort by pass rate first, then by time (faster is better)
        .order('tests_passed', { ascending: false })
        .order('completion_time_seconds', { ascending: true })
        .limit(6);
      if (data) setScores(data);
    };
    fetchScores();

    const channel = supabase.channel('realtime_submissions')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'submissions' }, (payload) => {
        setScores((prev) => [payload.new, ...prev].slice(0, 6));
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  // Calculate Velocity Rating based on pass rate and time efficiency
  const calculateVR = (passed: number, total: number, time: number) => {
    if (passed === 0) return 0;
    const baseScore = (passed / total) * 1000; // Base score from correctness
    const timeBonus = Math.max(0, 500 - (time / 10)); // Time efficiency bonus
    return Math.floor(baseScore + timeBonus);
  };

  // Format time display
  const formatTime = (seconds: number) => {
    if (!seconds) return '--';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-white/5">
        <div className="flex items-center gap-2">
          <Trophy size={16} className="text-emerald-400" />
          <h3 className="text-sm font-bold text-white tracking-wide">Global Leaderboard</h3>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-zinc-400 font-mono uppercase tracking-wider">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
          Live Updates
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-white/5 bg-black/20 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
        <div className="col-span-1">#</div>
        <div className="col-span-5">Engineer</div>
        <div className="col-span-3 text-right flex items-center justify-end gap-1"><Clock size={10} /> Time</div>
        <div className="col-span-3 text-right text-emerald-500 flex items-center justify-end gap-1"><Zap size={10} /> VR</div>
      </div>

      <div className="divide-y divide-white/5">
        <AnimatePresence>
          {scores.map((score, index) => {
            const vr = calculateVR(score.tests_passed, score.total_tests, score.completion_time_seconds || 1200);

            return (
              <motion.div
                key={score.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="grid grid-cols-12 gap-4 px-6 py-4 items-center text-sm hover:bg-white/5 transition-colors group"
              >
                <div className="col-span-1 font-mono text-zinc-600 group-hover:text-white transition-colors">
                  {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                </div>

                <div className="col-span-5 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs text-zinc-400 font-bold border border-zinc-700 group-hover:border-zinc-500 transition-colors">
                    {score.github_handle?.[0]?.toUpperCase()}
                  </div>
                  <span className="font-medium text-zinc-300 group-hover:text-white transition-colors">{score.github_handle}</span>
                </div>

                <div className="col-span-3 text-right font-mono text-zinc-500 text-xs group-hover:text-zinc-300 transition-colors">
                  {formatTime(score.completion_time_seconds)}
                </div>

                <div className="col-span-3 text-right">
                  <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
                    <span className="font-bold text-emerald-400 font-mono">{vr}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {scores.length === 0 && (
          <div className="px-6 py-12 text-center text-xs text-zinc-500">
            <div className="mb-2 text-zinc-400 font-medium">No recent calibrations...</div>
            <div className="text-zinc-600">Be the first to earn a Velocity Rating!</div>
          </div>
        )}
      </div>
    </div>
  );
}
