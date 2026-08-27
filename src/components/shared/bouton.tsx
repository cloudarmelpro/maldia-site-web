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

/**
 * Les quatre registres d'appel reellement employes.
 *
 * `encre` et `contour-clair` ont ete retires : aucun appelant, et `encre`
 * etait la valeur PAR DEFAUT. Un `<Bouton>` ecrit sans variante rendait donc
 * `#0f1d17` — la charte sombre que la decision 0023 declare supprimee — sans
 * que personne l'ait demandee. La variante est desormais **exigee** : c'est la
 * seule facon que ce cas ne revienne pas.
 */
export type Variante = 'vert' | 'voile' | 'blanc' | 'contour'

const VARIANTES: Record<Variante, string> = {
  /** La surface d'action du design, sur fond clair. */
  vert: 'bg-primaire text-white hover:bg-primaire-fonce focus-visible:outline-encre',
  /**
   * La seconde action SUR le vert. Le voile est sombre et jamais blanc : un
   * voile blanc eclaircirait le vert et ferait passer le texte blanc sous AA.
   */
  voile: 'bg-voile/26 text-white hover:bg-voile/36 focus-visible:outline-white',
  blanc: 'bg-white text-encre hover:-translate-y-0.5 focus-visible:outline-white',
  contour:
    'text-encre shadow-[inset_0_0_0_1px_var(--color-trait-4)] hover:-translate-y-0.5 focus-visible:outline-encre',
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

/**
 * L'ornement de fin d'appel. Les neuf appels ornes passent tous `fleche` :
 * `fleche-montante` et `etoile` n'avaient aucun appelant. L'etoile etait de
 * plus un caractere pose la ou le depot demande une icone de `lucide-react`.
 */
export type Ornement = 'fleche' | 'aucun'

type CommunAppel = {
  libelle: ReactNode
  variante: Variante
  taille?: TailleAppel
  ornement?: Ornement
  className?: string
  /** Nom accessible, quand plusieurs appels au meme libelle coexistent. */
  'aria-label'?: string
}

export function Bouton({
  destination,
  libelle,
  variante,
  taille = 'normale',
  ornement = 'aucun',
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
      {ornement === 'fleche' ? <Fleche /> : null}
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
  variante,
  taille = 'normale',
  ornement = 'aucun',
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
      {ornement === 'fleche' ? <Fleche /> : null}
    </Lien>
  )
}
