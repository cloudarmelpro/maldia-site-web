import type { Contenu } from '@/content/types'
import { Bouton, LienPastille } from '@/components/shared/bouton'
import { PHOTOS } from '@/content/photos'
import { Visuel } from '@/components/shared/visuel'

// Les quatre pastilles d'avatar de la maquette. Purement décoratives : elles ne
// représentent personne, d'où l'absence de tout libellé.
const AVATARS = ['#E7C9A9', '#C9B7E8', '#F0C3B0', '#B7C6E8']

/**
 * `pt-20` et non les 48 px de la maquette : le hero y colle à l'en-tête.
 *
 * L'entrée est en CSS et non en JS : c'est l'élément le plus haut de la page.
 * Animé par `motion`, il serait rendu à `opacity: 0` dans le HTML statique et
 * n'apparaîtrait qu'à l'hydratation.
 */
export function Hero({ contenu }: { contenu: Contenu['accueil']['hero'] }) {
  const [titre1, titre2] = contenu.titre
  const [sous1, sous2] = contenu.sousTitre

  return (
    <section aria-labelledby="titre-hero" className="bg-fond px-6 pt-20 pb-4">
      <div className="mx-auto flex w-full flex-col items-center gap-7 text-center motion-safe:animate-entree-hero">
        {/* Toujours une rangée : c'est le texte seul qui se replie, pas la
            pastille. Avec `flex-wrap`, le filet vertical partait seul à droite
            des avatars et séparait une ligne de rien. */}
        <p className="inline-flex items-center gap-3 rounded-[1.5rem] border border-trait bg-carte px-4 py-2.5 sm:gap-3.5 sm:rounded-pilule sm:px-5 sm:py-2">
          <span aria-hidden className="flex shrink-0 pl-2">
            {AVATARS.map((couleur) => (
              <span
                key={couleur}
                className="-ml-2 size-6 rounded-full border-2 border-carte"
                style={{ background: couleur }}
              />
            ))}
          </span>
          {/* Le filet ne sépare que deux éléments côte à côte sur une ligne. */}
          <span aria-hidden className="hidden h-5 w-px shrink-0 bg-trait sm:block" />
          <span className="text-left font-description text-fluide-bouton leading-[1.35] text-encre-2 sm:leading-normal">
            {contenu.pastille.avant}
            <strong className="font-medium text-encre">{contenu.pastille.misEnAvant}</strong>
            {contenu.pastille.apres}
          </span>
        </p>

        <h1
          id="titre-hero"
          className="flex flex-col items-center font-titre font-normal text-[clamp(2.375rem,4.9vw,4.625rem)] leading-[1.04] text-encre"
        >
          <span>{titre1}</span>
          <span className="relative">
            {titre2}
            <svg
              viewBox="0 0 300 10"
              preserveAspectRatio="none"
              aria-hidden
              className="absolute right-0 -bottom-[0.1em] h-[0.09em] w-1/2 overflow-visible"
            >
              <path
                d="M2 7 C 80 2, 190 1, 298 4"
                fill="none"
                stroke="url(#trait-hero)"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="trait-hero" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="var(--color-primaire)" />
                  <stop offset="1" stopColor="var(--color-accent)" />
                </linearGradient>
              </defs>
            </svg>
          </span>
        </h1>

        <p className="flex flex-col font-description text-fluide-corps leading-normal text-encre-2">
          <span>{sous1}</span>
          <span>{sous2}</span>
        </p>

        <div className="flex flex-wrap items-center justify-center gap-7">
          {/* WEB-7 fait du rendez-vous le moyen de contact principal des
              entreprises : c'est lui qui porte l'aplat. */}
          <Bouton destination="rendezVous" libelle={contenu.ctaPrincipal} />
          <LienPastille destination="candidature" libelle={contenu.ctaSecondaire} />
        </div>

        {/* La mention et sa flèche manuscrite, calées à gauche du visuel. */}
        <div className="flex w-full max-w-[1000px] justify-center lg:justify-start lg:pl-16">
          <span className="flex items-center gap-1.5 font-description text-fluide-mention text-encre-2">
            {contenu.mention}
            <svg viewBox="0 0 66 34" aria-hidden className="mt-1.5 h-9 w-[4.5rem] overflow-visible">
              <path
                d="M2 14 C 14 30, 38 30, 60 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
              <path
                d="M45 7 L 61 5 L 57 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>

        <div className="w-full max-w-[1000px]">
          <Visuel
            ratio="large"
            photo={PHOTOS.hero}
            arrondi="rounded-[1.625rem]"
            tailles="(max-width: 1024px) 100vw, 1000px"
            prioritaire
          />
        </div>
      </div>
    </section>
  )
}
