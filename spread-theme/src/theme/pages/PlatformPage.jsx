import React from 'react';

import Header from '../components/partials/Header.jsx';
import Footer from '../components/partials/Footer.jsx';
import PageHero from '../components/modules/PageHero.jsx';
import PlatformDiagram from '../components/modules/PlatformDiagram.jsx';
import PlatformArchitectureBento from '../components/modules/PlatformArchitectureBento.jsx';
import ImpactMetrics from '../components/modules/ImpactMetrics.jsx';
import CTA from '../components/modules/CTA.jsx';

/* --------------------------------------------------------------------------
 * PlatformPage — the "Our Platform" entry page.
 *
 * Uses the new PageHero module (not the homepage Hero) so inner pages feel
 * distinct from the marketing landing page: visual on top, editorial 2-col
 * text block below, tech labels for a spec-sheet vibe.
 *
 * PageHero is designed to be reused for every Product / Solutions / Customers
 * page — only the props change. Only "Knowledge Hub" pages will get their
 * own hero variant later.
 *
 * Content is kept in a local PLATFORM_HERO constant so it mirrors the shape
 * a HubSpot module's field values will have; when we port to HubSpot these
 * map directly to fields.json defaults.
 * ------------------------------------------------------------------------ */

const PLATFORM_HERO = {
  eyebrow: 'The Platform',
  headline: 'One platform for every engineering decision.',
  body:
    'SPREAD unifies fragmented product data from PLM, ALM, CAD and ERP into ' +
    'a living Product Twin — then runs AI apps and agents on top, so your ' +
    'teams can decide, build and service complex products with confidence.',
  primaryCta: { label: 'Book a Demo', href: '#cta' },
  secondaryCta: { label: 'See how it works', href: '#how-it-works' },
  techLabels: {
    topLeft: 'FIG.01 — PLATFORM',
    topRight: 'STATUS: LIVE',
    bottomLeft: 'v. 2026.1',
    bottomRight: 'SPREAD / SCHEMATIC',
  },
};

/* Platform-level stats — deliberately capability-oriented rather than
   customer-specific, so they read as properties of the platform itself. */
const PLATFORM_METRICS = {
  eyebrow: 'Proof in numbers',
  headline: 'Built for the scale of complex engineering.',
  metrics: [
    { value: '7+', label: 'Source systems unified into one Product Twin' },
    { value: '10x', label: 'Faster impact analysis across the toolchain' },
    { value: '<2 wk', label: 'From connection to first AI-assisted insight' },
  ],
  cta: { label: 'Read customer stories', href: '#' },
};

export default function PlatformPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero {...PLATFORM_HERO} visual={<PlatformDiagram />} />
        <PlatformArchitectureBento />
        <ImpactMetrics {...PLATFORM_METRICS} variant="dark" />
        {/* Upcoming sections (placeholders for the next phases):
            - Apps & Agents (reuse Solutions, card-style)
            - FAQ
         */}
        <CTA />
      </main>
      <Footer />
    </>
  );
}
