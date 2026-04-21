import React from 'react';
import './ImpactMetrics.css';

import arrowIcon from '../../images/Arrow.svg';

/* --------------------------------------------------------------------------
 * ImpactMetrics — three-column stat band.
 *
 * Props-driven so the same module is reused on every page that needs a
 * proof/stat row; defaults preserve the original homepage content.
 *
 *  - variant: 'light' (beige, homepage) | 'dark' (dark background, Platform)
 *  - metrics: array of { value, label }
 *  - cta: optional { label, href }
 *
 * When we port to HubSpot, this shape maps cleanly to a repeater field.
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
  return (
    <section className={`impact-metrics impact-metrics--${variant}`}>
      <div className="container">
        <div className="section-header">
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          {headline && <h2>{headline}</h2>}
        </div>

        <div className="impact-metrics__grid">
          {metrics.map((metric) => (
            <div className="impact-metrics__card" key={`${metric.value}-${metric.label}`}>
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
