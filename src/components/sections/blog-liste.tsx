'use client'

import Image from 'next/image'
import { useState } from 'react'

import { chemin, cheminArticle } from '@/content/langues'
import type { Langue } from '@/content/langues'
import { PHOTOS } from '@/content/photos'
import type { Article, Contenu } from '@/content/types'
import { CarteArticle, MetaArticle } from '@/components/sections/carte-article'
import { Apparition } from '@/components/shared/apparition'
import { BoutonPage } from '@/components/shared/bouton'
import { classes } from '@/components/shared/classes'
import { delaiDeGrille } from '@/components/shared/decalage'
import { Fleche } from '@/components/shared/fleche'
import { Lien } from '@/components/shared/lien'
import { Pilule } from '@/components/shared/pilule'
import { CONTENEUR } from '@/components/shared/section'

const FOCUS = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-encre'

/**
 * L'en-tete est collant dans le flux, avec une marge basse negative egale a sa
 * hauteur : la premiere section commence donc SOUS lui. Sa hauteur mesuree est
 * publiee dans `--hauteur-en-tete` par `components/layout/en-tete` — la barre
 * grandit quand la navigation passe a la ligne, et une valeur en dur laisserait
 * alors la pilule dessous. Le repli est accorde au `min-h-18` de la barre.
 */
const HAUT_HERO = 'pt-[calc(clamp(4rem,8vw,7.25rem)+var(--hauteur-en-tete,4.5rem))]'

/**
 * WEB-15 — l'index du blog, sur le design « Site Maldia » : un hero vert, un
 * article a la une, puis les autres en lignes.
 *
 * L'article le plus recent passe en vedette et sort de la liste. Les onglets de
 * filtre sont deduits des categories **de la liste**, pas de tous les articles :
 * sinon filtrer sur la categorie de la vedette laisserait une liste vide.
 */
export function BlogListe({
  contenu,
  articles,
  langue,
}: {
  contenu: Contenu['blog']
  /** Tries du plus recent au plus ancien : le premier passe en vedette. */
  articles: readonly Article[]
  langue: Langue
}) {
  const [vedette, ...liste] = articles
  const categories = [...new Set(liste.map((article) => article.categorie))]
  const onglets = [contenu.filtreTout, ...categories]

  const [filtre, setFiltre] = useState(0)
  const visibles = filtre === 0 ? liste : liste.filter((a) => a.categorie === onglets[filtre])

  return (
    <>
      <section
        aria-labelledby="titre-page"
        className={classes('bg-primaire pb-[clamp(3rem,6vw,5rem)]', HAUT_HERO)}
      >
        <div className={CONTENEUR}>
          <Pilule intitule={contenu.entete.intitule} registre="sombre" />

          <div className="mt-7 flex flex-wrap items-end gap-8">
            <h1
              id="titre-page"
              className="max-w-[22ch] min-w-0 grow basis-120 font-titre text-[clamp(1.5625rem,3vw,2.4375rem)] leading-[1.02] tracking-[-0.035em] text-white"
            >
              {contenu.entete.titre}
            </h1>
            <p className="max-w-[38ch] min-w-0 grow basis-75 text-[1.0625rem] leading-[1.55] text-white/92">
              {contenu.entete.description}
            </p>
          </div>

          <p className="mt-9 etiquette text-[0.6875rem] tracking-[0.08em] text-white/92">
            {contenu.entete.mention}
          </p>
        </div>
      </section>

      <section className="bg-fond py-[clamp(3.5rem,7vw,6.25rem)]">
        <div className={CONTENEUR}>
          {vedette ? (
            <Apparition>
              <Lien
                href={cheminArticle(langue, vedette.identifiant)}
                className={classes(
                  'group flex flex-wrap items-center gap-[clamp(1.5rem,4vw,3.5rem)]',
                  FOCUS,
                )}
              >
                {/* alt vide : le titre de l'article suit immediatement. */}
                <span className="relative block h-[clamp(15rem,30vw,23.75rem)] min-w-0 grow basis-105 overflow-hidden rounded-panneau bg-fond-2">
                  <Image
                    src={PHOTOS.blog[vedette.identifiant]}
                    alt=""
                    fill
                    preload
                    sizes="(max-width: 820px) 100vw, 46vw"
                    className="object-cover"
                  />
                </span>

                <div className="min-w-0 grow basis-90">
                  <div className="flex flex-wrap items-center gap-3.5">
                    <span className="rounded-pilule bg-primaire/7 px-3.25 py-1.25 etiquette text-[0.71875rem] tracking-[0.1em] text-encre">
                      {contenu.aLaUne}
                    </span>
                    <MetaArticle article={vedette} langue={langue} deLecture={contenu.deLecture} />
                  </div>

                  <h2 className="mt-6.5 max-w-[24ch] font-titre text-[clamp(1.125rem,1.7vw,1.4375rem)] leading-[1.08] tracking-[-0.03em] text-encre">
                    {vedette.titre}
                  </h2>
                  <p className="mt-4.5 max-w-[48ch] text-[1.0625rem] leading-[1.6] text-prose">
                    {vedette.resume}
                  </p>
                  <span className="mt-7 inline-flex items-center gap-2.5 text-[0.96875rem] text-primaire transition-[color] duration-[220ms] group-hover:text-primaire-fonce">
                    {contenu.lire}
                    <Fleche />
                  </span>
                </div>
              </Lien>
            </Apparition>
          ) : null}

          <div className="mt-[clamp(3rem,6vw,5.25rem)]">
            {liste.length > 0 ? (
              <div
                role="group"
                aria-label={contenu.entete.intitule}
                className="flex flex-wrap gap-2"
              >
                {onglets.map((libelle, indice) => {
                  const actif = indice === filtre
                  return (
                    <button
                      key={libelle}
                      type="button"
                      aria-pressed={actif}
                      onClick={() => setFiltre(indice)}
                      // Le design pose 34 px de haut ; sous 768 px la cible
                      // tactile passe devant, et `e2e/adaptation.spec.ts`
                      // l'exige.
                      className={classes(
                        'min-h-11.5 min-w-11.5 cursor-pointer rounded-liste px-4 etiquette text-[0.625rem] whitespace-nowrap transition-colors duration-200 md:min-h-[2.125rem] md:min-w-0 md:px-[0.8125rem]',
                        FOCUS,
                        actif ? 'bg-primaire text-white' : 'bg-primaire/7 text-encre-2',
                      )}
                    >
                      {libelle}
                    </button>
                  )
                })}
              </div>
            ) : null}

            {visibles.length === 0 ? (
              <p className="max-w-[52ch] py-10 text-[1.0625rem] text-encre-2">{contenu.vide}</p>
            ) : (
              <ul className="mt-6 border-t border-trait">
                {visibles.map((article, indice) => (
                  <li key={article.identifiant} className="min-w-0">
                    <Apparition delai={delaiDeGrille(indice)}>
                      <CarteArticle
                        article={article}
                        langue={langue}
                        deLecture={contenu.deLecture}
                      />
                    </Apparition>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Apparition className="mt-[clamp(3rem,6vw,5rem)]">
            <div className="flex flex-wrap items-center gap-6 rounded-panneau bg-primaire/5 p-[clamp(1.75rem,3vw,2.75rem)]">
              <div className="min-w-0 grow basis-100">
                <h2 className="font-titre text-[clamp(1.125rem,1.7vw,1.4375rem)] leading-[1.12] tracking-[-0.02em] text-encre">
                  {contenu.suite.titre}
                </h2>
                <p className="mt-3 max-w-[56ch] text-[1rem] leading-[1.6] text-prose">
                  {contenu.suite.texte}
                </p>
              </div>
              <BoutonPage
                vers={chemin(langue, 'contact')}
                libelle={contenu.suite.cta}
                variante="vert"
                className="shrink-0"
              />
            </div>
          </Apparition>
        </div>
      </section>
    </>
  )
}
