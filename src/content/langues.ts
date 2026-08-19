export type Langue = 'fr' | 'en'

export const LANGUES: readonly Langue[] = ['fr', 'en']

/** Décision 0008 — arrêtée. */
export const SITE_URL = 'https://agencemaldia.com'

// Identiques dans les deux langues : les ancres ne sont pas indexées
// séparément et doivent survivre au changement de langue.
export const ANCRES = ['talents', 'entreprises', 'profils', 'a-propos', 'contact', 'faq'] as const

export type Ancre = (typeof ANCRES)[number]

/** Endonymes : « Français » s'écrit pareil en anglais, et « English » en français. */
export const NOMS_LANGUES: Record<Langue, string> = {
  fr: 'Français',
  en: 'English',
}

export function cheminDeLangue(langue: Langue): `/${Langue}/` {
  return `/${langue}/`
}
