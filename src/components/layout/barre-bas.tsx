import { NOMS_LANGUES } from '@/content/langues'
import type { Langue } from '@/content/langues'
import { autreLangue } from '@/components/shared/autre-langue'
import { classes } from '@/components/shared/classes'
import { SelecteurLangue } from '@/components/shared/selecteur-langue'

const FOCUS = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'

/**
 * La derniere ligne des bandes sombres : le choix de langue et la mention de
 * droits.
 *
 * Extraite parce que deux clotures la portent — celle du site et celle,
 * reduite, du blog. Ecrite deux fois, elle finirait par ne plus dire la meme
 * chose d'une page a l'autre.
 *
 * C'est ici que vit le choix de langue (WEB-8), et nulle part ailleurs : les
 * deux langues sont montrees cote a cote, la courante marquee `aria-current`.
 * Une seule des deux est un lien — l'autre menerait a la page qu'on regarde.
 */
export function BarreBas({
  langue,
  cheminAutreLangue,
  changerDeLangue,
  copyright,
}: {
  langue: Langue
  cheminAutreLangue: string
  changerDeLangue: string
  copyright: string
}) {
  const autre = autreLangue(langue)

  return (
    <div className="mt-[clamp(1.75rem,2.8vw,2.5rem)] flex flex-col gap-3.5 border-t border-white/16 pt-5.5 large:flex-row large:items-center large:justify-between large:gap-6">
      <div role="group" aria-label={changerDeLangue} className="flex items-center gap-2.5">
        <span aria-current="true" className="inline-flex min-h-11 items-center etiquette text-white">
          {NOMS_LANGUES[langue]}
        </span>
        <span aria-hidden className="block h-3 w-px bg-white/30" />
        <SelecteurLangue
          langue={autre}
          vers={cheminAutreLangue}
          libelle={NOMS_LANGUES[autre]}
          className={classes(
            'inline-flex min-h-11 min-w-11 items-center etiquette text-sur-sombre transition-[color] hover:text-white',
            FOCUS,
          )}
        />
      </div>
      <span className="etiquette text-sur-sombre">{copyright}</span>
    </div>
  )
}
