import type { ArgumentsCommerciaux } from '@/content/types'
import { Apparition } from '@/components/shared/apparition'
import { classes } from '@/components/shared/classes'
import { delaiDeGrille } from '@/components/shared/decalage'

/**
 * WEB-12 — la grille des six messages commerciaux.
 *
 * Trois sections la portent : l'accueil, Services et A propos. Les trois memes
 * champs a chaque fois — l'intitule sur deux lignes, le chiffre, la
 * description ; seuls la surface, l'ordre et la grille varient, d'ou un
 * registre plutot qu'un second composant.
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
 * Trois registres : le filet clair des pages interieures, l'aplat vert sans
 * contour de l'accueil, et les filets de la page Services — la ou le design
 * abandonne la carte pour des rangees separees par un trait, chiffre en tete.
 */
export type RegistreArguments = 'contour' | 'aplat' | 'filets'

const CARTE =
  'min-h-[clamp(11.875rem,16vw,14.125rem)] rounded-carte p-[clamp(1.125rem,1.5vw,1.375rem)]'

const GEOMETRIES: Record<RegistreArguments, string> = {
  contour: CARTE,
  aplat: CARTE,
  filets: 'border-b border-trait py-[1.875rem]',
}

const SURFACES: Record<RegistreArguments, string> = {
  contour: 'border border-[#e6e9e5] bg-fond-2',
  aplat: 'bg-primaire/5',
  filets: '',
}

const GRILLE_FILETS =
  'grid-cols-[repeat(auto-fit,minmax(15.625rem,1fr))] gap-x-10 border-t border-trait'

type Cartes = {
  registre?: 'contour' | 'aplat'
  /** Sur la bande `encre` : fond translucide, chiffres blancs et vert clair. */
  sombre?: boolean
  disposition?: DispositionArguments
}

/**
 * Les filets portent leur propre grille et n'ont pas de version sombre : les
 * deux autres props sont refusees a la compilation plutot qu'ignorees en
 * silence.
 */
type Filets = {
  registre: 'filets'
  sombre?: never
  disposition?: never
}

export function CartesArguments({
  liste,
  sombre = false,
  registre = 'contour',
  disposition = 'grille',
}: { liste: ArgumentsCommerciaux } & (Cartes | Filets)) {
  const filets = registre === 'filets'

  return (
    <ul
      className={classes(
        'grid min-w-0',
        filets ? GRILLE_FILETS : classes('gap-1', DISPOSITIONS[disposition]),
      )}
    >
      {liste.map((carte, indice) => (
        <li key={carte.chiffre + carte.ligne1} className="min-w-0">
          <Apparition delai={delaiDeGrille(indice)} className="h-full">
            <div
              className={classes(
                'flex h-full min-w-0 flex-col',
                GEOMETRIES[registre],
                sombre ? 'carte-sombre border border-white/15' : SURFACES[registre],
              )}
            >
              {/* L'ordre lu reste intitule, chiffre, description dans les trois
                  registres ; seul l'ordre vu change. */}
              <span
                className={classes(
                  filets
                    ? 'order-2 mt-4 text-base leading-[1.35] text-encre'
                    : classes(
                        'flex flex-col gap-0.75 etiquette text-[0.6875rem] tracking-[0.09em]',
                        sombre ? 'text-sur-sombre' : 'text-encre-2',
                      ),
                )}
              >
                <span>{carte.ligne1}</span>{' '}
                <span>{carte.ligne2}</span>
              </span>
              <strong
                className={classes(
                  'font-titre whitespace-nowrap',
                  filets
                    ? 'order-1 text-[clamp(1.9375rem,3.2vw,2.625rem)] font-extralight leading-none tracking-[-0.03em]'
                    : 'mt-auto text-[clamp(1.875rem,2.5vw,2.5rem)] leading-[0.92] tracking-[-0.05em]',
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
                  filets
                    ? 'order-3 mt-2 text-[0.90625rem] leading-[1.5] text-encre-2'
                    : classes(
                        'mt-1.75 text-[0.78125rem] leading-[1.45]',
                        sombre ? 'text-sur-sombre' : 'text-encre-2',
                      ),
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
