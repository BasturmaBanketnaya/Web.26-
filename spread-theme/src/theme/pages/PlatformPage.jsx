import React from 'react';

import Header from '../components/partials/Header.jsx';
import Footer from '../components/partials/Footer.jsx';
import PageHero from '../components/modules/PageHero.jsx';
import PlatformDiagram from '../components/modules/PlatformDiagram.jsx';
import PlatformArchitectureBento from '../components/modules/PlatformArchitectureBento.jsx';
import ImpactMetrics from '../components/modules/ImpactMetrics.jsx';
import FAQ from '../components/modules/FAQ.jsx';
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

/* Platform-level stats — capability-oriented rather than customer-specific,
   so they read as properties of the platform itself. Copy kept short so
   each cell reads as a confident single-line statement. */
const PLATFORM_METRICS = {
  eyebrow: 'By the numbers',
  headline: 'Built for scale, proven at speed.',
  metrics: [
    { value: '7+', label: 'Sources unified into one Product Twin' },
    { value: '10x', label: 'Faster impact analysis' },
    { value: '<2 wk', label: 'To first AI-assisted insight' },
  ],
  cta: { label: 'Read customer stories', href: '#' },
};

/* Platform-specific Q&As — focused on the platform's technical shape
   (twin model, integration, deployment), not general company questions. */
const PLATFORM_FAQ = {
  eyebrow: 'The Platform',
  headline: 'How the platform\nactually works.',
  intro:
    'Five questions we hear most often from engineering leaders evaluating SPREAD.',
  cta: {
    prompt: 'Need a deeper answer?',
    label: 'Talk to an engineer',
    href: '#cta',
  },
  items: [
    {
      question: 'What is the "Product Twin" exactly?',
      answer:
        'A live, queryable graph that mirrors your product across every source system. Errors, functions, requirements, signals and components are modeled as connected entities — not rows in a warehouse — so any app or agent can reason over relationships without re-implementing the joins.',
    },
    {
      question: 'Which source systems can connect?',
      answer:
        'PLM (Teamcenter, Windchill, 3DEXPERIENCE), ERP (SAP, Oracle), ALM (Codebeamer, Polarion), CAD, MES, IoT, and document repositories out of the box. The ingestion layer normalises them into the twin without migration; your teams keep using their existing tools.',
    },
    {
      question: 'How fast can a team get to first insight?',
      answer:
        'Typically under two weeks for the first three source systems. The connectors ship pre-built, so most of the setup is permissions and data mapping — not engineering.',
    },
    {
      question: 'How do SPREAD\'s apps relate to the platform?',
      answer:
        'Error Inspector, Product Explorer, Requirements Manager and our AI agents all read from the same Product Twin. That means fixing data in one app corrects every other surface — there\'s one source of truth, not five reports that disagree.',
    },
    {
      question: 'Can we build our own apps on top?',
      answer:
        'Yes. Every entity and relationship in the twin is exposed through a stable API. Internal teams can build custom dashboards, scripts, or AI workflows against it without re-indexing the source systems themselves.',
    },
  ],
  techLabels: {
    topLeft: 'FIG.04 — FAQ',
    topRight: 'STATUS: OPEN',
    bottomLeft: 'SPREAD / PLATFORM',
    bottomRight: 'v. 2026.1',
  },
};

export default function PlatformPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero {...PLATFORM_HERO} visual={<PlatformDiagram />} />
        <PlatformArchitectureBento />
        <ImpactMetrics {...PLATFORM_METRICS} variant="bento" />
        <FAQ {...PLATFORM_FAQ} />
        {/* Upcoming section (the last phase):
            - Apps & Agents (reuse Solutions, card-style)
         */}
        <CTA />
      </main>
      <Footer />
    </>
  );
}
