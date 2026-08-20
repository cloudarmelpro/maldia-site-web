import type { Contenu } from '@/content/types'
import { AccordeonFaq } from '@/components/shared/accordeon-faq'
import { Apparition } from '@/components/shared/apparition'
import { PAS_DECALAGE_MS } from '@/components/shared/decalage'
import { EnTeteSection } from '@/components/shared/en-tete-section'
import { MESURE_PROSE, Section } from '@/components/shared/section'

/**
 * Hors cahier — gabarit.
 *
 * Les réponses sont construites ici, dans le Server Component : seule
 * l'ouverture passe la frontière client, pas les textes ni leur mise en forme.
 */
export function Faq({ contenu }: { contenu: Contenu['accueil']['faq'] }) {
  return (
    <Section titreId="titre-faq" fond="fond-2" bloc dessous="vif">
      <Apparition>
        <EnTeteSection
          titreId="titre-faq"
          titre={contenu.titre}
          description={contenu.description}
          fond="fond-2"
        />
      </Apparition>
      <Apparition delai={PAS_DECALAGE_MS}>
        <AccordeonFaq
          entrees={contenu.questions.map((entree) => ({
            question: entree.question,
            reponse: (
              <p
                className={`${MESURE_PROSE} font-description px-8 pb-6 text-[0.97rem] leading-[1.6] text-encre-2`}
              >
                {entree.reponse}
              </p>
            ),
          }))}
        />
      </Apparition>
    </Section>
  )
}
