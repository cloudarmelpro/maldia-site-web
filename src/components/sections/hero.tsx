import Image from 'next/image'

import { PHOTOS } from '@/content/photos'
import type { Contenu } from '@/content/types'
import { Bouton } from '@/components/shared/bouton'
import { CONTENEUR } from '@/components/shared/section'

/** Le masque du design : la colonne se dissout vers le haut et vers le bas. */
const MASQUE_VERTICAL =
  '[mask-image:linear-gradient(180deg,transparent_0%,rgb(0_0_0/0.28)_16%,#000_38%,#000_62%,rgb(0_0_0/0.28)_84%,transparent_100%)]'

/**
 * Le bord droit de la colonne se cale sur la gouttiere de page : la meme marge
 * qu'un bloc du conteneur tant que la fenetre est etroite, puis le bord de la
 * colonne de 1080 px une fois qu'elle est atteinte.
 */
const BORD_DROIT =
  'right-[max(clamp(1.25rem,4vw,3.5rem),calc(50%-33.75rem+clamp(1.25rem,4vw,3.5rem)))]'

/**
 * Les deux sous-colonnes du design, dans son ordre et a ses hauteurs.
 *
 * L'ecart entre deux vignettes est porte par la vignette et non par `gap` : le
 * defilement translate la moitie d'une liste doublee, et un `gap` laisserait un
 * demi-ecart de trop a la couture — un sursaut a chaque tour.
 */
const COLONNES = [
  {
    animation: 'motion-safe:animate-defilement-vertical',
    vignettes: [
      { photo: PHOTOS.vignettesHero[0], hauteur: 'h-[11.875rem]' },
      { photo: PHOTOS.vignettesHero[1], hauteur: 'h-[14.375rem]' },
      { photo: PHOTOS.vignettesHero[2], hauteur: 'h-[10.625rem]' },
      { photo: PHOTOS.vignettesHero[3], hauteur: 'h-[13.4375rem]' },
    ],
  },
  {
    animation: 'motion-safe:animate-defilement-vertical-inverse',
    vignettes: [
      { photo: PHOTOS.vignettesHero[4], hauteur: 'h-[11.25rem]' },
      { photo: PHOTOS.vignettesHero[5], hauteur: 'h-[14.0625rem]' },
      { photo: PHOTOS.vignettesHero[6], hauteur: 'h-[12.5rem]' },
      { photo: PHOTOS.vignettesHero[7], hauteur: 'h-[10.9375rem]' },
    ],
  },
] as const

type Vignette = (typeof COLONNES)[number]['vignettes'][number]

/**
 * Ni liste ni `aria-hidden` : l'alt vide suffit a rendre ces photos muettes, et
 * `motion-reduce` fait de la sous-colonne une zone defilable — donc focalisable
 * au clavier, ce qu'un parent `aria-hidden` rendrait fautif.
 */
function Suite({ vignettes }: { vignettes: readonly Vignette[] }) {
  return (
    <div className="flex flex-col">
      {vignettes.map(({ photo, hauteur }) => (
        <span key={photo} className="block pb-3">
          <span
            className={`relative block overflow-hidden rounded-carte-large bg-voile/18 ${hauteur}`}
          >
            <Image src={photo} alt="" fill sizes="224px" className="object-cover" />
          </span>
        </span>
      ))}
    </div>
  )
}

/**
 * La colonne de vignettes, ancree a la section et non au contenu : elle couvre
 * toute la hauteur du hero et passe derriere l'en-tete.
 *
 * Elle n'apparait qu'a partir de `large`. En dessous, sa largeur relative la
 * ferait passer sous la colonne de texte, qui garde la sienne — le titre et les
 * deux appels de WEB-2 se liraient alors sur des photos.
 *
 * `motion-safe:` coupe le defilement quand le visiteur reduit le mouvement : une
 * colonne qui defile sans fin est le pire cas pour un trouble vestibulaire.
 * Immobile, la liste depasse du cadre, donc `motion-reduce` la rend defilable a
 * la main plutot que de masquer sa fin.
 */
function Vignettes() {
  return (
    <div
      className={`absolute inset-y-0 z-1 hidden w-[min(42%,28.75rem)] overflow-hidden large:block ${BORD_DROIT} ${MASQUE_VERTICAL}`}
    >
      <div className="absolute inset-0 flex gap-3">
        {COLONNES.map(({ animation, vignettes }) => (
          <div
            key={animation}
            className="min-w-0 flex-1 overflow-hidden motion-reduce:overflow-y-auto"
          >
            <div className={`flex flex-col ${animation}`}>
              <Suite vignettes={vignettes} />
              <Suite vignettes={vignettes} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * Le hero du design : un aplat vert plein, la colonne de texte a gauche et la
 * colonne de vignettes a droite.
 *
 * `min-h-svh` et non `100vh` : sur telephone, `100vh` vaut la fenetre SANS la
 * barre d'adresse, donc le bas du hero — et les deux appels de WEB-2 — se
 * retrouve sous le pli au chargement. `svh` prend la fenetre barres visibles.
 * `dvh` la ferait changer de hauteur pendant le defilement, et la page
 * sauterait.
 *
 * Rien n'est anime a l'entree ici. C'est l'element le plus haut de la page :
 * rendu a `opacity: 0` dans le HTML statique, il n'apparaitrait qu'a
 * l'hydratation.
 */
export function Hero({
  contenu,
}: {
  contenu: Contenu['accueil']['hero']
}) {
  return (
    <section
      aria-labelledby="titre-hero"
      className="relative flex min-h-svh flex-col overflow-hidden bg-primaire"
    >
      <Vignettes />


      <div className="relative z-3 flex flex-1 items-stretch py-[clamp(2.5rem,5vw,4.75rem)]">
        <div className={`${CONTENEUR} flex items-stretch`}>
          <div className="flex min-w-0 max-w-[min(100%,32.5rem)] flex-1 flex-col justify-center gap-[clamp(1.25rem,2.4vw,1.875rem)]">
            <p className="inline-flex items-center gap-2.25 self-start etiquette text-[0.6875rem] tracking-[0.1em] text-white">
              <span aria-hidden className="size-1.5 shrink-0 rounded-pilule bg-white" />
              {contenu.intitule}
            </p>

            <h1
              id="titre-hero"
              className="max-w-[13ch] font-titre text-[clamp(2.25rem,4.4vw,3.875rem)] leading-[0.99] tracking-[-0.055em] text-white"
            >
              {contenu.titre}
            </h1>

            <p className="max-w-[34ch] text-[clamp(0.9375rem,1.15vw,1.09375rem)] leading-[1.55] text-white">
              {contenu.lead}
            </p>

            <div className="flex flex-wrap items-center gap-2.5">
              <Bouton
                destination="rendezVous"
                libelle={contenu.carteAppel.titre}
                variante="blanc"
                taille="haute"
                ornement="fleche"
              />
              <Bouton
                destination="candidature"
                libelle={contenu.carteCandidature}
                variante="voile"
                taille="haute"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
