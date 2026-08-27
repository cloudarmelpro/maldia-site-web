import type { Contenu } from '@/content/types'
import { Apparition } from '@/components/shared/apparition'
import { Pilule } from '@/components/shared/pilule'
import { classes } from '@/components/shared/classes'
import { delaiDeGrille } from '@/components/shared/decalage'
import { EnTeteSection } from '@/components/shared/en-tete-section'
import { BAS, CONTENEUR, HAUT } from '@/components/shared/section'

const TITRE_ID = 'titre-domaines'

/**
 * WEB-5 — les domaines recrutes, sur la bande verte qui donne son rythme a la
 * page.
 *
 * Les profils viennent de `commun.profils` et non du bloc `talents` : la page
 * Services rend la meme liste, et deux copies divergeraient a la premiere
 * correction. La carte n'affiche que `nom` et `outils`.
 *
 * La section batit son `<section>` elle-meme : `Section` ne propose pas d'aplat
 * vert, et recopier sa respiration la ferait diverger — d'ou HAUT, BAS et
 * CONTENEUR, importes plutot que reecrits.
 */
export function TalentsDomaines({
  contenu,
  profils,
}: {
  contenu: Contenu['talents']['domaines']
  profils: Contenu['commun']['profils']['liste']
}) {
  return (
    <section aria-labelledby={TITRE_ID} className={classes('bg-primaire text-white', HAUT, BAS)}>
      <div className={CONTENEUR}>
        <div className="flex flex-col gap-[clamp(1.5rem,3vw,2.5rem)]">
          <Apparition>
            {/* L'intitule est ecrit ici plutot que via `Pilule` : son registre
                sombre pose une puce blanche, la ou le design met le vert clair
                sur toutes ses bandes vertes. */}
            <Pilule intitule={contenu.intitule} registre="sombre" />
          </Apparition>

          <Apparition registre="texte">
            <EnTeteSection
              titreId={TITRE_ID}
              titre={contenu.titre}
              description={contenu.description}
              sombre
            />
          </Apparition>
        </div>

        <ul className="mt-[clamp(2.125rem,3.6vw,3.5rem)] grid grid-cols-[repeat(auto-fit,minmax(15.625rem,1fr))] gap-1.5">
          {profils.map((profil, indice) => (
            <li key={profil.nom} className="min-w-0">
              {/* La carte est l'element anime : `display: contents` sur un
                  conteneur intermediaire annulerait la transformation. */}
              <Apparition
                delai={delaiDeGrille(indice)}
                className="flex h-full min-h-[clamp(9.25rem,12vw,10.75rem)] min-w-0 flex-col rounded-carte bg-voile/26 p-[clamp(1rem,1.4vw,1.25rem)]"
              >
                <span className="flex items-center justify-between gap-3">
                  <span aria-hidden className="size-1.5 shrink-0 rounded-pilule bg-vert-clair" />
                  {/* Un domaine n'est pas une etape : son rang ne dit rien a qui
                      ne voit pas la rangee. */}
                  <span
                    aria-hidden
                    className="etiquette-fine text-[0.625rem] tracking-[0.09em] normal-case text-white/92"
                  >
                    {String(indice + 1).padStart(2, '0')}
                  </span>
                </span>
                <strong className="mt-auto font-titre text-[clamp(1.0625rem,1.35vw,1.25rem)] leading-[1.2] tracking-[-0.03em] text-white">
                  {profil.nom}
                </strong>
                <span className="mt-2.25 etiquette-fine text-[0.625rem] tracking-[0.07em] normal-case text-white/92">
                  {profil.outils}
                </span>
              </Apparition>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
