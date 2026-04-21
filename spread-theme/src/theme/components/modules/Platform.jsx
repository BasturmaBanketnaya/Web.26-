import React from 'react';
import './Platform.css';

import platformImage from '../../images/Platform V2.png';
import arrowIcon from '../../images/Arrow.svg';

export default function Platform() {
  return (
    <section className="platform">
      <div className="container">
        <div className="platform__header">
          <span className="eyebrow">Platform</span>
          <h2 className="platform__headline">
            One intelligence layer connecting your fragmented systems to the products your teams actually need.
          </h2>
        </div>

        <div className="platform__image">
          <img src={platformImage} alt="SPREAD platform overview" />
        </div>

        <a href="#" className="text-link">
          Explore our platform
          <img src={arrowIcon} alt="" />
        </a>
      </div>
    </section>
  );
}

export const meta = { label: 'Platform' };
export const fields = null;
