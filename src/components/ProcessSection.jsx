import React, { useState } from 'react';
import { GitMerge, ChevronLeft, ChevronRight, Wifi, Calculator, Wallet, Volume2, Server, Check } from 'lucide-react';
import { playOctopusChime } from '../utils/audio';

export default function ProcessSection() {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    {
      number: 1,
      title: "Passenger Taps Card",
      icon: Wifi,
      summary: "Passenger taps Octopus card or mobile device on the RFID card reader.",
      details: "The high-frequency radio signal energizes the passive RFID chip embedded inside the Octopus card, initiating encrypted near-field communication (NFC) data exchange.",
      highlight: "Hardware Interaction: Card Reader detects RFID Tag",
      action: "Tap Event Triggered"
    },
    {
      number: 2,
      title: "Card ID & Fare Calculation",
      icon: Calculator,
      summary: "System reads Card ID and calculates the required fare.",
      details: "Fare Software reads the card's entry station memory block, compares it against the exit station ID, and evaluates distance-based fare tables and concessions.",
      highlight: "Software Logic: Calculates Fare ($4.50)",
      action: "Data Processing"
    },
    {
      number: 3,
      title: "Balance Deduction",
      icon: Wallet,
      summary: "System deducts the fare amount and updates stored balance.",
      details: "The gate reader writes the updated balance ($125.00) directly back onto the card's encrypted memory chip before concluding the local transaction cycle.",
      highlight: "Data Write: Balance updated ($129.50 → $125.00)",
      action: "Card Balance Updated"
    },
    {
      number: 4,
      title: "Feedback & Gate Release",
      icon: Volume2,
      summary: "Screen displays updated balance, speaker chimes 'Doo', and gate opens.",
      details: "The LCD screen illuminates green with transaction details, the speaker plays the 1000Hz 'Doo' audio chime, and motorized gate flap barriers retract.",
      highlight: "Hardware Outputs: Display + Chime Sound + Retracting Barriers",
      action: "Gate Opens"
    },
    {
      number: 5,
      title: "Central Sync & Batch Logging",
      icon: Server,
      summary: "Transaction details are saved locally and synced to central station server.",
      details: "The transaction log (timestamp, card ID, fare, gate ID) is queued and transmitted over secure local fiber network to the central clearinghouse for clearing.",
      highlight: "Network Sync: Centralized Clearing & Settlement",
      action: "Record Synced"
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      const nextStepNum = currentStep + 1;
      setCurrentStep(nextStepNum);
      if (nextStepNum === 4) {
        playOctopusChime();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const activeStepData = steps[currentStep - 1];
  const StepIcon = activeStepData.icon;

  return (
    <section id="process" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800">

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <GitMerge className="w-3.5 h-3.5" /> Component 4 of 5
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          4. System Process & Procedures
        </h2>
        <p className="mt-3 text-slate-300 text-base sm:text-lg leading-relaxed">
          Process defines the step-by-step sequence of operations that turn user inputs into automated actions and central records.
        </p>
      </div>

      {/* Step Indicator Stepper Bar */}
      <div className="mb-10 max-w-4xl mx-auto">
        <div className="flex items-center justify-between relative">
          {/* Connector Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-800 -translate-y-1/2 z-0"></div>
          <div
            className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-amber-500 to-teal-400 -translate-y-1/2 z-0 transition-all duration-300"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          ></div>

          {/* Step Circles */}
          {steps.map((step) => {
            const isCompleted = step.number < currentStep;
            const isCurrent = step.number === currentStep;

            return (
              <button
                key={step.number}
                onClick={() => {
                  setCurrentStep(step.number);
                  if (step.number === 4) playOctopusChime();
                }}
                className={`relative z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-sm sm:text-base transition-all duration-300 cursor-pointer ${
                  isCurrent
                    ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-400/30 scale-110 shadow-lg'
                    : isCompleted
                    ? 'bg-teal-500 text-slate-950'
                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}
              >
                {isCompleted ? <Check className="w-5 h-5 stroke-[3]" /> : step.number}
              </button>
            );
          })}
        </div>
      </div>

      {/* Step Viewer Display Card */}
      <div className="max-w-4xl mx-auto bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">

        {/* Step Badge & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-amber-500/20 to-teal-500/20 rounded-2xl border border-amber-500/30 text-amber-400">
              <StepIcon className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
                Step {activeStepData.number} of {steps.length}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {activeStepData.title}
              </h3>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-mono border border-slate-700 self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            {activeStepData.action}
          </div>
        </div>

        {/* Step Content Description */}
        <div className="py-6 space-y-4">
          <p className="text-base sm:text-lg font-semibold text-slate-100">
            {activeStepData.summary}
          </p>
          <p className="text-sm text-slate-300 leading-relaxed">
            {activeStepData.details}
          </p>

          {/* Highlight Callout */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-mono flex items-center gap-3 mt-4">
            <span className="p-1 rounded bg-amber-500/20 text-amber-400 font-bold shrink-0">
              IS LOGIC
            </span>
            <span>{activeStepData.highlight}</span>
          </div>
        </div>

        {/* Next / Back Controls */}
        <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
              currentStep === 1
                ? 'bg-slate-800/40 text-slate-600 cursor-not-allowed'
                : 'bg-slate-800 hover:bg-slate-700 text-white cursor-pointer'
            }`}
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>

          <span className="text-xs text-slate-400 font-medium hidden sm:inline">
            Step {currentStep} / {steps.length}
          </span>

          <button
            onClick={handleNext}
            disabled={currentStep === steps.length}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
              currentStep === steps.length
                ? 'bg-slate-800/40 text-slate-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-amber-500 to-teal-500 hover:from-amber-400 hover:to-teal-400 text-slate-950 cursor-pointer shadow-lg'
            }`}
          >
            Next Step <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </section>
  );
}
