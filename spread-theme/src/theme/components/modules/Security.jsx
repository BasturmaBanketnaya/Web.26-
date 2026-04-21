import React from 'react';
import './Security.css';

import soc2Logo from '../../images/Logo Security/SOC 2 Type II 1.png';
import isoLogo from '../../images/Logo Security/iso.png';
import gdprLogo from '../../images/Logo Security/gdpr.png';
import tisaxLogo from '../../images/Logo Security/logo-tisax.png';

const badges = [
  { src: soc2Logo, alt: 'SOC 2 Type II certified', label: 'SOC 2 Type II' },
  { src: isoLogo, alt: 'ISO certified', label: 'ISO certified' },
  { src: gdprLogo, alt: 'GDPR compliant', label: 'GDPR compliant' },
  { src: tisaxLogo, alt: 'TISAX certified', label: 'TISAX certified' },
];

export default function Security() {
  return (
    <section className="security">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">Security &amp; Reliability</span>
          <h2>Enterprise ready</h2>
        </div>

        <div className="security__grid">
          {badges.map((badge) => (
            <div className="security__badge" key={badge.label}>
              <img src={badge.src} alt={badge.alt} className="security__badge-img" />
              <span className="security__badge-label">{badge.label}</span>
            </div>
          ))}
        </div>

        <div className="security__cta">
          <a href="#" className="btn btn--outline">Security &amp; Compliance</a>
        </div>
      </div>
    </section>
  );
}

export const meta = { label: 'Security' };
export const fields = null;
