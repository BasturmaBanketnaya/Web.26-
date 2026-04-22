import React, { useMemo } from 'react';
import './IntelligenceGraph.css';

/* =====================================================================
 * IntelligenceGraph
 *
 * Closing hero for the Get-Started section. Visual metaphor = SPREAD's
 * knowledge graph rendered as a tilted hemisphere (a "globe" of
 * engineering artifacts), heavily inspired by Vercel's footer globe
 * but rebuilt in our technical-schematic voice:
 *   - hairline strokes only, no fills on the dome grid
 *   - symmetric composition around a central vertical axis
 *   - JetBrains Mono labels above each artifact node
 *   - orange accent used sparingly (central hub + traveling pulses)
 *   - a small "status" chip below reinforces the "live graph" narrative
 *
 * What it represents:
 *   The central hub = SPREAD. Around it orbit the artifact types it
 *   connects — Requirement, CAD Part, Simulation, Test Case, Document,
 *   Ticket, plus the upstream systems PLM and ERP. Pulses travel along
 *   the edges on a loop, suggesting change propagation across the
 *   engineering graph.
 *
 * Geometry:
 *   Nodes are placed on a real tilted-sphere projection (tilt = α) so
 *   latitudes become ellipses and the arrangement feels 3D without
 *   needing WebGL. Computed once, memoised, then rendered as plain SVG.
 *
 * Performance:
 *   ~40-point polylines for meridians, CSS `offset-path` for pulses
 *   (GPU-friendly), no JS animation loop. Cheap enough to run in the
 *   footer of a marketing page without affecting paint perf.
 * ================================================================== */

// ---------------------------------------------------------------------
// Globe projection math
// ---------------------------------------------------------------------
const VIEW_W = 1000;
const VIEW_H = 560;

// Sphere center on screen + radius. Apex (pole) will be above CY.
const CX = VIEW_W / 2;
const CY = 400;
const R = 290;

// Tilt angle (radians). ~22° gives latitudes a pleasing ellipse
// shape without making the dome look like it's falling forward.
const ALPHA = (22 * Math.PI) / 180;
const SIN_A = Math.sin(ALPHA);
const COS_A = Math.cos(ALPHA);

const deg2rad = (deg) => (deg * Math.PI) / 180;

/* Project (latitude φ, longitude θ) on the sphere to screen (x, y).
   Standard tilted-sphere orthographic projection:
     - φ = 0 at equator, +90° at pole
     - θ = 0 facing the camera, positive to the right
   After tilt around the X axis, the pole sits slightly back-of-center
   (lower screen-y offset) and the equator front dips below CY. */
function project(phiDeg, thetaDeg) {
  const phi = deg2rad(phiDeg);
  const theta = deg2rad(thetaDeg);
  const x = R * Math.cos(phi) * Math.sin(theta);
  const y = R * Math.sin(phi) * COS_A - R * Math.cos(phi) * Math.cos(theta) * SIN_A;
  return { x: CX + x, y: CY - y };
}

// Apex (pole) position — used as the visual "target" control point
// for gently arched edge curves between nodes.
const APEX = project(90, 0);

/* Latitude ellipse parameters at altitude φ.
   For a tilted sphere viewed orthographically, a parallel at φ becomes
   an ellipse in screen space with
     rx = R * cos(φ),   ry = R * cos(φ) * sin(α). */
function latitudeEllipse(phiDeg) {
  const phi = deg2rad(phiDeg);
  return {
    cx: CX,
    cy: CY - R * Math.sin(phi) * COS_A,
    rx: R * Math.cos(phi),
    ry: R * Math.cos(phi) * SIN_A,
  };
}

/* Meridian as a sampled polyline (40 points from equator to apex).
   Each meridian projects to an ellipse in screen space, but computing
   its axes + rotation is fiddly, so we just march φ from 0 → 90° and
   stitch segments. At this resolution it reads as a smooth curve. */
function meridianPath(thetaDeg) {
  const pts = [];
  for (let i = 0; i <= 40; i++) {
    const phiDeg = (i / 40) * 90;
    pts.push(project(phiDeg, thetaDeg));
  }
  return pts
    .map((p, i) =>
      i === 0
        ? `M ${p.x.toFixed(2)} ${p.y.toFixed(2)}`
        : `L ${p.x.toFixed(2)} ${p.y.toFixed(2)}`,
    )
    .join(' ');
}

/* Edge path — a gentle quadratic bezier between two nodes whose
   control point is pulled a bit toward the dome's apex. This makes
   every connection curve "over the dome" rather than slicing straight
   through it, which reads much more globe-like. */
function edgePath(a, b) {
  const mx = (a.pos.x + b.pos.x) / 2;
  const my = (a.pos.y + b.pos.y) / 2;
  // Pull the midpoint toward the apex. Pulling more on Y than X keeps
  // the curve feeling like it's riding the surface of a dome (curves
  // lift toward the pole rather than drifting sideways).
  const lx = mx + (APEX.x - mx) * 0.15;
  const ly = my + (APEX.y - my) * 0.32;
  return `M ${a.pos.x.toFixed(2)} ${a.pos.y.toFixed(2)} Q ${lx.toFixed(2)} ${ly.toFixed(2)} ${b.pos.x.toFixed(2)} ${b.pos.y.toFixed(2)}`;
}

// ---------------------------------------------------------------------
// Graph definition — nodes + edges
// ---------------------------------------------------------------------

/* Node placement is deliberately symmetric about the vertical axis:
     - 1 hub node at the pole (SPREAD itself)
     - 2 ring-1 nodes just below the pole  (REQUIREMENT ↔ CAD PART)
     - 4 ring-2 nodes on the mid latitude  (SIM / DOC / TICKET / TEST)
     - 2 ring-3 nodes near the equator     (PLM ↔ ERP)
   Every left-side node has a mirrored right-side counterpart, which
   is what makes the composition feel balanced instead of scattered. */
const NODE_DEFS = [
  { id: 'spread', label: 'SPREAD',      phi: 90, theta:   0, kind: 'hub',      labelPos: 'top'   },
  { id: 'req',    label: 'REQUIREMENT', phi: 60, theta: -25, kind: 'artifact', labelPos: 'left'  },
  { id: 'cad',    label: 'CAD PART',    phi: 60, theta:  25, kind: 'artifact', labelPos: 'right' },
  { id: 'sim',    label: 'SIMULATION',  phi: 35, theta: -62, kind: 'artifact', labelPos: 'left'  },
  { id: 'doc',    label: 'DOCUMENT',    phi: 35, theta: -22, kind: 'artifact', labelPos: 'below' },
  { id: 'ticket', label: 'TICKET',      phi: 35, theta:  22, kind: 'artifact', labelPos: 'below' },
  { id: 'test',   label: 'TEST CASE',   phi: 35, theta:  62, kind: 'artifact', labelPos: 'right' },
  { id: 'plm',    label: 'PLM',         phi: 15, theta: -58, kind: 'system',   labelPos: 'left'  },
  { id: 'erp',    label: 'ERP',         phi: 15, theta:  58, kind: 'system',   labelPos: 'right' },
];

/* Edges — also mirror-symmetric. Every left-pair has a right-pair
   counterpart, so the connection graph itself is visually balanced
   even when no pulse is traveling. */
const EDGE_DEFS = [
  // Hub radiating out to the 6 artifact nodes (ring-1 + ring-2).
  ['spread', 'req'], ['spread', 'cad'],
  ['spread', 'sim'], ['spread', 'test'],
  ['spread', 'doc'], ['spread', 'ticket'],
  // Peer links across the top — ties Requirement to CAD Part
  // (the classic "design decisions trace back to requirements").
  ['req', 'cad'],
  // Mid-latitude cross-links — Requirement↔Document, CAD↔Ticket,
  // Sim↔Document, Test↔Ticket. Symmetric pairs.
  ['req', 'doc'], ['cad', 'ticket'],
  ['sim', 'doc'], ['test', 'ticket'],
  // Upstream systems anchor into the relevant artifact clusters.
  ['plm', 'req'], ['plm', 'sim'],
  ['erp', 'cad'], ['erp', 'test'],
];

/* A curated subset of edges carries traveling pulses. We deliberately
   pulse mirror-symmetric pairs so the animation always reads as a
   balanced ambient motion, never lopsided. */
const PULSE_EDGES = [
  ['spread', 'sim'], ['spread', 'test'],
  ['spread', 'doc'], ['spread', 'ticket'],
  ['req', 'doc'],    ['cad', 'ticket'],
  ['plm', 'req'],    ['erp', 'cad'],
];

// ---------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------
export default function IntelligenceGraph() {
  /* All geometry is static — compute it once and memoise. Nothing in
     here depends on props or state, so this never re-runs. */
  const { nodes, nodeById, edges, pulses, latitudes, meridians } = useMemo(() => {
    const projected = NODE_DEFS.map((n) => ({ ...n, pos: project(n.phi, n.theta) }));
    const byId = Object.fromEntries(projected.map((n) => [n.id, n]));

    const edgesBuilt = EDGE_DEFS.map(([aId, bId]) => {
      const a = byId[aId];
      const b = byId[bId];
      return { id: `${aId}-${bId}`, a, b, d: edgePath(a, b) };
    });

    const pulsesBuilt = PULSE_EDGES.map(([aId, bId], i) => {
      const a = byId[aId];
      const b = byId[bId];
      return {
        id: `pulse-${aId}-${bId}`,
        d: edgePath(a, b),
        // Stagger pulses across a 6s cycle so one launches roughly
        // every 0.75s — constant activity without feeling busy.
        delay: i * 0.75,
      };
    });

    return {
      nodes: projected,
      nodeById: byId,
      edges: edgesBuilt,
      pulses: pulsesBuilt,
      latitudes: [15, 35, 60, 78].map(latitudeEllipse),
      meridians: [-75, -45, -15, 15, 45, 75].map((theta) => ({
        id: `meri-${theta}`,
        d: meridianPath(theta),
      })),
    };
  }, []);

  return (
    <div className="igraph" aria-hidden="true">
      <svg
        className="igraph__svg"
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
      >
        {/* NOTE: the apex is no longer rendered as a node. The CTA
            button ("Book a Demo") is positioned absolutely over the
            apex point by CTA.css, so the button itself becomes the
            visual hub — all edges radiate outward from it. The glow
            gradient and hub-dot that used to live here have been
            removed accordingly. */}

        {/* Dome scaffolding — latitudes + meridians, all hairline. */}
        <g className="igraph__grid">
          {latitudes.map((lat, i) => (
            <ellipse
              key={`lat-${i}`}
              className="igraph__grid-line"
              cx={lat.cx}
              cy={lat.cy}
              rx={lat.rx}
              ry={lat.ry}
            />
          ))}
          {/* Equator — same ellipse class but drawn last so it sits
              on top of the meridians for a clean silhouette. */}
          <ellipse
            className="igraph__grid-line igraph__grid-line--equator"
            cx={CX}
            cy={CY}
            rx={R}
            ry={R * SIN_A}
          />
          {meridians.map((m) => (
            <path key={m.id} className="igraph__grid-line" d={m.d} />
          ))}
        </g>

        {/* Connection edges — drawn behind the nodes. */}
        <g className="igraph__edges">
          {edges.map((e) => (
            <path key={e.id} className="igraph__edge" d={e.d} />
          ))}
        </g>

        {/* Traveling pulses — each rides its own edge path via
            CSS `offset-path`. Starts at 0%, fades in/out, loops. */}
        <g className="igraph__pulses">
          {pulses.map((p) => (
            <circle
              key={p.id}
              className="igraph__pulse"
              r="3.5"
              style={{
                // Modern browsers — standard + -webkit vendor prefix
                // for Safari <16 (graceful no-op in older engines).
                offsetPath: `path('${p.d}')`,
                WebkitOffsetPath: `path('${p.d}')`,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
        </g>

        {/* Nodes — artifact dots. The hub at the apex is intentionally
            skipped; its position lives on for edge routing (via APEX)
            but is visually replaced by the CTA button overlaid in the
            parent. */}
        <g className="igraph__nodes">
          {nodes
            .filter((n) => n.kind !== 'hub')
            .map((n) => {
              const isSystem = n.kind === 'system';
              const radius = isSystem ? 6 : 5.5;
              return (
                <g
                  key={n.id}
                  className={`igraph__node igraph__node--${n.kind}`}
                  transform={`translate(${n.pos.x} ${n.pos.y})`}
                >
                  {/* Subtle breathing ring — every artifact node has a
                      heartbeat, not just the ones receiving pulses. */}
                  <circle className="igraph__node-ring" r={radius + 6} />
                  <circle className="igraph__node-dot" r={radius} />
                </g>
              );
            })}
        </g>

        {/* Labels — rendered as a separate layer so we can set a
            different blend/opacity without affecting the dots. */}
        <g className="igraph__labels">
          {nodes
            .filter((n) => n.kind !== 'hub')
            .map((n) => {
              const offsets = {
                top:   { dx:  0, dy: -16, anchor: 'middle' },
                below: { dx:  0, dy:  22, anchor: 'middle' },
                left:  { dx: -12, dy:  4, anchor: 'end'    },
                right: { dx:  12, dy:  4, anchor: 'start'  },
              };
              const o = offsets[n.labelPos] || offsets.top;
              return (
                <text
                  key={`label-${n.id}`}
                  className={`igraph__label igraph__label--${n.kind}`}
                  x={n.pos.x + o.dx}
                  y={n.pos.y + o.dy}
                  textAnchor={o.anchor}
                >
                  {n.label}
                </text>
              );
            })}
        </g>
      </svg>

      {/* Status chip — borrows the same language as the hero's tech
          labels. Feeds the "this is a live system" narrative without
          being a call-to-action competing with the Book a Demo button. */}
      <div className="igraph__status" aria-hidden="true">
        <span className="igraph__status-dot" />
        <span className="igraph__status-text">
          NODES 12,847 · LINKS 54,310 · SYNCED 2s AGO
        </span>
      </div>
    </div>
  );
}
