import type { ReactNode } from 'react'

export type Fond = 'fond' | 'fond-2' | 'tendre' | 'vif' | 'sombre'

const FONDS: Record<Fond, string> = {
  fond: 'bg-fond',
  'fond-2': 'bg-fond-2',
  tendre: 'bg-tendre',
  vif: 'bg-vif text-sur-vif',
  sombre: 'bg-sombre text-sur-sombre',
}

/**
 * Largeur maximale d'un paragraphe, en rem et non en ch : `ch` se résout sur la
 * police de l'élément qui le porte et varie de 25 % entre 16 et 20 px. 36 rem
 * tient entre 58 et 73 caractères par ligne sur cette plage — sous la cible de
 * confort de 75.
 */
export const MESURE_PROSE = 'max-w-[36rem]'

/**
 * La gouttière de page, partagée par toutes les sections et le pied. Un seul
 * endroit : une largeur qui diverge d'un bloc à l'autre ne se voit qu'à l'usage.
 */
export const CONTENEUR =
  'mx-auto w-full max-w-[1180px] px-[clamp(1.25rem,2.8vw,2.5rem)]'

type SectionProps = {
  /** Doit être l'id du titre rendu dans children : c'est lui que aria-labelledby vise. */
  titreId: string
  fond?: Fond
  /**
   * Le geste signature de la maquette : le bloc monte sur le précédent, coins
   * hauts arrondis. Le rayon laisse voir ce qu'il y a derrière, d'où `dessous`.
   */
  bloc?: boolean
  /** Fond de la section qui précède — visible dans l'arrondi. Sans effet hors `bloc`. */
  dessous?: Fond
  className?: string
  children: ReactNode
}

export function Section({
  titreId,
  fond = 'fond',
  bloc = false,
  dessous = 'fond',
  className,
  children,
}: SectionProps) {
  const contenu = (
    <section
      aria-labelledby={titreId}
      className={`${FONDS[fond]} py-20 lg:py-[4.875rem]${bloc ? ' rounded-t-bloc' : ''}${className ? ` ${className}` : ''}`}
    >
      <div className={CONTENEUR}>{children}</div>
    </section>
  )

  // L'arrondi d'un bloc découvre le fond de son parent, pas celui du frère qui
  // le précède : sans cette enveloppe, il laisserait apparaître du blanc.
  return bloc ? <div className={FONDS[dessous]}>{contenu}</div> : contenu
}

