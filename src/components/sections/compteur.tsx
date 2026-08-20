import { nombreFormate, NOMBRE_CANDIDATS } from '@/content/chiffres'
import type { Langue } from '@/content/langues'
import type { Contenu } from '@/content/types'
import { Apparition } from '@/components/shared/apparition'
import { Section } from '@/components/shared/section'
import type { Fond } from '@/components/shared/section'

/**
 * WEB-13 — le compteur de candidats.
 *
 * Le nombre n'est pas synchronisé avec l'application CV : il vient de
 * `chiffres.ts`, le seul endroit à modifier. Il est formaté par Intl et non
 * recopié — le séparateur de milliers n'est pas le même dans les deux langues.
 *
 * La phrase entière est le titre de la section : découpée en trois morceaux
 * pour la mise en forme, elle reste une seule phrase pour un lecteur d'écran.
 */
export function Compteur({
  contenu,
  langue,
  titreId,
  dessous = 'fond-2',
}: {
  contenu: Contenu['commun']['compteur']
  langue: Langue
  /** Deux pages portent cette section : l'id doit rester unique par page. */
  titreId: string
  /** Fond de la section qui précède — visible dans l'arrondi haut du bloc. */
  dessous?: Fond
}) {
  return (
    <Section titreId={titreId} fond="tendre" bloc dessous={dessous}>
      <Apparition>
        <div className="flex flex-col items-center gap-4 text-center">
          <h2
            id={titreId}
            className="flex flex-col items-center gap-1 font-titre font-normal text-encre"
          >
            <span className="font-description text-[1.0625rem] font-normal tracking-normal text-encre-3 [word-spacing:normal]">
              {contenu.prefixe}
            </span>
            <span className="text-[4rem] leading-[0.95] tracking-[-0.05em] text-primaire sm:text-[5.5rem] lg:text-[6.5rem]">
              {nombreFormate(NOMBRE_CANDIDATS, langue)}
            </span>
            <span className="max-w-[22ch] text-[1.625rem] leading-[1.15] text-balance sm:text-[2rem]">
              {contenu.libelle}
            </span>
          </h2>
          <p className="font-description text-[0.9375rem] text-encre-3">{contenu.precision}</p>
        </div>
      </Apparition>
    </Section>
  )
}
