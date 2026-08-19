'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

/**
 * Les colonnes décalées au défilement de la maquette.
 *
 * `transform` uniquement : animer une propriété de mise en page recalculerait
 * la page à chaque image. La position est lue dans une `requestAnimationFrame`,
 * jamais dans le gestionnaire d'événement lui-même.
 *
 * La maquette ne prévoit rien pour `prefers-reduced-motion` ; ici le décalage
 * est simplement coupé — un mouvement lié au défilement est le pire cas pour un
 * trouble vestibulaire. Sans JavaScript, les colonnes restent en place et
 * lisibles : le décalage n'est que décoratif.
 */
export function ColonneParallaxe({
  amplitude,
  className,
  children,
}: {
  /** Course totale en pixels, du haut au bas de la traversée. */
  amplitude: number
  className?: string
  children: ReactNode
}) {
  const element = useRef<HTMLDivElement>(null)
  const reduit = useReducedMotion() ?? false

  useEffect(() => {
    if (reduit) return
    const noeud = element.current
    if (!noeud) return

    let image: number | null = null

    const appliquer = () => {
      image = null
      const rect = noeud.getBoundingClientRect()
      const course = rect.height + window.innerHeight
      if (course <= 0) return
      const avancement = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / course))
      noeud.style.transform = `translateY(${-(avancement - 0.5) * 2 * amplitude}px)`
    }

    const auDefilement = () => {
      if (image === null) image = requestAnimationFrame(appliquer)
    }

    appliquer()
    window.addEventListener('scroll', auDefilement, { passive: true })
    window.addEventListener('resize', auDefilement)

    return () => {
      if (image !== null) cancelAnimationFrame(image)
      window.removeEventListener('scroll', auDefilement)
      window.removeEventListener('resize', auDefilement)
      noeud.style.transform = ''
    }
  }, [amplitude, reduit])

  return (
    <div ref={element} className={className} style={{ willChange: 'transform' }}>
      {children}
    </div>
  )
}
