import React from 'react';
import { Target, XCircle, CheckCircle2, Zap, Clock, ShieldCheck, Banknote } from 'lucide-react';

export default function PurposeSection() {
  return (
    <section id="purpose" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800">

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Target className="w-3.5 h-3.5" /> Component 1 of 5
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          1. System Purpose
        </h2>
        <p className="mt-3 text-slate-300 text-base sm:text-lg leading-relaxed">
          The high-level goal of an Information System is to solve business challenges. For Hong Kong transit, the goal is to enable <span className="text-amber-400 font-semibold">fast, automated, and cashless fare collection</span> on public transport—eliminating queues and maximizing operational throughput.
        </p>
      </div>

      {/* High Level Goal Highlight Banner */}
      <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-teal-950/40 border border-amber-500/30 rounded-2xl p-6 sm:p-8 mb-12 text-center shadow-lg">
        <div className="inline-flex items-center justify-center p-3 bg-amber-500/20 text-amber-400 rounded-xl mb-4">
          <Zap className="w-8 h-8" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
          Core Objective: Instant Passenger Flow
        </h3>
        <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
          Processes millions of commuter journeys daily in <span className="text-emerald-400 font-bold">under 0.3 seconds per tap</span>, replacing cash handling with secure digital transactions across MTR trains, buses, ferries, and retail stores.
        </p>
      </div>

      {/* Side-by-Side Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Card 1: Manual Cash Payment */}
        <div className="bg-slate-900/90 border border-rose-500/30 rounded-2xl p-6 sm:p-8 shadow-lg flex flex-col justify-between hover:border-rose-500/50 transition-colors">
          <div>
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-rose-500/10 text-rose-400 rounded-xl border border-rose-500/20">
                  <Banknote className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Manual Cash Payment</h3>
                  <span className="text-xs text-rose-400 font-medium">Traditional System</span>
                </div>
              </div>
              <XCircle className="w-6 h-6 text-rose-400" />
            </div>

            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">Long Queues:</strong> Commuters must wait at ticket booths or search for exact coins at bus stops.</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">High Operational Costs:</strong> High labor costs to hire cash collectors, count coins, and prevent theft.</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">Slow Throughput:</strong> Serves only ~10–15 passengers per minute per entry gate.</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">Human Errors:</strong> Manual change calculations lead to delays and accounting discrepancies.</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 text-center">
            <span className="inline-block px-3 py-1 rounded bg-rose-500/10 text-rose-300 text-xs font-semibold">
              Outcome: High friction & bottlenecks
            </span>
          </div>
        </div>

        {/* Card 2: Automated Octopus System */}
        <div className="bg-slate-900/90 border border-emerald-500/40 rounded-2xl p-6 sm:p-8 shadow-lg flex flex-col justify-between hover:border-emerald-500/70 transition-colors relative overflow-hidden">
          {/* Subtle Glow Accent */}
          <div className="absolute -right-12 -bottom-12 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>

          <div>
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/30">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Automated Octopus System</h3>
                  <span className="text-xs text-emerald-400 font-medium">Information System Solution</span>
                </div>
              </div>
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            </div>

            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">Instant Contactless Taps:</strong> Takes ~0.3 seconds to process fare, balance deduction, and gate opening.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">Automated Accounting:</strong> Accurate real-time revenue collection with zero manual coin handling.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">Maximum Efficiency:</strong> Serves up to <strong className="text-emerald-400">50+ passengers per minute</strong> per gate.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">Cashless Ecosystem:</strong> Extended beyond transport to convenience stores, vending machines, and dining.</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 text-center">
            <span className="inline-block px-3 py-1 rounded bg-emerald-500/15 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
              Outcome: Seamless mobility & peak operational efficiency
            </span>
          </div>
        </div>

      </div>

    </section>
  );
}
