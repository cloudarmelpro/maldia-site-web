import type { Langue } from '@/content/langues'
import type { Contenu } from '@/content/types'
import { FOCUS_CLAIR } from '@/components/shared/focus'
import { Facebook, Instagram, Linkedin } from '@/components/shared/icones-reseaux'
import { BarreBas } from '@/components/layout/barre-bas'
import { classes } from '@/components/shared/classes'
import { Logo } from '@/components/shared/logo'

const RESEAUX = [Linkedin, Facebook, Instagram] as const

// Le flex-basis devient negatif au-dela de la largeur ecrite dans le calcul, et
// les colonnes passent alors l'une sous l'autre : c'est la seule rupture du
// pied, et elle ne s'ecrit pas en `@media`.
const COLONNE = 'flex min-w-0 shrink grow basis-[calc((43.75rem_-_100%)*999)] flex-col'

const LIGNE = 'text-[0.84375rem] leading-[1.55]'

/**
 * Le pied du design : dans le meme aplat vert que le bloc d'appel, separe
 * seulement par un filet.
 *
 * Les reperes sociaux ne sont pas des liens. Le design leur donne `href="#rdv"`,
 * c'est-a-dire nulle part, et les comptes ne sont pas fournis : un lien qui ne
 * mene nulle part vaut moins qu'un repere visuel. Ils redeviendront des liens
 * quand les adresses arriveront.
 */
export function Pied({
  langue,
  contenu,
  cheminAutreLangue,
  changerDeLangue,
}: {
  langue: Langue
  contenu: Contenu['commun']['pied']
  cheminAutreLangue: string
  changerDeLangue: string
}) {
  return (
    <footer className="mt-[clamp(3.5rem,6vw,6rem)]">
      <div className="flex flex-wrap justify-between gap-[clamp(1.75rem,4vw,4.5rem)] border-t border-white/16 pt-[clamp(1.75rem,2.8vw,2.5rem)]">
        <div className={classes(COLONNE, 'gap-3.5')}>
          <span className="flex items-center text-white">
            <Logo hauteur={32} className="block w-auto" />
          </span>
          <span className={classes('max-w-[34ch] text-white/92', LIGNE)}>
            {contenu.description}
          </span>
        </div>

        <div className={classes(COLONNE, 'gap-1.5')}>
          <span className="mb-1.5 etiquette-fine tracking-[0.1em] text-white/90">
            {contenu.titreContact}
          </span>
          {/* Le padding porte la cible tactile, la marge negative la reprend :
              l'ecart des trois lignes reste celui du design. */}
          <a
            href={`mailto:${contenu.courriel}`}
            className={classes(
              '-my-3 inline-flex w-fit py-3 text-white hover:underline hover:underline-offset-4',
              LIGNE,
              FOCUS_CLAIR,
            )}
          >
            {contenu.courriel}
          </a>
          <span className={classes('-mt-1 text-white/92', LIGNE)}>{contenu.lieu}</span>
        </div>

        {/* Reperes visuels, pas des liens : voir le commentaire du composant. */}
        <span aria-hidden className="ml-auto flex gap-2 self-start">
          {RESEAUX.map((Icone, indice) => (
            <span
              key={indice}
              className="grid size-9.5 place-items-center rounded-marque bg-voile/24 text-white"
            >
              <Icone className="size-4" />
            </span>
          ))}
        </span>
      </div>

      <BarreBas
        langue={langue}
        cheminAutreLangue={cheminAutreLangue}
        changerDeLangue={changerDeLangue}
        copyright={contenu.copyright}
      />
    </footer>
  )
}
