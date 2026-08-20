import type { Contenu } from '@/content/types'
import { Apparition } from '@/components/shared/apparition'
import { Bouton } from '@/components/shared/bouton'
import { delaiDeGrille } from '@/components/shared/decalage'
import { EnTeteSection } from '@/components/shared/en-tete-section'
import { Pilule } from '@/components/shared/pilule'
import { DECALAGE_CONTENU, GRILLE_INTITULE, Section } from '@/components/shared/section'

/**
 * WEB-4 — les cinq etapes, dans la frise du design.
 *
 * Au-dela de 900 px les etapes deviennent une frise horizontale defilante :
 * `grid-flow-col` avec des colonnes de 196 px minimum. C'est ce qui garde
 * l'ordre lisible sans reduire chaque etape a une ligne.
 *
 * Le rang est calcule, jamais recopie : une etape inseree renumerote la suite
 * toute seule.
 */
export function Methode({
  contenu,
  titreId,
}: {
  contenu: Contenu['commun']['methode']
  /** Deux pages portent cette section : l'id doit rester unique par page. */
  titreId: string
}) {
  return (
    <Section titreId={titreId} fond="encre">
      <div className={GRILLE_INTITULE}>
        <Apparition>
          <Pilule intitule={contenu.intitule} registre="sombre" />
        </Apparition>
        <Apparition>
          <EnTeteSection
            titreId={titreId}
            titre={contenu.titre}
            description={contenu.description}
            sombre
          />
        </Apparition>
      </div>

      <ol
        className={`mt-[clamp(2.125rem,3.6vw,3.5rem)] grid grid-cols-1 gap-1.5 duo:grid-cols-2 frise:auto-cols-[minmax(12.25rem,1fr)] frise:grid-flow-col frise:grid-cols-none frise:overflow-x-auto frise:pb-1 ${DECALAGE_CONTENU}`}
      >
        {contenu.liste.map((etape, indice) => (
          <li key={etape.titre} className="min-w-0">
            {/* La carte est l'element anime : `display: contents` sur un
                conteneur intermediaire annulerait la transformation. */}
            <Apparition
              delai={delaiDeGrille(indice)}
              className="grid h-full min-h-[clamp(12.25rem,16vw,14.125rem)] min-w-0 grid-rows-[auto_1fr_auto] rounded-carte border border-white/12 bg-white/4 p-[clamp(1rem,1.4vw,1.25rem)]"
            >
              <span className="flex items-center justify-between gap-3">
                <span className="etiquette-fine text-[0.6875rem] tracking-[0.09em] normal-case text-lime">
                  {String(indice + 1).padStart(2, '0')}
                </span>
                <span
                  className={`rounded-[0.4375rem] px-2.25 py-1.25 etiquette-fine text-[0.625rem] tracking-[0.07em] whitespace-nowrap ${
                    etape.cote === 'client' ? 'bg-lime/16 text-lime' : 'bg-white/10 text-sur-sombre'
                  }`}
                >
                  {etape.acteur}
                </span>
              </span>
              <span />
              <span className="flex flex-col gap-2.25">
                <strong className="font-titre text-[clamp(1.0625rem,1.35vw,1.25rem)] leading-[1.2] tracking-[-0.03em] text-white">
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

      <Apparition>
        <div
          className={`mt-[clamp(1.75rem,2.8vw,2.5rem)] flex flex-col items-start gap-5 large:flex-row large:items-center large:justify-between large:gap-10 ${DECALAGE_CONTENU}`}
        >
          <p className="max-w-[44ch] font-titre text-[clamp(1rem,1.35vw,1.25rem)] leading-[1.35] tracking-[-0.02em] text-white">
            {contenu.conclusion}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Bouton
              destination="rendezVous"
              libelle={contenu.ctaPrincipal}
              variante="lime"
              ornement="fleche"
            />
            <Bouton
              destination="candidature"
              libelle={contenu.ctaSecondaire}
              variante="contour-clair"
            />
          </div>
        </div>
      </Apparition>
    </Section>
  )
}
