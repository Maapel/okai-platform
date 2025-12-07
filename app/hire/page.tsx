'use client';
import { ArrowRight, Bug, Search, Zap } from 'lucide-react';
import Link from 'next/link';

export default function ForStartups() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans">
      <nav className="border-b border-zinc-100 px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl tracking-tight">OkAI Enterprise</Link>
        <Link href="/" className="text-sm font-medium text-zinc-500 hover:text-black">Back to Arena</Link>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-20">
        <h1 className="text-5xl font-bold tracking-tight mb-6">
          Hire engineers who can <br/>
          <span className="text-emerald-600">fix your actual bugs.</span>
        </h1>
        <p className="text-xl text-zinc-500 mb-10 max-w-2xl">
          We turn your backlog into a competitive simulation. 200+ pre-vetted engineers race to fix it. You interview the winners.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            { icon: Bug, title: "1. You Submit a Bug", desc: "Upload a Loom video of a tech debt issue or feature request." },
            { icon: Zap, title: "2. We Simulate It", desc: "We turn it into a contained repo and test suite." },
            { icon: Search, title: "3. You Get Proof", desc: "See the code of the top 5 fastest solvers." }
          ].map((item, i) => (
            <div key={i} className="p-6 bg-zinc-50 rounded-xl border border-zinc-100">
              <item.icon className="w-8 h-8 text-emerald-600 mb-4" />
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-zinc-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="p-8 bg-zinc-900 rounded-2xl text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold mb-2">Ready to sponsor a simulation?</h3>
            <p className="text-zinc-400">It's free for YC and early-stage startups.</p>
          </div>
          <a
            href="mailto:founders@okai.gg"
            className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-lg transition-colors flex items-center gap-2"
          >
            Submit a Challenge <ArrowRight size={18} />
          </a>
        </div>
      </main>
    </div>
  );
}
