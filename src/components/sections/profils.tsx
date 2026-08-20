import Image from 'next/image'

import { PHOTOS } from '@/content/photos'
import type { Contenu } from '@/content/types'
import { Apparition } from '@/components/shared/apparition'
import { ColonneParallaxe } from '@/components/shared/colonne-parallaxe'
import { EnTeteSection } from '@/components/shared/en-tete-section'
import { Section } from '@/components/shared/section'

/**
 * WEB-5 — les onze catégories de profils, dans les colonnes décalées de la
 * maquette.
 *
 * Les trois colonnes décalées de la maquette. Le décalage se voit à partir de
 * trois colonnes, donc seulement au-delà de `xl` : en dessous, la grille se
 * replie et les colonnes n'ont plus de raison de bouger l'une par rapport à
 * l'autre.
 *
 * Surface `fond-2` et non `Carte` : sur le registre `fond`, une carte blanche
 * aurait la couleur de son fond.
 */
const AMPLITUDES = [46, 96, 22] as const

export function Profils({ contenu }: { contenu: Contenu['talents']['profils'] }) {
  // Trois colonnes remplies en serpentin : l'ordre de lecture reste celui du
  // contenu, colonne par colonne.
  const colonnes = AMPLITUDES.map((amplitude, colonne) => ({
    amplitude,
    // La position d'origine est conservée : c'est elle qui désigne la photo,
    // pas le rang dans la colonne.
    items: contenu.liste
      .map((profil, position) => ({ profil, position }))
      .filter(({ position }) => position % AMPLITUDES.length === colonne),
  }))

  return (
    <Section titreId="titre-profils" fond="fond-2" bloc dessous="tendre">
      <Apparition>
        <EnTeteSection titreId="titre-profils" titre={contenu.titre} fond="fond-2" />
      </Apparition>
      <div className="mt-14 grid items-start gap-6.5 [&>*]:min-w-0 md:grid-cols-2 xl:grid-cols-3">
        {colonnes.map((colonne) => (
          <ColonneParallaxe
            key={colonne.amplitude}
            amplitude={colonne.amplitude}
            className="flex min-w-0 flex-col gap-6.5"
          >
            {colonne.items.map(({ profil, position }) => (
              <figure
                key={profil.nom}
                className="flex min-w-0 flex-col gap-5 rounded-avis bg-carte p-8"
              >
                <blockquote className="font-description text-[0.97rem] leading-[1.6] text-encre-2">
                  <p>{profil.description}</p>
                </blockquote>
                <figcaption className="flex items-center gap-3.5">
                  {/* alt vide : le nom de la categorie suit immediatement, une alternative
                      le repeterait. */}
                  <Image
                    src={PHOTOS.profils[position]}
                    alt=""
                    width={44}
                    height={44}
                    className="size-11 shrink-0 rounded-full bg-trait object-cover"
                  />
                  <span className="flex min-w-0 flex-col">
                    <span className="font-description text-[1.0625rem] font-semibold text-encre">
                      {profil.nom}
                    </span>
                    <span className="font-description text-[0.9375rem] text-encre-2">{profil.precision}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </ColonneParallaxe>
        ))}
      </div>
    </Section>
  )
}
