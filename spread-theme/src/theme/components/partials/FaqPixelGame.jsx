import React from 'react';
import PixelSprite from './PixelSprite.jsx';
import './FaqPixelGame.css';

/* --------------------------------------------------------------------------
 * FaqPixelGame — ambient pixel scene for the bottom of the FAQ intro cell.
 *
 * Structure
 * ---------
 * The scene stretches to the full width of its container. Runners walk
 * along the intro cell's actual bottom border — no custom floor line
 * is drawn; the bento's own border serves as the ground.
 *   • Two "?" sprites that fall from above during phases 1 and 2.
 *   • Two runners. Each runner has its own child "carry-?" sprite that
 *     only becomes visible at the catch moment, above the runner's head.
 *     Because the carry-? is a child of the runner, it automatically
 *     inherits the runner's horizontal motion — no separate animation to
 *     stay in sync. The falling "?" fades out at the same instant the
 *     carry-? fades in, reading as "the runner picked it up".
 *
 * 10-second loop
 * --------------
 *   0.0–2.0s  ?₁ falls; runner A walks in from the left.
 *   2.0–2.5s  Catch: fall-?₁ vanishes, carry-?₁ appears over A's head.
 *   2.5–5.0s  Runner A continues right and exits with the ? in tow.
 *   5.0–7.0s  ?₂ falls; runner B walks in from the right (mirrored).
 *   7.0–7.5s  Catch on B.
 *   7.5–10s   Runner B exits left with its ?.
 *
 * All positioning is percentage- or calc-based, so the scene can be any
 * width and the animation stretches cleanly.
 * aria-hidden — pure decoration.
 * ------------------------------------------------------------------------ */

/* ----- Pixel-art question mark -------------------------------------------
 * 9×12 grid, 2-pixel strokes, single color. Chunky "?" matching the
 * reference image — same visual weight as the character sprite. */
const Q_MARK_PIXELS = [
  // top bar
  [2, 0], [3, 0], [4, 0], [5, 0],
  [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1],
  // left + right ticks of the hook
  [0, 2], [1, 2],
  [5, 2], [6, 2],
  // right side going down
  [5, 3], [6, 3],
  [4, 4], [5, 4],
  // diagonal tail
  [3, 5], [4, 5],
  [3, 6], [4, 6],
  [3, 7], [4, 7],
  // row 8 intentionally empty — "dot" gap
  // dot at the bottom
  [3, 10], [4, 10],
  [3, 11], [4, 11],
];

function PixelQuestionMark() {
  return (
    <svg
      viewBox="0 0 9 12"
      shapeRendering="crispEdges"
      className="fpg__q-svg"
      aria-hidden="true"
    >
      <g fill="var(--color-orange)">
        {Q_MARK_PIXELS.map(([x, y], i) => (
          <rect key={i} x={x} y={y} width="1" height="1" />
        ))}
      </g>
    </svg>
  );
}

export default function FaqPixelGame() {
  return (
    <div className="fpg" aria-hidden="true">
      <div className="fpg__scene">
        {/* Falling ?s — absolute-positioned at the catch point, visible
            only during their phase, then hidden once the runner grabs them. */}
        <div className="fpg__q-fall fpg__q-fall--1">
          <PixelQuestionMark />
        </div>
        <div className="fpg__q-fall fpg__q-fall--2">
          <PixelQuestionMark />
        </div>

        {/* Runner A — enters from left, carries ? out to the right. */}
        <div className="fpg__runner fpg__runner--a">
          <div className="fpg__runner-sprite">
            <PixelSprite className="fpg__runner-svg" />
          </div>
          <div className="fpg__q-carry">
            <PixelQuestionMark />
          </div>
        </div>

        {/* Runner B — enters from right (mirrored), carries ? out to the left. */}
        <div className="fpg__runner fpg__runner--b">
          <div className="fpg__runner-sprite fpg__runner-sprite--mirror">
            <PixelSprite className="fpg__runner-svg" />
          </div>
          <div className="fpg__q-carry">
            <PixelQuestionMark />
          </div>
        </div>
      </div>
    </div>
  );
}
