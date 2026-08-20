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

const FOCUS_CLAIR = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-encre'
const FOCUS_SOMBRE = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'

/**
 * Les deux registres du design.
 *
 * `sombre` est posé sur la photo du hero, sans aplat : la navigation flotte sur
 * une pilule de verre pour rester lisible sur n'importe quelle zone de l'image.
 *
 * `clair` est collé en haut, sur un blanc translucide flouté, et se détache par
 * un filet bas. C'est celui du blog.
 */
export type RegistreEnTete = 'sombre' | 'clair'

type Registre = {
  entete: string
  marqueFond: string
  marqueTexte: string
  marqueLettre: string
  nav: string
  lienActif: string
  lienInactif: string
  puce: string
  bascule: string
  barre: string
  focus: string
}

const REGISTRES: Record<RegistreEnTete, Registre> = {
  sombre: {
    entete: 'pt-6.5',
    marqueFond: 'bg-white',
    marqueTexte: 'text-white',
    marqueLettre: 'text-encre',
    nav: 'rounded-bloc bg-[rgb(12_24_19/0.58)] px-2.5 py-1.75 backdrop-blur-[10px]',
    lienActif: 'rounded-liste text-white',
    lienInactif: 'rounded-liste text-white/72 hover:text-white',
    puce: 'bg-signal',
    bascule: 'bg-[rgb(12_24_19/0.58)] backdrop-blur-[10px]',
    barre: 'bg-white',
    focus: FOCUS_SOMBRE,
  },
  clair: {
    // Collé, translucide, flouté : le `backdrop-filter` crée un bloc conteneur,
    // et c'est pour cela que le panneau mobile est un frère de l'en-tête et non
    // un descendant — il y serait réduit à la taille de l'en-tête.
    entete:
      'sticky top-0 border-b border-trait-2 bg-white/90 py-4 backdrop-blur-[12px]',
    marqueFond: 'bg-primaire',
    marqueTexte: 'text-encre',
    marqueLettre: 'text-white',
    nav: 'rounded-pilule bg-fond-2 px-2 py-1.5',
    lienActif: 'rounded-pilule bg-white text-encre',
    lienInactif: 'rounded-pilule text-encre-2 hover:text-encre',
    puce: 'bg-primaire',
    bascule: 'bg-fond-2',
    barre: 'bg-encre',
    focus: FOCUS_CLAIR,
  },
}

/**
 * L'en-tête, et le panneau de navigation mobile qui l'accompagne.
 *
 * Les deux vivent dans le même composant parce qu'ils partagent un état, mais
 * le panneau est rendu **à côté** de l'en-tête et non dedans : en registre
 * `clair`, l'en-tête porte `position: sticky` et un `backdrop-filter`, deux
 * propriétés qui créent un bloc conteneur pour les descendants en `fixed`.
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
  registre = 'sombre',
}: {
  langue: Langue
  page: Page
  contenu: Contenu['commun']['enTete']
  cheminAutreLangue: string
  registre?: RegistreEnTete
}) {
  const r = REGISTRES[registre]
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

  const marque = (sombre: boolean) => (
    <Lien
      href={chemin(langue)}
      className={classes(
        'inline-flex min-h-11 min-w-0 items-center gap-3',
        sombre ? FOCUS_SOMBRE : r.focus,
      )}
    >
      <span
        aria-hidden
        className={classes(
          'grid size-10 shrink-0 place-items-center rounded-bloc text-[1.1875rem] font-semibold',
          sombre ? 'bg-white text-encre' : classes(r.marqueFond, r.marqueLettre),
        )}
      >
        {contenu.initiale}
      </span>
      <span
        className={classes(
          'text-[1.3125rem] font-semibold tracking-[-0.045em]',
          sombre ? 'text-white' : r.marqueTexte,
        )}
      >
        {contenu.marque}
      </span>
    </Lien>
  )

  return (
    <>
      <header
        className={classes(
          'z-60 mx-auto flex w-full max-w-[87.5rem] items-center justify-between gap-6 px-[clamp(1.25rem,4vw,3.5rem)]',
          registre === 'sombre' ? 'relative' : '',
          r.entete,
        )}
      >
        {marque(registre === 'sombre')}

        <div className="flex items-center gap-2.5">
          <nav
            aria-label={contenu.marque}
            className={classes('hidden items-center gap-1 large:flex', r.nav)}
          >
            {contenu.navigation.map((lien) => {
              const courante = lien.page === page
              return (
                <Lien
                  key={lien.page}
                  href={chemin(langue, lien.page)}
                  aria-current={courante ? 'page' : undefined}
                  className={classes(
                    'inline-flex min-h-8 items-center gap-1.75 px-3.25 etiquette transition-[color,background-color]',
                    r.focus,
                    courante ? r.lienActif : r.lienInactif,
                  )}
                >
                  {courante ? (
                    <span aria-hidden className={classes('size-1.25 shrink-0 rounded-pilule', r.puce)} />
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
              'inline-flex size-11 items-center justify-center rounded-bloc large:hidden',
              r.bascule,
              r.focus,
            )}
          >
            <span aria-hidden className="flex flex-col gap-1.25">
              <span className={classes('block h-[1.5px] w-4.5', r.barre)} />
              <span className={classes('block h-[1.5px] w-4.5', r.barre)} />
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
                {marque(true)}
                <button
                  type="button"
                  aria-label={contenu.fermerMenu}
                  onClick={() => setOuvert(false)}
                  className={classes(
                    'grid size-11 place-items-center rounded-bloc bg-white/12 text-2xl leading-none text-white',
                    FOCUS_SOMBRE,
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
                            FOCUS_SOMBRE,
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
                      FOCUS_SOMBRE,
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
