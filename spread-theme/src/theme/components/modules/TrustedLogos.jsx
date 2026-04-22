import React from 'react';
import './TrustedLogos.css';

import logoVW from '../../images/Clients Logos/VW.svg';
import logoMercedes from '../../images/Clients Logos/Mercedes.svg';
import logoBMW from '../../images/Clients Logos/BMW.svg';
import logoFord from '../../images/Clients Logos/Ford.svg';
import logoRheinmetall from '../../images/Clients Logos/Rheinmetall.svg';
import logoBosch from '../../images/Clients Logos/Bosch.svg';
import logoAudi from '../../images/Clients Logos/Audi.svg';
import logoPorsche from '../../images/Clients Logos/Porsche.svg';
import logoDaimler from '../../images/Clients Logos/Daimler Truck.svg';
import logoStadler from '../../images/Clients Logos/Stadler.svg';
import logoMini from '../../images/Clients Logos/Mini.svg';

/* --------------------------------------------------------------------------
 * TrustedLogos — full-bleed gray band.
 *
 * Layout:
 *     ┌──────────────────────────────────────────────────────────────┐
 *     │ TRUSTED BY │  logo  logo  logo  logo  logo  logo  logo  …    │
 *     └──────────────────────────────────────────────────────────────┘
 *
 *     • Full-viewport-width gray (#F5F5F5) background — functions as a
 *       breathing band between content sections, not as a "card".
 *     • Left fixed-width column holds the "Trusted by" eyebrow in the
 *       schematic mono voice; stays pinned as the right-hand conveyor
 *       scrolls.
 *     • Right column is an edge-faded conveyor of client logos
 *       (grayscale, low opacity, colorize on hover).
 *     • No bento container, no corner captions — this section
 *       deliberately reads as divider chrome rather than as a data card.
 *
 * HubSpot-friendly: logos array maps 1:1 to a repeater field.
 * ------------------------------------------------------------------------ */

const logos = [
  { src: logoVW, alt: 'Volkswagen' },
  { src: logoMercedes, alt: 'Mercedes-Benz' },
  { src: logoBMW, alt: 'BMW' },
  { src: logoFord, alt: 'Ford' },
  { src: logoRheinmetall, alt: 'Rheinmetall' },
  { src: logoBosch, alt: 'Bosch' },
  { src: logoAudi, alt: 'Audi' },
  { src: logoPorsche, alt: 'Porsche' },
  { src: logoDaimler, alt: 'Daimler Truck' },
  { src: logoStadler, alt: 'Stadler' },
  { src: logoMini, alt: 'Mini' },
];

export default function TrustedLogos() {
  return (
    <section className="trusted-logos" aria-label="Trusted by">
      <div className="trusted-logos__inner">
        <span className="trusted-logos__label">Trusted by</span>

        <div className="trusted-logos__track-wrapper">
          <div className="trusted-logos__track">
            {logos.map((logo, i) => (
              <img
                key={i}
                src={logo.src}
                alt={logo.alt}
                className="trusted-logos__logo"
              />
            ))}
            {logos.map((logo, i) => (
              <img
                key={`dup-${i}`}
                src={logo.src}
                alt={logo.alt}
                className="trusted-logos__logo"
                aria-hidden="true"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export const meta = { label: 'Trusted Logos' };
export const fields = null;
