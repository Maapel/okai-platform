'use client';
import { createClient } from '@/utils/supabase/client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthCallback() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data.session) {
        router.push('/');
      } else if (error) {
        console.error('Auth callback error:', error.message);
        router.push('/');
      }
    };

    handleAuthCallback();
  }, [router, supabase.auth]);

  return (
    <div className='min-h-screen flex items-center justify-center bg-[#050505]'>
      <div className='scanlines' />
      <div className='z-10 text-center'>
        <div className='text-[#00ff9d] font-mono text-xl mb-4'>Authenticating...</div>
        <div className='w-8 h-8 border-2 border-[#00ff9d] border-t-transparent rounded-full animate-spin mx-auto'></div>
      </div>
    </div>
  );
}
