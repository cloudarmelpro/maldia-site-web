'use client'

import Image from 'next/image'
import { useState } from 'react'

import { PHOTOS } from '@/content/photos'
import type { Contenu } from '@/content/types'
import { Apparition } from '@/components/shared/apparition'
import { Bouton } from '@/components/shared/bouton'
import { Pilule } from '@/components/shared/pilule'
import { GRILLE_INTITULE, Section } from '@/components/shared/section'

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
    <Section titreId={titreId} fond="fond-2">
      <div className={GRILLE_INTITULE}>
        <Apparition>
          <Pilule intitule={contenu.intitule} registre="gris" />
        </Apparition>

        <Apparition>
          <div className="flex flex-col items-start gap-5 large:flex-row large:items-end large:justify-between large:gap-[clamp(1.5rem,3vw,3rem)]">
            <h2
              id={titreId}
              className="max-w-[24ch] font-titre text-[clamp(1.75rem,2.8vw,2.75rem)] leading-[1.1] tracking-[-0.045em] text-encre"
            >
              {contenu.titre}
            </h2>
            <Bouton
              destination="rendezVous"
              libelle={contenu.cta}
              variante="contour"
              taille="compacte"
              ornement="etoile"
              couleurOrnement="text-primaire"
              className="min-h-11 shrink-0"
            />
          </div>
        </Apparition>
      </div>

      <div className="mt-[clamp(2.125rem,3.6vw,3.5rem)] grid grid-cols-1 items-start gap-[clamp(1.125rem,1.8vw,1.625rem)] large:grid-cols-[minmax(0,11.875rem)_minmax(0,1fr)] large:gap-[clamp(1.75rem,2.8vw,2.75rem)] [&>*]:min-w-0">
        <Apparition>
          <ul className="flex flex-col overflow-hidden rounded-carte border border-trait bg-white">
            {contenu.liste.map((profil, indice) => {
              const courant = indice === choisi
              return (
                <li key={profil.nom}>
                  <button
                    type="button"
                    aria-pressed={courant}
                    onClick={() => setChoisi(indice)}
                    className={`flex min-h-13 w-full items-center gap-3.5 px-4.5 text-left transition-[background-color] ${FOCUS} ${
                      courant ? 'bg-fond-2' : 'bg-transparent'
                    } ${indice === contenu.liste.length - 1 ? '' : 'border-b border-trait-2'}`}
                  >
                    <span
                      aria-hidden
                      className={`size-1.5 shrink-0 rounded-pilule transition-[background-color] ${
                        courant ? 'bg-primaire' : 'bg-trait-4'
                      }`}
                    />
                    <span
                      className={`min-w-0 flex-1 truncate etiquette ${
                        courant ? 'text-encre' : 'text-encre-2'
                      }`}
                    >
                      {profil.nom}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </Apparition>

        <Apparition>
          <div className="grid grid-cols-1 gap-[clamp(1.125rem,1.8vw,1.625rem)] rounded-carte border border-trait bg-white p-[clamp(0.875rem,1.2vw,1rem)] large:min-h-[20.625rem] large:grid-cols-[minmax(0,1fr)_minmax(0,42%)]">
            <div className="flex flex-col gap-4 p-[clamp(0.625rem,1vw,1.125rem)]">
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
                    className="rounded-etiquette bg-fond-2 px-3 py-1.75 etiquette-fine tracking-[0.07em] text-encre-2"
                  >
                    {etiquette}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap items-end justify-between gap-4 border-t border-trait-2 pt-4.5">
                <span className="flex flex-col gap-1">
                  <span className="etiquette-fine text-encre-3">{contenu.delaiIntitule}</span>
                  <strong className="font-titre text-2xl leading-none tracking-[-0.04em] text-encre">
                    {contenu.delai}
                  </strong>
                </span>
                <Bouton
                  destination="rendezVous"
                  libelle={contenu.ctaProfil}
                  variante="encre"
                  taille="compacte"
                  ornement="etoile"
                  aria-label={`${contenu.ctaProfil} — ${actif.nom}`}
                />
              </div>
            </div>

            {/* alt vide : le nom et la description du profil precedent
                immediatement, une alternative les repeterait. */}
            <div className="relative order-first min-h-55 overflow-hidden rounded-liste bg-[#eceeea] large:order-none large:min-h-0">
              <Image
                src={photo}
                alt=""
                fill
                sizes="(max-width: 1000px) 100vw, 42vw"
                className="object-cover"
              />
            </div>
          </div>
        </Apparition>
      </div>
    </Section>
  )
}
