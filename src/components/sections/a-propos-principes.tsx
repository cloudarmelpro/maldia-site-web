import type { Contenu } from '@/content/types'
import { Apparition } from '@/components/shared/apparition'
import { classes } from '@/components/shared/classes'
import { delaiDeGrille } from '@/components/shared/decalage'
import { BAS, CONTENEUR, HAUT } from '@/components/shared/section'

/**
 * WEB-6 — les principes de l'agence, poses sur des filets et non dans des
 * cartes.
 *
 * Le titre de chaque principe est un `strong` et non un `h3` : le design ne
 * donne pas de titre a cette section, et un `h3` y sauterait un niveau depuis
 * le `h1` du hero.
 */
export function AProposPrincipes({ liste }: { liste: Contenu['aPropos']['principes'] }) {
  return (
    <section className={classes('bg-fond', HAUT, BAS)}>
      <div className={CONTENEUR}>
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(16.875rem,1fr))] gap-x-10 border-t border-trait-4">
          {liste.map((principe, indice) => (
            <li key={principe.titre} className="min-w-0 border-b border-trait-4">
              <Apparition delai={delaiDeGrille(indice)} className="flex flex-col py-[1.875rem]">
                <span className="etiquette text-[0.71875rem] tracking-[0.12em] text-encre-2">
                  {principe.intitule}
                </span>
                <strong className="mt-4.5 font-titre text-[clamp(1.375rem,1.9vw,1.625rem)] leading-[1.15] tracking-[-0.02em] text-encre">
                  {principe.titre}
                </strong>
                <span className="mt-3 max-w-[40ch] text-[0.96875rem] leading-[1.6] text-encre-2">
                  {principe.texte}
                </span>
              </Apparition>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
