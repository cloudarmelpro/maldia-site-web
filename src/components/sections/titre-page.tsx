import type { ReactNode } from 'react'

import { CONTENEUR, MESURE_PROSE } from '@/components/shared/section'

/**
 * L'en-tête d'une page intérieure : le `h1`, sa description, un appel.
 *
 * L'entrée est en CSS et non en JS, comme le hero : c'est l'élément le plus
 * haut de la page. Animé par `motion`, il serait rendu à `opacity: 0` dans le
 * HTML statique et n'apparaîtrait qu'à l'hydratation.
 *
 * Un seul `h1` par page, et c'est celui-ci — l'accueil a le sien dans le hero.
 */
export function TitrePage({
  titre,
  description,
  mention,
  children,
}: {
  titre: string
  description: string
  /** La précision qui suit l'appel — durée, format, absence d'engagement. */
  mention?: string
  /** Les appels de la page. */
  children?: ReactNode
}) {
  return (
    <section aria-labelledby="titre-page" className="bg-fond pt-16 pb-6 lg:pt-20">
      <div className={CONTENEUR}>
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center motion-safe:animate-entree-hero">
          {/* Le crénage négatif vient du @layer base : il ne vaut que pour h1 et h2. */}
          <h1
            id="titre-page"
            className="font-titre text-[2.375rem] leading-[1.04] font-normal text-balance text-encre sm:text-[3rem] lg:text-[3.75rem]"
          >
            {titre}
          </h1>
          <p
            className={`${MESURE_PROSE} font-description text-[1.0625rem] leading-[1.6] text-encre-2`}
          >
            {description}
          </p>
          {children ? (
            <div className="mt-1 flex flex-wrap items-center justify-center gap-4.5">{children}</div>
          ) : null}
          {mention ? (
            <p className="font-description text-[0.9375rem] text-encre-2">{mention}</p>
          ) : null}
        </div>
      </div>
    </section>
  )
}
