'use client'

import Image from 'next/image'
import { useState } from 'react'

import { cheminArticle } from '@/content/langues'
import type { Langue } from '@/content/langues'
import { PHOTOS } from '@/content/photos'
import type { Article, Contenu } from '@/content/types'
import { CarteArticle } from '@/components/sections/carte-article'
import { Apparition } from '@/components/shared/apparition'
import { Bouton } from '@/components/shared/bouton'
import { classes } from '@/components/shared/classes'
import { delaiDeGrille } from '@/components/shared/decalage'
import { Fleche } from '@/components/shared/fleche'
import { Lien } from '@/components/shared/lien'
import { Pilule } from '@/components/shared/pilule'
import { CONTENEUR, DECALAGE_CONTENU, GRILLE_INTITULE } from '@/components/shared/section'

const FOCUS = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-encre'

/**
 * WEB-15 — l'index du blog, dans la mise en page de « Blog Maldia ».
 *
 * Le `h1` de la page est ici : le blog n'a pas de bande d'en-tête sombre comme
 * les autres pages intérieures, son titre vit dans la première section blanche.
 *
 * L'article le plus récent passe en vedette et sort de la grille. Les onglets de
 * filtre sont déduits des catégories **de la grille**, pas de tous les articles :
 * sinon filtrer sur la catégorie de la vedette laisserait une grille vide.
 *
 * Une seule cible par carte, l'article entier : le titre n'est pas un lien
 * séparé, sinon la carte porterait deux fois la même destination.
 */
export function BlogListe({
  contenu,
  articles,
  langue,
}: {
  contenu: Contenu['blog']
  /** Triés du plus récent au plus ancien : le premier passe en vedette. */
  articles: readonly Article[]
  langue: Langue
}) {
  const [vedette, ...grille] = articles
  const categories = [...new Set(grille.map((article) => article.categorie))]
  const onglets = [contenu.filtreTout, ...categories]

  const [filtre, setFiltre] = useState(0)
  const visibles = filtre === 0 ? grille : grille.filter((a) => a.categorie === onglets[filtre])

  return (
    <>
      <section
        aria-labelledby="titre-page"
        className="bg-fond pt-[clamp(3rem,5.4vw,5.25rem)] pb-[clamp(2.125rem,3.6vw,3.25rem)]"
      >
        <div className={CONTENEUR}>
          <div className={GRILLE_INTITULE}>
            <Pilule intitule={contenu.entete.intitule} registre="clair" />

            <div className="flex flex-col gap-[clamp(1.75rem,3vw,2.75rem)]">
              <div className="flex flex-col items-start gap-5 large:flex-row large:items-end large:justify-between large:gap-[clamp(1.5rem,3vw,3rem)]">
                <h1
                  id="titre-page"
                  className="max-w-[22ch] font-titre text-[clamp(1.875rem,3.2vw,3.25rem)] leading-[1.06] tracking-[-0.05em] text-encre"
                >
                  {contenu.entete.titre}
                </h1>
                <p className="max-w-[30ch] shrink-0 text-[0.90625rem] leading-[1.6] text-encre-2 large:text-right">
                  {contenu.entete.description}
                </p>
              </div>

              {grille.length > 0 ? (
                <div role="group" aria-label={contenu.entete.intitule} className="flex flex-wrap gap-2">
                  {onglets.map((libelle, indice) => {
                    const actif = indice === filtre
                    return (
                      <button
                        key={libelle}
                        type="button"
                        aria-pressed={actif}
                        onClick={() => setFiltre(indice)}
                        className={classes(
                          'min-h-11 cursor-pointer rounded-bloc border px-4 etiquette text-[0.6875rem] whitespace-nowrap transition-[background-color,color,border-color]',
                          FOCUS,
                          actif
                            ? 'border-encre bg-encre text-white'
                            : 'border-trait bg-white text-encre-2',
                        )}
                      >
                        {libelle}
                      </button>
                    )
                  })}
                </div>
              ) : null}

              {vedette ? (
                <Apparition>
                  <Lien
                    href={cheminArticle(langue, vedette.identifiant)}
                    className={classes(
                      'grid grid-cols-1 gap-[clamp(1rem,1.6vw,1.5rem)] rounded-encart border border-trait bg-fond-2 p-[clamp(0.875rem,1.2vw,1rem)] transition-transform duration-[220ms] hover:-translate-y-0.5 voies:grid-cols-[minmax(0,46%)_minmax(0,1fr)]',
                      FOCUS,
                    )}
                  >
                    {/* alt vide : le titre de l'article suit immédiatement. */}
                    <span className="relative block min-h-[clamp(13.75rem,24vw,20rem)] overflow-hidden rounded-bloc bg-[#eceeea]">
                      <Image
                        src={PHOTOS.blog[vedette.identifiant]}
                        alt=""
                        fill
                        priority
                        sizes="(max-width: 820px) 100vw, 46vw"
                        className="object-cover"
                      />
                    </span>

                    <span className="flex min-w-0 flex-col gap-3.5 px-[clamp(0.625rem,1.4vw,1.125rem)] py-[clamp(0.625rem,1.4vw,1.375rem)]">
                      <span className="flex flex-wrap items-center gap-2.5">
                        <span className="rounded-etiquette bg-lime px-2.75 py-1.5 etiquette-fine text-[0.625rem] tracking-[0.08em] text-encre">
                          {contenu.aLaUne}
                        </span>
                        <span className="etiquette-fine tracking-[0.08em] text-encre-3">
                          {vedette.categorie} · {vedette.duree}
                        </span>
                      </span>
                      <span className="block max-w-[26ch] font-titre text-[clamp(1.3125rem,1.9vw,1.875rem)] leading-[1.14] font-medium tracking-[-0.04em] text-encre">
                        {vedette.titre}
                      </span>
                      <span className="block max-w-[44ch] text-[0.875rem] leading-[1.6] text-encre-2">
                        {vedette.resume}
                      </span>
                      <span className="mt-auto inline-flex items-center gap-2.25 etiquette text-[0.6875rem] text-encre">
                        {contenu.lire}
                        <Fleche />
                      </span>
                    </span>
                  </Lien>
                </Apparition>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="titre-blog-liste"
        className="bg-fond pb-[clamp(3.5rem,6vw,6rem)]"
      >
        <div className={CONTENEUR}>
          <h2 id="titre-blog-liste" className="sr-only">
            {contenu.entete.titre}
          </h2>

          {visibles.length === 0 ? (
            <p className={classes(DECALAGE_CONTENU, 'py-10 text-[1.0625rem] text-encre-2')}>
              {contenu.vide}
            </p>
          ) : (
            <ul
              className={classes(
                'grid grid-cols-1 gap-[clamp(0.875rem,1.4vw,1.25rem)] duo:grid-cols-2 large:grid-cols-3',
                DECALAGE_CONTENU,
              )}
            >
              {visibles.map((article, indice) => (
                <li key={article.identifiant} className="min-w-0">
                  <Apparition delai={delaiDeGrille(indice)} className="h-full">
                    <CarteArticle article={article} langue={langue} />
                  </Apparition>
                </li>
              ))}
            </ul>
          )}

          <Apparition>
            <div
              className={classes(
                'mt-[clamp(1.75rem,3vw,2.75rem)] flex flex-wrap items-center justify-between gap-5 rounded-carte-large border border-dashed border-trait-3 bg-fond-2 p-[clamp(1.375rem,2.2vw,2rem)]',
                DECALAGE_CONTENU,
              )}
            >
              <span className="flex min-w-0 flex-col gap-2">
                <strong className="text-[1.0625rem] tracking-[-0.03em] text-encre">
                  {contenu.suite.titre}
                </strong>
                <span className="max-w-[52ch] text-[0.84375rem] leading-[1.55] text-encre-2">
                  {contenu.suite.texte}
                </span>
              </span>
              <Bouton
                destination="rendezVous"
                libelle={contenu.suite.cta}
                variante="encre"
                taille="compacte"
                ornement="etoile"
                className="shrink-0"
              />
            </div>
          </Apparition>
        </div>
      </section>
    </>
  )
}
