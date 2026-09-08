import { describe, expect, it } from 'vitest'

import { VARIABLES, refusDeLAdresse } from '@/content/liens'

// ── CE QUE CE FICHIER VERIFIE DEPUIS LE 8 SEPTEMBRE 2026 ────────────────────
//
// Il verifiait que trois constantes du code n'etaient pas vides, et il disait
// lui-meme ce qu'il faudrait en faire : « il tombera le jour ou les
// destinations seront remplies — et c'est a ce moment-la qu'il faudra le
// remplacer par une verification de la FORME de l'adresse ».
//
// Les trois adresses viennent maintenant de l'environnement, pour qu'un
// changement d'adresse ne demande pas un commit. Un test unitaire ne peut donc
// plus rien affirmer sur elles : il tourne sans l'environnement de
// deploiement, et une variable absente au poste n'est pas un defaut.
//
// Ce qui se teste ici est la REGLE — `refusDeLAdresse`, une fonction pure. La
// porte qui l'applique aux vraies valeurs est `npm run destinations`, appelee
// par `prebuild`, et elle s'exerce au moment ou le HTML est ecrit.
//
// Le partage est celui-la : la regle se teste, les valeurs se verifient a la
// construction. Confondre les deux donnerait soit un test qui ne dit rien,
// soit une porte qu'on ne peut pas relire.

describe('les destinations sortantes — ce que la regle refuse', () => {
  it('WEB-1 / 0007 — une adresse absente est refusee, et le message nomme la variable', () => {
    for (const [nom, variable] of Object.entries(VARIABLES)) {
      const cause = refusDeLAdresse(nom as keyof typeof VARIABLES, '')
      expect(cause, `${nom} : le vide doit etre refuse`).not.toBeNull()
      expect(cause, `${nom} : le message doit nommer la variable a poser`).toContain(
        variable,
      )
    }
  })

  it('WEB-1, WEB-2, WEB-3 — une adresse relative est refusee', () => {
    // Ces trois boutons quittent ce site. Un chemin menerait a une page de
    // celui-ci qui n'existe pas — et le defaut ne se verrait qu'au clic.
    for (const relative of ['/contact', 'contact', '../cv', '//cv.agencemaldia.com']) {
      expect(
        refusDeLAdresse('candidature', relative),
        `« ${relative} » devrait etre refusee`,
      ).not.toBeNull()
    }
  })

  it('0008 — la candidature ne peut pas mener a l administration privee', () => {
    // Un candidat qui arrive sur `admin.` voit un refus : elle n'accepte
    // personne sans compte. C'est un defaut quel que soit le choix de Maldia,
    // donc une regle et non une valeur.
    expect(refusDeLAdresse('candidature', 'https://admin.agencemaldia.com')).toContain(
      'administration privee',
    )
    expect(refusDeLAdresse('candidature', 'https://cv.agencemaldia.com')).toBeNull()
  })

  it('0007 — le courriel reste ecarte pour la candidature', () => {
    // Le motif survit a la decision : une adresse publiee sur un site ne se
    // retire pas. Pour l'employer, il faut amender 0007 — pas contourner la
    // verification.
    expect(refusDeLAdresse('candidature', 'mailto:contact@agencemaldia.com')).toContain(
      '0007',
    )
  })

  it('0019 — le point de reception du formulaire ne peut pas etre en clair', () => {
    // Il recoit un nom, un courriel, un besoin et un CV. `http://` les
    // enverrait lisibles sur le reseau.
    expect(refusDeLAdresse('formulaire', 'http://formulaire.test/envoi')).toContain(
      'clair',
    )
    expect(refusDeLAdresse('formulaire', 'https://formulaire.test/envoi')).toBeNull()
  })

  it('WEB-7 — un calendrier en http passe : ce n est pas un point de depot', () => {
    // La regle du chiffrement ne vaut que pour le formulaire, qui porte des
    // donnees personnelles. L'imposer partout ferait une regle qu'on ne
    // saurait plus expliquer, et une regle inexpliquee finit contournee.
    expect(refusDeLAdresse('rendezVous', 'http://cal.test/agencemaldia')).toBeNull()
    expect(refusDeLAdresse('rendezVous', 'https://cal.com/agencemaldia')).toBeNull()
  })

  it('les trois destinations sont nommees, et il n y en a pas une quatrieme', () => {
    // Une destination ajoutee sans variable serait un bouton mort que la porte
    // de construction ne verrait pas.
    expect(Object.keys(VARIABLES).sort()).toEqual([
      'candidature',
      'formulaire',
      'rendezVous',
    ])
  })
})
