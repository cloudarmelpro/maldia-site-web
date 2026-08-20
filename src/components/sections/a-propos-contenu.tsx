import Image from 'next/image'

import { LANGUES } from '@/content/langues'
import { PHOTOS } from '@/content/photos'
import type { Contenu } from '@/content/types'
import { Apparition } from '@/components/shared/apparition'
import { delaiDeGrille } from '@/components/shared/decalage'
import { Pilule } from '@/components/shared/pilule'
import { GRILLE_INTITULE, Section } from '@/components/shared/section'

/**
 * WEB-6 — a propos.
 *
 * Les trois reperes sont **comptes** a partir des listes qu'ils resument, pas
 * recopies : un marche ajoute au cahier fait bouger le chiffre tout seul. Un
 * nombre ecrit a la main deviendrait faux en silence.
 */
export function AProposContenu({ contenu }: { contenu: Contenu }) {
  const { aPropos } = contenu

  const reperes = [
    { valeur: contenu.commun.marches.liste.length, libelle: aPropos.reperes.marches },
    { valeur: contenu.commun.profils.liste.length, libelle: aPropos.reperes.domaines },
    { valeur: LANGUES.length, libelle: aPropos.reperes.langues },
  ]

  return (
    <Section titreId="titre-a-propos" fond="fond">
      <div className={GRILLE_INTITULE}>
        <Apparition>
          <Pilule intitule={aPropos.entete.intitule} registre="clair" />
        </Apparition>

        <div className="flex flex-col gap-[clamp(2.125rem,3.6vw,3.5rem)]">
          <Apparition>
            <h2 id="titre-a-propos" className="sr-only">
              {aPropos.entete.titre}
            </h2>
            <div className="flex flex-col gap-5">
              {aPropos.paragraphes.map((paragraphe) => (
                <p
                  key={paragraphe}
                  className="max-w-[62ch] text-[clamp(0.9375rem,1.15vw,1.0625rem)] leading-[1.65] text-encre-2"
                >
                  {paragraphe}
                </p>
              ))}
            </div>
          </Apparition>

          <div className="grid grid-cols-1 gap-[clamp(1.125rem,1.8vw,1.625rem)] voies:grid-cols-[minmax(0,1fr)_minmax(0,42%)]">
            <ul className="flex flex-col gap-1">
              {reperes.map((repere, indice) => (
                <li key={repere.libelle} className="min-w-0">
                  <Apparition delai={delaiDeGrille(indice)}>
                    <div className="flex min-w-0 items-baseline gap-4 rounded-carte border border-trait bg-fond-2 px-6 py-5">
                      <span className="font-titre text-[2.25rem] leading-none tracking-[-0.05em] text-primaire">
                        {repere.valeur}
                      </span>
                      <span className="etiquette text-encre-2">{repere.libelle}</span>
                    </div>
                  </Apparition>
                </li>
              ))}
            </ul>

            <Apparition delai={delaiDeGrille(1)}>
              {/* alt vide : les paragraphes voisins portent l'information. */}
              <div className="relative min-h-70 overflow-hidden rounded-carte bg-fond-2">
                <Image
                  src={PHOTOS.aPropos}
                  alt=""
                  fill
                  sizes="(max-width: 820px) 100vw, 42vw"
                  className="object-cover"
                />
              </div>
            </Apparition>
          </div>
        </div>
      </div>
    </Section>
  )
}
