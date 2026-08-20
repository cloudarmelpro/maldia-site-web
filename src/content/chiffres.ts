import type { Langue } from './langues'

/**
 * WEB-13 — le compteur de candidats.
 *
 * **Un seul endroit à modifier.** Le chiffre n'est pas synchronisé avec
 * l'application CV : il se met à jour à la main, quand le site se met à jour.
 * Il est délibérément hors des fichiers de langue — un nombre ne se traduit
 * pas, et le tenir en double le ferait diverger.
 *
 * Les autres chiffres du retour client — 14 jours, 50 %, 25 % — vivent dans
 * les phrases que le client a écrites, donc dans `fr.ts` et `en.ts`.
 * `tests/chiffres.spec.ts` vérifie qu'ils paraissent dans les deux langues :
 * sans ça, une correction sur une seule passerait inaperçue.
 */
export const NOMBRE_CANDIDATS = 500

// en-CA et non en-US : le séparateur de milliers est le même, mais le client
// vise le Canada. Le format n'a d'effet visible qu'au-delà de mille.
const LOCALES: Record<Langue, string> = {
  fr: 'fr-CA',
  en: 'en-CA',
}

export function nombreFormate(valeur: number, langue: Langue): string {
  return new Intl.NumberFormat(LOCALES[langue]).format(valeur)
}
