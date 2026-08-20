import type { Contenu } from '@/content/types'
import { Apparition } from '@/components/shared/apparition'
import { Bouton } from '@/components/shared/bouton'
import { delaiDeGrille } from '@/components/shared/decalage'
import { EnTeteSection } from '@/components/shared/en-tete-section'
import { Pilule } from '@/components/shared/pilule'
import { DECALAGE_CONTENU, GRILLE_INTITULE, Section } from '@/components/shared/section'

/**
 * WEB-2 — les deux voies : une entreprise qui cherche du personnel, une
 * personne qui cherche une opportunite.
 *
 * L'ordre du tuple fige la destination et le registre : la premiere carte est
 * sombre et mene au calendrier, la seconde est claire et mene a la candidature.
 * Le design ne les distingue pas autrement, et une carte qui changerait de
 * couleur sans changer de destination serait un piege.
 */
export function Parcours({
  contenu,
  titreId,
}: {
  contenu: Contenu['commun']['parcours']
  /** Deux pages portent cette section : l'id doit rester unique par page. */
  titreId: string
}) {
  return (
    <Section titreId={titreId} fond="fond">
      <div className={GRILLE_INTITULE}>
        <Apparition>
          <Pilule intitule={contenu.intitule} registre="clair" />
        </Apparition>
        <Apparition>
          <EnTeteSection
            titreId={titreId}
            titre={contenu.titre}
            description={contenu.description}
          />
        </Apparition>
      </div>

      <ul
        className={`mt-[clamp(2.125rem,3.6vw,3.5rem)] grid grid-cols-1 gap-[clamp(0.875rem,1.4vw,1.25rem)] voies:grid-cols-2 ${DECALAGE_CONTENU}`}
      >
        {contenu.voies.map((voie, indice) => {
          const sombre = indice === 0
          return (
            <li key={voie.pour} className="min-w-0">
              <Apparition
                delai={delaiDeGrille(indice)}
                className={`flex h-full min-w-0 flex-col rounded-carte-large border ${
                  sombre ? 'border-encre bg-encre' : 'border-trait bg-fond-2'
                }`}
              >
                <div className="flex flex-1 flex-col gap-4.5 p-[clamp(1.375rem,2.2vw,2rem)]">
                  <span className="flex items-center justify-between gap-3">
                    <span
                      className={`rounded-etiquette px-2.75 py-1.5 etiquette-fine tracking-[0.08em] whitespace-nowrap ${
                        sombre ? 'bg-lime/16 text-lime' : 'bg-white text-encre'
                      }`}
                    >
                      {voie.pour}
                    </span>
                    <span
                      className={`etiquette-fine tracking-[0.08em] ${
                        sombre ? 'text-sur-sombre-2' : 'text-encre-3'
                      }`}
                    >
                      {voie.meta}
                    </span>
                  </span>

                  <strong
                    className={`font-titre text-[clamp(1.375rem,2vw,1.875rem)] leading-[1.12] tracking-[-0.04em] ${
                      sombre ? 'text-white' : 'text-encre'
                    }`}
                  >
                    {voie.titre}
                  </strong>
                  <p
                    className={`max-w-[42ch] text-[0.875rem] leading-[1.6] ${
                      sombre ? 'text-sur-sombre' : 'text-encre-2'
                    }`}
                  >
                    {voie.description}
                  </p>

                  <ul className="flex flex-col gap-2.25">
                    {voie.points.map((point) => (
                      <li key={point} className="flex min-w-0 items-center gap-2.5">
                        <span
                          aria-hidden
                          className={`size-1.25 shrink-0 rounded-pilule ${
                            sombre ? 'bg-lime' : 'bg-primaire'
                          }`}
                        />
                        <span
                          className={`text-[0.84375rem] leading-[1.45] ${
                            sombre ? 'text-sur-sombre' : 'text-encre-2'
                          }`}
                        >
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {voie.supplement ? (
                    <span className="flex flex-wrap items-baseline gap-2 etiquette-fine tracking-[0.08em]">
                      <strong className="text-encre">{voie.libelleSupplement}</strong>
                      <span className="text-encre-3">{voie.supplement}</span>
                    </span>
                  ) : null}

                  <Bouton
                    destination={sombre ? 'rendezVous' : 'candidature'}
                    libelle={voie.cta}
                    variante={sombre ? 'lime' : 'encre'}
                    ornement="fleche"
                    className="mt-auto self-start"
                    aria-label={`${voie.cta} — ${voie.pour}`}
                  />
                </div>
              </Apparition>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
