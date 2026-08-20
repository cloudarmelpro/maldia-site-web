
import { chemin } from '@/content/langues'
import type { Langue, Page } from '@/content/langues'
import type { Contenu } from '@/content/types'
import { Facebook, Instagram, Linkedin } from '@/components/shared/icones-reseaux'
import { BarreBas } from '@/components/layout/barre-bas'
import { Lien } from '@/components/shared/lien'

const FOCUS = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'

const RESEAUX = [Linkedin, Facebook, Instagram] as const

/**
 * Le pied du design : dans la meme bande sombre que le bloc d'appel, separe
 * seulement par un filet.
 *
 * Les reperes sociaux ne sont pas des liens. Le design leur donne `href="#rdv"`,
 * c'est-a-dire nulle part, et les comptes ne sont pas fournis : un lien qui ne
 * mene nulle part vaut moins qu'un repere visuel. Ils redeviendront des liens
 * quand les adresses arriveront.
 *
 * C'est ici que vit le choix de langue (WEB-8), et nulle part ailleurs : les
 * deux langues sont montrees cote a cote, la courante marquee `aria-current`.
 * Une seule des deux est un lien — l'autre menerait a la page qu'on regarde.
 */
export function Pied({
  langue,
  page,
  contenu,
  cheminAutreLangue,
  changerDeLangue,
}: {
  langue: Langue
  page: Page
  contenu: Contenu['commun']['pied']
  cheminAutreLangue: string
  changerDeLangue: string
}) {
  return (
    <footer className="mt-[clamp(3.5rem,6vw,6rem)]">
      <div className="flex flex-col gap-7 border-t border-white/16 pt-[clamp(1.75rem,2.8vw,2.5rem)] large:flex-row large:justify-between large:gap-[clamp(2rem,4vw,4.5rem)]">
        <div className="flex min-w-0 flex-col gap-3.5">
          <span className="inline-flex items-center gap-3">
            <span
              aria-hidden
              className="grid size-9.5 shrink-0 place-items-center rounded-marque bg-white text-lg font-normal text-encre"
            >
              M
            </span>
            <span className="text-[1.1875rem] font-normal tracking-[-0.045em] text-white">
              Agence Maldia
            </span>
          </span>
          <span className="max-w-[34ch] text-[0.84375rem] leading-[1.55] text-sur-sombre">
            {contenu.description}
          </span>
        </div>

        <nav aria-label={contenu.titrePages} className="flex min-w-0 flex-col gap-3">
          <span className="etiquette-fine text-[0.65625rem] tracking-[0.1em] text-sur-sombre-2">
            {contenu.titrePages}
          </span>
          <ul className="flex flex-wrap gap-x-5.5 gap-y-2.5">
            {contenu.navigation.map((lien) => (
              <li key={lien.page}>
                {/* min-w-11 : les libelles courts sont rendus plus etroits que
                    44 px — la hauteur seule ne tient pas la cible tactile. */}
                <Lien
                  href={chemin(langue, lien.page)}
                  aria-current={lien.page === page ? 'page' : undefined}
                  className={`inline-flex min-h-11 min-w-11 items-center etiquette tracking-[0.07em] text-white transition-[color] hover:text-lime ${FOCUS}`}
                >
                  {lien.libelle}
                </Lien>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex min-w-0 flex-col gap-3">
          <span className="etiquette-fine text-[0.65625rem] tracking-[0.1em] text-sur-sombre-2">
            {contenu.titreContact}
          </span>
          <a
            href={`mailto:${contenu.courriel}`}
            className={`inline-flex min-h-11 items-center etiquette tracking-[0.07em] text-white transition-[color] hover:text-lime ${FOCUS}`}
          >
            {contenu.courriel}
          </a>
          <span className="etiquette tracking-[0.07em] text-sur-sombre">{contenu.lieu}</span>
          {/* Reperes visuels, pas des liens : voir le commentaire du composant. */}
          <span aria-hidden className="mt-1.5 flex gap-2">
            {RESEAUX.map((Icone, indice) => (
              <span
                key={indice}
                className="grid size-9.5 place-items-center rounded-marque border border-white/22 text-white"
              >
                <Icone className="size-4" />
              </span>
            ))}
          </span>
        </div>
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
