import type { Contenu } from '@/content/types'
import { Bouton } from '@/components/shared/bouton'
import { HeroPage } from '@/components/shared/hero-page'

/**
 * WEB-3 — l'ouverture de la page Talents.
 *
 * Le `h1` de la page est ici, avec le seul appel de candidature que le cahier
 * prevoit. La geometrie de l'aplat vert vit dans `HeroPage`.
 */
export function TalentsHero({
  contenu,
  cta,
}: {
  contenu: Contenu['talents']['entete']
  /**
   * Le libelle vient de l'encart : l'en-tete n'en porte pas, et le cahier ne
   * prevoit qu'un seul libelle de candidature (WEB-3).
   */
  cta: Contenu['talents']['encart']['cta']
}) {
  return (
    <HeroPage intitule={contenu.intitule} titre={contenu.titre} description={contenu.description}>
      <div className="flex flex-wrap items-center gap-2.5">
        <Bouton
          destination="candidature"
          libelle={cta}
          variante="blanc"
          taille="haute"
          ornement="fleche"
        />
        <span className="etiquette text-[0.6875rem] text-white">{contenu.mention}</span>
      </div>
    </HeroPage>
  )
}
