import Image from 'next/image'

import { PHOTOS } from '@/content/photos'
import type { Contenu } from '@/content/types'
import { Bouton } from '@/components/shared/bouton'
import { classes } from '@/components/shared/classes'
import { Pilule } from '@/components/shared/pilule'
import { CONTENEUR } from '@/components/shared/section'

/**
 * L'en-tete est collant DANS le flux et repose sur cette section par une marge
 * basse negative : le hero doit degager sa hauteur, que `layout/en-tete` publie
 * dans `--hauteur-en-tete`. Le repli sert le rendu statique, avant mesure.
 */
const HAUT_HERO = 'pt-[calc(clamp(4rem,8vw,7.25rem)+var(--hauteur-en-tete,4.5rem))]'

/** Le degrade du design : l'aplat reste plein du cote du texte. */
const VOILE_PHOTO = 'bg-[linear-gradient(100deg,var(--color-primaire)_14%,transparent_92%)]'

/**
 * WEB-3 — l'ouverture de la page Talents : le hero vert plein du design.
 *
 * Le `h1` de la page est ici. Rien n'est anime a l'entree : c'est l'element le
 * plus haut de la page, rendu a `opacity: 0` dans le HTML statique il
 * n'apparaitrait qu'a l'hydratation.
 */
export function TalentsHero({
  contenu,
  cta,
}: {
  contenu: Contenu['talents']['entete']
  /**
   * Le libelle vient de l'encart : l'en-tete n'en porte pas, et le cahier ne
   * prevoit qu'un seul libelle de candidature (WEB-3).
   */
  cta: Contenu['talents']['encart']['cta']
}) {
  return (
    <section
      aria-labelledby="titre-page"
      className={classes(
        'relative isolate overflow-hidden bg-primaire pb-[clamp(4rem,8vw,7.25rem)] text-white',
        HAUT_HERO,
      )}
    >
      {/* `mix-blend-multiply` ne peut qu'assombrir l'aplat, et le voile vert
          pose dessus ne peut le ramener qu'au vert : le blanc garde son rapport
          de contraste ou que tombe le cadrage. `isolate` enferme le melange
          dans la section, dont le fond devient l'arriere-plan du calque. */}
      <div className="absolute inset-0">
        {/* alt vide : le titre et la phrase qui suivent portent l'information. */}
        <Image
          src={PHOTOS.hero}
          alt=""
          fill
          sizes="100vw"
          preload
          className="object-cover opacity-45 mix-blend-multiply"
        />
        <div className={classes('absolute inset-0', VOILE_PHOTO)} />
      </div>

      <div className={classes(CONTENEUR, 'relative flex flex-col items-start')}>
        <Pilule intitule={contenu.intitule} registre="sombre" />

        <h1
          id="titre-page"
          className="mt-7 max-w-[24ch] font-titre text-[clamp(1.625rem,3.2vw,2.625rem)] leading-[1.02] tracking-[-0.035em] text-white"
        >
          {contenu.titre}
        </h1>

        <p className="mt-7 max-w-[44ch] text-[clamp(1.0625rem,1.5vw,1.25rem)] leading-[1.55] text-white">
          {contenu.description}
        </p>

        <Bouton destination="candidature" libelle={cta} variante="blanc" taille="haute" className="mt-10" />
      </div>
    </section>
  )
}
