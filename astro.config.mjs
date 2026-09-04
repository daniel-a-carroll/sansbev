// @ts-check
import { defineConfig } from 'astro/config';

// Static output only. The three form endpoints are handled by the Worker that serves
// these assets (see the Worker entry added in stage 4), not by an Astro adapter --
// keeping the build static is a hard constraint from the brief.
export default defineConfig({
  site: 'https://sansbev.com',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
});
