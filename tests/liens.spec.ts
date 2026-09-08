import { describe, expect, it } from 'vitest'

import {
  DESTINATION_CANDIDATURE,
  DESTINATION_FORMULAIRE,
  DESTINATION_RENDEZ_VOUS,
} from '@/content/liens'

// Ce fichier n'existait que pour echouer, et il disait ce qu'il faudrait en
// faire : « il tombera le jour ou les destinations seront remplies — et c'est a
// ce moment-la qu'il faudra le remplacer par une verification de la FORME de
// l'adresse ».
//
// Le 8 septembre 2026, la premiere des trois a ete tranchee. Son cas est donc
// devenu une verification de forme ; les deux autres attendent encore, et leur
// cas continue d'echouer avec le message qui dit a qui demander.
describe('les destinations sortantes', () => {
  it('WEB-1, WEB-2, WEB-3 — la candidature mene au portail public des candidats', () => {
    // ── CE QUE CE CAS ATTRAPE, ET IL A REMPLACE UN `not.toBe('')` ──────────
    //
    // Un `not.toBe('')` cesse de proteger a la seconde ou on remplit la
    // constante : n'importe quelle chaine le satisfait, y compris un chemin
    // relatif, un `mailto:`, ou une adresse recopiee de travers. La forme,
    // elle, continue de dire quelque chose apres que la decision est prise.
    const adresse = DESTINATION_CANDIDATURE
    expect(adresse, 'DESTINATION_CANDIDATURE est vide').not.toBe('')

    // Absolue et chiffree : ce bouton part vers un AUTRE domaine que celui-ci.
    // Un chemin relatif y menerait a une page de ce site qui n'existe pas.
    expect(adresse, 'la destination doit etre une adresse https absolue').toMatch(
      /^https:\/\//,
    )

    // 0007 a ecarte le courriel, et pour un motif qui survit a la decision :
    // une adresse publiee ne se retire pas.
    expect(adresse, '0007 a ecarte le courriel comme destination').not.toMatch(
      /^mailto:/,
    )

    // 0008 a arrete le sous-domaine du portail public des candidats. Le lier
    // ici empeche qu'on pointe un jour vers l'administration privee, qui porte
    // un autre sous-domaine et n'accepte personne sans compte.
    expect(
      new URL(adresse).hostname,
      'le bouton mene au portail public (0008), pas a l administration privee',
    ).toBe('cv.agencemaldia.com')
  })

  it('WEB-7 — la prise de rendez-vous mene au calendrier', () => {
    expect(
      DESTINATION_RENDEZ_VOUS,
      'adresse Cal.com manquante : la demander au client',
    ).not.toBe('')
  })

  it('WEB-7 — le formulaire de contact part quelque part', () => {
    // Vide, les deux boutons d'envoi de la page Contact sont desactives : un
    // formulaire qui avale une candidature sans destinataire est pire qu'un
    // formulaire absent. Voir decision 0019.
    expect(
      DESTINATION_FORMULAIRE,
      'point de reception du formulaire non arrete : voir docs/decisions/0019',
    ).not.toBe('')
  })
})
