import { describe, expect, it } from 'vitest'

import { CONTENUS } from '@/content/contenus'
import { LANGUES, PAGES } from '@/content/langues'
import type { Langue } from '@/content/langues'

// La parite de STRUCTURE est tenue par les tuples de types.ts : une entree en
// plus ou en moins dans une seule langue ne compile pas. Ce qu'aucun type ne
// peut tenir, c'est la parite de CONTENU — une chaine vide, un chiffre corrige
// d'un seul cote, un libelle de navigation oublie.

describe('WEB-8 — parite des deux langues', () => {
  it('aucune chaine visible n est vide', () => {
    const vides: string[] = []

    const parcourir = (valeur: unknown, chemin: string) => {
      if (typeof valeur === 'string') {
        if (valeur.trim() === '') vides.push(chemin)
        return
      }
      if (Array.isArray(valeur)) {
        valeur.forEach((element, indice) => parcourir(element, `${chemin}[${indice}]`))
        return
      }
      if (valeur && typeof valeur === 'object') {
        for (const [cle, sous] of Object.entries(valeur)) parcourir(sous, `${chemin}.${cle}`)
      }
    }

    for (const langue of LANGUES) parcourir(CONTENUS[langue], langue)

    expect(vides, vides.join(' | ')).toEqual([])
  })

  it('WEB-11 — les deux navigations couvrent les six pages, dans l ordre', () => {
    for (const langue of LANGUES) {
      const { enTete, pied } = CONTENUS[langue].commun
      expect(enTete.navigation.map((lien) => lien.page)).toEqual([...PAGES])
      expect(pied.navigation.map((lien) => lien.page)).toEqual([...PAGES])
    }
  })

  it('les libelles de navigation diffèrent entre eux dans chaque langue', () => {
    for (const langue of LANGUES) {
      const libelles = CONTENUS[langue].commun.enTete.navigation.map((lien) => lien.libelle)
      expect(new Set(libelles).size, `${langue} : deux entrées de menu portent le même libellé`).toBe(
        libelles.length,
      )
    }
  })
})

describe('WEB-12 — les chiffres du retour client', () => {
  // Ils vivent dans les phrases que le client a ecrites, donc en double. Une
  // correction faite d'un seul cote passerait inapercue sans ce test.
  const CHIFFRES_ATTENDUS: Record<Langue, readonly string[]> = {
    fr: ['14', '50', '25'],
    en: ['14', '50', '25'],
  }

  it('chaque langue porte les trois chiffres de l argumentaire', () => {
    for (const langue of LANGUES) {
      const texte = CONTENUS[langue].commun.argumentaire.liste
        .map((argument) => `${argument.chiffre ?? ''} ${argument.description}`)
        .join(' ')

      for (const chiffre of CHIFFRES_ATTENDUS[langue]) {
        expect(texte, `${langue} : le chiffre ${chiffre} manque à l'argumentaire`).toContain(chiffre)
      }
    }
  })

  it('le delai est presente comme une moyenne et non comme une garantie', () => {
    // Exigence explicite du retour client.
    expect(CONTENUS.fr.commun.argumentaire.mention).toMatch(/moyenne/i)
    expect(CONTENUS.fr.commun.argumentaire.mention).toMatch(/garantie/i)
    expect(CONTENUS.en.commun.argumentaire.mention).toMatch(/average/i)
    expect(CONTENUS.en.commun.argumentaire.mention).toMatch(/guarantee/i)
  })
})

describe('WEB-14 — le bandeau des outils', () => {
  it('dit qu aucun partenariat n est sous-entendu', () => {
    // Le retour client l'exige : citer une marque ne doit pas laisser croire a
    // un partenariat officiel.
    expect(CONTENUS.fr.commun.outils.mention).toMatch(/partenaire/i)
    expect(CONTENUS.en.commun.outils.mention).toMatch(/partner/i)
  })
})
