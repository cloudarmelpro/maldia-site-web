import type { Contenu } from '@/content/types'
import { Apparition } from '@/components/shared/apparition'
import { IntituleSection } from '@/components/shared/intitule-section'
import { Bouton } from '@/components/shared/bouton'
import { CartesArguments } from '@/components/shared/cartes-arguments'
import { classes } from '@/components/shared/classes'
import { Defilement, MASQUE_BANDE } from '@/components/shared/defilement'
import { BAS_COURT, Section } from '@/components/shared/section'

/**
 * WEB-12 — l'argumentaire chiffre.
 *
 * Le titre porte sa propre suite en gris : ce n'est pas une decoration, c'est
 * la partie qui enleve les objections plutot que d'expliquer le service. Les
 * deux forment une seule phrase, donc un seul `h2`.
 *
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
      <div className="flex flex-col gap-[clamp(1.5rem,3vw,2.5rem)]">
        <Apparition className="w-fit self-start">
          <IntituleSection intitule={contenu.intitule} />
        </Apparition>

        <div className="flex flex-col gap-[clamp(2.125rem,3.6vw,3.5rem)]">
          <Apparition registre="texte">
            <div className="flex flex-wrap items-start gap-[clamp(0.875rem,3vw,3.5rem)]">
              <h2
                id={titreId}
                className="min-w-0 grow basis-[32.5rem] font-titre text-[clamp(1.25rem,1.9vw,1.75rem)] leading-[1.25] tracking-[-0.035em] text-pretty [word-spacing:-0.01em] text-encre"
              >
                {contenu.titre} <span className="text-encre-2">{contenu.titreSuite}</span>
              </h2>
              <span className="shrink-0 etiquette text-[0.6875rem] tracking-[0.09em] whitespace-nowrap text-encre-2">
                {contenu.etiquette}
              </span>
            </div>
          </Apparition>

          <CartesArguments liste={contenu.liste} registre="aplat" disposition="fluide" />

          <Apparition>
            <div className="flex flex-wrap items-center gap-[clamp(1.375rem,3vw,2.5rem)] rounded-encart bg-primaire p-[clamp(1.625rem,3vw,2.5rem)]">
              <div className="flex min-w-0 grow basis-[20rem] flex-col gap-3">
                <span className="etiquette text-[0.6875rem] tracking-[0.1em] text-white/94">
                  {contenu.encart.intitule}
                </span>
                <p className="max-w-[34ch] font-titre text-[clamp(1.1875rem,1.7vw,1.625rem)] leading-[1.25] tracking-[-0.03em] text-white">
                  {contenu.encart.texte}
                </p>
              </div>
              <Bouton
                destination="rendezVous"
                libelle={contenu.encart.cta}
                variante="blanc"
                className="shrink-0 self-start"
              />
            </div>
          </Apparition>

          <Apparition>
            <div className="flex min-w-0 flex-col gap-5.5">
              <span className="etiquette text-[0.6875rem] tracking-[0.1em] text-encre-2">
                {marches.intitule}
              </span>
              <Defilement
                items={marches.liste}
                className={classes('rounded-bloc', MASQUE_BANDE)}
                rendu={(marche) => (
                  <span className="flex items-center gap-[clamp(1.5rem,2.6vw,2.375rem)] pr-[clamp(1.5rem,2.6vw,2.375rem)] font-titre text-[clamp(1.25rem,1.9vw,1.75rem)] font-extralight tracking-[-0.035em] whitespace-nowrap text-encre">
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
