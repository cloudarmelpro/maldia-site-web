import type { Contenu } from '@/content/types'
import { IntituleSection } from '@/components/shared/intitule-section'
import { classes } from '@/components/shared/classes'
import { CONTENEUR } from '@/components/shared/section'

/**
 * WEB-6 — l'ouverture de la page A propos, sur l'aplat vert du design v2.
 *
 * Les coins BAS sont arrondis, en miroir de la coiffe du bloc Contact qui ferme
 * la page.
 *
 * L'en-tete est collant DANS le flux, avec une marge basse negative egale a sa
 * hauteur : il repose sur cette section. Le padding haut lui rend sa place, en
 * lisant la hauteur que `en-tete.tsx` publie ; le repli sert le rendu statique,
 * avant que la mesure existe.
 *
 * Rien n'est anime a l'entree : c'est l'element le plus haut de la page, rendu
 * a `opacity: 0` dans le HTML statique il n'apparaitrait qu'a l'hydratation.
 */
export function AProposHero({ contenu }: { contenu: Contenu['aPropos']['entete'] }) {
  return (
    <section
      aria-labelledby="titre-page"
      className="rounded-b-coiffe bg-primaire pt-[calc(var(--hauteur-en-tete,4.5rem)+clamp(3.5rem,7vw,6.5rem))] pb-[clamp(3.5rem,7vw,6rem)]"
    >
      <div className={classes(CONTENEUR, 'flex flex-col gap-[clamp(1.5rem,3vw,2.5rem)]')}>
        <IntituleSection intitule={contenu.intitule} registre="vert" />

        {/* La marge haute negative resserre le titre sous son intitule, sans
            toucher a l'ecart que la colonne pose partout ailleurs. */}
        <div className="-mt-4.5 flex flex-wrap items-end justify-between gap-[clamp(1.25rem,3vw,3rem)]">
          <h1
            id="titre-page"
            className="max-w-[20ch] font-titre text-[clamp(1.625rem,3.2vw,2.625rem)] leading-[1.04] tracking-[-0.045em] text-white"
          >
            {contenu.titre}
          </h1>

          <p
            className="max-w-[30ch] shrink-0 text-[0.90625rem] leading-[1.6] text-white/94"
          >
            {contenu.description}
          </p>
        </div>
      </div>
    </section>
  )
}
