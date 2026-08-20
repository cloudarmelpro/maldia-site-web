import type { Contenu } from '@/content/types'
import { Apparition } from '@/components/shared/apparition'
import { CartesArguments } from '@/components/shared/cartes-arguments'
import { EnTeteSection } from '@/components/shared/en-tete-section'
import { Pilule } from '@/components/shared/pilule'
import { BAS_COURT, GRILLE_INTITULE, Section } from '@/components/shared/section'

/**
 * WEB-6 et WEB-12 — les reperes chiffres, sur la bande sombre du design.
 *
 * Ce sont les six memes messages que la section Pourquoi de Services, pris a la
 * meme source : les recopier ici les ferait diverger a la premiere correction.
 *
 * Le padding bas est court parce que le bloc d'appel qui suit est du meme encre.
 * A pleine hauteur des deux cotes, le raccord laisserait un vide sombre.
 */
export function AProposReperes({
  contenu,
  arguments: liste,
}: {
  contenu: Contenu['aPropos']['reperes']
  arguments: Contenu['commun']['pourquoi']['liste']
}) {
  return (
    <Section titreId="titre-reperes" fond="encre" bas={BAS_COURT}>
      <div className={GRILLE_INTITULE}>
        <Apparition>
          <Pilule intitule={contenu.intitule} registre="sombre" />
        </Apparition>

        <div className="flex flex-col gap-[clamp(1.625rem,2.8vw,2.5rem)]">
          <Apparition>
            <EnTeteSection
              titreId="titre-reperes"
              titre={contenu.titre}
              description={contenu.description}
              sombre
            />
          </Apparition>

          <CartesArguments liste={liste} sombre />
        </div>
      </div>
    </Section>
  )
}
