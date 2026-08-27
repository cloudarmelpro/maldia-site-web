import type { Contenu } from '@/content/types'
import { Apparition } from '@/components/shared/apparition'
import { classes } from '@/components/shared/classes'
import { delaiDeGrille } from '@/components/shared/decalage'
import { EnTeteSection } from '@/components/shared/en-tete-section'
import { BAS, CONTENEUR } from '@/components/shared/section'
import { IntituleSection } from '@/components/shared/intitule-section'

const TITRE_ID = 'titre-methode'

/**
 * WEB-4 — les cinq etapes, dans le traitement clair que le design reserve a
 * Services : la meme geometrie de cartes que l'accueil, sur l'aplat blanc.
 *
 * `Methode` n'est pas reemployee : elle porte l'aplat vert de l'accueil, et
 * cette page n'a plus aucune bande de couleur avant le bloc Contact.
 *
 * Le cote se lit sur `etape.cote` et jamais sur `acteur`, qui est traduit.
 * Le rang est calcule depuis l'indice.
 */
export function ServicesMethode({ contenu }: { contenu: Contenu['commun']['methode'] }) {
  return (
    <section aria-labelledby={TITRE_ID} className={classes('bg-fond', BAS)}>
      <div className={classes(CONTENEUR, 'flex flex-col gap-[clamp(1.5rem,3vw,2.5rem)]')}>
        <Apparition className="w-fit self-start">
          <IntituleSection intitule={contenu.intitule} />
        </Apparition>

        <Apparition registre="texte">
          <EnTeteSection
            titreId={TITRE_ID}
            titre={contenu.titre}
            description={contenu.description}
          />
        </Apparition>

        <ol className="grid grid-cols-[repeat(auto-fit,minmax(11.25rem,1fr))] gap-1.5">
          {contenu.liste.map((etape, indice) => (
            <li key={etape.titre} className="min-w-0">
              {/* La carte est l'element anime : `display: contents` sur un
                  conteneur intermediaire annulerait la transformation. */}
              <Apparition
                delai={delaiDeGrille(indice)}
                className="flex h-full min-h-[clamp(12.25rem,16vw,14.125rem)] min-w-0 flex-col rounded-carte bg-primaire/5 p-[clamp(1rem,1.4vw,1.25rem)]"
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="etiquette-fine text-[0.6875rem] tracking-[0.09em] normal-case text-encre-2">
                    {String(indice + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={classes(
                      'rounded-[0.4375rem] px-2.25 py-1.25 etiquette-fine text-[0.625rem] tracking-[0.07em] whitespace-nowrap',
                      etape.cote === 'client'
                        ? 'bg-primaire text-white'
                        : 'bg-white text-encre-2',
                    )}
                  >
                    {etape.acteur}
                  </span>
                </span>
                <span className="mt-[1.625rem] flex flex-col gap-2.25">
                  <strong className="font-titre text-[clamp(1.0625rem,1.35vw,1.25rem)] leading-[1.2] tracking-[-0.03em] text-encre">
                    {etape.titre}
                  </strong>
                  <span className="text-[0.78125rem] leading-[1.45] text-encre-2">
                    {etape.description}
                  </span>
                </span>
              </Apparition>
            </li>
          ))}
        </ol>

        <Apparition registre="texte">
          <p className="max-w-[44ch] font-titre text-[clamp(1rem,1.35vw,1.25rem)] font-normal leading-[1.35] tracking-[-0.02em] text-encre">
            {contenu.conclusion}
          </p>
        </Apparition>
      </div>
    </section>
  )
}
