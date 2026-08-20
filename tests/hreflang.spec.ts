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

describe('reciprocite hreflang', () => {
  it('chaque page declare toutes les variantes, y compris elle-meme', () => {
    for (const cible of CIBLES) {
      const bloc = alternatives(cible)
      for (const langue of LANGUES) {
        expect(bloc[langue], `${cible.page}/${cible.article ?? ''} : ${langue} manque`).toBe(
          adresse(langue, cible),
        )
      }
    }
  })

  it('les deux langues declarent exactement le meme bloc', () => {
    // Le bloc ne depend que de la cible, pas de la langue courante : c'est la
    // propriete meme qui rend la declaration reciproque.
    for (const cible of CIBLES) {
      const bloc = alternatives(cible)
      expect(alternatives({ ...cible })).toEqual(bloc)
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
      expect(alternatives(cible)['x-default']).toBe(adresse('fr', cible))
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
