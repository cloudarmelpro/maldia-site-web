import type { Contenu } from '@/content/types'
import { Apparition } from '@/components/shared/apparition'
import { CartesArguments } from '@/components/shared/cartes-arguments'
import { classes } from '@/components/shared/classes'
import { Pilule } from '@/components/shared/pilule'
import { BAS, CONTENEUR, HAUT } from '@/components/shared/section'

/**
 * WEB-12 — l'argumentaire chiffre de la page Services, en rangees sur filets.
 *
 * Les chiffres viennent de `commun.pourquoi.liste`, la source que l'accueil et
 * A propos lisent aussi : deux listes divergeraient a la premiere correction.
 *
 * Ce n'est pas une `Section` : le design ne donne a cette bande qu'un intitule,
 * sans titre, et `Section` demande l'id d'un titre pour son `aria-labelledby`.
 * Sans nom accessible, le `section` n'est pas annonce comme repere — c'est bien
 * ce qu'on veut d'une bande qui prolonge le hero.
 */
export function ServicesChiffres({
  intitule,
  liste,
}: {
  intitule: string
  liste: Contenu['commun']['pourquoi']['liste']
}) {
  return (
    <section className={classes('bg-fond', HAUT, BAS)}>
      <div className={CONTENEUR}>
        <Apparition>
          <Pilule intitule={intitule} registre="clair" />
        </Apparition>

        <div className="mt-10">
          <CartesArguments liste={liste} registre="filets" />
        </div>
      </div>
    </section>
  )
}
