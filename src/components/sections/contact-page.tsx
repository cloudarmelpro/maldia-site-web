import type { Contenu } from '@/content/types'
import { FormulaireContact } from '@/components/sections/formulaire-contact'
import { Apparition } from '@/components/shared/apparition'
import { Bouton } from '@/components/shared/bouton'
import { classes } from '@/components/shared/classes'
import { Pilule } from '@/components/shared/pilule'
import { CONTENEUR } from '@/components/shared/section'

/** L'intitule en capitales du design de cette page : plus espace que `etiquette`. */
const INTITULE = 'etiquette tracking-[0.12em] text-encre-2'

/**
 * La colonne du design : deux blocs cote a cote, empiles des qu'ils n'ont plus
 * la place. Elle-meme flex, pour que le bloc qu'elle porte s'etire a la hauteur
 * de son voisin sans dependre d'un pourcentage de hauteur.
 */
const COLONNE = 'flex min-w-0 flex-1 basis-[26.25rem]'

/**
 * WEB-7 — la page Contact, sur le design « Site Maldia ».
 *
 * Le hero est vert plein, comme celui des autres pages interieures : l'en-tete
 * est collant DANS le flux, avec une marge basse negative egale a sa hauteur,
 * et le padding haut lui rend sa place en lisant la hauteur que `en-tete.tsx`
 * publie. Le repli sert le rendu statique, avant que la mesure existe.
 *
 * Le bloc d'appel et le pied fermant deja la page par le gabarit, rien n'est
 * repris ici de leurs cartes.
 *
 * L'emplacement de l'integration Cal.com est rendu tel quel : le design
 * l'annonce lui-meme comme un emplacement, et l'integre s'y posera sans rien
 * redessiner le jour ou l'adresse arrive. Voir decision 0019.
 */
export function ContactPage({
  contenu,
  pied,
}: {
  contenu: Contenu
  pied: Contenu['commun']['pied']
}) {
  const { contact } = contenu
  const { reservation } = contact

  const coordonnees = [
    { libelle: contact.coordonnees.courriel, valeur: pied.courriel },
    { libelle: contact.coordonnees.bureau, valeur: pied.lieu },
    { libelle: contact.coordonnees.marches, valeur: contenu.commun.marches.resume },
  ]

  return (
    <>
      {/* Rien n'est anime a l'entree : c'est l'element le plus haut de la page,
          rendu a `opacity: 0` dans le HTML statique il n'apparaitrait qu'a
          l'hydratation. */}
      <section
        aria-labelledby="titre-page"
        className="bg-nuit pt-[calc(var(--hauteur-en-tete,4.5rem)+clamp(4rem,8vw,7.5rem))] pb-[clamp(3.5rem,7vw,6rem)]"
      >
        <div className={CONTENEUR}>
          <Pilule intitule={contact.entete.intitule} registre="nuit" />

          <div className="mt-7 flex flex-wrap items-end gap-[clamp(1.25rem,2.6vw,2rem)]">
            <h1
              id="titre-page"
              className="min-w-0 max-w-[20ch] grow basis-[28.75rem] font-titre text-[clamp(1.625rem,3.2vw,2.625rem)] leading-[1.02] tracking-[-0.035em] text-white"
            >
              {contact.entete.titre}
            </h1>

            <div className="min-w-0 grow basis-[18.75rem]">
              <p className="max-w-[36ch] text-[clamp(1.0625rem,1.5vw,1.3125rem)] leading-[1.55] text-sur-sombre">
                {contact.entete.description}
              </p>
              {/* Le design met cette mention en retrait par la couleur. Sur le
                  vert, le retrait ne peut se creuser que jusqu'a `white/92` :
                  en dessous, le texte passe sous le seuil AA. */}
              <p className="mt-3.5 text-[0.84375rem] leading-[1.6] text-encre-2">
                {contact.entete.mention}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="titre-reservation"
        className="bg-fond py-[clamp(3.5rem,7vw,6.25rem)]"
      >
        <div className={classes(CONTENEUR, 'flex flex-wrap gap-5')}>
          <Apparition className={COLONNE}>
            <div className="flex min-w-0 flex-1 flex-col rounded-panneau bg-primaire/5 p-[clamp(1.1875rem,1.8vw,1.5625rem)]">
              <span className={INTITULE}>{reservation.intitule}</span>

              <h2
                id="titre-reservation"
                className="mt-5 max-w-[22ch] font-titre text-[clamp(1.1875rem,1.8vw,1.5rem)] leading-[1.1] tracking-[-0.025em] text-encre"
              >
                {reservation.titre}
              </h2>

              <p className="mt-3.5 max-w-[44ch] text-[1rem] leading-[1.6] text-prose">
                {reservation.description}
              </p>

              <span className="mt-7 flex flex-wrap items-center justify-between gap-4 rounded-carte bg-white px-5 py-4">
                <span className="text-[0.96875rem] text-encre">{reservation.evenement}</span>
                <span className="text-[0.84375rem] text-encre-2">{reservation.fuseau}</span>
              </span>

              {/* L'emplacement de l'integration Cal.com. Le design l'annonce
                  comme tel : l'integre s'y posera sans redessiner la carte. */}
              <span className="mt-3 grid min-h-60 flex-1 place-items-center rounded-carte border border-dashed border-trait-4 p-6 text-center">
                <span className="flex flex-col gap-2">
                  <span className="text-[0.96875rem] text-encre-2">
                    {reservation.emplacement.titre}
                  </span>
                  <span className="text-[0.84375rem] leading-[1.5] text-encre-2">
                    {reservation.emplacement.texte}
                  </span>
                </span>
              </span>

              <div className="mt-5 flex flex-wrap items-center gap-4">
                <Bouton
                  destination="rendezVous"
                  libelle={reservation.cta}
                  variante="vert"
                  ornement="fleche-montante"
                />
                <span className="text-[0.84375rem] text-encre-2">{reservation.mention}</span>
              </div>
            </div>
          </Apparition>

          <Apparition className={COLONNE}>
            <FormulaireContact onglets={contact.onglets} voies={contact.voies} />
          </Apparition>
        </div>

        <Apparition>
          <div
            className={classes(
              CONTENEUR,
              'mt-6 grid grid-cols-[repeat(auto-fit,minmax(13.75rem,1fr))] gap-x-10 border-t border-trait',
            )}
          >
            {coordonnees.map((ligne) => (
              <div key={ligne.libelle} className="min-w-0 border-b border-trait py-6.5">
                <p className={INTITULE}>{ligne.libelle}</p>
                <p className="mt-2.5 text-[1rem] text-encre">{ligne.valeur}</p>
              </div>
            ))}
          </div>

          {/* La gouttiere reste sur le conteneur : posee sur le paragraphe, sa
              largeur maximale entrerait en conflit avec celle du conteneur, et
              c'est l'ordre de la feuille de style qui trancherait. */}
          <div className={CONTENEUR}>
            <p className="mt-6.5 max-w-[76ch] text-[0.8125rem] leading-[1.6] text-encre-2">
              {contact.mention}
            </p>
          </div>
        </Apparition>
      </section>
    </>
  )
}
