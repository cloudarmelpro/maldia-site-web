import Link from 'next/link'

import { chemin } from '@/content/langues'
import type { Langue, Page } from '@/content/langues'
import type { Contenu } from '@/content/types'
import { MenuMobile } from '@/components/layout/menu-mobile'
import { autreLangue } from '@/components/shared/autre-langue'
import { Facebook, Instagram, Linkedin } from '@/components/shared/icones-reseaux'
import { SelecteurLangue } from '@/components/shared/selecteur-langue'
import { Bouton } from '@/components/shared/bouton'

const CLASSES_FOCUS =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primaire'

// transition-[color] et non transition-colors : cette dernière couvre
// outline-color et retarderait l'anneau de focus.
const CLASSES_LIEN = `transition-[color,background-color] hover:text-encre ${CLASSES_FOCUS}`

/**
 * L'en-tête n'est pas collé : il défile avec la page.
 *
 * La maquette le déclare `position: sticky`, mais son enveloppe porte
 * `overflow-x: hidden`. En CSS, quand un axe vaut `hidden` et l'autre `visible`,
 * le `visible` est recalculé en `auto` : l'enveloppe devient un conteneur de
 * défilement et le `sticky` s'y accroche au lieu de la fenêtre. Le rendu de la
 * maquette est donc un en-tête qui s'en va — c'est celui-là qu'on reproduit.
 *
 * La navigation porte les six pages (WEB-11). La page courante est marquée
 * `aria-current="page"` : sans elle, rien ne dit où l'on se trouve à qui
 * n'accède pas à la couleur.
 */
export function EnTete({
  langue,
  page,
  contenu,
  cheminAutreLangue,
  changerDeLangue,
}: {
  langue: Langue
  page: Page
  contenu: Contenu['commun']['enTete']
  cheminAutreLangue: string
  changerDeLangue: string
}) {
  const autre = autreLangue(langue)

  const marque = (
    <Link
      href={chemin(langue)}
      className={`inline-flex min-h-11 min-w-0 items-center gap-3 font-titre text-[1.6875rem] font-medium tracking-[-0.045em] text-encre ${CLASSES_FOCUS}`}
    >
      <span
        aria-hidden
        className="grid size-11 shrink-0 place-items-center rounded-marque bg-primaire text-[1.375rem] font-semibold text-carte"
      >
        {contenu.initiale}
      </span>
      {contenu.marque}
    </Link>
  )

  return (
    // Fond plein, sans `backdrop-filter` : la propriété crée un bloc conteneur
    // pour les descendants en `fixed`, et le panneau mobile s'y trouvait réduit
    // à la hauteur de l'en-tête au lieu de couvrir la fenêtre. Le flou n'avait
    // de toute façon rien à flouter — l'en-tête n'est pas collé.
    <header className="relative z-[60] bg-fond">
      <div className="mx-auto flex h-20 w-full max-w-[1260px] items-center justify-between gap-[clamp(1.25rem,2.8vw,2.5rem)] px-[clamp(1.25rem,2.8vw,2.5rem)]">
        {marque}

        <nav className="hidden lg:block">
          <ul className="flex items-center gap-[clamp(0.5rem,0.85vw,1.0625rem)]">
            {contenu.navigation.map((lien) => {
              const courante = lien.page === page
              return (
                <li key={lien.page}>
                  <Link
                    href={chemin(langue, lien.page)}
                    aria-current={courante ? 'page' : undefined}
                    className={`inline-flex min-h-11 items-center rounded-pilule font-description text-[1.0625rem] font-normal whitespace-nowrap hover:text-primaire ${
                      courante ? 'text-primaire' : 'text-encre'
                    } ${CLASSES_LIEN}`}
                  >
                    {lien.libelle}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="hidden lg:flex">
          <Bouton destination="rendezVous" libelle={contenu.cta} variante="contour" />
        </div>

        <MenuMobile libelle={contenu.menu} marque={marque} className="lg:hidden">
          <nav className="mt-10">
            <ul className="flex flex-col gap-1">
              {contenu.navigation.map((lien) => {
                const courante = lien.page === page
                return (
                  <li key={lien.page}>
                    <Link
                      href={chemin(langue, lien.page)}
                      aria-current={courante ? 'page' : undefined}
                      className={`flex min-h-12 items-center text-[2rem] leading-tight tracking-[-0.03em] ${
                        courante ? 'text-primaire' : 'text-encre'
                      } ${CLASSES_FOCUS}`}
                    >
                      {lien.libelle}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="mt-auto flex flex-col gap-6 border-t border-trait pt-7">
            <Bouton
              destination="rendezVous"
              libelle={contenu.cta}
              className="w-full rounded-[0.75rem]"
            />
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Décoratifs tant que les comptes ne sont pas fournis. */}
              <span aria-hidden className="flex gap-3">
                {[Facebook, Instagram, Linkedin].map((Icone, indice) => (
                  <span
                    key={indice}
                    className="grid size-10 place-items-center rounded-full border border-trait text-encre-2"
                  >
                    <Icone className="size-4" />
                  </span>
                ))}
              </span>
              <div role="group" aria-label={changerDeLangue} className="flex items-center gap-2.5">
                <span
                  aria-current="true"
                  className="font-description text-sm font-semibold text-encre uppercase"
                >
                  {langue}
                </span>
                <SelecteurLangue
                  langue={autre}
                  vers={cheminAutreLangue}
                  libelle={autre}
                  className={`inline-flex min-h-11 min-w-11 items-center justify-center font-description text-sm text-encre-2 uppercase ${CLASSES_LIEN}`}
                />
              </div>
            </div>
          </div>
        </MenuMobile>
      </div>
    </header>
  )
}
