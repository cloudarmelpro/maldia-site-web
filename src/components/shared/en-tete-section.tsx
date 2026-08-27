import type { ReactNode } from 'react'

import { classes } from '@/components/shared/classes'

/**
 * L'en-tete de section : le titre a gauche, une phrase courte a droite, calees
 * sur la meme ligne de base.
 *
 * Les deux se posent cote a cote tant que la place le permet, puis passent l'un
 * sous l'autre — c'est `flex-wrap` qui decide, pas un point de rupture : la
 * phrase de droite est indeformable, la place dont elle a besoin depend donc de
 * sa longueur et non de la largeur de la fenetre.
 *
 * Le paragraphe garde son alignement a gauche dans les deux cas. Aligne a
 * droite une fois passe sous le titre, il se lirait comme une erreur.
 */
export function EnTeteSection({
  titreId,
  titre,
  description,
  sombre = false,
  children,
}: {
  titreId: string
  titre: ReactNode
  description?: string
  /** Sur les sections vertes : le titre et la phrase passent au blanc. */
  sombre?: boolean
  /** Un appel a la place de la description — la page Profils en met un. */
  children?: ReactNode
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-[clamp(1.25rem,3vw,3rem)]">
      <h2
        id={titreId}
        className={classes(
          'max-w-[22ch] font-titre text-[clamp(1.375rem,2.1vw,1.875rem)] leading-[1.15] tracking-[-0.045em]',
          sombre ? 'text-white' : 'text-encre',
        )}
      >
        {titre}
      </h2>
      {description ? (
        <p
          className={classes(
            'max-w-[34ch] shrink-0 text-[0.90625rem] leading-[1.6]',
            sombre ? 'text-white/94' : 'text-encre-2',
          )}
        >
          {description}
        </p>
      ) : null}
      {children}
    </div>
  )
}
