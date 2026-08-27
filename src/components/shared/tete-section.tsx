import type { ReactNode } from 'react'

import { Apparition } from '@/components/shared/apparition'
import { classes } from '@/components/shared/classes'
import { EnTeteSection } from '@/components/shared/en-tete-section'
import { IntituleSection } from '@/components/shared/intitule-section'
import type { RegistreIntitule } from '@/components/shared/intitule-section'

/**
 * La tete d'une section : la pastille d'intitule, et le titre qui la suit.
 *
 * Le bloc `Apparition` + `IntituleSection` etait recopie **verbatim onze fois**,
 * a la classe pres :
 *
 * ```
 * <Apparition className="w-fit self-start">
 *   <IntituleSection intitule={…} />
 * </Apparition>
 * ```
 *
 * `w-fit self-start` n'est pas decoratif : sans lui la pastille etire son fond
 * sur toute la colonne. C'est le genre d'invariant qu'une recopie perd un jour.
 *
 * Six de ces onze enchainaient sur un `EnTeteSection` ; d'ou le titre optionnel
 * plutot que deux composants. Sans `titre`, seule la pastille est rendue.
 *
 * Trois sections reimplantaient de leur cote l'en-tete au lieu de l'appeler, et
 * l'une avait deja diverge — `text-white` la ou le composant pose
 * `text-white/94`. Elles passent ici aussi.
 */
export function TeteSection({
  intitule,
  registre,
  titreId,
  titre,
  description,
  sombre = false,
  className,
  children,
}: {
  intitule: string
  registre?: RegistreIntitule
  /** Doit etre l'id que `aria-labelledby` de la section vise. */
  titreId?: string
  titre?: ReactNode
  description?: string
  /** Sur une section verte : le titre et la phrase passent au blanc. */
  sombre?: boolean
  /** Pose sur l'en-tete, quand une section resserre son titre sous la pastille. */
  className?: string
  /** Un appel a la place de la description — la page Profils en met un. */
  children?: ReactNode
}) {
  return (
    <>
      <Apparition className="w-fit self-start">
        <IntituleSection intitule={intitule} registre={registre} />
      </Apparition>

      {titre !== undefined && titreId !== undefined ? (
        <div className={classes(className)}>
          <EnTeteSection
            titreId={titreId}
            titre={titre}
            description={description}
            sombre={sombre}
          >
            {children}
          </EnTeteSection>
        </div>
      ) : null}
    </>
  )
}
