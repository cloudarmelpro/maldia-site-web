import { describe, expect, it } from 'vitest'

import { DESTINATION_CANDIDATURE, DESTINATION_RENDEZ_VOUS } from '@/content/liens'

// Ce fichier n'existe que pour echouer. Il tombera le jour ou les destinations
// seront remplies — et c'est a ce moment-la qu'il faudra le remplacer par une
// verification de la forme de l'adresse.
describe('les destinations sortantes', () => {
  it('WEB-1, WEB-2, WEB-3 — la candidature mene quelque part', () => {
    expect(
      DESTINATION_CANDIDATURE,
      'decision 0007 non tranchee : remplir DESTINATION_CANDIDATURE dans src/content/liens.ts',
    ).not.toBe('')
  })

  it('WEB-7 — la prise de rendez-vous mene au calendrier', () => {
    expect(
      DESTINATION_RENDEZ_VOUS,
      'adresse Cal.com manquante : la demander au client',
    ).not.toBe('')
  })
})
