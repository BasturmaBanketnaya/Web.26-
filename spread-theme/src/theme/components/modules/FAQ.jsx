import React from 'react';
import './FAQ.css';
import AccordionItem from '../islands/AccordionItem.jsx';

const faqs = [
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

export default function FAQ() {
  return (
    <section className="faq" aria-labelledby="faq-headline">
      <div className="container">
        <div className="faq__layout">
          <div className="faq__intro">
            <span className="faq__eyebrow">FAQ</span>
            <h2 id="faq-headline" className="faq__headline">
              {`Common questions,\nstraight answers.`}
            </h2>
            <p className="faq__subline">
              From fragmented toolchains to a single source of engineering truth — in four steps.
            </p>
          </div>
          <div className="faq__column">
            <div className="faq__accordion">
              {faqs.map((item, i) => (
                <AccordionItem
                  key={item.question}
                  question={item.question}
                  answer={item.answer}
                  defaultOpen={i === 0}
                />
              ))}
            </div>
            <div className="faq__cta">
              <p className="faq__cta-label">Still have questions?</p>
              <a href="#contact" className="faq__cta-link">
                Talk to an Engineer
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export const meta = { label: 'FAQ' };
export const fields = null;
