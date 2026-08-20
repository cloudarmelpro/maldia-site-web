import type { ReactNode } from 'react'

import { chemin, cheminArticle } from '@/content/langues'
import type { Langue, Page } from '@/content/langues'
import type { Contenu } from '@/content/types'
import { EnTete } from '@/components/layout/en-tete'
import { Pied } from '@/components/layout/pied'
import { autreLangue } from '@/components/shared/autre-langue'
import { RetourEnHaut } from '@/components/shared/retour-en-haut'

/**
 * L'habillage commun aux six pages (WEB-11) : en-tête, pied, retour en haut.
 *
 * C'est ici, et nulle part ailleurs, qu'est calculée l'adresse de la même page
 * dans l'autre langue. Le sélecteur ne devine pas où il se trouve : sur un
 * article, il doit mener au même article et non à l'index du blog, et cette
 * différence ne se voit pas depuis un composant de navigation.
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
  /** Renseigné sur une page d'article : l'identifiant est commun aux deux langues. */
  article?: string
  contenu: Contenu
  children: ReactNode
}) {
  const autre = autreLangue(langue)
  const cheminAutreLangue = article ? cheminArticle(autre, article) : chemin(autre, page)

  return (
    <>
      <EnTete
        langue={langue}
        page={page}
        contenu={contenu.commun.enTete}
        cheminAutreLangue={cheminAutreLangue}
        changerDeLangue={contenu.commun.enTete.changerDeLangue}
      />
      <main>{children}</main>
      <Pied
        langue={langue}
        page={page}
        contenu={contenu.commun.pied}
        cheminAutreLangue={cheminAutreLangue}
        changerDeLangue={contenu.commun.enTete.changerDeLangue}
      />
      <RetourEnHaut libelle={contenu.commun.retourEnHaut} />
    </>
  )
}
