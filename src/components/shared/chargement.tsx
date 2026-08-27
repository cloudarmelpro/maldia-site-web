'use client'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { CustomEase } from 'gsap/CustomEase'
import { useRef, useState } from 'react'

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

/**
 * Vrai des que le voile s'est retire. Necessaire parce qu'un composant monte
 * APRES le retrait n'entendrait jamais le signal et resterait invisible.
 *
 * **Remis a faux a chaque montage du voile.** Cet etat vit au niveau du module,
 * donc il survit a une navigation cote client : laisse a vrai, la page suivante
 * monterait un voile que plus rien ne libererait.
 */
let prete = false

const abonnes = new Set<() => void>()

/**
 * S'abonne au retrait du voile, ou rappelle tout de suite s'il est deja parti.
 * Rend la fonction de desabonnement.
 */
export function quandPagePrete(rappel: () => void) {
  if (prete) {
    rappel()
    return () => {}
  }

  abonnes.add(rappel)
  return () => {
    abonnes.delete(rappel)
  }
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
  const [parti, setParti] = useState(false)

  useGSAP(
    () => {
      const element = voile.current
      if (!element) return

      // Ce voile-ci est neuf : la page repart couverte, quoi qu'ait laisse la
      // precedente. L'effet de `Chargement` s'execute avant ceux de `main`,
      // donc aucune revelation ne lit encore l'ancienne valeur.
      prete = false
      let libere = false

      const reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      const liberer = () => {
        // Garde LOCALE a cette instance, et non l'etat de module : c'est ce qui
        // empeche un voile de rester en place parce que le precedent est deja
        // parti.
        if (libere) return
        libere = true
        prete = true

        for (const rappel of [...abonnes]) rappel()
        abonnes.clear()

        gsap.to(element, {
          yPercent: -100,
          duration: reduit ? 0 : DUREE_SORTIE,
          ease: COURBE,
          // Le retrait passe par un rendu React et jamais par `element.remove()`.
          // Ce noeud est rendu par React : le lui arracher laisse sa trace des
          // enfants fausse, et la prochaine insertion echoue sur un
          // `insertBefore` dont le repere n'est plus un enfant du parent.
          onComplete: () => setParti(true),
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

  if (parti) return null

  return (
    <div ref={voile} aria-hidden className="fixed inset-0 z-90 grid place-items-center bg-primaire">
      <Logo hauteur={34} className="w-auto text-white" />
    </div>
  )
}
