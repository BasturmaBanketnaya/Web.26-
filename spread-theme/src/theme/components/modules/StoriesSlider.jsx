import React, { useRef, useState, useEffect, useCallback } from 'react';
import arrowIcon from '../../images/Arrow.svg';
import avatarValerij from '../../images/avatar-valerij.png';
import './StoriesSlider.css';

const slides = [
  {
    type: 'case-study',
    headline: 'Accelerating time-to-market by 20% at Defense OEM',
    company: 'European Defense System OEM',
    stats: [
      { value: '20%', label: 'Faster Development' },
      { value: '+5%', label: 'Revenue Growth' },
      { value: '60%', label: 'Faster Troubleshooting' },
    ],
    link: '#',
  },
  {
    type: 'testimonial',
    quote:
      '\u201CTogether with our employees, SPREAD quickly develops exciting AI concepts to solve engineering problems and brings them live as practical applications, e.g. AI-based quality assurance in all our plants.\u201D',
    author: 'Valerij Asmus',
    role: 'Head of AI Research, Mercedes-Benz',
    avatar: avatarValerij,
  },
  {
    type: 'case-study',
    headline: 'Cutting review cycles by 40% in automotive engineering',
    company: 'Global Automotive Tier-1 Supplier',
    stats: [
      { value: '40%', label: 'Shorter Reviews' },
      { value: '3x', label: 'Faster Impact Analysis' },
      { value: '90%', label: 'Data Coverage' },
    ],
    link: '#',
  },
  {
    type: 'testimonial',
    quote:
      '\u201CSPREAD gave us visibility we never had before. For the first time, our teams can trace a requirement all the way to production without switching between five different tools.\u201D',
    author: 'Dr. Stefan Weber',
    role: 'VP Engineering, Bosch',
    avatar: null,
  },
  {
    type: 'testimonial',
    quote:
      '\u201CThe dependency mapping alone saved us weeks of manual analysis. We found issues in the first hour that would have taken a full sprint to uncover.\u201D',
    author: 'Katrin Müller',
    role: 'Program Director, Rheinmetall',
    avatar: null,
  },
  {
    type: 'testimonial',
    quote:
      "\u201CWe went from fragmented data silos to a single source of truth in under two weeks. SPREAD\u2019s onboarding was the smoothest enterprise rollout I\u2019ve experienced.\u201D",
    author: 'Thomas Richter',
    role: 'CTO, Stadler Rail',
    avatar: null,
  },
];

export default function StoriesSlider() {
  const trackRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const checkScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll]);

  const scroll = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const cardWidth = el.querySelector('.ss__card')?.offsetWidth || 500;
    el.scrollBy({ left: dir * (cardWidth + 20), behavior: 'smooth' });
  };

  return (
    <section className="ss">
      <div className="container">
        <header className="ss__header">
          <div className="ss__header-copy">
            <span className="ss__eyebrow">Customers</span>
            <h2 className="ss__headline">Results speak louder.</h2>
            <p className="ss__subline">
              See how engineering teams reduced review cycles, eliminated data
              silos, and shipped faster.
            </p>
          </div>
          <a href="#" className="ss__header-link">
            Explore Case Studies
            <img src={arrowIcon} alt="" />
          </a>
        </header>
      </div>

      <div className="ss__slider-area">
        <div className="container ss__track-wrap">
        <div className="ss__track" ref={trackRef}>
          {slides.map((slide, i) =>
            slide.type === 'case-study' ? (
              <article key={i} className="ss__card ss__card--case">
                <div className="ss__case-bg" />
                <div className="ss__case-content">
                  <div className="ss__case-top">
                    <span className="ss__case-badge">Case Study</span>
                    <a href={slide.link} className="ss__case-arrow" aria-label="Open case study">↗</a>
                  </div>
                  <h3 className="ss__case-headline">{slide.headline}</h3>
                  <div className="ss__case-divider" />
                  <div className="ss__case-stats">
                    {slide.stats.map((s, j) => (
                      <div key={j} className="ss__case-stat">
                        <span className="ss__case-stat-value">{s.value}</span>
                        <span className="ss__case-stat-label">{s.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="ss__case-divider" />
                  <span className="ss__case-company">{slide.company}</span>
                </div>
              </article>
            ) : (
              <article key={i} className="ss__card ss__card--testimonial">
                <span className="ss__test-badge">Testimonial</span>
                <p className="ss__test-quote">{slide.quote}</p>
                <div className="ss__test-author">
                  <div className="ss__test-author-info">
                    <span className="ss__test-author-name">{slide.author}</span>
                    <span className="ss__test-author-role">{slide.role}</span>
                  </div>
                  {slide.avatar && (
                    <img className="ss__test-avatar" src={slide.avatar} alt={slide.author} />
                  )}
                </div>
              </article>
            )
          )}
        </div>
        </div>

        <div className="container ss__nav">
          <button
            className={`ss__nav-btn${!canPrev ? ' ss__nav-btn--disabled' : ''}`}
            onClick={() => scroll(-1)}
            aria-label="Previous slide"
            disabled={!canPrev}
          >
            ←
          </button>
          <button
            className={`ss__nav-btn${!canNext ? ' ss__nav-btn--disabled' : ''}`}
            onClick={() => scroll(1)}
            aria-label="Next slide"
            disabled={!canNext}
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}

export const meta = { label: 'Stories Slider' };
export const fields = null;
