import React from 'react';

import Header from '../components/partials/Header.jsx';
import Footer from '../components/partials/Footer.jsx';

import Hero from '../components/modules/Hero.jsx';
import TrustedLogos from '../components/modules/TrustedLogos.jsx';
import HowItWorks from '../components/modules/HowItWorks.jsx';
import StoriesSlider from '../components/modules/StoriesSlider.jsx';
import ResultsCards from '../components/modules/ResultsCards.jsx';
import FAQ from '../components/modules/FAQ.jsx';
import CTA from '../components/modules/CTA.jsx';

/* Homepage composition. Modules are used with their default props here
   (same content as before this refactor), so the homepage renders
   identically. Page-specific content will flow through props once we
   refactor more modules. */
export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustedLogos />
        <HowItWorks />
        <StoriesSlider />
        <ResultsCards />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
