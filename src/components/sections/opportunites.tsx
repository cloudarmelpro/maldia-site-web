import type { Contenu } from '@/content/types'
import { Apparition } from '@/components/shared/apparition'
import { Carte } from '@/components/shared/carte'
import { delaiDeGrille } from '@/components/shared/decalage'
import { EnTeteSection } from '@/components/shared/en-tete-section'
import { Section } from '@/components/shared/section'
import { PHOTOS } from '@/content/photos'
import { Visuel } from '@/components/shared/visuel'

/** WEB-1 et WEB-3 — les trois façons de travailler avec Maldia. */
export function Opportunites({ contenu }: { contenu: Contenu['talents']['opportunites'] }) {
  return (
    <Section titreId="titre-opportunites" fond="fond-2" bloc dessous="fond">
      <Apparition>
        <EnTeteSection
          titreId="titre-opportunites"
          titre={contenu.titre}
          description={contenu.description}
          fond="fond-2"
        />
      </Apparition>
      <ol className="mt-11 grid gap-7 md:auto-rows-fr md:grid-cols-3">
        {contenu.liste.map((opportunite, indice) => (
          <li key={opportunite.titre} className="min-w-0">
            <Apparition delai={delaiDeGrille(indice)} className="h-full">
              <Carte className="h-full p-3 pb-8">
                <Visuel
                  ratio="projet"
                  photo={PHOTOS.opportunites[indice]}
                />
                <div className="flex flex-col gap-3.5 px-5 pt-7">
                  <h3 className="font-titre text-[1.3125rem] font-medium tracking-[-0.03em] text-encre">
                    {opportunite.titre}
                  </h3>
                  <p className="font-description text-[0.97rem] leading-[1.55] text-encre-2">{opportunite.description}</p>
                </div>
              </Carte>
            </Apparition>
          </li>
        ))}
      </ol>
    </Section>
  )
}
