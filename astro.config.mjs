// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import imageDimensions from './src/integrations/imageDimensions.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://sunnyartis.de/',
  base: '/',
  // GitHub Pages leitet /pfad per 301 auf /pfad/ um – Links und Canonicals daher immer mit Schrägstrich
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/out/') && !page.includes('/dl/'),
    }),
    imageDimensions(),
  ],
});
