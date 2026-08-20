import type { Metadata } from 'next'

import { chemin, cheminArticle, LANGUE_PAR_DEFAUT, LANGUES, SITE_URL } from './langues'
import type { Langue, Page } from './langues'
import type { Meta } from './types'

const LOCALES_OPEN_GRAPH: Record<Langue, string> = {
  fr: 'fr_FR',
  en: 'en_US',
}

/** Une page du site, ou un article du blog à l'intérieur de la page blog. */
export type Cible = {
  readonly page: Page
  readonly article?: string
}

export function adresse(langue: Langue, cible: Cible): string {
  return cible.article ? cheminArticle(langue, cible.article) : chemin(langue, cible.page)
}

/**
 * Le bloc `hreflang` d'un groupe d'alternatives, en chemins relatifs.
 *
 * Une seule fonction pour les métadonnées **et** pour le sitemap : les deux
 * doivent déclarer exactement la même chose. Deux constructions séparées
 * finiraient par diverger, et un sitemap qui contredit la page fait ignorer les
 * deux déclarations.
 */
export function alternatives(cible: Cible): Record<string, string> {
  // L'accueil a un vrai routeur de langue à la racine (`public/index.html`),
  // qui se déclare lui-même comme x-default : les trois adresses du groupe
  // doivent donc dire `/`. Les pages intérieures n'ont pas de routeur, et
  // x-default y désigne le français, langue par défaut (décision 0014). La
  // réciprocité se vérifie par groupe d'alternatives, pas entre groupes.
  const estAccueil = cible.page === 'accueil' && !cible.article

  const languages: Record<string, string> = {
    'x-default': estAccueil ? '/' : adresse(LANGUE_PAR_DEFAUT, cible),
  }
  for (const autre of LANGUES) {
    languages[autre] = adresse(autre, cible)
  }
  return languages
}

/**
 * Les métadonnées d'une page, produites à la compilation — l'export statique
 * n'autorise rien d'autre.
 *
 * Le piège que ce module existe pour fermer : **la réciprocité hreflang**. Sans
 * elle, Google traite les deux langues comme du contenu dupliqué et n'en indexe
 * qu'une, sans aucun signal. Trois règles, tenues ici et nulle part ailleurs :
 * chaque page déclare toutes ses variantes, y compris elle-même ; les deux
 * langues déclarent exactement le même bloc ; une variante `x-default` désigne
 * la version servie à qui ne correspond à aucune langue.
 *
 * Le bloc lui-même est construit par `alternatives`, que le sitemap lit aussi.
 */
export function metadonnees(langue: Langue, cible: Cible, meta: Meta): Metadata {
  const cheminCourant = adresse(langue, cible)

  return {
    metadataBase: new URL(SITE_URL),
    title: meta.titre,
    description: meta.description,
    alternates: {
      canonical: cheminCourant,
      languages: alternatives(cible),
    },
    openGraph: {
      type: cible.article ? 'article' : 'website',
      url: cheminCourant,
      locale: LOCALES_OPEN_GRAPH[langue],
      title: meta.openGraph.titre,
      description: meta.openGraph.description,
    },
  }
}
