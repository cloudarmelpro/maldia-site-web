'use client'

import { useRef, useState } from 'react'

import { useFondSurvole } from '@/components/layout/fond-survole'
import { PanneauNavigation } from '@/components/layout/panneau-navigation'
import { chemin } from '@/content/langues'
import type { Langue, Page } from '@/content/langues'
import type { Contenu } from '@/content/types'
import { FOCUS_SUIVEUR } from '@/components/shared/focus'
import { autreLangue } from '@/components/shared/autre-langue'
import { Bouton } from '@/components/shared/bouton'
import { classes } from '@/components/shared/classes'
import { CONTENEUR } from '@/components/shared/section'
import { Lien } from '@/components/shared/lien'
import { Logo } from '@/components/shared/logo'
import { SelecteurLangue } from '@/components/shared/selecteur-langue'

/** Le fond et l'encre suivent la section survolee, sur la meme duree. */
const TRANSITION = 'transition-[background,color] duration-[260ms]'

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

  const { barre, hauteur, clair } = useFondSurvole()
  const [ouvert, setOuvert] = useState(false)
  const bascule = useRef<HTMLButtonElement>(null)
  const panneau = useRef<HTMLDivElement>(null)

  const marque = (
    <Lien
      href={chemin(langue)}
      className={classes('inline-flex min-h-11 shrink-0 items-center', FOCUS_SUIVEUR)}
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
                    FOCUS_SUIVEUR,
                    courante
                      ? clair
                        ? 'bg-primaire text-white'
                        : 'bg-white text-encre'
                      : clair
                        ? 'text-encre-2 hover:text-encre'
                        // Blanc plein : `text-white/65` sur le vert mesurait
                        // 3,09 : 1, sous le seuil AA — et l'opacite ne pouvait
                        // pas le sauver, /85 donnant 4,15 et /90 4,44. La page
                        // courante se distingue de toute facon par sa pastille
                        // pleine, pas par l'encre des autres.
                        : 'text-white hover:text-white',
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
                className={classes(langues, TRANSITION, clair ? 'bg-encre/8' : 'bg-voile/26')}
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
                  FOCUS_SUIVEUR,
                  // Meme raison : la langue en cours porte un voile sombre, et
                  // c'est lui qui la marque.
                  clair ? 'text-encre-3 hover:text-encre' : 'text-white hover:text-white',
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
                FOCUS_SUIVEUR,
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

      <PanneauNavigation
        langue={langue}
        page={page}
        contenu={contenu}
        cheminAutreLangue={cheminAutreLangue}
        ouvert={ouvert}
        setOuvert={setOuvert}
        panneau={panneau}
        bascule={bascule}
        marque={marque}
      />
    </>
  )
}
