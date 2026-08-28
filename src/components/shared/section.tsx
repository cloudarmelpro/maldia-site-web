import type { ReactNode } from 'react'

import { classes } from '@/components/shared/classes'

/**
 * La respiration verticale du design. Exportees parce qu'une section qui fait
 * deborder un bloc hors de la gouttiere, ou qui pose un aplat que `Section` ne
 * connait pas, doit batir son `<section>` elle-meme : recopier ces valeurs les
 * ferait diverger.
 */
export const HAUT = 'pt-[clamp(4rem,7vw,7rem)]'
export const BAS = 'pb-[clamp(4rem,7vw,7rem)]'

/** Le padding bas plus court, la ou le design pose une section asymetrique. */
export const BAS_COURT = 'pb-[clamp(3.5rem,6vw,6rem)]'

/**
 * Le fond etait une prop a plusieurs valeurs, mais tous les appelants passaient
 * `fond`, qui etait deja la valeur par defaut ; `fond-2`, `encre` et `nuit`
 * n'avaient aucun appelant depuis que la decision 0023 a supprime toutes les
 * sections sombres. Le jeton `--color-nuit` n'existait plus que pour cette
 * entree, et disparait avec elle.
 */
const FOND = 'bg-fond'

/**
 * La gouttiere de page du design : 1080 px de large, marges de 20 a 56 px.
 *
 * La gouttiere est POSEE DANS la boite, pas autour : `max-width` et `padding`
 * sur le meme element. Poser la gouttiere sur la section puis plafonner
 * l'interieur a 1080 px decalerait la colonne au-dela de 1512 px de fenetre.
 *
 * Un seul endroit : une largeur qui diverge d'un bloc a l'autre ne se voit
 * qu'a l'usage. L'en-tete, les sections et le pied partagent celui-ci.
 */
export const CONTENEUR = 'mx-auto w-full max-w-[67.5rem] px-[clamp(1.25rem,4vw,3.5rem)]'

/**
 * Une section du design : un aplat pleine largeur.
 *
 * L'intitule se pose AU-DESSUS du contenu, dans la colonne de la section. La
 * colonne d'intitule de 190 px qui le tenait a gauche a disparu avec la refonte,
 * et son decalage avec elle.
 */
export function Section({
  titreId,
  bas,
  className,
  children,
}: {
  /** Doit etre l'id du titre rendu dans children : c'est lui que aria-labelledby vise. */
  titreId: string
  /**
   * Classe de padding bas, quand le design en pose une autre que le haut. Deux
   * de ses sections sont asymetriques ; les autres non.
   */
  bas?: string
  className?: string
  children: ReactNode
}) {
  return (
    <section aria-labelledby={titreId} className={classes(FOND, HAUT, bas ?? BAS, className)}>
      <div className={CONTENEUR}>{children}</div>
    </section>
  )
}
