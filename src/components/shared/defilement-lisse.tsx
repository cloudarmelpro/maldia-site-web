'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { useEffect } from 'react'

gsap.registerPlugin(ScrollTrigger)

/**
 * L'instance vit au niveau du module et non dans un contexte React : elle est
 * unique par page, et les rares composants qui doivent la piloter — le chevron
 * — n'ont rien d'autre en commun avec celui qui la cree.
 *
 * Nulle quand le visiteur reduit le mouvement : Lenis n'est alors pas construit
 * du tout.
 */
let instance: Lenis | null = null

const REPLI_HAUTEUR_EN_TETE = 96

function mouvementReduit() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Le decalage des ancres internes. `scroll-padding-top` ne s'applique qu'au
 * defilement natif : des que Lenis l'intercepte, la regle CSS n'est plus lue et
 * un titre vise atterrit sous la barre collante.
 */
function decalageAncre() {
  const publiee = getComputedStyle(document.documentElement).getPropertyValue('--hauteur-en-tete')
  const hauteur = Number.parseFloat(publiee)
  return -((Number.isFinite(hauteur) && hauteur > 0 ? hauteur : REPLI_HAUTEUR_EN_TETE) + 24)
}

/**
 * Defile vers une position, en passant par Lenis quand il est la.
 *
 * `window.scrollTo({ behavior: 'smooth' })` se battrait avec lui : les deux
 * animeraient la meme valeur en meme temps, et le defilement saccaderait.
 */
export function faireDefilerVers(cible: number) {
  if (instance !== null) {
    instance.scrollTo(cible)
    return
  }

  window.scrollTo({ top: cible, behavior: mouvementReduit() ? 'auto' : 'smooth' })
}

/**
 * Le defilement lisse du design de reference.
 *
 * Ne rend rien. Monte dans le gabarit, donc sur les six pages.
 *
 * Lenis defile la **vraie fenetre** : `window.scrollY` reste juste et les
 * ecouteurs de `scroll` continuent de recevoir leurs evenements. C'est ce qui
 * permet a l'en-tete collant, a la barre de progression et au chevron de rester
 * inchanges.
 *
 * Le pilotage passe par le ticker de GSAP plutot que par le `requestAnimationFrame`
 * interne de Lenis : deux boucles d'images independantes rendraient ScrollTrigger
 * en retard d'une image sur le defilement, et les revelations se declencheraient
 * a cote de leur point.
 *
 * **Rien n'est construit sous `prefers-reduced-motion`.** Un defilement qui
 * continue apres le geste est un cas type de gene vestibulaire ; la page garde
 * alors le defilement natif du navigateur.
 */
export function DefilementLisse() {
  useEffect(() => {
    if (mouvementReduit()) return

    const lenis = new Lenis({ autoRaf: false, anchors: { offset: decalageAncre() } })
    instance = lenis

    lenis.on('scroll', ScrollTrigger.update)

    const avancer = (temps: number) => lenis.raf(temps * 1000)
    gsap.ticker.add(avancer)
    // Le rattrapage d'images de GSAP fait sauter le defilement quand l'onglet
    // reprend la main. Les valeurs rendues sont celles par defaut de GSAP.
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(avancer)
      gsap.ticker.lagSmoothing(500, 33)
      lenis.destroy()
      instance = null
    }
  }, [])

  return null
}
