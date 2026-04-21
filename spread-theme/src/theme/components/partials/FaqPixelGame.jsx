import React from 'react';
import './FaqPixelGame.css';

/* --------------------------------------------------------------------------
 * FaqPixelGame
 *
 * A tiny ambient pixel scene that lives in the empty space at the bottom
 * of the FAQ intro cell. Question marks fall from above like Tetris
 * blocks; a pixel character runs in, catches one, and runs off screen.
 * Then a second character enters from the opposite side and catches the
 * next falling question mark. Loops forever, purely decorative.
 *
 * Visual language matches the homepage Hero's PixelRunner: thin-line,
 * single-color orange pixels on a white "floor". Motion is slow and
 * quiet so it reads as personality, not distraction.
 *
 * aria-hidden: true — it's ambient decoration; screen readers skip it.
 * ------------------------------------------------------------------------ */

function Character() {
  // A 6×10 pixel figure: head, body, legs. Drawn in SVG user units so
  // it stays crisp at any size.
  return (
    <g className="fpg__char">
      <rect x="1" y="0" width="4" height="3" />{/* head */}
      <rect x="0" y="3" width="6" height="4" />{/* torso */}
      <rect x="1" y="7" width="2" height="3" />{/* left leg */}
      <rect x="3" y="7" width="2" height="3" />{/* right leg */}
    </g>
  );
}

export default function FaqPixelGame() {
  return (
    <div className="fpg" aria-hidden="true">
      <svg
        className="fpg__svg"
        viewBox="0 0 220 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Dashed floor — the "ground" the runner follows. */}
        <line
          x1="4"
          y1="100"
          x2="216"
          y2="100"
          className="fpg__floor"
        />

        {/* --- Falling question marks ---
            Two marks on a shared 8s loop, offset 4s apart so there's
            always exactly one visible at a time. */}
        <text className="fpg__q fpg__q--1" x="80" y="14">?</text>
        <text className="fpg__q fpg__q--2" x="140" y="14">?</text>

        {/* --- Two runners, alternating sides ---
            Runner A enters from the left, runs right, catches Q1.
            Runner B enters from the right, runs left, catches Q2.
            Both share an 8s loop, offset 4s apart. */}
        <g className="fpg__runner fpg__runner--a">
          <Character />
        </g>
        <g className="fpg__runner fpg__runner--b">
          <Character />
        </g>
      </svg>
    </div>
  );
}
