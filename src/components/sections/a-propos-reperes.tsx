import type { Contenu } from '@/content/types'
import { IntituleSection } from '@/components/shared/intitule-section'
import { Apparition } from '@/components/shared/apparition'
import { CartesArguments } from '@/components/shared/cartes-arguments'
import { EnTeteSection } from '@/components/shared/en-tete-section'
import { Section } from '@/components/shared/section'

/**
 * WEB-6 et WEB-12 — les reperes chiffres.
 *
 * Ce sont les memes messages que la section Pourquoi de l'accueil et de
 * Services, pris a la meme source : les recopier ici les ferait diverger a la
 * premiere correction.
 *
 * Section claire, entre l'aplat vert du fonctionnement et celui du bloc
 * d'appel : sur du vert, les deux bandes se toucheraient et ni l'arrondi de
 * l'une ni la coiffe de l'autre ne se liraient.
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
        <Apparition className="w-fit self-start">
          <IntituleSection intitule={contenu.intitule} />
        </Apparition>

        <Apparition registre="texte">
          <EnTeteSection
            titreId="titre-reperes"
            titre={contenu.titre}
            description={contenu.description}
          />
        </Apparition>

        <CartesArguments liste={liste} registre="aplat" disposition="fluide" />
      </div>
    </Section>
  )
}
