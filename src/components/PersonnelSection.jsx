import React from 'react';
import { Users, User, ShieldAlert, Code, Terminal, Wrench } from 'lucide-react';

export default function PersonnelSection() {
  const systemUsers = [
    {
      role: "Passengers / Commuters",
      icon: User,
      description: "Primary end-users who tap cards or mobile wallets daily to travel, make payments, and view transaction history."
    },
    {
      role: "Station Staff",
      icon: ShieldAlert,
      description: "Frontline transit staff who assist passengers, handle card topping-up, manage gate irregularities, and override gate errors."
    }
  ];

  const itStaff = [
    {
      role: "Systems Analyst",
      icon: Terminal,
      description: "Designs system architecture, defines fare rules and requirements, and plans updates for software & hardware integration."
    },
    {
      role: "Programmer / Developer",
      icon: Code,
      description: "Writes secure firmware and central database code to execute fare calculations, encryption, and real-time clearing."
    },
    {
      role: "Technical Support Staff",
      icon: Wrench,
      description: "Maintains gate hardware, services RFID readers, monitors network connectivity, and troubleshoots field equipment."
    }
  ];

  return (
    <section id="personnel" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800">

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Users className="w-3.5 h-3.5" /> Component 5 of 5
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          5. System Personnel
        </h2>
        <p className="mt-3 text-slate-300 text-base sm:text-lg leading-relaxed">
          Personnel are the people who interact with, build, operate, and maintain the Information System.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Category 1: System Users */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-800">
            <div className="p-3 bg-amber-500/10 text-amber-400 rounded-2xl border border-amber-500/20">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">System Users</h3>
              <p className="text-xs text-amber-400 font-medium">End-users who interact with the system</p>
            </div>
          </div>

          <div className="space-y-4">
            {systemUsers.map((person, idx) => {
              const Icon = person.icon;
              return (
                <div key={idx} className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-amber-500/30 transition-colors">
                  <div className="flex items-center gap-2.5 text-white font-bold mb-1">
                    <Icon className="w-4 h-4 text-amber-400" />
                    <span>{person.role}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed pl-6">
                    {person.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Category 2: IT Staff */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-800">
            <div className="p-3 bg-teal-500/10 text-teal-400 rounded-2xl border border-teal-500/20">
              <Code className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">IT Staff</h3>
              <p className="text-xs text-teal-400 font-medium">Technical professionals maintaining the system</p>
            </div>
          </div>

          <div className="space-y-4">
            {itStaff.map((person, idx) => {
              const Icon = person.icon;
              return (
                <div key={idx} className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-teal-500/30 transition-colors">
                  <div className="flex items-center gap-2.5 text-white font-bold mb-1">
                    <Icon className="w-4 h-4 text-teal-400" />
                    <span>{person.role}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed pl-6">
                    {person.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </section>
  );
}
