import type { Contenu } from '@/content/types'
import { TeteSection } from '@/components/shared/tete-section'
import { Apparition } from '@/components/shared/apparition'
import { classes } from '@/components/shared/classes'
import { delaiDeGrille } from '@/components/shared/decalage'
import { BAS, CONTENEUR } from '@/components/shared/section'

const TITRE_ID = 'titre-domaines'

/**
 * WEB-5 — les domaines recrutes.
 *
 * Les profils viennent de `commun.profils` et non du bloc `talents` : la page
 * Services rend la meme liste, et deux copies divergeraient a la premiere
 * correction. La carte n'affiche que `nom`, `resume` et `famille`.
 *
 * La section batit son `<section>` elle-meme : le design ne lui donne pas de
 * respiration haute — elle suit la bande precedente sans intervalle — et
 * `Section` en pose toujours une.
 */
export function TalentsDomaines({
  contenu,
  profils,
}: {
  contenu: Contenu['talents']['domaines']
  profils: Contenu['commun']['profils']['liste']
}) {
  return (
    <section aria-labelledby={TITRE_ID} className={classes('bg-fond', BAS)}>
      <div className={classes(CONTENEUR, 'flex flex-col gap-[clamp(1.5rem,3vw,2.5rem)]')}>
        <TeteSection
          intitule={contenu.intitule}
          titreId={TITRE_ID}
          titre={contenu.titre}
          description={contenu.description}
        />

        <ul className="grid grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] gap-1">
          {profils.map((profil, indice) => (
            <li key={profil.nom} className="min-w-0">
              {/* La carte est l'element anime : `display: contents` sur un
                  conteneur intermediaire annulerait la transformation. */}
              <Apparition
                delai={delaiDeGrille(indice)}
                className="flex h-full min-w-0 items-start justify-between gap-4 rounded-bloc bg-primaire/5 p-[clamp(1rem,1.4vw,1.25rem)]"
              >
                <span className="flex min-w-0 flex-col gap-1.75">
                  <strong className="font-titre text-[1rem] leading-[1.25] tracking-[-0.025em] text-encre">
                    {profil.nom}
                  </strong>
                  <span className="text-[0.8125rem] leading-[1.5] text-encre-2">
                    {profil.resume}
                  </span>
                </span>
                <span className="shrink-0 etiquette-fine text-[0.6875rem] tracking-[0.08em] text-encre-2">
                  {profil.famille}
                </span>
              </Apparition>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
