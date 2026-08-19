import type { ReactNode } from 'react'

import type { Ancre } from '@/content/langues'

// `text-encre` est délibéré : sur les fonds `vif` et `sombre`, la Section pose
// une couleur de texte claire — illisible sur la surface blanche de la carte.
//
// Aucun état de survol : la maquette n'en met sur aucune carte, seulement sur
// les liens et les boutons. Une carte qui réagit au pointeur sans être
// cliquable promet une action qui n'existe pas.
const CLASSES = 'rounded-carte bg-carte text-encre'

type CarteProps = {
  /** `li` pour une carte de grille dans un `ul`/`ol`, `article` pour un contenu autonome. */
  as?: 'div' | 'article' | 'li'
  /** Ancre de navigation, quand la carte est elle-même une cible (décision 0014). */
  ancre?: Ancre
  /** Nomme la région quand la carte porte une ancre : sans nom, ce n'est pas un repère. */
  'aria-labelledby'?: string
  className?: string
  children: ReactNode
}

export function Carte({
  as: Balise = 'div',
  ancre,
  'aria-labelledby': nommePar,
  className,
  children,
}: CarteProps) {
  return (
    <Balise
      id={ancre}
      aria-labelledby={nommePar}
      className={`${CLASSES}${className ? ` ${className}` : ''}`}
    >
      {children}
    </Balise>
  )
}
