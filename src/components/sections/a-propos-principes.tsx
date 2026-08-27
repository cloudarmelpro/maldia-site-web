import type { Contenu } from '@/content/types'
import { TeteSection } from '@/components/shared/tete-section'
import { Apparition } from '@/components/shared/apparition'
import { classes } from '@/components/shared/classes'
import { delaiDeGrille } from '@/components/shared/decalage'
import { BAS, CONTENEUR } from '@/components/shared/section'

/**
 * WEB-6 — les principes de l'agence, en cartes d'aplat vert tres pale.
 *
 * Sans padding haut : le design la donne comme la suite de la declaration, dans
 * le meme blanc, et c'est le padding bas de celle-ci qui les separe.
 *
 * Le titre de chaque principe est un `strong` et non un `h3` : le design ne
 * donne pas de titre a cette section, et un `h3` y sauterait un niveau depuis
 * le `h1` du hero.
 */
export function AProposPrincipes({
  intitule,
  liste,
}: {
  intitule: Contenu['aPropos']['principesIntitule']
  liste: Contenu['aPropos']['principes']
}) {
  return (
    <section className={classes('bg-fond', BAS)}>
      <div className={classes(CONTENEUR, 'flex flex-col gap-[clamp(1.5rem,3vw,2.5rem)]')}>
        <TeteSection intitule={intitule} />

        <ul className="grid grid-cols-[repeat(auto-fit,minmax(14.375rem,1fr))] gap-1.5">
          {liste.map((principe, indice) => (
            <li key={principe.titre} className="min-w-0">
              <Apparition
                delai={delaiDeGrille(indice)}
                className="flex h-full min-h-[clamp(11.875rem,16vw,13.75rem)] min-w-0 flex-col rounded-carte bg-primaire/5 p-[clamp(1.125rem,1.6vw,1.5rem)]"
              >
                <span className="etiquette text-[0.6875rem] tracking-[0.09em] text-encre-2">
                  {principe.intitule}
                </span>

                <span className="mt-auto flex flex-col gap-2.25">
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
