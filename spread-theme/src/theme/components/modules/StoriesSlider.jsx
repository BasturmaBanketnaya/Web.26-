import React, { useEffect, useRef, useState, useCallback } from 'react';
import arrowIcon from '../../images/Arrow.svg';
import logoMBDA from '../../images/Testimonials logos/MBDA_logo.svg';
import logoKUKA from '../../images/Testimonials logos/KUKA_Logo.svg';
import logoAccenture from '../../images/Testimonials logos/Accenture logo.svg';
import logoRheinmetall from '../../images/Testimonials logos/Rheinmetall_logo.svg';
import logoSpread from '../../images/Testimonials logos/Spread logo.svg';
import logoMercedes from '../../images/Testimonials logos/Mercedes-Benz_logo.svg';
import './StoriesSlider.css';

/* All six testimonial logos are force-tinted black in CSS
   (filter: brightness(0)) so the mixed source colours (orange SPREAD,
   black Mercedes/Rheinmetall, etc.) all read as a single consistent
   set alongside the quote typography. */

/* --------------------------------------------------------------------------
 * Customers section (file still named StoriesSlider.*)
 *
 * Two rows inside one section:
 *   Row 1 — Case Studies  : three stacked WIDE bento cards (same grammar
 *                           as the Platform page ImpactMetrics bento —
 *                           1.5fr intro + 3 stat columns, hairline
 *                           dividers, rounded container). Each intro
 *                           cell carries a small thematic SVG illustration.
 *   Row 2 — Testimonials  : "invisible" auto-rotating pair slider. Quotes
 *                           appear in pairs on the gray section background,
 *                           fade out together, next pair fades in. No
 *                           visible chrome (no arrows, no dots) — just
 *                           typography cycling on its own.
 *
 * Shared bento grammar with HowItWorks / FAQ / Footer: flat surfaces,
 * hairline borders, monospace uppercase chrome labels, orange reserved
 * for accents. The section sits on a light-gray band (#F5F5F5).
 * ------------------------------------------------------------------------ */

/* ── Thematic SVG illustrations for the case-study intro cells ────────
   All authored on a 160×100 viewBox, hairline stroke at 1.25px so they
   share vocabulary with the HowItWorks schematics without dominating the
   card. Each picks a metaphor tied to the case's topic. */

/* Risk-mitigation / SOP: a horizontal timeline running into a target
   ring, with an "early-warning" marker to the left of the SOP bullseye. */
function IllusRisk() {
  return (
    <svg
      className="ss__case-illus"
      viewBox="0 0 160 100"
      fill="none"
      aria-hidden="true"
    >
      {/* timeline axis */}
      <line
        x1="6"
        y1="50"
        x2="118"
        y2="50"
        className="ss__case-illus-line"
      />
      {/* tick marks */}
      {[18, 34, 50, 66, 82, 98].map((x, i) => (
        <line
          key={i}
          x1={x}
          y1="44"
          x2={x}
          y2="56"
          className="ss__case-illus-tick"
        />
      ))}
      {/* early-warning marker */}
      <circle
        cx="34"
        cy="50"
        r="3"
        className="ss__case-illus-node"
      />
      {/* SOP target — bullseye rings */}
      <circle cx="132" cy="50" r="18" className="ss__case-illus-ring" />
      <circle cx="132" cy="50" r="11" className="ss__case-illus-ring" />
      <circle
        cx="132"
        cy="50"
        r="4"
        className="ss__case-illus-node ss__case-illus-node--accent"
      />
      {/* crosshair marks on target */}
      <line
        x1="132"
        y1="26"
        x2="132"
        y2="36"
        className="ss__case-illus-line"
      />
      <line
        x1="132"
        y1="64"
        x2="132"
        y2="74"
        className="ss__case-illus-line"
      />
    </svg>
  );
}

/* MBSE connected data layer: three parallel horizontal planes linked by
   vertical hairlines through shared nodes — the "one layer" metaphor. */
function IllusLayers() {
  const Y = [22, 50, 78];
  const X = [28, 60, 92, 124];
  return (
    <svg
      className="ss__case-illus"
      viewBox="0 0 160 100"
      fill="none"
      aria-hidden="true"
    >
      {Y.map((y) => (
        <line
          key={`l-${y}`}
          x1="14"
          y1={y}
          x2="146"
          y2={y}
          className="ss__case-illus-line"
        />
      ))}
      {/* Vertical connectors through the middle two columns. */}
      {[X[1], X[2]].map((x) => (
        <line
          key={`v-${x}`}
          x1={x}
          y1={Y[0]}
          x2={x}
          y2={Y[2]}
          className="ss__case-illus-line ss__case-illus-line--dashed"
        />
      ))}
      {Y.map((y) =>
        X.map((x) => (
          <circle
            key={`n-${x}-${y}`}
            cx={x}
            cy={y}
            r="2.5"
            className={
              x === X[1] || x === X[2]
                ? 'ss__case-illus-node ss__case-illus-node--accent'
                : 'ss__case-illus-node'
            }
          />
        )),
      )}
    </svg>
  );
}

/* Production rework: a closed flow-cycle through four stages, with one
   gate highlighted orange to denote the "unblocked" bottleneck. */
function IllusFlow() {
  const CX = 80;
  const CY = 50;
  const R = 30;
  const pts = [0, 1, 2, 3].map((i) => {
    const a = (Math.PI / 2) * i - Math.PI / 2;
    return { x: CX + R * Math.cos(a), y: CY + R * Math.sin(a), i };
  });
  return (
    <svg
      className="ss__case-illus"
      viewBox="0 0 160 100"
      fill="none"
      aria-hidden="true"
    >
      {/* cycle ring */}
      <circle
        cx={CX}
        cy={CY}
        r={R}
        className="ss__case-illus-ring"
      />
      {/* arrow arc hint */}
      <path
        d={`M ${CX + R - 6} ${CY - 4} l 6 4 l -6 4`}
        className="ss__case-illus-line"
      />
      {/* stage nodes */}
      {pts.map((p) => (
        <circle
          key={p.i}
          cx={p.x}
          cy={p.y}
          r={p.i === 1 ? '4' : '3'}
          className={
            p.i === 1
              ? 'ss__case-illus-node ss__case-illus-node--accent'
              : 'ss__case-illus-node'
          }
        />
      ))}
      {/* flanking indicator bars — the "no backlogs" read */}
      {[12, 18, 24].map((y) => (
        <line
          key={`b-${y}`}
          x1="128"
          y1={y + 26}
          x2="146"
          y2={y + 26}
          className="ss__case-illus-tick"
        />
      ))}
    </svg>
  );
}

/* Three flagship case studies. Remaining cases live on the dedicated
   Case Studies page (linked from the section header). */
const CASES = [
  {
    id: 'auto-sop',
    code: 'CS.01',
    industry: 'Automotive OEM',
    headline: 'Mitigating \u20AC2B SOP risk at a leading Automotive OEM.',
    Illus: IllusRisk,
    stats: [
      {
        value: '>\u20AC20M+',
        label: 'saved through error reduction and delay avoidance',
      },
      {
        value: '60%',
        label: 'faster troubleshooting via interdependency clarity',
      },
      { value: '\u20AC2B', label: 'risk mitigated through SOP assurance' },
    ],
    link: '#',
  },
  {
    id: 'defense-mbse',
    code: 'CS.02',
    industry: 'Defense OEM',
    headline:
      'Saving >\u20AC600k yearly with one MBSE model at a Defense OEM.',
    Illus: IllusLayers,
    stats: [
      {
        value: '>\u20AC600K',
        label: 'saved annually through less manual modeling effort',
      },
      {
        value: '30%',
        label: 'faster development through model-driven workflows',
      },
      { value: '1 LAYER', label: 'connected data layer as MBSE foundation' },
    ],
    link: '#',
  },
  {
    id: 'auto-rework',
    code: 'CS.03',
    industry: 'Automotive OEM',
    headline:
      'Boosting production rework efficiency at an Automotive OEM.',
    Illus: IllusFlow,
    stats: [
      {
        value: '\u20AC500K',
        label: 'saved per line, per year through faster off-line rework',
      },
      {
        value: '75%',
        label: 'faster troubleshooting via fewer repair steps',
      },
      {
        value: 'NO BACKLOGS',
        label: 'rework teams resolve issues without delay',
      },
    ],
    link: '#',
  },
];

/* Six real testimonials — surfaced one at a time by the slider below.
   `logo` points at the imported SVG when available; when null the slide
   falls back to the `company` string rendered as a clean wordmark. */
const TESTIMONIALS = [
  {
    quote:
      'Even in a fully regulated, on-premise environment, we\u2019ve gained control over complex engineering data, detecting errors earlier and accelerating development with confidence.',
    author: 'Dr. Ulrich Nuding',
    role: 'Engineering Director Germany',
    company: 'MBDA',
    logo: logoMBDA,
    logoScale: 0.78,
  },
  {
    quote:
      'SPREAD pools technical knowledge and makes it accessible to all employees quickly, easily and comprehensibly. This brings powerful AI expertise to manufacturing industries and prepares us for the software-defined age.',
    author: 'Dr. Till Reuter',
    role: 'Former CEO',
    company: 'KUKA',
    logo: logoKUKA,
    logoScale: 0.78,
  },
  {
    quote:
      'SPREAD doesn\u2019t talk about digital transformation. It delivers it by turning complex data into insights engineering teams can actually act on.',
    author: 'Dr. Christof Horn',
    role: 'Automotive Lead Europe',
    company: 'Accenture',
    logo: logoAccenture,
  },
  {
    quote:
      'It\u2019s great you can access lots of engineering knowledge instantly. At Rheinmetall, we will make product knowledge available to everyone when, where and how they need it with a digital product twin. SPREAD\u2019s AI solutions turn siloed data into business value.',
    author: 'Dr. Marc Honikel',
    role: 'Chief Innovation Officer',
    company: 'Rheinmetall Air Defence',
    logo: logoRheinmetall,
  },
  {
    quote:
      'Product twins have the potential to raise the standard of the automotive aftermarket by giving engineers the clarity they need to identify causes, avoid repeat repairs, and keep warranty costs under control.',
    author: 'Stefan Tolle',
    role: 'Executive Advisor',
    company: 'SPREAD',
    logo: logoSpread,
  },
  {
    quote:
      'Together with our employees, SPREAD quickly develops exciting AI concepts to solve engineering problems and brings them live as practical applications, e.g. AI-based quality assurance in all our plants.',
    author: 'Valerij Asmus',
    role: 'Head of Artificial Intelligence Research',
    company: 'Mercedes-Benz',
    logo: logoMercedes,
    logoScale: 1.25,
  },
];

/* Compact case-study card — one of three in a single row. Content is
   intentionally minimal: industry/code badge, short headline,
   thematic illustration, and a large arrow CTA anchoring the card as
   a whole link. No stats — those live on the full case-study page. */
function CaseCard({ data, i }) {
  const Illus = data.Illus;
  return (
    <a
      href={data.link}
      className="ss__case"
      style={{ '--i': i }}
      aria-label={`Open case study: ${data.headline}`}
    >
      <div className="ss__case-top">
        <span className="ss__case-badge">
          {data.industry} / {data.code}
        </span>
        <span className="ss__case-arrow" aria-hidden="true">
          <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M3.5 12.5L12.5 3.5M12.5 3.5H5.5M12.5 3.5V10.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="square"
            />
          </svg>
        </span>
      </div>
      <h3 className="ss__case-headline">{data.headline}</h3>
      <div className="ss__case-illus-wrap" aria-hidden="true">
        <Illus />
      </div>
    </a>
  );
}

/* ── Testimonial slider — one quote at a time, centered ─────────────
   Single-quote slider on a gray container that matches the section
   background (no card, no dividing line above). All slides staged in
   one grid cell; active slide fades in, others fade out, so the
   container height sizes to the tallest quote and never jumps.
   Arrow buttons are round-rectangle with hairline border + dark hover
   (same vocabulary as the rest of the site's nav buttons). */
function TestimonialsSlider() {
  const [i, setI] = useState(0);
  const total = TESTIMONIALS.length;
  const rootRef = useRef(null);

  const go = useCallback(
    (idx) => setI(((idx % total) + total) % total),
    [total],
  );
  const next = useCallback(() => go(i + 1), [go, i]);
  const prev = useCallback(() => go(i - 1), [go, i]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        next();
      }
    };
    el.addEventListener('keydown', onKey);
    return () => el.removeEventListener('keydown', onKey);
  }, [next, prev]);

  return (
    <div
      className="ss__ts"
      ref={rootRef}
      tabIndex={-1}
      aria-roledescription="carousel"
      aria-label="Customer testimonials"
    >
      <span className="ss__ts-label">Testimonials</span>

      <div className="ss__ts-stage">
        {TESTIMONIALS.map((t, idx) => {
          const active = idx === i;
          return (
            <figure
              key={idx}
              className={`ss__ts-slide${active ? ' ss__ts-slide--active' : ''}`}
              aria-hidden={!active}
              aria-roledescription="slide"
              aria-label={`${idx + 1} of ${total}`}
            >
              <div
                className="ss__ts-logo"
                aria-hidden="true"
                style={{ '--logo-scale': t.logoScale || 1 }}
              >
                {t.logo ? (
                  <img src={t.logo} alt="" />
                ) : (
                  <span className="ss__ts-logo-text">{t.company}</span>
                )}
              </div>
              <blockquote className="ss__ts-quote">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="ss__ts-attr">
                <span className="ss__ts-name">{t.author}</span>
                <span className="ss__ts-role">{t.role}</span>
              </figcaption>
            </figure>
          );
        })}
      </div>

      <div className="ss__ts-controls">
        <button
          type="button"
          className="ss__ts-btn"
          onClick={prev}
          aria-label="Previous testimonial"
        >
          <svg viewBox="0 0 16 8" aria-hidden="true">
            <path
              d="M15.5 4H1m0 0l4-3.5M1 4l4 3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="square"
            />
          </svg>
        </button>

        <span className="ss__ts-counter" aria-live="polite">
          <span className="ss__ts-counter-now">
            {String(i + 1).padStart(2, '0')}
          </span>
          <span className="ss__ts-counter-sep">/</span>
          <span className="ss__ts-counter-total">
            {String(total).padStart(2, '0')}
          </span>
        </span>

        <button
          type="button"
          className="ss__ts-btn"
          onClick={next}
          aria-label="Next testimonial"
        >
          <svg viewBox="0 0 16 8" aria-hidden="true">
            <path
              d="M0.5 4H15m0 0l-4-3.5M15 4l-4 3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="square"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function StoriesSlider() {
  const rootRef = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setRevealed(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      className={`ss${revealed ? ' ss--revealed' : ''}`}
      ref={rootRef}
    >
      <div className="container">
        <header className="ss__header">
          <div className="ss__header-copy">
            <span className="ss__eyebrow">Customers</span>
            <h2 className="ss__headline">Results speak louder.</h2>
            <p className="ss__subline">
              See how engineering teams reduced review cycles, eliminated
              data silos, and shipped faster.
            </p>
          </div>
          <a href="#" className="ss__header-link">
            Explore Case Studies
            <img src={arrowIcon} alt="" />
          </a>
        </header>

        {/* ── Row 1 · Case Studies (wide bento cards) ──────────────── */}
        <div className="ss__row">
          <div className="ss__row-head">
            <span className="ss__row-label">Case Studies</span>
          </div>
          <div className="ss__case-stack">
            {CASES.map((c, i) => (
              <CaseCard key={c.id} data={c} i={i} />
            ))}
          </div>
        </div>

        {/* ── Row 2 · Testimonials (single quote slider) ───────────── */}
        <div className="ss__row ss__row--testimonials">
          <TestimonialsSlider />
        </div>
      </div>
    </section>
  );
}

export const meta = { label: 'Customers' };
export const fields = null;
