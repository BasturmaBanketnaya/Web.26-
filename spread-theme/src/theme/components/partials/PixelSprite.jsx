import React from 'react';

/* --------------------------------------------------------------------------
 * PixelSprite — the 4-frame pixel-art engineer, no positioning/no facing.
 *
 * Extracted from PixelRunner so the same character sprite can be reused
 * anywhere on the site (homepage hero, FAQ mini-scene, future product
 * pages). Pure visual: emits one SVG that cycles its own 4 frames via
 * SMIL. External wrappers decide where it lives and which way it faces.
 *
 * Coordinate system: 10x14 pixel grid. Each "pixel" is a 1x1 rect.
 * Four frames are drawn side-by-side into a 40x14 filmstrip; the outer
 * viewBox (0 0 10 14) crops to one frame at a time, and the filmstrip
 * is translated left by 10/20/30 via <animateTransform calcMode="discrete">
 * to flip between poses with no interpolation.
 * ------------------------------------------------------------------------ */

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

const BODY = [
  [4, 0], [5, 0],
  [3, 1], [4, 1], [5, 1], [6, 1],
  [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2],
  [4, 3], [5, 3],
  [4, 4], [5, 4],
  [3, 5], [4, 5], [5, 5], [6, 5],
  [4, 6], [5, 6],
  [4, 7], [5, 7],
  [4, 8], [5, 8],
];

const LIMBS_F1 = [
  [7, 6], [8, 7],
  [2, 6], [1, 7],
  [5, 9], [6, 10], [7, 10], [7, 11], [8, 12], [8, 13],
  [4, 9], [3, 10], [2, 10], [2, 11], [1, 12], [1, 13],
];

const LIMBS_F2 = [
  [7, 5], [6, 6],
  [2, 5], [3, 6],
  [4, 9], [4, 10], [4, 11], [4, 12], [4, 13], [5, 13],
  [5, 9], [6, 10], [6, 11], [7, 11],
];

const LIMBS_F3 = [
  [7, 6], [8, 7],
  [2, 6], [1, 7],
  [5, 9], [6, 10], [6, 11], [7, 12], [7, 13],
  [4, 9], [3, 10], [3, 11], [2, 12], [2, 13],
];

const LIMBS_F4 = [
  [2, 5], [3, 6],
  [7, 5], [6, 6],
  [5, 9], [5, 10], [5, 11], [5, 12], [5, 13], [4, 13],
  [4, 9], [3, 10], [3, 11], [2, 11],
];

const FRAMES = [
  { offsetX: 0,  pixels: [...BODY, ...LIMBS_F1] },
  { offsetX: 10, pixels: [...BODY, ...LIMBS_F2] },
  { offsetX: 20, pixels: [...BODY, ...LIMBS_F3] },
  { offsetX: 30, pixels: [...BODY, ...LIMBS_F4] },
];

export default function PixelSprite({ className = '', fill = 'var(--color-orange)' }) {
  return (
    <svg
      viewBox="0 0 10 14"
      preserveAspectRatio="xMinYMax meet"
      shapeRendering="crispEdges"
      className={`pixel-sprite ${className}`.trim()}
      aria-hidden="true"
    >
      <g className="pixel-sprite__cels" fill={fill}>
        {FRAMES.map((frame, i) => (
          <Frame key={i} offsetX={frame.offsetX} pixels={frame.pixels} />
        ))}
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
  );
}
