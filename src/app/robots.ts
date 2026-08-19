import type { MetadataRoute } from 'next'

import { SITE_URL } from '@/content/langues'

// `output: 'export'` n'accepte une route de metadonnees que si elle est
// declaree statique : sans cette ligne, `next build` refuse /sitemap.xml.
export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
