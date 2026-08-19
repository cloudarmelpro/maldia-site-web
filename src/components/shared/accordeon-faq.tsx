'use client'

import { LazyMotion, domAnimation, useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'
import { useEffect, useRef, useState } from 'react'
import type { MouseEvent, ReactNode } from 'react'

/** 280 ms : sous le plafond de 300 du dépôt, et non les 420 de la maquette. */
const DUREE_SECONDES = 0.28
const COURBE = [0.22, 1, 0.36, 1] as const

export type EntreeAccordeon = {
  readonly question: string
  readonly reponse: ReactNode
}

/**
 * `details`/`summary` conservés sous l'animation : le clavier, le rôle et
 * l'état annoncé restent ceux du navigateur, et les réponses s'ouvrent encore
 * sans JavaScript — le HTML servi ne porte aucune hauteur en ligne.
 *
 * Deux états et non un : `details` masque son contenu dès `open` retiré, donc
 * la fermeture n'aurait rien à montrer. `open` reste vrai le temps de
 * l'animation de repli, `enFermeture` le relâche à la fin.
 */
function EntreeFaq({ question, reponse }: EntreeAccordeon) {
  const element = useRef<HTMLDetailsElement>(null)
  const [monte, setMonte] = useState(false)
  const [ouvert, setOuvert] = useState(false)
  const [enFermeture, setEnFermeture] = useState(false)
  const reduit = useReducedMotion() ?? false

  // Tant que `monte` est faux, aucune hauteur n'est écrite : c'est ce qui
  // laisse le rendu statique ouvrable sans JavaScript. La reprise de `open` lit
  // un panneau qu'un clic aurait ouvert avant l'hydratation.
  useEffect(() => {
    setOuvert(element.current?.open ?? false)
    setMonte(true)
  }, [])

  const transition = reduit
    ? { duration: 0 }
    : { duration: DUREE_SECONDES, ease: COURBE }

  const basculer = (evenement: MouseEvent<HTMLElement>) => {
    evenement.preventDefault()
    if (ouvert) setEnFermeture(true)
    setOuvert(!ouvert)
  }

  return (
    <details
      ref={element}
      open={ouvert || enFermeture}
      className="group overflow-hidden rounded-[1.125rem] bg-carte"
    >
      <summary
        onClick={basculer}
        className="flex min-h-11 cursor-pointer list-none items-center gap-5 px-8 py-6 text-lg font-semibold text-encre focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primaire [&::-webkit-details-marker]:hidden"
      >
        {question}
        {/* La croix de la maquette : un « + » qui pivote en « × ». La classe
            couvre le rendu servi et le sans-JavaScript ; elle est retirée une
            fois monté, car `rotate` s'ajoute au `transform` de motion au lieu
            de le remplacer — les deux ensemble donneraient 270 degrés. */}
        <m.span
          aria-hidden
          initial={false}
          animate={monte ? { rotate: ouvert ? 135 : 0 } : undefined}
          transition={transition}
          className={`ml-auto shrink-0 text-[1.375rem] leading-none text-encre${
            monte ? '' : ' group-open:rotate-[135deg]'
          }`}
        >
          +
        </m.span>
      </summary>
      {/* La hauteur de repli est écrite ici et non par la seule animation :
          motion relit la hauteur du DOM au départ de chaque course, et `open`
          est déjà revenu à ce moment — sans ce zéro, l'ouverture mesurerait sa
          hauteur finale comme point de départ et ne bougerait pas. La valeur
          animée couvre celle-ci dès que la course commence. */}
      <m.div
        initial={false}
        animate={monte ? { height: ouvert ? 'auto' : 0 } : undefined}
        style={monte ? { height: 0 } : undefined}
        transition={transition}
        onAnimationComplete={() => setEnFermeture(false)}
        className="overflow-hidden"
      >
        {reponse}
      </m.div>
    </details>
  )
}

/**
 * Plusieurs panneaux peuvent rester ouverts : refermer celui qu'on n'a pas
 * touché déplace le texte sous le curseur et ne transporte aucune information.
 */
export function AccordeonFaq({ entrees }: { entrees: readonly EntreeAccordeon[] }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <div className="mx-auto mt-11 flex max-w-[760px] flex-col gap-4.5">
        {entrees.map((entree) => (
          <EntreeFaq key={entree.question} question={entree.question} reponse={entree.reponse} />
        ))}
      </div>
    </LazyMotion>
  )
}
