import type { ReactNode } from 'react'

import { chemin, cheminArticle } from '@/content/langues'
import type { Langue, Page } from '@/content/langues'
import type { Contenu } from '@/content/types'
import { EnTete } from '@/components/layout/en-tete'
import { Pied } from '@/components/layout/pied'
import { ContactBlocs } from '@/components/sections/contact-blocs'
import { autreLangue } from '@/components/shared/autre-langue'
import { RetourEnHaut } from '@/components/shared/retour-en-haut'

/**
 * L'habillage commun aux six pages (WEB-11).
 *
 * L'en-tete n'est pas rendu ici mais passe a la page : le design le pose **sur**
 * le hero, dans le meme aplat. Rendu avant `main`, il aurait son propre fond et
 * la photo commencerait dessous.
 *
 * Le bloc d'appel et le pied partagent une seule bande sombre, comme dans le
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
  /** Le contenu de la page. Le premier element recoit `enTete`. */
  children: (enTete: ReactNode) => ReactNode
}) {
  const autre = autreLangue(langue)
  const cheminAutreLangue = article ? cheminArticle(autre, article) : chemin(autre, page)

  const enTete = (
    <EnTete
      langue={langue}
      page={page}
      contenu={contenu.commun.enTete}
      cheminAutreLangue={cheminAutreLangue}
    />
  )

  return (
    <>
      <main>{children(enTete)}</main>
      <ContactBlocs
        contenu={contenu.commun.contact}
        pied={
          <Pied
            langue={langue}
            page={page}
            contenu={contenu.commun.pied}
            cheminAutreLangue={cheminAutreLangue}
            changerDeLangue={contenu.commun.enTete.changerDeLangue}
          />
        }
      />
      <RetourEnHaut libelle={contenu.commun.retourEnHaut} />
    </>
  )
}
