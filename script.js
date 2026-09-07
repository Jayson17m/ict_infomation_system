const { useEffect, useMemo, useRef, useState } = React;
const framerMotionLib = window.framerMotion || window["framer-motion"] || window.Motion;
const passthroughComponent = ({ children }) => <>{children}</>;
const motionFallback = new Proxy(
  {},
  {
    get: (_, elementName) =>
      React.forwardRef(({ children, ...props }, ref) => {
        const {
          initial,
          animate,
          exit,
          variants,
          transition,
          whileHover,
          whileTap,
          whileInView,
          layout,
          layoutId,
          drag,
          dragConstraints,
          dragElastic,
          dragMomentum,
          ...domProps
        } = props;
        return React.createElement(elementName, { ...domProps, ref }, children);
      })
  }
);
const AnimatePresence = framerMotionLib?.AnimatePresence || passthroughComponent;
const LayoutGroup = framerMotionLib?.LayoutGroup || passthroughComponent;
const motion = framerMotionLib?.motion || motionFallback;

const PANEL_ORDER = ["purpose", "data", "technology", "process", "personnel"];

const tripSamples = [
  { route: "Central → Tsim Sha Tsui", cardId: "OCT-7845-29", time: "08:42 AM", fare: "$11.30", balance: "$118.20" },
  { route: "Mong Kok → Admiralty", cardId: "OCT-9912-07", time: "12:16 PM", fare: "$10.40", balance: "$82.50" },
  { route: "Tsuen Wan → Quarry Bay", cardId: "OCT-3321-44", time: "06:25 PM", fare: "$15.20", balance: "$56.90" }
];

const processNodes = ["Card", "RFID Reader", "Fare Engine CPU", "Balance Display + Speaker", "Gate Actuator"];
const processSteps = [
  "Card is brought near the reader for RFID handshake.",
  "Reader captures card token and sends encrypted payload.",
  "Fare engine computes route fare and confirms stored value.",
  "Display updates and speaker chimes with success response.",
  "Actuator receives release command and swings barriers open."
];
const pathSegments = [120, 120, 120, 120];

function useCountUp(target, durationMs) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let raf;
    const start = performance.now();
    const tick = (time) => {
      const progress = Math.min((time - start) / durationMs, 1);
      setValue(Math.round(target * progress));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs]);
  return value;
}

function playDooChime() {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return;
  const audioCtx = new AudioCtx();
  const oscillator = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(1000, audioCtx.currentTime);
  oscillator.frequency.linearRampToValueAtTime(1320, audioCtx.currentTime + 0.08);
  gain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.22, audioCtx.currentTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.28);
  oscillator.connect(gain);
  gain.connect(audioCtx.destination);
  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 0.32);
  oscillator.onended = () => audioCtx.close();
}

const pageVariants = {
  initial: { opacity: 0, y: 26, scale: 0.98 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], when: "beforeChildren", staggerChildren: 0.1 }
  },
  exit: { opacity: 0, y: -14, scale: 0.985, transition: { duration: 0.35 } }
};

const itemVariants = {
  initial: { opacity: 0, y: 18, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }
};

function LandingPage({ onEnter, tapped }) {
  const [ripple, setRipple] = useState(0);
  const [gateOpen, setGateOpen] = useState(false);
  const [greenFlash, setGreenFlash] = useState(false);

  useEffect(() => {
    if (!tapped) return;
    setRipple((v) => v + 1);
    setGreenFlash(true);
    setGateOpen(true);
    playDooChime();
    const timeout = setTimeout(() => onEnter(), 1500);
    return () => clearTimeout(timeout);
  }, [tapped, onEnter]);

  return (
    <motion.section className="landing glass-card" variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <motion.p className="kicker" variants={itemVariants}>Hong Kong Transit Dashboard</motion.p>
      <motion.h1 variants={itemVariants}>Hong Kong Octopus Gate System</motion.h1>
      <motion.p className="landing-copy" variants={itemVariants}>Tap the Octopus card to trigger full live gate choreography.</motion.p>

      <motion.button className={`reader-button ${tapped ? "tapped" : ""}`} variants={itemVariants} onClick={onEnter} aria-label="Tap Octopus Reader">
        <motion.span
          className="octopus-card"
          animate={tapped ? { y: 126, scale: 0.97 } : { y: [0, -8, 0], scale: 1 }}
          transition={tapped ? { type: "spring", stiffness: 300, damping: 20 } : { repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        >
          <span className="octopus-brand">OCTOPUS</span>
          <span className="octopus-wave"></span>
        </motion.span>
        <span className="reader-shell">
          <span className="reader-plate">
            <span className={`led-ring ${greenFlash ? "green" : ""}`}></span>
            <span className="contactless-icon"></span>
          </span>
        </span>
        <AnimatePresence>
          {tapped && (
            <motion.span className="flash-message" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <span className="display-text">Deducted: $11.30 | Balance: $118.20</span>
            </motion.span>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {tapped && (
            <motion.svg key={ripple} className="tap-ripple" viewBox="0 0 600 220" initial={{ opacity: 0.7, scale: 0.4 }} animate={{ opacity: 0, scale: 1.3 }} exit={{ opacity: 0 }} transition={{ duration: 0.9 }}>
              <circle cx="300" cy="120" r="30" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>

      <motion.div className="gate-stage" variants={itemVariants}>
        <svg viewBox="0 0 360 140" className="gate-svg" aria-label="Gate barrier">
          <rect x="20" y="82" width="320" height="42" rx="12" fill="#111827" />
          <circle cx="62" cy="103" r="7" className={greenFlash ? "gate-light gate-light-on" : "gate-light"} />
          <motion.rect x="145" y="68" width="10" height="56" rx="6" fill="#334155" />
          <motion.rect x="205" y="68" width="10" height="56" rx="6" fill="#334155" />
          <motion.g animate={gateOpen ? { rotate: -80 } : { rotate: 0 }} style={{ originX: "150px", originY: "76px" }}>
            <rect x="150" y="74" width="66" height="8" rx="4" fill="#f97316" />
          </motion.g>
          <motion.g animate={gateOpen ? { rotate: 80 } : { rotate: 0 }} style={{ originX: "210px", originY: "76px" }}>
            <rect x="144" y="74" width="66" height="8" rx="4" fill="#f97316" />
          </motion.g>
        </svg>
      </motion.div>
    </motion.section>
  );
}

function PurposePanel() {
  const [manualCount, setManualCount] = useState(0);
  const [autoCount, setAutoCount] = useState(0);

  useEffect(() => {
    const manualTimer = setInterval(() => setManualCount((v) => Math.min(v + 1, 30)), 4000);
    const autoTimer = setInterval(() => setAutoCount((v) => Math.min(v + 1, 240)), 500);
    return () => {
      clearInterval(manualTimer);
      clearInterval(autoTimer);
    };
  }, []);

  const manualPercent = Math.min((manualCount / 30) * 100, 100);
  const autoPercent = Math.min((autoCount / 240) * 100, 100);

  return (
    <motion.section className="panel" variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <motion.div className="section-head" variants={itemVariants}>
        <h2>Purpose</h2>
        <div className="stat-badges">
          <span className="badge">Fast Throughput</span>
          <span className="badge">Cashless Transit</span>
          <span className="badge">Automated Records</span>
        </div>
      </motion.div>
      <motion.p variants={itemVariants}>Enable fast, automated, cashless fare collection to reduce queues and improve efficiency.</motion.p>
      <motion.div className="compare-grid" variants={itemVariants}>
        <article className="card gradient-border">
          <h3>Manual Cash Lane</h3>
          <p className="counter">{manualCount} pax</p>
          <div className="bar-shell"><motion.div className="bar manual" animate={{ width: `${manualPercent}%` }} transition={{ duration: 0.35 }} /></div>
          <small>+1 every 4s</small>
        </article>
        <article className="card gradient-border accent-teal">
          <h3>Octopus Automated Lane</h3>
          <p className="counter">{autoCount} pax</p>
          <div className="bar-shell"><motion.div className="bar auto" animate={{ width: `${autoPercent}%` }} transition={{ duration: 0.2 }} /></div>
          <small>+1 every 0.5s</small>
        </article>
      </motion.div>
    </motion.section>
  );
}

function DataPanel() {
  const [tripIndex, setTripIndex] = useState(0);
  const trip = tripSamples[tripIndex];
  return (
    <motion.section className="panel" variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <motion.h2 variants={itemVariants}>Data</motion.h2>
      <motion.p variants={itemVariants}>Each tap produces transaction information printed in real time.</motion.p>
      <motion.div className="trip-selector" variants={itemVariants}>
        {tripSamples.map((sample, index) => (
          <button key={sample.route} className={index === tripIndex ? "trip-btn active" : "trip-btn"} onClick={() => setTripIndex(index)}>{sample.route}</button>
        ))}
      </motion.div>
      <motion.article className="card receipt" variants={itemVariants}>
        <div className="receipt-title-wrap">
          <h3>Tap Receipt</h3>
          <span className="receipt-status">LIVE SYNC</span>
        </div>
        <AnimatePresence mode="wait">
          <motion.dl
            key={trip.route}
            className="receipt-print"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {[
              ["Card ID", trip.cardId],
              ["Timestamp", trip.time],
              ["Route", trip.route],
              ["Fare", trip.fare],
              ["Updated Balance", trip.balance]
            ].map(([k, v], index) => (
              <motion.div key={k} className="receipt-row" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.09 }}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </AnimatePresence>
      </motion.article>
    </motion.section>
  );
}

function TechnologyPanel() {
  return (
    <motion.section className="panel" variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <motion.h2 variants={itemVariants}>Technology</motion.h2>
      <motion.p variants={itemVariants}>Simple equipment and software work together at every gate.</motion.p>
      <motion.div className="tech-grid" variants={itemVariants}>
        <article className="card"><h3>📶 Card Reader</h3><p>Reads the card when passengers tap.</p></article>
        <article className="card"><h3>🖥️ Gate Screen & Speaker</h3><p>Displays balance and plays the "Doo" chime.</p></article>
        <article className="card"><h3>🚧 Gate Barriers</h3><p>Open for valid payment and control access flow.</p></article>
        <article className="card"><h3>⚙️ Fare Software</h3><p>Calculates fare and updates transaction records.</p></article>
      </motion.div>
    </motion.section>
  );
}

function ProcessPanel() {
  const [step, setStep] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const [pulsePath, setPulsePath] = useState({ x: 30, y: 70 });
  const total = pathSegments.reduce((a, b) => a + b, 0);
  const pulseDistance = useCountUp(pathSegments.slice(0, step).reduce((a, b) => a + b, 0), 380);

  useEffect(() => {
    const x = 30 + ((300 * pulseDistance) / total);
    setPulsePath({ x, y: 70 });
  }, [pulseDistance, total]);

  useEffect(() => {
    if (step === 4) playDooChime();
  }, [step]);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setStep((prev) => {
        if (prev === processSteps.length - 1) return 0;
        return prev + 1;
      });
    }, 1300);
    return () => clearInterval(timer);
  }, [autoPlay]);

  return (
    <motion.section className="panel" variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <motion.h2 variants={itemVariants}>Process</motion.h2>
      <motion.p variants={itemVariants}>Follow live signal flow from card tap to gate actuator release.</motion.p>
      <motion.article className="card process-card" variants={itemVariants}>
        <svg className="process-svg" viewBox="0 0 360 160">
          <path d="M30 70 H330" stroke="#1e293b" strokeWidth="10" strokeLinecap="round" />
          <path d="M30 70 H330" className="wire-glow" strokeWidth="4" />
          {processNodes.map((node, index) => {
            const x = 30 + index * 75;
            const active = index === step;
            return (
              <g key={node} transform={`translate(${x},70)`}>
                <motion.circle r="16" className={active ? "node active" : "node"} animate={active ? { scale: 1.1 } : { scale: 1 }} />
                <text y="34" textAnchor="middle">{node}</text>
              </g>
            );
          })}
          <motion.circle className="pulse-dot" r="6" animate={{ cx: pulsePath.x, cy: pulsePath.y }} transition={{ duration: 0.36 }} />
        </svg>
        <motion.p key={step} className="step-pop" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>{processSteps[step]}</motion.p>
        <div className="process-controls">
          <button onClick={() => setStep((v) => Math.max(v - 1, 0))}>Back</button>
          <span>{step + 1} / {processSteps.length}</span>
          <button onClick={() => setStep((v) => Math.min(v + 1, processSteps.length - 1))}>Next Step</button>
          <button onClick={() => setAutoPlay((v) => !v)}>{autoPlay ? "Stop Auto-Play" : "Auto-Play"}</button>
        </div>
        <div className={`gate-inline ${step === 4 ? "open" : ""}`}>
          <span className="gate-arm left"></span>
          <span className="gate-arm right"></span>
        </div>
      </motion.article>
    </motion.section>
  );
}

function PersonnelPanel() {
  const roles = [
    { icon: "🧍", title: "Passengers", badge: "System User", tags: ["Tap & Go", "Daily Commuter"] },
    { icon: "🛎️", title: "Station Staff", badge: "System User", tags: ["Crowd Control", "Customer Care"] },
    { icon: "🧠", title: "Systems Analyst", badge: "IT Staff", tags: ["Flow Optimization", "Monitoring"] },
    { icon: "💻", title: "Programmer", badge: "IT Staff", tags: ["Fare Logic", "API Sync"] },
    { icon: "🛠️", title: "Technical Support Staff", badge: "IT Staff", tags: ["Hardware Repair", "Diagnostics"] }
  ];

  return (
    <motion.section className="panel" variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <motion.h2 variants={itemVariants}>Personnel</motion.h2>
      <motion.p variants={itemVariants}>Different people use, build, and maintain the full system.</motion.p>
      <motion.div className="personnel-grid" variants={itemVariants}>
        {roles.map((role) => <TiltCard key={role.title} role={role} />)}
      </motion.div>
    </motion.section>
  );
}

function TiltCard({ role }) {
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });
  const onMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    setTransform({ rotateX: py * -10, rotateY: px * 12 });
  };

  return (
    <motion.article
      className="card personnel-card"
      onMouseMove={onMove}
      onMouseLeave={() => setTransform({ rotateX: 0, rotateY: 0 })}
      style={{ transformStyle: "preserve-3d", perspective: 800 }}
      animate={{ rotateX: transform.rotateX, rotateY: transform.rotateY, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 240, damping: 20 }}
    >
      <span className="avatar">{role.icon}</span>
      <h3>{role.title}</h3>
      <span className="role-badge">{role.badge}</span>
      <motion.div className="responsibility-tags" initial={{ opacity: 0, height: 0 }} whileHover={{ opacity: 1, height: "auto" }}>
        {role.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
      </motion.div>
    </motion.article>
  );
}

function Dashboard({ tab, setTab }) {
  return (
    <motion.section className="dashboard" variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <LayoutGroup>
        <motion.nav className="navbar glass-card" variants={itemVariants}>
          {PANEL_ORDER.map((key) => (
            <button key={key} className={`nav-link ${tab === key ? "active" : ""}`} onClick={() => setTab(key)}>
              {tab === key && <motion.span layoutId="activeTab" className="active-pill" />}
              <span className="nav-label">{key[0].toUpperCase() + key.slice(1)}</span>
            </button>
          ))}
        </motion.nav>
      </LayoutGroup>
      <div className="panel-wrap">
        <AnimatePresence mode="wait">
          {tab === "purpose" && <PurposePanel key="purpose" />}
          {tab === "data" && <DataPanel key="data" />}
          {tab === "technology" && <TechnologyPanel key="technology" />}
          {tab === "process" && <ProcessPanel key="process" />}
          {tab === "personnel" && <PersonnelPanel key="personnel" />}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}

function App() {
  const [entered, setEntered] = useState(false);
  const [tab, setTab] = useState("purpose");
  const tappedRef = useRef(false);
  const [tapped, setTapped] = useState(false);

  const handleEnter = () => {
    if (!tappedRef.current) {
      tappedRef.current = true;
      setTapped(true);
      setTimeout(() => setEntered(true), 1500);
    }
  };

  return (
    <main className="app">
      <AnimatePresence mode="wait">
        {!entered ? (
          <LandingPage key="landing" onEnter={handleEnter} tapped={tapped} />
        ) : (
          <Dashboard key="dashboard" tab={tab} setTab={setTab} />
        )}
      </AnimatePresence>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
