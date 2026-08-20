import Image from 'next/image'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import type { ReactNode } from 'react'

import { PHOTOS } from '@/content/photos'
import type { Contenu } from '@/content/types'
import { PhotoHero } from '@/components/sections/photo-hero'
import { DESTINATION_CANDIDATURE, DESTINATION_RENDEZ_VOUS } from '@/content/liens'

// Le decalage qui aligne le contenu du hero sur la colonne de contenu des
// sections suivantes : la largeur de la colonne d'intitule plus sa gouttiere.
const DECALAGE = 'large:pl-[calc(11.875rem+clamp(1.75rem,2.8vw,2.75rem))]'

const CONTENEUR = 'mx-auto w-full max-w-[87.5rem] px-[clamp(1.25rem,4vw,3.5rem)]'

const FOCUS = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'

/**
 * Le hero du design : une photo pleine fenetre, l'en-tete pose dessus, le titre
 * cale en bas, et une barre de coordonnees qui ferme la section.
 *
 * `min-h-[min(100vh,900px)]` — la fenetre, mais jamais plus de 900 px : sur un
 * grand moniteur, une hauteur de fenetre entiere laisserait le titre seul au
 * milieu de la photo.
 *
 * Rien n'est anime au defilement ici. C'est l'element le plus haut de la page :
 * rendu a `opacity: 0` dans le HTML statique, il n'apparaitrait qu'a
 * l'hydratation, et les deux appels de WEB-2 avec lui.
 */
export function Hero({
  contenu,
  courriel,
  lieu,
  marches,
  enTete,
}: {
  contenu: Contenu['accueil']['hero']
  courriel: string
  lieu: string
  /** La ligne de droite de la barre : les marches, resumes. */
  marches: string
  /** L'en-tete, rendu par le gabarit — il se pose sur la photo. */
  enTete: ReactNode
}) {
  const [premier, second] = contenu.badges

  return (
    <section
      aria-labelledby="titre-hero"
      className="relative flex min-h-[min(100vh,900px)] flex-col overflow-hidden bg-nuit"
    >
      <PhotoHero
        photo={PHOTOS.hero}
        pause={contenu.lecture.pause}
        reprendre={contenu.lecture.reprendre}
      />

      {enTete}

      <div className="relative z-3 flex flex-1 items-end pt-16">
        <div
          className={`${CONTENEUR} flex flex-col gap-[clamp(1.75rem,3.4vw,2.875rem)]`}
        >
          <div className={`${DECALAGE} flex flex-col gap-[clamp(1.25rem,2.4vw,2rem)]`}>
            <p className="flex max-w-[46ch] items-start gap-3 text-[clamp(0.875rem,1.05vw,1rem)] leading-[1.45] text-white/90">
              <svg viewBox="0 0 24 24" aria-hidden className="mt-0.75 size-4.25 shrink-0">
                <path
                  d="M3 20h7M6.5 20V9M6.5 9l9-5 3 5.5-9 4.5z"
                  fill="none"
                  stroke="rgb(255 255 255 / 0.85)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{contenu.lead}</span>
            </p>

            <h1
              id="titre-hero"
              className="max-w-[15ch] font-titre text-[clamp(2.875rem,6.4vw,6.5rem)] leading-[0.98] tracking-[-0.055em] [word-spacing:-0.03em] text-white"
            >
              {contenu.titre}
            </h1>

            <div className="flex flex-wrap items-stretch gap-3.5">
              <a
                href={DESTINATION_RENDEZ_VOUS}
                className={`flex min-w-[min(100%,20rem)] items-center gap-4 rounded-carte-large bg-white p-3 pr-4.5 transition-transform duration-[220ms] hover:-translate-y-0.5 ${FOCUS}`}
              >
                {/* alt vide : les trois lignes de la carte portent deja l'information. */}
                <span className="relative block size-15.5 shrink-0 overflow-hidden rounded-marque bg-tendre">
                  <Image
                    src={PHOTOS.vignetteAppel}
                    alt=""
                    fill
                    sizes="62px"
                    className="object-cover"
                  />
                </span>
                <span className="flex flex-col gap-0.75">
                  <span className="etiquette-fine text-[0.65625rem] tracking-[0.12em] text-encre-2">
                    {contenu.carteAppel.intitule}
                  </span>
                  <span className="text-[1.0625rem] font-medium tracking-[-0.02em] text-encre">
                    {contenu.carteAppel.titre}
                  </span>
                  <span className="etiquette-fine text-[0.65625rem] tracking-[0.08em] text-encre-2">
                    {contenu.carteAppel.mention}
                  </span>
                </span>
                <span
                  aria-hidden
                  className="ml-auto grid size-7.5 shrink-0 place-items-center rounded-etiquette border border-trait text-encre"
                >
                  <ArrowRight className="size-3.5" />
                </span>
              </a>

              <a
                href={DESTINATION_CANDIDATURE}
                className={`flex min-w-[11.875rem] flex-col justify-between gap-6.5 rounded-carte-large bg-lime p-3.5 px-4 transition-transform duration-[220ms] hover:-translate-y-0.5 ${FOCUS}`}
              >
                <span aria-hidden className="flex justify-end text-encre">
                  <ArrowUpRight className="size-4.25" />
                </span>
                <span className="etiquette text-[0.71875rem] leading-[1.4] text-encre">
                  {contenu.carteCandidature}
                </span>
              </a>
            </div>
          </div>

          <ul className="flex flex-wrap items-center gap-5">
            {[premier, second].map((badge) => (
              <li
                key={badge.libelle}
                className="inline-flex items-center gap-2.5 rounded-bloc bg-[rgb(12_24_19/0.55)] p-1.75 pr-4 backdrop-blur-[10px]"
              >
                <span
                  aria-hidden
                  className={`grid size-6.5 shrink-0 place-items-center rounded-etiquette font-[family-name:var(--font-etiquette)] text-[0.6875rem] text-encre ${
                    badge === premier ? 'bg-lime' : 'bg-white'
                  }`}
                >
                  {badge.signe}
                </span>
                <span className="etiquette whitespace-nowrap text-white">{badge.libelle}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative z-3 mt-[clamp(1.75rem,3vw,2.75rem)] border-t border-white/16">
        <div
          className={`${CONTENEUR} grid grid-cols-1 items-center gap-3.5 py-4.5 duo:grid-cols-[1fr_auto_1fr]`}
        >
          <a
            href={`mailto:${courriel}`}
            className={`inline-flex min-h-11 items-center justify-self-start etiquette text-white/82 transition-[color] hover:text-white ${FOCUS}`}
          >
            {courriel}
          </a>
          <span className="etiquette text-white/82 duo:justify-self-center duo:text-center">
            {lieu}
          </span>
          <span className="etiquette text-white/82 duo:justify-self-end duo:pr-11.5 duo:text-right">
            {marches}
          </span>
        </div>
      </div>
    </section>
  )
}
