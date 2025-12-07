'use client';
import { createClient } from '@/utils/supabase/client';
import Leaderboard from '@/components/Leaderboard';

export default function Home() {
  const supabase = createClient();

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo: typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : undefined }
    });
  };

  return (
    <main className='min-h-screen flex flex-col items-center justify-center p-4 relative'>
      <div className='scanlines' />
      <div className='z-10 w-full max-w-2xl mb-8 text-center'>
        <h1 className='text-5xl font-black tracking-tighter mb-2 text-white'>
          Ok<span className='text-[#00ff9d]'>AI</span>
        </h1>
        <p className='text-zinc-500 font-mono text-sm'>SEASON 0 // VELOCITY CHECK</p>
      </div>

      <div className='z-10 w-full max-w-2xl flex flex-col gap-8'>
        <Leaderboard />

        <button
          onClick={handleLogin}
          className='w-full py-4 border border-[#00ff9d] text-[#00ff9d] hover:bg-[#00ff9d] hover:text-black transition-all font-mono font-bold tracking-widest uppercase'
        >
          [ Initialize Session ]
        </button>
      </div>
    </main>
  );
}
