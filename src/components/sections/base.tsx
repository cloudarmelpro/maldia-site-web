import { nombreFormate, NOMBRE_CANDIDATS } from '@/content/chiffres'
import type { Langue } from '@/content/langues'
import { OUTILS } from '@/content/outils'
import type { Contenu } from '@/content/types'
import { Apparition } from '@/components/shared/apparition'
import { Pilule } from '@/components/shared/pilule'
import { Defilement, MASQUE_BANDE } from '@/components/shared/defilement'
import type { Allure } from '@/components/shared/defilement'
import { classes } from '@/components/shared/classes'
import { BAS, CONTENEUR, HAUT } from '@/components/shared/section'

// Une allure par rangee, le sens s'inversant au milieu : ce sont les valeurs du
// design. `Defilement` n'expose pas de reprise inverse a la duree mediane, donc
// la rangee du milieu porte l'inverse rapide.
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
 *
 * Ce n'est pas une `Section` : les bandes traversent la page entiere, et
 * `Section` enferme tout son contenu dans la gouttiere. Elles sont donc rendues
 * entre deux conteneurs plutot que dedans.
 *
 * Ce debordement se fait par la structure et non par `100vw` : cette unite
 * compte la barre de defilement, donc les bandes depasseraient la fenetre de sa
 * largeur et ouvriraient un defilement horizontal sur toute la page.
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
    <section aria-labelledby={titreId} className={classes('bg-primaire', HAUT, BAS)}>
      <div className={classes(CONTENEUR, 'flex flex-col gap-[clamp(1.5rem,3vw,2.5rem)]')}>
        <Apparition>
          {/* Sur le vert, le voile d'une surface est sombre : un voile blanc
              eclaircirait l'aplat et ferait passer le texte blanc sous AA. */}
          <Pilule intitule={contenu.intitule} registre="sombre" />
        </Apparition>

        <Apparition registre="texte">
          <div className="flex flex-wrap items-end justify-between gap-[clamp(1.25rem,3vw,3rem)]">
            {/* Le nombre et sa legende forment une seule phrase : decoupee en
                deux pour la mise en forme, elle reste un seul titre. */}
            <h2
              id={titreId}
              className="flex flex-col gap-1 font-titre tracking-[-0.05em] text-white"
            >
              <span className="text-[clamp(2.75rem,4.8vw,4.625rem)] leading-[0.9]">
                {nombreFormate(NOMBRE_CANDIDATS, langue)}
                {contenu.suffixe}
              </span>
              <span className="max-w-[22ch] text-[clamp(1.1875rem,1.8vw,1.5625rem)] leading-[1.15] tracking-[-0.04em]">
                {contenu.libelle}
              </span>
            </h2>
            <p className="max-w-[32ch] shrink-0 text-[0.90625rem] leading-[1.6] text-white">
              {contenu.precision}
            </p>
          </div>
        </Apparition>

        <Apparition>
          <span className="etiquette text-[0.6875rem] tracking-[0.1em] text-white/94">
            {contenu.outilsIntitule}
          </span>
        </Apparition>
      </div>

      <Apparition>
        <div className={classes('mt-5 flex flex-col gap-[0.5625rem]', MASQUE_BANDE)}>
          {OUTILS.map((rangee, indice) => (
            <Defilement
              key={indice}
              items={rangee}
              allure={ALLURES[indice]}
              rendu={(outil) => (
                <span className="mr-[0.5625rem] grid h-10 place-items-center rounded-marque bg-voile/22 px-[1.0625rem] text-[0.78125rem] tracking-[0.06em] whitespace-nowrap text-white">
                  {outil}
                </span>
              )}
            />
          ))}
        </div>
      </Apparition>

      <div className={CONTENEUR}>
        <Apparition>
          <p className="mt-5 max-w-[62ch] text-[0.78125rem] leading-[1.55] text-white/94">
            {contenu.mention}
          </p>
        </Apparition>
      </div>
    </section>
  )
}
