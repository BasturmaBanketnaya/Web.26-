import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: '.',
  publicDir: false,
  base: process.env.GITHUB_PAGES ? '/Web.26-/' : '/',
});
