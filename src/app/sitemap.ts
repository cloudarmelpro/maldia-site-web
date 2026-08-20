import type { MetadataRoute } from 'next'

import { identifiantsArticles } from '@/content/articles'
import { chemin, cheminArticle, LANGUES, PAGES, SITE_URL } from '@/content/langues'
import { alternatives } from '@/content/metadonnees'

// `output: 'export'` n'accepte une route de metadonnees que si elle est
// declaree statique : sans cette ligne, `next build` refuse /sitemap.xml.
export const dynamic = 'force-static'

function absolu(chemins: Record<string, string>): Record<string, string> {
  return Object.fromEntries(
    Object.entries(chemins).map(([cle, valeur]) => [cle, `${SITE_URL}${valeur}`]),
  )
}

/**
 * lastModified est omis deliberement : new Date() daterait chaque build, que le
 * contenu ait change ou non, et rendrait la sortie non deterministe.
 *
 * Le bloc `hreflang` vient de `alternatives()`, la meme fonction que celle des
 * metadonnees de page. Deux constructions separees finiraient par diverger, et
 * un sitemap qui contredit la page fait ignorer les deux declarations.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = PAGES.flatMap((page) =>
    LANGUES.map((langue) => ({
      // trailingSlash: true est actif — la barre finale fait correspondre ces
      // URL a ce que l'export produit reellement.
      url: `${SITE_URL}${chemin(langue, page)}`,
      alternates: { languages: absolu(alternatives({ page })) },
    })),
  )

  // Les identifiants sont communs aux deux langues : la liste francaise suffit
  // a les enumerer, et `tests/blog.spec.ts` verifie cette egalite.
  const articles = identifiantsArticles('fr').flatMap((article) =>
    LANGUES.map((langue) => ({
      url: `${SITE_URL}${cheminArticle(langue, article)}`,
      alternates: { languages: absolu(alternatives({ page: 'blog', article })) },
    })),
  )

  return [...pages, ...articles]
}
