import React from 'react';
import Button from '../partials/Button.jsx';
import heroProduct from '../../images/hero-product.png';
import './CTA.css';

export default function CTA() {
  return (
    <section className="cta" aria-labelledby="cta-headline">
      <div className="cta__bg" aria-hidden="true">
        <img
          src={heroProduct}
          alt=""
          className="cta__bg-image"
          width={1440}
          height={900}
        />
      </div>
      <div className="cta__wash" aria-hidden="true" />
      <div className="container cta__container">
        <div className="cta__content">
          <span className="eyebrow cta__eyebrow">Get started</span>
          <h2 id="cta-headline" className="cta__headline">
            {`Built for the future.\nAvailable today.`}
          </h2>
          <p className="cta__subline">
            20-minute walkthrough. No slides, just your systems live.
          </p>
          <div className="cta__actions">
            <Button href="#" variant="primary">
              Book a Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export const meta = { label: 'CTA' };
export const fields = null;
