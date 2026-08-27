import type { Contenu } from '@/content/types'
import { Apparition } from '@/components/shared/apparition'
import { Bouton } from '@/components/shared/bouton'
import { delaiDeGrille } from '@/components/shared/decalage'
import { EnTeteSection } from '@/components/shared/en-tete-section'
import { Pilule } from '@/components/shared/pilule'
import { GRILLE_INTITULE, Section } from '@/components/shared/section'

const TITRE_ID = 'titre-postes'

/**
 * WEB-4 et WEB-5 — les familles de postes confiees, dans la frise du design de
 * la page Services.
 *
 * Les familles viennent de `commun.profils.liste`, la meme source que le
 * selecteur de l'accueil et de la page Talents : c'est le meme catalogue vu
 * autrement, et deux listes divergeraient a la premiere correction. Ici la
 * carte n'affiche que `famille`, `nom`, `resume` et `outils` — la description
 * longue et les etiquettes n'ont pas de place dans une carte de frise.
 *
 * Au-dela de 900 px les familles deviennent une frise horizontale defilante,
 * comme les etapes de la methode. Le rang est calcule, jamais recopie.
 */
export function ServicesPostes({
  contenu,
  familles,
}: {
  contenu: Contenu['services']['postes']
  familles: Contenu['commun']['profils']['liste']
}) {
  return (
    <Section titreId={TITRE_ID}>
      <div className={GRILLE_INTITULE}>
        <Apparition>
          <Pilule intitule={contenu.intitule} registre="clair" />
        </Apparition>

        <div className="flex flex-col gap-[clamp(1.625rem,2.8vw,2.5rem)]">
          <Apparition>
            <EnTeteSection
              titreId={TITRE_ID}
              titre={contenu.titre}
              description={contenu.description}
            />
          </Apparition>

          <ul className="grid min-w-0 grid-cols-1 gap-4 duo:grid-cols-2 frise:auto-cols-[minmax(15.5rem,1fr)] frise:grid-flow-col frise:grid-cols-none frise:overflow-x-auto frise:pb-1">
            {familles.map((famille, indice) => (
              <li key={famille.nom} className="min-w-0">
                {/* La carte est l'element anime : `display: contents` sur un
                    conteneur intermediaire annulerait la transformation. */}
                <Apparition
                  delai={delaiDeGrille(indice)}
                  className="carte-claire grid h-full min-w-0 grid-rows-[auto_auto_auto_1fr_auto] rounded-carte-large border border-trait p-[clamp(1.375rem,1.9vw,1.75rem)]"
                >
                  <span className="flex items-center justify-between gap-3">
                    <span
                      aria-hidden
                      className="grid size-8.5 shrink-0 place-items-center rounded-liste bg-encre etiquette text-[0.6875rem] tracking-[0.04em] text-vert-clair"
                    >
                      {String(indice + 1).padStart(2, '0')}
                    </span>
                    <span className="etiquette-fine text-[0.625rem] tracking-[0.09em] text-encre-3">
                      {famille.famille}
                    </span>
                  </span>
                  <strong className="mt-[clamp(1.75rem,2.8vw,2.625rem)] font-titre text-[clamp(1.125rem,1.5vw,1.3125rem)] leading-[1.16] tracking-[-0.038em] text-encre">
                    {famille.nom}
                  </strong>
                  <span className="mt-3 border-t border-trait pt-3.5 text-[0.84375rem] leading-[1.6] text-encre-2">
                    {famille.resume}
                  </span>
                  <span />
                  <span className="mt-3.5 etiquette-fine text-[0.625rem] tracking-[0.07em] text-primaire">
                    {famille.outils}
                  </span>
                </Apparition>
              </li>
            ))}
          </ul>

          <Apparition>
            <div className="flex flex-wrap items-center gap-6 rounded-encart bg-encre p-[clamp(1.5rem,2.4vw,2.125rem)]">
              <span className="flex min-w-0 flex-1 basis-70 flex-col gap-2.25">
                <strong className="font-titre text-[clamp(1.125rem,1.6vw,1.4375rem)] leading-[1.2] tracking-[-0.035em] text-white">
                  {contenu.encart.titre}
                </strong>
                <span className="max-w-[52ch] text-[0.84375rem] leading-[1.6] text-sur-sombre">
                  {contenu.encart.texte}
                </span>
              </span>
              <Bouton
                destination="rendezVous"
                libelle={contenu.encart.cta}
                variante="blanc"
                ornement="fleche"
                className="self-start"
              />
            </div>
          </Apparition>
        </div>
      </div>
    </Section>
  )
}
