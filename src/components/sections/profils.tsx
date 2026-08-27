'use client'

import Image from 'next/image'
import { useState } from 'react'

import { PHOTOS } from '@/content/photos'
import type { Contenu } from '@/content/types'
import { Apparition } from '@/components/shared/apparition'
import { Pilule } from '@/components/shared/pilule'
import { Bouton } from '@/components/shared/bouton'
import { classes } from '@/components/shared/classes'
import { Fleche } from '@/components/shared/fleche'
import { Section } from '@/components/shared/section'

const FOCUS = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-encre'

/**
 * WEB-5 — le selecteur de profils du design : la liste a gauche, le detail a
 * droite.
 *
 * Composant client parce que la selection est un etat. Les six profils sont
 * donc dans le paquet client — c'est le prix de l'interaction, et il n'y a pas
 * de version serveur de ce composant qui rendrait la meme chose.
 *
 * Les boutons portent `aria-pressed` : ce sont des bascules, pas des liens, et
 * rien d'autre ne dirait au clavier lequel est actif.
 *
 * La fiche change sans transition : l'oeil suit la selection, pas un fondu.
 */
export function Profils({
  contenu,
  titreId,
}: {
  contenu: Contenu['commun']['profils']
  /** Deux pages portent cette section : l'id doit rester unique par page. */
  titreId: string
}) {
  const [choisi, setChoisi] = useState(0)
  const actif = contenu.liste[choisi] ?? contenu.liste[0]
  const photo = PHOTOS.profils[choisi] ?? PHOTOS.profils[0]

  return (
    <Section titreId={titreId} fond="fond">
      <div className="flex flex-col gap-[clamp(1.5rem,3vw,2.5rem)]">
        {/* L'intitule n'emploie pas `Pilule` : celle-ci tient la colonne de
            gauche de `GRILLE_INTITULE`, que l'accueil n'a plus. */}
        <Apparition className="w-fit self-start">
          <Pilule intitule={contenu.intitule} registre="clair" />
        </Apparition>

        <Apparition registre="texte">
          <h2
            id={titreId}
            className="max-w-[24ch] font-titre text-[clamp(1.375rem,2.1vw,1.875rem)] leading-[1.15] tracking-[-0.045em] text-encre"
          >
            {contenu.titre}
          </h2>
        </Apparition>
      </div>

      <div className="mt-[clamp(2.125rem,3.6vw,3.5rem)] flex flex-wrap items-start gap-[clamp(1.125rem,1.8vw,1.625rem)]">
        <Apparition className="min-w-0 shrink grow-0 basis-[14.75rem]">
          <ul className="flex flex-col gap-0.75">
            {contenu.liste.map((profil, indice) => {
              const courant = indice === choisi
              return (
                <li key={profil.nom}>
                  <button
                    type="button"
                    aria-pressed={courant}
                    onClick={() => setChoisi(indice)}
                    className={classes(
                      'flex min-h-[2.875rem] w-full items-center justify-between gap-3 rounded-marque px-4 py-2 text-left text-[0.90625rem] tracking-[-0.015em] transition-[background-color,color] duration-200',
                      FOCUS,
                      courant
                        ? 'bg-primaire text-white'
                        : 'text-encre-2 hover:bg-primaire/9 hover:text-encre',
                    )}
                  >
                    <span className="min-w-0">{profil.nom}</span>
                    <Fleche
                      className={classes(
                        'h-[0.5625rem] w-4 shrink-0',
                        courant ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                  </button>
                </li>
              )
            })}
          </ul>
        </Apparition>

        <Apparition className="min-w-0 grow basis-[26.25rem]">
          <div className="flex flex-wrap gap-[clamp(1.125rem,1.8vw,1.625rem)] rounded-carte bg-primaire/5 p-[clamp(0.875rem,1.2vw,1rem)]">
            <div className="order-2 flex min-w-0 grow basis-[16.25rem] flex-col gap-4 p-[clamp(0.625rem,1vw,1.125rem)]">
              <h3 className="font-titre text-[clamp(1.25rem,1.7vw,1.625rem)] leading-[1.15] tracking-[-0.035em] text-encre">
                {actif.nom}
              </h3>
              <p className="max-w-[46ch] text-[0.90625rem] leading-[1.6] text-encre-2">
                {actif.description}
              </p>
              <ul className="flex flex-wrap gap-1.75">
                {actif.etiquettes.map((etiquette) => (
                  <li
                    key={etiquette}
                    className="rounded-etiquette bg-primaire/7 px-3 py-1.75 etiquette-fine tracking-[0.07em] text-prose"
                  >
                    {etiquette}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap items-end justify-between gap-4 border-t border-trait-2 pt-4.5">
                <span className="flex flex-col gap-1">
                  <span className="etiquette-fine text-encre-2">{contenu.delaiIntitule}</span>
                  <strong className="font-titre text-2xl leading-none tracking-[-0.04em] text-encre">
                    {contenu.delai}
                  </strong>
                </span>
                <Bouton
                  destination="rendezVous"
                  libelle={contenu.ctaProfil}
                  variante="vert"
                  taille="compacte"
                  aria-label={`${contenu.ctaProfil} — ${actif.nom}`}
                />
              </div>
            </div>

            {/* alt vide : le nom et la description du profil precedent
                immediatement, une alternative les repeterait. */}
            <div className="relative order-1 min-h-55 min-w-0 grow basis-[13.125rem] overflow-hidden rounded-liste bg-white">
              <Image
                src={photo}
                alt=""
                fill
                sizes="(max-width: 1000px) 100vw, 30vw"
                className="object-cover"
              />
            </div>
          </div>
        </Apparition>
      </div>
    </Section>
  )
}
