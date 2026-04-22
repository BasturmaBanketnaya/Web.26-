import React from 'react';

/* --------------------------------------------------------------------------
 * PixelCar — side-view pixel-art compact car, nose-right.
 *
 * Companion sprite to <PixelSprite /> (the engineer), used in the
 * footer "sign-off" scene where the character runs in from the left,
 * gets into the parked car, and the car drives straight off the right
 * edge of the footer frame.
 *
 * Side-profile view was chosen deliberately: it matches the engineer's
 * side-view perspective so the two sprites share a consistent visual
 * language (same ground plane, same camera angle). A top-down vehicle
 * next to a side-view character would read as a perspective mismatch.
 *
 * Anatomy (nose on the right = direction of travel):
 *     • Rear bumper      col 1             (trunk/hatch tail)
 *     • Rear wheel       cols 2–4, r 6–8   (3×3 wheel block)
 *     • Cabin + roof     cols 5–13, r 0–3  (tapered up into roof)
 *     • Long hood        cols 10–18, r 3–5 (slopes down toward nose)
 *     • Front bumper     col 19            (headlight edge)
 *     • Front wheel      cols 16–18, r 6–8 (3×3 wheel block)
 *
 * Coordinate grid: 21 wide × 9 tall, with the ground line at row 8.
 * Kept as a static silhouette; all motion (pure horizontal slide +
 * flat opacity fade) is applied by the orchestrator in CSS.
 * ------------------------------------------------------------------------ */

function Pixel({ x, y }) {
  return <rect x={x} y={y} width="1" height="1" />;
}

const CAR_PIXELS = [
  /* --- roof apex (cabin top) ----------------------------------- */
  [7, 0], [8, 0], [9, 0], [10, 0], [11, 0],

  /* --- cabin top corners widening ------------------------------ */
  [6, 1], [7, 1], [8, 1], [9, 1], [10, 1], [11, 1], [12, 1],

  /* --- beltline: windshield base → roof pillars → rear window -- */
  [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2],
  [12, 2], [13, 2],

  /* --- upper body: rear → cabin → hood start ------------------- */
  [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3],
  [11, 3], [12, 3], [13, 3], [14, 3], [15, 3], [16, 3],

  /* --- body middle: widens to include hood + trunk ------------- */
  [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4],
  [10, 4], [11, 4], [12, 4], [13, 4], [14, 4], [15, 4],
  [16, 4], [17, 4], [18, 4],

  /* --- full-width body / sill line ----------------------------- */
  [1, 5], [2, 5], [3, 5], [4, 5], [5, 5], [6, 5], [7, 5],
  [8, 5], [9, 5], [10, 5], [11, 5], [12, 5], [13, 5], [14, 5],
  [15, 5], [16, 5], [17, 5], [18, 5], [19, 5],

  /* --- body bottom with wheel-well cutouts --------------------- */
  [1, 6],
  [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6],
  [12, 6], [13, 6], [14, 6], [15, 6],
  [19, 6],

  /* --- rear wheel (3×3 block) --------------------------------- */
  [2, 6], [3, 6], [4, 6],
  [2, 7], [3, 7], [4, 7],
  [2, 8], [3, 8], [4, 8],

  /* --- front wheel (3×3 block) -------------------------------- */
  [16, 6], [17, 6], [18, 6],
  [16, 7], [17, 7], [18, 7],
  [16, 8], [17, 8], [18, 8],
];

export default function PixelCar({ className = '', fill = 'var(--color-orange)' }) {
  return (
    <svg
      viewBox="0 0 21 9"
      preserveAspectRatio="xMidYMax meet"
      shapeRendering="crispEdges"
      className={`pixel-car ${className}`.trim()}
      aria-hidden="true"
    >
      <g fill={fill}>
        {CAR_PIXELS.map(([x, y], i) => (
          <Pixel key={`${x}-${y}-${i}`} x={x} y={y} />
        ))}
      </g>
    </svg>
  );
}
