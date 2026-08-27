import type { Contenu } from '@/content/types'
import { IntituleSection } from '@/components/shared/intitule-section'
import { Bouton } from '@/components/shared/bouton'
import { classes } from '@/components/shared/classes'
import { CONTENEUR } from '@/components/shared/section'

/**
 * L'en-tete est collant DANS le flux et repose sur cette section par une marge
 * basse negative : le hero doit degager sa hauteur, que `layout/en-tete` publie
 * dans `--hauteur-en-tete`. Le repli sert le rendu statique, avant mesure.
 */
const HAUT_HERO = 'pt-[calc(clamp(3.5rem,7vw,6.5rem)+var(--hauteur-en-tete,4.5rem))]'

/**
 * WEB-3 — l'ouverture de la page Talents : le hero vert, coiffe d'arrondis en
 * bas, en miroir du bloc d'appel qui ferme la page.
 *
 * Le `h1` de la page est ici. Rien n'est anime a l'entree : c'est l'element le
 * plus haut de la page, rendu a `opacity: 0` dans le HTML statique il
 * n'apparaitrait qu'a l'hydratation.
 *
 * Aucun gris de la charte sombre sur cet aplat : sur `#177e4f` le blanc ne
 * tient que 5,1 : 1, et tout ce qui descend en dessous passe sous le seuil.
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
        'rounded-b-coiffe bg-primaire pb-[clamp(3.5rem,7vw,6rem)] text-white',
        HAUT_HERO,
      )}
    >
      <div className={classes(CONTENEUR, 'flex flex-col gap-[clamp(1.5rem,3vw,2.5rem)]')}>
        <IntituleSection intitule={contenu.intitule} registre="vert" />

        {/* La marge negative resserre l'intitule sur le titre : le design lui
            donne moins d'air qu'aux blocs suivants, qui partagent le meme gap. */}
        <div className="-mt-4.5 flex flex-wrap items-end justify-between gap-[clamp(1.25rem,3vw,3rem)]">
          <h1
            id="titre-page"
            className="max-w-[20ch] font-titre text-[clamp(1.625rem,3.2vw,2.625rem)] leading-[1.04] tracking-[-0.045em] text-white"
          >
            {contenu.titre}
          </h1>
          <p
            className="max-w-[34ch] shrink-0 text-[0.90625rem] leading-[1.6] text-white/92"
          >
            {contenu.description}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Bouton
            destination="candidature"
            libelle={cta}
            variante="blanc"
            taille="haute"
            ornement="fleche"
          />
          <span className="etiquette text-[0.6875rem] text-white">{contenu.mention}</span>
        </div>
      </div>
    </section>
  )
}
