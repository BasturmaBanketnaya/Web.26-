import React from 'react';
import './ResultsCards.css';
import arrowIcon from '../../images/Arrow.svg';

/* Complex animated geometric illustrations for card headers.
   All authored in a 240×240 viewBox so every drawable element fits with
   comfortable padding and nothing crops at any render size.
   Stroke is --color-orange at 1.5px on #272727 background (set in CSS).
   Animations are defined in ResultsCards.css and target elements by class. */
function IllustrationIcon({ variant }) {
  const common = {
    width: '100%',
    height: '100%',
    viewBox: '0 0 240 240',
    preserveAspectRatio: 'xMidYMid meet',
    fill: 'none',
    stroke: 'var(--color-orange)',
    strokeWidth: 1.5,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
    focusable: 'false',
  };

  switch (variant) {
    /* Double-cone of convergence — two outer rings with cone-shaped
       wireframes meeting at a dashed center. Echoes the reference. */
    case 'cones': {
      const cx1 = 75, cx2 = 165, cy = 120;
      const rx = 12, ry = 48;
      const rays = 11;
      const leftRays = [];
      const rightRays = [];
      for (let i = 0; i < rays; i++) {
        const t = (i / (rays - 1)) * Math.PI - Math.PI / 2;
        const ey = cy + Math.sin(t) * ry;
        const exL = cx1 + Math.cos(t) * rx;
        const exR = cx2 - Math.cos(t) * rx;
        leftRays.push(<line key={`L${i}`} x1={120} y1={120} x2={exL} y2={ey} />);
        rightRays.push(<line key={`R${i}`} x1={120} y1={120} x2={exR} y2={ey} />);
      }
      return (
        <svg {...common} className="rc-illus rc-illus--cones">
          <g className="rc-illus__ring-l">
            <circle cx={cx1} cy={cy} r="68" />
          </g>
          <g className="rc-illus__ring-r">
            <circle cx={cx2} cy={cy} r="68" />
          </g>
          <g className="rc-illus__rays">{leftRays}{rightRays}</g>
          <ellipse cx={cx1} cy={cy} rx={rx} ry={ry} />
          <ellipse cx={cx2} cy={cy} rx={rx} ry={ry} />
          <circle
            className="rc-illus__dashed"
            cx="120"
            cy="120"
            r="34"
            strokeDasharray="4 6"
          />
        </svg>
      );
    }

    /* Orbital system — concentric rings with satellites rotating at
       different speeds, each on its own <g> so rotations stack cleanly. */
    case 'orbits': {
      const rings = [
        { r: 95, dot: { x: 215, y: 120 }, speed: 'rc-anim-spin-slow' },
        { r: 68, dot: { x: 120, y: 52 }, speed: 'rc-anim-spin-med' },
        { r: 40, dot: { x: 80, y: 120 }, speed: 'rc-anim-spin-fast' },
      ];
      return (
        <svg {...common} className="rc-illus rc-illus--orbits">
          <circle cx="120" cy="120" r="8" fill="var(--color-orange)" stroke="none" />
          {rings.map((ring, i) => (
            <g
              key={i}
              className={`rc-illus__orbit ${ring.speed}`}
              style={{ transformOrigin: '120px 120px' }}
            >
              <circle
                cx="120"
                cy="120"
                r={ring.r}
                strokeDasharray={i === 1 ? '3 5' : undefined}
              />
              <circle
                cx={ring.dot.x}
                cy={ring.dot.y}
                r="5"
                fill="var(--color-orange)"
                stroke="none"
              />
            </g>
          ))}
        </svg>
      );
    }

    /* Mesh topology — isometric wireframe with diagonals forming a
       gem-like polyhedron; gently breathes to suggest interconnection. */
    case 'mesh': {
      const cx = 120, cy = 120;
      const top = { x: cx, y: cy - 80 };
      const bot = { x: cx, y: cy + 80 };
      const l1 = { x: cx - 80, y: cy - 25 };
      const r1 = { x: cx + 80, y: cy - 25 };
      const l2 = { x: cx - 80, y: cy + 25 };
      const r2 = { x: cx + 80, y: cy + 25 };
      const line = (a, b, key) => (
        <line key={key} x1={a.x} y1={a.y} x2={b.x} y2={b.y} />
      );
      return (
        <svg {...common} className="rc-illus rc-illus--mesh">
          <g className="rc-illus__mesh-breathe" style={{ transformOrigin: '120px 120px' }}>
            {/* outer hexagonal silhouette */}
            <path d={`M${top.x} ${top.y} L${r1.x} ${r1.y} L${r2.x} ${r2.y} L${bot.x} ${bot.y} L${l2.x} ${l2.y} L${l1.x} ${l1.y} Z`} />
            {/* equator */}
            {line(l1, r1, 'eq-top')}
            {line(l2, r2, 'eq-bot')}
            {/* verticals + crossings */}
            {line(top, bot, 'v')}
            {line(top, l2, 't-l2')}
            {line(top, r2, 't-r2')}
            {line(bot, l1, 'b-l1')}
            {line(bot, r1, 'b-r1')}
            {line(l1, r2, 'l1-r2')}
            {line(r1, l2, 'r1-l2')}
            {/* nodes */}
            {[top, bot, l1, r1, l2, r2].map((p, i) => (
              <circle key={`n${i}`} cx={p.x} cy={p.y} r="3" fill="var(--color-orange)" stroke="none" />
            ))}
          </g>
        </svg>
      );
    }

    default:
      return null;
  }
}

const CARDS = [
  {
    author: 'Alexander Matthey',
    date: '1 April',
    title: "Why Speed Will Define Europe's Defense Advantage",
    excerpt:
      'In an era where geopolitical tensions are reshaping defense priorities across Europe, speed is no longer optional — it\'s existential. Legacy development cycles, built for peacetime procurement, can\'t keep up with the pace of modern threats.',
    icon: 'cones',
  },
  {
    author: 'Alexander Matthey',
    date: '28 March',
    title: 'How PLM Integration Cuts Review Cycles by 40%',
    excerpt:
      'Engineering teams spend an enormous amount of time manually reconciling data between PLM, CAD, and test management systems. When these tools are finally connected through a single intelligent layer, review cycles shrink dramatically.',
    icon: 'orbits',
  },
  {
    author: 'Alexander Matthey',
    date: '15 March',
    title: 'Eliminating Data Silos in Automotive Engineering',
    excerpt:
      'Data silos remain the biggest invisible tax on engineering productivity. When requirements live in one system, designs in another, and test results in a third, teams lose hours every week chasing information across disconnected tools.',
    icon: 'mesh',
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
              <div className="results-cards__illustration" aria-hidden="true">
                <IllustrationIcon variant={card.icon} />
              </div>
              <div className="results-cards__card-body">
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
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export const meta = { label: 'Results Cards' };
export const fields = null;
