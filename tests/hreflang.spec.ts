import { describe, expect, it } from 'vitest'

import { identifiantsArticles } from '@/content/articles'
import { LANGUES, PAGES } from '@/content/langues'
import type { Page } from '@/content/langues'
import { adresse, alternatives } from '@/content/metadonnees'
import type { Cible } from '@/content/metadonnees'

// Le piege que le CLAUDE.md signale comme le plus frequent : sans reciprocite,
// Google traite les deux langues comme du contenu duplique et n en indexe qu une
// — sans aucun signal. Ce fichier tient les trois regles.
const CIBLES: Cible[] = [
  ...PAGES.map((page) => ({ page })),
  ...identifiantsArticles('fr').map((article) => ({ page: 'blog' as Page, article })),
]

/**
 * L'adresse attendue, ecrite a la main.
 *
 * **C'est le point de tout ce fichier.** Il comparait `alternatives()` a
 * `adresse()`, c'est-a-dire a la fonction que `alternatives()` appelle : le
 * test decrivait l'implementation et restait vert meme si `chemin()` produisait
 * un segment faux. Verifie en cassant volontairement un segment — les six
 * assertions passaient.
 *
 * Cet oracle est independant. Un segment qui change casse le test, et c'est
 * voulu : la decision 0014 fige la structure des adresses AVANT la mise en
 * ligne, parce qu'aucune redirection n'est possible ensuite.
 */
const SEGMENT_ATTENDU: Record<Page, string> = {
  accueil: '',
  services: 'services',
  talents: 'talents',
  'a-propos': 'a-propos',
  blog: 'blog',
  contact: 'contact',
}

function adresseAttendue(langue: string, cible: Cible): string {
  if (cible.article) return `/${langue}/blog/${cible.article}/`
  const segment = SEGMENT_ATTENDU[cible.page]
  return segment ? `/${langue}/${segment}/` : `/${langue}/`
}

describe('reciprocite hreflang', () => {
  it('chaque page declare toutes les variantes, y compris elle-meme', () => {
    for (const cible of CIBLES) {
      const bloc = alternatives(cible)
      for (const langue of LANGUES) {
        expect(bloc[langue], `${cible.page}/${cible.article ?? ''} : ${langue} manque`).toBe(
          adresseAttendue(langue, cible),
        )
      }
    }
  })

  it('adresse() produit bien l adresse attendue', () => {
    // Le meme oracle, applique a la fonction que le sitemap et les canoniques
    // utilisent : si les deux divergent, l export et les declarations aussi.
    for (const cible of CIBLES) {
      for (const langue of LANGUES) {
        expect(adresse(langue, cible)).toBe(adresseAttendue(langue, cible))
      }
    }
  })

  it('chaque page designe un x-default', () => {
    for (const cible of CIBLES) {
      expect(alternatives(cible)['x-default'], `${cible.page}/${cible.article ?? ''}`).toBeTruthy()
    }
  })

  it('l accueil designe le routeur de langue, les pages interieures le francais', () => {
    // public/index.html se declare lui-meme comme x-default : les trois adresses
    // du groupe de l accueil doivent dire la meme chose.
    expect(alternatives({ page: 'accueil' })['x-default']).toBe('/')

    for (const cible of CIBLES) {
      if (cible.page === 'accueil' && !cible.article) continue
      expect(alternatives(cible)['x-default']).toBe(adresseAttendue('fr', cible))
    }
  })

  it('toutes les adresses finissent par une barre — trailingSlash est actif', () => {
    for (const cible of CIBLES) {
      for (const valeur of Object.values(alternatives(cible))) {
        expect(valeur, valeur).toMatch(/\/$/)
      }
    }
  })
})
