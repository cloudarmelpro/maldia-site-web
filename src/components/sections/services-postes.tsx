import type { Contenu } from '@/content/types'
import { Apparition } from '@/components/shared/apparition'
import { classes } from '@/components/shared/classes'
import { EnTeteSection } from '@/components/shared/en-tete-section'
import { BAS, CONTENEUR } from '@/components/shared/section'
import { IntituleSection } from '@/components/shared/intitule-section'
import { SelecteurProfils } from '@/components/shared/selecteur-profils'

const TITRE_ID = 'titre-postes'

/**
 * WEB-4 et WEB-5 — les postes que les clients confient.
 *
 * Les postes viennent de `commun.profils`, la meme source que le selecteur de
 * l'accueil : c'est le meme catalogue vu autrement, et deux listes divergeraient
 * a la premiere correction.
 *
 * La section batit son `<section>` elle-meme : elle prolonge l'aplat blanc de
 * la bande precedente et ne porte donc que son padding bas, la ou `Section`
 * pose toujours les deux.
 *
 * La selection est un etat, donc un composant client — pose au niveau du
 * selecteur seul, l'en-tete restant rendu au serveur.
 */
export function ServicesPostes({
  contenu,
  profils,
}: {
  contenu: Contenu['services']['postes']
  profils: Contenu['commun']['profils']
}) {
  return (
    <section aria-labelledby={TITRE_ID} className={classes('bg-fond', BAS)}>
      <div className={classes(CONTENEUR, 'flex flex-col gap-[clamp(1.5rem,3vw,2.5rem)]')}>
        <Apparition className="w-fit self-start">
          <IntituleSection intitule={contenu.intitule} />
        </Apparition>

        <EnTeteSection
          titreId={TITRE_ID}
          titre={contenu.titre}
          description={contenu.description}
        />

        <Apparition>
          <SelecteurProfils contenu={profils} registre="services" />
        </Apparition>
      </div>
    </section>
  )
}
