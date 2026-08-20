import { DM_Sans } from 'next/font/google'

import { LANGUES } from '@/content/langues'
import type { Langue } from '@/content/langues'

import '../globals.css'
import { resoudre } from './resoudre'

/**
 * DM Sans, et elle seule.
 *
 * Une police pour tout le site : titres, corps, libelles, chiffres. Le nom de
 * la variable est un invariant avec le bloc `@theme inline` de globals.css —
 * toute autre valeur casse la typographie sans erreur de compilation.
 *
 * Variable : une seule requete couvre toutes les graisses, de 100 a 1000. La
 * graisse de reference du site est Light (300), posee sur `body`.
 */
const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans',
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
    <html lang={langue} className={dmSans.variable}>
      <body>{children}</body>
    </html>
  )
}
