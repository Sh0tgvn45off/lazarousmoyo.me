/** Illustrations for projects that don't have a screenshot. Pure SVG, themed through CSS variables. */

const accent = "rgb(var(--accent))";
const warm = "rgb(var(--warm))";
const grid = "rgb(var(--line) / var(--line-alpha))";
const muted = "rgb(var(--ink-3))";

/** A sung melody (waveform) becoming MIDI notes on a piano roll. */
export function AudioMidiVisual() {
  // Waveform: a few "syllables" of varying loudness.
  const wave: string[] = [];
  for (let x = 0; x <= 260; x += 2) {
    const env = Math.max(0, Math.sin((x / 260) * Math.PI * 4)) ** 0.6;
    const y = 200 + Math.sin(x * 0.55) * 70 * env * (0.6 + 0.4 * Math.sin(x * 0.05));
    wave.push(`${x === 0 ? "M" : "L"}${20 + x} ${y.toFixed(1)}`);
  }
  const notes = [
    { x: 360, w: 46, row: 6 },
    { x: 410, w: 30, row: 4 },
    { x: 444, w: 56, row: 3 },
    { x: 504, w: 28, row: 5 },
    { x: 536, w: 64, row: 2 },
  ];

  return (
    <svg viewBox="0 0 640 400" role="img" aria-label="A waveform on the left turning into MIDI notes on a piano roll on the right" className="size-full">
      <rect width="640" height="400" fill="rgb(var(--raised))" />
      {/* piano roll grid */}
      {Array.from({ length: 9 }, (_, i) => (
        <line key={i} x1="340" x2="620" y1={80 + i * 30} y2={80 + i * 30} stroke={grid} />
      ))}
      {Array.from({ length: 8 }, (_, i) => (
        <line key={i} x1={340 + i * 40} x2={340 + i * 40} y1="80" y2="320" stroke={grid} />
      ))}
      <path d={wave.join(" ")} fill="none" stroke={warm} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M290 200h30m-8-7 8 7-8 7" fill="none" stroke={muted} strokeWidth="2" strokeLinecap="round" />
      {notes.map((n, i) => (
        <rect
          key={i}
          x={n.x}
          y={80 + n.row * 30 + 4}
          width={n.w}
          height="22"
          rx="5"
          fill={accent}
          style={{ animation: `noteIn 0.5s ${0.2 + i * 0.15}s both` }}
        />
      ))}
      <text x="20" y="352" fill={muted} fontFamily="var(--font-geist-mono)" fontSize="13" letterSpacing="2">
        AUDIO → pYIN → NOTES → MIDI
      </text>
      <style>{`@keyframes noteIn{from{opacity:0;transform:translateX(-8px)}to{opacity:1;transform:none}}`}</style>
    </svg>
  );
}

/** Mechanical power over time: the learned policy stays inside the clinical safety band. */
export function VentilationVisual() {
  const xs = Array.from({ length: 13 }, (_, i) => 60 + i * 45);
  const usual = [250, 236, 214, 190, 176, 168, 150, 136, 128, 120, 112, 104, 98];
  const policy = [250, 244, 236, 228, 222, 218, 214, 212, 210, 208, 208, 206, 206];
  const line = (ys: number[]) => xs.map((x, i) => `${i ? "L" : "M"}${x} ${ys[i]}`).join(" ");

  return (
    <svg viewBox="0 0 640 400" role="img" aria-label="Chart: the learned ventilation policy stays inside a shaded safety band while unconstrained settings drift out of it" className="size-full">
      <rect width="640" height="400" fill="rgb(var(--raised))" />
      {/* safety band */}
      <rect x="60" y="190" width="540" height="80" fill={accent} opacity="0.12" />
      <line x1="60" x2="600" y1="190" y2="190" stroke={accent} strokeDasharray="4 6" opacity="0.6" />
      <line x1="60" x2="600" y1="270" y2="270" stroke={accent} strokeDasharray="4 6" opacity="0.6" />
      {/* axes */}
      <line x1="60" x2="600" y1="320" y2="320" stroke={grid} />
      <line x1="60" x2="60" y1="70" y2="320" stroke={grid} />
      <path d={line(usual)} fill="none" stroke={muted} strokeWidth="2" strokeDasharray="5 5" />
      <path d={line(policy)} fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {xs.filter((_, i) => i % 3 === 0).map((x, i) => (
        <circle key={i} cx={x} cy={policy[xs.indexOf(x)]} r="4.5" fill={accent} />
      ))}
      <g fontFamily="var(--font-geist-mono)" fontSize="12" letterSpacing="1.5">
        <text x="70" y="292" fill={accent}>SAFE RANGE · 7 CLINICAL RULES</text>
        <text x="470" y="96" fill={muted}>UNCONSTRAINED</text>
        <text x="500" y="230" fill={accent}>CQL POLICY</text>
        <text x="60" y="352" fill={muted}>MECHANICAL POWER (J/MIN) OVER TIME</text>
      </g>
    </svg>
  );
}
