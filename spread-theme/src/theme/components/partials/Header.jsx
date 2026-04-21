import React, { useEffect, useState } from 'react';
import './Header.css';

function SpreadLogo() {
  return (
    <svg
      className="site-header__logo-svg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 614 132"
      aria-hidden="true"
      focusable="false"
      shapeRendering="geometricPrecision"
    >
      <path fill="#ff6f47" d="M0,70.1C1.4,32.2,32.2,1.4,70.1,0c1.4,0,2.5,1.1,2.5,2.5v31.4c0,1.3-1,2.4-2.2,2.5-17.9,1.3-32.8,16.1-34,34-.2,1.2-1.2,2.2-2.5,2.2H2.3c-1.2-.1-2.2-1.2-2.3-2.5Z"/>
      <path fill="#ff6f47" d="M113.7,61.3c-1.4,37.8-32.2,68.7-70.1,70.1-1.4,0-2.5-1.1-2.5-2.5v-31.4c0-1.3,1-2.4,2.2-2.5,17.9-1.3,32.8-16.1,34-34,.2-1.2,1.2-2.2,2.5-2.2h31.6c1.2.1,2.2,1.2,2.3,2.5Z"/>
      <path fill="#ff6f47" d="M199.3,64.1c-2.4-1.3-5.1-2.4-8.1-3-2.9-.8-6-1.3-9.2-1.8-3.2-.5-5.9-1-8.3-1.8-2.1-.6-3.8-1.4-4.9-2.5-.9-.8-1.4-2.1-1.4-3.5s.3-3,3.2-4.5c2.5-1.3,5.7-1.9,9.5-1.9s6.8.8,9.7,2.2c2.7,1.6,5.1,3.5,7,5.9l.7,1c.3.4.9.4,1.2,0l7.8-8.2c.2-.3.3-.7.1-1l-.5-.8c-2.5-3.7-6-6.4-10.3-8.4-4.3-1.9-9.4-2.9-15.2-2.9s-9,.8-13,2.2c-4,1.4-7.1,3.7-9.5,6.5-2.5,2.9-3.6,6.5-3.6,10.5,0,5.9,2.4,10.5,7,13.5,4.3,2.9,10.2,4.9,17.3,5.9,5.4.8,9.7,1.7,12.7,2.9,3,1.3,3.5,3,3.5,4.4s-.5,2.7-1.8,3.7c-1.3,1.1-3,2.1-5.2,2.7s-4.6.9-7,.9c-4.5,0-8.3-.9-11.3-2.5-3.2-1.8-6.2-4.3-9.1-7.6l-.8-.9c-.3-.4-.9-.3-1.2,0l-7.3,9.1c-.2.3-.2.7,0,1l.5.6c3.7,4.3,7.9,7.5,12.7,9.4,4.8,1.9,10.2,2.9,16,2.9s10.3-.8,14.3-2.5c4.1-1.8,7.5-4.1,9.7-7.3,2.4-3.2,3.5-7,3.5-11.1s-.8-5.9-2.4-8.1c-1.8-1.9-3.8-3.6-6.4-5.1h0Z"/>
      <path fill="#ff6f47" d="M276.9,36.7c-3-1.8-6.5-2.7-10.3-2.7h-32.1c-.4,0-.8.4-.8.8v62c0,.4.4.8.8.8h11.3c.4,0,.8-.4.8-.8v-21.6h18.9c3.8,0,7.5-.9,10.8-2.7,3.3-1.8,5.9-4.3,7.9-7.5s3-6.8,3-10.6-.9-7.3-2.9-10.3c-1.9-3-4.5-5.6-7.5-7.3h0ZM265,46.5c1.6,0,3.2.3,4.6,1.1,1.4.8,2.4,1.6,3.3,2.9.8,1.1,1.1,2.4,1.1,3.8s-.3,2.9-1.1,4.1c-.8,1.3-1.9,2.2-3.3,3-1.4.8-2.9,1.1-4.5,1.1h-17.3c-.6,0-1.1-.5-1.1-1.1v-13.7c0-.6.5-1.2,1.1-1.2h17.1Z"/>
      <path fill="#ff6f47" d="M360.4,66.5c2.7-3.5,4.1-7.6,4.1-12.1s-1-7.6-3-10.6c-1.9-3-4.6-5.4-7.8-7.2-3.2-1.8-6.7-2.5-10.3-2.5h-32.6c-.4,0-.8.4-.8.8v61.9c0,.4.4.8.8.8h11.3c.4,0,.8-.4.8-.8v-20.3c0-.6.5-1.2,1.1-1.2h13.5c.4,0,.7.2.9.5l14.7,21.4c.1.2.4.3.6.3h13.9c.7.1,1-.6.7-1.1l-16.1-23.2c3.2-1.8,5.9-4,8.1-6.8h0ZM341.2,46.5c1.9,0,3.5.3,5.1,1.1,1.6.6,2.7,1.6,3.5,2.9.8,1.1,1.3,2.5,1.3,4s-.3,2.7-1.1,4c-.8,1.3-1.9,2.2-3.2,3-1.4.8-2.9,1.1-4.6,1.1h-17.9c-.6,0-1.1-.5-1.1-1.2v-13.7c0-.6.5-1.1,1.1-1.1h17Z"/>
      <path fill="#ff6f47" d="M392.3,97.7h47.3c.4,0,.8-.4.8-.8v-11c0-.4-.4-.8-.8-.8h-34.1c-.6,0-1.1-.5-1.1-1.2v-10.3c0-.6.5-1.2,1.1-1.2h29.3c.4,0,.8-.4.8-.8v-11c0-.4-.4-.8-.8-.8h-29.3c-.6,0-1.1-.5-1.1-1.2v-10.9c0-.6.5-1.2,1.1-1.2h34.1c.4,0,.8-.4.8-.8v-11c0-.4-.4-.8-.8-.8h-47.3c-.4,0-.8.4-.8.8v62c0,.4.4.8.8.8Z"/>
      <path fill="#ff6f47" d="M489,34.4l-27.9,62c-.2.5.1,1.1.7,1.1h11.8c.3,0,.6-.2.7-.5l6-13.1c.2-.4.6-.7,1.1-.7h27.6c.5,0,.9.3,1.1.7l5.8,13.1c.1.3.4.5.7.5h12.4c.6,0,1-.6.7-1.1l-27.7-61.9c-.1-.3-.4-.5-.7-.5h-11.7c-.3,0-.6.2-.7.5h0ZM502.4,70.6h-14.4c-.8,0-1.4-.9-1-1.6l7.3-16.3c.4-.9,1.7-.9,2.1,0l7.1,16.3c.3.8-.2,1.6-1.1,1.6Z"/>
      <path fill="#ff6f47" d="M611.3,53.7c-1.4-3.8-3.5-7.3-6.4-10.2-2.9-3-6.3-5.2-10.5-7-4.1-1.6-9-2.5-14.5-2.5h-28.8c-.4,0-.8.4-.8.8v62c0,.4.4.8.8.8h28.8c7.3,0,13.3-1.4,18.4-4.3,4.9-2.9,8.7-6.8,11.3-11.6,2.5-4.8,3.8-10.2,3.8-15.9-.2-4.1-.8-8.3-2.2-12.1h0ZM563.2,47.7c0-.6.5-1.1,1.2-1.1h15.2c4.9,0,8.9,1,11.9,2.7,3,1.8,5.1,4.1,6.5,7,1.4,2.9,2.1,6.2,2.1,9.7s-.6,6.8-2.1,9.8c-1.4,2.9-3.5,5.1-6.5,6.8-3,1.8-7,2.5-11.9,2.5h-15.2c-.6,0-1.2-.5-1.2-1.2v-36.3h0Z"/>
    </svg>
  );
}

const NAV_ITEMS = [
  { label: 'Product', href: '#', active: true },
  { label: 'Solutions', href: '#' },
  { label: 'Customer', href: '#' },
  { label: 'Resources', href: '#' },
  { label: 'Company', href: '#' },
];

export const meta = { label: 'Header' };

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <header className={`site-header${scrolled ? ' site-header--scrolled' : ''}`} role="banner">
      <div className="site-header__inner">
        <a className="site-header__logo" href="/" aria-label="SPREAD home">
          <SpreadLogo />
        </a>

        <nav className="site-header__nav" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              className={`site-header__nav-link${item.active ? ' site-header__nav-link--active' : ''}`}
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a className="site-header__cta" href="#">Book a Demo</a>

        <button
          type="button"
          className="site-header__burger"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileOpen((o) => !o)}
        >
          <span /><span /><span />
        </button>
      </div>

      {mobileOpen && (
        <div className="site-header__mobile">
          {NAV_ITEMS.map((item) => (
            <a key={item.label} className="site-header__mobile-link" href={item.href} onClick={() => setMobileOpen(false)}>
              {item.label}
            </a>
          ))}
          <a className="site-header__mobile-cta" href="#" onClick={() => setMobileOpen(false)}>Book a Demo</a>
        </div>
      )}
    </header>
  );
}
