import React, { useEffect, useRef } from 'react';
import './PlatformMockup.css';

/* Reference design size — every inner value (padding, sidebar width,
   font size, node diameter, SVG coords) was authored against this.
   We scale the entire fixed-size canvas to fit the host width so the
   whole mockup resizes as a single unit. */
const DESIGN_W = 1420;
const DESIGN_H = 780;

function SpreadMark() {
  return (
    <svg
      className="pm-topbar-logo"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 614 132"
      aria-hidden="true"
      focusable="false"
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

export default function PlatformMockup() {
  const rootRef = useRef(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth || DESIGN_W;
      el.style.setProperty('--pm-scale', String(w / DESIGN_W));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener('resize', update);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div className="pm-root" aria-hidden="true" ref={rootRef}>
     <div className="pm-scale">
      <div className="pm-frame">
        <div className="pm-app">
          <nav className="pm-topbar">
            <div className="pm-topbar-left">
              <SpreadMark />
              <div className="pm-topbar-divider" />
              <div className="pm-breadcrumbs">
                <span>Platform</span>
                <span className="pm-bc-sep">›</span>
                <span className="pm-bc-current">Overview</span>
              </div>
            </div>
            <div className="pm-topbar-center">
              <div className="pm-search-bar">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="5.8" cy="5.8" r="4.3" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M9 9l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span>Search platform…</span>
                <kbd>⌘K</kbd>
              </div>
            </div>
            <div className="pm-topbar-right">
              <button type="button" className="pm-topbar-btn" tabIndex={-1}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2a4.5 4.5 0 0 0-4.5 4.5v2.75L2.25 11h11.5l-1.25-1.75V6.5A4.5 4.5 0 0 0 8 2z" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinejoin="round"/>
                  <path d="M6.25 12.5a1.75 1.75 0 0 0 3.5 0" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
                </svg>
              </button>
              <div className="pm-avatar">PN</div>
            </div>
          </nav>

          <div className="pm-main-area">
            <aside className="pm-platform-nav">
              <div className="pm-pn-org">
                <div className="pm-pn-org-name">E-Platform Gen3</div>
                <div className="pm-pn-org-plan">Enterprise · 48 users</div>
              </div>
              <div className="pm-pn-section-label">Platform</div>
              <div className="pm-pn-item pm-active">
                <svg viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><rect x="9" y="2" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><rect x="2" y="9" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><rect x="9" y="9" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.3"/></svg>
                Overview
              </div>
              <div className="pm-pn-item">
                <svg viewBox="0 0 16 16" fill="none"><path d="M4 8h8M8 4v8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.3"/></svg>
                Data Sources <span className="pm-pn-badge">5</span>
              </div>
              <div className="pm-pn-item">
                <svg viewBox="0 0 16 16" fill="none"><path d="M2 4h12M2 8h8M2 12h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                Data Mappings
              </div>
              <div className="pm-pn-item">
                <svg viewBox="0 0 16 16" fill="none"><circle cx="5" cy="5" r="2" stroke="currentColor" strokeWidth="1.3"/><circle cx="11" cy="5" r="2" stroke="currentColor" strokeWidth="1.3"/><circle cx="8" cy="12" r="2" stroke="currentColor" strokeWidth="1.3"/><path d="M6.5 6.5l1 3M9.5 6.5l-1 3" stroke="currentColor" strokeWidth="1"/></svg>
                Intelligence Graph
              </div>
              <div className="pm-pn-item">
                <svg viewBox="0 0 16 16" fill="none"><path d="M8 2l2 4.5L15 8l-5 1.5L8 14l-2-4.5L1 8l5-1.5z" stroke="currentColor" strokeWidth="1.2" fill="none"/></svg>
                Agent Access <span className="pm-pn-badge">4</span>
              </div>
              <div className="pm-pn-child"><span className="pm-pn-dot pm-dot-green" />Claude Code</div>
              <div className="pm-pn-child"><span className="pm-pn-dot pm-dot-green" />Codex</div>
              <div className="pm-pn-child"><span className="pm-pn-dot pm-dot-green" />DevOps Agent</div>
              <div className="pm-pn-child"><span className="pm-pn-dot pm-dot-gray" />Hermes Agent</div>
              <div className="pm-pn-item">
                <svg viewBox="0 0 16 16" fill="none"><rect x="2.5" y="2.5" width="4.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.2"/><rect x="9" y="2.5" width="4.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.2"/><rect x="2.5" y="9" width="4.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.2"/><path d="M11.25 10v4M9.25 12h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                Applications <span className="pm-pn-badge">5</span>
              </div>
              <div className="pm-pn-child"><span className="pm-pn-dot pm-dot-green" />Product Explorer</div>
              <div className="pm-pn-child"><span className="pm-pn-dot pm-dot-green" />Requirements Manager</div>
              <div className="pm-pn-child"><span className="pm-pn-dot pm-dot-green" />Ticket Analyzer</div>
              <div className="pm-pn-child"><span className="pm-pn-dot pm-dot-green" />Error Inspector</div>
              <div className="pm-pn-child"><span className="pm-pn-dot pm-dot-green" />Studio</div>
              <div className="pm-pn-section-label pm-pn-section-label--top">Administration</div>
              <div className="pm-pn-item">
                <svg viewBox="0 0 16 16" fill="none"><circle cx="6" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.3"/><path d="M2 14c0-2.5 2-4 4-4s4 1.5 4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><circle cx="12" cy="5" r="1.5" stroke="currentColor" strokeWidth="1.2"/><path d="M10.5 10c0-1.2 1-2 1.5-2s1.5.8 1.5 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                Users &amp; Roles <span className="pm-pn-badge">48</span>
              </div>
              <div className="pm-pn-item">
                <svg viewBox="0 0 16 16" fill="none"><path d="M2 12l3-4 2.5 2 3-5L14 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Observability
              </div>
              <div className="pm-pn-item">
                <svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.3"/><path d="M8 2v2M8 12v2M2 8h2M12 8h2M3.8 3.8l1.4 1.4M10.8 10.8l1.4 1.4M3.8 12.2l1.4-1.4M10.8 5.2l1.4-1.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                Settings
              </div>
            </aside>

            <div className="pm-platform-content">
              <div className="pm-pc-hero">
                <div className="pm-pc-hero-title">Engineering Intelligence Graph</div>
                <div className="pm-pc-hero-sub">5 sources feeding 1 unified graph — consumed by 5 apps and 4 agents</div>
              </div>

              <div className="pm-metrics-row">
                <div className="pm-metric-item">
                  <div className="pm-metric-value">48,200</div>
                  <div className="pm-metric-label">Entities</div>
                </div>
                <div className="pm-metric-item">
                  <div className="pm-metric-value">142,800</div>
                  <div className="pm-metric-label">Connections</div>
                </div>
                <div className="pm-metric-item">
                  <div className="pm-metric-value">207</div>
                  <div className="pm-metric-label">Entity types</div>
                </div>
                <div className="pm-metric-item">
                  <div className="pm-metric-value pm-accent">98.2%</div>
                  <div className="pm-metric-label">Data quality</div>
                </div>
              </div>

              <div className="pm-flow-container">
                <div className="pm-flow-wrapper">
                  <svg className="pm-flow-svg" viewBox="0 0 920 270" preserveAspectRatio="xMidYMid meet">
                    <defs>
                      <radialGradient id="pm-core-glow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#FF6F47" stopOpacity="0.06"/>
                        <stop offset="60%" stopColor="#FF6F47" stopOpacity="0.02"/>
                        <stop offset="100%" stopColor="#FF6F47" stopOpacity="0"/>
                      </radialGradient>
                      <path id="pm-p-sw-core" d="M 365,145 Q 400,140 427,140" fill="none"/>
                      <path id="pm-p-sig-core" d="M 545,145 Q 510,140 483,140" fill="none"/>
                      <path id="pm-p-me-el" d="M 402,55 Q 455,35 508,55" fill="none"/>
                      <path id="pm-p-core-req" d="M 440,165 Q 415,198 395,215" fill="none"/>
                      <path id="pm-p-core-am" d="M 470,165 Q 498,198 518,215" fill="none"/>
                      <path id="pm-p-me-sw" d="M 370,75 Q 350,110 345,123" fill="none"/>
                      <path id="pm-p-el-sig" d="M 540,75 Q 555,110 565,123" fill="none"/>
                      <path id="pm-p-req-am" d="M 412,235 Q 455,252 503,235" fill="none"/>
                    </defs>

                    <text className="pm-flow-col-label" x="65" y="16" textAnchor="middle">SOURCES</text>
                    <text className="pm-flow-col-label" x="455" y="16" textAnchor="middle">ENGINEERING INTELLIGENCE GRAPH</text>

                    <g>
                      <rect className="pm-src-pill-bg" x="0" y="28" width="130" height="34" rx="6"/>
                      <rect x="0" y="28" width="3" height="34" rx="1.5" fill="#A1A1A1"/>
                      <text className="pm-src-label" x="14" y="43">Teamcenter</text>
                      <text className="pm-src-type" x="14" y="55">PLM · 18,400</text>
                      <circle className="pm-flow-status-dot" cx="118" cy="45" r="2.5" fill="#10B981"/>
                    </g>
                    <g>
                      <rect className="pm-src-pill-bg" x="0" y="78" width="130" height="34" rx="6"/>
                      <rect x="0" y="78" width="3" height="34" rx="1.5" fill="#A1A1A1"/>
                      <text className="pm-src-label" x="14" y="93">DOORS</text>
                      <text className="pm-src-type" x="14" y="105">ALM · 9,200</text>
                      <circle className="pm-flow-status-dot" cx="118" cy="95" r="2.5" fill="#10B981" style={{ animationDelay: '-1s' }}/>
                    </g>
                    <g>
                      <rect className="pm-src-pill-bg" x="0" y="128" width="130" height="34" rx="6"/>
                      <rect x="0" y="128" width="3" height="34" rx="1.5" fill="#A1A1A1"/>
                      <text className="pm-src-label" x="14" y="143">Jira</text>
                      <text className="pm-src-type" x="14" y="155">Issues · 4,800</text>
                      <circle className="pm-flow-status-dot" cx="118" cy="145" r="2.5" fill="#10B981" style={{ animationDelay: '-2s' }}/>
                    </g>
                    <g>
                      <rect className="pm-src-pill-bg" x="0" y="178" width="130" height="34" rx="6"/>
                      <rect x="0" y="178" width="3" height="34" rx="1.5" fill="#A1A1A1"/>
                      <text className="pm-src-label" x="14" y="193">SAP</text>
                      <text className="pm-src-type" x="14" y="205">ERP · 6,100</text>
                      <circle className="pm-flow-status-dot" cx="118" cy="195" r="2.5" fill="#10B981" style={{ animationDelay: '-0.5s' }}/>
                    </g>
                    <g opacity="0.5">
                      <rect className="pm-src-pill-bg pm-src-pill-pending" x="0" y="228" width="130" height="34" rx="6"/>
                      <rect x="0" y="228" width="3" height="34" rx="1.5" fill="#D1D1D1"/>
                      <text className="pm-src-label" x="14" y="243" fill="#A1A1A1">CATIA V5</text>
                      <text className="pm-src-type" x="14" y="255">CAD · pending</text>
                      <circle cx="118" cy="245" r="2.5" fill="#F59E0B"/>
                    </g>

                    {[
                      { cx: 360, cy: 95, r: 1.2, d: '0s' },
                      { cx: 420, cy: 75, r: 1, d: '1.2s' },
                      { cx: 490, cy: 90, r: 1.3, d: '2.4s' },
                      { cx: 540, cy: 105, r: 1, d: '0.8s' },
                      { cx: 395, cy: 180, r: 1.2, d: '3.5s' },
                      { cx: 510, cy: 175, r: 1, d: '1.8s' },
                      { cx: 440, cy: 200, r: 1.3, d: '4.2s' },
                      { cx: 475, cy: 105, r: 1, d: '2.8s' },
                      { cx: 350, cy: 200, r: 1, d: '5s' },
                      { cx: 560, cy: 195, r: 1.2, d: '3.2s' },
                      { cx: 410, cy: 115, r: 0.8, d: '1.5s' },
                      { cx: 500, cy: 210, r: 0.8, d: '4.8s' },
                      { cx: 435, cy: 60, r: 0.8, d: '0.5s' },
                      { cx: 465, cy: 225, r: 1, d: '2.2s' },
                      { cx: 380, cy: 160, r: 0.8, d: '3.8s' },
                      { cx: 530, cy: 160, r: 0.8, d: '5.2s' },
                      { cx: 445, cy: 85, r: 0.7, d: '1s' },
                      { cx: 370, cy: 130, r: 0.7, d: '4s' },
                      { cx: 540, cy: 215, r: 0.7, d: '2s' },
                      { cx: 405, cy: 210, r: 0.7, d: '5.5s' },
                    ].map((c, i) => (
                      <circle
                        key={i}
                        className="pm-constellation-dot"
                        cx={c.cx}
                        cy={c.cy}
                        r={c.r}
                        style={{ animationDelay: c.d }}
                      />
                    ))}

                    <circle cx="455" cy="140" r="72" fill="url(#pm-core-glow)"/>

                    <path className="pm-graph-edge" d="M 402,55 Q 455,35 508,55"/>
                    <path className="pm-graph-edge-pulse" d="M 402,55 Q 455,35 508,55"/>
                    <path className="pm-graph-edge" d="M 370,75 Q 350,110 345,123"/>
                    <path className="pm-graph-edge-pulse" d="M 370,75 Q 350,110 345,123" style={{ animationDelay: '-1s' }}/>
                    <path className="pm-graph-edge" d="M 540,75 Q 555,110 565,123"/>
                    <path className="pm-graph-edge-pulse" d="M 540,75 Q 555,110 565,123" style={{ animationDelay: '-2s' }}/>
                    <path className="pm-graph-edge" d="M 365,145 Q 400,140 427,140"/>
                    <path className="pm-graph-edge-pulse" d="M 365,145 Q 400,140 427,140" style={{ animationDelay: '-3s' }}/>
                    <path className="pm-graph-edge" d="M 545,145 Q 510,140 483,140"/>
                    <path className="pm-graph-edge-pulse" d="M 545,145 Q 510,140 483,140" style={{ animationDelay: '-1.5s' }}/>
                    <path className="pm-graph-edge" d="M 440,165 Q 415,198 395,215"/>
                    <path className="pm-graph-edge-pulse" d="M 440,165 Q 415,198 395,215" style={{ animationDelay: '-0.5s' }}/>
                    <path className="pm-graph-edge" d="M 470,165 Q 498,198 518,215"/>
                    <path className="pm-graph-edge-pulse" d="M 470,165 Q 498,198 518,215" style={{ animationDelay: '-2.5s' }}/>
                    <path className="pm-graph-edge" d="M 412,235 Q 455,252 503,235"/>
                    <path className="pm-graph-edge-pulse" d="M 412,235 Q 455,252 503,235" style={{ animationDelay: '-1.8s' }}/>
                    <path className="pm-graph-edge" d="M 350,165 Q 365,200 385,215"/>
                    <path className="pm-graph-edge" d="M 560,165 Q 545,200 525,215"/>

                    <circle className="pm-particle" r="2">
                      <animateMotion dur="3.5s" repeatCount="indefinite" begin="0s"><mpath href="#pm-p-sw-core"/></animateMotion>
                    </circle>
                    <circle className="pm-particle" r="2">
                      <animateMotion dur="3.5s" repeatCount="indefinite" begin="-1.5s"><mpath href="#pm-p-sig-core"/></animateMotion>
                    </circle>
                    <circle className="pm-particle" r="1.5" opacity="0.35">
                      <animateMotion dur="4s" repeatCount="indefinite" begin="-0.8s"><mpath href="#pm-p-me-el"/></animateMotion>
                    </circle>
                    <circle className="pm-particle" r="1.5" opacity="0.35">
                      <animateMotion dur="4s" repeatCount="indefinite" begin="-2s"><mpath href="#pm-p-core-req"/></animateMotion>
                    </circle>
                    <circle className="pm-particle" r="1.5" opacity="0.35">
                      <animateMotion dur="4.5s" repeatCount="indefinite" begin="-3s"><mpath href="#pm-p-core-am"/></animateMotion>
                    </circle>
                    <circle className="pm-particle" r="1.5" opacity="0.3">
                      <animateMotion dur="5s" repeatCount="indefinite" begin="-1s"><mpath href="#pm-p-me-sw"/></animateMotion>
                    </circle>
                    <circle className="pm-particle" r="1.5" opacity="0.3">
                      <animateMotion dur="5s" repeatCount="indefinite" begin="-2.5s"><mpath href="#pm-p-el-sig"/></animateMotion>
                    </circle>
                    <circle className="pm-particle" r="1.5" opacity="0.3">
                      <animateMotion dur="5.5s" repeatCount="indefinite" begin="-4s"><mpath href="#pm-p-req-am"/></animateMotion>
                    </circle>

                    <path className="pm-flow-in" d="M 130,45 C 210,45 260,55 320,55"/>
                    <path className="pm-flow-in-active" d="M 130,45 C 210,45 260,55 320,55"/>
                    <path className="pm-flow-in" d="M 130,95 C 210,95 260,98 320,100"/>
                    <path className="pm-flow-in-active" d="M 130,95 C 210,95 260,98 320,100" style={{ animationDelay: '-0.5s' }}/>
                    <path className="pm-flow-in" d="M 130,145 C 210,145 260,142 320,140"/>
                    <path className="pm-flow-in-active" d="M 130,145 C 210,145 260,142 320,140" style={{ animationDelay: '-1s' }}/>
                    <path className="pm-flow-in" d="M 130,195 C 210,195 260,178 320,172"/>
                    <path className="pm-flow-in-active" d="M 130,195 C 210,195 260,178 320,172" style={{ animationDelay: '-1.5s' }}/>
                    <path className="pm-flow-in" d="M 130,245 C 210,245 260,218 320,210" strokeDasharray="4 3" style={{ opacity: 0.4 }}/>

                    <path className="pm-flow-out" d="M 595,65 C 650,44 685,35 740,35"/>
                    <path className="pm-flow-out-active" d="M 595,65 C 650,44 685,35 740,35" style={{ animationDelay: '-0.9s' }}/>
                    <path className="pm-flow-out" d="M 595,75 C 650,62 685,56 740,56"/>
                    <path className="pm-flow-out-active" d="M 595,75 C 650,62 685,56 740,56" style={{ animationDelay: '-1.5s' }}/>
                    <path className="pm-flow-out" d="M 595,88 C 650,79 685,77 740,77"/>
                    <path className="pm-flow-out-active" d="M 595,88 C 650,79 685,77 740,77" style={{ animationDelay: '-2s' }}/>
                    <path className="pm-flow-out" d="M 595,100 C 650,95 685,98 740,98" style={{ opacity: 0.4 }}/>

                    <path className="pm-flow-out" d="M 595,132 C 650,152 685,169 740,169"/>
                    <path className="pm-flow-out-active" d="M 595,132 C 650,152 685,169 740,169"/>
                    <path className="pm-flow-out" d="M 595,145 C 650,170 685,190 740,190"/>
                    <path className="pm-flow-out-active" d="M 595,145 C 650,170 685,190 740,190" style={{ animationDelay: '-0.6s' }}/>
                    <path className="pm-flow-out" d="M 595,158 C 650,186 685,211 740,211"/>
                    <path className="pm-flow-out-active" d="M 595,158 C 650,186 685,211 740,211" style={{ animationDelay: '-1.2s' }}/>
                    <path className="pm-flow-out" d="M 595,170 C 650,203 685,232 740,232"/>
                    <path className="pm-flow-out-active" d="M 595,170 C 650,203 685,232 740,232" style={{ animationDelay: '-1.8s' }}/>
                    <path className="pm-flow-out" d="M 595,183 C 650,220 685,253 740,253"/>
                    <path className="pm-flow-out-active" d="M 595,183 C 650,220 685,253 740,253" style={{ animationDelay: '-0.3s' }}/>

                    <text className="pm-con-section-label" x="745" y="16">AGENTS</text>
                    <g>
                      <circle cx="750" cy="35" r="2.5" fill="#10B981"/>
                      <text className="pm-con-label-agent" x="758" y="39">Claude Code</text>
                    </g>
                    <g>
                      <circle cx="750" cy="56" r="2.5" fill="#10B981"/>
                      <text className="pm-con-label-agent" x="758" y="60">Codex</text>
                    </g>
                    <g>
                      <circle cx="750" cy="77" r="2.5" fill="#10B981"/>
                      <text className="pm-con-label-agent" x="758" y="81">DevOps Agent</text>
                    </g>
                    <g opacity="0.5">
                      <circle cx="750" cy="98" r="2.5" fill="#D1D1D1"/>
                      <text className="pm-con-label-agent" x="758" y="102" fill="#A1A1A1">Hermes Agent</text>
                    </g>

                    <text className="pm-con-section-label" x="745" y="150">APPLICATIONS</text>
                    <g>
                      <circle cx="750" cy="169" r="2.5" fill="#10B981"/>
                      <text className="pm-con-label" x="758" y="173">Product Explorer</text>
                    </g>
                    <g>
                      <circle cx="750" cy="190" r="2.5" fill="#10B981"/>
                      <text className="pm-con-label" x="758" y="194">Requirements Manager</text>
                    </g>
                    <g>
                      <circle cx="750" cy="211" r="2.5" fill="#10B981"/>
                      <text className="pm-con-label" x="758" y="215">Ticket Analyzer</text>
                    </g>
                    <g>
                      <circle cx="750" cy="232" r="2.5" fill="#10B981"/>
                      <text className="pm-con-label" x="758" y="236">Error Inspector</text>
                    </g>
                    <g>
                      <circle cx="750" cy="253" r="2.5" fill="#10B981"/>
                      <text className="pm-con-label" x="758" y="257">Studio</text>
                    </g>
                  </svg>

                  <div className="pm-graph-nodes-layer">
                    <div className="pm-gn pm-gn-breathe" style={{ left: '41.3%', top: '20.4%', width: 48, height: 48, marginLeft: -24, marginTop: -24, animationDelay: '0.4s' }}>
                      <span className="pm-gn-label">Mech</span>
                      <span className="pm-gn-count">8.2k</span>
                    </div>
                    <div className="pm-gn pm-gn-breathe-offset" style={{ left: '57.6%', top: '20.4%', width: 48, height: 48, marginLeft: -24, marginTop: -24, animationDelay: '0.5s' }}>
                      <span className="pm-gn-label">Elec</span>
                      <span className="pm-gn-count">6.4k</span>
                    </div>
                    <div className="pm-gn pm-gn-breathe-slow" style={{ left: '37.5%', top: '53.7%', width: 48, height: 48, marginLeft: -24, marginTop: -24, animationDelay: '0.6s' }}>
                      <span className="pm-gn-label">SW</span>
                      <span className="pm-gn-count">4.8k</span>
                    </div>
                    <div className="pm-gn pm-gn-breathe" style={{ left: '61.4%', top: '53.7%', width: 48, height: 48, marginLeft: -24, marginTop: -24, animationDelay: '0.7s' }}>
                      <span className="pm-gn-label">Sig</span>
                      <span className="pm-gn-count">12.4k</span>
                    </div>
                    <div className="pm-gn pm-gn-core pm-gn-breathe-slow" style={{ left: '49.5%', top: '51.9%', width: 64, height: 64, marginLeft: -32, marginTop: -32, animationDelay: '0.3s' }}>
                      <span className="pm-gn-label">Graph</span>
                      <span className="pm-gn-count">48.2k</span>
                    </div>
                    <div className="pm-gn pm-gn-breathe-offset" style={{ left: '42.4%', top: '87.0%', width: 48, height: 48, marginLeft: -24, marginTop: -24, animationDelay: '0.8s' }}>
                      <span className="pm-gn-label">Req</span>
                      <span className="pm-gn-count">9.2k</span>
                    </div>
                    <div className="pm-gn pm-gn-breathe" style={{ left: '57.1%', top: '87.0%', width: 48, height: 48, marginLeft: -24, marginTop: -24, animationDelay: '0.9s' }}>
                      <span className="pm-gn-label">Aftmk</span>
                      <span className="pm-gn-count">7.2k</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pm-flow-tagline">
                <strong>5</strong> enterprise sources → <strong>1</strong> unified graph → <strong>5</strong> apps + <strong>4</strong> agents
              </div>

              <div className="pm-activity-section">
                <div className="pm-activity-header">
                  <span className="pm-activity-title">Live Activity</span>
                  <span className="pm-activity-link">View all
                    <svg width="10" height="10" viewBox="0 0 10 10"><path d="M3.5 2l4 3-4 3" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                </div>
                <div className="pm-activity-list">
                  <div className="pm-activity-item">
                    <div className="pm-activity-dot-col"><span className="pm-activity-dot pm-dot-col-gray" /></div>
                    <div className="pm-activity-content">
                      <div className="pm-activity-text"><strong>Teamcenter</strong> sync — 340 entities ingested</div>
                    </div>
                    <span className="pm-activity-time">2m ago</span>
                  </div>
                  <div className="pm-activity-item">
                    <div className="pm-activity-dot-col"><span className="pm-activity-dot pm-dot-col-orange" /></div>
                    <div className="pm-activity-content">
                      <div className="pm-activity-text"><span className="pm-ai-tag">Agent</span> <strong>Claude Code</strong> queried BMS architecture via MCP</div>
                    </div>
                    <span className="pm-activity-time">18m ago</span>
                  </div>
                  <div className="pm-activity-item">
                    <div className="pm-activity-dot-col"><span className="pm-activity-dot pm-dot-col-orange" /></div>
                    <div className="pm-activity-content">
                      <div className="pm-activity-text"><span className="pm-ai-tag">Agent</span> <strong>DevOps Agent</strong> triggered re-sync after schema update</div>
                    </div>
                    <span className="pm-activity-time">35m ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <footer className="pm-statusbar">
            <div className="pm-statusbar-left">
              <span className="pm-statusbar-dot pm-sb-dot-green" />
              <span>All systems operational</span>
              <span className="pm-sb-sep">·</span>
              <span>5 data sources · 5 apps · 4 agents connected</span>
              <span className="pm-sb-sep">·</span>
              <span>48,200 entities in graph</span>
            </div>
            <div className="pm-statusbar-right">
              <span>E-Platform Gen3 · Enterprise</span>
            </div>
          </footer>
        </div>
      </div>
     </div>
    </div>
  );
}
