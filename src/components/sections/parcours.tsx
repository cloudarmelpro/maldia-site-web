import { Check, Info } from 'lucide-react'

import { chemin } from '@/content/langues'
import type { Langue } from '@/content/langues'
import type { Contenu } from '@/content/types'
import { Apparition } from '@/components/shared/apparition'
import { Bouton, LienPastille, LienPastillePage } from '@/components/shared/bouton'
import { Carte } from '@/components/shared/carte'
import { delaiDeGrille } from '@/components/shared/decalage'
import { Section } from '@/components/shared/section'

/**
 * WEB-2 — les deux parcours de l'accueil : une entreprise qui cherche du
 * personnel, une personne qui cherche à travailler avec Maldia.
 *
 * Ce n'est pas une grille de tarifs, malgré la forme héritée de la maquette :
 * aucun montant n'y figure, et l'emplacement du prix porte une action.
 *
 * La destination vient de la position dans le tuple, que le type fige : la
 * première carte s'adresse aux talents, la seconde aux entreprises. Chaque
 * appel porte le nom de son parcours en nom accessible — sans lui, plusieurs
 * liens au même libellé seraient indiscernables dans une liste de liens.
 */
export function Parcours({
  contenu,
  langue,
}: {
  contenu: Contenu['accueil']['parcours']
  langue: Langue
}) {
  const [titre1, titre2] = contenu.titre
  const [sous1, sous2] = contenu.sousTitre

  return (
    <Section titreId="titre-parcours" fond="vif" bloc dessous="fond">
      <Apparition>
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4.5 text-center">
          <h2
            id="titre-parcours"
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
        {contenu.entrees.map((entree, indice) => {
          const pourLesTalents = indice === 0
          return (
            <li key={entree.intitule} className="min-w-0">
              <Apparition delai={delaiDeGrille(indice)} className="h-full">
                <Carte className="flex h-full min-w-0 flex-col gap-5 rounded-offre p-8 pb-11">
                  <h3 className="self-start rounded-pilule bg-primaire px-3.5 py-1.5 text-[0.6875rem] font-bold tracking-[0.07em] text-carte uppercase">
                    {entree.intitule}
                  </h3>
                  <p className="flex flex-wrap items-baseline gap-2">
                    <strong className="font-titre text-[2.75rem] leading-none font-normal tracking-[-0.04em] text-encre">
                      {entree.action}
                    </strong>
                    <span className="text-[0.9375rem] text-encre-2">{entree.unite}</span>
                  </p>
                  <p className="font-description text-sm leading-normal font-normal text-encre-2">
                    {entree.description}
                  </p>
                  <span aria-hidden className="h-px bg-trait" />
                  <ul className="flex flex-col gap-2">
                    {entree.inclus.map((inclusion) => (
                      <li key={inclusion} className="flex min-w-0 items-center gap-2.5">
                        <span
                          aria-hidden
                          className="grid size-4 shrink-0 place-items-center rounded-full bg-primaire"
                        >
                          <Check className="size-2.5 text-carte" />
                        </span>
                        <span className="font-description text-base leading-normal text-encre-3">
                          {inclusion}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="flex flex-wrap items-baseline gap-2 font-description text-sm">
                    <strong className="font-semibold text-encre">
                      {entree.libelleSupplement}
                    </strong>
                    <span className="text-encre-2">{entree.supplement}</span>
                  </p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-2.5">
                    <Bouton
                      destination={pourLesTalents ? 'candidature' : 'rendezVous'}
                      libelle={entree.cta}
                      className="min-h-11 px-3.5 text-sm"
                      aria-label={`${entree.cta} — ${entree.intitule}`}
                    />
                    {/* Le second appel de la carte des talents mène à la page
                        Talents, pas à une destination sortante. */}
                    {pourLesTalents ? (
                      <LienPastillePage vers={chemin(langue, 'talents')} libelle={entree.cta2} />
                    ) : (
                      <LienPastille
                        destination="rendezVous"
                        libelle={entree.cta2}
                        aria-label={`${entree.cta2} — ${entree.intitule}`}
                      />
                    )}
                  </div>
                  <p className="font-description flex gap-2 text-[0.8125rem] leading-normal text-encre-2">
                    <Info aria-hidden className="mt-0.5 size-3.5 shrink-0" />
                    <span>{entree.note}</span>
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
              {contenu.encart.titre}
            </h3>
            {/* La maquette plafonne ce paragraphe à 58ch ; en rem, la contrainte
                ne dépend pas de la taille de police de l'élément. */}
            <p className="max-w-[34rem] font-description text-sm leading-normal font-normal text-sur-vif">
              {contenu.encart.description}
            </p>
          </div>
          <Bouton
            destination="rendezVous"
            libelle={contenu.encart.cta}
            variante="inverse"
            className="min-h-11 shrink-0 px-5 text-sm"
            aria-label={`${contenu.encart.cta} — ${contenu.encart.titre}`}
          />
        </div>
      </Apparition>
    </Section>
  )
}
