import { Info } from 'lucide-react'

import type { Contenu } from '@/content/types'
import { Apparition } from '@/components/shared/apparition'
import { Bouton } from '@/components/shared/bouton'
import { Carte } from '@/components/shared/carte'
import { delaiDeGrille } from '@/components/shared/decalage'
import { MESURE_PROSE, Section } from '@/components/shared/section'

/**
 * WEB-7 — les deux voies de contact.
 *
 * Il n'y a **pas de formulaire**, et la mention finale le dit au visiteur plutôt
 * que de le laisser le découvrir : le site est un export statique, sans serveur
 * ni base (WEB-10). Un formulaire supposerait un point de réception, donc une
 * application qui n'appartient pas à ce dépôt.
 *
 * L'ordre du tuple fige la destination : la première voie mène au calendrier,
 * la seconde à la candidature.
 */
export function ContactVoies({ contenu }: { contenu: Contenu['contact'] }) {
  return (
    <Section titreId="titre-contact-voies" fond="fond-2" bloc dessous="fond">
      {/* Le h1 de la page porte déjà le titre : celui-ci nomme la liste des voies. */}
      <h2 id="titre-contact-voies" className="sr-only">
        {contenu.titre}
      </h2>

      <ul className="mx-auto grid max-w-[1024px] auto-rows-fr gap-8 [grid-template-columns:repeat(auto-fit,minmax(min(100%,26rem),1fr))] [&>*]:min-w-0">
        {contenu.voies.map((voie, indice) => {
          const pourLesEntreprises = indice === 0
          return (
            <li key={voie.intitule} className="min-w-0">
              <Apparition delai={delaiDeGrille(indice)} className="h-full">
                <Carte className="flex h-full min-w-0 flex-col gap-5 rounded-offre p-8 pb-10">
                  <h3 className="self-start rounded-pilule bg-primaire px-3.5 py-1.5 text-[0.6875rem] font-bold tracking-[0.07em] text-carte uppercase">
                    {voie.intitule}
                  </h3>
                  <p className="font-titre text-[1.875rem] leading-[1.1] font-normal tracking-[-0.03em] text-encre">
                    {voie.titre}
                  </p>
                  <p className="font-description text-[0.97rem] leading-[1.6] text-encre-2">
                    {voie.description}
                  </p>
                  <span aria-hidden className="h-px bg-trait" />
                  <ol className="flex flex-col gap-3">
                    {voie.etapes.map((etape, rang) => (
                      <li key={etape} className="flex min-w-0 items-start gap-3">
                        <span
                          aria-hidden
                          className="grid size-6 shrink-0 place-items-center rounded-full bg-tendre font-mono text-[0.75rem] font-medium text-primaire-2"
                        >
                          {rang + 1}
                        </span>
                        <span className="font-description text-[0.97rem] leading-[1.5] text-encre-3">
                          {etape}
                        </span>
                      </li>
                    ))}
                  </ol>
                  <div className="mt-auto flex flex-col gap-4 pt-3">
                    <Bouton
                      destination={pourLesEntreprises ? 'rendezVous' : 'candidature'}
                      libelle={voie.cta}
                      className="self-start"
                      aria-label={`${voie.cta} — ${voie.intitule}`}
                    />
                    <p className="font-description flex gap-2 text-[0.8125rem] leading-normal text-encre-2">
                      <Info aria-hidden className="mt-0.5 size-3.5 shrink-0" />
                      <span>{voie.note}</span>
                    </p>
                  </div>
                </Carte>
              </Apparition>
            </li>
          )
        })}
      </ul>

      <Apparition delai={delaiDeGrille(2)}>
        <p
          className={`${MESURE_PROSE} mx-auto mt-11 text-center font-description text-[0.9375rem] leading-[1.6] text-encre-2`}
        >
          {contenu.mention}
        </p>
      </Apparition>
    </Section>
  )
}
