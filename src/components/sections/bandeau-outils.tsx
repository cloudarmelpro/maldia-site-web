import { OUTILS } from '@/content/outils'
import type { Contenu } from '@/content/types'
import { Apparition } from '@/components/shared/apparition'
import { Defilement } from '@/components/shared/defilement'
import { EnTeteSection } from '@/components/shared/en-tete-section'
import { Section } from '@/components/shared/section'

// Sens alternés d'une rangée à l'autre : le retour client laisse le choix du
// sens, et deux rangées qui glissent du même côté se lisent comme une seule.
const SENS = ['gauche', 'droite', 'gauche'] as const

/**
 * WEB-14 — le bandeau des outils.
 *
 * Des noms et non des logos, et ce n'est pas un raccourci : `simple-icons` ne
 * redistribue plus Slack, Microsoft, Adobe, Canva, Salesforce ni VS Code, dont
 * les propriétaires ont demandé le retrait. Un bandeau moitié logos moitié
 * texte se lit comme une erreur d'affichage. Voir décision 0016.
 *
 * Ces noms sont du contenu, pas un décor : contrairement aux tuiles de la
 * clôture, ils ne sont pas masqués aux lecteurs d'écran. La mention finale dit
 * qu'aucun partenariat n'est sous-entendu — le retour client l'exige.
 */
export function BandeauOutils({
  contenu,
  titreId,
}: {
  contenu: Contenu['commun']['outils']
  /** Deux pages portent cette section : l'id doit rester unique par page. */
  titreId: string
}) {
  return (
    <Section titreId={titreId} fond="fond">
      <Apparition>
        <EnTeteSection titreId={titreId} titre={contenu.titre} />
      </Apparition>

      <Apparition className="mt-12">
        <div className="flex flex-col gap-4">
          {OUTILS.map((rangee, indice) => (
            <Defilement
              // La cle est l'indice et non le sens : deux rangees glissent vers
              // la gauche, et React refusait deux enfants de meme cle.
              key={indice}
              items={rangee}
              sens={SENS[indice]}
              rendu={(outil) => (
                <span className="mr-3.5 grid h-[3.375rem] min-w-[3.375rem] place-items-center rounded-[0.9375rem] bg-fond-2 px-5 font-description text-[0.9375rem] font-normal whitespace-nowrap text-encre-2">
                  {outil}
                </span>
              )}
            />
          ))}
        </div>
      </Apparition>

      <Apparition>
        <p className="mx-auto mt-9 max-w-[44rem] text-center font-description text-[0.875rem] leading-[1.6] text-encre-2">
          {contenu.mention}
        </p>
      </Apparition>
    </Section>
  )
}
