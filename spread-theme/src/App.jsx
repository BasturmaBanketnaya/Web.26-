import React, { useEffect, useState } from 'react';

import './theme/styles/global.css';
import './theme/styles/components.css';

import HomePage from './theme/pages/HomePage.jsx';
import PlatformPage from './theme/pages/PlatformPage.jsx';
import PrototypePage from './theme/pages/PrototypePage.jsx';

/* --------------------------------------------------------------------------
 * Dead-simple client routing — no new deps.
 *
 * Matches `window.location.pathname`:
 *   /           → HomePage
 *   /platform   → PlatformPage
 *   /prototype  → PrototypePage   (temporary — will be removed once approved)
 *   (anything)  → HomePage (safe fallback)
 *
 * This only exists for the local dev server. On HubSpot, each page is its
 * own template with its own set of modules — no client router needed. So
 * keeping the routing in one tiny switch here means it's easy to delete
 * when we port to HubSpot.
 *
 * Listens to `popstate` so browser back/forward works. Programmatic nav
 * (e.g. from the Header's "Our Platform" link once wired up) can call
 * `window.history.pushState({}, '', '/platform')` followed by dispatching
 * a `popstate` event, or we can add a small navigate() helper later.
 * ------------------------------------------------------------------------ */

/* Vite injects the site's base path at build time:
 *   - dev / HubSpot: '/'
 *   - GitHub Pages:  '/Web.26-/'
 * We strip it from the URL so the switch below can stay simple and
 * the site routes identically whether served from `/` or `/Web.26-/`.
 */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

function stripBase(pathname) {
  if (BASE && pathname.startsWith(BASE)) {
    return pathname.slice(BASE.length) || '/';
  }
  return pathname;
}

function resolvePage(pathname) {
  const p = stripBase(pathname);
  if (p === '/platform' || p === '/platform/') {
    return <PlatformPage />;
  }
  if (p === '/prototype' || p === '/prototype/') {
    return <PrototypePage />;
  }
  return <HomePage />;
}

export default function App() {
  const [path, setPath] = useState(
    typeof window === 'undefined' ? '/' : window.location.pathname
  );

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  return resolvePage(path);
}
