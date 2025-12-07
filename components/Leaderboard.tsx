'use client';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';

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
    <div className="border border-zinc-800 bg-[#0c0c0e] rounded-lg overflow-hidden">
      <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-zinc-800 bg-zinc-900/30 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
        <div className="col-span-1">Rank</div>
        <div className="col-span-5">Engineer</div>
        <div className="col-span-3 text-right">Time</div>
        <div className="col-span-3 text-right text-emerald-500">VR</div>
      </div>

      <div className="divide-y divide-zinc-800/50">
        <AnimatePresence>
          {scores.map((score, index) => {
             const vr = calculateVR(score.tests_passed, score.total_tests, score.completion_time_seconds || 1200);

             return (
              <motion.div
                key={score.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="grid grid-cols-12 gap-4 px-6 py-3 items-center text-sm hover:bg-zinc-800/20 transition-colors"
              >
                <div className="col-span-1 font-mono text-zinc-600">#{index + 1}</div>

                <div className="col-span-5 flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-[10px] text-zinc-400 font-medium">
                    {score.github_handle?.[0]?.toUpperCase()}
                  </div>
                  <span className="font-medium text-zinc-300">{score.github_handle}</span>
                </div>

                <div className="col-span-3 text-right font-mono text-zinc-500 text-xs">
                  {formatTime(score.completion_time_seconds)}
                </div>

                <div className="col-span-3 text-right">
                  <div className="inline-flex items-center gap-1.5">
                    <Zap size={12} className="text-emerald-500 fill-emerald-500/20" />
                    <span className="font-bold text-white font-mono">{vr}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {scores.length === 0 && (
          <div className="px-6 py-8 text-center text-xs text-zinc-500">
            <div className="mb-2">No recent calibrations...</div>
            <div className="text-zinc-600">Be the first to earn a Velocity Rating!</div>
          </div>
        )}
      </div>
    </div>
  );
}
