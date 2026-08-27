'use client'

import Image from 'next/image'
import { useState } from 'react'

import { PHOTOS } from '@/content/photos'
import type { Contenu } from '@/content/types'
import { Bouton } from '@/components/shared/bouton'
import { classes } from '@/components/shared/classes'

const FOCUS = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-encre'

/**
 * WEB-5 — le selecteur de postes de la page Services : les rangees a gauche, la
 * fiche du poste retenu a droite.
 *
 * Composant client parce que la selection est un etat, et pose aussi bas que
 * possible : la section qui l'accueille reste rendue au serveur.
 *
 * Les boutons portent `aria-pressed` : ce sont des bascules, pas des liens, et
 * rien d'autre ne dirait au clavier lequel est actif.
 *
 * Les filets entre rangees sont l'aplat de la liste vu par les interstices, et
 * non une bordure par rangee : une bordure doublerait le trait a la jointure de
 * la rangee active, qui est pleine.
 */
export function ServicesSelecteur({ contenu }: { contenu: Contenu['commun']['profils'] }) {
  const [choisi, setChoisi] = useState(0)
  const actif = contenu.liste[choisi] ?? contenu.liste[0]
  const photo = PHOTOS.profils[choisi] ?? PHOTOS.profils[0]

  return (
    <div className="flex flex-wrap gap-5">
      <ul className="flex min-w-0 grow basis-[23.75rem] flex-col gap-px border-y border-trait bg-trait">
        {contenu.liste.map((profil, indice) => {
          const courant = indice === choisi
          return (
            <li key={profil.nom}>
              <button
                type="button"
                aria-pressed={courant}
                onClick={() => setChoisi(indice)}
                className={classes(
                  'flex w-full items-center gap-5 px-6 py-5.5 text-left transition-[background-color,color] duration-200',
                  FOCUS,
                  courant ? 'bg-primaire' : 'bg-fond hover:bg-primaire/9',
                )}
              >
                <span className="min-w-0 grow">
                  <span
                    className={classes(
                      'block text-[1.1875rem]',
                      courant ? 'text-white' : 'text-encre',
                    )}
                  >
                    {profil.nom}
                  </span>
                  <span
                    className={classes(
                      'mt-1.5 block text-[0.875rem] leading-[1.5]',
                      courant ? 'text-white/92' : 'text-encre-2',
                    )}
                  >
                    {profil.resume}
                  </span>
                </span>
                <span
                  className={classes(
                    'shrink-0 etiquette tracking-[0.1em]',
                    courant ? 'text-white/92' : 'text-encre-2',
                  )}
                >
                  {profil.famille}
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      <div className="flex min-w-0 grow basis-[25rem] flex-col overflow-hidden rounded-panneau bg-white">
        {/* alt vide : le nom et la description du poste suivent immediatement,
            une alternative les repeterait. */}
        <div className="relative h-55 min-w-0 shrink-0">
          <Image
            src={photo}
            alt=""
            fill
            sizes="(max-width: 1000px) 100vw, 40vw"
            className="object-cover"
          />
        </div>

        <div className="flex min-w-0 grow flex-col p-[clamp(1.625rem,3vw,2.375rem)]">
          <h3 className="font-titre text-[clamp(1.125rem,1.7vw,1.4375rem)] leading-[1.12] tracking-[-0.02em] text-encre">
            {actif.nom}
          </h3>
          <p className="mt-3.5 max-w-[48ch] text-base leading-[1.6] text-prose">
            {actif.description}
          </p>
          <ul className="mt-6.5 flex flex-wrap gap-2">
            {actif.etiquettes.map((etiquette) => (
              <li
                key={etiquette}
                className="rounded-pilule bg-primaire/7 px-3.5 py-1.75 text-[0.84375rem] text-prose"
              >
                {etiquette}
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-wrap items-center gap-4.5 pt-7.5">
            <Bouton
              destination="rendezVous"
              libelle={contenu.ctaProfil}
              variante="vert"
              aria-label={`${contenu.ctaProfil} — ${actif.nom}`}
            />
            <span className="text-[0.84375rem] text-encre-2">
              {contenu.delaiIntitule} · {contenu.delai}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
