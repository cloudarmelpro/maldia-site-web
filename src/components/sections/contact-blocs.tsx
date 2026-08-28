import { ArrowUpRight, CalendarDays, FileText } from 'lucide-react'

import { DESTINATION_CANDIDATURE, DESTINATION_RENDEZ_VOUS } from '@/content/liens'
import type { Contenu } from '@/content/types'
import { FOCUS_CLAIR } from '@/components/shared/focus'
import { Revelation } from '@/components/shared/revelation'
import { Apparition } from '@/components/shared/apparition'
import { IntituleSection } from '@/components/shared/intitule-section'
import { delaiDeGrille } from '@/components/shared/decalage'
import { Fleche } from '@/components/shared/fleche'
import { CONTENEUR } from '@/components/shared/section'

/**
 * Le bloc d'appel qui ferme chaque page, dans le meme aplat vert que le pied.
 *
 * Ce n'est pas une `Section` : le design fait tenir le bloc et le pied dans une
 * seule bande verte, separes par un filet. Une `Section` refermerait le padding
 * entre les deux et le filet cesserait de les relier. C'est aussi pourquoi
 * cette section n'a pas de padding bas : c'est le pied qui le porte.
 *
 * L'ordre du tuple fige la destination : la premiere carte mene au calendrier,
 * la seconde a la candidature.
 */
export function ContactBlocs({ contenu }: { contenu: Contenu['commun']['contact'] }) {
  const [entreprises, talents] = contenu.cartes

  return (
    // Le pied est desormais rendu a cote, et non dedans : il partage l'aplat
    // sans etre descendant de cette section, ou il perdait son role.
    <section
      aria-labelledby="titre-contact"
      className="bg-primaire pt-[clamp(4rem,7vw,7rem)] text-white"
    >
      <div className={CONTENEUR}>
        <Apparition>
          <IntituleSection intitule={contenu.intitule} registre="vert" />
        </Apparition>

        <div className="mt-[clamp(1.5rem,3vw,2.5rem)]">
          <div className="flex flex-wrap items-end justify-between gap-[clamp(1.25rem,3vw,3rem)]">
            <Revelation
              balise="h2"
              id="titre-contact"
              className="max-w-[18ch] font-titre text-[clamp(1.3125rem,2vw,1.75rem)] leading-[1.08] tracking-[-0.05em] text-white"
            >
              {contenu.titre}
            </Revelation>
            <Revelation delai={0.12} className="max-w-[30ch] shrink-0 text-[0.90625rem] leading-[1.6] text-white">
              {contenu.description}
            </Revelation>
          </div>
        </div>

        <ul className="mt-[clamp(1.875rem,3.2vw,2.875rem)] grid grid-cols-1 justify-start gap-[clamp(0.875rem,1.4vw,1.25rem)] paire:grid-cols-[repeat(2,minmax(0,max-content))]">
          {[
            {
              carte: entreprises,
              href: DESTINATION_RENDEZ_VOUS || undefined,
              Icone: CalendarDays,
              fondIcone: 'bg-primaire/7',
              intitule: 'text-encre-2',
              marque: <Fleche />,
              fondMarque: 'bg-primaire/9',
            },
            {
              carte: talents,
              href: DESTINATION_CANDIDATURE || undefined,
              Icone: FileText,
              fondIcone: 'bg-encre/10',
              intitule: 'text-prose',
              marque: <ArrowUpRight className="size-3.5" />,
              fondMarque: 'bg-encre/10',
            },
          ].map((entree, indice) => (
            <li key={entree.carte.titre} className="min-w-0">
              <Apparition delai={delaiDeGrille(indice)}>
                <a
                  href={entree.href}
                  className={`flex min-w-0 items-center gap-4.5 rounded-bloc bg-white p-3.5 pr-5 text-left transition-transform duration-[220ms] hover:-translate-y-0.5 ${FOCUS_CLAIR}`}
                >
                  <span
                    aria-hidden
                    className={`grid size-11.5 shrink-0 place-items-center rounded-bloc text-encre ${entree.fondIcone}`}
                  >
                    <entree.Icone className="size-4.75" />
                  </span>
                  <span className="flex min-w-0 flex-col gap-0.75">
                    <span className={`etiquette-fine tracking-[0.1em] ${entree.intitule}`}>
                      {entree.carte.intitule}
                    </span>
                    <span className="text-[1.0625rem] tracking-[-0.025em] text-encre">
                      {entree.carte.titre}
                    </span>
                    <span className={`etiquette-fine tracking-[0.07em] ${entree.intitule}`}>
                      {entree.carte.mention}
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className={`ml-auto grid size-7.5 shrink-0 place-items-center rounded-pilule text-encre paire:ml-6.5 ${entree.fondMarque}`}
                  >
                    {entree.marque}
                  </span>
                </a>
              </Apparition>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
