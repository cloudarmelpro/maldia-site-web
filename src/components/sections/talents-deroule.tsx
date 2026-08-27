import type { Contenu } from '@/content/types'
import { IntituleSection } from '@/components/shared/intitule-section'
import { Apparition } from '@/components/shared/apparition'
import { classes } from '@/components/shared/classes'
import { delaiDeGrille } from '@/components/shared/decalage'
import { EnTeteSection } from '@/components/shared/en-tete-section'
import { BAS, CONTENEUR } from '@/components/shared/section'

const TITRE_ID = 'titre-deroule'

/**
 * WEB-3 — le deroule d'une candidature, du CV au poste.
 *
 * `cote` pilote la couleur de la pastille et non le libelle : `acteur` est
 * traduit, le comparer a « Vous » marcherait en francais et nulle part ailleurs.
 * Ici `'client'` designe le candidat, et `tests/contenu.spec.ts` verifie que les
 * deux langues portent la meme suite de cotes.
 */
export function TalentsDeroule({ contenu }: { contenu: Contenu['talents']['deroule'] }) {
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

        <ol className="grid grid-cols-[repeat(auto-fit,minmax(12.5rem,1fr))] gap-1.5">
          {contenu.liste.map((etape, indice) => (
            <li key={etape.titre} className="min-w-0">
              <Apparition
                delai={delaiDeGrille(indice)}
                className="flex h-full min-h-[clamp(12.25rem,16vw,14.125rem)] min-w-0 flex-col rounded-carte bg-primaire/5 p-[clamp(1rem,1.4vw,1.25rem)]"
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="text-[0.6875rem] tracking-[0.09em] text-encre-2">
                    {String(indice + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={classes(
                      'rounded-[0.4375rem] px-2.25 py-1.25 etiquette-fine text-[0.625rem] tracking-[0.07em] whitespace-nowrap',
                      // Le blanc et non `pilule` : sur l'aplat vert a 5 % de la
                      // carte, le gris des pilules ne se detacherait pas.
                      etape.cote === 'client' ? 'bg-primaire text-white' : 'bg-white text-encre-2',
                    )}
                  >
                    {etape.acteur}
                  </span>
                </span>

                <span className="mt-6.5 flex min-w-0 flex-col gap-2.25">
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
      </div>
    </section>
  )
}
