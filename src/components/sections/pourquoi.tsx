import type { Contenu } from '@/content/types'
import { Apparition } from '@/components/shared/apparition'
import { Bouton } from '@/components/shared/bouton'
import { delaiDeGrille } from '@/components/shared/decalage'
import { Defilement, MASQUE_BANDE } from '@/components/shared/defilement'
import { Pilule } from '@/components/shared/pilule'
import { BAS_COURT, GRILLE_INTITULE, Section } from '@/components/shared/section'

// Les trois pastilles decoratives du design. Elles ne representent personne,
// d'ou l'absence de tout libelle.
const AVATARS = ['#e7c9a9', '#c9b7e8', '#b7c6e8']

/**
 * WEB-12 — l'argumentaire chiffre, dans la mise en page du design.
 *
 * Le titre porte sa propre suite en gris clair : ce n'est pas une decoration,
 * c'est la partie qui enleve les objections plutot que d'expliquer le service.
 * Les deux forment une seule phrase, donc un seul `h2`.
 */
export function Pourquoi({
  contenu,
  marches,
  titreId,
}: {
  contenu: Contenu['commun']['pourquoi']
  marches: Contenu['commun']['marches']
  /** Deux pages portent cette section : l'id doit rester unique par page. */
  titreId: string
}) {
  return (
    <Section titreId={titreId} fond="fond" bas={BAS_COURT}>
      <div className={GRILLE_INTITULE}>
        <Apparition className="flex flex-col gap-[clamp(1.5rem,3vw,2.5rem)]">
          <Pilule intitule={contenu.intitule} registre="clair" />
          {/* Les pastilles restent en bas de la colonne d'intitule, comme dans
              le design — au-dessus de 1000 px seulement, sinon elles se
              retrouveraient collees au titre. */}
          <span aria-hidden className="hidden pl-2 large:flex large:mt-[clamp(5rem,9vw,9.25rem)]">
            {AVATARS.map((couleur) => (
              <span
                key={couleur}
                className="-ml-2 size-8.5 rounded-pilule border-2 border-white"
                style={{ background: couleur }}
              />
            ))}
          </span>
        </Apparition>

        <div className="flex flex-col gap-[clamp(2.125rem,3.6vw,3.5rem)]">
          <Apparition>
            <div className="flex flex-col items-start gap-3.5 large:flex-row large:gap-[clamp(1.5rem,3vw,3.5rem)]">
              <h2
                id={titreId}
                className="font-titre text-[clamp(1.625rem,2.5vw,2.375rem)] leading-[1.16] tracking-[-0.035em] [word-spacing:-0.01em] text-encre"
              >
                {contenu.titre} <span className="text-[#a3b2ab]">{contenu.titreSuite}</span>
              </h2>
              <span className="shrink-0 etiquette text-[0.6875rem] tracking-[0.09em] whitespace-nowrap text-encre-3">
                {contenu.etiquette}
              </span>
            </div>
          </Apparition>

          <ul className="grid grid-cols-2 gap-1 duo:grid-cols-3 voies:grid-cols-6">
            {contenu.liste.map((carte, indice) => (
              <li key={carte.chiffre + carte.ligne1} className="min-w-0">
                <Apparition delai={delaiDeGrille(indice)} className="h-full">
                  <div className="grid h-full min-h-[clamp(11.875rem,16vw,14.125rem)] min-w-0 grid-rows-[auto_1fr_auto_auto] rounded-carte border border-[#e6e9e5] bg-fond-2 p-[clamp(1.125rem,1.5vw,1.375rem)]">
                    <span className="flex flex-col gap-0.75 etiquette text-[0.6875rem] tracking-[0.09em] text-encre-2">
                      <span>{carte.ligne1}</span>
                      <span>{carte.ligne2}</span>
                    </span>
                    <span />
                    <strong
                      className={`font-titre text-[clamp(1.875rem,2.5vw,2.5rem)] leading-[0.92] tracking-[-0.05em] ${
                        carte.accent ? 'text-primaire' : 'text-encre'
                      }`}
                    >
                      {carte.chiffre}
                    </strong>
                    <span className="mt-1.75 text-[0.78125rem] leading-[1.45] text-encre-2">
                      {carte.description}
                    </span>
                  </div>
                </Apparition>
              </li>
            ))}
          </ul>

          <Apparition>
            <div className="flex flex-col items-stretch gap-5.5 rounded-encart bg-encre p-[clamp(1.625rem,3vw,2.5rem)] large:flex-row large:items-center large:gap-10">
              <div className="flex min-w-0 flex-1 flex-col gap-3">
                <span className="etiquette text-sur-sombre-2">{contenu.encart.intitule}</span>
                <p className="max-w-[34ch] font-titre text-[clamp(1.1875rem,1.7vw,1.625rem)] leading-[1.25] tracking-[-0.03em] text-white">
                  {contenu.encart.texte}
                </p>
              </div>
              <Bouton
                destination="rendezVous"
                libelle={contenu.encart.cta}
                variante="lime"
                ornement="fleche"
                className="self-start"
              />
            </div>
          </Apparition>

          <Apparition>
            <div className="flex flex-col gap-5.5">
              <span className="etiquette tracking-[0.1em] text-encre-3">{marches.intitule}</span>
              <Defilement
                items={marches.liste}
                className={MASQUE_BANDE}
                rendu={(marche) => (
                  <span className="flex items-center gap-[clamp(1.5rem,2.6vw,2.375rem)] pr-[clamp(1.5rem,2.6vw,2.375rem)] font-titre text-[clamp(1.25rem,1.9vw,1.75rem)] tracking-[-0.035em] whitespace-nowrap text-encre">
                    {marche}
                    <span aria-hidden className="size-1.25 shrink-0 rounded-pilule bg-trait-4" />
                  </span>
                )}
              />
            </div>
          </Apparition>
        </div>
      </div>
    </Section>
  )
}
