import React from 'react';

import './theme/styles/global.css';
import './theme/styles/components.css';

import Header from './theme/components/partials/Header.jsx';
import Footer from './theme/components/partials/Footer.jsx';

import Hero from './theme/components/modules/Hero.jsx';
import TrustedLogos from './theme/components/modules/TrustedLogos.jsx';
import HowItWorks from './theme/components/modules/HowItWorks.jsx';
import StoriesSlider from './theme/components/modules/StoriesSlider.jsx';
import ResultsCards from './theme/components/modules/ResultsCards.jsx';
import FAQ from './theme/components/modules/FAQ.jsx';
import CTA from './theme/components/modules/CTA.jsx';

export default function App() {
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
