import React, { useEffect, useRef, useState } from 'react';
import Button from '../partials/Button.jsx';
import IntelligenceGraph from '../partials/IntelligenceGraph.jsx';
import './CTA.css';

export default function CTA() {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    /* Match the hero reveal — but only once the section scrolls into view
       so the animation plays when the user actually looks at it, not
       silently below the fold on page load. */
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="cta"
      className={`cta${inView ? ' cta--in-view' : ''}`}
      aria-labelledby="cta-headline"
    >
      <div className="container cta__container">
        <div className="cta__content">
          <span className="eyebrow cta__eyebrow">Get started</span>
          <h2 id="cta-headline" className="cta__headline">
            <span className="cta__headline-line">Built for the future.</span>
            <span className="cta__headline-line">Available today.</span>
          </h2>
          <p className="cta__subline">
            20-minute walkthrough. No slides, just your systems live.
          </p>
        </div>
      </div>

      {/* Closing visual — tilted-hemisphere "intelligence graph"
          with the CTA button anchored at the apex. The button
          literally replaces the hub node of the graph, so every
          connection arc terminates AT it — reading as "everything
          in the graph converges on this action". The graph lives
          OUTSIDE the section's inner container so it can take a
          wider max-width than the text column above. */}
      <div className="cta__visual">
        <IntelligenceGraph />
        {/* Apex CTA — positioned absolutely on top of the graph's
            pole point by CTA.css (left 50%, top matches the APEX
            Y ratio inside the SVG viewBox). */}
        <div className="cta__visual-cta">
          <Button href="#" variant="primary">
            Book a Demo
          </Button>
        </div>
      </div>
    </section>
  );
}

export const meta = { label: 'CTA' };
export const fields = null;
