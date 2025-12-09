'use client';
import { createClient } from '@/utils/supabase/client';
import Navbar from '@/components/Navbar';
import SkillRadar from '@/components/SkillRadar';
import { useEffect, useState } from 'react';
import { ShieldCheck, Zap, Clock, GitCommit, Award, Lock, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function Profile() {
    const supabase = createClient();
    const [user, setUser] = useState<any>(null);
    const [submissions, setSubmissions] = useState<any[]>([]);

    useEffect(() => {
        const getData = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);

            if (user) {
                const { data } = await supabase
                    .from('submissions')
                    .select('*')
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false });
                setSubmissions(data || []);
            }
        };
        getData();
    }, []);

    if (!user) return <div className="min-h-screen bg-[#09090b]" />;

    return (
        <div className="min-h-screen bg-[#09090b] text-zinc-300 font-sans selection:bg-emerald-500/30">
            <Navbar />

            {/* PRIVATE VIEW BANNER */}
            <div className="bg-zinc-900/50 border-b border-zinc-800 py-2 px-6 mt-16">
                <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
                    <span className="text-zinc-500 flex items-center gap-2">
                        <Lock size={12} />
                        Private Dashboard (Visible only to you)
                    </span>
                    <button className="text-emerald-500 hover:text-emerald-400 flex items-center gap-1 transition-colors">
                        View Public Profile <ExternalLink size={10} />
                    </button>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 py-12">

                {/* HEADER: The Identity Card */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12 pb-12 border-b border-zinc-800">
                    <div className="flex items-center gap-6">
                        <img
                            src={user.user_metadata.avatar_url}
                            alt="Profile"
                            className="w-20 h-20 rounded-full border-2 border-zinc-800"
                        />
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">{user.user_metadata.full_name}</h1>
                            <div className="flex items-center gap-4 text-sm text-zinc-500 font-mono">
                                <span className="flex items-center gap-2">
                                    <GitCommit size={14} /> {user.user_metadata.user_name}
                                </span>
                                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[10px] font-medium tracking-wide uppercase">
                                    Open to Work
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-12 text-right">
                        <div>
                            <div className="text-zinc-500 text-[10px] uppercase tracking-wider mb-1">Velocity Rating</div>
                            <div className="text-4xl font-bold text-white font-mono flex items-center gap-2 justify-end">
                                <Zap size={24} className="text-emerald-500" />
                                2,450
                            </div>
                        </div>
                        <div>
                            <div className="text-zinc-500 text-[10px] uppercase tracking-wider mb-1">Global Rank</div>
                            <div className="text-4xl font-bold text-zinc-600 font-mono">#12</div>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-12">

                    {/* LEFT: Stats & Radar */}
                    <div className="space-y-8">
                        <div className="bg-[#121214] border border-zinc-800 rounded-xl p-6">
                            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-6 flex items-center gap-2">
                                <ShieldCheck size={14} className="text-emerald-500" />
                                Verified Competencies
                            </h3>
                            <SkillRadar />
                        </div>

                        <div className="bg-[#121214] border border-zinc-800 rounded-xl p-6">
                            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4">Badges</h3>
                            <div className="grid grid-cols-4 gap-3">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="aspect-square bg-zinc-900 rounded-lg border border-zinc-800 flex items-center justify-center text-zinc-600 hover:border-emerald-500/50 hover:text-emerald-500 transition-colors cursor-help">
                                        <Award size={20} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Submission History */}
                    <div className="lg:col-span-2 space-y-6">
                        <h3 className="text-sm font-bold text-white flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            Verification Log
                        </h3>

                        <div className="bg-[#121214] border border-zinc-800 rounded-xl overflow-hidden">
                            {submissions.length === 0 ? (
                                <div className="p-12 text-center text-zinc-500 text-sm">
                                    No challenges attempted yet. <br />
                                    <Link href="/#challenges" className="text-emerald-500 hover:underline mt-2 inline-block">
                                        Start your first challenge
                                    </Link>
                                </div>
                            ) : (
                                <div className="divide-y divide-zinc-800/50">
                                    {submissions.map((sub) => (
                                        <div key={sub.id} className="p-5 flex items-center justify-between hover:bg-zinc-900/30 transition-colors group">
                                            <div className="flex items-center gap-4">
                                                <div className={`p-2 rounded-lg border ${sub.status === 'completed' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-zinc-900 border-zinc-800 text-zinc-500'}`}>
                                                    {sub.status === 'completed' ? <ShieldCheck size={18} /> : <Clock size={18} />}
                                                </div>
                                                <div>
                                                    <div className="text-zinc-200 font-medium text-sm">Chaos API Integration</div>
                                                    <div className="text-xs text-zinc-500 font-mono mt-0.5">
                                                        {sub.repo_url ? sub.repo_url.replace('https://github.com/', '') : 'Repository pending...'}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="text-right">
                                                <div className={`font-mono font-bold text-sm ${sub.tests_passed === sub.total_tests ? 'text-emerald-500' : 'text-yellow-500'}`}>
                                                    {sub.tests_passed}/{sub.total_tests} PASS
                                                </div>
                                                <div className="text-[10px] text-zinc-500 mt-1 font-mono">
                                                    {sub.completion_time_seconds ? `${Math.floor(sub.completion_time_seconds / 60)}m ${sub.completion_time_seconds % 60}s` : 'IN PROGRESS'}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
