import type { Contenu } from '@/content/types'
import { FormulaireContact } from '@/components/sections/formulaire-contact'
import { Apparition } from '@/components/shared/apparition'
import { Bouton } from '@/components/shared/bouton'
import { classes } from '@/components/shared/classes'
import { IntituleSection } from '@/components/shared/intitule-section'
import { delaiDeGrille } from '@/components/shared/decalage'
import { CONTENEUR } from '@/components/shared/section'

/** Les deux panneaux du design, cote a cote, empiles des qu'ils n'ont plus la place. */
const COLONNE = 'flex min-w-0 flex-1 basis-[23.75rem]'

const PANNEAU =
  'flex min-w-0 flex-1 flex-col gap-5 rounded-carte-large bg-primaire/5 p-[clamp(1.375rem,2.2vw,2rem)]'

/**
 * WEB-7 — la page Contact, sur le design « Site Maldia v2 ».
 *
 * Le hero est vert et coiffe de coins bas arrondis, en miroir du bloc Contact
 * qui ferme la page. L'en-tete est collant dans le flux : le padding haut lui
 * rend sa place en lisant la hauteur que `en-tete.tsx` publie, et le repli sert
 * le rendu statique, avant que la mesure existe.
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
        className="rounded-b-coiffe bg-primaire pt-[calc(clamp(3.5rem,7vw,6.5rem)+var(--hauteur-en-tete,4.5rem))] pb-[clamp(3.5rem,7vw,6rem)]"
      >
        <div className={classes(CONTENEUR, 'flex flex-col gap-[clamp(1.5rem,3vw,2.5rem)]')}>
          <IntituleSection intitule={contact.entete.intitule} registre="vert" />

          {/* La remontee du design : l'ecart de la colonne flex est plus large
              que celui voulu entre l'intitule et le titre. */}
          <h1
            id="titre-page"
            className="-mt-4.5 max-w-[20ch] font-titre text-[clamp(1.625rem,3.2vw,2.625rem)] leading-[1.04] tracking-[-0.045em] text-white"
          >
            {contact.entete.titre}
          </h1>
        </div>
      </section>

      <section aria-labelledby="titre-reservation" className="bg-fond py-[clamp(4rem,7vw,7rem)]">
        <div
          className={classes(
            CONTENEUR,
            'flex flex-wrap items-start gap-[clamp(1.125rem,1.8vw,1.625rem)]',
          )}
        >
          <Apparition className={COLONNE}>
            <div className={PANNEAU}>
              <IntituleSection intitule={reservation.intitule} />

              <div className="flex flex-col gap-3">
                <h2
                  id="titre-reservation"
                  className="max-w-[22ch] font-titre text-[clamp(1.1875rem,1.7vw,1.5625rem)] leading-[1.15] tracking-[-0.04em] text-encre"
                >
                  {reservation.titre}
                </h2>
                <p className="max-w-[40ch] text-[0.90625rem] leading-[1.6] text-encre-2">
                  {reservation.description}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 rounded-bloc bg-white px-4.5 py-3.5">
                <span className="text-[0.90625rem] text-encre">{reservation.evenement}</span>
                <span className="text-[0.78125rem] text-encre-2">{reservation.fuseau}</span>
              </div>

              {/* L'emplacement de l'integration Cal.com. Le design l'annonce
                  comme tel : l'integre s'y posera sans redessiner la carte. */}
              <div className="grid min-h-[14.375rem] place-items-center rounded-bloc bg-white p-6 text-center">
                <div>
                  <p className="text-[0.90625rem] leading-[1.5] text-encre-2">
                    {reservation.emplacement.titre}
                  </p>
                  <p className="mt-2 text-[0.78125rem] leading-[1.5] text-encre-2">
                    {reservation.emplacement.texte}
                  </p>
                </div>
              </div>

              <div className="mt-auto flex flex-wrap items-center gap-3.5">
                <Bouton
                  destination="rendezVous"
                  libelle={reservation.cta}
                  variante="vert"
                  ornement="fleche"
                />
                <span className="text-[0.78125rem] text-encre-2">{reservation.mention}</span>
              </div>
            </div>
          </Apparition>

          <Apparition delai={delaiDeGrille(1)} className={COLONNE}>
            <FormulaireContact
              onglets={contact.onglets}
              voies={contact.voies}
              className={PANNEAU}
            />
          </Apparition>
        </div>
      </section>

      <section aria-labelledby="titre-coordonnees" className="bg-fond pb-[clamp(4rem,7vw,7rem)]">
        <div className={classes(CONTENEUR, 'flex flex-col gap-[clamp(1.5rem,3vw,2.5rem)]')}>
          <Apparition>
            <IntituleSection intitule={contact.coordonnees.intitule} id="titre-coordonnees" />
          </Apparition>

          <ul className="grid grid-cols-[repeat(auto-fit,minmax(13.75rem,1fr))] gap-1">
            {coordonnees.map((ligne, indice) => (
              <li key={ligne.libelle} className="min-w-0">
                <Apparition delai={delaiDeGrille(indice)} className="h-full">
                  <div className="flex h-full flex-col gap-2.5 rounded-bloc bg-primaire/5 p-[clamp(1.125rem,1.6vw,1.375rem)]">
                    <span className="etiquette-fine text-encre-2">{ligne.libelle}</span>
                    <span className="text-[0.9375rem] tracking-[-0.015em] text-encre">
                      {ligne.valeur}
                    </span>
                  </div>
                </Apparition>
              </li>
            ))}
          </ul>

          <Apparition registre="texte">
            <p className="max-w-[76ch] text-[0.8125rem] leading-[1.6] text-encre-2">
              {contact.mention}
            </p>
          </Apparition>
        </div>
      </section>
    </>
  )
}
