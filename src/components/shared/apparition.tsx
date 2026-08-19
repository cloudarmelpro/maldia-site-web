'use client'

import { LazyMotion, domAnimation, useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'
import type { ReactNode } from 'react'

// 450 ms et 22 px : la maquette monte a 700 ms, le depot plafonnait a 300.
// Le client demande une entree ample ; 450 ms la donne sans que l'attente se
// remarque a la lecture. La courbe est celle de la maquette.
const DUREE_SECONDES = 0.45
const COURBE = [0.22, 0.7, 0.3, 1] as const

type ApparitionProps = {
  /** En millisecondes — delaiDeGrille(indice) pour les grilles. */
  delai?: number
  className?: string
  children: ReactNode
}

/**
 * Entrée au défilement. Le contenu est rendu à opacity: 0 dans le HTML
 * statique : réservé au contenu sous la ligne de flottaison — jamais le hero
 * ni les deux entrées (WEB-2). Mouvement réduit : durée et délai nuls, le même
 * arbre est rendu — le mouvement est coupé, pas raccourci.
 */
export function Apparition({ delai = 0, className, children }: ApparitionProps) {
  const reduit = useReducedMotion() ?? false

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
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
