import { Check, Info } from 'lucide-react'

import type { Contenu } from '@/content/types'
import { Apparition } from '@/components/shared/apparition'
import { Bouton, LienPastille, LienPastilleAncre } from '@/components/shared/bouton'
import { Carte } from '@/components/shared/carte'
import { delaiDeGrille } from '@/components/shared/decalage'
import { Section } from '@/components/shared/section'

/**
 * WEB-1 et WEB-7 — les deux façons de commencer, dans le bloc en aplat de la
 * maquette. Ce n'est plus une grille de tarifs : aucun montant n'y figure.
 *
 * La destination vient de la position dans le tuple, que le type fige : la
 * première carte s'adresse aux talents, la seconde aux entreprises. Chaque
 * appel porte le nom de son offre en nom accessible — sans lui, plusieurs liens
 * au même libellé seraient indiscernables dans une liste de liens.
 */
export function Commencer({ contenu }: { contenu: Contenu['commencer'] }) {
  const [titre1, titre2] = contenu.titre
  const [sous1, sous2] = contenu.sousTitre

  return (
    <Section ancre="contact" titreId="titre-commencer" fond="vif">
      <Apparition>
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4.5 text-center">
          <h2
            id="titre-commencer"
            className="flex flex-col font-titre text-[2.125rem] leading-[1.06] font-normal text-sur-vif sm:text-[2.375rem] lg:text-[2.875rem]"
          >
            <span>{titre1}</span>
            <span>{titre2}</span>
          </h2>
          <p className="flex flex-col font-description leading-normal font-normal text-sur-vif">
            <span>{sous1}</span>
            <span>{sous2}</span>
          </p>
        </div>
      </Apparition>

      {/* auto-fit plutot qu'un point de rupture : la seconde colonne n'apparait
          que si la carte tient 30rem, la largeur qu'il faut pour garder les deux
          appels sur une seule ligne. A 1024 px, deux colonnes ne tenaient pas. */}
      <ul className="mx-auto mt-14 grid max-w-[1024px] auto-rows-fr gap-8 [grid-template-columns:repeat(auto-fit,minmax(min(100%,30rem),1fr))] [&>*]:min-w-0">
        {contenu.offres.map((offre, indice) => {
          const pourLesTalents = indice === 0
          return (
            <li key={offre.intitule} className="min-w-0">
              <Apparition delai={delaiDeGrille(indice)} className="h-full">
                <Carte className="flex h-full min-w-0 flex-col gap-5 rounded-offre p-8 pb-11">
                  <h3 className="self-start rounded-pilule bg-primaire px-3.5 py-1.5 text-[0.6875rem] font-bold tracking-[0.07em] text-carte uppercase">
                    {offre.intitule}
                  </h3>
                  <p className="flex flex-wrap items-baseline gap-2">
                    <strong className="font-titre text-[2.75rem] leading-none font-normal tracking-[-0.04em] text-encre">
                      {offre.prix}
                    </strong>
                    <span className="text-[0.9375rem] text-encre-2">{offre.unite}</span>
                  </p>
                  <p className="font-description text-sm leading-normal font-normal text-encre-2">
                    {offre.description}
                  </p>
                  <span aria-hidden className="h-px bg-trait" />
                  <ul className="flex flex-col gap-2">
                    {offre.inclus.map((inclusion) => (
                      <li key={inclusion} className="flex min-w-0 items-center gap-2.5">
                        <span
                          aria-hidden
                          className="grid size-4 shrink-0 place-items-center rounded-full bg-primaire"
                        >
                          <Check className="size-2.5 text-carte" />
                        </span>
                        <span className="font-description text-base leading-normal text-encre-3">{inclusion}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="flex flex-wrap items-baseline gap-2 font-description text-sm">
                    <strong className="font-semibold text-encre">{offre.libelleSupplement}</strong>
                    <span className="text-encre-2">{offre.supplement}</span>
                  </p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-2.5">
                    <Bouton
                      destination={pourLesTalents ? 'candidature' : 'rendezVous'}
                      libelle={offre.cta}
                      className="min-h-11 px-3.5 text-sm"
                      aria-label={`${offre.cta} — ${offre.intitule}`}
                    />
                    {/* Le second appel de la carte des talents mène à la section
                        des profils, pas à une destination sortante. */}
                    {pourLesTalents ? (
                      <LienPastilleAncre ancre="profils" libelle={offre.cta2} />
                    ) : (
                      <LienPastille
                        destination="rendezVous"
                        libelle={offre.cta2}
                        aria-label={`${offre.cta2} — ${offre.intitule}`}
                      />
                    )}
                  </div>
                  <p className="font-description flex gap-2 text-[0.8125rem] leading-normal text-encre-2">
                    <Info aria-hidden className="mt-0.5 size-3.5 shrink-0" />
                    <span>{offre.note}</span>
                  </p>
                </Carte>
              </Apparition>
            </li>
          )
        })}
      </ul>

      <Apparition delai={delaiDeGrille(2)}>
        <div className="mx-auto mt-[2.875rem] flex max-w-[1024px] flex-wrap items-center gap-7 rounded-offre bg-vif-encart p-9">
          <div className="flex min-w-0 flex-1 basis-72 flex-col gap-2.5">
            <h3 className="text-2xl leading-tight font-bold tracking-[-0.02em] text-sur-vif">
              {contenu.promo.titre}
            </h3>
            {/* La maquette plafonne ce paragraphe à 58ch ; en rem, la contrainte
                ne dépend pas de la taille de police de l'élément. */}
            <p className="max-w-[34rem] font-description text-sm leading-normal font-normal text-sur-vif">
              {contenu.promo.description}
            </p>
          </div>
          <Bouton
            destination="rendezVous"
            libelle={contenu.promo.cta}
            variante="inverse"
            className="min-h-11 shrink-0 px-5 text-sm"
            aria-label={`${contenu.promo.cta} — ${contenu.promo.titre}`}
          />
        </div>
      </Apparition>
    </Section>
  )
}
