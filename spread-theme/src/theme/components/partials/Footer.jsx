import React, { useEffect, useRef, useState } from 'react';
import PixelCarRunner from './PixelCarRunner.jsx';
import './Footer.css';

const COLUMNS = [
  {
    title: 'Product',
    links: [
      { label: 'Platform', href: '#' },
      { label: 'Requirements Manager', href: '#' },
      { label: 'Product Explorer', href: '#' },
      { label: 'Error Inspector', href: '#' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'Automotive', href: '#' },
      { label: 'Defence', href: '#' },
      { label: 'Aerospace', href: '#' },
      { label: 'Industrial Machines', href: '#' },
    ],
  },
  {
    title: 'Knowledge Hub',
    links: [
      { label: 'Documentation', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Events', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Contact Us', href: '#' },
    ],
  },
];

/* --- Small inline icons for the social CTAs --------------------------- */
function LinkedInIcon() {
  return (
    <svg
      className="site-footer__cta-icon"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg
      className="site-footer__cta-icon"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M23.498 6.186a3.017 3.017 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.017 3.017 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.017 3.017 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      className="site-footer__cta-arrow"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4 9h10" />
      <path d="m9 4 5 5-5 5" />
    </svg>
  );
}

/* --- Trust statements ------------------------------------------------
   Short credibility signals typically seen near the close of a site.
   Each has a tiny mono tag (reads like a CAD attribute) + a one-line
   statement. Kept as data so HubSpot can edit each independently. */
const TRUST = [
  {
    tag: 'GDPR · EU HOSTED',
    text: 'GDPR-compliant. Hosted in Europe.',
  },
  {
    tag: 'ORIGIN',
    text: 'Made in Germany. Based in Berlin.',
  },
  {
    tag: 'SECURITY',
    text: 'Enterprise-grade security — ISO 27001, SOC 2 & TISAX.',
  },
];

const LEGAL = [
  { label: 'Privacy', href: '#' },
  { label: 'Terms', href: '#' },
  { label: 'Imprint', href: '#' },
];

export const meta = { label: 'Footer' };

export default function Footer() {
  /* Scroll-triggered reveal — same blur + rise + fade timing as the
     homepage hero headline. Plays once when the footer enters view, so
     visitors who scroll to the bottom get a "breath in" moment on the
     closing text. No-op for `prefers-reduced-motion`; see Footer.css. */
  const footerRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = footerRef.current;
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
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className={`site-footer${inView ? ' site-footer--in-view' : ''}`}
      role="contentinfo"
    >
      {/* Inner uses the same horizontal padding as the site header
          (5.5vw, no container max-width), so the footer stretches to the
          same edges as the sticky nav. Header + footer bracket the
          narrower 1200px body content, which frames the whole site. */}
      <div className="site-footer__inner">
        {/* Wrap hosts the bento grid + corner tech labels + the pixel
            runner as siblings, so the labels straddle the grid's outer
            border without being clipped by the rounded-corner mask. */}
        <div className="site-footer__wrap">
          <span className="site-footer__tech site-footer__tech--tl">FIG.99 — SITEMAP</span>
          <span className="site-footer__tech site-footer__tech--tr">STATUS: CONNECTED</span>
          <span className="site-footer__tech site-footer__tech--bl">SPREAD / FOOTER</span>
          <span className="site-footer__tech site-footer__tech--br">v. 2026.1</span>

          <div className="site-footer__grid">
            {/* Brand cell — spans 2 cols. The header owns the SPREAD logo
                mark (small, top); the footer owns the brand voice (big
                manifesto, bottom). No logo duplication. */}
            <div className="site-footer__cell site-footer__cell--brand">
              {/* Manifesto is rendered as two explicit line spans so the
                  reveal can cascade line-by-line (same choreography as
                  the homepage hero headline). The inline `--line-i`
                  index drives the stagger in Footer.css. */}
              <h2 className="site-footer__manifesto">
                <span
                  className="site-footer__manifesto-line"
                  style={{ '--line-i': 0 }}
                >
                  Engineering
                </span>
                <span
                  className="site-footer__manifesto-line"
                  style={{ '--line-i': 1 }}
                >
                  Intelligence.
                </span>
              </h2>
              <p className="site-footer__tagline">
                For complex, software-defined products.
              </p>
            </div>

            {/* Four nav columns — Product / Solutions / Knowledge Hub / Company.
                `--reveal-i` drives the stagger delay in the scroll-in
                animation (see Footer.css `footerReveal`). */}
            <nav className="site-footer__nav" aria-label="Footer navigation">
              {COLUMNS.map((col, i) => (
                <div
                  key={col.title}
                  className="site-footer__cell site-footer__cell--nav"
                  style={{ '--reveal-i': i }}
                >
                  <h2 className="site-footer__col-title">{col.title}</h2>
                  {/* Each <li> is its own reveal target. `--link-i`
                      drives the within-column stagger (links inside a
                      single column cascade top-to-bottom), `--reveal-i`
                      on the cell drives the across-column stagger
                      (columns cascade left-to-right). Together they
                      feel like reading rather than a bulk appear. */}
                  <ul className="site-footer__col-list">
                    {col.links.map((link, k) => (
                      <li key={link.label} style={{ '--link-i': k }}>
                        <a href={link.href}>{link.label}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>

            {/* CTA row — Subscribe (primary, dark-filled, spans 4 cols) +
                YouTube + LinkedIn (outlined, 1 col each). Each cell IS
                the link, so the whole tile is clickable. Hairline
                dividers between them come "for free" from the grid gap.
                `--reveal-i` drives the scroll-in reveal stagger. */}
            <a
              className="site-footer__cell site-footer__cell--cta site-footer__cell--cta-primary"
              href="#subscribe"
              style={{ '--reveal-i': 0 }}
            >
              <span className="site-footer__cta-label">Subscribe to updates</span>
              <ArrowIcon />
            </a>
            <a
              className="site-footer__cell site-footer__cell--cta site-footer__cell--cta-secondary"
              href="https://www.youtube.com/@spread-gmbh"
              target="_blank"
              rel="noopener noreferrer"
              style={{ '--reveal-i': 1 }}
            >
              <YouTubeIcon />
              <span className="site-footer__cta-label">YouTube</span>
            </a>
            <a
              className="site-footer__cell site-footer__cell--cta site-footer__cell--cta-secondary"
              href="https://www.linkedin.com/company/spread-gmbh/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ '--reveal-i': 2 }}
            >
              <LinkedInIcon />
              <span className="site-footer__cta-label">LinkedIn</span>
            </a>

            {/* Trust row — three credibility statements, each in its own
                cell (spans 2 cols). Tiny mono tag on top reads like a
                CAD attribute; statement below in DIN Pro reads as body.
                `--reveal-i` drives the stagger in the scroll-in reveal. */}
            {TRUST.map((item, i) => (
              <div
                key={item.tag}
                className="site-footer__cell site-footer__cell--trust"
                style={{ '--reveal-i': i }}
              >
                <span className="site-footer__trust-tag">{item.tag}</span>
                <p className="site-footer__trust-text">{item.text}</p>
              </div>
            ))}

            {/* Meta cell — full-width bottom row with copyright + legal.
                (Social links moved up into the CTA row to avoid
                duplicating LinkedIn.) */}
            <div className="site-footer__cell site-footer__cell--meta">
              <p className="site-footer__copyright">
                © 2026 SPREAD GmbH. All rights reserved.
              </p>
              <div className="site-footer__legal">
                {LEGAL.map((item) => (
                  <a key={item.label} href={item.href} className="site-footer__legal-link">
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Pixel "sign-off" scene — the engineer runs in from the left,
              boards a pixel jet parked near the right, and the jet flies
              off the frame. Same character as the homepage Hero, but
              scripted as a one-way send-off instead of a bounce. Lives
              only in the footer; Hero + FAQ keep their original
              bouncing runner / pixel game untouched. */}
          <div className="site-footer__runner-track">
            <PixelCarRunner />
          </div>
        </div>
      </div>
    </footer>
  );
}
