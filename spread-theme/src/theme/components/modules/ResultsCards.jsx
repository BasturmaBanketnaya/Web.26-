import React from 'react';
import './ResultsCards.css';
import arrowIcon from '../../images/Arrow.svg';

const CARDS = [
  {
    author: 'Alexander Matthey',
    date: '1 April',
    title: "Why Speed Will Define Europe's Defense Advantage",
    excerpt:
      'In an era where geopolitical tensions are reshaping defense priorities across Europe, speed is no longer optional — it\'s existential. Legacy development cycles, built for peacetime procurement, can\'t keep up with the pace of modern threats.',
  },
  {
    author: 'Alexander Matthey',
    date: '28 March',
    title: 'How PLM Integration Cuts Review Cycles by 40%',
    excerpt:
      'Engineering teams spend an enormous amount of time manually reconciling data between PLM, CAD, and test management systems. When these tools are finally connected through a single intelligent layer, review cycles shrink dramatically.',
  },
  {
    author: 'Alexander Matthey',
    date: '15 March',
    title: 'Eliminating Data Silos in Automotive Engineering',
    excerpt:
      'Data silos remain the biggest invisible tax on engineering productivity. When requirements live in one system, designs in another, and test results in a third, teams lose hours every week chasing information across disconnected tools.',
  },
];

export default function ResultsCards() {
  return (
    <section className="results-cards">
      <div className="container">
        <div className="results-cards__top">
          <header className="results-cards__header">
            <span className="eyebrow">Newsroom</span>
            <h2 className="results-cards__headline">Latest from SPREAD.</h2>
            <p className="results-cards__subline">
              Here&apos;s how SPREAD brings it all together.
              <br />
              What brings it all together.
            </p>
          </header>
          <a href="#" className="text-link results-cards__link">
            Explore Our Blog
            <img src={arrowIcon} alt="" />
          </a>
        </div>

        <div className="results-cards__grid">
          {CARDS.map((card, i) => (
            <article className="results-cards__card" key={i}>
              <div className="results-cards__card-header">
                <div className="results-cards__author-row">
                  <div
                    className="results-cards__avatar"
                    aria-hidden="true"
                  />
                  <span className="results-cards__author-name">
                    {card.author}
                  </span>
                </div>
                <span className="results-cards__date">{card.date}</span>
              </div>
              <h3 className="results-cards__title">{card.title}</h3>
              <p className="results-cards__excerpt">{card.excerpt}</p>
              <a href="#" className="text-link results-cards__read-more">
                Read More
                <img src={arrowIcon} alt="" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export const meta = { label: 'Results Cards' };
export const fields = null;
