import type { MetadataRoute } from 'next'

import { cheminDeLangue, LANGUES, SITE_URL } from '@/content/langues'

// `output: 'export'` n'accepte une route de metadonnees que si elle est
// declaree statique : sans cette ligne, `next build` refuse /sitemap.xml.
export const dynamic = 'force-static'

// lastModified est omis délibérément : new Date() daterait chaque build, que le
// contenu ait changé ou non, et rendrait la sortie non déterministe.
export default function sitemap(): MetadataRoute.Sitemap {
  // Réciprocité hreflang, à l'identique pour chaque entrée ; x-default est le
  // routeur de langue à la racine (public/index.html).
  const languages = {
    fr: `${SITE_URL}${cheminDeLangue('fr')}`,
    en: `${SITE_URL}${cheminDeLangue('en')}`,
    'x-default': `${SITE_URL}/`,
  }

  return LANGUES.map((langue) => ({
    // trailingSlash: true est actif — la barre finale de cheminDeLangue fait
    // correspondre ces URL à ce que l'export produit réellement.
    url: `${SITE_URL}${cheminDeLangue(langue)}`,
    alternates: { languages },
  }))
}
