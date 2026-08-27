import type { Contenu } from '@/content/types'
import { Pilule } from '@/components/shared/pilule'
import { CONTENEUR } from '@/components/shared/section'

/**
 * WEB-4 — l'ouverture de la page Services, sur l'aplat vert plein du design.
 *
 * L'en-tete est collant DANS le flux, avec une marge basse negative egale a sa
 * hauteur : il repose sur cette section. Le padding haut lui rend sa place, en
 * lisant la hauteur que `en-tete.tsx` publie ; le repli sert le rendu statique,
 * avant que la mesure existe.
 *
 * Les marches sont une liste : ce sont des elements de meme rang, et aucune
 * autre marque ne le dirait a un lecteur d'ecran.
 *
 * Rien n'est anime a l'entree : c'est l'element le plus haut de la page, rendu
 * a `opacity: 0` dans le HTML statique il n'apparaitrait qu'a l'hydratation.
 */
export function ServicesHero({
  contenu,
  marches,
}: {
  contenu: Contenu['services']['entete']
  marches: Contenu['commun']['marches']['liste']
}) {
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

        <div className="mt-8.5 flex flex-wrap items-end gap-[clamp(1.25rem,2.6vw,2rem)]">
          <p className="min-w-0 grow basis-[23.75rem] max-w-[40ch] text-[clamp(1.0625rem,1.5vw,1.3125rem)] leading-[1.55] text-sur-sombre">
            {contenu.description}
          </p>
          {/* Le design creuse le retrait de cette mention par la couleur. Sur la
              bande nuit, `encre-2` tient encore ; il ne tiendrait pas sur le vert. */}
          <p className="min-w-0 grow basis-[16.25rem] max-w-[34ch] text-[0.875rem] leading-[1.6] text-encre-2">
            {contenu.mention}
          </p>
        </div>

        <ul className="mt-[2.875rem] flex flex-wrap gap-2">
          {marches.map((marche) => (
            <li
              key={marche}
              className="rounded-pilule bg-white/8 px-4.5 py-2.25 text-[0.90625rem] text-sur-sombre"
            >
              {marche}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
