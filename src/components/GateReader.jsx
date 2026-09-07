import React, { useState } from 'react';
import { playOctopusChime } from '../utils/audio';
import { Wifi, ArrowDown, Sparkles, CheckCircle2 } from 'lucide-react';

export default function GateReader({ onExploreClick }) {
  const [isTapped, setIsTapped] = useState(false);
  const [flashActive, setFlashActive] = useState(false);

  const handleTap = () => {
    // Play Web Audio API Chime
    playOctopusChime();

    // Trigger visual feedback
    setFlashActive(true);
    setIsTapped(true);

    setTimeout(() => {
      setFlashActive(false);
    }, 1500);
  };

  return (
    <section id="landing" className="relative min-h-[92vh] flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white px-4 py-12 overflow-hidden">
      {/* Background Decorative Rings */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl w-full text-center z-10 space-y-8">
        {/* Header Title & Subtitle */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-amber-400 text-xs font-semibold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5" /> Case Study: Hong Kong Public Transport
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            5 Essential Components of an <span className="bg-gradient-to-r from-amber-400 via-emerald-400 to-teal-300 bg-clip-text text-transparent">Information System</span>
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg">
            Experience how hardware, software, data, procedures, and people connect every time you tap an Octopus card at an MTR fare gate.
          </p>
        </div>

        {/* Interactive Gate Reader Terminal Graphic */}
        <div className="flex flex-col items-center justify-center pt-2">
          <div className="relative group cursor-pointer select-none" onClick={handleTap}>

            {/* Glowing Aura Effect on Reader */}
            <div className={`absolute -inset-2 rounded-3xl transition duration-500 blur-lg ${
              flashActive ? 'bg-emerald-500/60 opacity-100 scale-105' : 'bg-gradient-to-r from-amber-500/20 to-teal-500/20 opacity-70 group-hover:opacity-100'
            }`}></div>

            {/* Terminal Body Container */}
            <div className={`relative w-72 sm:w-80 bg-slate-800 border-4 rounded-3xl p-6 shadow-2xl transition-all duration-300 transform ${
              flashActive ? 'border-emerald-400 scale-[1.02]' : 'border-slate-700 hover:border-amber-400'
            }`}>

              {/* Reader LCD Display Screen */}
              <div className={`relative mb-6 p-4 rounded-xl border font-mono text-center transition-all duration-300 ${
                flashActive
                  ? 'bg-emerald-950 border-emerald-400 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                  : isTapped
                  ? 'bg-slate-900 border-slate-700 text-emerald-400'
                  : 'bg-slate-950 border-slate-800 text-slate-300'
              }`}>
                {/* Status Indicator LED */}
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-sans border-b border-slate-800/80 pb-1.5">
                  <span className="flex items-center gap-1.5 font-medium">
                    <span className={`w-2.5 h-2.5 rounded-full ${flashActive ? 'bg-emerald-400 animate-ping' : isTapped ? 'bg-emerald-500' : 'bg-amber-400 animate-pulse'}`}></span>
                    READER #04-MTR
                  </span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider">HKD ($)</span>
                </div>

                {/* Display Text */}
                {flashActive || isTapped ? (
                  <div className="space-y-1 animate-fade-in">
                    <div className="text-xs text-emerald-400 font-semibold tracking-wide uppercase flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Fare Deducted
                    </div>
                    <div className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                      -$4.50
                    </div>
                    <div className="text-xs text-slate-300 bg-emerald-900/40 py-1 px-2 rounded mt-1 border border-emerald-500/30">
                      Balance: <span className="font-bold text-emerald-300">$125.00</span>
                    </div>
                  </div>
                ) : (
                  <div className="py-2 space-y-1">
                    <div className="text-sm font-semibold text-amber-300 tracking-wide">
                      PLEASE TAP CARD
                    </div>
                    <div className="text-xs text-slate-400">
                      Ready for Payment
                    </div>
                  </div>
                )}
              </div>

              {/* Reader Target Zone Icon / Brand Styling */}
              <div className="relative py-6 px-4 bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl border border-slate-700/80 flex flex-col items-center justify-center group-hover:border-amber-400/50 transition-colors">

                {/* Octopus Signature Colors Accent Ring */}
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 via-orange-500 to-teal-400 p-1 flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110">
                  <div className="w-full h-full bg-slate-900 rounded-full flex flex-col items-center justify-center text-amber-400">
                    <Wifi className={`w-10 h-10 transition-transform ${flashActive ? 'scale-125 text-emerald-400' : 'group-hover:rotate-12'}`} />
                  </div>
                </div>

                {/* Tap Hint Banner */}
                <div className="mt-4 text-center">
                  <p className="text-xs font-bold text-slate-200 tracking-wider uppercase">
                    Octopus Reader Zone
                  </p>
                  <p className="text-[11px] text-amber-400/90 font-medium mt-0.5">
                    Click to simulate card tap ("Doo")
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Action Button to Transition to 5 IS Components */}
        <div className="pt-4 flex flex-col items-center gap-3">
          <button
            onClick={onExploreClick}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-teal-500 hover:from-amber-400 hover:to-teal-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transform hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            Explore 5 Information System Components
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>
          {isTapped && (
            <p className="text-xs text-emerald-400 font-medium animate-fade-in">
              ✓ "Doo" chime played! Scroll down or click above to explore the 5 components.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
