import { ArrowRight, ArrowUpRight, CalendarDays, FileText } from 'lucide-react'
import type { ReactNode } from 'react'

import { DESTINATION_CANDIDATURE, DESTINATION_RENDEZ_VOUS } from '@/content/liens'
import type { Contenu } from '@/content/types'
import { Apparition } from '@/components/shared/apparition'
import { delaiDeGrille } from '@/components/shared/decalage'
import { Pilule } from '@/components/shared/pilule'
import { CONTENEUR, GRILLE_INTITULE } from '@/components/shared/section'

const FOCUS = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'

/**
 * Le bloc d'appel qui ferme chaque page, et le pied dans la meme bande sombre.
 *
 * Ce n'est pas une `Section` : le design fait tenir le bloc et le pied dans un
 * seul aplat, separes par un filet. Une `Section` refermerait le padding entre
 * les deux et le filet cesserait de les relier.
 *
 * L'ordre du tuple fige la destination : la premiere carte mene au calendrier,
 * la seconde a la candidature.
 */
export function ContactBlocs({
  contenu,
  pied,
}: {
  contenu: Contenu['commun']['contact']
  /** Le pied, rendu par le gabarit — il partage l'aplat de cette section. */
  pied: ReactNode
}) {
  const [entreprises, talents] = contenu.cartes

  return (
    <section
      aria-labelledby="titre-contact"
      className="bg-encre pt-[clamp(4rem,7vw,7rem)] pb-[clamp(3rem,5vw,4.5rem)] text-white"
    >
      <div className={CONTENEUR}>
        <div className={GRILLE_INTITULE}>
          <Apparition>
            <Pilule intitule={contenu.intitule} registre="sombre" />
          </Apparition>

          <div className="flex flex-col gap-[clamp(1.875rem,3.2vw,2.875rem)]">
            <Apparition>
              <div className="flex flex-col items-start gap-5 large:flex-row large:items-end large:justify-between large:gap-[clamp(1.5rem,3vw,3rem)]">
                <h2
                  id="titre-contact"
                  className="max-w-[18ch] font-titre text-[clamp(2.125rem,4.2vw,4.5rem)] leading-none tracking-[-0.05em] text-white"
                >
                  {contenu.titre}
                </h2>
                <p className="max-w-[30ch] shrink-0 text-[0.90625rem] leading-[1.6] text-sur-sombre large:text-right">
                  {contenu.description}
                </p>
              </div>
            </Apparition>

            <ul className="grid grid-cols-1 justify-start gap-[clamp(0.875rem,1.4vw,1.25rem)] paire:grid-cols-[repeat(2,minmax(0,max-content))]">
              {[
                {
                  carte: entreprises,
                  href: DESTINATION_RENDEZ_VOUS,
                  fond: 'bg-white',
                  Icone: CalendarDays,
                  fondIcone: 'bg-pilule',
                  intitule: 'text-encre-2',
                  Fleche: ArrowRight,
                  bordFleche: 'border-trait',
                },
                {
                  carte: talents,
                  href: DESTINATION_CANDIDATURE,
                  fond: 'bg-lime',
                  Icone: FileText,
                  fondIcone: 'bg-encre/10',
                  intitule: 'text-sur-lime',
                  Fleche: ArrowUpRight,
                  bordFleche: 'border-encre/25',
                },
              ].map((entree, indice) => (
                <li key={entree.carte.titre} className="min-w-0">
                  <Apparition delai={delaiDeGrille(indice)}>
                    <a
                      href={entree.href}
                      className={`flex min-w-0 items-center gap-4.5 rounded-carte-large p-3.5 pr-5 transition-transform duration-[220ms] hover:-translate-y-0.5 ${entree.fond} ${FOCUS}`}
                    >
                      <span
                        aria-hidden
                        className={`grid size-11.5 shrink-0 place-items-center rounded-bloc text-encre ${entree.fondIcone}`}
                      >
                        <entree.Icone className="size-4.75" />
                      </span>
                      <span className="flex min-w-0 flex-col gap-0.75">
                        <span
                          className={`etiquette-fine tracking-[0.1em] ${entree.intitule}`}
                        >
                          {entree.carte.intitule}
                        </span>
                        <span className="text-[1.0625rem] font-medium tracking-[-0.025em] text-encre">
                          {entree.carte.titre}
                        </span>
                        <span
                          className={`etiquette-fine tracking-[0.07em] ${entree.intitule}`}
                        >
                          {entree.carte.mention}
                        </span>
                      </span>
                      <span
                        aria-hidden
                        className={`ml-auto grid size-7.5 shrink-0 place-items-center rounded-pilule border text-encre ${entree.bordFleche}`}
                      >
                        <entree.Fleche className="size-3.5" />
                      </span>
                    </a>
                  </Apparition>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {pied}
      </div>
    </section>
  )
}
