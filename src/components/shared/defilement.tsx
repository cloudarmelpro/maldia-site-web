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
 * La liste est rendue deux fois et l'animation translate de la moitie : c'est
 * ce qui rend la boucle invisible. Le second exemplaire est masque aux lecteurs
 * d'ecran, sinon chaque libelle serait annonce en double.
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
  className,
  rendu,
}: {
  items: readonly string[]
  allure?: Allure
  className?: string
  rendu: (item: string) => ReactNode
}) {
  return (
    <div className={classes('overflow-hidden motion-reduce:overflow-x-auto', className)}>
      <div className={`flex w-max items-center ${ALLURES[allure]}`}>
        <ul className="flex w-max items-center">
          {items.map((item) => (
            <li key={item} className="flex-none">
              {rendu(item)}
            </li>
          ))}
        </ul>
        <ul aria-hidden className="flex w-max items-center">
          {items.map((item) => (
            <li key={item} className="flex-none">
              {rendu(item)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/** Le masque en degrade du design : les bandes s'effacent sur les deux bords. */
export const MASQUE_BANDE =
  '[mask-image:linear-gradient(90deg,transparent,#000_5%,#000_95%,transparent)]'
