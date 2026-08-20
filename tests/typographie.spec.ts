import { describe, expect, it } from 'vitest'

import { ARTICLES } from '@/content/articles'
import { CONTENUS } from '@/content/contenus'
import type { Langue } from '@/content/langues'

// La typographie de chaque langue suit ses propres regles, et non celles de
// l'autre. Ce qui se verifie a la machine, on le verifie a la machine : une
// relecture humaine laisse passer une espace fine manquante.

const ESPACE_FINE = '\u202f'
const ESPACE_INSECABLE = '\u00a0'

function chaines(langue: Langue): Array<[string, string]> {
  const trouvees: Array<[string, string]> = []

  const parcourir = (valeur: unknown, chemin: string) => {
    if (typeof valeur === 'string') {
      trouvees.push([chemin, valeur])
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

  parcourir(CONTENUS[langue], langue)
  parcourir(ARTICLES[langue], `${langue}.articles`)
  return trouvees
}

describe('typographie francaise', () => {
  it('une espace insecable precede toujours : ; ! ?', () => {
    // Une espace ordinaire y autorise un retour a la ligne juste avant le signe,
    // et la ponctuation se retrouve seule en debut de ligne.
    const fautives = chaines('fr')
      .filter(([, texte]) => / [:;!?]/.test(texte))
      .map(([chemin, texte]) => `${chemin} : « ${texte.slice(0, 60)} »`)

    expect(fautives, fautives.join(' | ')).toEqual([])
  })

  it('une espace insecable precede le signe %', () => {
    const fautives = chaines('fr')
      .filter(([, texte]) => / %/.test(texte))
      .map(([chemin, texte]) => `${chemin} : « ${texte.slice(0, 60)} »`)

    expect(fautives, fautives.join(' | ')).toEqual([])
  })

  it('l apostrophe est courbe, jamais droite', () => {
    const fautives = chaines('fr')
      .filter(([, texte]) => texte.includes("'"))
      .map(([chemin, texte]) => `${chemin} : « ${texte.slice(0, 60)} »`)

    expect(fautives, fautives.join(' | ')).toEqual([])
  })

  it('les guillemets sont français', () => {
    const fautives = chaines('fr')
      .filter(([, texte]) => /["\u201c\u201d]/.test(texte))
      .map(([chemin, texte]) => `${chemin} : « ${texte.slice(0, 60)} »`)

    expect(fautives, fautives.join(' | ')).toEqual([])
  })
})

describe('typographie anglaise', () => {
  it('aucune espace avant la ponctuation double, ni fine ni insecable', () => {
    // Le defaut inverse, et le plus facile a commettre en traduisant depuis le
    // francais : l'espace fine suit la phrase au lieu de disparaitre.
    const fautives = chaines('en')
      .filter(([, texte]) => new RegExp(`[ ${ESPACE_FINE}${ESPACE_INSECABLE}][:;!?%]`).test(texte))
      .map(([chemin, texte]) => `${chemin} : « ${texte.slice(0, 60)} »`)

    expect(fautives, fautives.join(' | ')).toEqual([])
  })

  it('aucun guillemet français', () => {
    const fautives = chaines('en')
      .filter(([, texte]) => /[«»]/.test(texte))
      .map(([chemin, texte]) => `${chemin} : « ${texte.slice(0, 60)} »`)

    expect(fautives, fautives.join(' | ')).toEqual([])
  })

  it('l apostrophe est courbe, jamais droite', () => {
    const fautives = chaines('en')
      .filter(([, texte]) => texte.includes("'"))
      .map(([chemin, texte]) => `${chemin} : « ${texte.slice(0, 60)} »`)

    expect(fautives, fautives.join(' | ')).toEqual([])
  })
})
