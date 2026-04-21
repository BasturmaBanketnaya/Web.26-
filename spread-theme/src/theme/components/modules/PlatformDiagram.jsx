import React from 'react';
import './PlatformDiagram.css';

/* --------------------------------------------------------------------------
 * PlatformDiagram — simplified wireframe illustration for the Platform page.
 *
 * Reads like a spec sheet, not a product screenshot:
 *   [ SOURCES ]  →  [ PRODUCT TWIN ]  →  [ APPS & AGENTS ]
 *
 * Stays conceptually aligned with the homepage PlatformMockup (same three
 * pillars) so the brand story is consistent, but strips all UI chrome so
 * the Platform page feels like explanation, not "another product shot".
 * ------------------------------------------------------------------------ */

const SOURCES = [
  { label: 'PLM',  glyph: 'layers'  },
  { label: 'CAD',  glyph: 'cube'    },
  { label: 'ERP',  glyph: 'grid'    },
  { label: 'ALM',  glyph: 'check'   },
];

const APPS = [
  { label: 'Requirements', glyph: 'doc'   },
  { label: 'Explorer',     glyph: 'tree'  },
  { label: 'Inspector',    glyph: 'ring'  },
  { label: 'Custom Agents', glyph: 'bolt' },
];

/* Tiny inline glyphs — intentionally minimal so they read at small scale
   and don't compete with the real content. */
function Glyph({ name }) {
  const common = {
    width: 12,
    height: 12,
    viewBox: '0 0 12 12',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.3,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };
  switch (name) {
    case 'layers':
      return (
        <svg {...common}>
          <path d="M6 1.5 1.5 4 6 6.5 10.5 4 6 1.5Z" />
          <path d="M1.5 7 6 9.5 10.5 7" />
        </svg>
      );
    case 'cube':
      return (
        <svg {...common}>
          <path d="M6 1.5 10.5 4v4L6 10.5 1.5 8V4L6 1.5Z" />
          <path d="M1.5 4 6 6.5 10.5 4" />
          <path d="M6 6.5v4" />
        </svg>
      );
    case 'grid':
      return (
        <svg {...common}>
          <rect x="1.5" y="1.5" width="3.5" height="3.5" />
          <rect x="7"   y="1.5" width="3.5" height="3.5" />
          <rect x="1.5" y="7"   width="3.5" height="3.5" />
          <rect x="7"   y="7"   width="3.5" height="3.5" />
        </svg>
      );
    case 'check':
      return (
        <svg {...common}>
          <path d="M1.5 6.5 4.5 9.5 10.5 3" />
        </svg>
      );
    case 'doc':
      return (
        <svg {...common}>
          <path d="M3 1.5h4L9 3.5v7H3V1.5Z" />
          <path d="M4.5 5h3" />
          <path d="M4.5 7h3" />
        </svg>
      );
    case 'tree':
      return (
        <svg {...common}>
          <circle cx="6"   cy="2.5" r="1" />
          <circle cx="2.5" cy="9.5" r="1" />
          <circle cx="9.5" cy="9.5" r="1" />
          <path d="M6 3.5v3M3 8.5l2.5-2M9 8.5l-2.5-2" />
        </svg>
      );
    case 'ring':
      return (
        <svg {...common}>
          <circle cx="6" cy="6" r="4" />
          <circle cx="6" cy="6" r="1.3" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'bolt':
      return (
        <svg {...common}>
          <path d="M7 1.5 3 6.5h2.5L5 10.5l4-5H6.5L7 1.5Z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function PlatformDiagram() {
  /* Coordinates: SVG viewBox 960×420.  Left column boxes at x=20..180,
     right column at x=780..940, center hexagon centered at (480, 210). */
  const LEFT_X      = 20;
  const LEFT_W      = 160;
  const RIGHT_X     = 780;
  const RIGHT_W     = 160;
  const BOX_H       = 60;
  const BOX_GAP     = 28;
  const COL_TOP     = 30;
  const CENTER_X    = 480;
  const CENTER_Y    = 210;
  const HEX_R       = 78;  /* circumscribed radius of the hexagon */

  /* 6 points of a flat-top hexagon */
  const hexPoints = [0, 1, 2, 3, 4, 5]
    .map((i) => {
      const angle = (Math.PI / 3) * i;
      const x = CENTER_X + HEX_R * Math.cos(angle);
      const y = CENTER_Y + HEX_R * Math.sin(angle);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  /* Hexagon's left-most & right-most anchor points for the connection
     lines. Flat-top hex → leftmost is at (CENTER_X - HEX_R, CENTER_Y). */
  const HEX_LEFT_X  = CENTER_X - HEX_R;
  const HEX_RIGHT_X = CENTER_X + HEX_R;

  return (
    <svg
      className="platform-diagram"
      viewBox="0 0 960 420"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="SPREAD Platform: sources feed a single product twin that powers apps and agents."
    >
      {/* ----- subtle grid background -------------------------------- */}
      <defs>
        <pattern
          id="pd-grid"
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
      <rect width="960" height="420" fill="url(#pd-grid)" />

      {/* ----- column headers ---------------------------------------- */}
      <text
        x={LEFT_X}
        y="16"
        className="platform-diagram__col-label"
      >
        SOURCES
      </text>
      <text
        x={CENTER_X}
        y="16"
        textAnchor="middle"
        className="platform-diagram__col-label platform-diagram__col-label--center"
      >
        PRODUCT TWIN
      </text>
      <text
        x={RIGHT_X + RIGHT_W}
        y="16"
        textAnchor="end"
        className="platform-diagram__col-label"
      >
        APPS &amp; AGENTS
      </text>

      {/* ----- connection lines (drawn behind boxes) ----------------- */}
      <g className="platform-diagram__connections">
        {SOURCES.map((_, i) => {
          const y = COL_TOP + i * (BOX_H + BOX_GAP) + BOX_H / 2;
          return (
            <path
              key={`cl-${i}`}
              d={`M ${LEFT_X + LEFT_W} ${y} C ${LEFT_X + LEFT_W + 60} ${y}, ${HEX_LEFT_X - 60} ${CENTER_Y}, ${HEX_LEFT_X} ${CENTER_Y}`}
              className="platform-diagram__line"
              style={{ animationDelay: `${0.15 * i}s` }}
            />
          );
        })}
        {APPS.map((_, i) => {
          const y = COL_TOP + i * (BOX_H + BOX_GAP) + BOX_H / 2;
          return (
            <path
              key={`cr-${i}`}
              d={`M ${HEX_RIGHT_X} ${CENTER_Y} C ${HEX_RIGHT_X + 60} ${CENTER_Y}, ${RIGHT_X - 60} ${y}, ${RIGHT_X} ${y}`}
              className="platform-diagram__line"
              style={{ animationDelay: `${0.15 * i + 0.3}s` }}
            />
          );
        })}
      </g>

      {/* ----- left column: sources ---------------------------------- */}
      <g>
        {SOURCES.map((s, i) => {
          const y = COL_TOP + i * (BOX_H + BOX_GAP);
          return (
            <g
              key={s.label}
              className="platform-diagram__node platform-diagram__node--source"
              style={{ animationDelay: `${0.08 * i}s` }}
            >
              <rect
                x={LEFT_X}
                y={y}
                width={LEFT_W}
                height={BOX_H}
                rx="3"
                className="platform-diagram__box"
              />
              <g transform={`translate(${LEFT_X + 16}, ${y + BOX_H / 2 - 6})`}>
                <Glyph name={s.glyph} />
              </g>
              <text
                x={LEFT_X + 38}
                y={y + BOX_H / 2 + 4}
                className="platform-diagram__label"
              >
                {s.label}
              </text>
              {/* tiny connector stub on the right edge */}
              <circle
                cx={LEFT_X + LEFT_W}
                cy={y + BOX_H / 2}
                r="2.5"
                className="platform-diagram__dot"
              />
            </g>
          );
        })}
      </g>

      {/* ----- center: product twin hexagon -------------------------- */}
      <g className="platform-diagram__center">
        {/* soft halo */}
        <circle
          cx={CENTER_X}
          cy={CENTER_Y}
          r={HEX_R + 22}
          fill="#FFF4EF"
          className="platform-diagram__halo"
        />
        <polygon
          points={hexPoints}
          className="platform-diagram__hex"
        />
        {/* inner hex for depth */}
        <polygon
          points={[0, 1, 2, 3, 4, 5]
            .map((i) => {
              const angle = (Math.PI / 3) * i;
              const r = HEX_R - 14;
              const x = CENTER_X + r * Math.cos(angle);
              const y = CENTER_Y + r * Math.sin(angle);
              return `${x.toFixed(1)},${y.toFixed(1)}`;
            })
            .join(' ')}
          className="platform-diagram__hex-inner"
        />
        <text
          x={CENTER_X}
          y={CENTER_Y - 4}
          textAnchor="middle"
          className="platform-diagram__center-title"
        >
          PRODUCT
        </text>
        <text
          x={CENTER_X}
          y={CENTER_Y + 14}
          textAnchor="middle"
          className="platform-diagram__center-title"
        >
          TWIN
        </text>
        {/* connector stubs on left & right edges */}
        <circle cx={HEX_LEFT_X}  cy={CENTER_Y} r="3" className="platform-diagram__dot platform-diagram__dot--orange" />
        <circle cx={HEX_RIGHT_X} cy={CENTER_Y} r="3" className="platform-diagram__dot platform-diagram__dot--orange" />
      </g>

      {/* ----- right column: apps ------------------------------------ */}
      <g>
        {APPS.map((a, i) => {
          const y = COL_TOP + i * (BOX_H + BOX_GAP);
          return (
            <g
              key={a.label}
              className="platform-diagram__node platform-diagram__node--app"
              style={{ animationDelay: `${0.08 * i + 0.3}s` }}
            >
              <rect
                x={RIGHT_X}
                y={y}
                width={RIGHT_W}
                height={BOX_H}
                rx="3"
                className="platform-diagram__box"
              />
              <g transform={`translate(${RIGHT_X + 16}, ${y + BOX_H / 2 - 6})`}>
                <Glyph name={a.glyph} />
              </g>
              <text
                x={RIGHT_X + 38}
                y={y + BOX_H / 2 + 4}
                className="platform-diagram__label"
              >
                {a.label}
              </text>
              <circle
                cx={RIGHT_X}
                cy={y + BOX_H / 2}
                r="2.5"
                className="platform-diagram__dot"
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
}
