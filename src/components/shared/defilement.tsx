import type { ReactNode } from 'react'

import { classes } from '@/components/shared/classes'

/** Les quatre allures du design, une par bande. */
export type Allure = 'normale' | 'lente' | 'tres-lente' | 'inverse'

const ALLURES: Record<Allure, string> = {
  normale: 'motion-safe:animate-defilement',
  lente: 'motion-safe:animate-defilement-lent',
  'tres-lente': 'motion-safe:animate-defilement-tres-lent',
  inverse: 'motion-safe:animate-defilement-inverse',
}

/**
 * Une bande defilante. Entierement en CSS : aucun etat, aucun effet, donc aucun
 * composant client — et elle reste lisible sans JavaScript.
 *
 * **Passer la liste une seule fois.** C'est ce composant qui la repete, et
 * l'animation translate de la moitie : c'est ce qui rend la boucle invisible.
 * Une liste deja repetee par l'appelant produirait des cles React en double —
 * React n'y garantit alors plus l'identite des enfants.
 *
 * **`copies` decide de la largeur de la bande, et deux ne suffisent pas
 * toujours.** L'animation fait defiler la MOITIE des copies ; l'autre moitie
 * doit donc a elle seule couvrir la fenetre, sinon un vide apparait a droite en
 * fin de cycle. `e2e/adaptation.spec.ts` le mesure a chaque largeur.
 *
 * Seule la premiere copie est lue : les suivantes sont masquees aux lecteurs
 * d'ecran, sinon chaque libelle serait annonce plusieurs fois.
 *
 * `motion-safe:` coupe le defilement quand le visiteur reduit le mouvement — une
 * bande qui defile sans fin est le pire cas pour un trouble vestibulaire.
 *
 * Immobile, la liste depasse du cadre et la fin serait perdue : `motion-reduce`
 * rend alors la bande defilable a la main. Sans ca, reduire le mouvement
 * masquerait du contenu au lieu de seulement l'arreter.
 */
export function Defilement({
  items,
  allure = 'normale',
  copies = 2,
  className,
  rendu,
}: {
  items: readonly string[]
  allure?: Allure
  /** Nombre pair de copies. La moitie doit couvrir la fenetre a elle seule. */
  copies?: number
  className?: string
  rendu: (item: string) => ReactNode
}) {
  return (
    <div
      data-defilement
      className={classes('overflow-hidden motion-reduce:overflow-x-auto', className)}
    >
      <div className={classes('flex w-max items-center', ALLURES[allure])}>
        {Array.from({ length: copies }, (_, copie) => (
          <ul
            key={copie}
            aria-hidden={copie > 0 || undefined}
            className="flex w-max items-center"
          >
            {items.map((item) => (
              <li key={item} className="flex-none">
                {rendu(item)}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}

/** Le masque en degrade du design : les bandes s'effacent sur les deux bords. */
export const MASQUE_BANDE =
  '[mask-image:linear-gradient(90deg,transparent,#000_5%,#000_95%,transparent)]'
