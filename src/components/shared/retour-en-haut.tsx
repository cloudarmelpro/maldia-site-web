'use client'

import { useEffect, useState } from 'react'
import { useReducedMotion } from 'motion/react'

/** Le seuil d'apparition de la maquette. */
const SEUIL = 600

/**
 * Le bouton de retour en haut de la maquette : rond, fixé en bas à droite,
 * révélé au-delà de 600 px de défilement.
 *
 * Trois écarts avec le fichier de design. Le défilement passe en saut immédiat
 * quand le visiteur réduit le mouvement. Le bouton sort du parcours de
 * tabulation tant qu'il est invisible, sinon le clavier atteindrait une cible
 * absente de l'écran. Et son état masqué ne porte pas le `scale(0.9)` de la
 * maquette : à 48 px, il tomberait à 43 px et passerait sous le seuil tactile
 * que le test d'écran vérifie. Il ne porte pas non plus son ombre portée
 * indigo — demande du client. L'aplat et la taille, eux, sont identiques.
 */
export function RetourEnHaut({ libelle }: { libelle: string }) {
  const [visible, setVisible] = useState(false)
  const reduit = useReducedMotion() ?? false

  useEffect(() => {
    const auDefilement = () => setVisible(window.scrollY > SEUIL)
    auDefilement()
    window.addEventListener('scroll', auDefilement, { passive: true })
    return () => window.removeEventListener('scroll', auDefilement)
  }, [])

  return (
    <button
      type="button"
      aria-label={libelle}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: reduit ? 'auto' : 'smooth' })}
      className={`fixed right-7 bottom-7 z-[80] grid size-12 place-items-center rounded-full bg-primaire text-carte transition-[opacity,transform] duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-encre ${
 visible ? 'opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
 }`}
    >
      <svg viewBox="0 0 24 24" aria-hidden className="size-5">
        <path
          d="M6 14l6-6 6 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
