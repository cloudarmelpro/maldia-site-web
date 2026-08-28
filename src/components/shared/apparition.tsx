'use client'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { CustomEase } from 'gsap/CustomEase'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef, type ReactNode } from 'react'

import { classes } from '@/components/shared/classes'

gsap.registerPlugin(useGSAP, CustomEase, ScrollTrigger)

/**
 * La courbe du design, une exponentielle sortante. La meme que `Revelation` :
 * les deux entrees du site parlent la meme langue, seul le grain change.
 */
const COURBE = 'apparition'

if (!gsap.parseEase(COURBE)) {
  CustomEase.create(COURBE, 'M0,0 C0.16,1 0.3,1 1,1')
}

/** 16 px sur 580 ms — le pas d'entree du design pour un bloc. */
const DEPLACEMENT = 16
const DUREE = 0.58

/** Le design declenche a 5 % de visibilite : un bloc haut n'attend pas. */
const DECLENCHEMENT = 'top 95%'

/**
 * Entree au defilement, pour tout ce qui n'est pas du texte lu : cartes,
 * grilles, encarts, pastilles. Le texte, lui, passe par `Revelation`.
 *
 * **Elle etait ecrite avec `motion`, et ne l'est plus.** Deux raisons, et la
 * seconde compte plus que la premiere.
 *
 * Le poids : `motion` etait servie sur chaque page pour un fondu avec decalage
 * que ScrollTrigger — deja charge pour `Revelation` — fait sans une ligne de
 * plus. La cible de la decision 0006 ne laisse pas la place a deux
 * bibliotheques d'animation.
 *
 * La robustesse : `motion` serialisait son etat de depart dans le HTML statique,
 * en `style="opacity:0"`. Sans script — ou avec un script qui n'arrive pas —
 * ces blocs restaient invisibles pour toujours. Ils portent maintenant la classe
 * `revelable`, donc la garde `@media (scripting: enabled)` et le filet de 4 s.
 *
 * Le registre `texte`, qui posait un flou a l'entree, a disparu avec son dernier
 * appelant : c'etait la seule propriete animee du depot qui ne fut ni
 * `transform` ni `opacity`, et la decision 0023 la laissait « a confirmer ».
 *
 * Mouvement reduit : `matchMedia` de GSAP n'execute pas le bloc — le mouvement
 * est coupe, pas raccourci, et le contenu parait simplement.
 */
export function Apparition({
  delai = 0,
  className,
  children,
}: {
  /** En millisecondes — `delaiDeGrille(indice)` pour les grilles. */
  delai?: number
  className?: string
  children: ReactNode
}) {
  const cadre = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const element = cadre.current
      if (!element) return

      gsap.set(element, { autoAlpha: 1 })

      // `revelable` veut dire « j'attends GSAP ». GSAP est la : la classe part,
      // et avec elle le filet qui rallumerait l'opacite a 4 s.
      element.classList.remove('revelable')

      const media = gsap.matchMedia()

      media.add('(prefers-reduced-motion: no-preference)', () => {
        const mouvement = gsap.from(element, {
          opacity: 0,
          y: DEPLACEMENT,
          duration: DUREE,
          ease: COURBE,
          delay: delai / 1000,
          scrollTrigger: { trigger: element, start: DECLENCHEMENT, once: true },
        })

        // Ces blocs enveloppent parfois des commandes — onglets, filtres,
        // boutons. Le clavier ne suit pas le defilement : on peut tabuler dans
        // un bloc que ScrollTrigger n'a pas encore rallume, et le focus se pose
        // alors sur une commande invisible. Recevoir le focus termine l'entree.
        const auFocus = () => {
          mouvement.progress(1)
        }
        element.addEventListener('focusin', auFocus)

        return () => {
          element.removeEventListener('focusin', auFocus)
          mouvement.scrollTrigger?.kill()
          mouvement.kill()
        }
      })

      return () => media.revert()
    },
    { scope: cadre, dependencies: [delai] },
  )

  return (
    <div ref={cadre} className={classes('revelable', className)}>
      {children}
    </div>
  )
}
