import React from 'react';
import { Cpu, Radio, MonitorSpeaker, DoorOpen, Code2 } from 'lucide-react';

export default function TechnologySection() {
  const techItems = [
    {
      title: "Card Reader",
      icon: Radio,
      category: "Hardware",
      color: "from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30",
      description: "Reads smart card data wirelessly using 13.56 MHz RFID / NFC radio frequency signal within milliseconds upon card touch."
    },
    {
      title: "Gate Screen & Speaker",
      icon: MonitorSpeaker,
      category: "Hardware Display",
      color: "from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30",
      description: "Displays current transaction balance visually and plays the signature 1000Hz 'Doo' sound chime to give immediate acoustic feedback."
    },
    {
      title: "Gate Barriers",
      icon: DoorOpen,
      category: "Hardware Actuator",
      color: "from-sky-500/20 to-blue-500/20 text-sky-400 border-sky-500/30",
      description: "Motorized retractable turnstile paddles or flap doors that open rapidly to grant entry upon payment verification and prevent tailgating."
    },
    {
      title: "Fare Software",
      icon: Code2,
      category: "System Software",
      color: "from-purple-500/20 to-indigo-500/20 text-purple-400 border-purple-500/30",
      description: "Embedded software application that checks card validity, calculates distance-based pricing rules, deducts balance, and logs transactions."
    }
  ];

  return (
    <section id="technology" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800">

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Cpu className="w-3.5 h-3.5" /> Component 3 of 5
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          3. System Technology
        </h2>
        <p className="mt-3 text-slate-300 text-base sm:text-lg leading-relaxed">
          Technology encompasses the physical hardware equipment and digital software programs that power the automated gate.
        </p>
      </div>

      {/* Grid of 4 Simple Technology Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {techItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 sm:p-8 shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3.5 rounded-2xl bg-gradient-to-br ${item.color} border`}>
                  <Icon className="w-7 h-7" />
                </div>
                <span className="text-[11px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                  {item.category}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                {item.title}
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>

    </section>
  );
}
