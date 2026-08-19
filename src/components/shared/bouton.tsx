import type { Ancre } from '@/content/langues'
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

// La transition est restreinte aux couleurs de surface : la liste
// `transition-colors` de Tailwind inclut outline-color, et l'anneau de focus
// mettrait la durée de la transition à devenir visible.
const BASE =
  'inline-flex min-h-[2.875rem] min-w-11 items-center justify-center rounded-pilule px-5 font-description text-[0.9375rem] font-normal whitespace-nowrap transition-[color,background-color,border-color] focus-visible:outline-2 focus-visible:outline-offset-2'

const VARIANTES: Record<Variante, string> = {
  primaire: 'bg-primaire text-fond hover:bg-primaire-2 focus-visible:outline-encre',
  contour:
    'border-[1.5px] border-encre text-encre hover:border-primaire hover:bg-primaire hover:text-fond focus-visible:outline-primaire',
  /** La variante claire des fonds `vif` et `sombre`. */
  inverse: 'bg-carte text-primaire-2 hover:bg-tendre focus-visible:outline-carte',
  'contour-clair':
    'border-[1.5px] border-carte/35 text-sur-vif hover:bg-carte/15 focus-visible:outline-carte',
}

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
      className={`inline-flex min-h-[2.875rem] min-w-11 items-center gap-2.5 font-description text-[0.9375rem] font-normal whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 ${
        surSombre
          ? 'text-sur-vif focus-visible:outline-carte'
          : 'text-encre focus-visible:outline-primaire'
      }`}
    >
      <span
        aria-hidden
        className={`size-2.5 shrink-0 rounded-full bg-signal ${
          surSombre
            ? 'shadow-[0_0_0_4px_rgb(255_255_255/0.2)]'
            : 'shadow-[0_0_0_4px_rgb(34_197_94/0.18)]'
        }`}
      />
      {libelle}
    </a>
  )
}

/**
 * La même pastille, mais vers une section de la page et non vers une
 * destination sortante. Elle ne passe donc pas par les constantes de
 * `liens.ts` — il n'y a rien à y protéger.
 */
export function LienPastilleAncre({ ancre, libelle }: { ancre: Ancre; libelle: string }) {
  return (
    <a
      href={`#${ancre}`}
      className="inline-flex min-h-[2.875rem] min-w-11 items-center gap-2.5 font-description text-[0.9375rem] font-normal whitespace-nowrap text-encre focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primaire"
    >
      <span
        aria-hidden
        className="size-2.5 shrink-0 rounded-full bg-signal shadow-[0_0_0_4px_rgb(34_197_94/0.18)]"
      />
      {libelle}
    </a>
  )
}
