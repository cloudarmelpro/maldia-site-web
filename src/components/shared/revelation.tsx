'use client'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { CustomEase } from 'gsap/CustomEase'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useRef, type ReactNode, type RefObject } from 'react'

gsap.registerPlugin(useGSAP, CustomEase, ScrollTrigger, SplitText)

/**
 * La courbe du site de reference, relevee dans son bundle. GSAP n'accepte pas
 * `cubic-bezier()` en chaine : `CustomEase` est le seul moyen de la poser.
 *
 * Enregistree une fois, a l'evaluation du module.
 */
const COURBE = 'revelation'

if (!gsap.parseEase(COURBE)) {
  CustomEase.create(COURBE, 'M0,0 C0.625,0.05 0,1 1,1')
}

export type DecoupeRevelation = 'lignes' | 'caracteres'

const REGLAGES = {
  lignes: { type: 'lines', duree: 0.9, decalage: 0.07 },
  caracteres: { type: 'lines,chars', duree: 0.5, decalage: 0.02 },
} as const satisfies Record<DecoupeRevelation, { type: string; duree: number; decalage: number }>

/** La classe posee sur chaque ligne decoupee, et sur son masque. */
const LIGNE = 'ligne-revelee'

/** Le depart sous le masque : au-dela de 100 %, la ligne est hors du cadre. */
const DEPART_POURCENT = 115

/** Le declenchement du site de reference : le bloc entre a 88 % de la fenetre. */
const DECLENCHEMENT = 'top 88%'

/** Les balises admises. Une revelation porte du texte, jamais une boite. */
type BaliseRevelation = 'h1' | 'h2' | 'h3' | 'p' | 'span'

/**
 * Revelation de texte ligne par ligne, chaque ligne montant derriere un masque.
 *
 * `SplitText` decoupe le texte en lignes et `mask: 'lines'` double chaque ligne
 * d'un cadre en `overflow: clip` — c'est lui qui cache la ligne pendant sa
 * montee. `autoSplit` redecoupe quand les fontes arrivent ou que la largeur
 * change : sans lui, les lignes restent celles de la premiere mesure et le
 * masque coupe au mauvais endroit.
 *
 * `aria: 'auto'` pose `aria-label` sur le parent et `aria-hidden` sur les
 * fragments : sans ca, un lecteur d'ecran epellerait le texte ligne par ligne.
 *
 * **Le texte part invisible** — voir l'utilitaire `revelable` de globals.css, et
 * la raison pour laquelle il ne vaut que si le navigateur execute du script.
 * Cela reserve ce composant au contenu **sous la ligne de flottaison**, pour la
 * meme raison qu'`Apparition` : au-dessus, le texte attendrait le bundle.
 *
 * `desLeMontage` joue des l'arrivee de GSAP, sans attendre un point de
 * defilement. Reserve a ce qui se monte deja visible — le panneau du menu.
 *
 * Mouvement reduit : `matchMedia` de GSAP n'execute pas le bloc, donc aucun
 * decoupage et aucun mouvement — le texte parait, simplement.
 */
export function Revelation({
  balise: Balise = 'p',
  decoupe = 'lignes',
  desLeMontage = false,
  delai = 0,
  id,
  className,
  children,
}: {
  balise?: BaliseRevelation
  decoupe?: DecoupeRevelation
  /** Joue des le montage au lieu d'attendre le defilement. */
  desLeMontage?: boolean
  /** En secondes, comme le reste de l'API GSAP. */
  delai?: number
  id?: string
  className?: string
  children: ReactNode
}) {
  const cadre = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const element = cadre.current
      if (!element) return

      // Avant le decoupage : `gsap.from` pose son etat de depart dans le meme
      // tick, donc aucune image n'est peinte avec le texte non decoupe.
      gsap.set(element, { autoAlpha: 1 })

      // `revelable` veut dire « j'attends GSAP ». GSAP est la : la classe part,
      // et avec elle le filet de securite qui rallumerait le texte a 4 s. Sans
      // ce retrait, ce filet forcerait l'opacite d'un bloc encore sous le pli —
      // une animation l'emporte sur un style en ligne dans la cascade.
      element.classList.remove('revelable')

      const { type, duree, decalage } = REGLAGES[decoupe]
      const media = gsap.matchMedia()

      media.add('(prefers-reduced-motion: no-preference)', () => {
        const decoupage = SplitText.create(element, {
          type,
          mask: 'lines',
          // Une classe stable sur chaque ligne — et sur son masque, qui en est
          // un clone. C'est ce qui permet a la suite d'ecrans de distinguer les
          // blocs poses par SplitText d'un vrai bloc enfant.
          linesClass: LIGNE,
          autoSplit: true,
          aria: 'auto',
          onSplit(self) {
            const cibles = decoupe === 'caracteres' ? self.chars : self.lines

            return gsap.from(cibles, {
              yPercent: DEPART_POURCENT,
              duration: duree,
              ease: COURBE,
              delay: delai,
              stagger: decalage,
              scrollTrigger: desLeMontage
                ? undefined
                : { trigger: element, start: DECLENCHEMENT, once: true },
            })
          },
        })

        return () => decoupage.revert()
      })

      return () => media.revert()
    },
    { scope: cadre, dependencies: [decoupe, desLeMontage, delai] },
  )

  return (
    <Balise
      id={id}
      // Le meme `ref` sert cinq balises ; l'union de leurs types ne se resout
      // pas seule, et la conversion est exacte a l'execution.
      ref={cadre as RefObject<HTMLHeadingElement>}
      className={className === undefined ? 'revelable' : `revelable ${className}`}
    >
      {children}
    </Balise>
  )
}
