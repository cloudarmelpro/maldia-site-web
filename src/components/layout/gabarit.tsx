import type { ReactNode } from 'react'

import { chemin, cheminArticle } from '@/content/langues'
import type { Langue, Page } from '@/content/langues'
import type { Contenu } from '@/content/types'
import { EnTete } from '@/components/layout/en-tete'
import { BarreProgression } from '@/components/shared/barre-progression'
import { Chargement } from '@/components/shared/chargement'
import { DefilementLisse } from '@/components/shared/defilement-lisse'
import { Pied } from '@/components/layout/pied'
import { ContactBlocs } from '@/components/sections/contact-blocs'
import { autreLangue } from '@/components/shared/autre-langue'
import { ChevronSection } from '@/components/shared/chevron-section'

/**
 * L'habillage commun aux six pages (WEB-11).
 *
 * L'en-tete n'est pas rendu ici mais passe a la page : le design le pose **sur**
 * le hero, dans le meme aplat. Rendu avant `main`, il aurait son propre fond et
 * la photo commencerait dessous.
 *
 * Le bloc d'appel et le pied partagent une seule bande verte, comme dans le
 * design — c'est pourquoi le pied est passe au bloc et non rendu a cote.
 *
 * C'est ici, et nulle part ailleurs, qu'est calculee l'adresse de la meme page
 * dans l'autre langue. Sur un article, le selecteur doit mener au meme article
 * et non a l'index du blog, et cette difference ne se voit pas depuis un
 * composant de navigation.
 */
export function Gabarit({
  langue,
  page,
  article,
  contenu,
  children,
}: {
  langue: Langue
  page: Page
  /** Renseigne sur une page d'article : l'identifiant est commun aux deux langues. */
  article?: string
  contenu: Contenu
  children: ReactNode
}) {
  const autre = autreLangue(langue)
  const cheminAutreLangue = article ? cheminArticle(autre, article) : chemin(autre, page)

  return (
    <>
      {/* Le voile de chargement couvre le temps que GSAP decoupe le titre du
          hero. Il se retire de lui-meme, et n'existe pas sans script. */}
      <Chargement />

      {/* Ne rend rien : il installe Lenis et le branche sur le ticker de GSAP,
          pour que les revelations se declenchent au bon point de defilement. */}
      <DefilementLisse />

      {/* Avant `main` et non dedans : elle est `fixed`, et la sortir de l'arbre
          de contenu evite qu'un `transform` pose plus bas ne cree un contexte
          qui la recalerait sur son parent au lieu de la fenetre. */}
      <BarreProgression />

      {/* Frere de `main`, et non descendu dans la premiere section. `sticky` ne
          depasse jamais son parent : rendu dans le hero, l'en-tete se
          decollerait au bas du hero. Et sa sonde de fond ne trouverait que la
          section qui l'entoure. */}
      <EnTete
        langue={langue}
        page={page}
        contenu={contenu.commun.enTete}
        cheminAutreLangue={cheminAutreLangue}
      />
      <main>{children}</main>
      <ContactBlocs
        contenu={contenu.commun.contact}
        pied={
          <Pied
            langue={langue}
            contenu={contenu.commun.pied}
            cheminAutreLangue={cheminAutreLangue}
            changerDeLangue={contenu.commun.enTete.changerDeLangue}
          />
        }
      />
      <ChevronSection libelle={contenu.commun.retourEnHaut} />
    </>
  )
}
