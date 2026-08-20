export type Langue = 'fr' | 'en'

export const LANGUES: readonly Langue[] = ['fr', 'en']

/** Décision 0008 — arrêtée. */
export const SITE_URL = 'https://agencemaldia.com'

/** Le français est servi à la racine, quelle que soit la langue du navigateur (décision 0014). */
export const LANGUE_PAR_DEFAUT: Langue = 'fr'

// Les six pages du menu (WEB-11), dans l'ordre où elles y paraissent.
export const PAGES = ['accueil', 'services', 'talents', 'a-propos', 'blog', 'contact'] as const

export type Page = (typeof PAGES)[number]

// Segments identiques dans les deux langues. Quatre des six s'écrivent pareil
// en français et en anglais ; traduire les deux autres rendrait les
// déclarations hreflang asymétriques — le piège que le CLAUDE.md signale —
// pour deux mots. À rouvrir si le site dépasse la vitrine (décision 0015).
const SEGMENTS: Record<Page, string> = {
  accueil: '',
  services: 'services',
  talents: 'talents',
  'a-propos': 'a-propos',
  blog: 'blog',
  contact: 'contact',
}

/** `trailingSlash: true` est actif : la barre finale fait correspondre ces chemins à l'export. */
export function chemin(langue: Langue, page: Page = 'accueil'): string {
  const segment = SEGMENTS[page]
  return segment ? `/${langue}/${segment}/` : `/${langue}/`
}

// Un article porte le même identifiant dans les deux langues : c'est ce qui
// permet au sélecteur de langue de mener au même article, et non à l'index.
export function cheminArticle(langue: Langue, identifiant: string): string {
  return `/${langue}/blog/${identifiant}/`
}

/** Endonymes : « Français » s'écrit pareil en anglais, et « English » en français. */
export const NOMS_LANGUES: Record<Langue, string> = {
  fr: 'Français',
  en: 'English',
}

export function estLangue(valeur: string): valeur is Langue {
  return (LANGUES as readonly string[]).includes(valeur)
}
