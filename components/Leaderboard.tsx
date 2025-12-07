'use client';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Leaderboard() {
  const [scores, setScores] = useState<any[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchScores = async () => {
      const { data } = await supabase
        .from('submissions')
        .select('*')
        .order('tests_passed', { ascending: false })
        .limit(5); // Show fewer items for cleaner UI
      if (data) setScores(data);
    };
    fetchScores();

    const channel = supabase.channel('realtime_submissions')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'submissions' }, (payload) => {
        setScores((prev) => {
          const newScores = [...prev, payload.new];
          return newScores.sort((a, b) => b.tests_passed - a.tests_passed).slice(0, 5);
        });
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  return (
    <div className="space-y-1">
      <AnimatePresence>
        {scores.map((score, index) => (
          <motion.div
            key={score.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between py-2 border-b border-zinc-800/50 last:border-0 text-sm"
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-zinc-600 w-4">{index + 1}</span>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center text-[10px] text-zinc-400">
                  {score.github_handle?.slice(0,1)}
                </div>
                <span className="text-zinc-300 font-medium">{score.github_handle}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                score.tests_passed === score.total_tests
                  ? 'bg-emerald-500/10 text-emerald-500'
                  : 'bg-zinc-800 text-zinc-400'
              }`}>
                {score.tests_passed}/{score.total_tests} passed
              </span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      {scores.length === 0 && (
        <div className="py-4 text-center text-xs text-zinc-500">
          No active simulations...
        </div>
      )}
    </div>
  );
}
