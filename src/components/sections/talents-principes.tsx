import type { Contenu } from '@/content/types'
import { Apparition } from '@/components/shared/apparition'
import { Bouton } from '@/components/shared/bouton'
import { classes } from '@/components/shared/classes'
import { delaiDeGrille } from '@/components/shared/decalage'
import { BAS, CONTENEUR, HAUT } from '@/components/shared/section'

/**
 * WEB-3 — les reperes du cadre propose aux candidats, puis l'appel a candidater.
 *
 * Ce n'est pas une `Section` : le design ne donne pas de titre a cette bande, et
 * `Section` exige l'id d'un titre pour son `aria-labelledby`. Elle reste un
 * `<section>` — c'est le seul motif que la sonde de fond de l'en-tete reconnait,
 * et une bande qu'elle ne voit pas lui laisse le fond de la precedente.
 *
 * Les reperes ne sont pas des cartes : ce sont des colonnes tenues par deux
 * filets, celui de la grille en haut et celui de chaque cellule en bas.
 */
export function TalentsPrincipes({
  principes,
  encart,
}: {
  principes: Contenu['talents']['principes']
  encart: Contenu['talents']['encart']
}) {
  return (
    <section className={classes('bg-fond', HAUT, BAS)}>
      <div className={CONTENEUR}>
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(16.25rem,1fr))] gap-x-10 border-t border-trait">
          {principes.map((principe, indice) => (
            <li key={principe.titre} className="min-w-0 border-b border-trait">
              <Apparition
                delai={delaiDeGrille(indice)}
                className="flex min-w-0 flex-col py-[1.875rem]"
              >
                <span className="etiquette tracking-[0.12em] text-encre-2">
                  {principe.intitule}
                </span>
                <strong className="mt-4.5 font-titre text-[1.625rem] leading-[1.15] tracking-[-0.02em] text-encre">
                  {principe.titre}
                </strong>
                <span className="mt-3 text-[0.96875rem] leading-[1.6] text-encre-2">
                  {principe.texte}
                </span>
              </Apparition>
            </li>
          ))}
        </ul>

        <Apparition className="mt-[clamp(2.125rem,3.6vw,3.5rem)]">
          <div className="flex flex-wrap items-center gap-[clamp(1.375rem,3vw,2.5rem)] rounded-encart bg-primaire p-[clamp(1.625rem,3vw,2.5rem)]">
            <div className="flex min-w-0 grow basis-[20rem] flex-col gap-3">
              <strong className="max-w-[34ch] font-titre text-[clamp(1.1875rem,1.7vw,1.625rem)] leading-[1.25] tracking-[-0.03em] text-white">
                {encart.titre}
              </strong>
              <span className="max-w-[52ch] text-[0.90625rem] leading-[1.6] text-white">
                {encart.texte}
              </span>
            </div>
            <Bouton
              destination="candidature"
              libelle={encart.cta}
              variante="blanc"
              className="shrink-0 self-start"
            />
          </div>
        </Apparition>
      </div>
    </section>
  )
}
