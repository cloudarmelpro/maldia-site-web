import type { Contenu } from '@/content/types'
import { TeteSection } from '@/components/shared/tete-section'
import { CartesArguments } from '@/components/shared/cartes-arguments'
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
    <Section titreId="titre-reperes">
      <div className="flex flex-col gap-[clamp(1.5rem,3vw,2.5rem)]">
        <TeteSection
          intitule={contenu.intitule}
          titreId="titre-reperes"
          titre={contenu.titre}
          description={contenu.description}
        />

        <CartesArguments liste={liste} />
      </div>
    </Section>
  )
}
