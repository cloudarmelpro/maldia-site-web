// Les deux destinations sortantes du site. Vides tant qu'elles ne sont pas
// arretees : `tests/liens.spec.ts` echoue, et un bouton mort ne peut pas partir
// en production par oubli. Voir docs/decisions/0007.
//
// Une seule constante par destination, jamais un href recopie : le bouton
// « Deposer ma candidature » parait a quatre endroits (WEB-1, WEB-2, WEB-3).

/** Decision 0007 — reportee. Courriel, formulaire tiers, ou cv.agencemaldia.com. */
export const DESTINATION_CANDIDATURE = ''

/** WEB-7 — le calendrier Cal.com deja utilise par le client. */
export const DESTINATION_RENDEZ_VOUS = ''
