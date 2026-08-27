import type { Contenu } from '@/content/types'
import { Apparition } from '@/components/shared/apparition'
import { Bouton } from '@/components/shared/bouton'
import { classes } from '@/components/shared/classes'
import { BAS, CONTENEUR } from '@/components/shared/section'

/**
 * WEB-3 — l'appel a candidater qui ferme la page.
 *
 * La bande reste claire et c'est l'encart qui porte le vert : le bloc Contact du
 * gabarit suit, vert lui aussi et coiffe d'arrondis, et sa coiffe ne se lirait
 * pas sur du vert.
 *
 * Ce n'est pas une `Section` : le design ne donne pas de titre a cette bande, et
 * `Section` exige l'id d'un titre pour son `aria-labelledby`. Elle reste un
 * `<section>` — c'est le seul motif que la sonde de fond de l'en-tete reconnait.
 */
export function TalentsCandidature({ contenu }: { contenu: Contenu['talents']['encart'] }) {
  return (
    <section className={classes('bg-fond', BAS)}>
      <div className={CONTENEUR}>
        <Apparition>
          <div className="flex flex-wrap items-center justify-between gap-[clamp(1.25rem,3vw,2.5rem)] rounded-encart bg-primaire p-[clamp(1.625rem,3vw,2.5rem)]">
            <div className="flex min-w-0 grow basis-[20rem] flex-col gap-3">
              <span className="etiquette text-[0.6875rem] tracking-[0.1em] text-white/92">
                {contenu.intitule}
              </span>
              <strong className="max-w-[30ch] font-titre text-[clamp(1.1875rem,1.7vw,1.625rem)] leading-[1.25] tracking-[-0.03em] text-white">
                {contenu.titre}
              </strong>
              <span className="max-w-[44ch] text-[0.90625rem] leading-[1.6] text-white">
                {contenu.texte}
              </span>
            </div>
            <Bouton
              destination="candidature"
              libelle={contenu.cta}
              variante="blanc"
              ornement="fleche"
              className="shrink-0"
            />
          </div>
        </Apparition>
      </div>
    </section>
  )
}
