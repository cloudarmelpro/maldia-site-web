'use client'

import { useEffect, useRef, useState } from 'react'

/** Repli avant la premiere mesure, accorde au `min-h-18` de la barre. */
export const HAUTEUR_INITIALE = 72

/** Le point sonde, juste sous le bord bas de l'en-tete. */
const SONDE = 6

const SEUIL_DEFILEMENT = 8

const SEUIL_LUMINANCE = 150

/**
 * Le fond est-il assez clair pour que l'encre passe au vert ?
 *
 * `getComputedStyle` rend `rgb(...)` ou `rgba(...)` pour un aplat ; tout autre
 * espace — l'`oklab` d'un `color-mix` — retombe sur sombre, l'encre blanche
 * etant le repli sur, y compris sur le vert de marque.
 */
function estClair(couleur: string): boolean {
  const composantes = couleur.startsWith('rgb') ? couleur.match(/[\d.]+/g) : null
  if (!composantes || composantes.length < 3) return false
  const [rouge, vert, bleu] = composantes.map(Number)
  return 0.299 * rouge + 0.587 * vert + 0.114 * bleu > SEUIL_LUMINANCE
}

/**
 * L'en-tete prend le fond exact de la section qu'il survole.
 *
 * Il est separe de `en-tete.tsx` : c'est un mecanisme, pas un rendu, et il n'a
 * rapport ni avec le balisage de la barre ni avec le panneau mobile.
 *
 * **Deux conditions tiennent hors d'ici** : l'en-tete doit etre rendu comme
 * frere des sections qu'il survole — a l'interieur de l'une d'elles, `sticky`
 * ne depasserait pas son hote — et ces sections doivent etre des elements
 * `section`, seul motif que la sonde reconnait.
 *
 * Rend la `ref` a poser sur l'en-tete, sa hauteur mesuree, et si son encre doit
 * passer au vert.
 */
export function useFondSurvole() {
  const [clair, setClair] = useState(false)
  const [hauteur, setHauteur] = useState(HAUTEUR_INITIALE)
  const barre = useRef<HTMLElement>(null)
  const mesuree = useRef(HAUTEUR_INITIALE)
  const image = useRef<number | null>(null)

  useEffect(() => {
    const element = barre.current
    if (!element) return

    /*
     * Le fond, sa taille et sa position changent a chaque pixel defile : ils
     * sont ecrits sur le noeud plutot que passes en etat, pour ne pas
     * reconcilier l'en-tete entier a chaque image. Seule la bascule d'encre,
     * rare, passe par React.
     */
    const mesurer = () => {
      image.current = null
      const defile = window.scrollY > SEUIL_DEFILEMENT
      const survolee = document
        .elementsFromPoint(Math.round(window.innerWidth / 2), mesuree.current + SONDE)
        // Une section qui contient l'en-tete lui rendrait son propre fond.
        .find((noeud) => noeud.matches('section') && !noeud.contains(element))

      if (!survolee) return

      const style = getComputedStyle(survolee)
      const motif = style.backgroundImage
      const boite = survolee.getBoundingClientRect()

      // `background` est un raccourci : il efface taille et position, qui se
      // reposent donc apres lui, recalees sur la boite de la section pour que
      // la jointure d'un degrade reste invisible.
      element.style.background = defile
        ? motif === 'none'
          ? style.backgroundColor
          : `${motif}, ${style.backgroundColor}`
        : 'transparent'
      element.style.backgroundSize = `${Math.round(boite.width)}px ${Math.round(boite.height)}px`
      element.style.backgroundPosition = `${Math.round(boite.left)}px ${Math.round(boite.top)}px`

      setClair(defile && estClair(style.backgroundColor))
    }

    const surDefilement = () => {
      if (image.current === null) image.current = requestAnimationFrame(mesurer)
    }

    const observateur = new ResizeObserver(() => {
      const valeur = Math.round(element.getBoundingClientRect().height)
      if (!valeur) return

      // Publiee a CHAQUE mesure, y compris la premiere, et avant le garde
      // d'egalite. La hauteur reelle vaut justement `HAUTEUR_INITIALE` tant que
      // la navigation ne passe pas a la ligne : compare a `mesuree`, ce cas —
      // le plus frequent de tous — sortait avant la publication, et la variable
      // n'etait jamais posee. `scroll-padding-top` ne tenait alors que par son
      // repli, egal par coincidence.
      document.documentElement.style.setProperty('--hauteur-en-tete', `${valeur}px`)

      if (valeur === mesuree.current) return
      mesuree.current = valeur
      setHauteur(valeur)
      surDefilement()
    })
    observateur.observe(element)

    mesurer()
    window.addEventListener('scroll', surDefilement, { passive: true })
    window.addEventListener('resize', surDefilement, { passive: true })

    return () => {
      observateur.disconnect()
      window.removeEventListener('scroll', surDefilement)
      window.removeEventListener('resize', surDefilement)
      if (image.current !== null) cancelAnimationFrame(image.current)
    }
  }, [])

  return { barre, hauteur, clair }
}
