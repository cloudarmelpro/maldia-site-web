import type { Contenu } from '@/content/types'
import { IntituleSection } from '@/components/shared/intitule-section'
import { Apparition } from '@/components/shared/apparition'
import { classes } from '@/components/shared/classes'
import { delaiDeGrille } from '@/components/shared/decalage'
import { BAS, CONTENEUR, HAUT } from '@/components/shared/section'

/**
 * WEB-3 — les reperes du cadre propose aux candidats.
 *
 * Ce n'est pas une `Section` : le design ne donne pas de titre a cette bande, et
 * `Section` exige l'id d'un titre pour son `aria-labelledby`. Elle reste un
 * `<section>` — c'est le seul motif que la sonde de fond de l'en-tete reconnait,
 * et une bande qu'elle ne voit pas lui laisse le fond de la precedente.
 */
export function TalentsPrincipes({
  intitule,
  principes,
}: {
  intitule: Contenu['talents']['principesIntitule']
  principes: Contenu['talents']['principes']
}) {
  return (
    <section className={classes('bg-fond', HAUT, BAS)}>
      <div className={classes(CONTENEUR, 'flex flex-col gap-[clamp(1.5rem,3vw,2.5rem)]')}>
        <Apparition className="w-fit self-start">
          <IntituleSection intitule={intitule} />
        </Apparition>

        <ul className="grid grid-cols-[repeat(auto-fit,minmax(14.375rem,1fr))] gap-1.5">
          {principes.map((principe, indice) => (
            <li key={principe.titre} className="min-w-0">
              {/* La carte est l'element anime : `display: contents` sur un
                  conteneur intermediaire annulerait la transformation. */}
              <Apparition
                delai={delaiDeGrille(indice)}
                className="flex h-full min-h-[clamp(11.25rem,15vw,13.125rem)] min-w-0 flex-col rounded-carte bg-primaire/5 p-[clamp(1.125rem,1.6vw,1.5rem)]"
              >
                <span className="etiquette text-[0.6875rem] tracking-[0.09em] text-encre-2">
                  {principe.intitule}
                </span>
                <span className="mt-auto flex min-w-0 flex-col gap-2.25">
                  <strong className="font-titre text-[clamp(1.125rem,1.5vw,1.375rem)] leading-[1.2] tracking-[-0.035em] text-encre">
                    {principe.titre}
                  </strong>
                  <span className="text-[0.8125rem] leading-[1.5] text-encre-2">
                    {principe.texte}
                  </span>
                </span>
              </Apparition>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
