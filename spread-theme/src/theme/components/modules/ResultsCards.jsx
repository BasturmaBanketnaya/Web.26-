import React from 'react';
import './ResultsCards.css';

/* =====================================================================
   Newsroom — 2×2 bento, HowItWorks grammar.

   Typography, card surfaces, CTA pill styles all borrowed directly
   from `HowItWorks.css` so this section reads as a sibling of
   "How SPREAD works" rather than a detached card strip:

     - Eyebrow: mono 10 px orange (.hiw__eyebrow voice).
     - Headline: DIN Pro 500, clamp(32–44 px), tight tracking.
     - Section CTA: dark mono pill (.hiw__intro-cta voice).
     - Each card: soft gray surface, no border, headline + body + mono
       pill CTA on the left, small schematic illustration on the right.

   Layout is fully static — only colour crossfades on hover — so the
   section is flicker-proof by construction.
   ===================================================================== */

/* -----------------------------------------------------------------------
   Bespoke card illustrations, same visual language as the HowItWorks
   step illustrations (1.2px strokes, orange on the active node).
   --------------------------------------------------------------------- */
function IllusDefense() {
  return (
    <svg viewBox="0 0 140 140" className="nr-illus" aria-hidden="true">
      <g stroke="var(--color-gray-300, #c7c7c7)" strokeWidth="1.2" fill="none">
        <path d="M12 32 L60 68" />
        <path d="M12 70 L60 70" />
        <path d="M12 108 L60 72" />
      </g>
      <g stroke="var(--color-orange)" strokeWidth="1.4" fill="none">
        <path d="M60 70 L128 70" />
        <path d="M118 62 L128 70 L118 78" />
      </g>
      <circle cx="60" cy="70" r="4.5" fill="var(--color-orange)" />
    </svg>
  );
}

function IllusSummit() {
  return (
    <svg viewBox="0 0 140 140" className="nr-illus" aria-hidden="true">
      <g stroke="var(--color-gray-300, #c7c7c7)" strokeWidth="1.2" fill="none">
        <circle cx="70" cy="70" r="34" />
        <path d="M70 70 L24 24" />
        <path d="M70 70 L116 24" />
        <path d="M70 70 L24 116" />
        <path d="M70 70 L116 116" />
      </g>
      <g fill="var(--color-gray-500, #8b8b8b)">
        <circle cx="24" cy="24" r="3.5" />
        <circle cx="116" cy="24" r="3.5" />
        <circle cx="24" cy="116" r="3.5" />
        <circle cx="116" cy="116" r="3.5" />
      </g>
      <circle cx="70" cy="70" r="5.5" fill="var(--color-orange)" />
    </svg>
  );
}

function IllusConference() {
  return (
    <svg viewBox="0 0 140 140" className="nr-illus" aria-hidden="true">
      <g stroke="var(--color-gray-300, #c7c7c7)" strokeWidth="1.2" fill="none">
        <rect x="28" y="34" width="84" height="32" />
        <line x1="22" y1="86" x2="118" y2="86" />
        <line x1="14" y1="102" x2="126" y2="102" />
        <line x1="6" y1="118" x2="134" y2="118" />
      </g>
      <circle cx="70" cy="50" r="4.5" fill="var(--color-orange)" />
    </svg>
  );
}

function IllusIntelligence() {
  return (
    <svg viewBox="0 0 140 140" className="nr-illus" aria-hidden="true">
      <g stroke="var(--color-gray-300, #c7c7c7)" strokeWidth="1.2" fill="none">
        <circle cx="70" cy="70" r="50" />
        <circle cx="70" cy="70" r="32" />
        <circle cx="70" cy="70" r="16" />
      </g>
      <circle cx="70" cy="70" r="4.5" fill="var(--color-orange)" />
    </svg>
  );
}

const ILLUS = {
  defense: IllusDefense,
  summit: IllusSummit,
  conference: IllusConference,
  intelligence: IllusIntelligence,
};

const NEWS = [
  {
    category: 'Event',
    date: '22 Nov 2025',
    author: 'Alexander Matthey',
    headline: "Why speed will define Europe's defense advantage",
    excerpt:
      'Political leaders, industrial executives and technology builders gathered in Berlin for the Summit on European Digital Sovereignty — Chancellor Merz and President Macron led the conversation.',
    link: '#',
    illus: 'defense',
  },
  {
    category: 'Event',
    date: '12 Nov 2025',
    author: 'Alexander Matthey',
    headline:
      "Inside the Industrial AI Summit 2025: what Europe's leaders agreed must happen next",
    excerpt:
      'More than 60 senior executives, policymakers and AI researchers gathered at Schloss Donaueschingen for the Industrial AI Summit, co-hosted by SPREAD, Pelico and Ethon.ai.',
    link: '#',
    illus: 'summit',
  },
  {
    category: 'Event',
    date: '08 Nov 2025',
    author: 'Robert Göbel',
    headline: "CUBE 2025: engineering's next era begins with AI-ready teams",
    excerpt:
      'CUBE 2025 gathered leaders from across automotive, defense, aerospace and industrial machinery to answer one defining question: how do we make engineering AI-ready?',
    link: '#',
    illus: 'conference',
  },
  {
    category: 'Blog',
    date: '14 Mar 2026',
    author: 'SPREAD Team',
    headline: 'What is Engineering Intelligence?',
    excerpt:
      'Engineering is changing fast. Products like cars, airplanes, drones, trains and industrial machines are now software-defined systems — complex networks of mechanical, electronic and software components.',
    link: '#',
    illus: 'intelligence',
  },
];

export default function ResultsCards() {
  return (
    <section className="newsroom">
      <div className="container">
        {/* Intro block — adopts the exact typographic voice of the
            HowItWorks intro: mono orange eyebrow, big DIN Pro
            headline, short subline, dark mono pill CTA on the right.
            Keeps the two sections reading as one family. */}
        <div className="newsroom__top">
          <div className="newsroom__intro">
            <span className="newsroom__eyebrow">Newsroom</span>
            <h2 className="newsroom__headline">Latest from SPREAD.</h2>
            <p className="newsroom__subline">
              Fresh signals from the field — events, press and engineering
              notes from the team building SPREAD.
            </p>
          </div>
          <a href="#" className="newsroom__top-cta">
            Explore our blog
          </a>
        </div>

        {/* 2 × 2 bento — cards share a soft gray surface, no borders,
            bigger illustration column on the right. */}
        <div className="newsroom__grid">
          {NEWS.map((item, i) => {
            const Illus = ILLUS[item.illus] || IllusIntelligence;
            return (
              <a
                key={i}
                href={item.link}
                className="newsroom__card"
                aria-label={`${item.category}, ${item.date}: ${item.headline}`}
              >
                <div className="newsroom__card-body">
                  <span className="newsroom__card-eyebrow">
                    <span className="newsroom__card-cat">{item.category}</span>
                    <span className="newsroom__card-sep" aria-hidden="true">
                      &middot;
                    </span>
                    <span className="newsroom__card-date">{item.date}</span>
                  </span>
                  <h3 className="newsroom__card-title">{item.headline}</h3>
                  <p className="newsroom__card-excerpt">{item.excerpt}</p>
                  <div className="newsroom__card-foot">
                    <span className="newsroom__card-cta">
                      Learn more
                      <svg
                        viewBox="0 0 16 8"
                        aria-hidden="true"
                        className="newsroom__card-cta-arrow"
                      >
                        <path
                          d="M0.5 4H15m0 0l-4-3.5M15 4l-4 3.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1"
                          strokeLinecap="square"
                        />
                      </svg>
                    </span>
                    <span className="newsroom__card-byline">
                      by {item.author}
                    </span>
                  </div>
                </div>

                <div className="newsroom__card-illus" aria-hidden="true">
                  <Illus />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export const meta = { label: 'Newsroom' };
export const fields = null;
