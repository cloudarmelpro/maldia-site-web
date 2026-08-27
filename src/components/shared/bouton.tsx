import { ArrowUpRight } from 'lucide-react'
import type { ReactNode } from 'react'

import { DESTINATION_CANDIDATURE, DESTINATION_RENDEZ_VOUS } from '@/content/liens'
import { Fleche } from '@/components/shared/fleche'
import { Lien } from '@/components/shared/lien'

/**
 * Les deux seules destinations sortantes du site. Elles restent des constantes
 * et non des `href` recopies : le jour ou elles se decident, c'est une ligne
 * (decision 0007). Vides aujourd'hui, et `tests/liens.spec.ts` echoue tant
 * qu'elles le sont — aucun repli n'est prevu ici, un repli silencieux ferait
 * passer la porte de verification et mettrait un bouton mort en production.
 */
export type Destination = 'candidature' | 'rendezVous'

const DESTINATIONS: Record<Destination, string> = {
  candidature: DESTINATION_CANDIDATURE,
  rendezVous: DESTINATION_RENDEZ_VOUS,
}

/** Les cinq registres d'appel du design. */
export type Variante = 'encre' | 'vert' | 'voile' | 'blanc' | 'contour' | 'contour-clair'

const VARIANTES: Record<Variante, string> = {
  encre: 'bg-encre text-white hover:bg-primaire focus-visible:outline-encre',
  /** La surface d'action du design, sur fond clair. */
  vert: 'bg-primaire text-white hover:bg-primaire-fonce focus-visible:outline-encre',
  /**
   * La seconde action SUR le vert. Le voile est sombre et jamais blanc : un
   * voile blanc eclaircirait le vert et ferait passer le texte blanc sous AA.
   */
  voile: 'bg-voile/26 text-white hover:bg-voile/36 focus-visible:outline-white',
  blanc: 'bg-white text-encre hover:-translate-y-0.5 focus-visible:outline-white',
  contour:
    'border border-trait-4 bg-white text-encre hover:bg-encre hover:text-white focus-visible:outline-encre',
  'contour-clair':
    'border border-white/28 text-white hover:bg-white/12 focus-visible:outline-white',
}

/**
 * 46 px par defaut, 44 pour un appel dans une carte.
 *
 * Le design pose 42 px sur le second. Deux pixels le mettraient sous la cible
 * tactile de 44 — un ecart invisible a l'oeil, mesure par la suite d'ecrans.
 */
export type TailleAppel = 'normale' | 'compacte' | 'haute'

const TAILLES: Record<TailleAppel, string> = {
  normale: 'min-h-[2.875rem] px-5',
  compacte: 'min-h-11 px-4.5',
  haute: 'min-h-[3.125rem] px-5.5',
}

// La transition est restreinte aux couleurs de surface et au deplacement : la
// liste `transition-colors` de Tailwind inclut outline-color, et l'anneau de
// focus mettrait la duree de la transition a devenir visible.
const BASE =
  'inline-flex min-w-11 items-center justify-center gap-2.5 rounded-bloc etiquette whitespace-nowrap transition-[color,background-color,border-color,transform] duration-[220ms] focus-visible:outline-2 focus-visible:outline-offset-2'

/** L'ornement de fin d'appel du design : une fleche, ou l'etoile a quatre branches. */
export type Ornement = 'fleche' | 'fleche-montante' | 'etoile' | 'aucun'

function Marque({ ornement, couleur }: { ornement: Ornement; couleur?: string }) {
  if (ornement === 'fleche') return <Fleche />
  if (ornement === 'fleche-montante')
    return <ArrowUpRight aria-hidden className="size-3.5 shrink-0" />
  if (ornement === 'etoile')
    return (
      <span aria-hidden className={couleur ?? 'text-vert-clair'}>
        ✦
      </span>
    )
  return null
}

type CommunAppel = {
  libelle: ReactNode
  variante?: Variante
  taille?: TailleAppel
  ornement?: Ornement
  /** Couleur de l'etoile, quand la variante ne la determine pas. */
  couleurOrnement?: string
  className?: string
  /** Nom accessible, quand plusieurs appels au meme libelle coexistent. */
  'aria-label'?: string
}

export function Bouton({
  destination,
  libelle,
  variante = 'encre',
  taille = 'normale',
  ornement = 'aucun',
  couleurOrnement,
  className,
  'aria-label': nomAccessible,
}: CommunAppel & { destination: Destination }) {
  return (
    <a
      href={DESTINATIONS[destination]}
      aria-label={nomAccessible}
      className={`${BASE} ${TAILLES[taille]} ${VARIANTES[variante]}${className ? ` ${className}` : ''}`}
    >
      {libelle}
      <Marque ornement={ornement} couleur={couleurOrnement} />
    </a>
  )
}

/**
 * Le meme appel, vers une autre page du site (WEB-11). Il ne passe pas par les
 * constantes de `liens.ts` : une adresse interne est produite par `chemin()`,
 * il n'y a rien a y proteger.
 */
export function BoutonPage({
  vers,
  libelle,
  variante = 'encre',
  taille = 'normale',
  ornement = 'aucun',
  couleurOrnement,
  className,
  'aria-label': nomAccessible,
}: CommunAppel & { vers: string }) {
  return (
    <Lien
      href={vers}
      aria-label={nomAccessible}
      className={`${BASE} ${TAILLES[taille]} ${VARIANTES[variante]}${className ? ` ${className}` : ''}`}
    >
      {libelle}
      <Marque ornement={ornement} couleur={couleurOrnement} />
    </Lien>
  )
}
