import Link from 'next/link'

import { chemin, NOMS_LANGUES } from '@/content/langues'
import type { Langue, Page } from '@/content/langues'
import type { Contenu } from '@/content/types'
import { autreLangue } from '@/components/shared/autre-langue'
import { Bouton } from '@/components/shared/bouton'
import { Facebook, Instagram, Linkedin } from '@/components/shared/icones-reseaux'
import { CONTENEUR } from '@/components/shared/section'
import { SelecteurLangue } from '@/components/shared/selecteur-langue'

// transition-[color] et non transition-colors : cette dernière couvre
// outline-color et retarderait l'anneau de focus.
const RESEAUX = [
  { cle: 'facebook', Icone: Facebook },
  { cle: 'linkedin', Icone: Linkedin },
  { cle: 'instagram', Icone: Instagram },
] as const

const CLASSES_LIEN =
  'transition-[color] hover:text-sur-vif focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-carte'

/**
 * Le pied prolonge le bloc de clôture : même aplat, sans coupure — c'est ainsi
 * que la maquette les enchaîne.
 *
 * C'est ici que vit le choix de langue (WEB-8), et nulle part ailleurs : les
 * deux langues sont montrées côte à côte, la courante marquée `aria-current`.
 * Une seule des deux est un lien — l'autre mènerait à la page qu'on regarde.
 *
 * Les liens sociaux de la maquette ne mènent nulle part (`href="#"`). Ici ils
 * n'existent pas comme liens : ce sont des repères visuels, `aria-hidden`. Un
 * lien qui ne va nulle part est pire qu'un lien absent.
 */
export function Pied({
  langue,
  page,
  contenu,
  cheminAutreLangue,
  changerDeLangue,
}: {
  langue: Langue
  page: Page
  contenu: Contenu['commun']['pied']
  /** La même page dans l'autre langue — calculée par le gabarit. */
  cheminAutreLangue: string
  /** Nom accessible du groupe de langues (WEB-8). */
  changerDeLangue: string
}) {
  const autre = autreLangue(langue)

  return (
    <footer className="bg-vif text-sur-vif">
      <div className={`${CONTENEUR} pt-20 pb-12`}>
        <div className="flex flex-wrap items-center gap-10">
          <nav>
            <ul className="flex flex-wrap gap-x-3 gap-y-1">
              {contenu.navigation.map((lien) => (
                <li key={lien.page}>
                  {/* min-w-11 : les libellés courts sont rendus plus étroits que
                      44 px — la hauteur seule ne tient pas la cible tactile. */}
                  <Link
                    href={chemin(langue, lien.page)}
                    aria-current={lien.page === page ? 'page' : undefined}
                    className={`inline-flex min-h-11 min-w-11 items-center px-1 font-description text-[1.0625rem] text-sur-vif ${CLASSES_LIEN}`}
                  >
                    {lien.libelle}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex flex-wrap items-center gap-3.5">
            <Bouton
              destination="candidature"
              libelle={contenu.ctaSecondaire}
              variante="contour-clair"
            />
            {/* Décoratifs tant que les comptes ne sont pas fournis : des liens
                qui ne mènent nulle part vaudraient moins que pas de liens. */}
            <span aria-hidden className="flex gap-3.5">
              {RESEAUX.map(({ cle, Icone }) => (
                <span
                  key={cle}
                  className="grid size-11 place-items-center rounded-full border-[1.5px] border-carte/35"
                >
                  <Icone className="size-4.5" />
                </span>
              ))}
            </span>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-carte/25 pt-6.5">
          <div role="group" aria-label={changerDeLangue} className="flex items-center gap-3">
            <span
              aria-current="true"
              className="inline-flex min-h-12 min-w-11 items-center font-description text-base text-sur-vif"
            >
              {NOMS_LANGUES[langue]}
            </span>
            <span aria-hidden className="h-4 w-px bg-carte/35" />
            <SelecteurLangue
              langue={autre}
              vers={cheminAutreLangue}
              libelle={NOMS_LANGUES[autre]}
              className={`inline-flex min-h-12 min-w-11 items-center font-description text-base text-sur-vif underline-offset-4 hover:underline ${CLASSES_LIEN}`}
            />
          </div>
          <p className="font-description text-base text-sur-vif">{contenu.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
