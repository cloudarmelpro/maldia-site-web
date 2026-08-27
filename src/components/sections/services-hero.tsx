import type { Contenu } from '@/content/types'
import { Revelation } from '@/components/shared/revelation'
import { classes } from '@/components/shared/classes'
import { CONTENEUR } from '@/components/shared/section'
import { IntituleSection } from '@/components/shared/intitule-section'

const TITRE_ID = 'titre-page'

/**
 * WEB-4 — l'ouverture de la page Services : l'aplat vert, coiffe d'arrondis en
 * bas, en miroir du bloc Contact qui ferme la page.
 *
 * L'en-tete est collant DANS le flux et repose sur cette section : le padding
 * haut lui rend sa place en lisant la hauteur que `en-tete.tsx` publie ; le
 * repli sert le rendu statique, avant que la mesure existe. La sonde de fond de
 * l'en-tete ne reconnait que les `section` — d'ou l'aplat porte ici.
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
      aria-labelledby={TITRE_ID}
      className="rounded-b-coiffe bg-primaire pt-[calc(var(--hauteur-en-tete,4.5rem)+clamp(3.5rem,7vw,6.5rem))] pb-[clamp(3.5rem,7vw,6rem)]"
    >
      <div className={classes(CONTENEUR, 'flex flex-col gap-[clamp(1.5rem,3vw,2.5rem)]')}>
        <IntituleSection intitule={contenu.intitule} registre="vert" className="-mb-4.5" />

        <Revelation
          balise="h1"
          auChargement
          id={TITRE_ID}
          className="max-w-[20ch] font-titre text-[clamp(1.625rem,3.2vw,2.625rem)] leading-[1.04] tracking-[-0.045em] text-white"
        >
          {contenu.titre}
        </Revelation>

        <ul className="flex flex-wrap gap-1.75">
          {marches.map((marche) => (
            <li
              key={marche}
              className="rounded-marque bg-voile/26 px-4 py-2.25 text-[0.78125rem] tracking-[0.04em] whitespace-nowrap text-white"
            >
              {marche}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
