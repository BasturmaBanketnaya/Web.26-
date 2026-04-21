import React from 'react';
import arrowIcon from '../../images/Arrow.svg';
import bentoConnect from '../../images/bento-connect.png';
import bentoShipTable from '../../images/bento-ship-table.png';
import './HowItWorks.css';

export default function HowItWorks() {
  return (
    <section className="hiw">
      <div className="container">
        <header className="hiw__header">
          <div className="hiw__header-copy">
            <span className="hiw__eyebrow">Platform</span>
            <h2 className="hiw__headline">How SPREAD works.</h2>
            <p className="hiw__subline">
              Scattered tools slow engineering down.{'\n'}
              Here&apos;s how SPREAD brings it all together.
            </p>
          </div>
          <a href="#" className="hiw__header-link">
            Explore our platform
            <img src={arrowIcon} alt="" />
          </a>
        </header>

        <div className="hiw__grid">
          {/* Row 1 — Card 01: Connect your tools (2 cols) */}
          <article className="hiw__card hiw__card--01">
            <span className="hiw__num">01</span>
            <div className="hiw__card-content">
              <h3 className="hiw__card-title">Connect your tools</h3>
              <p className="hiw__card-desc">
                Plug in your PLM, CAD, ERP, and ALM systems. SPREAD ingests and
                indexes your data without disrupting existing workflows.
              </p>
            </div>
            <div className="hiw__card-visual hiw__card-visual--connect">
              <img src={bentoConnect} alt="SPREAD product connector interface" />
            </div>
          </article>

          {/* Row 1 — Card 02: Map dependencies (1 col) */}
          <article className="hiw__card hiw__card--02">
            <span className="hiw__num">02</span>
            <div className="hiw__card-content">
              <h3 className="hiw__card-title">Map dependencies</h3>
              <p className="hiw__card-desc">
                SPREAD automatically builds a dependency graph across your entire
                toolchain — surfacing relationships no one knew existed.
              </p>
            </div>
            <a href="#" className="hiw__card-link">
              Explore Product Explorer
              <img src={arrowIcon} alt="" />
            </a>
          </article>

          {/* Row 2 — Card 03: Analyze impact (full width, 3 cols) */}
          <article className="hiw__card hiw__card--03">
            <div className="hiw__card-03-left">
              <div className="hiw__badge hiw__badge--rejected">
                <span className="hiw__badge-icon">✕</span> Rejected
              </div>
              <div className="hiw__badge hiw__badge--validated">
                <span className="hiw__badge-icon">✓</span> Validated
              </div>
            </div>
            <div className="hiw__card-03-center">
              <span className="hiw__num">03</span>
              <h3 className="hiw__card-title">Analyze impact</h3>
              <p className="hiw__card-desc">
                Query the impact of any change in real time. Trace from
                requirement to component to test case to deployment in seconds.
              </p>
              <a href="#" className="hiw__card-link">
                Explore Requirements Manager
                <img src={arrowIcon} alt="" />
              </a>
            </div>
            <div className="hiw__card-03-right">
              <div className="hiw__validation-table">
                <div className="hiw__val-row">
                  <span className="hiw__val-badge">● 100% match</span>
                  <span className="hiw__val-amount">€ 12,000.00</span>
                  <span className="hiw__val-status">✓ Validated</span>
                </div>
                <div className="hiw__val-row">
                  <span className="hiw__val-badge">● 100% match</span>
                  <span className="hiw__val-amount">€ 37,000.00</span>
                  <span className="hiw__val-status">✓ Validated</span>
                </div>
                <div className="hiw__val-row">
                  <span className="hiw__val-badge">● 100% match</span>
                  <span className="hiw__val-amount">€ 10,000.00</span>
                  <span className="hiw__val-status">✓ Validated</span>
                </div>
              </div>
            </div>
          </article>

          {/* Row 3 — Card 04: Ship with confidence (full width) */}
          <article className="hiw__card hiw__card--04">
            <div className="hiw__card-04-text">
              <span className="hiw__num">04</span>
              <h3 className="hiw__card-title">Ship with confidence</h3>
              <p className="hiw__card-desc">
                Release knowing exactly what changed, what it affects, and that
                nothing was missed before it goes live.
              </p>
              <a href="#" className="hiw__card-link">
                Explore Error Inspector
                <img src={arrowIcon} alt="" />
              </a>
            </div>
            <div className="hiw__card-04-visual">
              <img src={bentoShipTable} alt="SPREAD error inspector data table" />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export const meta = { label: 'How It Works' };
export const fields = null;
