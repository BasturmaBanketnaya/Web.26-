import React from 'react';
import PixelSprite from './PixelSprite.jsx';
import PixelCar from './PixelCar.jsx';
import './PixelCarRunner.css';

/* --------------------------------------------------------------------------
 * PixelCarRunner — the footer "sign-off" scene.
 *
 * Narrative:
 *     1. Engineer sprite runs in from the left edge of the footer bento.
 *     2. Reaches the parked pixel car around ~72% across.
 *     3. "Gets in" (fades out at the door line).
 *     4. Car pulls away and drives straight off past the right edge.
 *     5. Short empty beat. Car respawns, engineer re-enters from the left.
 *     6. Loop.
 *
 * Two absolute-positioned sprites share a single cycle duration (via the
 * same `--pcr-cycle` custom property). All choreography lives in CSS
 * keyframes — see PixelCarRunner.css for the timeline breakdown.
 *
 * The engineer sprite's *internal* 4-frame run cycle continues via SMIL
 * even while the outer element is invisible (during the car's exit +
 * pause), which is cheap and keeps this component driver-free. No JS
 * timers needed.
 *
 * FOOTER-ONLY. The homepage Hero and the FAQ game still use the
 * original <PixelRunner /> / <FaqPixelGame /> unchanged.
 * ------------------------------------------------------------------------ */

export default function PixelCarRunner({ className = '' }) {
  return (
    <div className={`pixel-car-runner ${className}`.trim()} aria-hidden="true">
      {/* Car — parked ~72% across, rolls out after the engineer boards. */}
      <div className="pixel-car-runner__car">
        <PixelCar className="pixel-car-runner__car-svg" />
      </div>

      {/* Engineer — runs in from the left, boards the car, vanishes. */}
      <div className="pixel-car-runner__runner">
        <PixelSprite className="pixel-car-runner__runner-svg" />
      </div>
    </div>
  );
}
