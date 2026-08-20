import { Bricolage_Grotesque, IBM_Plex_Mono, Outfit } from 'next/font/google'

import { LANGUES } from '@/content/langues'
import type { Langue } from '@/content/langues'

import '../globals.css'
import { resoudre } from './resoudre'

// Les noms des variables sont un invariant avec le bloc `@theme inline` de
// globals.css : toute autre valeur casse la typographie sans erreur.
// La police des titres de la maquette de reference. Variable : une seule
// requete couvre toutes les graisses.
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bricolage',
})

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
})

// Reservee aux etiquettes techniques des blocs visuels de la maquette. Un seul
// poids : elle ne porte jamais de texte courant.
const plexMono = IBM_Plex_Mono({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plex-mono',
})

// Sans elle, la route dynamique fait echouer l'export statique.
export function generateStaticParams(): Array<{ langue: Langue }> {
  return LANGUES.map((langue) => ({ langue }))
}

/**
 * Le layout racine ne declare aucune metadonnee.
 *
 * Depuis le passage a six pages (WEB-11), le canonique et le bloc `hreflang`
 * dependent de la page et non de la langue seule : declares ici, ils
 * designeraient la racine de langue depuis `/fr/services/`. Chaque page les
 * produit par `metadonnees()`.
 */
export default async function LayoutRacine({ children, params }: LayoutProps<'/[langue]'>) {
  const { langue } = resoudre((await params).langue)

  return (
    <html lang={langue} className={`${bricolage.variable} ${outfit.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
