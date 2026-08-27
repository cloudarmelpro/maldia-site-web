'use client'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { CustomEase } from 'gsap/CustomEase'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useRef, type ReactNode, type RefObject } from 'react'

import { quandPagePrete } from '@/components/shared/chargement'

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
 * `auChargement` attend le retrait du voile de `Chargement` : sans ca, le hero
 * jouerait sous le voile et serait fini quand on le decouvre.
 *
 * Mouvement reduit : `matchMedia` de GSAP n'execute pas le bloc, donc aucun
 * decoupage et aucun mouvement — le texte parait, simplement.
 */
export function Revelation({
  balise: Balise = 'p',
  decoupe = 'lignes',
  auChargement = false,
  delai = 0,
  id,
  className,
  children,
}: {
  balise?: BaliseRevelation
  decoupe?: DecoupeRevelation
  /** Joue des le montage au lieu d'attendre le defilement. */
  auChargement?: boolean
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

      const { type, duree, decalage } = REGLAGES[decoupe]
      const media = gsap.matchMedia()

      media.add('(prefers-reduced-motion: no-preference)', () => {
        // `autoSplit` rejoue `onSplit` a chaque redecoupage. Ce drapeau evite
        // qu'un redecoupage apres le retrait du voile remette l'animation en
        // pause — le texte resterait alors sous son masque pour de bon.
        let liberee = !auChargement
        let jouer: (() => void) | null = null

        const decoupage = SplitText.create(element, {
          type,
          mask: 'lines',
          autoSplit: true,
          aria: 'auto',
          onSplit(self) {
            const cibles = decoupe === 'caracteres' ? self.chars : self.lines

            const mouvement = gsap.from(cibles, {
              yPercent: DEPART_POURCENT,
              duration: duree,
              ease: COURBE,
              delay: delai,
              stagger: decalage,
              paused: !liberee,
              scrollTrigger: auChargement
                ? undefined
                : { trigger: element, start: DECLENCHEMENT, once: true },
            })

            jouer = () => mouvement.play()
            return mouvement
          },
        })

        const desabonner = auChargement
          ? quandPagePrete(() => {
              liberee = true
              jouer?.()
            })
          : () => {}

        return () => {
          desabonner()
          decoupage.revert()
        }
      })

      return () => media.revert()
    },
    { scope: cadre, dependencies: [decoupe, auChargement, delai] },
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
