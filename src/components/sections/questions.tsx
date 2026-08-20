'use client'

import { useState } from 'react'

import type { CoteQuestion, Contenu } from '@/content/types'
import { Apparition } from '@/components/shared/apparition'
import { EnTeteSection } from '@/components/shared/en-tete-section'
import { Pilule } from '@/components/shared/pilule'
import { GRILLE_INTITULE, Section } from '@/components/shared/section'

const FOCUS = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-encre'

// L'ordre du tuple de filtres fige leur sens : tout, entreprises, talents.
const COTES: readonly (CoteQuestion | null)[] = [null, 'entreprise', 'talent']

/**
 * La FAQ du design : trois onglets de filtre, puis un accordeon.
 *
 * `inert` sur le panneau ferme, et pas seulement `overflow: hidden` : sans lui,
 * la reponse resterait dans l'ordre de tabulation et serait lue par un lecteur
 * d'ecran alors qu'elle est visuellement repliee.
 *
 * L'ouverture anime `grid-template-rows` de `0fr` a `1fr`. C'est la seule facon
 * de faire glisser une hauteur inconnue en CSS pur — animer `height` exigerait
 * de la mesurer en JavaScript.
 */
export function Questions({ contenu }: { contenu: Contenu['accueil']['questions'] }) {
  const [filtre, setFiltre] = useState(0)
  const [ouvertes, setOuvertes] = useState<readonly number[]>([0])

  const cote = COTES[filtre]
  const visibles = contenu.liste
    .map((entree, position) => ({ entree, position }))
    .filter(({ entree }) => cote === null || entree.cote === cote)

  return (
    <Section titreId="titre-questions" fond="fond">
      <div className={GRILLE_INTITULE}>
        <Apparition>
          <Pilule intitule={contenu.intitule} registre="clair" />
        </Apparition>

        <div className="flex flex-col gap-[clamp(1.75rem,3vw,2.75rem)]">
          <Apparition>
            <EnTeteSection
              titreId="titre-questions"
              titre={contenu.titre}
              description={contenu.description}
            />
          </Apparition>

          <Apparition>
            <div role="group" aria-label={contenu.titre} className="flex flex-wrap gap-2">
              {contenu.filtres.map((libelle, indice) => {
                const actif = indice === filtre
                return (
                  <button
                    key={libelle}
                    type="button"
                    aria-pressed={actif}
                    onClick={() => {
                      setFiltre(indice)
                      // Le design referme tout au changement de filtre : les
                      // positions ouvertes ne designent plus les memes entrees.
                      setOuvertes([])
                    }}
                    className={`min-h-11 cursor-pointer rounded-bloc border px-4 etiquette text-[0.6875rem] whitespace-nowrap transition-[background-color,color,border-color] ${FOCUS} ${
                      actif
                        ? 'border-encre bg-encre text-white'
                        : 'border-trait bg-white text-encre-2'
                    }`}
                  >
                    {libelle}
                  </button>
                )
              })}
            </div>
          </Apparition>

          <ul className="flex flex-col gap-2">
            {visibles.map(({ entree, position }) => {
              const ouvert = ouvertes.includes(position)
              const idPanneau = `reponse-${position}`
              return (
                <li
                  key={entree.question}
                  className="overflow-hidden rounded-carte border border-trait bg-white"
                >
                  <h3>
                    <button
                      type="button"
                      aria-expanded={ouvert}
                      aria-controls={idPanneau}
                      onClick={() =>
                        setOuvertes((liste) =>
                          liste.includes(position)
                            ? liste.filter((n) => n !== position)
                            : [...liste, position],
                        )
                      }
                      className={`flex min-h-11 w-full cursor-pointer items-center gap-4.5 px-[clamp(1.125rem,1.7vw,1.625rem)] py-[clamp(1.125rem,1.7vw,1.5rem)] text-left ${FOCUS}`}
                    >
                      <span className="min-w-0 flex-1 font-titre text-[clamp(0.9375rem,1.25vw,1.125rem)] leading-[1.3] tracking-[-0.025em] text-encre">
                        {entree.question}
                      </span>
                      <span
                        aria-hidden
                        className={`shrink-0 text-xl leading-none text-encre transition-transform duration-[300ms] ease-[cubic-bezier(.22,1,.36,1)] ${
                          ouvert ? 'rotate-[135deg]' : 'rotate-0'
                        }`}
                      >
                        +
                      </span>
                    </button>
                  </h3>
                  <div
                    id={idPanneau}
                    inert={!ouvert}
                    className={`grid transition-[grid-template-rows,opacity] duration-[340ms] ease-[cubic-bezier(.22,1,.36,1)] ${
                      ouvert ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <p className="max-w-[62ch] px-[clamp(1.125rem,1.7vw,1.625rem)] pb-[clamp(1.25rem,1.8vw,1.625rem)] text-[0.875rem] leading-[1.65] text-encre-2">
                        {entree.reponse}
                      </p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </Section>
  )
}
