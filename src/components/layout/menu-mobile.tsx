'use client'

import { AnimatePresence, LazyMotion, domAnimation, useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'
import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

type Props = {
  /** Noms accessibles des deux boutons — l'etat passe aussi par aria-expanded. */
  ouvrir: string
  fermer: string
  /** La marque, reprise en haut du panneau comme dans le design. */
  marque: ReactNode
  className?: string
  children: ReactNode
}

/**
 * Le panneau de navigation mobile du design : plein ecran, fond nuit.
 *
 * `AnimatePresence` vient de `motion/react` et non de `motion/react-m` : c'est
 * la seule facon d'animer une sortie, un element demonte n'ayant plus rien a
 * animer. C'est la fonctionnalite precise qui justifie ce point d'entree.
 *
 * Le bouton porte un `backdrop-filter`, le panneau non : la propriete cree un
 * bloc conteneur pour les descendants en `fixed`, et un panneau place a
 * l'interieur se trouverait reduit a la taille du bouton.
 *
 * Le focus entre dans le panneau a l'ouverture et revient sur le bouton a la
 * fermeture — sans ca, le clavier repartirait du haut du document.
 */
export function MenuMobile({ ouvrir, fermer, marque, className, children }: Props) {
  const [ouvert, setOuvert] = useState(false)
  const bascule = useRef<HTMLButtonElement>(null)
  const panneau = useRef<HTMLDivElement>(null)
  const reduit = useReducedMotion() ?? false

  useEffect(() => {
    if (!ouvert) return

    const surTouche = (evenement: KeyboardEvent) => {
      if (evenement.key === 'Escape') setOuvert(false)
    }
    // La ref est copiee maintenant : au nettoyage, `bascule.current` pourrait
    // deja pointer ailleurs, et le focus ne reviendrait nulle part.
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
        aria-label={ouvrir}
        onClick={() => setOuvert(true)}
        className="inline-flex size-11 items-center justify-center rounded-bloc bg-[rgb(12_24_19/0.58)] backdrop-blur-[10px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <span aria-hidden className="flex flex-col gap-1.25">
          <span className="block h-[1.5px] w-4.5 bg-white" />
          <span className="block h-[1.5px] w-4.5 bg-white" />
        </span>
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
              className="fixed inset-0 z-90 flex flex-col overflow-y-auto bg-nuit px-[clamp(1.25rem,4vw,3.5rem)] pt-6.5 pb-8.5"
              onClick={(evenement) => {
                // Suivre un lien referme le panneau, sinon la page defilerait dessous.
                if (evenement.target instanceof Element && evenement.target.closest('a')) {
                  setOuvert(false)
                }
              }}
            >
              <div className="flex items-center justify-between">
                {marque}
                <button
                  type="button"
                  aria-label={fermer}
                  onClick={() => setOuvert(false)}
                  className="grid size-11 place-items-center rounded-liste bg-white/12 text-2xl leading-none text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <span aria-hidden>×</span>
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
