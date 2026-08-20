import type { Contenu } from '@/content/types'
import { Apparition } from '@/components/shared/apparition'
import { delaiDeGrille } from '@/components/shared/decalage'
import { Section } from '@/components/shared/section'
import type { Fond } from '@/components/shared/section'

/**
 * WEB-12 — les messages commerciaux du retour client.
 *
 * Mise en page de la référence fournie par le client : un intitulé court à
 * gauche avec sa puce, l'affirmation en grand à droite, puis les repères sous
 * l'affirmation, alignés sur elle et séparés par des filets **verticaux
 * seulement**.
 *
 * Un filet à gauche de chaque cellule, y compris la première : c'est ce que fait
 * la référence, et c'est la seule règle qui ne change pas de sens quand la
 * grille passe de trois colonnes à deux puis à une. Pas de filet horizontal —
 * il refermerait la grille en tableau, ce que la référence évite.
 *
 * Le titre est le petit intitulé de gauche et non l'affirmation : c'est lui qui
 * nomme la section, `aria-labelledby` le vise, et un `h2` rendu petit reste un
 * `h2`. L'affirmation est un paragraphe, quelle que soit sa taille.
 *
 * Le bloc garde son arrondi haut alors que la référence a une bande à angles
 * droits : l'arrondi est la signature de toutes les sections du site, et le
 * retour porte sur l'agencement du contenu, pas sur la découpe des sections.
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
      <div className="grid gap-8 [&>*]:min-w-0 lg:grid-cols-[14rem_1fr] lg:gap-14">
        <Apparition>
          <h2
            id={titreId}
            className="flex items-start gap-3 font-description text-fluide-mention leading-[1.5] tracking-normal text-encre [word-spacing:normal]"
          >
            <span aria-hidden className="mt-[0.5em] size-2 shrink-0 rounded-full bg-encre" />
            {contenu.titre}
          </h2>
        </Apparition>

        <div className="flex min-w-0 flex-col gap-14">
          <Apparition>
            {/* Le crénage négatif du @layer base ne vise que h1 et h2 : ce
                paragraphe le reprend à la main pour tenir le registre
                d'affichage. */}
            <p className="font-titre font-normal text-[clamp(1.5rem,2.1vw,2.375rem)] leading-[1.22] tracking-[-0.04em] text-encre">
              {contenu.description}
            </p>
          </Apparition>

          <Apparition delai={delaiDeGrille(1)}>
            {/* Aucune gouttière horizontale : les cellules se touchent, et les
                filets sont donc régulièrement espacés. */}
            <ul className="grid gap-y-11 sm:grid-cols-2 lg:grid-cols-3">
              {contenu.liste.map((argument) => (
                <li
                  key={argument.reperage}
                  className="flex min-w-0 flex-col gap-3.5 border-l border-trait pr-6 pl-5"
                >
                  <p className="font-titre font-normal text-[clamp(1.625rem,1.9vw,2.125rem)] leading-[1.08] tracking-[-0.04em] text-encre">
                    {argument.reperage}
                  </p>
                  <p className="font-description text-fluide-bouton leading-[1.55] text-encre-2">
                    {argument.description}
                  </p>
                </li>
              ))}
            </ul>
          </Apparition>

          <Apparition delai={delaiDeGrille(2)}>
            <p className="font-description text-[0.875rem] text-encre-2">{contenu.mention}</p>
          </Apparition>
        </div>
      </div>
    </Section>
  )
}
