import React, { useEffect, useRef, useState } from 'react';
import './PageHero.css';

/* --------------------------------------------------------------------------
 * PageHero — hero composition for inner pages (Platform, Customers, Company,
 * future product pages). Deliberately distinct from the homepage Hero:
 *
 *   Homepage Hero:    [ TEXT | VISUAL ]   — big, emotional, conversion-focused
 *   PageHero:         [   VISUAL   ]
 *                     [ TEXT block ]       — editorial, technical, explanatory
 *
 * Same design system as the homepage (DIN Pro, orange accents, white bg)
 * but with smaller headline and different structural rhythm so users can
 * feel they've entered the product/content area of the site.
 *
 * Props (map cleanly to future HubSpot fields):
 *   eyebrow          string        — small orange label above headline
 *   headline         string        — ~40px, left column
 *   body             string        — paragraph, right column
 *   primaryCta       { label, href }
 *   secondaryCta     { label, href }
 *   visual           ReactNode     — illustration / diagram / mockup
 *   techLabels       { topLeft, topRight, bottomLeft, bottomRight }
 *                                   — tiny monospace corner captions, all optional
 * ------------------------------------------------------------------------ */

export default function PageHero({
  eyebrow,
  headline,
  body,
  primaryCta,
  secondaryCta,
  visual,
  techLabels = {},
}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  /* Trigger the reveal animation once the hero is actually on screen.
     (Mirrors the pattern we use on the CTA section.) */
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  const { topLeft, topRight, bottomLeft, bottomRight } = techLabels;
  const hasLabels = topLeft || topRight || bottomLeft || bottomRight;

  return (
    <section
      ref={ref}
      className={`page-hero${inView ? ' page-hero--in-view' : ''}`}
    >
      <div className="container page-hero__container">
        {/* Wrap exists purely so the straddling tech labels can be
            positioned relative to the visual frame's outer edges without
            being clipped by the frame's own `overflow: hidden` (which
            keeps the diagram's own overflow tidy). */}
        <div className="page-hero__visual-wrap">
          {hasLabels && (
            <>
              {topLeft && (
                <span className="page-hero__tech page-hero__tech--tl">
                  {topLeft}
                </span>
              )}
              {topRight && (
                <span className="page-hero__tech page-hero__tech--tr">
                  {topRight}
                </span>
              )}
              {bottomLeft && (
                <span className="page-hero__tech page-hero__tech--bl">
                  {bottomLeft}
                </span>
              )}
              {bottomRight && (
                <span className="page-hero__tech page-hero__tech--br">
                  {bottomRight}
                </span>
              )}
            </>
          )}
          <div className="page-hero__visual-frame">
            <div className="page-hero__visual">{visual}</div>
          </div>
        </div>

        <div className="page-hero__text">
          <div className="page-hero__text-left">
            {eyebrow && (
              <span className="eyebrow page-hero__eyebrow">{eyebrow}</span>
            )}
            {headline && (
              <h1 className="page-hero__headline">{headline}</h1>
            )}
          </div>
          <div className="page-hero__text-right">
            {body && <p className="page-hero__body">{body}</p>}
            {(primaryCta || secondaryCta) && (
              <div className="page-hero__ctas">
                {primaryCta && (
                  <a
                    className="page-hero__btn page-hero__btn--primary"
                    href={primaryCta.href}
                  >
                    {primaryCta.label}
                  </a>
                )}
                {secondaryCta && (
                  <a
                    className="page-hero__btn page-hero__btn--link"
                    href={secondaryCta.href}
                  >
                    {secondaryCta.label}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M3 7h8" />
                      <path d="m7 3 4 4-4 4" />
                    </svg>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export const meta = { label: 'Page Hero' };
export const fields = null;
