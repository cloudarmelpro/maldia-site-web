import { Archivo, IBM_Plex_Mono } from 'next/font/google'

import { LANGUES } from '@/content/langues'
import type { Langue } from '@/content/langues'

import '../globals.css'
import { resoudre } from './resoudre'

/**
 * Les deux polices du design, et leurs deux roles.
 *
 * Archivo porte tout le texte lu — titres et corps. Variable de 300 a 700 : une
 * seule requete couvre les deux graisses que le design emploie, 400 et 500.
 *
 * IBM Plex Mono ne porte que les etiquettes en capitales espacees. Deux graisses
 * suffisent, et les demander explicitement evite de telecharger une variable
 * entiere pour un role aussi etroit.
 *
 * Les noms des variables sont un invariant avec le bloc `@theme inline` de
 * globals.css : toute autre valeur casse la typographie sans erreur.
 */
const archivo = Archivo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-archivo',
})

const plexMono = IBM_Plex_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono-plex',
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
    <html lang={langue} className={`${archivo.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
