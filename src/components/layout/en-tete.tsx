'use client'

import { AnimatePresence, LazyMotion, domAnimation, useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'
import { useEffect, useRef, useState } from 'react'

import { chemin } from '@/content/langues'
import type { Langue, Page } from '@/content/langues'
import type { Contenu } from '@/content/types'
import { Revelation } from '@/components/shared/revelation'
import { autreLangue } from '@/components/shared/autre-langue'
import { Bouton } from '@/components/shared/bouton'
import { classes } from '@/components/shared/classes'
import { CONTENEUR } from '@/components/shared/section'
import { Lien } from '@/components/shared/lien'
import { Logo } from '@/components/shared/logo'
import { SelecteurLangue } from '@/components/shared/selecteur-langue'

const FOCUS =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current'

/** Le fond et l'encre suivent la section survolee, sur la meme duree. */
const TRANSITION = 'transition-[background,color] duration-[260ms]'

/** Le decalage entre deux entrees du menu, a l'ouverture du panneau. */
const PAS_MENU = 0.06

/** Repli avant la premiere mesure, accorde au `min-h-18` de la barre. */
const HAUTEUR_INITIALE = 72

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
 * L'en-tete, et le panneau de navigation mobile qui l'accompagne.
 *
 * Il est collant **dans le flux** : `sticky` plus une marge basse negative
 * egale a sa hauteur, pour qu'il repose sur la section qui le suit. `fixed` se
 * cale sur la fenetre, barre de defilement comprise, et decalait le fond de
 * quelques pixels par rapport aux sections.
 *
 * Deux conditions tiennent hors de ce fichier : l'en-tete doit etre rendu comme
 * frere des sections qu'il survole — a l'interieur de l'une d'elles, `sticky` ne
 * depasserait pas son hote — et ces sections doivent etre des elements
 * `section`, seul motif que la sonde reconnait.
 *
 * L'en-tete et le panneau vivent dans le meme composant parce qu'ils partagent
 * un etat, mais le panneau est rendu **a cote** de l'en-tete et non dedans.
 * `position` plus `z-index` creent un contexte d'empilement, et un panneau en
 * `fixed` place dedans y voyait son z-index compter seulement a l'interieur :
 * la barre de pied du hero se peignait par-dessus et interceptait ses clics.
 *
 * `AnimatePresence` vient de `motion/react` et non de `motion/react-m` : c'est
 * la seule facon d'animer une sortie, un element demonte n'ayant plus rien a
 * animer.
 *
 * Le focus entre dans le panneau a l'ouverture et revient sur le bouton a la
 * fermeture — sans ca, le clavier repartirait du haut du document.
 */
export function EnTete({
  langue,
  page,
  contenu,
  cheminAutreLangue,
}: {
  langue: Langue
  page: Page
  contenu: Contenu['commun']['enTete']
  cheminAutreLangue: string
}) {
  const autre = autreLangue(langue)

  const [ouvert, setOuvert] = useState(false)
  const [clair, setClair] = useState(false)
  const [hauteur, setHauteur] = useState(HAUTEUR_INITIALE)
  const bascule = useRef<HTMLButtonElement>(null)
  const panneau = useRef<HTMLDivElement>(null)
  const barre = useRef<HTMLElement>(null)
  const mesuree = useRef(HAUTEUR_INITIALE)
  const image = useRef<number | null>(null)
  const reduit = useReducedMotion() ?? false

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

  const marque = (
    <Lien
      href={chemin(langue)}
      className={classes('inline-flex min-h-11 shrink-0 items-center', FOCUS)}
    >
      <Logo hauteur={24} className="block w-auto" />
    </Lien>
  )

  // Le design pose une pastille de 27 px. Sous 768 px la cible tactile passe
  // devant, et `e2e/adaptation.spec.ts` l'exige : la pastille y devient un carre
  // de 44 px. Elle tient dans la barre sans la grandir, qui fait 72 px de haut.
  const langues =
    'grid min-h-11 min-w-11 place-items-center rounded-etiquette text-[0.78125rem] tracking-[0.04em] uppercase large:min-h-0 large:min-w-0 large:px-2.5 large:py-1'

  return (
    <>
      <header
        ref={barre}
        className={classes(
          'sticky top-0 z-60',
          TRANSITION,
          clair ? 'text-primaire' : 'text-white',
        )}
        style={{ marginBottom: -hauteur }}
      >
        <div
          className={classes(
            CONTENEUR,
            'flex min-h-18 flex-wrap items-center justify-between gap-4 gap-y-2.5 py-3',
          )}
        >
          {marque}

          <nav
            aria-label={contenu.marque}
            className="ml-auto hidden flex-wrap items-center gap-0.5 large:flex"
          >
            {contenu.navigation.map((lien) => {
              const courante = lien.page === page
              return (
                <Lien
                  key={lien.page}
                  href={chemin(langue, lien.page)}
                  aria-current={courante ? 'page' : undefined}
                  className={classes(
                    'inline-flex items-center rounded-bloc px-2.5 py-2 text-[0.84375rem] whitespace-nowrap',
                    TRANSITION,
                    FOCUS,
                    courante
                      ? clair
                        ? 'bg-primaire text-white'
                        : 'bg-white text-encre'
                      : clair
                        ? 'text-encre-2 hover:text-encre'
                        : 'text-white/65 hover:text-white',
                  )}
                >
                  {lien.libelle}
                </Lien>
              )
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-3">
            <div
              role="group"
              aria-label={contenu.changerDeLangue}
              className="flex items-center gap-0.5"
            >
              <span
                aria-current="true"
                className={classes(langues, TRANSITION, clair ? 'bg-encre/8' : 'bg-white/10')}
              >
                {langue}
              </span>
              <SelecteurLangue
                langue={autre}
                vers={cheminAutreLangue}
                libelle={autre}
                className={classes(
                  langues,
                  TRANSITION,
                  FOCUS,
                  clair ? 'text-encre-3 hover:text-encre' : 'text-white/65 hover:text-white',
                )}
              />
            </div>

            <div className="hidden large:flex">
              <Bouton
                destination="rendezVous"
                libelle={contenu.cta}
                variante={clair ? 'vert' : 'blanc'}
                taille="compacte"
              />
            </div>

            <button
              ref={bascule}
              type="button"
              aria-expanded={ouvert}
              aria-label={contenu.menu}
              onClick={() => setOuvert(true)}
              className={classes(
                'inline-flex size-11 items-center justify-center rounded-bloc large:hidden',
                FOCUS,
              )}
            >
              <span aria-hidden className="flex flex-col gap-1.25">
                <span className="block h-[1.5px] w-4.5 bg-current" />
                <span className="block h-[1.5px] w-4.5 bg-current" />
              </span>
            </button>
          </div>
        </div>
      </header>

      <LazyMotion features={domAnimation} strict>
        <AnimatePresence>
          {ouvert ? (
            <m.div
              ref={panneau}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: reduit ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-90 flex flex-col overflow-y-auto bg-primaire px-[clamp(1.25rem,4vw,3.5rem)] pt-4 pb-8.5 text-white"
              onClick={(evenement) => {
                // Suivre un lien referme le panneau, sinon la page défilerait dessous.
                if (evenement.target instanceof Element && evenement.target.closest('a')) {
                  setOuvert(false)
                }
              }}
            >
              <div className="flex min-h-16 items-center justify-between">
                {marque}
                <button
                  type="button"
                  aria-label={contenu.fermerMenu}
                  onClick={() => setOuvert(false)}
                  className={classes(
                    // Voile sombre et non blanc : sur le vert, un voile blanc
                    // eclaircit l'aplat et fait passer l'encre sous le seuil.
                    'grid size-11 place-items-center rounded-bloc bg-voile/26 text-2xl leading-none text-white',
                    FOCUS,
                  )}
                >
                  <span aria-hidden>×</span>
                </button>
              </div>

              <nav aria-label={contenu.marque} className="mt-11">
                <ul className="flex flex-col gap-1.5">
                  {contenu.navigation.map((lien, indice) => {
                    const courante = lien.page === page
                    return (
                      <li key={lien.page}>
                        <Lien
                          href={chemin(langue, lien.page)}
                          aria-current={courante ? 'page' : undefined}
                          className={classes(
                            'flex min-h-13 items-center gap-3 text-[clamp(1.375rem,5.2vw,1.75rem)] leading-[1.15] tracking-[-0.04em] text-white',
                            FOCUS,
                          )}
                        >
                          {/* La page courante se marque par la puce et non par
                              une encre plus pale : sur le vert, le vert clair ne
                              tient que 2,6 : 1, et un blanc voile passerait sous
                              le seuil a ce corps. La puce est toujours rendue,
                              pour que les entrees restent alignees. */}
                          <span
                            aria-hidden
                            className={classes(
                              'size-1.5 shrink-0 rounded-pilule',
                              courante ? 'bg-white' : 'bg-transparent',
                            )}
                          />
                          {/* Le panneau se monte a l'ouverture : la revelation joue
                              des l'arrivee de GSAP, sans point de defilement a
                              attendre. */}
                          <Revelation
                            balise="span"
                            desLeMontage
                            delai={indice * PAS_MENU}
                            className="block"
                          >
                            {lien.libelle}
                          </Revelation>
                        </Lien>
                      </li>
                    )
                  })}
                </ul>
              </nav>

              <div className="mt-auto flex flex-col gap-3 border-t border-white/16 pt-6.5">
                <Bouton
                  destination="rendezVous"
                  libelle={contenu.cta}
                  variante="blanc"
                  className="min-h-12 w-full"
                />
                <div
                  role="group"
                  aria-label={contenu.changerDeLangue}
                  className="flex items-center justify-center gap-2.5 pt-1"
                >
                  {/* La langue en cours se marque par un voile SOMBRE : les
                      deux libelles sont en blanc plein, seul un fond les
                      distingue, et un voile blanc eclaircirait l'aplat. */}
                  <span
                    aria-current="true"
                    className="rounded-etiquette bg-voile/26 px-2.5 py-1 etiquette text-white"
                  >
                    {langue}
                  </span>
                  <span aria-hidden className="block h-3 w-px bg-white/30" />
                  <SelecteurLangue
                    langue={autre}
                    vers={cheminAutreLangue}
                    libelle={autre}
                    // Blanc plein, et non voile : mesure sur le vert du
                    // panneau, `text-white/65` tombait a 2,98 : 1 a ce corps.
                    className={classes(
                      'inline-flex min-h-11 min-w-11 items-center justify-center etiquette text-white',
                      FOCUS,
                    )}
                  />
                </div>
              </div>
            </m.div>
          ) : null}
        </AnimatePresence>
      </LazyMotion>
    </>
  )
}
