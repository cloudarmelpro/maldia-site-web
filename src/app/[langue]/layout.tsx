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
 * Une actualisation repart du haut de la page.
 *
 * Laissee a `auto`, la restauration du navigateur rend la page a une position
 * qui n'est pas celle qu'on avait : mesure sur l'export, depuis le haut du hero
 * et apres deux secondes d'immobilite, `Ctrl+R` atterrit a 484, 642 ou 803 px
 * selon l'essai. Le defaut est anterieur a toute animation — verifie en
 * recompilant le depot sans elles.
 *
 * Ce script doit s'executer a l'analyse du document : pose a l'hydratation, le
 * navigateur aurait deja restaure. Il ne peut donc pas etre un effet React.
 *
 * Ce que ca coute : le retour arriere ne rend plus la position non plus. Next
 * ne touche jamais `scrollRestoration` — il laisse le navigateur faire — donc
 * ce reglage vaut pour les deux gestes, pas seulement l'actualisation.
 */
const RESTAURATION_MANUELLE = "history.scrollRestoration = 'manual'"

/**
 * Le layout racine ne declare aucune metadonnee : le canonique et le bloc
 * `hreflang` dependent de la page et non de la langue seule (WEB-11). Chaque
 * page les produit par `metadonnees()`.
 */
export default async function LayoutRacine({ children, params }: LayoutProps<'/[langue]'>) {
  const { langue } = resoudre((await params).langue)

  return (
    <html lang={langue} className={jost.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: RESTAURATION_MANUELLE }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
