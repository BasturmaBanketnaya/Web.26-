import React from 'react';
import PixelSprite from './PixelSprite.jsx';
import './PixelRunner.css';

/* --------------------------------------------------------------------------
 * PixelRunner — the bouncing engineer along the homepage Hero frame.
 *
 * Thin wrapper around <PixelSprite /> that handles:
 *   • TRAVEL   (.pixel-runner)        — the left↔right bounce via CSS
 *   • FACING   (.pixel-runner__sprite) — scaleX flip at round-trip midpoint
 *
 * The actual sprite artwork + frame cycling lives in <PixelSprite />, so
 * any other scene (FAQ mini-game, future product pages) can reuse the same
 * character without duplicating pixel data.
 * ------------------------------------------------------------------------ */

export default function PixelRunner({ className = '' }) {
  return (
    <div className={`pixel-runner ${className}`.trim()} aria-hidden="true">
      <div className="pixel-runner__sprite">
        <PixelSprite className="pixel-runner__svg" />
      </div>
    </div>
  );
}
