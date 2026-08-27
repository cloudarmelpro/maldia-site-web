import type { Contenu } from '@/content/types'
import { Apparition } from '@/components/shared/apparition'
import { CartesArguments } from '@/components/shared/cartes-arguments'
import { EnTeteSection } from '@/components/shared/en-tete-section'
import { Section } from '@/components/shared/section'
import { IntituleSection } from '@/components/shared/intitule-section'

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
    <Section titreId={TITRE_ID} fond="fond">
      <div className="flex flex-col gap-[clamp(1.5rem,3vw,2.5rem)]">
        <Apparition className="w-fit self-start">
          <IntituleSection intitule={intitule} />
        </Apparition>

        <Apparition registre="texte">
          <EnTeteSection titreId={TITRE_ID} titre={entete.titre} description={entete.description} />
        </Apparition>

        <CartesArguments liste={liste} registre="aplat" disposition="fluide" />
      </div>
    </Section>
  )
}
