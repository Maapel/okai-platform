'use client';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { Github, LogOut, User, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

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
    <nav className="fixed top-0 w-full z-50 glass-nav h-16 flex items-center justify-between px-6 lg:px-12 transition-all duration-300">
      <div className="flex items-center gap-3 font-bold tracking-tight cursor-pointer group">
        <div className="relative">
          <div className="absolute -inset-1 bg-emerald-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
          <Image src="/okai_icon.svg" alt="OkAI Logo" width={32} height={32} className="rounded-lg relative" />
        </div>
        <Image src="/okai_text.png" alt="OkAI" width={70} height={20} className="relative opacity-90 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="flex items-center gap-8 text-sm font-medium">
        <div className="hidden md:flex items-center gap-6">
          <a href="#challenges" className="text-zinc-400 hover:text-white transition-colors relative group">
            Challenges
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-emerald-500 transition-all group-hover:w-full"></span>
          </a>
          <a href="/hire" className="text-zinc-400 hover:text-white transition-colors relative group">
            For Startups
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-emerald-500 transition-all group-hover:w-full"></span>
          </a>
        </div>

        <div className="h-4 w-px bg-zinc-800 hidden md:block"></div>

        {user ? (
          <div className="flex items-center gap-4">
            <a href="/profile" className="flex items-center gap-2 text-zinc-300 hover:text-emerald-400 transition-colors group">
              {user.user_metadata.avatar_url && (
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-emerald-500/50 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                  <img
                    src={user.user_metadata.avatar_url}
                    className="w-8 h-8 rounded-full border border-zinc-700 relative"
                    alt="Avatar"
                  />
                </div>
              )}
            </a>
            <button onClick={handleLogout} className="text-zinc-500 hover:text-white transition-colors">
              <LogOut size={18} />
            </button>
          </div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogin}
            className="flex items-center gap-2 text-black bg-white hover:bg-zinc-200 px-4 py-2 rounded-full transition-all text-xs font-bold shadow-[0_0_15px_rgba(255,255,255,0.1)]"
          >
            <Github size={14} />
            <span>Sign In</span>
          </motion.button>
        )}
      </div>
    </nav>
  );
}
