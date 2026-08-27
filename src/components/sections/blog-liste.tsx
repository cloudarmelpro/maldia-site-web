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
import { IntituleSection } from '@/components/shared/intitule-section'
import { Lien } from '@/components/shared/lien'
import { CONTENEUR } from '@/components/shared/section'

const FOCUS = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-encre'

/**
 * L'en-tete est collant dans le flux, avec une marge basse negative egale a sa
 * hauteur : la premiere section commence donc SOUS lui. Sa hauteur mesuree est
 * publiee dans `--hauteur-en-tete` par `components/layout/en-tete` — la barre
 * grandit quand la navigation passe a la ligne, et une valeur en dur laisserait
 * alors l'intitule dessous. Le repli est accorde au `min-h-18` de la barre.
 */
const HAUT_HERO = 'pt-[calc(clamp(3.5rem,7vw,6.5rem)+var(--hauteur-en-tete,4.5rem))]'

/** Le retrait que le design pose sur ce qui suit un intitule, dans une colonne a gouttiere. */
const SOUS_INTITULE = '-mt-[1.125rem]'

/**
 * WEB-15 — l'index du blog, sur la version 2 du design « Site Maldia » : un
 * hero vert coiffe en bas, un article a la une, la grille des autres, puis
 * l'appel a nous ecrire.
 *
 * L'article le plus recent passe en vedette et sort de la grille. Les onglets
 * de filtre sont deduits des categories **de la grille**, pas de tous les
 * articles : sinon filtrer sur la categorie de la vedette laisserait une grille
 * vide.
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
        className={classes('rounded-b-coiffe bg-primaire pb-[clamp(3.5rem,7vw,6rem)]', HAUT_HERO)}
      >
        <div className={classes(CONTENEUR, 'flex flex-col gap-[clamp(1.5rem,3vw,2.5rem)]')}>
          <IntituleSection intitule={contenu.entete.intitule} registre="vert" />
          <h1
            id="titre-page"
            className={classes(
              'max-w-[20ch] font-titre text-[clamp(1.625rem,3.2vw,2.625rem)] leading-[1.04] tracking-[-0.045em] text-white',
              SOUS_INTITULE,
            )}
          >
            {contenu.entete.titre}
          </h1>
        </div>
      </section>

      {vedette ? (
        <section aria-labelledby="titre-une" className="bg-fond pt-[clamp(4rem,7vw,7rem)]">
          <div className={classes(CONTENEUR, 'flex flex-col gap-[clamp(1.5rem,3vw,2.5rem)]')}>
            <IntituleSection intitule={contenu.aLaUne} id="titre-une" />

            <Apparition className={SOUS_INTITULE}>
              <Lien
                href={cheminArticle(langue, vedette.identifiant)}
                className={classes(
                  'group flex flex-wrap items-center gap-[clamp(1.5rem,4vw,3.5rem)]',
                  FOCUS,
                )}
              >
                {/* alt vide : le titre de l'article suit immediatement. */}
                <span className="relative block h-[clamp(15rem,30vw,23.75rem)] min-w-0 grow basis-75 overflow-hidden rounded-carte-large bg-fond-2">
                  <Image
                    src={PHOTOS.blog[vedette.identifiant]}
                    alt=""
                    fill
                    preload
                    sizes="(min-width: 51.25rem) 50vw, 100vw"
                    className="object-cover"
                  />
                </span>

                <div className="flex min-w-0 grow basis-80 flex-col gap-3.5">
                  <MetaArticle
                    article={vedette}
                    langue={langue}
                    deLecture={contenu.deLecture}
                    className="etiquette-fine text-encre-2"
                  />
                  <h3 className="max-w-[22ch] font-titre text-[clamp(1.25rem,1.8vw,1.6875rem)] leading-[1.15] tracking-[-0.04em] text-encre">
                    {vedette.titre}
                  </h3>
                  <p className="max-w-[46ch] text-[0.90625rem] leading-[1.6] text-encre-2">
                    {vedette.resume}
                  </p>
                  <span className="mt-1.5 inline-flex items-center gap-2.5 etiquette text-[0.6875rem] tracking-[0.08em] text-primaire transition-[color] duration-[220ms] group-hover:text-primaire-fonce">
                    {contenu.lire}
                    <Fleche />
                  </span>
                </div>
              </Lien>
            </Apparition>
          </div>
        </section>
      ) : null}

      <section aria-labelledby="titre-grille" className="bg-fond py-[clamp(4rem,7vw,7rem)]">
        <div className={classes(CONTENEUR, 'flex flex-col gap-[clamp(1.5rem,3vw,2.5rem)]')}>
          {/* Le libelle de la grille est celui du lien de retour d'un article :
              les deux nomment la meme chose, et le cahier n'en donne pas de
              second. */}
          <IntituleSection intitule={contenu.retour} id="titre-grille" />

          <div className={classes('flex flex-col gap-[clamp(1.5rem,3vw,2.5rem)]', SOUS_INTITULE)}>
            {liste.length > 0 ? (
              <div role="group" aria-label={contenu.retour} className="flex flex-wrap gap-2">
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
              <p className="max-w-[52ch] text-[1.0625rem] text-encre-2">{contenu.vide}</p>
            ) : (
              <ul className="grid grid-cols-1 gap-3.5 duo:grid-cols-2 voies:grid-cols-3">
                {visibles.map((article, indice) => (
                  <li key={article.identifiant} className="flex min-w-0">
                    <Apparition delai={delaiDeGrille(indice)} className="flex min-w-0 grow">
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
        </div>
      </section>

      <section aria-labelledby="titre-suite" className="bg-fond pb-[clamp(4rem,7vw,7rem)]">
        <div className={CONTENEUR}>
          <Apparition>
            <div className="flex flex-wrap items-center justify-between gap-[clamp(1.25rem,3vw,2.5rem)] rounded-encart bg-primaire p-[clamp(1.625rem,3vw,2.5rem)]">
              <div className="flex min-w-0 grow basis-80 flex-col gap-3">
                <h2
                  id="titre-suite"
                  className="max-w-[26ch] font-titre text-[clamp(1.1875rem,1.7vw,1.625rem)] leading-[1.25] tracking-[-0.03em] text-white"
                >
                  {contenu.suite.titre}
                </h2>
                <p className="max-w-[48ch] text-[0.90625rem] leading-[1.6] text-white">
                  {contenu.suite.texte}
                </p>
              </div>
              <BoutonPage
                vers={chemin(langue, 'contact')}
                libelle={contenu.suite.cta}
                variante="blanc"
                ornement="fleche"
                className="shrink-0"
              />
            </div>
          </Apparition>
        </div>
      </section>
    </>
  )
}
