import type { ArgumentsCommerciaux } from '@/content/types'
import { Apparition } from '@/components/shared/apparition'
import { classes } from '@/components/shared/classes'
import { delaiDeGrille } from '@/components/shared/decalage'

/**
 * WEB-12 — la grille des six messages commerciaux.
 *
 * Deux sections la portent : claire sur Accueil et Services, sombre sur
 * A propos. Le design leur donne la meme grille et le meme gabarit de carte —
 * seules les couleurs changent, donc un seul composant et un registre.
 *
 * `accent` marque un chiffre sur deux. C'est un rythme visuel du design, pas
 * une hierarchie de sens : les six messages pesent pareil.
 */
export function CartesArguments({
  liste,
  sombre = false,
}: {
  liste: ArgumentsCommerciaux
  /** Sur la bande `encre` : fond translucide, chiffres blancs et lime. */
  sombre?: boolean
}) {
  return (
    <ul className="grid grid-cols-2 gap-1 duo:grid-cols-3 voies:grid-cols-6">
      {liste.map((carte, indice) => (
        <li key={carte.chiffre + carte.ligne1} className="min-w-0">
          <Apparition delai={delaiDeGrille(indice)} className="h-full">
            <div
              className={classes(
                'grid h-full min-h-[clamp(11.875rem,16vw,14.125rem)] min-w-0 grid-rows-[auto_1fr_auto_auto] rounded-carte border p-[clamp(1.125rem,1.5vw,1.375rem)]',
                sombre ? 'carte-sombre border-white/15' : 'border-[#e6e9e5] bg-fond-2',
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
              <span />
              <strong
                className={classes(
                  'font-titre text-[clamp(1.875rem,2.5vw,2.5rem)] leading-[0.92] tracking-[-0.05em]',
                  carte.accent
                    ? sombre
                      ? 'text-lime'
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
