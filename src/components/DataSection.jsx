import React, { useState } from 'react';
import { Database, Ticket, Hash, MapPin, Clock, DollarSign, Wallet, RefreshCw } from 'lucide-react';

export default function DataSection() {
  const sampleTrips = [
    {
      id: "HK-8839-4012",
      entry: "Central Station",
      exit: "Admiralty Station",
      time: "2025-03-10 08:42:15",
      fare: 4.50,
      initialBalance: 129.50,
      type: "Adult Card"
    },
    {
      id: "HK-8839-4012",
      entry: "Mong Kok Station",
      exit: "Tsim Sha Tsui Station",
      time: "2025-03-10 12:15:30",
      fare: 5.60,
      initialBalance: 125.00,
      type: "Adult Card"
    },
    {
      id: "HK-8839-4012",
      entry: "Causeway Bay Station",
      exit: "Sha Tin Station",
      time: "2025-03-10 18:05:10",
      fare: 15.20,
      initialBalance: 119.40,
      type: "Adult Card"
    }
  ];

  const [tripIndex, setTripIndex] = useState(0);
  const currentTrip = sampleTrips[tripIndex];
  const remainingBalance = (currentTrip.initialBalance - currentTrip.fare).toFixed(2);

  const nextScenario = () => {
    setTripIndex((prev) => (prev + 1) % sampleTrips.length);
  };

  return (
    <section id="data" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800">

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Database className="w-3.5 h-3.5" /> Component 2 of 5
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          2. System Data
        </h2>
        <p className="mt-3 text-slate-300 text-base sm:text-lg leading-relaxed">
          Data is the raw information captured, stored, and processed by the system. In the Octopus ecosystem, every tap generates a precise structured record to calculate fares and update balances instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

        {/* Left Side: Interactive Tap Receipt Card */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">

          {/* Header Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg">
                <Ticket className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-white tracking-wide text-sm sm:text-base">
                MTR FARE TRANSACTION RECEIPT
              </span>
            </div>
            <button
              onClick={nextScenario}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Simulate Next Tap
            </button>
          </div>

          {/* Receipt Content List */}
          <div className="mt-6 space-y-4 font-mono text-sm">

            {/* Card ID */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <div className="flex items-center gap-2.5 text-slate-400 font-sans">
                <Hash className="w-4 h-4 text-amber-400" />
                <span className="text-xs uppercase tracking-wider font-semibold">Card ID</span>
              </div>
              <span className="text-white font-bold">{currentTrip.id}</span>
            </div>

            {/* Entry & Exit Station */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <div className="flex items-center gap-2.5 text-slate-400 font-sans">
                <MapPin className="w-4 h-4 text-teal-400" />
                <span className="text-xs uppercase tracking-wider font-semibold">Entry & Exit</span>
              </div>
              <span className="text-teal-300 font-semibold text-right">
                {currentTrip.entry} <span className="text-slate-500">→</span> {currentTrip.exit}
              </span>
            </div>

            {/* Transaction Time */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <div className="flex items-center gap-2.5 text-slate-400 font-sans">
                <Clock className="w-4 h-4 text-blue-400" />
                <span className="text-xs uppercase tracking-wider font-semibold">Transaction Time</span>
              </div>
              <span className="text-slate-200">{currentTrip.time}</span>
            </div>

            {/* Fare Amount */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <div className="flex items-center gap-2.5 text-slate-400 font-sans">
                <DollarSign className="w-4 h-4 text-rose-400" />
                <span className="text-xs uppercase tracking-wider font-semibold">Fare Deducted</span>
              </div>
              <span className="text-rose-400 font-bold text-base">
                -${currentTrip.fare.toFixed(2)} HKD
              </span>
            </div>

            {/* Remaining Balance */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40">
              <div className="flex items-center gap-2.5 text-emerald-400 font-sans">
                <Wallet className="w-4 h-4 text-emerald-400" />
                <span className="text-xs uppercase tracking-wider font-bold">Remaining Balance</span>
              </div>
              <span className="text-emerald-300 font-extrabold text-lg">
                ${remainingBalance} HKD
              </span>
            </div>

          </div>

          <div className="mt-6 text-center text-xs text-slate-500 font-sans">
            Click "Simulate Next Tap" to cycle through real-world transaction data samples.
          </div>
        </div>

        {/* Right Side: Key Data Fields Explained */}
        <div className="lg:col-span-6 space-y-4">
          <h3 className="text-xl font-bold text-white mb-2">
            5 Critical Data Fields Captured Per Tap
          </h3>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/30 transition-colors">
            <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span> 1. Card ID (Unique Identification)
            </h4>
            <p className="text-xs text-slate-300 mt-1">
              Encrypted unique identifier embedded on the RFID chip to identify the specific cardholder account without transmitting personal identity.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-teal-500/30 transition-colors">
            <h4 className="text-sm font-bold text-teal-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-400"></span> 2. Entry & Exit Station
            </h4>
            <p className="text-xs text-slate-300 mt-1">
              Tracks starting gate location upon entry and destination gate upon exit to calculate distance-based zone fares.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500/30 transition-colors">
            <h4 className="text-sm font-bold text-blue-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span> 3. Transaction Timestamp
            </h4>
            <p className="text-xs text-slate-300 mt-1">
              Exact date and time down to milliseconds, used for trip duration validation, peak/off-peak pricing, and audit trails.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-rose-500/30 transition-colors">
            <h4 className="text-sm font-bold text-rose-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-400"></span> 4. Fare Amount
            </h4>
            <p className="text-xs text-slate-300 mt-1">
              The calculated cost subtracted based on passenger class (Adult, Child, Student, Senior) and distance traveled.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/30 transition-colors">
            <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span> 5. Remaining Balance
            </h4>
            <p className="text-xs text-slate-300 mt-1">
              Stored directly on the card's encrypted internal memory chip and synced with the central server for instant offline reader verification.
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}
