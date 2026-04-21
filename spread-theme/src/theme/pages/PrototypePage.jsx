import React from 'react';

import Header from '../components/partials/Header.jsx';
import PlatformArchitecture from '../components/modules/PlatformArchitecture.jsx';

/* --------------------------------------------------------------------------
 * PrototypePage — isolated sandbox for reviewing the new architecture
 * illustration before we wire it into the real Platform page.
 *
 * Deliberately minimal: just the illustration, with sample surrounding
 * text so we can see how the section will feel. Not part of the final
 * site — we'll delete this route once the illustration is approved.
 * ------------------------------------------------------------------------ */

const styles = {
  page: {
    background: 'var(--color-white)',
    minHeight: '100vh',
  },
  banner: {
    background: '#FFF8F4',
    borderBottom: '1px solid #F1D9CB',
    padding: '12px 24px',
    fontFamily: 'var(--font-primary)',
    fontSize: '13px',
    color: 'var(--color-dark)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '24px',
    flexWrap: 'wrap',
  },
  bannerLeft: {
    fontWeight: 500,
    letterSpacing: '0.04em',
  },
  bannerLink: {
    color: 'var(--color-orange)',
    textDecoration: 'underline',
  },
  main: {
    padding: '80px 24px 120px',
    maxWidth: '1100px',
    margin: '0 auto',
  },
  eyebrow: {
    fontFamily: "'JetBrains Mono', 'SF Mono', ui-monospace, monospace",
    fontSize: '11px',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: 'var(--color-orange)',
    marginBottom: '16px',
    display: 'block',
  },
  title: {
    fontFamily: 'var(--font-primary)',
    fontWeight: 500,
    fontSize: 'clamp(28px, 3.4vw, 40px)',
    lineHeight: 1.12,
    letterSpacing: '-0.9px',
    color: 'var(--color-dark)',
    margin: '0 0 20px',
    maxWidth: '20ch',
  },
  body: {
    fontFamily: 'var(--font-primary)',
    fontSize: '17px',
    lineHeight: 1.5,
    letterSpacing: '-0.3px',
    color: 'var(--color-gray-700)',
    maxWidth: '56ch',
    marginBottom: '60px',
  },
  illustrationWrap: {
    background: 'var(--color-white)',
    border: '1px solid var(--color-gray-100)',
    borderRadius: '10px',
    padding: '24px',
    position: 'relative',
  },
  note: {
    marginTop: '60px',
    padding: '20px',
    background: '#FAFAFA',
    border: '1px solid #EEE',
    borderRadius: '6px',
    fontFamily: 'var(--font-primary)',
    fontSize: '14px',
    lineHeight: 1.6,
    color: 'var(--color-gray-700)',
  },
};

export default function PrototypePage() {
  return (
    <div style={styles.page}>
      <Header />

      <div style={styles.banner}>
        <span style={styles.bannerLeft}>
          PROTOTYPE — Platform Architecture Illustration (section #3 preview)
        </span>
        <a href="/platform" style={styles.bannerLink}>
          ← Back to /platform
        </a>
      </div>

      <main style={styles.main}>
        <span style={styles.eyebrow}>The Architecture</span>
        <h1 style={styles.title}>
          Three layers. One connected product.
        </h1>
        <p style={styles.body}>
          SPREAD sits on top of your fragmented source systems, builds a
          living knowledge graph of your product, and exposes that graph to
          the apps and agents your teams use every day. Below is what that
          actually looks like.
        </p>

        <div style={styles.illustrationWrap}>
          <PlatformArchitecture />
        </div>

        <div style={styles.note}>
          <strong>What to review:</strong>
          <ul style={{ margin: '8px 0 0 20px', padding: 0 }}>
            <li>Is the 3-layer isometric structure readable at a glance?</li>
            <li>Does the knowledge graph in the middle layer feel legible with the labeled nodes + relationship pills?</li>
            <li>Does the animation sequence (bottom → middle → top) work, or is it too slow / too fast?</li>
            <li>Any labels, sources, or app names you want changed before we finalize?</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
