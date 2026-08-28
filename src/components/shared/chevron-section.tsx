'use client'

import { ChevronUp } from 'lucide-react'
import { useEffect, useState } from 'react'

import { faireDefilerVers } from '@/components/shared/defilement-lisse'

// Sous ce seuil, la section « precedente » est celle ou l'on se trouve deja :
// le bouton ne ferait rien de visible.
const MARGE_MS = 12

/**
 * Le chevron flottant du design : il remonte a la section precedente, pas en
 * haut de la page.
 *
 * Il est pose sur la fenetre et non dans le pied. Dans le pied, il disparaissait
 * des qu'on remontait — c'est-a-dire au moment ou il sert.
 *
 * La hauteur de l'en-tete est lue dans le DOM au clic, et non recue en prop :
 * l'en-tete la mesure pour son propre compte, et la faire transiter par un etat
 * partage coupleraient deux composants qui n'ont rien d'autre en commun.
 */
export function ChevronSection({ libelle }: { libelle: string }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const surDefilement = () => setVisible(window.scrollY > 8)
    surDefilement()
    window.addEventListener('scroll', surDefilement, { passive: true })
    return () => window.removeEventListener('scroll', surDefilement)
  }, [])

  const remonter = () => {
    const hauteurEnTete = document.querySelector('header')?.offsetHeight ?? 0
    const position = window.scrollY

    const cibles = [...document.querySelectorAll('main section, footer, main > div > section')]
      .map((section) => section.getBoundingClientRect().top + position - hauteurEnTete)
      .filter((y) => y < position - MARGE_MS)

    // Passe par Lenis quand il pilote : `window.scrollTo({ behavior: 'smooth' })`
    // animerait la meme valeur que lui en meme temps. Le repli natif garde la
    // preference systeme, que `behavior: 'smooth'` ignore contrairement a la
    // regle CSS equivalente.
    faireDefilerVers(cibles.length > 0 ? cibles[cibles.length - 1] : 0)
  }

  return (
    <button
      type="button"
      aria-label={libelle}
      onClick={remonter}
      // `invisible` en plus de l'opacite : ni `opacity: 0` ni `pointer-events`
      // ne retirent un bouton de l'ordre de tabulation. Sans lui, on tabule en
      // haut de page sur une commande qu'on ne voit pas.
      className={`fixed right-[clamp(1.25rem,4vw,3.5rem)] bottom-[clamp(1.25rem,4vw,2.5rem)] z-45 grid size-11 place-items-center rounded-bloc bg-white/92 text-encre shadow-flottant backdrop-blur-[10px] transition-[opacity,background-color] duration-[240ms] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-encre ${
        visible ? 'opacity-100' : 'invisible pointer-events-none opacity-0'
      }`}
    >
      <ChevronUp aria-hidden className="size-4.25" />
    </button>
  )
}
