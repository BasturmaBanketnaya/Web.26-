import React from 'react';
import './PlatformArchitecture.css';

/* --------------------------------------------------------------------------
 * PlatformArchitecture — symmetric 3-row schematic for the Platform page.
 *
 * Deliberately front-elevation (not isometric): matches the hero diagram's
 * visual language so the two feel like the same drafting hand.
 *
 *   ROW 1 — TOP      : 4 product/agent frames, evenly centered
 *   ROW 2 — MIDDLE   : knowledge graph with 4 satellites around Error
 *   ROW 3 — BOTTOM   : 7 source systems, evenly centered
 *
 * Connections: thin dashed orange lines run vertically between the layer
 * boundary rules and each source/app, emphasising the flow.
 * ------------------------------------------------------------------------ */

/* ---------- canvas geometry ---------- */
const VB_W = 960;
const VB_H = 680;
const CX = VB_W / 2;   // horizontal center, used everywhere for symmetry

/* Horizontal rule lines that separate the three layers. Everything reads
   off these two numbers for vertical alignment. */
const TOP_RULE_Y = 220;   // between TOP and MIDDLE
const BOT_RULE_Y = 460;   // between MIDDLE and BOTTOM
const GRAPH_CY = (TOP_RULE_Y + BOT_RULE_Y) / 2;   // vertical center of graph

/* ---------- content: apps, sources, graph ---------- */
const APPS = [
  { id: 'error',        title: 'Error Inspector',      role: 'R&D'             },
  { id: 'explorer',     title: 'Product Explorer',     role: 'AFTERMARKET'     },
  { id: 'requirements', title: 'Requirements Manager', role: 'SYSTEM ENGINEER' },
  { id: 'agent',        title: 'AI Agent',             role: 'MANAGER'         },
];

const SOURCES = [
  { id: 'plm',  label: 'PLM',  glyph: 'layers'  },
  { id: 'erp',  label: 'ERP',  glyph: 'grid'    },
  { id: 'cad',  label: 'CAD',  glyph: 'cube'    },
  { id: 'alm',  label: 'ALM',  glyph: 'check'   },
  { id: 'mes',  label: 'MES',  glyph: 'factory' },
  { id: 'iot',  label: 'IoT',  glyph: 'wave'    },
  { id: 'docs', label: 'DOCS', glyph: 'doc'     },
];

/* Graph satellites at cardinal directions so the whole graph is
   perfectly symmetric around (CX, GRAPH_CY). */
const SATELLITE_OFFSET = 110;
const SATELLITES = [
  { id: 'function',    label: 'Function',    dx:  0, dy: -SATELLITE_OFFSET, pill: 'triggers \u2192'   },
  { id: 'requirement', label: 'Requirement', dx:  SATELLITE_OFFSET, dy:  0, pill: 'part of \u2192'    },
  { id: 'signal',      label: 'Signal',      dx:  0, dy:  SATELLITE_OFFSET, pill: 'emits \u2192'      },
  { id: 'component',   label: 'Component',   dx: -SATELLITE_OFFSET, dy:  0, pill: 'caused by \u2192'  },
];
/* All pills are drawn at this fixed width so the four orange labels
   read as a symmetric matched set around the Error core. */
const PILL_WIDTH = 104;

/* Ambient background dots & lines around the graph, placed at symmetric
   diagonal positions so the texture still reads as balanced. */
const AMBIENT_OFFSET = 160;
const AMBIENT_DOTS = [
  { dx: -AMBIENT_OFFSET, dy: -AMBIENT_OFFSET * 0.55 },
  { dx:  AMBIENT_OFFSET, dy: -AMBIENT_OFFSET * 0.55 },
  { dx: -AMBIENT_OFFSET, dy:  AMBIENT_OFFSET * 0.55 },
  { dx:  AMBIENT_OFFSET, dy:  AMBIENT_OFFSET * 0.55 },
];

/* ---------- layout calculations (symmetric, content-width-based) ---------- */

/* Top row — 4 app frames centered horizontally */
const APP_W = 160;
const APP_H = 100;
const APP_GAP = 40;
const APP_TOTAL_W = APPS.length * APP_W + (APPS.length - 1) * APP_GAP;
const APP_START_X = (VB_W - APP_TOTAL_W) / 2;
const APP_Y = 70;

/* Bottom row — 7 sources centered horizontally */
const SRC_SPACING = 110;
const SRC_TOTAL_W = (SOURCES.length - 1) * SRC_SPACING;
const SRC_START_X = (VB_W - SRC_TOTAL_W) / 2;
const SRC_CY = 540;

/* ---------- tiny glyphs for sources ---------- */
function SourceGlyph({ name, size = 16 }) {
  const common = {
    width: size, height: size, viewBox: '0 0 14 14',
    fill: 'none', stroke: 'currentColor', strokeWidth: 1.5,
    strokeLinecap: 'round', strokeLinejoin: 'round',
  };
  switch (name) {
    case 'layers':
      return (
        <svg {...common}>
          <path d="M7 1.5 1.5 4.5 7 7.5l5.5-3L7 1.5Z" />
          <path d="M1.5 8.5 7 11.5l5.5-3" />
        </svg>
      );
    case 'cube':
      return (
        <svg {...common}>
          <path d="M7 1.5 12.5 4.5v5L7 12.5 1.5 9.5v-5L7 1.5Z" />
          <path d="M1.5 4.5 7 7.5l5.5-3" />
          <path d="M7 7.5v5" />
        </svg>
      );
    case 'grid':
      return (
        <svg {...common}>
          <rect x="1.5" y="1.5" width="4.5" height="4.5" />
          <rect x="8"   y="1.5" width="4.5" height="4.5" />
          <rect x="1.5" y="8"   width="4.5" height="4.5" />
          <rect x="8"   y="8"   width="4.5" height="4.5" />
        </svg>
      );
    case 'check':
      return (
        <svg {...common}>
          <rect x="2" y="2" width="10" height="10" rx="1" />
          <path d="m4.5 7.5 2 2 4-4" />
        </svg>
      );
    case 'factory':
      return (
        <svg {...common}>
          <path d="M1.5 12.5V6l3 2V6l3 2V4l5 1.5v7H1.5Z" />
        </svg>
      );
    case 'wave':
      return (
        <svg {...common}>
          <circle cx="7" cy="11" r="1" />
          <path d="M4 9a4 4 0 0 1 6 0" />
          <path d="M2 7a7 7 0 0 1 10 0" />
        </svg>
      );
    case 'doc':
      return (
        <svg {...common}>
          <path d="M3.5 1.5h5L10.5 3.5v9h-7V1.5Z" />
          <path d="M5 6h4M5 8h4M5 10h3" />
        </svg>
      );
    default:
      return null;
  }
}

/* ---------- mini UI hint inside each app frame ---------- */
function AppHint({ kind }) {
  switch (kind) {
    case 'error':
      return (
        <g>
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <line x1="0" y1={10 + i * 13} x2="44" y2={10 + i * 13} />
              <line x1="54" y1={10 + i * 13} x2="88" y2={10 + i * 13} />
              <circle
                cx="104"
                cy={10 + i * 13}
                r="2.6"
                className={`pa-hint-dot${i === 1 || i === 3 ? ' pa-hint-dot--orange' : ''}`}
              />
            </g>
          ))}
        </g>
      );
    case 'explorer':
      return (
        <g>
          <circle cx="16" cy="22" r="3" />
          <circle cx="50" cy="12" r="3" />
          <circle cx="92" cy="24" r="3" />
          <circle cx="34" cy="48" r="3" />
          <circle cx="82" cy="48" r="3" />
          <circle cx="58" cy="30" r="4" className="pa-hint-dot--orange" />
          <path d="M16 22 L58 30 M50 12 L58 30 M92 24 L58 30 M34 48 L58 30 M82 48 L58 30" />
        </g>
      );
    case 'requirements':
      return (
        <g>
          {[0, 1, 2, 3].map((i) => (
            <line key={i} x1="0" y1={10 + i * 13} x2="58" y2={10 + i * 13} />
          ))}
          <line x1="70" y1="10" x2="100" y2="10" className="pa-hint-score" />
          <line x1="70" y1="23" x2="88"  y2="23" className="pa-hint-score" />
          <line x1="70" y1="36" x2="108" y2="36" className="pa-hint-score pa-hint-score--orange" />
          <line x1="70" y1="49" x2="80"  y2="49" className="pa-hint-score" />
        </g>
      );
    case 'agent':
      return (
        <g>
          <rect x="0"  y="6"  width="72" height="13" rx="3" />
          <rect x="28" y="24" width="88" height="13" rx="3" className="pa-hint-bubble--orange" />
          <rect x="0"  y="42" width="56" height="13" rx="3" />
        </g>
      );
    default:
      return null;
  }
}

/* ========================================================================= */

export default function PlatformArchitecture() {
  return (
    <svg
      className="platform-arch"
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="SPREAD Platform architecture: three layers — fragmented systems feed an intelligence graph that powers products and agents."
    >
      {/* ===== subtle line grid background (same language as hero diagram) ===== */}
      <defs>
        <pattern
          id="pa-grid"
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 24 0 L 0 0 0 24"
            fill="none"
            stroke="#EFEFEF"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect x="0" y="0" width={VB_W} height={VB_H} fill="url(#pa-grid)" />

      {/* ===== layer boundary rules ===== */}
      <line
        x1="40"
        y1={TOP_RULE_Y}
        x2={VB_W - 40}
        y2={TOP_RULE_Y}
        className="pa-rule"
      />
      <line
        x1="40"
        y1={BOT_RULE_Y}
        x2={VB_W - 40}
        y2={BOT_RULE_Y}
        className="pa-rule"
      />

      {/* ===== perimeter tech labels (four corners) ===== */}
      <g className="pa-corner-label">
        <text x="28"         y="26"                textAnchor="start">FIG.02 — PLATFORM ARCHITECTURE</text>
        <text x={VB_W - 28}  y="26"                textAnchor="end">STATUS: LIVE</text>
        <text x="28"         y={VB_H - 16}         textAnchor="start">SPREAD · SCHEMATIC</text>
        <text x={VB_W - 28}  y={VB_H - 16}         textAnchor="end">v. 2026.1</text>
      </g>

      {/* ===================================================================
          ROW 3 — BOTTOM: 7 sources + flow lines UP to the middle boundary
          =================================================================== */}
      <g className="pa-row pa-row--bottom">
        {SOURCES.map((s, i) => {
          const cx = SRC_START_X + i * SRC_SPACING;
          return (
            <g
              key={s.id}
              className="pa-source"
              style={{ '--pa-delay': `${0.15 + 0.06 * i}s` }}
            >
              {/* vertical flow line from source token up to the bottom rule */}
              <line
                x1={cx}
                y1={SRC_CY - 22}
                x2={cx}
                y2={BOT_RULE_Y}
                className="pa-flow-line"
              />
              {/* landing dot on the rule */}
              <circle
                cx={cx}
                cy={BOT_RULE_Y}
                r="3"
                className="pa-anchor"
              />
              {/* source token */}
              <circle
                cx={cx}
                cy={SRC_CY}
                r="22"
                className="pa-source__bg"
              />
              <g transform={`translate(${cx - 8}, ${SRC_CY - 8})`} className="pa-source__glyph">
                <SourceGlyph name={s.glyph} />
              </g>
              <text
                x={cx}
                y={SRC_CY + 42}
                textAnchor="middle"
                className="pa-source__label"
              >
                {s.label}
              </text>
            </g>
          );
        })}
      </g>

      {/* ===================================================================
          ROW 2 — MIDDLE: knowledge graph, symmetric around (CX, GRAPH_CY)
          =================================================================== */}
      <g className="pa-row pa-row--middle">
        {/* ambient dots (background texture, symmetric) */}
        {AMBIENT_DOTS.map((a, i) => {
          const x = CX + a.dx;
          const y = GRAPH_CY + a.dy;
          return (
            <g key={`amb-${i}`}>
              <line
                x1={CX} y1={GRAPH_CY}
                x2={x} y2={y}
                className="pa-edge pa-edge--ambient"
              />
              <circle
                cx={x} cy={y} r="3"
                className="pa-node pa-node--ambient"
              />
            </g>
          );
        })}

        {/* primary edges (center → each satellite) */}
        {SATELLITES.map((s, i) => (
          <line
            key={`edge-${s.id}`}
            x1={CX}
            y1={GRAPH_CY}
            x2={CX + s.dx}
            y2={GRAPH_CY + s.dy}
            className="pa-edge pa-edge--primary"
            style={{ '--pa-delay': `${0.9 + 0.08 * i}s` }}
          />
        ))}

        {/* relationship pills, positioned at midpoint of each edge.
            All pills share PILL_WIDTH so the four labels form a symmetric
            matched set around the Error core. */}
        {SATELLITES.map((s, i) => {
          const midX = CX + s.dx / 2;
          const midY = GRAPH_CY + s.dy / 2;
          return (
            <g
              key={`pill-${s.id}`}
              transform={`translate(${midX}, ${midY})`}
              className="pa-pill"
              style={{ '--pa-delay': `${1.25 + 0.08 * i}s` }}
            >
              <rect
                x={-PILL_WIDTH / 2}
                y="-10"
                width={PILL_WIDTH}
                height="20"
                rx="3"
                className="pa-pill__bg"
              />
              <text y="4" textAnchor="middle" className="pa-pill__text">{s.pill}</text>
            </g>
          );
        })}

        {/* satellite nodes + labels */}
        {SATELLITES.map((s, i) => {
          const x = CX + s.dx;
          const y = GRAPH_CY + s.dy;
          /* place label on the "outside" of each satellite relative to center */
          const labelX = x + (s.dx === 0 ? 0 : Math.sign(s.dx) * 16);
          const labelY = y + (s.dy === 0 ? -16 : Math.sign(s.dy) * 18);
          const anchor =
            s.dx > 0 ? 'start' : s.dx < 0 ? 'end' : 'middle';
          return (
            <g
              key={`sat-${s.id}`}
              className="pa-satellite"
              style={{ '--pa-delay': `${1.1 + 0.08 * i}s` }}
            >
              <circle cx={x} cy={y} r="7" className="pa-node pa-node--labeled" />
              <text
                x={labelX}
                y={labelY + 4}
                textAnchor={anchor}
                className="pa-sat-label"
              >
                {s.label}
              </text>
            </g>
          );
        })}

        {/* core "Error" node at dead center.
            IMPORTANT: we need two nested groups here. The outer group owns
            the static SVG `transform="translate(...)"` for positioning.
            The inner `.pa-core` group owns the CSS scale-in animation.
            If we put both on a single group, the CSS `transform: scale(…)`
            from the keyframes wipes out the inline translate (CSS wins over
            the SVG attribute) — and the Error core snaps to (0, 0), showing
            up as a stray orange pulse in the top-left corner. */}
        <g transform={`translate(${CX}, ${GRAPH_CY})`}>
          <g className="pa-core">
            <circle r="26" className="pa-core__halo" />
            <circle r="16" className="pa-core__fill" />
            <text y="4" textAnchor="middle" className="pa-core__label">Error</text>
          </g>
        </g>
      </g>

      {/* ===================================================================
          ROW 1 — TOP: 4 app frames + flow lines DOWN to the top boundary
          =================================================================== */}
      <g className="pa-row pa-row--top">
        {APPS.map((f, i) => {
          const x = APP_START_X + i * (APP_W + APP_GAP);
          const centerX = x + APP_W / 2;
          return (
            <g
              key={f.id}
              className="pa-app"
              style={{ '--pa-delay': `${1.4 + 0.1 * i}s` }}
            >
              {/* vertical flow line from top rule up to the app frame */}
              <line
                x1={centerX}
                y1={TOP_RULE_Y}
                x2={centerX}
                y2={APP_Y + APP_H}
                className="pa-flow-line"
              />
              <circle
                cx={centerX}
                cy={TOP_RULE_Y}
                r="3"
                className="pa-anchor"
              />

              {/* role label above frame */}
              <text
                x={centerX}
                y={APP_Y - 12}
                textAnchor="middle"
                className="pa-app__role"
              >
                {f.role}
              </text>

              {/* frame */}
              <rect
                x={x}
                y={APP_Y}
                width={APP_W}
                height={APP_H}
                rx="3"
                className="pa-app__frame"
              />

              {/* title bar */}
              <text x={x + 12} y={APP_Y + 18} className="pa-app__title">
                {f.title}
              </text>
              <line
                x1={x + 10}
                y1={APP_Y + 26}
                x2={x + APP_W - 10}
                y2={APP_Y + 26}
                className="pa-app__divider"
              />

              {/* inner UI hint */}
              <g transform={`translate(${x + 14}, ${APP_Y + 32})`}>
                <g className="pa-app__hint">
                  <AppHint kind={f.id} />
                </g>
              </g>
            </g>
          );
        })}
      </g>
    </svg>
  );
}
