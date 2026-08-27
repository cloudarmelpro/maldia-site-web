import type { ArgumentsCommerciaux } from '@/content/types'
import { Apparition } from '@/components/shared/apparition'
import { classes } from '@/components/shared/classes'
import { delaiDeGrille } from '@/components/shared/decalage'

/**
 * WEB-12 — la grille des six messages commerciaux.
 *
 * Trois sections la portent, avec exactement le meme rendu : l'accueil, Services
 * et A propos. Les trois memes champs a chaque fois — l'intitule sur deux
 * lignes, le chiffre, la description.
 *
 * Le composant portait un `registre` a trois valeurs, une `disposition` a trois
 * valeurs et un mode `sombre`. Un seul jeu etait passe par les trois appelants,
 * et les deux tiers du fichier etaient inatteignables : le registre `contour`
 * — pourtant la valeur par defaut — avec le seul hex brut du depot, le registre
 * `filets` et sa grille, le mode `sombre` de la charte supprimee par la
 * decision 0023, et deux dispositions. Ils sont retires, avec les jetons
 * `--color-sur-sombre*` et l'utilitaire `carte-sombre` qui n'existaient que
 * pour eux.
 *
 * `accent` marque un chiffre sur deux. C'est un rythme visuel du design, pas
 * une hierarchie de sens : les six messages pesent pareil.
 */
export function CartesArguments({ liste }: { liste: ArgumentsCommerciaux }) {
  return (
    <ul className="grid min-w-0 grid-cols-[repeat(auto-fit,minmax(9.375rem,1fr))] gap-1">
      {liste.map((carte, indice) => (
        <li key={carte.chiffre + carte.ligne1} className="min-w-0">
          <Apparition delai={delaiDeGrille(indice)} className="h-full">
            <div className="flex h-full min-w-0 flex-col min-h-[clamp(11.875rem,16vw,14.125rem)] rounded-carte bg-primaire/5 p-[clamp(1.125rem,1.5vw,1.375rem)]">
              {/* L'ordre lu reste intitule, chiffre, description : seul l'ordre
                  vu change, par `mt-auto` sur le chiffre. */}
              <span className="flex flex-col gap-0.75 etiquette text-[0.6875rem] tracking-[0.09em] text-encre-2">
                <span>{carte.ligne1}</span> <span>{carte.ligne2}</span>
              </span>
              <strong
                className={classes(
                  'mt-auto font-titre text-[clamp(1.875rem,2.5vw,2.5rem)] font-extralight leading-[0.92] tracking-[-0.05em] whitespace-nowrap',
                  carte.accent ? 'text-primaire' : 'text-encre',
                )}
              >
                {carte.chiffre}
              </strong>
              <span className="mt-1.75 text-[0.78125rem] leading-[1.45] text-encre-2">
                {carte.description}
              </span>
            </div>
          </Apparition>
        </li>
      ))}
    </ul>
  )
}
