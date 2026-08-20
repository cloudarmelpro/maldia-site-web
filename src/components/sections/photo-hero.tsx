'use client'

import Image from 'next/image'
import { Pause, Play } from 'lucide-react'
import { useState } from 'react'

/**
 * La photo du hero et le bouton qui met sa derive en pause.
 *
 * Les deux vivent dans le meme composant parce qu'ils partagent un etat, et
 * qu'ils sont tous deux positionnes dans la section — le bouton n'est pas dans
 * le meme sous-arbre visuel que l'image.
 *
 * La derive est en CSS, `motion-safe` seulement : elle est purement decorative,
 * et un mouvement continu de fond est le pire cas pour un trouble vestibulaire.
 * Le bouton existe pour qui n'a pas reglé son systeme mais veut l'arreter quand
 * meme — c'est le critere « animation controlable » des WCAG.
 *
 * L'image est `priority` : elle est au-dessus de la ligne de flottaison et
 * couvre la fenetre entiere, donc c'est elle qui fixe le LCP de la page.
 */
export function PhotoHero({
  photo,
  pause,
  reprendre,
}: {
  photo: string
  pause: string
  reprendre: string
}) {
  const [anime, setAnime] = useState(true)

  return (
    <>
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        <Image
          src={photo}
          alt=""
          fill
          priority
          sizes="100vw"
          className={`object-cover ${anime ? 'motion-safe:animate-derive' : 'scale-[1.06]'}`}
        />
        {/* Le degrade du design : il assombrit le haut et le bas pour que
            l'en-tete et la barre de pied restent lisibles sur n'importe quelle
            photo. Les quatre arrets sont ses valeurs. */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(8_20_15/0.62)_0%,rgb(8_20_15/0.34)_34%,rgb(8_20_15/0.58)_72%,rgb(8_20_15/0.78)_100%)]" />
      </div>

      <button
        type="button"
        aria-pressed={!anime}
        aria-label={anime ? pause : reprendre}
        onClick={() => setAnime((valeur) => !valeur)}
        // 30 px dans le design, mais 44 sous 1000 px : c'est la taille minimale
        // d'une cible tactile, et ce bouton n'est pas decoratif — il coupe une
        // animation continue.
        className="absolute right-[clamp(1.25rem,4vw,3.5rem)] bottom-[0.9375rem] z-4 grid size-11 place-items-center large:size-7.5 rounded-etiquette bg-white/16 text-white backdrop-blur-[10px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        {anime ? (
          <Pause aria-hidden className="size-3.25" />
        ) : (
          <Play aria-hidden className="size-3.25" />
        )}
      </button>
    </>
  )
}
