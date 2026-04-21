import React from 'react';
import './PixelRunner.css';

/* --------------------------------------------------------------------------
 * PixelRunner — tiny 4-frame pixel-art sprite of a running engineer.
 *
 * Rendered as a single SVG filmstrip of four 10×14 pixel frames laid out
 * side-by-side inside a 40×14 internal coordinate space. The outer SVG's
 * viewBox is 0 0 10 14, which crops everything to one frame at a time.
 *
 * A SMIL <animateTransform> with calcMode="discrete" flips between the four
 * frames at 100ms intervals, giving that authentic arcade flip-book feel
 * (no interpolation between poses, just snap-cuts like a mechanical cel reel).
 *
 * Traversal + facing direction are handled in CSS on .pixel-runner, not here
 * — keeps the sprite fully self-contained and reusable in any container.
 * ------------------------------------------------------------------------ */

/* Each "pixel" is a 1×1 SVG unit.  Sprite grid is 10 cols × 14 rows.
   Frames are placed at x offsets 0, 10, 20, 30 within the filmstrip. */

function Pixel({ x, y }) {
  return <rect x={x} y={y} width="1" height="1" />;
}

function Frame({ offsetX, pixels }) {
  return (
    <g transform={`translate(${offsetX}, 0)`}>
      {pixels.map(([x, y], i) => (
        <Pixel key={`${x}-${y}-${i}`} x={x} y={y} />
      ))}
    </g>
  );
}

/* Shared body pixels across all 4 frames — hat, face, neck, torso, hips.
   Anchoring these as a constant so each frame only varies by limbs. */
const BODY = [
  /* hat */
  [4, 0], [5, 0],
  [3, 1], [4, 1], [5, 1], [6, 1],
  /* brim */
  [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2],
  /* face */
  [4, 3], [5, 3],
  /* neck */
  [4, 4], [5, 4],
  /* shoulders + chest */
  [3, 5], [4, 5], [5, 5], [6, 5],
  [4, 6], [5, 6],
  [4, 7], [5, 7],
  /* hips */
  [4, 8], [5, 8],
];

/* Frame 1 — wide stride: right leg + left arm forward. */
const LIMBS_F1 = [
  /* left arm forward (to character's right / viewer's right) */
  [7, 6], [8, 7],
  /* right arm back */
  [2, 6], [1, 7],
  /* right leg forward + foot */
  [5, 9], [6, 10], [7, 10], [7, 11], [8, 12], [8, 13],
  /* left leg back + foot */
  [4, 9], [3, 10], [2, 10], [2, 11], [1, 12], [1, 13],
];

/* Frame 2 — passing: right knee up/bent, left leg planted, arms swinging through. */
const LIMBS_F2 = [
  /* left arm coming down toward side */
  [7, 5], [6, 6],
  /* right arm coming forward along torso */
  [2, 5], [3, 6],
  /* left leg planted straight down */
  [4, 9], [4, 10], [4, 11], [4, 12], [4, 13], [5, 13],
  /* right leg lifted, knee up, foot back */
  [5, 9], [6, 10], [6, 11], [7, 11],
];

/* Frame 3 — wide stride: mirror of Frame 1 (left leg + right arm forward).
   Visually similar to F1 but with slightly shorter stride so the cycle reads
   as motion rather than looking like a 2-frame loop. */
const LIMBS_F3 = [
  /* right arm forward */
  [7, 6], [8, 7],
  /* left arm back */
  [2, 6], [1, 7],
  /* left leg forward (shorter reach than F1 for variety) */
  [5, 9], [6, 10], [6, 11], [7, 12], [7, 13],
  /* right leg back (more bent than F1) */
  [4, 9], [3, 10], [3, 11], [2, 12], [2, 13],
];

/* Frame 4 — passing: mirror of Frame 2 (left knee up, right leg planted). */
const LIMBS_F4 = [
  /* right arm coming down */
  [2, 5], [3, 6],
  /* left arm forward along torso */
  [7, 5], [6, 6],
  /* right leg planted */
  [5, 9], [5, 10], [5, 11], [5, 12], [5, 13], [4, 13],
  /* left leg lifted, knee up */
  [4, 9], [3, 10], [3, 11], [2, 11],
];

const FRAMES = [
  { offsetX: 0,  pixels: [...BODY, ...LIMBS_F1] },
  { offsetX: 10, pixels: [...BODY, ...LIMBS_F2] },
  { offsetX: 20, pixels: [...BODY, ...LIMBS_F3] },
  { offsetX: 30, pixels: [...BODY, ...LIMBS_F4] },
];

export default function PixelRunner({ className = '' }) {
  return (
    <div className={`pixel-runner ${className}`.trim()} aria-hidden="true">
      <div className="pixel-runner__sprite">
        <svg
          viewBox="0 0 10 14"
          preserveAspectRatio="xMinYMax meet"
          shapeRendering="crispEdges"
          className="pixel-runner__svg"
        >
          <g className="pixel-runner__cels" fill="var(--color-orange)">
            {FRAMES.map((frame, i) => (
              <Frame key={i} offsetX={frame.offsetX} pixels={frame.pixels} />
            ))}
            {/* SMIL flip-book — snaps between the four frame offsets so poses
                don't interpolate (which would look like melting, not running). */}
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; -10,0; -20,0; -30,0"
              keyTimes="0; 0.25; 0.5; 0.75"
              calcMode="discrete"
              dur="0.4s"
              repeatCount="indefinite"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
