import type { Contenu } from '@/content/types'
import { TeteSection } from '@/components/shared/tete-section'
import { CarteEtape } from '@/components/shared/carte-etape'
import { classes } from '@/components/shared/classes'
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
        <TeteSection
          intitule={contenu.intitule}
          titreId={TITRE_ID}
          titre={contenu.titre}
          description={contenu.description}
        />

        <ol className="grid grid-cols-[repeat(auto-fit,minmax(12.5rem,1fr))] gap-1.5">
          {contenu.liste.map((etape, indice) => (
            <li key={etape.titre} className="min-w-0">
              <CarteEtape etape={etape} indice={indice} registre="clair" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
