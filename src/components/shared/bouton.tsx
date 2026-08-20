import Link from 'next/link'

import { DESTINATION_CANDIDATURE, DESTINATION_RENDEZ_VOUS } from '@/content/liens'

/**
 * Les deux seules destinations sortantes du site. Elles restent des constantes
 * et non des `href` recopiés : le jour où elles se décident, c'est une ligne
 * (décision 0007). Vides aujourd'hui, et `tests/liens.spec.ts` échoue tant
 * qu'elles le sont — aucun repli n'est prévu ici, un repli silencieux ferait
 * passer la porte de vérification et mettrait un bouton mort en production.
 */
export type Destination = 'candidature' | 'rendezVous'

const DESTINATIONS: Record<Destination, string> = {
  candidature: DESTINATION_CANDIDATURE,
  rendezVous: DESTINATION_RENDEZ_VOUS,
}

type Variante = 'primaire' | 'contour' | 'inverse' | 'contour-clair'

// La geometrie de l'appel suit la meme droite que l'echelle de texte : elle
// croit de 768 a 1920 px, puis s'arrete.
//
// Le plancher de 2,8125rem vaut 45 px, et c'est un plancher dur : sous 768 px la
// cible tactile doit tenir 44 px, et une borne posee exactement au seuil tombe
// en dessous au sous-pixel pres. Le bouton ne peut donc pas etre rapetissi
// davantage sur telephone — seule la plage haute reste reglable.
const HAUTEUR_APPEL = 'min-h-[clamp(2.8125rem,2.7708rem+0.0868vw,2.875rem)]'

const TAILLE_APPEL =
  `${HAUTEUR_APPEL} min-w-11 px-[clamp(1rem,0.8333rem+0.3472vw,1.25rem)] text-fluide-bouton`

// La transition est restreinte aux couleurs de surface : la liste
// `transition-colors` de Tailwind inclut outline-color, et l'anneau de focus
// mettrait la durée de la transition à devenir visible.
const BASE =
  `inline-flex items-center justify-center rounded-xl font-description font-normal whitespace-nowrap transition-[color,background-color,border-color] focus-visible:outline-2 focus-visible:outline-offset-2 ${TAILLE_APPEL}`

const VARIANTES: Record<Variante, string> = {
  primaire: 'bg-primaire text-fond hover:bg-primaire-2 focus-visible:outline-encre',
  contour:
    'border-[1.5px] border-encre text-encre hover:border-primaire hover:bg-primaire hover:text-fond focus-visible:outline-primaire',
  /** La variante claire des fonds `vif` et `sombre`. */
  inverse: 'bg-carte text-primaire-2 hover:bg-tendre focus-visible:outline-carte',
  'contour-clair':
    'border-[1.5px] border-carte/35 text-sur-vif hover:bg-carte/15 focus-visible:outline-carte',
}

// Sans aplat, donc sans gouttiere horizontale : la pastille n'a pas de surface
// a remplir, seulement une hauteur de cible a tenir.
const PASTILLE =
  `inline-flex ${HAUTEUR_APPEL} min-w-11 items-center gap-2.5 font-description text-fluide-bouton font-normal whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2`

export function Bouton({
  destination,
  libelle,
  variante = 'primaire',
  className,
  'aria-label': nomAccessible,
}: {
  destination: Destination
  libelle: string
  variante?: Variante
  className?: string
  /** Nom accessible, quand plusieurs boutons au même libellé coexistent. */
  'aria-label'?: string
}) {
  return (
    <a
      href={DESTINATIONS[destination]}
      aria-label={nomAccessible}
      className={`${BASE} ${VARIANTES[variante]}${className ? ` ${className}` : ''}`}
    >
      {libelle}
    </a>
  )
}

/**
 * Le même bouton, mais vers une autre page du site (WEB-11). Il ne passe pas
 * par les constantes de `liens.ts` : une adresse interne est produite par
 * `chemin()`, il n'y a rien à y protéger.
 */
export function BoutonPage({
  vers,
  libelle,
  variante = 'primaire',
  className,
  'aria-label': nomAccessible,
}: {
  vers: string
  libelle: string
  variante?: Variante
  className?: string
  'aria-label'?: string
}) {
  return (
    <Link
      href={vers}
      aria-label={nomAccessible}
      className={`${BASE} ${VARIANTES[variante]}${className ? ` ${className}` : ''}`}
    >
      {libelle}
    </Link>
  )
}

/** Le second appel de la maquette : pas un aplat, une pastille verte et un libellé. */
export function LienPastille({
  destination,
  libelle,
  surSombre = false,
  'aria-label': nomAccessible,
}: {
  destination: Destination
  libelle: string
  surSombre?: boolean
  'aria-label'?: string
}) {
  return (
    <a
      href={DESTINATIONS[destination]}
      aria-label={nomAccessible}
      className={`${PASTILLE} ${
        surSombre
          ? 'text-sur-vif focus-visible:outline-carte'
          : 'text-encre focus-visible:outline-primaire'
      }`}
    >
      <Point surSombre={surSombre} />
      {libelle}
    </a>
  )
}

/** La même pastille, vers une autre page du site. */
export function LienPastillePage({
  vers,
  libelle,
  surSombre = false,
}: {
  vers: string
  libelle: string
  surSombre?: boolean
}) {
  return (
    <Link
      href={vers}
      className={`${PASTILLE} ${
        surSombre
          ? 'text-sur-vif focus-visible:outline-carte'
          : 'text-encre focus-visible:outline-primaire'
      }`}
    >
      <Point surSombre={surSombre} />
      {libelle}
    </Link>
  )
}

function Point({ surSombre }: { surSombre: boolean }) {
  return (
    <span
      aria-hidden
      className={`size-2.5 shrink-0 rounded-full bg-signal ${
        surSombre
          ? 'shadow-[0_0_0_4px_rgb(255_255_255/0.2)]'
          : 'shadow-[0_0_0_4px_rgb(34_197_94/0.18)]'
      }`}
    />
  )
}
