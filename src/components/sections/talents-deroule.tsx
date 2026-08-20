import type { Contenu } from '@/content/types'
import { Apparition } from '@/components/shared/apparition'
import { classes } from '@/components/shared/classes'
import { delaiDeGrille } from '@/components/shared/decalage'
import { EnTeteSection } from '@/components/shared/en-tete-section'
import { Pilule } from '@/components/shared/pilule'
import { BAS_COURT, GRILLE_INTITULE, Section } from '@/components/shared/section'

const TITRE_ID = 'titre-deroule'

/**
 * WEB-3 — le deroule d'une candidature, du CV au poste.
 *
 * `cote` pilote la couleur de la pastille et non le libelle : `acteur` est
 * traduit, le comparer a « Vous » marcherait en francais et nulle part ailleurs.
 * Ici `'client'` designe le candidat.
 *
 * Le padding bas est court parce que le bloc d'appel qui suit est du meme encre.
 * A pleine hauteur des deux cotes, le raccord laisserait un vide sombre.
 */
export function TalentsDeroule({ contenu }: { contenu: Contenu['talents']['deroule'] }) {
  return (
    <Section titreId={TITRE_ID} fond="encre" bas={BAS_COURT}>
      <div className={GRILLE_INTITULE}>
        <Apparition>
          <Pilule intitule={contenu.intitule} registre="sombre" />
        </Apparition>

        <div className="flex flex-col gap-[clamp(1.625rem,2.8vw,2.5rem)]">
          <Apparition>
            <EnTeteSection
              titreId={TITRE_ID}
              titre={contenu.titre}
              description={contenu.description}
              sombre
            />
          </Apparition>

          <ol className="grid grid-cols-1 gap-1.5 duo:grid-cols-2 large:grid-cols-4">
            {contenu.liste.map((etape, indice) => (
              <li key={etape.titre} className="min-w-0">
                <Apparition
                  delai={delaiDeGrille(indice)}
                  className="carte-sombre grid h-full min-h-[clamp(12.25rem,16vw,14.125rem)] min-w-0 grid-rows-[auto_1fr_auto] rounded-carte-large border border-white/14 p-[clamp(1rem,1.4vw,1.25rem)]"
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="etiquette-fine text-[0.6875rem] tracking-[0.09em] normal-case text-lime">
                      {String(indice + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={classes(
                        'rounded-[0.4375rem] px-2.25 py-1.25 etiquette-fine text-[0.625rem] tracking-[0.07em] whitespace-nowrap',
                        etape.cote === 'client'
                          ? 'bg-lime/16 text-lime'
                          : 'bg-white/10 text-sur-sombre',
                      )}
                    >
                      {etape.acteur}
                    </span>
                  </span>
                  <span />
                  <span className="flex flex-col gap-2.25">
                    <strong className="font-titre text-[clamp(1rem,1.3vw,1.1875rem)] leading-[1.2] tracking-[-0.03em] text-white">
                      {etape.titre}
                    </strong>
                    <span className="text-[0.78125rem] leading-[1.45] text-sur-sombre">
                      {etape.description}
                    </span>
                  </span>
                </Apparition>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  )
}
