
import { chemin } from '@/content/langues'
import type { Langue, Page } from '@/content/langues'
import type { Contenu } from '@/content/types'
import { MenuMobile } from '@/components/layout/menu-mobile'
import { autreLangue } from '@/components/shared/autre-langue'
import { Bouton } from '@/components/shared/bouton'
import { SelecteurLangue } from '@/components/shared/selecteur-langue'
import { Lien } from '@/components/shared/lien'

const FOCUS = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'

/**
 * L'en-tete du design : pose sur la photo du hero, sans aplat.
 *
 * Il n'est pas colle — il defile avec la page, comme dans le design. La
 * navigation flotte donc sur une pilule de verre pour rester lisible sur
 * n'importe quelle zone de la photo.
 *
 * La page courante porte `aria-current="page"` et une puce : sans elle, rien ne
 * dit ou l'on se trouve a qui n'accede pas a la couleur.
 */
export function EnTete({
  langue,
  page,
  contenu,
  cheminAutreLangue,
}: {
  langue: Langue
  page: Page
  contenu: Contenu['commun']['enTete']
  cheminAutreLangue: string
}) {
  const autre = autreLangue(langue)

  const marque = (
    <Lien
      href={chemin(langue)}
      className={`inline-flex min-h-11 min-w-0 items-center gap-3 ${FOCUS}`}
    >
      <span
        aria-hidden
        className="grid size-10.5 shrink-0 place-items-center rounded-bloc bg-white text-xl font-semibold text-encre"
      >
        {contenu.initiale}
      </span>
      <span className="text-[1.3125rem] font-semibold tracking-[-0.045em] text-white">
        {contenu.marque}
      </span>
    </Lien>
  )

  return (
    // z-60 et non le z-3 du design : `position` + `z-index` creent un contexte
    // d'empilement, et le panneau mobile en `fixed z-90` est un descendant. Son
    // z-index ne compte donc que dans ce contexte — a z-3, la barre de pied du
    // hero, au meme niveau mais plus loin dans le DOM, se peignait par-dessus
    // et interceptait les clics du panneau.
    <header className="relative z-60 mx-auto flex w-full max-w-[87.5rem] items-center justify-between gap-6 px-[clamp(1.25rem,4vw,3.5rem)] pt-6.5">
      {marque}

      <div className="flex items-center gap-2.5">
        <nav
          aria-label={contenu.marque}
          className="hidden items-center gap-1 rounded-bloc bg-[rgb(12_24_19/0.58)] px-2.5 py-1.75 backdrop-blur-[10px] large:flex"
        >
          {contenu.navigation.map((lien) => {
            const courante = lien.page === page
            return (
              <Lien
                key={lien.page}
                href={chemin(langue, lien.page)}
                aria-current={courante ? 'page' : undefined}
                className={`inline-flex min-h-8 items-center gap-1.75 rounded-liste px-3.25 etiquette transition-[color] ${FOCUS} ${
                  courante ? 'text-white' : 'text-white/72 hover:text-white'
                }`}
              >
                {courante ? (
                  <span aria-hidden className="size-1.25 shrink-0 rounded-pilule bg-signal" />
                ) : null}
                {lien.libelle}
              </Lien>
            )
          })}
        </nav>

        <div className="hidden large:flex">
          <Bouton
            destination="rendezVous"
            libelle={contenu.cta}
            variante="encre"
            taille="compacte"
            ornement="etoile"
            className="min-h-11"
          />
        </div>

        <MenuMobile
          ouvrir={contenu.menu}
          fermer={contenu.fermerMenu}
          marque={marque}
          className="large:hidden"
        >
          <nav aria-label={contenu.marque} className="mt-11">
            <ul className="flex flex-col gap-1.5">
              {contenu.navigation.map((lien) => {
                const courante = lien.page === page
                return (
                  <li key={lien.page}>
                    <Lien
                      href={chemin(langue, lien.page)}
                      aria-current={courante ? 'page' : undefined}
                      className={`flex min-h-13 items-center text-[clamp(1.875rem,8vw,2.5rem)] leading-[1.15] tracking-[-0.04em] ${FOCUS} ${
                        courante ? 'text-lime' : 'text-white'
                      }`}
                    >
                      {lien.libelle}
                    </Lien>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="mt-auto flex flex-col gap-3 border-t border-white/16 pt-6.5">
            <Bouton
              destination="rendezVous"
              libelle={contenu.cta}
              variante="blanc"
              className="min-h-12 w-full"
            />
            <div
              role="group"
              aria-label={contenu.changerDeLangue}
              className="flex items-center justify-center gap-2.5 pt-1"
            >
              <span aria-current="true" className="etiquette text-white">
                {langue}
              </span>
              <span aria-hidden className="block h-3 w-px bg-white/30" />
              <SelecteurLangue
                langue={autre}
                vers={cheminAutreLangue}
                libelle={autre}
                className={`inline-flex min-h-11 min-w-11 items-center justify-center etiquette text-sur-sombre hover:text-white ${FOCUS}`}
              />
            </div>
          </div>
        </MenuMobile>
      </div>
    </header>
  )
}
