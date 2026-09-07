const readerButton = document.getElementById("readerButton");
const flashMessage = document.getElementById("flashMessage");
const landing = document.getElementById("landing");
const dashboard = document.getElementById("dashboard");
const navLinks = document.querySelectorAll(".nav-link");
const panels = document.querySelectorAll(".panel");

const processSteps = [
  "Step 1: Passenger taps Octopus card on the reader.",
  "Step 2: System reads Card ID and calculates the fare.",
  "Step 3: System deducts the fare amount and updates the card balance.",
  "Step 4: Screen shows updated balance, speaker chimes \"Doo\", and gate opens.",
  "Step 5: Transaction details are saved and sent to the central station server."
];

const stepText = document.getElementById("processStepText");
const stepIndicator = document.getElementById("stepIndicator");
const backStep = document.getElementById("backStep");
const nextStep = document.getElementById("nextStep");

let currentStep = 0;
let hasEntered = false;

function playDooChime() {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) {
    return;
  }

  const audioCtx = new AudioCtx();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(1000, audioCtx.currentTime);

  gainNode.gain.setValueAtTime(0.0001, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.2, audioCtx.currentTime + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.27);

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 0.28);

  oscillator.onended = () => {
    audioCtx.close();
  };
}

function showPanel(targetId) {
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.target === targetId);
  });

  panels.forEach((panel) => {
    panel.classList.toggle("active", panel.id === targetId);
  });
}

function renderProcessStep() {
  stepText.textContent = processSteps[currentStep];
  stepIndicator.textContent = `${currentStep + 1} / ${processSteps.length}`;
  backStep.disabled = currentStep === 0;
  nextStep.disabled = currentStep === processSteps.length - 1;
}

readerButton.addEventListener("click", () => {
  playDooChime();

  flashMessage.classList.remove("flash-on");
  void flashMessage.offsetWidth;
  flashMessage.classList.add("flash-on");

  if (!hasEntered) {
    hasEntered = true;
    setTimeout(() => {
      landing.classList.add("hidden");
      dashboard.classList.remove("hidden");
      dashboard.classList.add("fade-in");
      showPanel("purpose");
    }, 900);
  }
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    showPanel(link.dataset.target);
  });
});

backStep.addEventListener("click", () => {
  if (currentStep > 0) {
    currentStep -= 1;
    renderProcessStep();
  }
});

nextStep.addEventListener("click", () => {
  if (currentStep < processSteps.length - 1) {
    currentStep += 1;
    renderProcessStep();
  }
});

renderProcessStep();
