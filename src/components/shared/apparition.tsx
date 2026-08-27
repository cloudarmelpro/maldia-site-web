'use client'

import { LazyMotion, domAnimation, useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'
import type { ReactNode } from 'react'

// La courbe de sortie du design.
const COURBE = [0.16, 1, 0.3, 1] as const

/**
 * Les deux registres d'entree du design.
 *
 * `texte` — titres et paragraphes : 22 px et un leger flou, sur 720 ms.
 * `bloc` — tout le reste : 16 px, sans flou, sur 580 ms.
 */
export type RegistreApparition = 'texte' | 'bloc'

const REGISTRES: Record<RegistreApparition, { deplacement: number; flou: number; duree: number }> = {
  texte: { deplacement: 22, flou: 6, duree: 0.72 },
  bloc: { deplacement: 16, flou: 0, duree: 0.58 },
}

// Le design declenche a 5 % de visibilite : un bloc haut n'attend pas d'etre
// entierement dans la fenetre pour paraitre.
const PROPORTION_VISIBLE = 0.05

type ApparitionProps = {
  /** En millisecondes — delaiDeGrille(indice) pour les grilles. */
  delai?: number
  registre?: RegistreApparition
  className?: string
  children: ReactNode
}

/**
 * Entree au defilement.
 *
 * Le contenu est rendu a `opacity: 0` dans le HTML statique : reserve au
 * contenu sous la ligne de flottaison — jamais le hero ni les deux appels
 * (WEB-2). Mouvement reduit : duree et delai nuls, le meme arbre est rendu — le
 * mouvement est coupe, pas raccourci, et le flou ne s'applique pas.
 *
 * **Le flou du registre `texte` est une demande du design.** Le dossier
 * `design-motion-principles` de ce depot range le flou a l'entree parmi les
 * motifs a eviter, et `filter` n'est ni `transform` ni `opacity` — c'est la
 * seule propriete animee ici qui sorte de cette regle. Elle est tenue courte et
 * coupee des que le visiteur reduit le mouvement.
 */
export function Apparition({
  delai = 0,
  registre = 'bloc',
  className,
  children,
}: ApparitionProps) {
  const reduit = useReducedMotion() ?? false
  const { deplacement, flou, duree } = REGISTRES[registre]

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        initial={{
          opacity: 0,
          y: deplacement,
          filter: flou > 0 ? `blur(${flou}px)` : 'blur(0px)',
        }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, amount: PROPORTION_VISIBLE }}
        transition={
          reduit
            ? { duration: 0, delay: 0 }
            : { duration: duree, ease: COURBE, delay: delai / 1000 }
        }
        className={className}
      >
        {children}
      </m.div>
    </LazyMotion>
  )
}
