import React from 'react';
import spreadLogoOrange from '../../images/Spread_Logo_Orange.svg';
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

function LinkedInIcon() {
  return (
    <svg
      className="site-footer__social-icon"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export const meta = { label: 'Footer' };

export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <a className="site-footer__logo" href="/" aria-label="SPREAD home">
              <img src={spreadLogoOrange} alt="" width="120" height="32" />
            </a>
            <p className="site-footer__tagline">
              Engineering Intelligence for complex software-defined products.
            </p>
          </div>
          <nav className="site-footer__columns" aria-label="Footer navigation">
            {COLUMNS.map((col) => (
              <div key={col.title} className="site-footer__col">
                <h2 className="site-footer__col-title">{col.title}</h2>
                <ul className="site-footer__col-list">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="site-footer__bottom">
          <p className="site-footer__copyright">
            © 2026 SPREAD GmbH. All rights reserved.
          </p>
          <div className="site-footer__social">
            <a
              className="site-footer__social-link"
              href="https://www.linkedin.com/company/spread-gmbh/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon />
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
