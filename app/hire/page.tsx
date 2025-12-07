'use client';
import { ArrowRight, Bug, Search, Zap, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ForStartups() {
  return (
    <div className="min-h-screen text-zinc-300 font-sans selection:bg-emerald-500/30 overflow-x-hidden flex flex-col">
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mb-20"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tighter mb-6 leading-[1.1]">
            Hire engineers who can <br />
            <span className="text-gradient-primary">fix your actual bugs.</span>
          </h1>
          <p className="text-xl text-zinc-400 mb-10 max-w-2xl font-light leading-relaxed">
            We turn your backlog into a competitive simulation. 200+ pre-vetted engineers race to fix it. You interview the winners.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {[
            { icon: Bug, title: "1. You Submit a Bug", desc: "Upload a Loom video of a tech debt issue or feature request." },
            { icon: Zap, title: "2. We Simulate It", desc: "We turn it into a contained repo and test suite." },
            { icon: Search, title: "3. You Get Proof", desc: "See the code of the top 5 fastest solvers." }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="glass-card p-8 rounded-2xl group hover:border-emerald-500/30 transition-colors"
            >
              <div className="w-12 h-12 bg-zinc-900 rounded-xl border border-zinc-800 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-emerald-500/50 transition-all duration-300">
                <item.icon className="w-6 h-6 text-emerald-500" />
              </div>
              <h3 className="font-bold text-xl text-white mb-3">{item.title}</h3>
              <p className="text-zinc-400 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="p-10 rounded-3xl bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-3xl font-bold text-white mb-3">Ready to sponsor a simulation?</h3>
              <p className="text-zinc-400 text-lg mb-6">It's free for YC and early-stage startups.</p>
              <ul className="space-y-2 mb-0">
                <li className="flex items-center gap-2 text-zinc-400 text-sm">
                  <CheckCircle2 size={16} className="text-emerald-500" /> <span>Pre-vetted candidates only</span>
                </li>
                <li className="flex items-center gap-2 text-zinc-400 text-sm">
                  <CheckCircle2 size={16} className="text-emerald-500" /> <span>Full IP ownership of solutions</span>
                </li>
              </ul>
            </div>
            <a
              href="mailto:founders@okai.gg"
              className="px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-105"
            >
              Submit a Challenge <ArrowRight size={18} />
            </a>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
