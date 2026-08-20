import type { ReactNode } from 'react'

import { Pilule } from '@/components/shared/pilule'
import { CONTENEUR, GRILLE_INTITULE } from '@/components/shared/section'

/**
 * L'en-tete d'une page interieure.
 *
 * Le design ne couvre que l'accueil : il n'y montre qu'un hero plein ecran avec
 * photo. Cette bande en reprend le registre — meme aplat nuit, meme grille a
 * colonne d'intitule, meme en-tete pose dessus — sans la photo, qui ne dirait
 * rien de plus sur une page interieure et retarderait son affichage.
 *
 * Un seul `h1` par page, et c'est celui-ci. Aucune animation d'entree : c'est
 * l'element le plus haut de la page, il serait rendu a `opacity: 0` dans le
 * HTML statique.
 */
export function TitrePage({
  intitule,
  titre,
  description,
  mention,
  enTete,
  children,
}: {
  intitule: string
  titre: string
  description: string
  /** La precision qui suit l'appel — duree, format, absence d'engagement. */
  mention?: string
  /** L'en-tete, rendu par le gabarit — il se pose sur l'aplat. */
  enTete: ReactNode
  /** Les appels de la page. */
  children?: ReactNode
}) {
  return (
    <section
      aria-labelledby="titre-page"
      className="relative flex flex-col overflow-hidden bg-nuit text-white"
    >
      {enTete}

      <div className={`${CONTENEUR} pt-[clamp(3rem,6vw,5.5rem)] pb-[clamp(3rem,6vw,5.5rem)]`}>
        <div className={GRILLE_INTITULE}>
          <Pilule intitule={intitule} registre="sombre" />

          <div className="flex flex-col gap-6">
            <h1
              id="titre-page"
              className="max-w-[20ch] font-titre text-[clamp(2.125rem,4.6vw,4.25rem)] leading-[1.02] tracking-[-0.05em] [word-spacing:-0.02em] text-white"
            >
              {titre}
            </h1>
            <p className="max-w-[52ch] text-[clamp(0.9375rem,1.15vw,1.0625rem)] leading-[1.6] text-sur-sombre">
              {description}
            </p>
            {children ? (
              <div className="mt-1 flex flex-wrap items-center gap-3">{children}</div>
            ) : null}
            {mention ? (
              <span className="etiquette tracking-[0.08em] text-sur-sombre-2">{mention}</span>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
