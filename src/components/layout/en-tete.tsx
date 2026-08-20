'use client'

import { AnimatePresence, LazyMotion, domAnimation, useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'
import { useEffect, useRef, useState } from 'react'

import { chemin } from '@/content/langues'
import type { Langue, Page } from '@/content/langues'
import type { Contenu } from '@/content/types'
import { autreLangue } from '@/components/shared/autre-langue'
import { Bouton } from '@/components/shared/bouton'
import { classes } from '@/components/shared/classes'
import { Lien } from '@/components/shared/lien'
import { SelecteurLangue } from '@/components/shared/selecteur-langue'

const FOCUS = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'

/**
 * L'en-tête, et le panneau de navigation mobile qui l'accompagne.
 *
 * Il est transparent : il se pose sur la photo du hero, ou sur l'aplat nuit
 * qu'une page intérieure met derrière lui. Il n'est pas collé — il défile avec
 * la page, comme dans le design.
 *
 * Les deux vivent dans le même composant parce qu'ils partagent un état, mais
 * le panneau est rendu **à côté** de l'en-tête et non dedans. `position` plus
 * `z-index` créent un contexte d'empilement, et un panneau en `fixed` placé
 * dedans y voyait son z-index compter seulement à l'intérieur : la barre de
 * pied du hero se peignait par-dessus et interceptait ses clics.
 *
 * `AnimatePresence` vient de `motion/react` et non de `motion/react-m` : c'est
 * la seule façon d'animer une sortie, un élément démonté n'ayant plus rien à
 * animer.
 *
 * Le focus entre dans le panneau à l'ouverture et revient sur le bouton à la
 * fermeture — sans ça, le clavier repartirait du haut du document.
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
  const bascule = useRef<HTMLButtonElement>(null)
  const panneau = useRef<HTMLDivElement>(null)
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
  }, [ouvert])

  const marque = (
    <Lien
      href={chemin(langue)}
      className={classes('inline-flex min-h-11 min-w-0 items-center gap-3', FOCUS)}
    >
      <span
        aria-hidden
        className="grid size-10 shrink-0 place-items-center rounded-bloc bg-white text-[1.1875rem] font-semibold text-encre"
      >
        {contenu.initiale}
      </span>
      <span className="text-[1.3125rem] font-semibold tracking-[-0.045em] text-white">
        {contenu.marque}
      </span>
    </Lien>
  )

  return (
    <>
      <header className="relative z-60 mx-auto flex w-full max-w-[87.5rem] items-center justify-between gap-6 px-[clamp(1.25rem,4vw,3.5rem)] pt-6.5">
        {marque}

        <div className="flex items-center gap-2.5">
          <nav
            aria-label={contenu.marque}
            className="hidden items-center gap-1 rounded-bloc bg-[rgb(12_24_19/0.58)] px-2.5 py-1.75 backdrop-blur-[10px] large:flex"
          >
            {contenu.navigation.map((lien) => {
              const courante = lien.page === page
              return (
                <Lien
                  key={lien.page}
                  href={chemin(langue, lien.page)}
                  aria-current={courante ? 'page' : undefined}
                  className={classes(
                    'inline-flex min-h-8 items-center gap-1.75 rounded-liste px-3.25 etiquette transition-[color]',
                    FOCUS,
                    courante ? 'text-white' : 'text-white/72 hover:text-white',
                  )}
                >
                  {courante ? (
                    <span aria-hidden className="size-1.25 shrink-0 rounded-pilule bg-signal" />
                  ) : null}
                  {lien.libelle}
                </Lien>
              )
            })}
          </nav>

          <div className="hidden large:flex">
            <Bouton
              destination="rendezVous"
              libelle={contenu.cta}
              variante="encre"
              taille="compacte"
              ornement="etoile"
            />
          </div>

          <button
            ref={bascule}
            type="button"
            aria-expanded={ouvert}
            aria-label={contenu.menu}
            onClick={() => setOuvert(true)}
            className={classes(
              'inline-flex size-11 items-center justify-center rounded-bloc bg-[rgb(12_24_19/0.58)] backdrop-blur-[10px] large:hidden',
              FOCUS,
            )}
          >
            <span aria-hidden className="flex flex-col gap-1.25">
              <span className="block h-[1.5px] w-4.5 bg-white" />
              <span className="block h-[1.5px] w-4.5 bg-white" />
            </span>
          </button>
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
              className="fixed inset-0 z-90 flex flex-col overflow-y-auto bg-nuit px-[clamp(1.25rem,4vw,3.5rem)] pt-4 pb-8.5"
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
                    'grid size-11 place-items-center rounded-bloc bg-white/12 text-2xl leading-none text-white',
                    FOCUS,
                  )}
                >
                  <span aria-hidden>×</span>
                </button>
              </div>

              <nav aria-label={contenu.marque} className="mt-11">
                <ul className="flex flex-col gap-1.5">
                  {contenu.navigation.map((lien) => {
                    const courante = lien.page === page
                    return (
                      <li key={lien.page}>
                        <Lien
                          href={chemin(langue, lien.page)}
                          aria-current={courante ? 'page' : undefined}
                          className={classes(
                            'flex min-h-13 items-center text-[clamp(1.875rem,8vw,2.5rem)] leading-[1.15] tracking-[-0.04em]',
                            FOCUS,
                            courante ? 'text-lime' : 'text-white',
                          )}
                        >
                          {lien.libelle}
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
                  <span aria-current="true" className="etiquette text-white">
                    {langue}
                  </span>
                  <span aria-hidden className="block h-3 w-px bg-white/30" />
                  <SelecteurLangue
                    langue={autre}
                    vers={cheminAutreLangue}
                    libelle={autre}
                    className={classes(
                      'inline-flex min-h-11 min-w-11 items-center justify-center etiquette text-sur-sombre hover:text-white',
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
