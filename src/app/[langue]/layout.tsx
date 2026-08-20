import { DM_Sans } from 'next/font/google'

import { LANGUES } from '@/content/langues'
import type { Langue } from '@/content/langues'

import '../globals.css'
import { resoudre } from './resoudre'

/**
 * La police unique du design. Elle porte tout : titres, texte lu, etiquettes.
 *
 * `axes: ['opsz']` demande l'axe de taille optique, que le design appelle
 * (`opsz@9..40`). Sans lui la police se figerait sur un seul dessin, et le
 * titre a 104 px porterait celui concu pour du texte a 14 px.
 *
 * Le nom de la variable est un invariant avec le bloc `@theme inline` de
 * globals.css : toute autre valeur casse la typographie sans erreur.
 */
const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  axes: ['opsz'],
  variable: '--font-dm-sans',
})

// Sans elle, la route dynamique fait echouer l'export statique.
export function generateStaticParams(): Array<{ langue: Langue }> {
  return LANGUES.map((langue) => ({ langue }))
}

/**
 * Le layout racine ne declare aucune metadonnee : le canonique et le bloc
 * `hreflang` dependent de la page et non de la langue seule (WEB-11). Chaque
 * page les produit par `metadonnees()`.
 */
export default async function LayoutRacine({ children, params }: LayoutProps<'/[langue]'>) {
  const { langue } = resoudre((await params).langue)

  return (
    <html lang={langue} className={dmSans.variable}>
      <body>{children}</body>
    </html>
  )
}
