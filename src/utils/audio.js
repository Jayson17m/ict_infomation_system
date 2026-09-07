/**
 * Audio Utility for Hong Kong Octopus Card Reader Chime
 * Synthesizes a realistic 1000Hz "Doo" sound using the Web Audio API.
 * No external audio files are required.
 */

let audioCtx = null;

export const playOctopusChime = () => {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      console.warn('Web Audio API is not supported in this browser.');
      return;
    }

    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime;

    // Create main oscillator for pure 1000Hz sine wave chime
    const mainOsc = audioCtx.createOscillator();
    mainOsc.type = 'sine';
    mainOsc.frequency.setValueAtTime(1000, now);

    // Create secondary harmonic oscillator to give authentic electronic reader resonance
    const subOsc = audioCtx.createOscillator();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(2000, now);

    // Gain node for main tone envelope
    const mainGain = audioCtx.createGain();
    mainGain.gain.setValueAtTime(0, now);
    mainGain.gain.linearRampToValueAtTime(0.5, now + 0.015); // Fast attack
    mainGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28); // Smooth decay

    // Gain node for high harmonic tone (subtle)
    const subGain = audioCtx.createGain();
    subGain.gain.setValueAtTime(0, now);
    subGain.gain.linearRampToValueAtTime(0.08, now + 0.01);
    subGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

    // Connect nodes
    mainOsc.connect(mainGain);
    subOsc.connect(subGain);

    mainGain.connect(audioCtx.destination);
    subGain.connect(audioCtx.destination);

    // Play chime
    mainOsc.start(now);
    subOsc.start(now);

    mainOsc.stop(now + 0.3);
    subOsc.stop(now + 0.3);

  } catch (error) {
    console.error('Error playing Octopus chime:', error);
  }
};
