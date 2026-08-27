import type { Contenu } from '@/content/types'
import { Apparition } from '@/components/shared/apparition'
import { Pilule } from '@/components/shared/pilule'
import { Bouton } from '@/components/shared/bouton'
import { classes } from '@/components/shared/classes'
import { delaiDeGrille } from '@/components/shared/decalage'
import { Section } from '@/components/shared/section'

/**
 * WEB-2 — les deux voies : une entreprise qui cherche du personnel, une
 * personne qui cherche une opportunite.
 *
 * L'ordre du tuple fige la destination et le registre : la premiere carte est
 * verte et mene au calendrier, la seconde est claire et mene a la candidature.
 * Le design ne les distingue pas autrement, et une carte qui changerait de
 * couleur sans changer de destination serait un piege.
 */
export function Parcours({
  contenu,
  titreId,
}: {
  contenu: Contenu['commun']['parcours']
  titreId: string
}) {
  return (
    <Section titreId={titreId} fond="fond">
      <div className="flex flex-col gap-[clamp(1.5rem,3vw,2.5rem)]">
        <Apparition>
          <Pilule intitule={contenu.intitule} registre="clair" />
        </Apparition>

        <Apparition registre="texte">
          <div className="flex flex-wrap items-end justify-between gap-[clamp(1.25rem,3vw,3rem)]">
            <h2
              id={titreId}
              className="max-w-[22ch] font-titre text-[clamp(1.375rem,2.1vw,1.875rem)] leading-[1.15] tracking-[-0.045em] text-encre"
            >
              {contenu.titre}
            </h2>
            <p className="max-w-[34ch] shrink-0 text-[0.90625rem] leading-[1.6] text-encre-2">
              {contenu.description}
            </p>
          </div>
        </Apparition>
      </div>

      <ul className="mt-[clamp(2.125rem,3.6vw,3.5rem)] grid grid-cols-[repeat(auto-fit,minmax(18.75rem,1fr))] gap-[clamp(0.875rem,1.4vw,1.25rem)]">
        {contenu.voies.map((voie, indice) => {
          const vert = indice === 0
          return (
            <li key={voie.pour} className="min-w-0">
              <Apparition
                delai={delaiDeGrille(indice)}
                className={classes(
                  'flex h-full min-w-0 flex-col rounded-carte-large',
                  vert ? 'bg-primaire' : 'halo-voie',
                )}
              >
                <div className="flex flex-1 flex-col gap-4.5 p-[clamp(1.375rem,2.2vw,2rem)]">
                  <span className="flex items-center justify-between gap-3">
                    <span
                      className={classes(
                        'rounded-etiquette px-2.75 py-1.5 etiquette-fine tracking-[0.08em] whitespace-nowrap',
                        vert ? 'bg-voile/34 text-white' : 'bg-pilule text-encre',
                      )}
                    >
                      {voie.pour}
                    </span>
                    <span
                      className={classes(
                        'etiquette-fine tracking-[0.08em]',
                        vert ? 'text-white/94' : 'text-encre-2',
                      )}
                    >
                      {voie.meta}
                    </span>
                  </span>

                  <strong
                    className={classes(
                      'font-titre text-[clamp(1.1875rem,1.8vw,1.5625rem)] leading-[1.15] tracking-[-0.04em]',
                      vert ? 'text-white' : 'text-encre',
                    )}
                  >
                    {voie.titre}
                  </strong>
                  <p
                    className={classes(
                      'max-w-[42ch] text-[0.875rem] leading-[1.6]',
                      vert ? 'text-white' : 'text-prose',
                    )}
                  >
                    {voie.description}
                  </p>

                  <ul className="flex flex-col gap-2.25">
                    {voie.points.map((point) => (
                      <li key={point} className="flex min-w-0 items-center gap-2.5">
                        <span
                          aria-hidden
                          className={classes(
                            'size-1.25 shrink-0 rounded-pilule',
                            vert ? 'bg-white' : 'bg-primaire',
                          )}
                        />
                        <span
                          className={classes(
                            'text-[0.84375rem] leading-[1.45]',
                            vert ? 'text-white' : 'text-prose',
                          )}
                        >
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {voie.supplement ? (
                    <span className="flex flex-wrap items-baseline gap-2 etiquette-fine tracking-[0.08em]">
                      <strong className={vert ? 'text-white' : 'text-encre'}>
                        {voie.libelleSupplement}
                      </strong>
                      <span className={vert ? 'text-white/94' : 'text-encre-2'}>
                        {voie.supplement}
                      </span>
                    </span>
                  ) : null}

                  <Bouton
                    destination={vert ? 'rendezVous' : 'candidature'}
                    libelle={voie.cta}
                    variante={vert ? 'blanc' : 'contour'}
                    ornement="fleche"
                    className="mt-auto self-start px-5.5"
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
