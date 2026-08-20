'use client'

import { LazyMotion, domAnimation, useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'
import type { ReactNode } from 'react'

// Les valeurs du design : 580 ms, 20 px, et la courbe de sa transition.
const DUREE_SECONDES = 0.58
const COURBE = [0.22, 1, 0.36, 1] as const
const DEPLACEMENT = 20

// Le design declenche a 12 % de visibilite, avec une marge basse de 6 % : un
// element n'apparait donc pas des que son premier pixel entre dans la fenetre.
const PROPORTION_VISIBLE = 0.12
const MARGE_BASSE = '0px 0px -6% 0px'

type ApparitionProps = {
  /** En millisecondes — delaiDeGrille(indice) pour les grilles. */
  delai?: number
  className?: string
  children: ReactNode
}

/**
 * Entree au defilement.
 *
 * Le contenu est rendu a `opacity: 0` dans le HTML statique : reserve au
 * contenu sous la ligne de flottaison — jamais le hero ni les deux appels
 * (WEB-2). Mouvement reduit : duree et delai nuls, le meme arbre est rendu — le
 * mouvement est coupe, pas raccourci.
 */
export function Apparition({ delai = 0, className, children }: ApparitionProps) {
  const reduit = useReducedMotion() ?? false

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        initial={{ opacity: 0, y: DEPLACEMENT }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: PROPORTION_VISIBLE, margin: MARGE_BASSE }}
        transition={
          reduit
            ? { duration: 0, delay: 0 }
            : { duration: DUREE_SECONDES, ease: COURBE, delay: delai / 1000 }
        }
        className={className}
      >
        {children}
      </m.div>
    </LazyMotion>
  )
}
