'use client'

import { useEffect, useRef, useState } from 'react'

// Le design ne redessine qu'au-dela de 0,4 % de variation : sans ce seuil, un
// defilement au pixel declencherait un rendu par image.
const PAS_MINIMAL = 0.004

/**
 * La barre de progression de defilement, venue du design de l'article et posee
 * par le gabarit sur toutes les pages.
 *
 * `fixed` en haut de la fenetre et non dans l'en-tete. L'en-tete est colle, donc
 * il resterait bien visible — mais il repeint son fond a chaque section
 * survolee, et la barre y perdrait son contraste a chaque changement d'aplat.
 * Elle est aussi rendue AVANT `main`, hors de tout ancetre transforme : un
 * `transform` pose plus bas creerait un contexte qui la recalerait sur son
 * parent au lieu de la fenetre.
 *
 * Elle anime `transform: scaleX` et jamais `width` : une largeur recalculee a
 * chaque image de defilement refait la mise en page, et elle partage ces images
 * avec Lenis et ScrollTrigger. `origin-left` est ce qui la fait croitre depuis
 * le bord gauche.
 *
 * La mesure passe par `requestAnimationFrame` : l'evenement de defilement se
 * declenche bien plus souvent qu'une image, et recalculer a chaque fois
 * ferait travailler la page pour rien.
 *
 * `aria-hidden` : c'est un repere visuel de position dans la page. Annonce, il
 * n'apprendrait rien a qui ne voit pas la page defiler, et interromprait la
 * lecture a chaque changement de valeur.
 */
export function BarreProgression() {
  const [progression, setProgression] = useState(0)
  const image = useRef<number | null>(null)

  useEffect(() => {
    const mesurer = () => {
      image.current = null
      const total = document.documentElement.scrollHeight - window.innerHeight
      const valeur = total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0
      setProgression((precedente) =>
        Math.abs(valeur - precedente) > PAS_MINIMAL ? valeur : precedente,
      )
    }

    const surDefilement = () => {
      if (image.current === null) image.current = requestAnimationFrame(mesurer)
    }

    mesurer()
    window.addEventListener('scroll', surDefilement, { passive: true })
    window.addEventListener('resize', surDefilement, { passive: true })

    return () => {
      window.removeEventListener('scroll', surDefilement)
      window.removeEventListener('resize', surDefilement)
      if (image.current !== null) cancelAnimationFrame(image.current)
    }
  }, [])

  return (
    <div
      aria-hidden
      className="fixed inset-x-0 top-0 z-70 h-0.5 w-full origin-left bg-primaire transition-transform duration-[120ms] ease-linear motion-reduce:transition-none"
      style={{ transform: `scaleX(${progression.toFixed(4)})` }}
    />
  )
}
