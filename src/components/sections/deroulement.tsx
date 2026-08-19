import type { Contenu } from '@/content/types'
import { Apparition } from '@/components/shared/apparition'
import { Bouton } from '@/components/shared/bouton'
import { delaiDeGrille } from '@/components/shared/decalage'
import { EnTeteSection } from '@/components/shared/en-tete-section'
import { Section } from '@/components/shared/section'

/**
 * WEB-4 — les six étapes du service, dans l'ordre du cahier.
 *
 * Le numéro et le côté responsable — « Vous », « Maldia », « Ensemble » — sont
 * ce que la carte apporte de plus qu'une liste : ils disent qui agit à chaque
 * étape, ce que le seul titre ne dit pas.
 *
 * `auto-fit` plutôt qu'un nombre de colonnes fixe : la grille se replie d'
 * elle-même sans point de rupture à maintenir.
 */
export function Deroulement({ contenu }: { contenu: Contenu['deroulement'] }) {
  return (
    <Section titreId="titre-deroulement">
      <Apparition>
        <EnTeteSection
          titreId="titre-deroulement"
          titre={contenu.titre}
          description={contenu.description}
        />
      </Apparition>

      <ol className="mt-14 grid gap-[1.375rem] [grid-template-columns:repeat(auto-fit,minmax(min(100%,17.5rem),1fr))]">
        {contenu.liste.map((etape, indice) => (
          <li key={etape.numero} className="min-w-0">
            <Apparition delai={delaiDeGrille(indice)} className="h-full">
              {/* Aucun état de survol : la carte n'est pas cliquable, et une
                  surface qui réagit au pointeur promet une action inexistante. */}
              <div className="flex h-full min-w-0 flex-col gap-3.5 rounded-avis bg-fond-2 px-7 pt-[1.875rem] pb-8">
                <p className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="grid size-[2.375rem] shrink-0 place-items-center rounded-[0.75rem] bg-primaire font-mono text-sm font-medium text-carte"
                  >
                    {etape.numero}
                  </span>
                  <span aria-hidden className="h-px flex-1 border-t-[1.5px] border-dashed border-trait" />
                  <span className="shrink-0 text-[0.78125rem] font-semibold tracking-[0.06em] text-encre-2 uppercase">
                    {etape.cote}
                  </span>
                </p>
                <h3 className="font-titre text-[1.3125rem] leading-tight font-medium tracking-[-0.02em] text-encre">
                  {etape.titre}
                </h3>
                <p className="font-description text-[0.9375rem] leading-[1.6] text-encre-2">
                  {etape.description}
                </p>
              </div>
            </Apparition>
          </li>
        ))}
      </ol>

      <Apparition delai={delaiDeGrille(6)}>
        <div className="mt-[2.125rem] flex flex-wrap items-center justify-center gap-4.5">
          <Bouton destination="rendezVous" libelle={contenu.cta} />
          <span className="font-description text-[0.9375rem] text-encre-2">{contenu.mention}</span>
        </div>
      </Apparition>
    </Section>
  )
}
