import React, { useEffect, useRef, useState } from 'react';

import PlatformArchitecture from './PlatformArchitecture.jsx';
import './PlatformArchitectureBento.css';

/* --------------------------------------------------------------------------
 * PlatformArchitectureBento
 *
 * A bento-grid section built around the PlatformArchitecture schematic.
 * Purpose: give the detailed architecture diagram a confident home on the
 * Platform page, surrounded by short narrative cells that explain what the
 * reader is actually looking at (sources → twin → apps).
 *
 * Layout (6-col grid on desktop, single column under 960px):
 *
 *   ┌──────────────────────────────┬─────────────────────┐
 *   │                              │  eyebrow + headline │
 *   │                              ├─────────────────────┤
 *   │  PlatformArchitecture        │  body + link        │
 *   │  (big, cols 1–4 × rows 1–2)  │                     │
 *   │                              │                     │
 *   └─────────────┬────────────────┴─────────────────────┘
 *   │ Sources     │ Product Twin     │  Apps & Agents    │
 *   └─────────────┴──────────────────┴───────────────────┘
 *
 * Props are the only text source so this maps cleanly onto a HubSpot module
 * (fields.json → props) without touching the composition.
 * ------------------------------------------------------------------------ */

const DEFAULT_LAYERS = [
  {
    id: 'sources',
    label: 'Seven sources, one contract',
    body: 'PLM, ERP, CAD, ALM, MES, IoT and Docs harmonised at ingest — no one-off ETL per team.',
    glyph: 'sources',
  },
  {
    id: 'twin',
    label: 'A living knowledge graph',
    body: 'Errors, functions, requirements, signals and components modeled as a graph — not a warehouse.',
    glyph: 'graph',
  },
  {
    id: 'apps',
    label: 'Apps & agents on top',
    body: 'Error Inspector, Product Explorer, Requirements Manager and AI agents all read from the same twin.',
    glyph: 'apps',
  },
];

/* Small inline schematic glyphs to keep the feature cells on-brand with the
   rest of the technical-schematic language (thin orange lines on white). */
function LayerGlyph({ name }) {
  const common = {
    width: 40,
    height: 40,
    viewBox: '0 0 40 40',
    fill: 'none',
    stroke: 'var(--color-orange)',
    strokeWidth: 1.5,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

  if (name === 'sources') {
    // Seven dots on a horizontal rule feeding upward into a single node.
    return (
      <svg {...common} aria-hidden="true">
        <line x1="4" y1="28" x2="36" y2="28" />
        {[7, 12, 17, 22, 27, 32].map((x) => (
          <circle key={x} cx={x} cy="28" r="1.4" fill="var(--color-orange)" stroke="none" />
        ))}
        <circle cx="20" cy="12" r="5" />
        <line x1="20" y1="17" x2="20" y2="28" strokeDasharray="2 2.5" />
      </svg>
    );
  }

  if (name === 'graph') {
    // Central node with 4 satellites — mirrors the middle layer of the schematic.
    return (
      <svg {...common} aria-hidden="true">
        <circle cx="20" cy="20" r="4" fill="var(--color-orange)" stroke="none" />
        <circle cx="20" cy="6" r="2.2" />
        <circle cx="34" cy="20" r="2.2" />
        <circle cx="20" cy="34" r="2.2" />
        <circle cx="6" cy="20" r="2.2" />
        <line x1="20" y1="16" x2="20" y2="8.2" />
        <line x1="24" y1="20" x2="31.8" y2="20" />
        <line x1="20" y1="24" x2="20" y2="31.8" />
        <line x1="16" y1="20" x2="8.2" y2="20" />
      </svg>
    );
  }

  // 'apps' — four stacked app frames, the top one highlighted.
  return (
    <svg {...common} aria-hidden="true">
      <rect x="4" y="4" width="32" height="7" rx="1.2" />
      <rect x="4" y="13" width="32" height="7" rx="1.2" />
      <rect x="4" y="22" width="32" height="7" rx="1.2" />
      <rect x="4" y="31" width="32" height="7" rx="1.2" />
      <line x1="8" y1="7.5" x2="16" y2="7.5" />
      <line x1="8" y1="16.5" x2="20" y2="16.5" />
      <line x1="8" y1="25.5" x2="14" y2="25.5" />
      <line x1="8" y1="34.5" x2="18" y2="34.5" />
    </svg>
  );
}

export default function PlatformArchitectureBento({
  eyebrow = 'Architecture',
  headline = 'From engineering data to live decisions.',
  body =
    'Seven source systems feed a single, living Product Twin. An intelligence layer ' +
    'links every error to its cause and effect — so every app and agent reasons from ' +
    'the same ground truth.',
  link = { label: 'See how it works', href: '#how-it-works' },
  layers = DEFAULT_LAYERS,
  techLabels = {
    topLeft: 'FIG.02 — PLATFORM ARCHITECTURE',
    topRight: 'STATUS: LIVE',
    bottomLeft: 'SPREAD / SCHEMATIC',
    bottomRight: 'v. 2026.1',
  },
}) {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -80px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`pa-bento${inView ? ' pa-bento--in-view' : ''}`}
    >
      <div className="pa-bento__container container">
        {/* Wrap hosts the bento grid + the tech labels as siblings.
            Labels live outside the grid (which has `overflow: hidden` for
            the rounded-corner mask) so they straddle the grid's outer
            border without being clipped. */}
        <div className="pa-bento__wrap">
          {techLabels?.topLeft && (
            <span className="pa-bento__tech pa-bento__tech--tl">
              {techLabels.topLeft}
            </span>
          )}
          {techLabels?.topRight && (
            <span className="pa-bento__tech pa-bento__tech--tr">
              {techLabels.topRight}
            </span>
          )}
          {techLabels?.bottomLeft && (
            <span className="pa-bento__tech pa-bento__tech--bl">
              {techLabels.bottomLeft}
            </span>
          )}
          {techLabels?.bottomRight && (
            <span className="pa-bento__tech pa-bento__tech--br">
              {techLabels.bottomRight}
            </span>
          )}

          <div className="pa-bento__grid">
            {/* --- Big diagram cell ------------------------------------------------ */}
            <div className="pa-bento__cell pa-bento__cell--diagram">
              <div className="pa-bento__diagram">
                <PlatformArchitecture />
              </div>
            </div>

          {/* --- Intro cell (eyebrow + headline) -------------------------------- */}
          <div className="pa-bento__cell pa-bento__cell--intro">
            <span className="eyebrow pa-bento__eyebrow">{eyebrow}</span>
            <h2 className="pa-bento__headline">{headline}</h2>
          </div>

          {/* --- Body cell (paragraph + link) ----------------------------------- */}
          <div className="pa-bento__cell pa-bento__cell--body">
            <p className="pa-bento__body">{body}</p>
            {link?.label && (
              <a href={link.href} className="pa-bento__link">
                {link.label}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 7h8M7 3l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            )}
          </div>

          {/* --- Three layer cells --------------------------------------------- */}
          {layers.map((layer) => (
            <div
              key={layer.id}
              className="pa-bento__cell pa-bento__cell--layer"
            >
              <div className="pa-bento__layer-glyph">
                <LayerGlyph name={layer.glyph} />
              </div>
              <div className="pa-bento__layer-text">
                <h3 className="pa-bento__layer-label">{layer.label}</h3>
                <p className="pa-bento__layer-body">{layer.body}</p>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
