import type { ReactNode } from 'react'

import { classes } from '@/components/shared/classes'
import { IntituleSection } from '@/components/shared/intitule-section'
import { CONTENEUR } from '@/components/shared/section'

/**
 * L'ouverture verte des pages interieures : aplat plein pleine largeur, intitule
 * puis titre.
 *
 * Les coins bas etaient arrondis, en miroir de la coiffe du bloc Contact. Le
 * client a fait retirer les deux : plus AUCUNE section du site n'est coiffee, et
 * les aplats vont d'un bord a l'autre.
 *
 * Une regle de la decision 0023 tombe avec eux. Elle disait que la section
 * precedant le bloc Contact ne devait pas etre verte, parce que sa coiffe s'y
 * lisait alors comme deux encoches blanches aux angles. Il n'y a plus de
 * coiffe ; la contrainte qui reste est plus simple, et c'est celle du contenu :
 * deux bandes vertes qui se touchent ne font qu'une.
 *
 * Elle etait recopiee dans chaque page interieure, et la divergence avait
 * commence :
 *
 * - le meme `calc()` s'ecrivait dans **deux ordres**, `var()+clamp()` ici et
 *   `clamp()+var()` la ;
 * - le resserrement intitule/titre, une seule valeur de 1,125 rem, s'ecrivait de
 *   **trois facons** — `-mt-4.5` sur un `div`, `-mb-4.5` sur l'intitule, et
 *   `-mt-[1.125rem]` sous un nom de constante ;
 * - la phrase de droite existait en `max-w-[30ch]` et `max-w-[34ch]`, en
 *   `text-white/92` et `text-white/94`.
 *
 * Aucune de ces paires n'etait un choix : c'est ce que devient une valeur
 * recopiee. Une seule ecriture, ici.
 *
 * **Le blanc de la phrase est plein.** Il etait voile a 92 et 94 % selon la
 * page, et le voile passait le seuil AA de si peu que la moindre retouche du
 * vert l'aurait fait tomber. Le blanc plein garde la marge, et ne coute rien.
 *
 * L'en-tete est collant DANS le flux et repose sur cette section par une marge
 * basse negative : le padding haut lui rend sa place en lisant la hauteur que
 * `layout/en-tete` publie dans `--hauteur-en-tete`. Le repli sert le rendu
 * statique, avant que la mesure existe.
 *
 * `blog-article` n'utilise pas ce composant, et c'est deliberе : il ouvre par un
 * fil de retour, porte une ligne de metadonnees sous son titre, et ses `clamp()`
 * sont plus courts. L'y forcer demanderait trois props que lui seul passerait.
 */
const HAUT = 'pt-[calc(var(--hauteur-en-tete,4.5rem)+clamp(3.5rem,7vw,6.5rem))]'
const BAS = 'pb-[clamp(3.5rem,7vw,6rem)]'

/** Le design donne moins d'air entre l'intitule et le titre qu'entre les blocs. */
const SOUS_INTITULE = '-mt-4.5'

const TITRE =
  'max-w-[20ch] font-titre text-[clamp(1.625rem,3.2vw,2.625rem)] leading-[1.04] tracking-[-0.045em]'

/**
 * Les cinq pages interieures ouvrent sur du vert. La 404 ouvre sur du clair :
 * son bloc d'appel est vert lui aussi, et deux bandes vertes qui se touchent ne
 * font qu'une — il ne resterait qu'une couture au milieu d'un aplat.
 */
export type RegistreHero = 'vert' | 'clair'

const REGISTRES = {
  vert: { section: 'bg-primaire text-white', titre: 'text-white', phrase: 'text-white' },
  clair: { section: 'bg-fond text-encre', titre: 'text-encre', phrase: 'text-encre-2' },
} as const satisfies Record<RegistreHero, { section: string; titre: string; phrase: string }>

export function HeroPage({
  intitule,
  titre,
  description,
  registre = 'vert',
  children,
}: {
  intitule: string
  titre: string
  /** `clair` sur la 404, qui ne doit pas toucher le vert du bloc d'appel. */
  registre?: RegistreHero
  /** La phrase posee a droite du titre, quand la page en a une. */
  description?: string
  /** Ce qui suit le titre : appels, pastilles de marches, mention. */
  children?: ReactNode
}) {
  return (
    <section
      aria-labelledby="titre-page"
      className={classes(REGISTRES[registre].section, HAUT, BAS)}
    >
      <div className={classes(CONTENEUR, 'flex flex-col gap-[clamp(1.5rem,3vw,2.5rem)]')}>
        <IntituleSection intitule={intitule} registre={registre === 'vert' ? 'vert' : undefined} />

        {description === undefined ? (
          <h1 id="titre-page" className={classes(SOUS_INTITULE, TITRE, REGISTRES[registre].titre)}>
            {titre}
          </h1>
        ) : (
          <div
            className={classes(
              SOUS_INTITULE,
              'flex flex-wrap items-end justify-between gap-[clamp(1.25rem,3vw,3rem)]',
            )}
          >
            <h1 id="titre-page" className={classes(TITRE, REGISTRES[registre].titre)}>
              {titre}
            </h1>
            <p
              className={classes(
                'max-w-[34ch] shrink-0 text-[0.90625rem] leading-[1.6]',
                REGISTRES[registre].phrase,
              )}
            >
              {description}
            </p>
          </div>
        )}

        {children}
      </div>
    </section>
  )
}
