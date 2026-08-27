import type { Contenu } from '@/content/types'
import { Apparition } from '@/components/shared/apparition'
import { Bouton } from '@/components/shared/bouton'
import { classes } from '@/components/shared/classes'
import { BAS, CONTENEUR } from '@/components/shared/section'

/**
 * WEB-7 — l'appel qui ferme la page : l'encart vert, avant le bloc Contact.
 *
 * Sans titre, il n'a pas de nom accessible et n'est donc pas annonce comme
 * repere — c'est bien ce qu'on veut d'un encart. Il reste malgre tout un
 * `section` : la sonde de fond de l'en-tete ne reconnait que ce motif, et sans
 * lui elle garderait l'encre de la bande precedente.
 *
 * `encart.titre` n'est pas rendu : le design le remplace par l'intitule.
 */
export function ServicesChiffrage({
  contenu,
}: {
  contenu: Contenu['services']['postes']['encart']
}) {
  return (
    <section className={classes('bg-fond', BAS)}>
      <div className={CONTENEUR}>
        <Apparition>
          <div className="flex flex-wrap items-center justify-between gap-[clamp(1.25rem,3vw,2.5rem)] rounded-encart bg-primaire p-[clamp(1.625rem,3vw,2.5rem)]">
            <div className="flex min-w-0 grow basis-[20rem] flex-col gap-3">
              <span className="etiquette text-[0.6875rem] tracking-[0.1em] text-white/92">
                {contenu.intitule}
              </span>
              <p className="max-w-[34ch] font-titre text-[clamp(1.1875rem,1.7vw,1.625rem)] font-normal leading-[1.25] tracking-[-0.03em] text-white">
                {contenu.texte}
              </p>
            </div>
            <Bouton
              destination="rendezVous"
              libelle={contenu.cta}
              variante="blanc"
              ornement="fleche"
              className="shrink-0"
            />
          </div>
        </Apparition>
      </div>
    </section>
  )
}
