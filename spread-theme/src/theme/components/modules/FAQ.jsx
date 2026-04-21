import React, { useEffect, useRef, useState } from 'react';
import './FAQ.css';
import AccordionItem from '../islands/AccordionItem.jsx';

/* --------------------------------------------------------------------------
 * FAQ
 *
 * Props-driven FAQ module rendered as a bento — intro cell on the left
 * spans the full height, each Q&A is its own row-cell on the right,
 * all wrapped in a single rounded container with hairline dividers.
 * Same visual grammar as PlatformArchitectureBento and the bento
 * ImpactMetrics variant, so pages using all three read as one system.
 *
 * The entire surface is data-driven — when we port to HubSpot this maps
 * directly to a repeater field for `items` and text fields for the rest.
 *
 * Props:
 *   eyebrow, headline, intro   — left cell copy
 *   cta: { prompt, label, href }
 *   items: [{ question, answer }]
 *   techLabels: { topLeft, topRight, bottomLeft, bottomRight }
 *   firstOpen (bool) — whether the first accordion item is open on load
 * ------------------------------------------------------------------------ */

const DEFAULT_ITEMS = [
  {
    question: 'What systems does SPREAD integrate with?',
    answer:
      'SPREAD connects to PLM, CAD, ERP, simulation, and test management systems out of the box — including Teamcenter, Windchill, 3DEXPERIENCE, SAP, and more. Our integration layer maps your data in place without migration, so your teams keep working in the tools they already use.',
  },
  {
    question: 'How long does setup take?',
    answer:
      'Most teams are up and running within one to two weeks. Our onboarding team handles connector setup, data ingestion, and initial configuration so your teams can focus on results.',
  },
  {
    question: 'Does SPREAD replace our existing tools?',
    answer:
      'No. SPREAD sits on top of your existing toolchain and connects them. Your teams keep using the tools they know — SPREAD adds the intelligence layer across all of them.',
  },
  {
    question: 'How is SPREAD priced?',
    answer:
      "Pricing is based on the number of connected systems and users. Contact us for a custom quote tailored to your organization's needs.",
  },
  {
    question: 'Is my data secure?',
    answer:
      'Absolutely. SPREAD is SOC 2 Type II certified, ISO 27001 compliant, GDPR compliant, and TISAX certified. Your data is encrypted at rest and in transit, with full audit logging.',
  },
];

export default function FAQ({
  eyebrow = 'FAQ',
  headline = 'Common questions,\nstraight answers.',
  intro = 'From fragmented toolchains to a single source of engineering truth — in four steps.',
  cta = {
    prompt: 'Still have questions?',
    label: 'Talk to an Engineer',
    href: '#contact',
  },
  items = DEFAULT_ITEMS,
  techLabels = {
    topLeft: 'FIG.04 — FAQ',
    topRight: 'STATUS: OPEN',
    bottomLeft: 'SPREAD / SUPPORT',
    bottomRight: 'v. 2026.1',
  },
  firstOpen = true,
}) {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -80px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`faq${inView ? ' faq--in-view' : ''}`}
      aria-labelledby="faq-headline"
    >
      <div className="container">
        <div className="faq__bento">
          {techLabels?.topLeft && (
            <span className="faq__tech faq__tech--tl">{techLabels.topLeft}</span>
          )}
          {techLabels?.topRight && (
            <span className="faq__tech faq__tech--tr">{techLabels.topRight}</span>
          )}
          {techLabels?.bottomLeft && (
            <span className="faq__tech faq__tech--bl">{techLabels.bottomLeft}</span>
          )}
          {techLabels?.bottomRight && (
            <span className="faq__tech faq__tech--br">{techLabels.bottomRight}</span>
          )}

          <div className="faq__grid">
            {/* --- Intro cell: left column, spans all rows ------------------ */}
            <div className="faq__cell faq__cell--intro">
              {eyebrow && <span className="faq__eyebrow">{eyebrow}</span>}
              {headline && (
                <h2 id="faq-headline" className="faq__headline">
                  {headline}
                </h2>
              )}
              {intro && <p className="faq__intro">{intro}</p>}

              {cta?.label && (
                <div className="faq__cta">
                  {cta.prompt && <p className="faq__cta-prompt">{cta.prompt}</p>}
                  <a href={cta.href} className="faq__cta-link">
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
                </div>
              )}
            </div>

            {/* --- One cell per Q&A ---------------------------------------- */}
            {items.map((item, i) => (
              <div
                key={item.question}
                className="faq__cell faq__cell--item"
                style={{ '--faq-item-index': i }}
              >
                <AccordionItem
                  question={item.question}
                  answer={item.answer}
                  defaultOpen={firstOpen && i === 0}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export const meta = { label: 'FAQ' };
export const fields = null;
