import { avecNombre } from '@/content/chiffres'
import type { Langue } from '@/content/langues'
import type { Contenu } from '@/content/types'
import { Apparition } from '@/components/shared/apparition'
import { classes } from '@/components/shared/classes'
import { delaiDeGrille } from '@/components/shared/decalage'
import { EnTeteSection } from '@/components/shared/en-tete-section'
import { Pilule } from '@/components/shared/pilule'
import { BAS, CONTENEUR, HAUT } from '@/components/shared/section'

/**
 * WEB-6 — les deux cotes du service : Madagascar, puis les marches.
 *
 * La section batit son `<section>` elle-meme : `Section` ne propose pas d'aplat
 * vert, et recopier sa respiration la ferait diverger — d'ou HAUT, BAS et
 * CONTENEUR, importes plutot que reecrits.
 *
 * Le nombre de candidats vient du jeton `{nombre}` que porte le contenu, jamais
 * de la phrase elle-meme — voir `chiffres.ts` (WEB-13).
 *
 * Sur le vert, le voile de la carte est SOMBRE : un voile blanc eclaircirait
 * l'aplat et ferait passer le texte blanc sous le seuil AA. C'est aussi
 * pourquoi la valeur est blanche et non vert clair, que le design pose sur les
 * bandes encre.
 */
export function AProposFonctionnement({
  contenu,
  langue,
}: {
  contenu: Contenu['aPropos']['fonctionnement']
  langue: Langue
}) {
  return (
    <section
      aria-labelledby="titre-fonctionnement"
      className={classes('bg-primaire text-white', HAUT, BAS)}
    >
      <div className={CONTENEUR}>
        <div className="flex flex-col gap-[clamp(1.5rem,3vw,2.5rem)]">
          <Apparition>
            <Pilule intitule={contenu.intitule} registre="sombre" />
          </Apparition>

          <Apparition registre="texte">
            <EnTeteSection
              titreId="titre-fonctionnement"
              titre={contenu.titre}
              description={contenu.description}
              sombre
            />
          </Apparition>
        </div>

        <ul className="mt-[clamp(2.125rem,3.6vw,3.5rem)] grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-[clamp(0.875rem,1.4vw,1.25rem)]">
          {contenu.cotes.map((cote, indice) => (
            <li key={cote.titre} className="min-w-0">
              <Apparition
                delai={delaiDeGrille(indice)}
                className="flex h-full min-w-0 flex-col rounded-panneau bg-voile/18 p-[clamp(1.75rem,3vw,2.75rem)]"
              >
                <span className="etiquette text-[0.71875rem] tracking-[0.12em] text-white/92">
                  {cote.lieu}
                </span>

                <strong className="mt-5.5 font-titre text-[clamp(1.125rem,1.7vw,1.4375rem)] leading-[1.12] tracking-[-0.02em] text-white">
                  {cote.titre}
                </strong>

                <span className="mt-4 mb-[2.125rem] max-w-[46ch] text-base leading-[1.6] text-white/92">
                  {avecNombre(cote.texte, langue)}
                </span>

                <span className="mt-auto flex flex-wrap items-baseline gap-3.5 border-t border-white/18 pt-6.5">
                  <strong className="font-titre text-[2.25rem] font-extralight leading-none tracking-[-0.03em] text-white">
                    {avecNombre(cote.valeur, langue)}
                  </strong>
                  <span className="text-[0.90625rem] text-white/92">{cote.legende}</span>
                </span>
              </Apparition>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
