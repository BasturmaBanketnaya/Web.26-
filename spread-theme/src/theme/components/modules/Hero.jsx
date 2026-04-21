import React from 'react';
import heroProduct from '../../images/hero-product.png';
import './Hero.css';

const HEADLINE_LINES = ['Ship Faster.', 'Break Nothing.', 'Know Exactly Why.'];

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__inner">
        <div className="hero__layout">
          <div className="hero__content">
            <h1 className="hero__headline">
              {HEADLINE_LINES.map((line, i) => (
                <span key={line} className="hero__headline-clip">
                  <span
                    className="hero__headline-line"
                    style={{ animationDelay: `${i * 250}ms` }}
                  >
                    {line}
                  </span>
                </span>
              ))}
            </h1>
            <div className="hero__subline-clip">
              <p className="hero__subline">
                SPREAD connects your PLM, CAD, ERP, and ALM into a single
                intelligent layer. Find hidden dependencies in seconds, not sprint
                cycles.
              </p>
            </div>
            <div className="hero__ctas">
              <a href="#" className="hero__btn hero__btn--primary">Request a Demo</a>
              <a href="#" className="hero__btn hero__btn--secondary">Talk to an expert</a>
            </div>
          </div>
          <div className="hero__visual">
            <div className="hero__image-wrap">
              <img
                className="hero__image"
                src={heroProduct}
                alt="SPREAD product interface with a 3D vehicle model"
              />
              <div className="hero__image-fade" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export const meta = { label: 'Hero' };
export const fields = null;
