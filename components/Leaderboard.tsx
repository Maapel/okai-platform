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
        .limit(10);
      if (data) setScores(data);
    };
    fetchScores();

    const channel = supabase.channel('realtime_submissions')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'submissions' }, (payload) => {
        setScores((prev) => {
          const newScores = [...prev, payload.new];
          return newScores.sort((a, b) => b.tests_passed - a.tests_passed).slice(0, 10);
        });
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  return (
    <div className='w-full max-w-2xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-md rounded-lg overflow-hidden'>
      <div className='p-4 border-b border-zinc-800 flex justify-between items-center'>
        <h2 className='text-[#00ff9d] font-mono text-lg tracking-widest'>LIVE // RANKING</h2>
        <div className='h-2 w-2 bg-red-500 rounded-full animate-pulse' />
      </div>
      <div>
        <AnimatePresence>
          {scores.map((score, index) => (
            <motion.div
              key={score.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className='flex justify-between p-4 border-b border-zinc-800/50 font-mono text-sm'
            >
              <span className='text-zinc-500'>#{index + 1}</span>
              <span className='text-white font-bold'>{score.github_handle}</span>
              <span className='text-[#00ff9d]'>{score.tests_passed}/{score.total_tests}</span>
            </motion.div>
          ))}
        </AnimatePresence>
        {scores.length === 0 && <div className='p-8 text-center text-zinc-600 font-mono'>System awaiting input...</div>}
      </div>
    </div>
  );
}
