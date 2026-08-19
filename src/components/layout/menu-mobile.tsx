'use client'

import { Menu, X } from 'lucide-react'
import { AnimatePresence, LazyMotion, domAnimation, useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'
import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

type Props = {
  /** Nom accessible du bouton — l'état ouvert/fermé passe par aria-expanded. */
  libelle: string
  /** La marque, reprise en haut du panneau comme dans la maquette. */
  marque: ReactNode
  className?: string
  children: ReactNode
}

/**
 * Le panneau de navigation mobile : plein écran, sa propre barre de titre.
 *
 * `AnimatePresence` vient de `motion/react` et non de `motion/react-m` : c'est
 * la seule façon d'animer une sortie, un élément démonté n'ayant plus rien à
 * animer. C'est la fonctionnalité précise qui justifie ce point d'entrée.
 *
 * Le focus entre dans le panneau à l'ouverture et revient sur le bouton à la
 * fermeture — sans ça, le clavier repartirait du haut du document.
 */
export function MenuMobile({ libelle, marque, className, children }: Props) {
  const [ouvert, setOuvert] = useState(false)
  const bascule = useRef<HTMLButtonElement>(null)
  const panneau = useRef<HTMLDivElement>(null)
  const reduit = useReducedMotion() ?? false

  useEffect(() => {
    if (!ouvert) return

    const surTouche = (evenement: KeyboardEvent) => {
      if (evenement.key === 'Escape') setOuvert(false)
    }
    // La ref est copiée maintenant : au nettoyage, `bascule.current` pourrait
    // déjà pointer ailleurs, et le focus ne reviendrait nulle part.
    const boutonBascule = bascule.current
    const debordementPrecedent = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', surTouche)
    panneau.current?.querySelector<HTMLElement>('a, button')?.focus()

    return () => {
      document.body.style.overflow = debordementPrecedent
      window.removeEventListener('keydown', surTouche)
      boutonBascule?.focus()
    }
  }, [ouvert])

  const duree = reduit ? 0 : 0.3

  return (
    <div className={className}>
      <button
        ref={bascule}
        type="button"
        aria-expanded={ouvert}
        aria-label={libelle}
        onClick={() => setOuvert((valeur) => !valeur)}
        className="inline-flex size-11 items-center justify-center rounded-full text-encre focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primaire"
      >
        <Menu aria-hidden className="size-6" />
      </button>

      <LazyMotion features={domAnimation} strict>
        <AnimatePresence>
          {ouvert ? (
            <m.div
              ref={panneau}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: duree, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-[70] flex flex-col overflow-y-auto bg-fond px-6 pt-5 pb-8 lg:hidden"
              onClick={(evenement) => {
                // Suivre une ancre referme le panneau, sinon la page défilerait dessous.
                if (evenement.target instanceof Element && evenement.target.closest('a')) {
                  setOuvert(false)
                }
              }}
            >
              <div className="flex items-center justify-between">
                {marque}
                <button
                  type="button"
                  aria-label={libelle}
                  onClick={() => setOuvert(false)}
                  className="inline-flex size-11 items-center justify-center rounded-full text-encre focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primaire"
                >
                  <X aria-hidden className="size-6" />
                </button>
              </div>
              {children}
            </m.div>
          ) : null}
        </AnimatePresence>
      </LazyMotion>
    </div>
  )
}
