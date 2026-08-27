import { NOMS_LANGUES } from '@/content/langues'
import type { Langue } from '@/content/langues'
import { FOCUS_CLAIR } from '@/components/shared/focus'
import { autreLangue } from '@/components/shared/autre-langue'
import { classes } from '@/components/shared/classes'
import { SelecteurLangue } from '@/components/shared/selecteur-langue'

const MENTION = 'etiquette tracking-[0.07em]'

/**
 * La derniere ligne de la bande verte : le choix de langue et la mention de
 * droits.
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
    <div className="mt-[clamp(1.75rem,2.8vw,2.5rem)] flex flex-wrap items-center justify-between gap-3.5 border-t border-white/16 pt-5.5">
      <div role="group" aria-label={changerDeLangue} className="flex items-center gap-2.5">
        <span
          aria-current="true"
          className={classes('inline-flex min-h-11 items-center text-white', MENTION)}
        >
          {NOMS_LANGUES[langue]}
        </span>
        <span aria-hidden className="block h-3 w-px bg-white/30" />
        <SelecteurLangue
          langue={autre}
          vers={cheminAutreLangue}
          libelle={NOMS_LANGUES[autre]}
          className={classes(
            'inline-flex min-h-11 min-w-11 items-center text-white/92 transition-[color] hover:text-white',
            MENTION,
            FOCUS_CLAIR,
          )}
        />
      </div>
      <span className={classes('text-white/92', MENTION)}>{copyright}</span>
    </div>
  )
}
