import React from 'react';
import './ImpactMetrics.css';

import arrowIcon from '../../images/Arrow.svg';

/* --------------------------------------------------------------------------
 * ImpactMetrics — stat module
 *
 * Two layouts share the same props:
 *   - variant: 'light' (centered beige band, homepage default)
 *   - variant: 'bento' (left-aligned white bento; intro cell on the left,
 *                       value cells on top, label cells underneath —
 *                       same visual grammar as PlatformArchitectureBento)
 *
 * Props map directly to a HubSpot module schema later:
 *   eyebrow, headline, metrics[{ value, label }], cta, variant
 * ------------------------------------------------------------------------ */

const DEFAULT_METRICS = [
  { value: '10x', label: 'Faster impact analysis' },
  { value: '80%', label: 'Reduction in cross-team queries' },
  { value: '3 weeks', label: 'Average time to first insight' },
];

export default function ImpactMetrics({
  eyebrow = 'Why SPREAD',
  headline = 'The impact is clear.',
  metrics = DEFAULT_METRICS,
  cta = { label: 'See why leaders choose SPREAD', href: '#' },
  variant = 'light',
}) {
  /* --- Bento layout --------------------------------------------------- *
   * Four-column grid:
   *   col 1 (spans 2 rows) — intro (eyebrow + headline)
   *   cols 2–4  row 1      — three value cells
   *   cols 2–4  row 2      — three label cells
   * ------------------------------------------------------------------- */
  if (variant === 'bento') {
    return (
      <section className="impact-metrics impact-metrics--bento">
        <div className="container">
          <div className="impact-metrics__grid impact-metrics__grid--bento">
            <div className="impact-metrics__cell impact-metrics__cell--intro">
              {eyebrow && <span className="eyebrow">{eyebrow}</span>}
              {headline && <h2 className="impact-metrics__headline">{headline}</h2>}
              {cta?.label && (
                <a href={cta.href} className="impact-metrics__link">
                  {cta.label}
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

            {metrics.map((metric, i) => (
              <div
                className="impact-metrics__cell impact-metrics__cell--value"
                key={`v-${i}`}
              >
                <span className="impact-metrics__value">{metric.value}</span>
              </div>
            ))}

            {metrics.map((metric, i) => (
              <div
                className="impact-metrics__cell impact-metrics__cell--label"
                key={`l-${i}`}
              >
                <p className="impact-metrics__label">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* --- Default light band (homepage legacy layout) -------------------- */
  return (
    <section className="impact-metrics impact-metrics--light">
      <div className="container">
        <div className="section-header">
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          {headline && <h2>{headline}</h2>}
        </div>

        <div className="impact-metrics__grid">
          {metrics.map((metric, i) => (
            <div className="impact-metrics__card" key={`${metric.value}-${i}`}>
              <span className="impact-metrics__value">{metric.value}</span>
              <p className="impact-metrics__label">{metric.label}</p>
            </div>
          ))}
        </div>

        {cta?.label && (
          <div className="impact-metrics__cta">
            <a href={cta.href} className="text-link">
              {cta.label}
              <img src={arrowIcon} alt="" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

export const meta = { label: 'Impact Metrics' };
export const fields = null;
