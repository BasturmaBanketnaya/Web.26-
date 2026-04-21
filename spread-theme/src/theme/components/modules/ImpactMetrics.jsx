import React from 'react';
import './ImpactMetrics.css';

import arrowIcon from '../../images/Arrow.svg';

const metrics = [
  { value: '10x', label: 'Faster impact analysis' },
  { value: '80%', label: 'Reduction in cross-team queries' },
  { value: '3 weeks', label: 'Average time to first insight' },
];

export default function ImpactMetrics() {
  return (
    <section className="impact-metrics">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">Why SPREAD</span>
          <h2>The impact is clear.</h2>
        </div>

        <div className="impact-metrics__grid">
          {metrics.map((metric) => (
            <div className="impact-metrics__card" key={metric.value}>
              <span className="impact-metrics__value">{metric.value}</span>
              <p className="impact-metrics__label">{metric.label}</p>
            </div>
          ))}
        </div>

        <div className="impact-metrics__cta">
          <a href="#" className="text-link">
            See why leaders choose SPREAD
            <img src={arrowIcon} alt="" />
          </a>
        </div>
      </div>
    </section>
  );
}

export const meta = { label: 'Impact Metrics' };
export const fields = null;
