import type { Langue } from './langues'

const LOCALES: Record<Langue, string> = {
  fr: 'fr-CA',
  en: 'en-CA',
}

/**
 * La date d'un article, telle qu'elle s'affiche.
 *
 * `timeZone: 'UTC'` n'est pas un detail : une date ISO sans heure est analysee
 * a minuit UTC, et la formater dans le fuseau de la machine de compilation
 * reculerait le jour d'un cran a l'ouest de Greenwich. L'export serait alors
 * different selon l'ordinateur qui compile.
 */
export function dateFormatee(iso: string, langue: Langue): string {
  return new Intl.DateTimeFormat(LOCALES[langue], {
    dateStyle: 'long',
    timeZone: 'UTC',
  }).format(new Date(iso))
}
