'use client'

import { CalendarDays, Globe, Mail, MapPin } from 'lucide-react'
import { useState } from 'react'

import type { Contenu } from '@/content/types'
import { etiquetteRendezVous } from '@/content/liens'
import { Facebook, Instagram, Linkedin } from '@/components/shared/icones-reseaux'
import { FormulaireContact } from '@/components/sections/formulaire-contact'
import { Apparition } from '@/components/shared/apparition'
import { Bouton } from '@/components/shared/bouton'
import { classes } from '@/components/shared/classes'
import { Pilule } from '@/components/shared/pilule'
import { CONTENEUR, GRILLE_INTITULE } from '@/components/shared/section'

const FOCUS = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-encre'

const RESEAUX = [Linkedin, Facebook, Instagram] as const

/**
 * WEB-7 — la page Contact, sur le design « Contact Maldia ».
 *
 * Les deux formulaires sont construits, mais **leur bouton d'envoi est
 * désactivé** : cette application est un export statique, sans serveur pour
 * recevoir un envoi ni stockage pour un CV (WEB-10). Le repli sous le bouton
 * mène à la destination qui aboutit. Voir `FormulaireContact` et décision 0019.
 *
 * L'emplacement de l'intégration Cal.com est en revanche rendu tel quel : le
 * design l'annonce lui-même comme un emplacement, et l'intégré s'y posera sans
 * rien redessiner le jour où l'adresse arrive.
 */
export function ContactPage({ contenu, pied }: { contenu: Contenu; pied: Contenu['commun']['pied'] }) {
  const [onglet, setOnglet] = useState(0)
  const { contact, marches } = { contact: contenu.contact, marches: contenu.commun.marches }
  const voie = contact.voies[onglet] ?? contact.voies[0]
  const adresseCal = etiquetteRendezVous()

  const coordonnees = [
    { Icone: Mail, libelle: contact.coordonnees.courriel, valeur: pied.courriel },
    { Icone: MapPin, libelle: contact.coordonnees.bureau, valeur: pied.lieu },
    { Icone: Globe, libelle: contact.coordonnees.marches, valeur: marches.resume },
  ]

  return (
    <>
      <section
        aria-labelledby="titre-page"
        className="bg-fond py-[clamp(3rem,5.4vw,5.25rem)]"
      >
        <div className={CONTENEUR}>
          <div className={GRILLE_INTITULE}>
            <Apparition>
              <Pilule intitule={contact.reservation.intitule} registre="clair" />
            </Apparition>

            <div className="flex flex-col gap-[clamp(1.625rem,2.8vw,2.5rem)]">
              <Apparition>
                <div className="flex flex-col items-start gap-5 large:flex-row large:items-end large:justify-between large:gap-[clamp(1.5rem,3vw,3rem)]">
                  <h1
                    id="titre-page"
                    className="max-w-[20ch] font-titre text-[clamp(1.625rem,2.6vw,2.625rem)] leading-[1.08] tracking-[-0.05em] text-encre"
                  >
                    {contact.reservation.titre}
                  </h1>
                  <p className="max-w-[28ch] shrink-0 text-[0.90625rem] leading-[1.6] text-encre-2 large:text-right">
                    {contact.reservation.description}
                  </p>
                </div>
              </Apparition>

              <Apparition>
                <div className="flex flex-col gap-3.5 rounded-panneau bg-fond-2 p-[clamp(0.875rem,1.2vw,1.125rem)]">
                  <div className="flex flex-wrap items-center justify-between gap-3 px-2 py-1.5">
                    <span className="flex items-center gap-2.75">
                      <span
                        aria-hidden
                        className="grid size-8.5 shrink-0 place-items-center rounded-liste bg-white text-encre"
                      >
                        <CalendarDays className="size-4" />
                      </span>
                      <span className="flex flex-col">
                        <strong className="text-[0.875rem] tracking-[-0.015em] text-encre">
                          {contact.reservation.evenement}
                        </strong>
                        {adresseCal ? (
                          <span className="etiquette-fine text-[0.625rem] tracking-[0.07em] text-encre-3">
                            {adresseCal}
                          </span>
                        ) : null}
                      </span>
                    </span>
                    <span className="flex items-center gap-2.25 rounded-pilule bg-white px-3.25 py-1.75 etiquette-fine text-[0.625rem] tracking-[0.07em] text-encre-2">
                      <span aria-hidden className="size-1.5 shrink-0 rounded-pilule bg-signal" />
                      {contact.reservation.fuseau}
                    </span>
                  </div>

                  {/* L'emplacement de l'intégration Cal.com. Le design l'annonce
                      comme tel : l'intégré s'y posera sans redessiner la carte. */}
                  <div className="grid min-h-[clamp(22.5rem,34vw,32.5rem)] place-items-center rounded-carte bg-white">
                    <span className="flex max-w-[40ch] flex-col items-center gap-3 p-8 text-center">
                      <span
                        aria-hidden
                        className="grid size-11 place-items-center rounded-bloc bg-fond-2 text-encre-2"
                      >
                        <CalendarDays className="size-4.75" />
                      </span>
                      <strong className="text-[0.9375rem] tracking-[-0.02em] text-encre">
                        {contact.reservation.emplacement.titre}
                      </strong>
                      <span className="etiquette-fine text-[0.65625rem] leading-[1.6] tracking-[0.06em] text-encre-3">
                        {contact.reservation.emplacement.texte}
                      </span>
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 px-2 pt-1 pb-2">
                    <span className="etiquette-fine text-[0.625rem] tracking-[0.07em] text-encre-3">
                      {contact.reservation.mention}
                    </span>
                    <Bouton
                      destination="rendezVous"
                      libelle={contact.reservation.cta}
                      variante="encre"
                      taille="compacte"
                      ornement="fleche-montante"
                    />
                  </div>
                </div>
              </Apparition>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="titre-contact-page"
        className="bg-fond-2 pt-[clamp(3rem,5.4vw,5.25rem)] pb-[clamp(3.5rem,6vw,5.5rem)]"
      >
        <div className={CONTENEUR}>
          <div className={GRILLE_INTITULE}>
            <Apparition>
              <Pilule intitule={contact.entete.intitule} registre="gris" />
            </Apparition>

            <div className="flex flex-col gap-[clamp(1.75rem,3vw,2.75rem)]">
              <Apparition>
                <div className="flex flex-col items-start gap-5 large:flex-row large:items-end large:justify-between large:gap-[clamp(1.5rem,3vw,3rem)]">
                  <h2
                    id="titre-contact-page"
                    className="max-w-[20ch] font-titre text-[clamp(1.875rem,3.4vw,3.5rem)] leading-[1.04] tracking-[-0.05em] text-encre"
                  >
                    {contact.entete.titre}
                  </h2>
                  <p className="max-w-[28ch] shrink-0 text-[0.90625rem] leading-[1.6] text-encre-2 large:text-right">
                    {contact.entete.description}
                  </p>
                </div>
              </Apparition>

              <Apparition>
                <div role="group" aria-label={contact.entete.intitule} className="flex flex-wrap gap-2">
                  {contact.onglets.map((libelle, indice) => {
                    const actif = indice === onglet
                    return (
                      <button
                        key={libelle}
                        type="button"
                        aria-pressed={actif}
                        onClick={() => setOnglet(indice)}
                        className={classes(
                          'inline-flex min-h-11 cursor-pointer items-center gap-2.25 rounded-bloc border px-4 etiquette text-[0.6875rem] whitespace-nowrap transition-[background-color,color,border-color]',
                          FOCUS,
                          actif
                            ? 'border-encre bg-encre text-white'
                            : 'border-trait bg-white text-encre-2',
                        )}
                      >
                        <span
                          aria-hidden
                          className={classes(
                            'size-1.5 shrink-0 rounded-pilule',
                            actif ? 'bg-lime' : 'bg-trait-4',
                          )}
                        />
                        {libelle}
                      </button>
                    )
                  })}
                </div>
              </Apparition>

              <div className="grid grid-cols-1 items-start gap-[clamp(1rem,1.6vw,1.375rem)] frise:grid-cols-[minmax(0,1fr)_minmax(0,38%)]">
                <Apparition>
                  <div className="flex min-w-0 flex-col gap-5 rounded-panneau bg-white p-[clamp(1.375rem,2.2vw,2rem)]">
                    <span className="flex flex-wrap items-center justify-between gap-3">
                      <span
                        className={classes(
                          'rounded-etiquette px-2.75 py-1.5 etiquette-fine text-[0.625rem] tracking-[0.08em]',
                          onglet === 0 ? 'bg-pilule text-encre-2' : 'bg-primaire/10 text-primaire',
                        )}
                      >
                        {voie.intitule}
                      </span>
                      <span className="etiquette-fine text-[0.625rem] tracking-[0.08em] text-encre-3">
                        {voie.mention}
                      </span>
                    </span>

                    <strong className="font-titre text-[clamp(1.25rem,1.8vw,1.625rem)] leading-[1.15] tracking-[-0.035em] text-encre">
                      {voie.titre}
                    </strong>

                    <FormulaireContact voie={voie} entreprise={onglet === 0} />
                  </div>
                </Apparition>

                <Apparition>
                  <div className="flex min-w-0 flex-col gap-[clamp(0.875rem,1.4vw,1.25rem)]">
                    <div className="flex flex-col gap-4 rounded-encart bg-encre p-[clamp(1.375rem,2.2vw,1.875rem)]">
                      <span className="etiquette-fine text-[0.625rem] tracking-[0.1em] text-sur-sombre-2">
                        {contact.calendrier.intitule}
                      </span>
                      <strong className="font-titre text-[clamp(1.125rem,1.6vw,1.4375rem)] leading-[1.2] tracking-[-0.035em] text-white">
                        {contact.calendrier.titre}
                      </strong>
                      <span className="text-[0.84375rem] leading-[1.6] text-sur-sombre">
                        {contact.calendrier.texte}
                      </span>
                      <ul className="flex flex-wrap gap-1.75">
                        {contact.calendrier.creneaux.map((creneau) => (
                          <li
                            key={creneau}
                            className="rounded-etiquette bg-white/10 px-2.75 py-1.75 etiquette-fine text-[0.625rem] tracking-[0.07em] text-white"
                          >
                            {creneau}
                          </li>
                        ))}
                      </ul>
                      <Bouton
                        destination="rendezVous"
                        libelle={contact.calendrier.cta}
                        variante="blanc"
                        ornement="etoile"
                        couleurOrnement="text-primaire"
                        className="self-start"
                      />
                    </div>

                    <ul className="flex flex-col gap-2.5">
                      {coordonnees.map((ligne) => (
                        <li
                          key={ligne.libelle}
                          className="flex items-center gap-3.5 rounded-carte bg-white px-4.5 py-4"
                        >
                          <span
                            aria-hidden
                            className="grid size-9 shrink-0 place-items-center rounded-liste bg-fond-2 text-encre-2"
                          >
                            <ligne.Icone className="size-4" />
                          </span>
                          <span className="flex min-w-0 flex-col gap-0.5">
                            <span className="etiquette-fine text-[0.625rem] tracking-[0.08em] text-encre-3">
                              {ligne.libelle}
                            </span>
                            <span className="text-[0.875rem] text-encre">
                              {ligne.valeur}
                            </span>
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Repères visuels, pas des liens : le design leur donne
                        `href="#top"`, et les comptes ne sont pas fournis. */}
                    <ul aria-hidden className="flex flex-wrap gap-2">
                      {RESEAUX.map((Icone, indice) => (
                        <li
                          key={indice}
                          className="grid size-10.5 place-items-center rounded-bloc bg-white text-encre-2"
                        >
                          <Icone className="size-4.25" />
                        </li>
                      ))}
                    </ul>

                    {/* Plafonne : a 768 px la colonne prend toute la largeur,
                        et ce paragraphe atteignait 95 caracteres par ligne. */}
                    <p className="max-w-[34rem] text-[0.8125rem] leading-[1.6] text-encre-3">
                      {contact.mention}
                    </p>
                  </div>
                </Apparition>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
