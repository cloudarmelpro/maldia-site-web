import { avecNombre } from '@/content/chiffres'
import type { Langue } from '@/content/langues'
import type { Contenu } from '@/content/types'
import { TeteSection } from '@/components/shared/tete-section'
import { Apparition } from '@/components/shared/apparition'
import { classes } from '@/components/shared/classes'
import { delaiDeGrille } from '@/components/shared/decalage'
import { EnTeteSection } from '@/components/shared/en-tete-section'
import { BAS, CONTENEUR, HAUT } from '@/components/shared/section'

/**
 * WEB-6 — les deux cotes du service : Madagascar, puis les marches.
 *
 * La section batit son `<section>` elle-meme : `Section` ne propose pas d'aplat
 * vert ni d'arrondi, et recopier sa respiration la ferait diverger — d'ou HAUT,
 * BAS et CONTENEUR, importes plutot que reecrits.
 *
 * Le nombre de candidats vient du jeton `{nombre}` que porte le contenu, jamais
 * de la phrase elle-meme — voir `chiffres.ts` (WEB-13).
 *
 * Sur le vert, le voile de la carte est SOMBRE : un voile blanc eclaircirait
 * l'aplat et ferait passer le texte blanc sous le seuil AA. C'est aussi
 * pourquoi la valeur est blanche et non vert clair — celui-ci ne tient pas le
 * contraste sur le vert, et le design n'a plus de fond sombre pour l'accueillir.
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
      className={classes('rounded-coiffe bg-primaire', HAUT, BAS)}
    >
      <div className={classes(CONTENEUR, 'flex flex-col gap-[clamp(1.5rem,3vw,2.5rem)]')}>
        <TeteSection intitule={contenu.intitule} registre="vert" />

        {/* La marge haute negative resserre le titre sous son intitule, sans
            toucher a l'ecart que la colonne pose partout ailleurs. */}
        <div className="-mt-4.5">
          <EnTeteSection
            titreId="titre-fonctionnement"
            titre={contenu.titre}
            description={contenu.description}
            sombre
          />
        </div>

        <ul className="grid grid-cols-[repeat(auto-fit,minmax(18.75rem,1fr))] gap-1.5">
          {contenu.cotes.map((cote, indice) => (
            <li key={cote.titre} className="min-w-0">
              <Apparition
                delai={delaiDeGrille(indice)}
                className="flex h-full min-w-0 flex-col gap-4.5 rounded-carte-large bg-voile/22 p-[clamp(1.375rem,2.2vw,2rem)]"
              >
                <span className="etiquette text-[0.6875rem] tracking-[0.09em] text-white">
                  {cote.lieu}
                </span>

                <strong className="font-titre text-[clamp(1.1875rem,1.7vw,1.5625rem)] leading-[1.15] tracking-[-0.04em] text-white">
                  {cote.titre}
                </strong>

                <span className="max-w-[44ch] text-[0.875rem] leading-[1.6] text-white">
                  {avecNombre(cote.texte, langue)}
                </span>

                <span className="mt-auto flex flex-wrap items-baseline gap-3.5 pt-5.5">
                  <strong className="font-titre text-[clamp(1.875rem,2.6vw,2.5rem)] leading-none tracking-[-0.05em] text-white">
                    {avecNombre(cote.valeur, langue)}
                  </strong>
                  <span className="etiquette text-[0.6875rem] tracking-[0.09em] text-white">
                    {cote.legende}
                  </span>
                </span>
              </Apparition>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
