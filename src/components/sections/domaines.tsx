import type { Contenu } from '@/content/types'
import { Apparition } from '@/components/shared/apparition'
import { Bouton } from '@/components/shared/bouton'
import { Carte } from '@/components/shared/carte'
import { delaiDeGrille } from '@/components/shared/decalage'
import { EnTeteSection } from '@/components/shared/en-tete-section'
import { Section } from '@/components/shared/section'

/**
 * WEB-4 et WEB-5 — les domaines couverts, dans le bloc teinté de la maquette :
 * une carte claire à tuiles de domaines, une carte sombre qui porte l'appel.
 */
export function Domaines({ contenu }: { contenu: Contenu['services']['domaines'] }) {
  const rangees: readonly (readonly string[])[] = [contenu.tuiles.rangee1, contenu.tuiles.rangee2]

  return (
    <Section titreId="titre-domaines" fond="tendre" bloc dessous="fond">
      <Apparition>
        <EnTeteSection titreId="titre-domaines" titre={contenu.titre} fond="tendre" />
      </Apparition>

      <div className="mt-16 grid gap-[2.125rem] [&>*]:min-w-0 lg:grid-cols-2">
        <Apparition className="h-full">
          <Carte className="flex h-full min-h-[31.25rem] flex-col items-center justify-between gap-12 rounded-carte-large p-12">
            <div className="flex w-full flex-col items-center gap-5">
              {rangees.map((rangee, indice) => (
                <ul key={indice} className="flex flex-wrap justify-center gap-3">
                  {rangee.map((outil) => (
                    <li
                      key={outil}
                      className="grid h-[3.875rem] min-w-[3.875rem] place-items-center rounded-[0.9375rem] bg-fond-2 px-4.5 text-[0.9375rem] font-semibold whitespace-nowrap text-encre-2"
                    >
                      {outil}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
            <h3 className="max-w-[12ch] text-center text-[2rem] leading-[1.1] font-semibold tracking-[-0.03em] text-encre">
              {contenu.titreGauche}
            </h3>
          </Carte>
        </Apparition>

        <Apparition delai={delaiDeGrille(1)} className="h-full">
          <div className="flex h-full min-h-[31.25rem] flex-col gap-7 rounded-carte-large bg-sombre p-12 text-sur-sombre">
            <h3 className="max-w-[20ch] text-[1.9375rem] leading-[1.15] font-semibold tracking-[-0.03em]">
              {contenu.titreSombre}
            </h3>
            <Bouton
              destination="rendezVous"
              libelle={contenu.ctaSombre}
              variante="inverse"
              className="mt-auto self-start"
            />
          </div>
        </Apparition>
      </div>
    </Section>
  )
}
