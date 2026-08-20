import type { Contenu } from '@/content/types'
import { Apparition } from '@/components/shared/apparition'
import { delaiDeGrille } from '@/components/shared/decalage'
import { EnTeteSection } from '@/components/shared/en-tete-section'
import { Section } from '@/components/shared/section'
import type { Fond } from '@/components/shared/section'

/**
 * WEB-12 — les messages commerciaux du retour client.
 *
 * Le chiffre est posé avant le titre parce que c'est lui qu'on lit d'abord dans
 * une grille ; la phrase du client suit, au mot près. Deux des six arguments
 * n'ont pas de chiffre : la place reste vide plutôt que d'inventer un repère.
 *
 * La mention sous la grille dit que le délai est une moyenne. Le retour client
 * l'exige, et l'omettre transformerait un ordre de grandeur en promesse.
 */
export function Argumentaire({
  contenu,
  titreId,
  dessous = 'fond',
}: {
  contenu: Contenu['commun']['argumentaire']
  /** Deux pages portent cette section : l'id doit rester unique par page. */
  titreId: string
  /** Fond de la section qui précède — visible dans l'arrondi haut du bloc. */
  dessous?: Fond
}) {
  return (
    <Section titreId={titreId} fond="fond-2" bloc dessous={dessous}>
      <Apparition>
        <EnTeteSection
          titreId={titreId}
          titre={contenu.titre}
          description={contenu.description}
          fond="fond-2"
        />
      </Apparition>

      <ul className="mt-14 grid gap-[1.375rem] [grid-template-columns:repeat(auto-fit,minmax(min(100%,17rem),1fr))]">
        {contenu.liste.map((argument, indice) => (
          <li key={argument.titre} className="min-w-0">
            <Apparition delai={delaiDeGrille(indice)} className="h-full">
              <div className="flex h-full min-w-0 flex-col gap-3 rounded-avis bg-carte px-7 pt-7 pb-8">
                {argument.chiffre ? (
                  <p className="font-titre text-[2rem] leading-none font-normal tracking-[-0.04em] text-primaire">
                    {argument.chiffre}
                  </p>
                ) : null}
                <h3 className="font-description text-[1.0625rem] font-semibold text-encre">
                  {argument.titre}
                </h3>
                <p className="font-description text-[0.97rem] leading-[1.6] text-encre-2">
                  {argument.description}
                </p>
              </div>
            </Apparition>
          </li>
        ))}
      </ul>

      <Apparition delai={delaiDeGrille(6)}>
        <p className="mt-9 text-center font-description text-[0.9375rem] text-encre-2">
          {contenu.mention}
        </p>
      </Apparition>
    </Section>
  )
}
