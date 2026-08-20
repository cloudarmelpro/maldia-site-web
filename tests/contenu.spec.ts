import { describe, expect, it } from 'vitest'

import { CONTENUS } from '@/content/contenus'
import { LANGUES, PAGES } from '@/content/langues'
import { OUTILS } from '@/content/outils'

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

  it('les libelles de navigation different entre eux dans chaque langue', () => {
    for (const langue of LANGUES) {
      const libelles = CONTENUS[langue].commun.enTete.navigation.map((lien) => lien.libelle)
      expect(new Set(libelles).size, `${langue} : deux entrees de menu portent le meme libelle`).toBe(
        libelles.length,
      )
    }
  })

  it('les cinq etapes designent le meme cote dans les deux langues', () => {
    // `cote` pilote la couleur de la pastille. Divergent, il colorerait des
    // etapes differentes selon la langue.
    const [premiere, ...autres] = LANGUES.map((langue) =>
      CONTENUS[langue].commun.methode.liste.map((etape) => etape.cote),
    )
    for (const liste of autres) expect(liste).toEqual(premiere)
  })

  it('les six questions designent le meme cote dans les deux langues', () => {
    // `cote` pilote le filtre : divergent, un onglet montrerait un nombre
    // d'entrees different selon la langue.
    const [premiere, ...autres] = LANGUES.map((langue) =>
      CONTENUS[langue].accueil.questions.liste.map((entree) => entree.cote),
    )
    for (const liste of autres) expect(liste).toEqual(premiere)
  })
})

describe('WEB-12 — les chiffres du retour client', () => {
  // Ils vivent dans les repères que le design chiffre, donc en double. Une
  // correction faite d'un seul cote passerait inapercue sans ce test.
  const CHIFFRES_ATTENDUS = ['14', '50', '25']

  it('chaque langue porte les trois chiffres de l argumentaire', () => {
    for (const langue of LANGUES) {
      const texte = CONTENUS[langue].commun.pourquoi.liste
        .map((carte) => `${carte.chiffre} ${carte.description}`)
        .join(' ')

      for (const chiffre of CHIFFRES_ATTENDUS) {
        expect(texte, `${langue} : le chiffre ${chiffre} manque a l'argumentaire`).toContain(chiffre)
      }
    }
  })

  it('le delai est presente comme une moyenne et non comme une garantie', () => {
    // Exigence explicite du retour client.
    expect(CONTENUS.fr.commun.pourquoi.encart.texte).toMatch(/moyenne/i)
    expect(CONTENUS.fr.commun.pourquoi.encart.texte).toMatch(/garantie/i)
    expect(CONTENUS.en.commun.pourquoi.encart.texte).toMatch(/average/i)
    expect(CONTENUS.en.commun.pourquoi.encart.texte).toMatch(/guarantee/i)
  })
})

describe('WEB-14 — le bandeau des outils', () => {
  it('dit qu aucun partenariat n est sous-entendu', () => {
    // Le retour client l'exige : citer une marque ne doit pas laisser croire a
    // un partenariat officiel.
    expect(CONTENUS.fr.commun.base.mention).toMatch(/partenaire/i)
    expect(CONTENUS.en.commun.base.mention).toMatch(/partner/i)
  })
})

describe('les bandes defilantes', () => {
  // `Defilement` rend chaque liste deux fois et cle sur la valeur. Un doublon
  // dans la liste donne donc deux enfants de meme cle, et React n'y garantit
  // plus l'identite des elements. La contrainte porte sur la donnee, pas sur le
  // composant : c'est ici qu'elle se verifie.
  it('aucun marche n est en double', () => {
    for (const langue of LANGUES) {
      const liste = CONTENUS[langue].commun.marches.liste
      expect(new Set(liste).size, `${langue} : ${liste.join(', ')}`).toBe(liste.length)
    }
  })

  it('aucun outil n est en double dans sa rangee', () => {
    OUTILS.forEach((rangee, indice) => {
      expect(new Set(rangee).size, `rangee ${indice} : ${rangee.join(', ')}`).toBe(rangee.length)
    })
  })
})
