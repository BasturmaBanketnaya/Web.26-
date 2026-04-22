import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';

/* ---------------------------------------------------------------------
 * After the main bundle is built, copy `dist/index.html` to
 *   dist/platform/index.html
 *   dist/prototype/index.html
 *
 * GitHub Pages is a static file host, so visiting
 * `/Web.26-/platform` directly requires a real file on disk to
 * avoid a 404. Since every route shares the same HTML shell (the
 * SPA router decides what to render based on `location.pathname`),
 * we just mirror the file at every known route.
 *
 * This is far more reliable than the classic `404.html` redirect
 * trick, which depends on Chrome's "friendly error page" heuristics
 * and breaks unpredictably depending on body size and browser version.
 * ------------------------------------------------------------------- */
const ROUTES = ['platform', 'prototype'];

function mirrorRoutes() {
  return {
    name: 'mirror-routes-to-static-html',
    apply: 'build',
    closeBundle() {
      const dist = path.resolve('dist');
      const shell = path.join(dist, 'index.html');
      if (!fs.existsSync(shell)) return;
      const html = fs.readFileSync(shell, 'utf8');
      for (const route of ROUTES) {
        const dir = path.join(dist, route);
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, 'index.html'), html);
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), mirrorRoutes()],
  root: '.',
  publicDir: 'public',
  base: process.env.GITHUB_PAGES ? '/Web.26-/' : '/',
});
