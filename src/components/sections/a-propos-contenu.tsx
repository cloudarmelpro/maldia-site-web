import { LANGUES } from '@/content/langues'
import { PHOTOS } from '@/content/photos'
import type { Contenu } from '@/content/types'
import { Apparition } from '@/components/shared/apparition'
import { Bouton } from '@/components/shared/bouton'
import { Carte } from '@/components/shared/carte'
import { delaiDeGrille } from '@/components/shared/decalage'
import { MESURE_PROSE, Section } from '@/components/shared/section'
import { Visuel } from '@/components/shared/visuel'

/**
 * WEB-6 — À propos.
 *
 * Les trois repères sont **comptés** à partir des listes qu'ils résument, pas
 * recopiés : un marché ajouté au cahier fait bouger le chiffre tout seul. Un
 * nombre écrit à la main deviendrait faux en silence.
 */
export function AProposContenu({ contenu }: { contenu: Contenu }) {
  const { aPropos } = contenu

  const reperes = [
    { valeur: contenu.commun.marches.liste.length, libelle: aPropos.reperes.marches },
    { valeur: contenu.talents.profils.liste.length, libelle: aPropos.reperes.domaines },
    { valeur: LANGUES.length, libelle: aPropos.reperes.langues },
  ]

  return (
    <Section titreId="titre-a-propos" fond="fond-2" bloc dessous="fond">
      <div className="grid items-start gap-12 [&>*]:min-w-0 lg:grid-cols-[1fr_0.85fr]">
        <Apparition>
          <div className="flex flex-col gap-6">
            <h2
              id="titre-a-propos"
              className="max-w-[24ch] font-titre font-normal text-[2rem] leading-[1.08] text-balance text-encre sm:text-[2.5rem]"
            >
              {aPropos.titre}
            </h2>
            {aPropos.paragraphes.map((paragraphe) => (
              <p
                key={paragraphe}
                className={`${MESURE_PROSE} font-description text-[1.0625rem] leading-[1.65] text-encre-2`}
              >
                {paragraphe}
              </p>
            ))}
            <div className="mt-2">
              <Bouton destination="rendezVous" libelle={aPropos.cta} />
            </div>
          </div>
        </Apparition>

        <Apparition delai={delaiDeGrille(1)}>
          <div className="flex flex-col gap-7.5">
            <Carte className="rounded-carte-large p-3.5">
              <Visuel
                ratio="carre"
                photo={PHOTOS.aPropos}
                arrondi="rounded-[1.25rem]"
                tailles="(max-width: 1024px) 100vw, 420px"
                prioritaire
              />
            </Carte>

            <ul className="flex flex-col gap-3.5">
              {reperes.map((repere) => (
                <li
                  key={repere.libelle}
                  className="flex min-w-0 items-baseline gap-4 rounded-avis bg-carte px-7 py-5"
                >
                  <span className="font-titre font-normal text-[2.25rem] leading-none tracking-[-0.04em] text-primaire">
                    {repere.valeur}
                  </span>
                  <span className="font-description text-[1.0625rem] text-encre-2">
                    {repere.libelle}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Apparition>
      </div>
    </Section>
  )
}
