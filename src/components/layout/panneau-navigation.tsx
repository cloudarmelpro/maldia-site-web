'use client'

import { AnimatePresence, LazyMotion, domAnimation, useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'
import { useEffect, type RefObject } from 'react'

import { chemin } from '@/content/langues'
import type { Langue, Page } from '@/content/langues'
import type { Contenu } from '@/content/types'
import { autreLangue } from '@/components/shared/autre-langue'
import { Bouton } from '@/components/shared/bouton'
import { classes } from '@/components/shared/classes'
import { FOCUS_SUIVEUR } from '@/components/shared/focus'
import { Lien } from '@/components/shared/lien'
import { Revelation } from '@/components/shared/revelation'
import { SelecteurLangue } from '@/components/shared/selecteur-langue'

/** Le decalage entre deux entrees du menu, a l'ouverture du panneau. */
const PAS_MENU = 0.06

/**
 * Le panneau de navigation mobile.
 *
 * Il vivait dans `en-tete.tsx`, ou il occupait 117 lignes de balisage sans
 * rapport avec la barre : celle-ci a une sonde de fond, une navigation de
 * bureau et un selecteur de langue, lui a une liste plein ecran, un piege a
 * focus et une animation de sortie. Deux sujets, un fichier.
 *
 * Il est rendu **a cote** de l'en-tete et non dedans. `position` plus `z-index`
 * creent un contexte d'empilement, et un panneau en `fixed` place dedans y
 * voyait son z-index compter seulement a l'interieur : la barre de pied du hero
 * se peignait par-dessus et interceptait ses clics.
 *
 * `AnimatePresence` vient de `motion/react` et non de `motion/react-m` : c'est
 * la seule facon d'animer une sortie, un element demonte n'ayant plus rien a
 * animer.
 *
 * Le focus entre dans le panneau a l'ouverture et revient sur le bouton a la
 * fermeture — sans ca, le clavier repartirait du haut du document.
 */
export function PanneauNavigation({
  langue,
  page,
  contenu,
  cheminAutreLangue,
  ouvert,
  setOuvert,
  panneau,
  bascule,
  marque,
}: {
  langue: Langue
  page: Page
  contenu: Contenu['commun']['enTete']
  cheminAutreLangue: string
  ouvert: boolean
  setOuvert: (valeur: boolean) => void
  panneau: RefObject<HTMLDivElement | null>
  bascule: RefObject<HTMLButtonElement | null>
  /** Le logotype, rendu a l'identique dans la barre et dans le panneau. */
  marque: React.ReactNode
}) {
  const autre = autreLangue(langue)
  const reduit = useReducedMotion() ?? false

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
  }, [ouvert, setOuvert, panneau, bascule])

  return (
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
                FOCUS_SUIVEUR,
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
                        FOCUS_SUIVEUR,
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
                FOCUS_SUIVEUR,
              )}
            />
          </div>
        </div>
      </m.div>
    ) : null}
  </AnimatePresence>
</LazyMotion>
  )
}
