import type { Contenu } from '@/content/types'
import { Pilule } from '@/components/shared/pilule'
import { CONTENEUR } from '@/components/shared/section'

/**
 * WEB-6 — l'ouverture de la page A propos, sur l'aplat vert plein du design.
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
      className="bg-nuit pt-[calc(var(--hauteur-en-tete,4.5rem)+clamp(4rem,8vw,7.5rem))] pb-[clamp(3.5rem,7vw,6rem)]"
    >
      <div className={CONTENEUR}>
        <Pilule intitule={contenu.intitule} registre="nuit" />

        <h1
          id="titre-page"
          className="mt-7 max-w-[22ch] font-titre text-[clamp(1.625rem,3.2vw,2.625rem)] leading-[1.01] tracking-[-0.035em] text-white"
        >
          {contenu.titre}
        </h1>

        <p className="mt-7 max-w-[40ch] text-[clamp(1.0625rem,1.5vw,1.3125rem)] leading-[1.5] text-sur-sombre">
          {contenu.description}
        </p>
      </div>
    </section>
  )
}
