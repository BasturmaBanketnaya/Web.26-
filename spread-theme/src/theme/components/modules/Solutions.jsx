import React from 'react';
import './Solutions.css';

import arrowIcon from '../../images/Arrow.svg';
import requirementsImg from '../../images/Requirements Manager.png';
import productExplorerImg from '../../images/Product Explorer.png';
import errorInspectorImg from '../../images/Error Inspector.png';

const solutions = [
  {
    image: requirementsImg,
    title: 'Requirements Manager',
    description:
      'Trace every requirement to its source, impact, and test status — across tools and teams.',
    link: '#',
  },
  {
    image: productExplorerImg,
    title: 'Product Explorer',
    description:
      'Navigate your product structure visually. Understand dependencies and trace changes across the full lifecycle.',
    link: '#',
  },
  {
    image: errorInspectorImg,
    title: 'Error Inspector',
    description:
      'Identify, trace, and resolve defects faster by connecting error reports to root causes across systems.',
    link: '#',
  },
];

export default function Solutions() {
  return (
    <section className="solutions">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">Solutions</span>
          <h2>Solutions for R&D, Production &amp; Aftermarket</h2>
        </div>

        <div className="solutions__grid">
          {solutions.map((item) => (
            <div className="solutions__card" key={item.title}>
              <div className="solutions__card-image">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="solutions__card-body">
                <h3 className="solutions__card-title">{item.title}</h3>
                <p className="solutions__card-desc">{item.description}</p>
                <a href={item.link} className="text-link">
                  Explore
                  <img src={arrowIcon} alt="" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export const meta = { label: 'Solutions' };
export const fields = null;
