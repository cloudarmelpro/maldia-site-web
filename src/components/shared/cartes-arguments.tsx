import type { ArgumentsCommerciaux } from '@/content/types'
import { Apparition } from '@/components/shared/apparition'
import { classes } from '@/components/shared/classes'
import { delaiDeGrille } from '@/components/shared/decalage'

/**
 * WEB-12 — la grille des six messages commerciaux.
 *
 * Trois sections la portent : l'accueil, Services et A propos. Le gabarit de
 * carte ne change pas d'une page a l'autre — l'intitule sur deux lignes en
 * haut, le chiffre pousse en bas, la description dessous. Seules la surface et
 * la grille varient, d'ou un registre et une disposition plutot qu'un second
 * composant.
 *
 * `accent` marque un chiffre sur deux. C'est un rythme visuel du design, pas
 * une hierarchie de sens : les six messages pesent pareil.
 */
export type DispositionArguments = 'grille' | 'frise' | 'fluide'

const DISPOSITIONS: Record<DispositionArguments, string> = {
  grille: 'grid-cols-2 duo:grid-cols-3 voies:grid-cols-6',
  frise:
    'grid-cols-1 duo:grid-cols-2 frise:auto-cols-[minmax(12.5rem,1fr)] frise:grid-flow-col frise:grid-cols-none frise:overflow-x-auto frise:pb-1',
  fluide: 'grid-cols-[repeat(auto-fit,minmax(9.375rem,1fr))]',
}

/**
 * La surface de carte : le filet clair des pages interieures, l'aplat vert
 * sans contour de l'accueil.
 */
export type RegistreArguments = 'contour' | 'aplat'

const SURFACES: Record<RegistreArguments, string> = {
  contour: 'border border-[#e6e9e5] bg-fond-2',
  aplat: 'bg-primaire/5',
}

export function CartesArguments({
  liste,
  sombre = false,
  registre = 'contour',
  disposition = 'grille',
}: {
  liste: ArgumentsCommerciaux
  /** Sur la bande `encre` : fond translucide, chiffres blancs et vert clair. */
  sombre?: boolean
  registre?: RegistreArguments
  disposition?: DispositionArguments
}) {
  return (
    <ul className={classes('grid min-w-0 gap-1', DISPOSITIONS[disposition])}>
      {liste.map((carte, indice) => (
        <li key={carte.chiffre + carte.ligne1} className="min-w-0">
          <Apparition delai={delaiDeGrille(indice)} className="h-full">
            <div
              className={classes(
                'flex h-full min-h-[clamp(11.875rem,16vw,14.125rem)] min-w-0 flex-col rounded-carte p-[clamp(1.125rem,1.5vw,1.375rem)]',
                sombre ? 'carte-sombre border border-white/15' : SURFACES[registre],
              )}
            >
              <span
                className={classes(
                  'flex flex-col gap-0.75 etiquette text-[0.6875rem] tracking-[0.09em]',
                  sombre ? 'text-sur-sombre' : 'text-encre-2',
                )}
              >
                <span>{carte.ligne1}</span>
                <span>{carte.ligne2}</span>
              </span>
              <strong
                className={classes(
                  'mt-auto font-titre text-[clamp(1.875rem,2.5vw,2.5rem)] leading-[0.92] tracking-[-0.05em] whitespace-nowrap',
                  registre === 'aplat' && !sombre && 'font-extralight',
                  carte.accent
                    ? sombre
                      ? 'text-vert-clair'
                      : 'text-primaire'
                    : sombre
                      ? 'text-white'
                      : 'text-encre',
                )}
              >
                {carte.chiffre}
              </strong>
              <span
                className={classes(
                  'mt-1.75 text-[0.78125rem] leading-[1.45]',
                  sombre ? 'text-sur-sombre' : 'text-encre-2',
                )}
              >
                {carte.description}
              </span>
            </div>
          </Apparition>
        </li>
      ))}
    </ul>
  )
}
