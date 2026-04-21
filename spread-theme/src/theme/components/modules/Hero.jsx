import React from 'react';
import PlatformMockup from './PlatformMockup';
import PixelRunner from '../partials/PixelRunner.jsx';
import './Hero.css';

/* --------------------------------------------------------------------------
 * Hero module — data-driven so one React component serves every page.
 *
 * Defaults below match the homepage's original hardcoded content, so pages
 * that don't pass props render identically to before this refactor. Pages
 * that need different copy pass the relevant props (see PlatformPage.jsx).
 *
 * HubSpot-friendly prop names map 1:1 to future fields.json entries:
 *   eyebrow       → text          (optional)
 *   headlineLines → group.repeater (one entry per animated line)
 *   subline       → richtext
 *   primaryCta    → group { label, href }
 *   secondaryCta  → group { label, href } (optional)
 *   visual        → React node (PlatformMockup by default; pages can pass
 *                   an <img>, a different mockup, or null to hide)
 * ------------------------------------------------------------------------ */

const DEFAULT_HEADLINE_LINES = [
  'Ship Faster.',
  'Break Nothing.',
  'Know Exactly Why.',
];

const DEFAULT_SUBLINE =
  'SPREAD connects your PLM, CAD, ERP, and ALM into a single intelligent layer. ' +
  'Find hidden dependencies in seconds, not sprint cycles.';

const DEFAULT_PRIMARY_CTA = { label: 'Request a Demo', href: '#' };
const DEFAULT_SECONDARY_CTA = { label: 'Talk to an expert', href: '#' };

export default function Hero({
  eyebrow,
  headlineLines = DEFAULT_HEADLINE_LINES,
  subline = DEFAULT_SUBLINE,
  primaryCta = DEFAULT_PRIMARY_CTA,
  secondaryCta = DEFAULT_SECONDARY_CTA,
  visual,
}) {
  /* `undefined` = use default mockup. Pages pass `null` to hide the visual
     entirely or pass any React node to swap in their own. */
  const visualNode = visual === undefined ? <PlatformMockup /> : visual;

  return (
    <section className="hero">
      <div className="hero__inner">
        {/* Decorative frame: rounded border + rectangular hairline grid +
            monospace corner captions. Matches the PageHero / PlatformArchitecture
            visual language so the home page feels like it belongs to the same
            spec-sheet family as inner pages.

            The frame is purely visual — positioned absolute behind the hero
            content so the existing layout (text-left, mockup-overlapping-next-
            section) stays exactly as before. The mockup still bleeds through
            the frame's bottom edge on purpose, preserving the scroll cue. */}
        <div className="hero__frame" aria-hidden="true">
          <span className="hero__tech hero__tech--tl">FIG.00 — HOMEPAGE</span>
          <span className="hero__tech hero__tech--tr">STATUS: LIVE</span>
          <span className="hero__tech hero__tech--bl">SPREAD / HERO</span>
          <span className="hero__tech hero__tech--br">v. 2026.1</span>
        </div>
        {/* Pixel runner lives in its OWN stacking layer above the hero content
            so it never gets occluded by the mockup's bottom fade. Positioned
            to jog along the frame's bottom border (see .hero__runner-track). */}
        <div className="hero__runner-track" aria-hidden="true">
          <PixelRunner />
        </div>
        <div className="hero__layout">
          <div className="hero__content">
            {eyebrow && (
              <span className="eyebrow hero__eyebrow">{eyebrow}</span>
            )}
            <h1 className="hero__headline">
              {headlineLines.map((line, i) => (
                <span key={`${line}-${i}`} className="hero__headline-clip">
                  <span
                    className="hero__headline-line"
                    style={{ animationDelay: `${i * 250}ms` }}
                  >
                    {line}
                  </span>
                </span>
              ))}
            </h1>
            {subline && (
              <div className="hero__subline-clip">
                <p className="hero__subline">{subline}</p>
              </div>
            )}
            {(primaryCta || secondaryCta) && (
              <div className="hero__ctas">
                {primaryCta && (
                  <a
                    href={primaryCta.href}
                    className="hero__btn hero__btn--primary"
                  >
                    {primaryCta.label}
                  </a>
                )}
                {secondaryCta && (
                  <a
                    href={secondaryCta.href}
                    className="hero__btn hero__btn--secondary"
                  >
                    {secondaryCta.label}
                  </a>
                )}
              </div>
            )}
          </div>
          {visualNode && (
            <div className="hero__visual">
              <div className="hero__image-wrap hero__image-wrap--mockup">
                {visualNode}
                <div className="hero__image-fade" aria-hidden="true" />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export const meta = { label: 'Hero' };
export const fields = null;
