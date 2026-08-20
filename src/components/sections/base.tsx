import { nombreFormate, NOMBRE_CANDIDATS } from '@/content/chiffres'
import type { Langue } from '@/content/langues'
import { OUTILS } from '@/content/outils'
import type { Contenu } from '@/content/types'
import { Apparition } from '@/components/shared/apparition'
import { Defilement, MASQUE_BANDE } from '@/components/shared/defilement'
import type { Allure } from '@/components/shared/defilement'
import { Pilule } from '@/components/shared/pilule'
import { GRILLE_INTITULE, Section } from '@/components/shared/section'

// Une allure par rangee, sens alterne au milieu : ce sont les valeurs du design.
const ALLURES: readonly Allure[] = ['lente', 'inverse', 'tres-lente']

/**
 * WEB-13 et WEB-14 — le compteur de candidats et le bandeau des outils, reunis
 * dans la meme section par le design.
 *
 * Le nombre vient de `chiffres.ts`, le seul endroit a modifier, et il est
 * formate par Intl — le separateur de milliers n'est pas le meme dans les deux
 * langues.
 *
 * Les outils sont des noms et non des logos : `simple-icons` ne redistribue plus
 * onze des trente-trois marques citees. Voir decision 0016.
 */
export function Base({
  contenu,
  langue,
  titreId,
}: {
  contenu: Contenu['commun']['base']
  langue: Langue
  /** Deux pages portent cette section : l'id doit rester unique par page. */
  titreId: string
}) {
  return (
    <Section titreId={titreId} fond="fond-2">
      <div className={GRILLE_INTITULE}>
        <Apparition>
          <Pilule intitule={contenu.intitule} registre="gris" />
        </Apparition>

        <div className="flex flex-col gap-[clamp(1.875rem,3.2vw,3rem)]">
          <Apparition>
            <div className="flex flex-col items-start gap-5 large:flex-row large:items-end large:justify-between large:gap-[clamp(1.5rem,3vw,3rem)]">
              {/* Le nombre et sa legende forment une seule phrase : decoupee en
                  deux pour la mise en forme, elle reste un seul titre. */}
              <h2
                id={titreId}
                className="flex flex-col gap-1 font-titre tracking-[-0.05em] text-encre"
              >
                <span className="text-[clamp(3.625rem,6.4vw,6.5rem)] leading-[0.9] text-primaire">
                  {nombreFormate(NOMBRE_CANDIDATS, langue)}
                  {contenu.suffixe}
                </span>
                <span className="max-w-[22ch] text-[clamp(1.375rem,2vw,1.875rem)] leading-[1.12] tracking-[-0.04em]">
                  {contenu.libelle}
                </span>
              </h2>
              <p className="max-w-[32ch] shrink-0 text-[0.90625rem] leading-[1.6] text-encre-2 large:text-right">
                {contenu.precision}
              </p>
            </div>
          </Apparition>

          <Apparition>
            <div className="flex flex-col gap-5">
              <span className="etiquette tracking-[0.1em] text-encre-3">
                {contenu.outilsIntitule}
              </span>
              <div className={`flex flex-col gap-2.5 ${MASQUE_BANDE}`}>
                {OUTILS.map((rangee, indice) => (
                  <Defilement
                    key={indice}
                    items={[...rangee, ...rangee]}
                    allure={ALLURES[indice]}
                    rendu={(outil) => (
                      <span className="mr-2.5 grid h-11.5 place-items-center rounded-bloc border border-trait bg-white px-4.5 etiquette tracking-[0.06em] whitespace-nowrap normal-case text-encre-2">
                        {outil}
                      </span>
                    )}
                  />
                ))}
              </div>
              <p className="max-w-[62ch] text-[0.78125rem] leading-[1.55] text-encre-3">
                {contenu.mention}
              </p>
            </div>
          </Apparition>
        </div>
      </div>
    </Section>
  )
}
