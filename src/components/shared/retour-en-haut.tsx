'use client'

import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'

// Une hauteur de fenetre : en dessous, le bouton doublerait un defilement que le
// pouce fait plus vite.
const SEUIL_FACTEUR = 1

/**
 * Le retour en haut, dans le registre sombre du design.
 *
 * Aucune transformation a l'etat masque : mise a l'echelle, la cible tactile
 * tombait a 43 px et passait sous le seuil de 44. C'est l'opacite seule qui
 * l'escamote, et `pointer-events` qui la rend intraversable.
 */
export function RetourEnHaut({ libelle }: { libelle: string }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const surDefilement = () => {
      setVisible(window.scrollY > window.innerHeight * SEUIL_FACTEUR)
    }
    surDefilement()
    window.addEventListener('scroll', surDefilement, { passive: true })
    return () => window.removeEventListener('scroll', surDefilement)
  }, [])

  return (
    <button
      type="button"
      aria-label={libelle}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed right-[clamp(1.25rem,4vw,3.5rem)] bottom-6 z-50 grid size-11 place-items-center rounded-bloc border border-white/22 bg-encre text-white transition-opacity duration-[220ms] hover:bg-primaire focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-encre ${
        visible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <ArrowUp aria-hidden className="size-4" />
    </button>
  )
}
