import Image from 'next/image';
import { Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="border-t border-white/5 bg-black/20 backdrop-blur-sm mt-24">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-2">
                        <div className="flex items-center gap-3 font-bold tracking-tight mb-4">
                            <Image src="/okai_icon.svg" alt="OkAI Logo" width={24} height={24} className="rounded-md opacity-80" />
                            <Image src="/okai_text.png" alt="OkAI" width={50} height={16} className="opacity-80" />
                        </div>
                        <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
                            The standard for proving engineering talent. Build your verified portfolio through real-world challenges.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-4 text-sm">Platform</h4>
                        <ul className="space-y-2 text-sm text-zinc-500">
                            <li><a href="#" className="hover:text-emerald-400 transition-colors">Challenges</a></li>
                            <li><a href="#" className="hover:text-emerald-400 transition-colors">Leaderboard</a></li>
                            <li><a href="#" className="hover:text-emerald-400 transition-colors">Pricing</a></li>
                            <li><a href="#" className="hover:text-emerald-400 transition-colors">For Teams</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-4 text-sm">Company</h4>
                        <ul className="space-y-2 text-sm text-zinc-500">
                            <li><a href="#" className="hover:text-emerald-400 transition-colors">About</a></li>
                            <li><a href="#" className="hover:text-emerald-400 transition-colors">Blog</a></li>
                            <li><a href="#" className="hover:text-emerald-400 transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-emerald-400 transition-colors">Contact</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-zinc-600 text-xs">
                        © {new Date().getFullYear()} OkAI Inc. All rights reserved.
                    </p>

                    <div className="flex items-center gap-6">
                        <a href="#" className="text-zinc-600 hover:text-white transition-colors"><Github size={18} /></a>
                        <a href="#" className="text-zinc-600 hover:text-white transition-colors"><Twitter size={18} /></a>
                        <a href="#" className="text-zinc-600 hover:text-white transition-colors"><Linkedin size={18} /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
