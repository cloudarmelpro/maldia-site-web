import type { Contenu } from '@/content/types'
import { Defilement } from '@/components/shared/defilement'
import { Section } from '@/components/shared/section'

/** WEB-1 — les marchés desservis, dans la bande défilante de la maquette.
    Du texte et non des drapeaux : deux des sept ne sont pas des pays. */
export function Marches({
  contenu,
  titreId,
}: {
  contenu: Contenu['commun']['marches']
  /** Plusieurs pages portent cette section : l'id doit rester unique par page. */
  titreId: string
}) {
  return (
    <Section titreId={titreId} className="!pt-[4.375rem] !pb-[4.875rem]">
      {/* Le crénage négatif du @layer base vise les titres d'affichage ; celui-ci
          est une phrase, il reprend l'espacement normal. */}
      <h2
        id={titreId}
        className="text-center font-description text-fluide-corps font-normal tracking-normal text-encre-2 [word-spacing:normal]"
      >
        {contenu.titre}
      </h2>
      <Defilement
        items={contenu.liste}
        className="mt-14"
        rendu={(marche) => (
          <span className="block px-[clamp(1.75rem,1.5833rem+0.3472vw,2rem)] font-description text-fluide-bande font-normal whitespace-nowrap text-encre-2">
            {marche}
          </span>
        )}
      />
    </Section>
  )
}
