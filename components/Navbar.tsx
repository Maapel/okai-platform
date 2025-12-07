'use client';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { Github, LogOut, User } from 'lucide-react';
import Image from 'next/image';

export default function Navbar() {
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo: `${location.origin}/auth/callback` }
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#09090b]/80 backdrop-blur-xl h-14 flex items-center justify-between px-6">
      <div className="flex items-center gap-3 font-semibold tracking-tight cursor-pointer">
        <Image src="/okai_logo.svg" alt="OkAI Logo" width={24} height={24} />
        <span className="text-white">OkAI Protocol</span>
      </div>

      <div className="flex items-center gap-6 text-sm font-medium">
        <a href="#simulations" className="text-zinc-400 hover:text-white transition-colors hidden sm:block">
          Simulations
        </a>
        <a href="/hire" className="text-zinc-400 hover:text-white transition-colors hidden sm:block">
          For Startups
        </a>

        {user ? (
          <div className="flex items-center gap-4">
            <a href="/profile" className="flex items-center gap-2 text-zinc-300 hover:text-emerald-400 transition-colors">
              {user.user_metadata.avatar_url && (
                <img
                  src={user.user_metadata.avatar_url}
                  className="w-6 h-6 rounded-full border border-zinc-700"
                  alt="Avatar"
                />
              )}
              <span>Dashboard</span>
            </a>
            <button onClick={handleLogout} className="text-zinc-500 hover:text-white">
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <button
            onClick={handleLogin}
            className="flex items-center gap-2 text-white bg-zinc-800 hover:bg-zinc-700 px-4 py-1.5 rounded-full transition-all text-xs border border-zinc-700"
          >
            <Github size={14} />
            <span>Sign In</span>
          </button>
        )}
      </div>
    </nav>
  );
}
