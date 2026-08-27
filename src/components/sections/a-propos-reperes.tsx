import type { Contenu } from '@/content/types'
import { Apparition } from '@/components/shared/apparition'
import { CartesArguments } from '@/components/shared/cartes-arguments'
import { EnTeteSection } from '@/components/shared/en-tete-section'
import { Pilule } from '@/components/shared/pilule'
import { Section } from '@/components/shared/section'

/**
 * WEB-6 et WEB-12 — les reperes chiffres.
 *
 * Ce sont les memes messages que la section Pourquoi de l'accueil et de
 * Services, pris a la meme source : les recopier ici les ferait diverger a la
 * premiere correction.
 *
 * Section claire, entre l'aplat vert du fonctionnement et celui du bloc
 * d'appel : sur un fond sombre, les deux bandes se toucheraient et la coiffe
 * arrondie du bloc d'appel ne se lirait plus.
 */
export function AProposReperes({
  contenu,
  arguments: liste,
}: {
  contenu: Contenu['aPropos']['reperes']
  arguments: Contenu['commun']['pourquoi']['liste']
}) {
  return (
    <Section titreId="titre-reperes" fond="fond">
      <div className="flex flex-col gap-[clamp(1.5rem,3vw,2.5rem)]">
        <Apparition>
          <Pilule intitule={contenu.intitule} registre="clair" />
        </Apparition>

        <div className="flex flex-col gap-[clamp(2.125rem,3.6vw,3.5rem)]">
          <Apparition registre="texte">
            <EnTeteSection
              titreId="titre-reperes"
              titre={contenu.titre}
              description={contenu.description}
            />
          </Apparition>

          <CartesArguments liste={liste} registre="aplat" disposition="fluide" />
        </div>
      </div>
    </Section>
  )
}
