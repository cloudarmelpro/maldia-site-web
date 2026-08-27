import type { Contenu } from '@/content/types'
import { Apparition } from '@/components/shared/apparition'
import { classes } from '@/components/shared/classes'
import { delaiDeGrille } from '@/components/shared/decalage'
import { EnTeteSection } from '@/components/shared/en-tete-section'
import { Pilule } from '@/components/shared/pilule'
import { Section } from '@/components/shared/section'

const TITRE_ID = 'titre-deroule'

/**
 * WEB-3 — le deroule d'une candidature, du CV au poste.
 *
 * `cote` pilote la couleur de la pastille et non le libelle : `acteur` est
 * traduit, le comparer a « Vous » marcherait en francais et nulle part ailleurs.
 * Ici `'client'` designe le candidat, et `tests/contenu.spec.ts` verifie que les
 * deux langues portent la meme suite de cotes.
 *
 * La bande reste claire : le bloc d'appel qui suit est vert et coiffe d'arrondis
 * — sur du vert, ses coins ne se verraient pas.
 */
export function TalentsDeroule({ contenu }: { contenu: Contenu['talents']['deroule'] }) {
  return (
    <Section titreId={TITRE_ID} fond="fond-2">
      <div className="flex flex-col gap-[clamp(1.5rem,3vw,2.5rem)]">
        <Apparition>
          <Pilule intitule={contenu.intitule} />
        </Apparition>

        <Apparition registre="texte">
          <EnTeteSection
            titreId={TITRE_ID}
            titre={contenu.titre}
            description={contenu.description}
          />
        </Apparition>
      </div>

      <ol className="mt-[clamp(2.125rem,3.6vw,3.5rem)] border-t border-trait">
        {contenu.liste.map((etape, indice) => (
          <li key={etape.titre} className="border-b border-trait">
            <Apparition
              delai={delaiDeGrille(indice)}
              className="flex flex-wrap items-start gap-[1.375rem] py-6"
            >
              <span className="w-11 shrink-0 font-titre text-[1.5rem] font-extralight leading-[1.2] text-encre-2">
                {String(indice + 1).padStart(2, '0')}
              </span>

              <div className="flex min-w-0 grow basis-[18.75rem] flex-col gap-2">
                <strong className="font-titre text-[1.1875rem] leading-[1.2] tracking-[-0.03em] text-encre">
                  {etape.titre}
                </strong>
                <span className="max-w-[52ch] text-[0.96875rem] leading-[1.55] text-encre-2">
                  {etape.description}
                </span>
              </div>

              <span
                className={classes(
                  'shrink-0 self-start rounded-pilule px-2.75 py-1 etiquette whitespace-nowrap',
                  // Le blanc et non `pilule` : sur le gris teinte de la bande,
                  // le gris des pilules ne se detacherait pas.
                  etape.cote === 'client' ? 'bg-primaire text-white' : 'bg-white text-encre',
                )}
              >
                {etape.acteur}
              </span>
            </Apparition>
          </li>
        ))}
      </ol>
    </Section>
  )
}
