import { Jost } from 'next/font/google'

import { LANGUES } from '@/content/langues'
import type { Langue } from '@/content/langues'

import '../globals.css'
import { resoudre } from './resoudre'

/**
 * La police unique du design. Elle porte tout : titres, texte lu, etiquettes.
 *
 * Variable de 200 a 700 : le design emploie 200 pour les tres grands chiffres,
 * 300 pour le texte lu, 400 pour les titres, et interpole la graisse d'une
 * question de la FAQ de 300 a 600 a l'ouverture. Une fonte a graisses fixes ne
 * saurait pas faire cette derniere.
 *
 * Le nom de la variable est un invariant avec le bloc `@theme inline` de
 * globals.css : toute autre valeur casse la typographie sans erreur.
 */
const jost = Jost({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jost',
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
    /*
     * `suppressHydrationWarning` ne porte que sur cet element, jamais sur son
     * sous-arbre : les ecarts reels de nos composants restent signales.
     *
     * Il est la parce que des tiers ecrivent sur `<html>` avant l'hydratation —
     * le mode appareil de DevTools y pose `simulator-touch`, une extension peut
     * en poser d'autres, et Lenis y ajoute les siennes. Aucun n'existe au
     * rendu : React voyait donc un ecart a chaque fois, et le signalait.
     *
     * Sans risque ici : `lang` et `className` sont les deux seuls attributs
     * qu'on pose, et tous deux sont determines par la langue de la page.
     */
    <html lang={langue} className={jost.variable} suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  )
}
