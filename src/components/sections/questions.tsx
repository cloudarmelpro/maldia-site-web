'use client'

import { useState } from 'react'

import type { CoteQuestion, Contenu } from '@/content/types'
import { EnTeteSection } from '@/components/shared/en-tete-section'
import { FOCUS } from '@/components/shared/focus'
import { Apparition } from '@/components/shared/apparition'
import { IntituleSection } from '@/components/shared/intitule-section'
import { Section } from '@/components/shared/section'

// L'ordre du tuple de filtres fige leur sens : tout, entreprises, talents. Le
// filtre se lit sur ce cote et jamais sur le libelle, qui est traduit.
const COTES: readonly (CoteQuestion | null)[] = [null, 'entreprise', 'talent']

// Les deux positions de l'axe `wght` de Jost entre lesquelles la question glisse.
const GRAISSE_FERMEE = '"wght" 300'
const GRAISSE_OUVERTE = '"wght" 600'

/**
 * La FAQ du design : trois filtres, puis un accordeon a un seul volet ouvert.
 *
 * `inert` sur le panneau ferme, et pas seulement `overflow: hidden` : sans lui,
 * la reponse resterait dans l'ordre de tabulation et serait lue par un lecteur
 * d'ecran alors qu'elle est visuellement repliee.
 *
 * L'ouverture anime `grid-template-rows` de `0fr` a `1fr`. C'est la seule facon
 * de faire glisser une hauteur inconnue en CSS pur — animer `height` exigerait
 * de la mesurer en JavaScript.
 *
 * La graisse de la question glisse par `font-variation-settings` et non par
 * `font-weight` : c'est l'axe variable qui s'interpole, et il l'emporte sur la
 * graisse 400 que la regle de base pose sur le `h3` parent.
 */
export function Questions({ contenu }: { contenu: Contenu['accueil']['questions'] }) {
  const [filtre, setFiltre] = useState(0)
  const [ouverte, setOuverte] = useState<number | null>(0)

  const cote = COTES[filtre]
  const visibles = contenu.liste
    .map((entree, position) => ({ entree, position }))
    .filter(({ entree }) => cote === null || entree.cote === cote)

  return (
    <Section titreId="titre-questions">
      <div className="flex flex-col gap-[clamp(1.5rem,3vw,2.5rem)]">
        <Apparition>
          <IntituleSection intitule={contenu.intitule} />
        </Apparition>

        <div className="flex flex-col gap-[clamp(1.75rem,3vw,2.75rem)]">
          <EnTeteSection
            titreId="titre-questions"
            titre={contenu.titre}
            description={contenu.description}
          />

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
                      // Le design referme tout au changement de filtre : la
                      // position ouverte ne designe plus la meme entree.
                      setOuverte(null)
                    }}
                    // Le design pose 34 px de haut ; sous 768 px la cible tactile
                    // passe devant, et `e2e/adaptation.spec.ts` l'exige.
                    className={`min-h-11.5 min-w-11.5 cursor-pointer rounded-liste px-4 etiquette text-[0.625rem] whitespace-nowrap transition-colors duration-200 large:min-h-[2.125rem] large:min-w-0 large:px-[0.8125rem] ${FOCUS} ${
                      actif ? 'bg-primaire text-white' : 'bg-primaire/7 text-encre-2'
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
              const ouvert = position === ouverte
              const idPanneau = `reponse-${position}`
              return (
                <li key={entree.question} className="overflow-hidden rounded-carte bg-primaire/5">
                  <h3>
                    <button
                      type="button"
                      aria-expanded={ouvert}
                      aria-controls={idPanneau}
                      onClick={() => setOuverte(ouvert ? null : position)}
                      className={`flex w-full cursor-pointer items-center gap-[1.125rem] px-[clamp(1.125rem,1.7vw,1.625rem)] py-[clamp(1.125rem,1.7vw,1.5rem)] text-left ${FOCUS}`}
                    >
                      <span
                        style={{
                          fontVariationSettings: ouvert ? GRAISSE_OUVERTE : GRAISSE_FERMEE,
                        }}
                        className="min-w-0 flex-1 font-titre text-[clamp(0.9375rem,1.25vw,1.125rem)] leading-[1.3] tracking-[-0.025em] text-encre transition-[font-variation-settings] duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
                      >
                        {entree.question}
                      </span>
                      <span
                        aria-hidden
                        className={`shrink-0 text-xl leading-none text-encre transition-transform duration-[300ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
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
                    className={`grid transition-[grid-template-rows,opacity] duration-[340ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
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
