import type { ReactNode } from 'react'

import { classes } from '@/components/shared/classes'

/** Les valeurs du design : 64 px au plancher, 7vw ensuite, 112 px au plafond. */
const HAUT = 'pt-[clamp(4rem,7vw,7rem)]'
const BAS = 'pb-[clamp(4rem,7vw,7rem)]'

/** Le padding bas plus court que le design pose sur sa premiere section. */
export const BAS_COURT = 'pb-[clamp(3.5rem,6vw,6rem)]'

export type Fond = 'fond' | 'fond-2' | 'encre' | 'nuit'

const FONDS: Record<Fond, string> = {
  fond: 'bg-fond',
  'fond-2': 'bg-fond-2',
  encre: 'bg-encre text-white',
  nuit: 'bg-nuit text-white',
}

/**
 * La gouttiere de page du design : 1400 px de large, marges de 20 a 56 px.
 *
 * Un seul endroit : une largeur qui diverge d'un bloc a l'autre ne se voit
 * qu'a l'usage.
 */
export const CONTENEUR = 'mx-auto w-full max-w-[87.5rem] px-[clamp(1.25rem,4vw,3.5rem)]'

/**
 * Le decalage qui aligne un bloc sur la colonne de contenu, quand il n'est pas
 * lui-meme dans la grille a deux colonnes. C'est la largeur de la colonne
 * d'intitule plus la gouttiere — la meme expression que la grille.
 */
export const DECALAGE_CONTENU =
  'large:ml-[calc(11.875rem+clamp(1.75rem,2.8vw,2.75rem))]'

/**
 * La grille signature du design : une colonne d'intitule de 190 px a gauche,
 * le contenu a droite. Sous 1000 px elle se replie en une colonne, et
 * l'intitule passe simplement au-dessus.
 */
export const GRILLE_INTITULE =
  'grid grid-cols-1 gap-[clamp(1.5rem,2.8vw,2.125rem)] large:grid-cols-[minmax(0,11.875rem)_minmax(0,1fr)] large:gap-[clamp(1.75rem,2.8vw,2.75rem)] [&>*]:min-w-0'

/**
 * Une section du design : un aplat pleine largeur, sans arrondi.
 *
 * Le geste des blocs arrondis qui montaient l'un sur l'autre a disparu avec la
 * refonte — les sections sont maintenant des bandes franches, et c'est
 * l'alternance clair / sombre qui marque le rythme.
 */
export function Section({
  titreId,
  fond = 'fond',
  bas,
  className,
  children,
}: {
  /** Doit etre l'id du titre rendu dans children : c'est lui que aria-labelledby vise. */
  titreId: string
  fond?: Fond
  /**
   * Classe de padding bas, quand le design en pose une autre que le haut. Deux
   * de ses sections sont asymetriques ; les autres non.
   */
  bas?: string
  className?: string
  children: ReactNode
}) {
  return (
    <section
      aria-labelledby={titreId}
      className={classes(FONDS[fond], HAUT, bas ?? BAS, className)}
    >
      <div className={CONTENEUR}>{children}</div>
    </section>
  )
}
