import type { Contenu } from '@/content/types'
import { Defilement } from '@/components/shared/defilement'
import { Section } from '@/components/shared/section'

/** WEB-1 — les marchés desservis, dans la bande défilante de la maquette.
    Du texte et non des drapeaux : deux des sept ne sont pas des pays. */
export function Marches({ contenu }: { contenu: Contenu['marches'] }) {
  return (
    <Section titreId="titre-marches" className="!pt-[4.375rem] !pb-[4.875rem]">
      {/* Le crénage négatif du @layer base vise les titres d'affichage ; celui-ci
          est une phrase, il reprend l'espacement normal. */}
      <h2
        id="titre-marches"
        className="text-center font-description text-lg font-normal tracking-normal text-encre-3 [word-spacing:normal]"
      >
        {contenu.titre}
      </h2>
      <Defilement
        items={contenu.liste}
        className="mt-14"
        rendu={(marche) => (
          <span className="block px-12 font-description text-[1.3125rem] font-normal whitespace-nowrap text-encre-2">
            {marche}
          </span>
        )}
      />
    </Section>
  )
}
