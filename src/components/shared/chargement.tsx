'use client'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { CustomEase } from 'gsap/CustomEase'
import { useRef } from 'react'

import { Logo } from '@/components/shared/logo'

gsap.registerPlugin(useGSAP, CustomEase)

/**
 * La courbe de sortie du site de reference, relevee dans son bundle. Distincte
 * de celle des revelations : elle demarre plus doucement, ce qui convient a une
 * surface pleine page que l'on retire.
 */
const COURBE = 'chargement'

if (!gsap.parseEase(COURBE)) {
  CustomEase.create(COURBE, '0.65, 0.01, 0.05, 0.99')
}

const DUREE_SORTIE = 0.7

/**
 * L'echeance de secours. Ce n'est pas une cible : une fonte qui n'arrive jamais
 * ne doit pas retenir la page derriere un voile plein ecran.
 */
const ECHEANCE_S = 2.5

const EVENEMENT = 'maldia:page-prete'

/**
 * Vrai des que le voile s'est retire. Necessaire parce qu'un composant monte
 * APRES le retrait n'entendrait jamais l'evenement et resterait invisible.
 */
let prete = false

/**
 * S'abonne au retrait du voile, ou rappelle tout de suite s'il est deja parti.
 * Rend la fonction de desabonnement.
 */
export function quandPagePrete(rappel: () => void) {
  if (prete) {
    rappel()
    return () => {}
  }

  document.addEventListener(EVENEMENT, rappel, { once: true })
  return () => document.removeEventListener(EVENEMENT, rappel)
}

/**
 * Le voile de chargement.
 *
 * Il existe pour une raison precise : le titre du hero est confie a
 * `Revelation`, donc invisible tant que GSAP n'a pas decoupe ses lignes. Sans
 * voile, on verrait un aplat vert vide pendant ce temps. Le voile couvre ce
 * delai, puis se retire et laisse le hero jouer.
 *
 * **Il ne peut pas rester coince.** Rendu par un composant client, il est absent
 * du HTML statique : sans script, il n'existe pas et la page se lit normalement.
 * Et il attend `document.fonts.ready` avec une echeance, jamais un signal qui
 * pourrait ne pas venir.
 *
 * `aria-hidden` : il ne porte aucune information. Le contenu est dans le HTML,
 * et un lecteur d'ecran le lit sans attendre le retrait.
 *
 * Mouvement reduit : le voile part sans transition.
 */
export function Chargement() {
  const voile = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const element = voile.current
      if (!element) return

      const reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      const liberer = () => {
        if (prete) return
        prete = true
        document.dispatchEvent(new Event(EVENEMENT))

        gsap.to(element, {
          yPercent: -100,
          duration: reduit ? 0 : DUREE_SORTIE,
          ease: COURBE,
          onComplete: () => element.remove(),
        })
      }

      // Les fontes decident du decoupage en lignes : liberer avant leur arrivee
      // ferait mesurer le hero avec la fonte de repli, puis redecouper a chaud.
      const secours = gsap.delayedCall(ECHEANCE_S, liberer)
      document.fonts.ready.then(() => {
        secours.kill()
        liberer()
      })

      return () => secours.kill()
    },
    { scope: voile },
  )

  return (
    <div ref={voile} aria-hidden className="fixed inset-0 z-90 grid place-items-center bg-primaire">
      <Logo hauteur={34} className="w-auto text-white" />
    </div>
  )
}
