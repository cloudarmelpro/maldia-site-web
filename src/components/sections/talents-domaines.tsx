import type { Contenu } from '@/content/types'
import { Apparition } from '@/components/shared/apparition'
import { classes } from '@/components/shared/classes'
import { delaiDeGrille } from '@/components/shared/decalage'
import { EnTeteSection } from '@/components/shared/en-tete-section'
import { Pilule } from '@/components/shared/pilule'
import { GRILLE_INTITULE, Section } from '@/components/shared/section'

const TITRE_ID = 'titre-domaines'

/**
 * WEB-5 — les domaines recrutes, dans la frise du design.
 *
 * Les profils viennent de `commun.profils` et non du bloc `talents` : la page
 * Services rend la meme liste, et deux copies divergeraient a la premiere
 * correction. La carte n'affiche que `nom` et `outils`.
 *
 * Au-dela de 900 px la rangee devient une frise horizontale defilante, comme la
 * methode : `grid-flow-col` avec des colonnes de 216 px minimum.
 */
export function TalentsDomaines({
  contenu,
  profils,
}: {
  contenu: Contenu['talents']['domaines']
  profils: Contenu['commun']['profils']['liste']
}) {
  return (
    <Section titreId={TITRE_ID} fond="fond-2">
      <div className={GRILLE_INTITULE}>
        <Apparition>
          <Pilule intitule={contenu.intitule} registre="clair" />
        </Apparition>

        <div className="flex flex-col gap-[clamp(1.625rem,2.8vw,2.5rem)]">
          <Apparition>
            <EnTeteSection
              titreId={TITRE_ID}
              titre={contenu.titre}
              description={contenu.description}
            />
          </Apparition>

          <ul
            className={classes(
              'grid grid-cols-1 gap-3 duo:grid-cols-2',
              'frise:auto-cols-[minmax(13.5rem,1fr)] frise:grid-flow-col frise:grid-cols-none frise:overflow-x-auto frise:pb-1',
            )}
          >
            {profils.map((profil, indice) => (
              <li key={profil.nom} className="min-w-0">
                {/* La carte est l'element anime : `display: contents` sur un
                    conteneur intermediaire annulerait la transformation. */}
                <Apparition
                  delai={delaiDeGrille(indice)}
                  className="grid h-full min-w-0 grid-rows-[auto_1fr_auto] rounded-carte border border-trait bg-white p-[clamp(1.125rem,1.5vw,1.375rem)]"
                >
                  <span className="flex items-center justify-between gap-3">
                    <span aria-hidden className="size-1.5 shrink-0 rounded-pilule bg-primaire" />
                    {/* Un domaine n'est pas une etape : son rang ne dit rien a
                        qui ne voit pas la frise. */}
                    <span
                      aria-hidden
                      className="etiquette-fine text-[0.625rem] tracking-[0.09em] normal-case text-encre-3"
                    >
                      {String(indice + 1).padStart(2, '0')}
                    </span>
                  </span>
                  <strong className="mt-5 font-titre text-[1rem] leading-[1.2] tracking-[-0.035em] text-encre">
                    {profil.nom}
                  </strong>
                  <span className="mt-3 border-t border-trait pt-3 etiquette-fine text-[0.625rem] tracking-[0.07em] normal-case text-encre-2">
                    {profil.outils}
                  </span>
                </Apparition>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
