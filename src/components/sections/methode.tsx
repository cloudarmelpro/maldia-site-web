import type { Contenu } from '@/content/types'
import { Apparition } from '@/components/shared/apparition'
import { Pilule } from '@/components/shared/pilule'
import { Bouton } from '@/components/shared/bouton'
import { classes } from '@/components/shared/classes'
import { delaiDeGrille } from '@/components/shared/decalage'
import { BAS, CONTENEUR, HAUT } from '@/components/shared/section'

/**
 * WEB-4 — les etapes de la methode, sur l'aplat vert du design.
 *
 * La section batit son `<section>` elle-meme : `Section` ne propose pas d'aplat
 * vert, et recopier sa respiration la ferait diverger — d'ou HAUT, BAS et
 * CONTENEUR, importes plutot que reecrits.
 *
 * Le cote se lit sur `etape.cote`, jamais sur `acteur` qui est traduit. Le rang
 * est calcule : une etape inseree renumerote la suite toute seule.
 */
export function Methode({
  contenu,
  titreId,
  avecAppel = true,
  clair = false,
}: {
  contenu: Contenu['commun']['methode']
  /** Deux pages portent cette section : l'id doit rester unique par page. */
  titreId: string
  /**
   * La conclusion et ses deux appels. Le design de la page Services ne les met
   * pas ici — son appel suit, dans l'encart de la section des postes.
   */
  avecAppel?: boolean
  /**
   * Sur fond clair. Le bloc d'appel qui ferme chaque page est vert et coiffe
   * d'arrondis de 28 px : quand cette section le precede en vert elle aussi,
   * la coiffe ne se lit plus que comme deux encoches blanches aux angles.
   */
  clair?: boolean
}) {
  return (
    <section
      aria-labelledby={titreId}
      className={classes(clair ? 'bg-fond-2 text-encre' : 'bg-primaire text-white', HAUT, BAS)}
    >
      <div className={CONTENEUR}>
        <div className="flex flex-col gap-[clamp(1.5rem,3vw,2.5rem)]">
          <Apparition>
            <Pilule intitule={contenu.intitule} registre={clair ? 'clair' : 'sombre'} />
          </Apparition>

          <Apparition registre="texte">
            <div className="flex flex-wrap items-end justify-between gap-[clamp(1.25rem,3vw,3rem)]">
              <h2
                id={titreId}
                className={classes(
                  'max-w-[22ch] font-titre text-[clamp(1.375rem,2.1vw,1.875rem)] leading-[1.15] tracking-[-0.045em]',
                  clair ? 'text-encre' : 'text-white',
                )}
              >
                {contenu.titre}
              </h2>
              <p
                className={classes(
                  'max-w-[34ch] shrink-0 text-[0.90625rem] leading-[1.6]',
                  clair ? 'text-encre-2' : 'text-white',
                )}
              >
                {contenu.description}
              </p>
            </div>
          </Apparition>
        </div>

        <ol className="mt-[clamp(2.125rem,3.6vw,3.5rem)] grid grid-cols-[repeat(auto-fit,minmax(11.25rem,1fr))] gap-1.5">
          {contenu.liste.map((etape, indice) => (
            <li key={etape.titre} className="min-w-0">
              {/* La carte est l'element anime : `display: contents` sur un
                  conteneur intermediaire annulerait la transformation. */}
              <Apparition
                delai={delaiDeGrille(indice)}
                className={classes(
                  'flex h-full min-h-[clamp(12.25rem,16vw,14.125rem)] min-w-0 flex-col rounded-carte p-[clamp(1rem,1.4vw,1.25rem)]',
                  clair ? 'bg-primaire/5' : 'bg-voile/26',
                )}
              >
                <span className="flex items-center justify-between gap-3">
                  <span
                    className={classes(
                      'etiquette-fine text-[0.6875rem] tracking-[0.09em] normal-case',
                      clair ? 'text-encre-2' : 'text-white',
                    )}
                  >
                    {String(indice + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={classes(
                      'rounded-[0.4375rem] px-2.25 py-1.25 etiquette-fine text-[0.625rem] tracking-[0.07em] whitespace-nowrap',
                      etape.cote === 'client'
                        ? clair
                          ? 'bg-primaire text-white'
                          : 'bg-white text-encre'
                        : clair
                          ? 'bg-white text-encre-2'
                          : 'bg-voile/34 text-white',
                    )}
                  >
                    {etape.acteur}
                  </span>
                </span>
                <span className="mt-[1.625rem] flex flex-col gap-2.25">
                  <strong
                    className={classes(
                      'font-titre text-[clamp(1.0625rem,1.35vw,1.25rem)] leading-[1.2] tracking-[-0.03em]',
                      clair ? 'text-encre' : 'text-white',
                    )}
                  >
                    {etape.titre}
                  </strong>
                  <span
                    className={classes(
                      'text-[0.78125rem] leading-[1.45]',
                      clair ? 'text-prose' : 'text-white',
                    )}
                  >
                    {etape.description}
                  </span>
                </span>
              </Apparition>
            </li>
          ))}
        </ol>

        {avecAppel ? (
          <Apparition>
            <div className="mt-[clamp(1.75rem,2.8vw,2.5rem)] flex flex-wrap items-center justify-between gap-[clamp(1.25rem,3vw,2.5rem)]">
              <p className="max-w-[44ch] font-titre text-[clamp(1rem,1.35vw,1.25rem)] font-extralight leading-[1.35] tracking-[-0.02em] text-white">
                {contenu.conclusion}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Bouton
                  destination="rendezVous"
                  libelle={contenu.ctaPrincipal}
                  variante="blanc"
                  ornement="fleche"
                />
                <Bouton
                  destination="candidature"
                  libelle={contenu.ctaSecondaire}
                  variante="voile"
                />
              </div>
            </div>
          </Apparition>
        ) : null}
      </div>
    </section>
  )
}
