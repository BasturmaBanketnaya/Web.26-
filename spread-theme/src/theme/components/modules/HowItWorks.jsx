import React from 'react';
import PlatformDiagram from './PlatformDiagram.jsx';
import './HowItWorks.css';

/* =====================================================================
   HowItWorks — "How SPREAD works" workflow bento.

   Layout (6-col grid, two rows):

     Row 1
       ┌────────────────┬──────────────────────────────────┐
       │ intro (2 cols) │ PlatformDiagram illus (4 cols)   │
       └────────────────┴──────────────────────────────────┘
     Row 2 (spans all 6 cols — horizontal accordion)
       ┌────┬────┬────┬──────────────────────────┐
       │ 01 │ 02 │ 03 │ 04 (hovered, expanded)   │
       └────┴────┴────┴──────────────────────────┘
         narrow collapsed panels + one expanded panel

   The expanded panel's body is a two-column layout: copy + product
   link on the left, a small animated schematic illustration on the
   right. Each step has its own bespoke illustration that tells the
   step's story (connection, mapping, impact propagation, release
   validation). Animations only play on pointer:fine devices, and
   reset every time a panel is hovered — so revisiting a panel
   re-plays its animation.

   Touch / narrow viewports: accordion collapses to a plain stacked
   list (everything visible at once); illustrations still render but
   in their final, non-animated state.
   ===================================================================== */

/* Tiny product mini-glyph shown inside the product link card. */
function ProductGlyph({ kind }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: '0 0 14 14',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.4,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };
  switch (kind) {
    case 'explorer':
      return (
        <svg {...common} aria-hidden>
          <circle cx="7"   cy="3"    r="1.2" />
          <circle cx="3"   cy="10.5" r="1.2" />
          <circle cx="11"  cy="10.5" r="1.2" />
          <path d="M7 4.2v3M3.5 9.5 6.2 7M10.5 9.5 7.8 7" />
        </svg>
      );
    case 'requirements':
      return (
        <svg {...common} aria-hidden>
          <path d="M3.5 1.5h5l2 2v9h-7V1.5Z" />
          <path d="M5 6h4M5 8.5h4M5 11h2.5" />
        </svg>
      );
    case 'inspector':
      return (
        <svg {...common} aria-hidden>
          <circle cx="7" cy="7" r="4.5" />
          <circle cx="7" cy="7" r="1.4" fill="currentColor" stroke="none" />
        </svg>
      );
    default:
      return null;
  }
}

/* =====================================================================
   STEP ILLUSTRATIONS

   Four small, bespoke schematic animations — one per step. Each uses
   the same visual language as PlatformDiagram (1.2–1.4px strokes,
   thin orange accents, gray bodywork) so the whole section reads as
   one drafting hand.

   Every animating element receives an `--i` custom property so the
   CSS can stagger its delay without hard-coding per-element rules.
   The animations themselves live in HowItWorks.css and only apply
   while the parent panel is hovered/focused — so each reveal starts
   from frame zero on every hover, not frozen mid-animation.
   ===================================================================== */

/* Step 01 — Connect your tools.
   Four tool tokens on the left stream into a central ingestion hub.
   The tokens fade in staggered, then the curved flow lines draw in
   toward the hub, and finally the hub pulses. Visual metaphor: data
   being pulled into SPREAD. */
function IllusConnect() {
  return (
    <svg
      className="hiw__illus hiw__illus--connect"
      viewBox="0 0 140 120"
      fill="none"
      aria-hidden
    >
      {[0, 1, 2, 3].map((i) => {
        const y = 14 + i * 26;
        return (
          <g key={i} style={{ '--i': i }}>
            <rect
              x="4"
              y={y}
              width="34"
              height="16"
              rx="2"
              className="hiw__illus-box"
            />
            {/* tiny UI hint inside each token — a bullet + a short rule */}
            <circle
              cx="10"
              cy={y + 8}
              r="1.4"
              className="hiw__illus-box-dot"
            />
            <line
              x1="16"
              y1={y + 8}
              x2="32"
              y2={y + 8}
              className="hiw__illus-box-line"
            />
            {/* curved flow line from the token's right edge into the hub */}
            <path
              d={`M 38 ${y + 8} C 62 ${y + 8}, 88 60, 112 60`}
              className="hiw__illus-connect-line"
            />
          </g>
        );
      })}
      {/* ingestion hub — ring + pulsing core */}
      <circle
        cx="118"
        cy="60"
        r="10"
        className="hiw__illus-hub-ring"
      />
      <circle
        cx="118"
        cy="60"
        r="4"
        className="hiw__illus-hub-core"
      />
    </svg>
  );
}

/* Step 02 — Map dependencies.
   A symmetric dependency graph: one central orange core surrounded
   by six satellites at the vertices of a regular hexagon. Edges
   animate in two waves — first the six radial edges from the core
   out to each satellite, then the six hex perimeter edges close the
   ring. Fully symmetric around the center point (70, 60).

   Geometry is computed from a single angle/radius pair so the
   shape stays regular no matter how we tweak the radius. */
function IllusMap() {
  const CX = 70;
  const CY = 60;
  const R = 42;
  // Six hex vertices, starting at the top and going clockwise. Using
  // `angle = 60° * i - 90°` places the first node at 12 o'clock.
  const SATS = [0, 1, 2, 3, 4, 5].map((i) => {
    const a = (Math.PI / 3) * i - Math.PI / 2;
    return { x: CX + R * Math.cos(a), y: CY + R * Math.sin(a) };
  });
  // Radial edges: center → every satellite.
  const RADIAL = SATS.map((_, i) => ({ from: 'c', to: i }));
  // Perimeter edges: each satellite → next (wrap around).
  const PERIMETER = SATS.map((_, i) => ({
    from: i,
    to: (i + 1) % SATS.length,
  }));
  return (
    <svg
      className="hiw__illus hiw__illus--map"
      viewBox="0 0 140 120"
      fill="none"
      aria-hidden
    >
      {/* First wave — radial edges out from the core. `--i` starts
          at 0 so these draw before the perimeter edges below. */}
      {RADIAL.map((e, i) => (
        <line
          key={`r-${i}`}
          x1={CX}
          y1={CY}
          x2={SATS[e.to].x}
          y2={SATS[e.to].y}
          className="hiw__illus-map-edge"
          style={{ '--i': i }}
        />
      ))}
      {/* Second wave — perimeter edges. Delays are offset past the
          radial wave so the ring visibly closes after the spokes. */}
      {PERIMETER.map((e, i) => (
        <line
          key={`p-${i}`}
          x1={SATS[e.from].x}
          y1={SATS[e.from].y}
          x2={SATS[e.to].x}
          y2={SATS[e.to].y}
          className="hiw__illus-map-edge"
          style={{ '--i': i + 6 }}
        />
      ))}
      {/* Core — larger + orange, appears first (--i: 0). */}
      <circle
        cx={CX}
        cy={CY}
        r="4.5"
        className="hiw__illus-map-node hiw__illus-map-node--center"
        style={{ '--i': 0 }}
      />
      {/* Satellites — pop in after the core, staggered around the hex. */}
      {SATS.map((n, i) => (
        <circle
          key={`n-${i}`}
          cx={n.x}
          cy={n.y}
          r="2.8"
          className="hiw__illus-map-node"
          style={{ '--i': i + 1 }}
        />
      ))}
    </svg>
  );
}

/* Step 03 — Analyze impact.
   A query fires from the central node; three concentric ripples
   expand outward (looped) and the connected satellites light up in
   sequence as impact reaches them. Visual metaphor: "trace impact
   across the graph in real time". */
function IllusAnalyze() {
  const CX = 70;
  const CY = 60;
  const SATS = [
    { dx:   0, dy: -40 },
    { dx:  45, dy: -18 },
    { dx:  45, dy:  22 },
    { dx:   0, dy:  42 },
    { dx: -45, dy:  22 },
    { dx: -45, dy: -18 },
  ];
  return (
    <svg
      className="hiw__illus hiw__illus--analyze"
      viewBox="0 0 140 120"
      fill="none"
      aria-hidden
    >
      {/* expanding ripples (looped, infinite) */}
      {[0, 1, 2].map((i) => (
        <circle
          key={i}
          cx={CX}
          cy={CY}
          r="8"
          className="hiw__illus-ripple"
          style={{ '--i': i }}
        />
      ))}
      {/* impact edges + satellite nodes */}
      {SATS.map((s, i) => (
        <g key={i} style={{ '--i': i }}>
          <line
            x1={CX}
            y1={CY}
            x2={CX + s.dx}
            y2={CY + s.dy}
            className="hiw__illus-impact-edge"
          />
          <circle
            cx={CX + s.dx}
            cy={CY + s.dy}
            r="3"
            className="hiw__illus-impact-node"
          />
        </g>
      ))}
      {/* core query node */}
      <circle
        cx={CX}
        cy={CY}
        r="5.5"
        className="hiw__illus-impact-core"
      />
    </svg>
  );
}

/* Step 04 — Ship with confidence.
   A row of validation checks runs left-to-right (each square fills
   orange in sequence), a rule draws in underneath, and then a
   confirmation check-mark pops in centered below. Visual metaphor:
   pre-flight checklist ending in an "all clear" for release.

   Geometry is centered on the viewBox so the indicator row, the
   rule underneath, and the check-mark all share the same vertical
   axis (x = 70). Previously the rule ran almost edge-to-edge while
   the indicators sat left-biased — now everything lines up. */
function IllusShip() {
  const VB_W = 140;
  const COUNT = 5;
  const BOX = 14;
  const GAP = 8;
  const ROW_W = COUNT * BOX + (COUNT - 1) * GAP;   // 5*14 + 4*8 = 102
  const ROW_X = (VB_W - ROW_W) / 2;                // 19 — centers the row
  const ROW_Y = 28;
  return (
    <svg
      className="hiw__illus hiw__illus--ship"
      viewBox={`0 0 ${VB_W} 120`}
      fill="none"
      aria-hidden
    >
      {/* Row of validation indicators — centered on the viewBox. */}
      {Array.from({ length: COUNT }).map((_, i) => (
        <rect
          key={i}
          x={ROW_X + i * (BOX + GAP)}
          y={ROW_Y}
          width={BOX}
          height={BOX}
          rx="2"
          className="hiw__illus-indicator"
          style={{ '--i': i }}
        />
      ))}
      {/* "All clear" check-mark — on the center axis. */}
      <g className="hiw__illus-check">
        <circle cx={VB_W / 2} cy="78" r="16" className="hiw__illus-check-ring" />
        <path
          d={`M ${VB_W / 2 - 8} 78 l 5 5 l 11 -11`}
          className="hiw__illus-check-mark"
        />
      </g>
    </svg>
  );
}

/* Map step id → illustration component so the JSX stays tidy. */
const STEP_ILLUS = {
  '01': IllusConnect,
  '02': IllusMap,
  '03': IllusAnalyze,
  '04': IllusShip,
};

/* Workflow step data. */
const STEPS = [
  {
    number: '01',
    title: 'Connect your tools',
    desc:
      'Plug in your PLM, CAD, ERP, and ALM systems. SPREAD ingests and ' +
      'indexes your data without disrupting existing workflows.',
    product: null,
  },
  {
    number: '02',
    title: 'Map dependencies',
    desc:
      'SPREAD automatically builds a dependency graph across your entire ' +
      'toolchain — surfacing relationships no one knew existed.',
    product: { name: 'Product Explorer', href: '#', glyph: 'explorer' },
  },
  {
    number: '03',
    title: 'Analyze impact',
    desc:
      'Query the impact of any change in real time. Trace from requirement ' +
      'to component to test case to deployment in seconds.',
    product: { name: 'Requirements Manager', href: '#', glyph: 'requirements' },
  },
  {
    number: '04',
    title: 'Ship with confidence',
    desc:
      'Release knowing exactly what changed, what it affects, and that ' +
      'nothing was missed before it goes live.',
    product: { name: 'Error Inspector', href: '#', glyph: 'inspector' },
  },
];

export default function HowItWorks() {
  return (
    <section className="hiw">
      <div className="hiw__inner">
        <div className="hiw__wrap">
          <span className="hiw__tech hiw__tech--tl">FIG.02 — METHOD</span>
          <span className="hiw__tech hiw__tech--tr">STATUS: LIVE</span>
          <span className="hiw__tech hiw__tech--bl">SPREAD / WORKFLOW</span>
          <span className="hiw__tech hiw__tech--br">STEPS 01 — 04</span>

          <div className="hiw__grid">
            {/* --- Intro cell ------------------------------------------- */}
            <div className="hiw__cell hiw__cell--intro">
              <div className="hiw__intro-copy">
                <span className="hiw__eyebrow">Platform</span>
                <h2 className="hiw__headline">How SPREAD works.</h2>
                <p className="hiw__subline">
                  Scattered tools slow engineering down. Here&apos;s how
                  SPREAD brings it all together.
                </p>
              </div>
              {/* Primary CTA — label only (arrow removed per request); the
                  button's own shape + mono type is doing the affordance,
                  so the chevron was visual noise rather than help. */}
              <a className="hiw__intro-cta" href="#">
                Explore our platform
              </a>
            </div>

            {/* --- Illustration cell (PlatformDiagram) ------------------ */}
            <div className="hiw__cell hiw__cell--illus">
              <PlatformDiagram />
            </div>

            {/* --- Accordion row ---------------------------------------- */}
            <div className="hiw__cell hiw__cell--accordion">
              {STEPS.map((step, i) => {
                const Illus = STEP_ILLUS[step.number];
                return (
                  <div
                    key={step.number}
                    className="hiw__panel"
                    tabIndex={0}
                    style={{ '--panel-i': i }}
                  >
                    <div className="hiw__panel-head">
                      <span className="hiw__step-tag">STEP {step.number}</span>
                      <h3 className="hiw__step-title">{step.title}</h3>
                    </div>

                    <div className="hiw__panel-body">
                      {/* Left column: copy + product link */}
                      <div className="hiw__panel-text">
                        <p className="hiw__step-desc">{step.desc}</p>
                        {step.product && (
                          <a
                            href={step.product.href}
                            className="hiw__product-link"
                          >
                            <span className="hiw__product-glyph">
                              <ProductGlyph kind={step.product.glyph} />
                            </span>
                            <span className="hiw__product-name">
                              {step.product.name}
                            </span>
                          </a>
                        )}
                      </div>

                      {/* Right column: animated schematic illustration. */}
                      <div className="hiw__panel-illus">
                        {Illus && <Illus />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export const meta = { label: 'How It Works' };
export const fields = null;
