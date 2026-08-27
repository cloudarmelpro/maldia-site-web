import type { Contenu } from '@/content/types'
import { TeteSection } from '@/components/shared/tete-section'
import { CartesArguments } from '@/components/shared/cartes-arguments'
import { Section } from '@/components/shared/section'

const TITRE_ID = 'titre-engagements'

/**
 * WEB-12 — l'argumentaire chiffre de la page Services.
 *
 * Les chiffres viennent de `commun.pourquoi.liste`, la source que l'accueil et
 * A propos lisent aussi : deux listes divergeraient a la premiere correction.
 *
 * Seule section claire de la page a porter un padding haut : celles qui suivent
 * prolongent le meme aplat blanc et n'ont que leur padding bas.
 */
export function ServicesChiffres({
  intitule,
  entete,
  liste,
}: {
  intitule: string
  entete: Contenu['services']['engagements']
  liste: Contenu['commun']['pourquoi']['liste']
}) {
  return (
    <Section titreId={TITRE_ID}>
      <div className="flex flex-col gap-[clamp(1.5rem,3vw,2.5rem)]">
        <TeteSection
          intitule={intitule}
          titreId={TITRE_ID}
          titre={entete.titre}
          description={entete.description}
        />

        <CartesArguments liste={liste} />
      </div>
    </Section>
  )
}
