import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import type { ReactNode } from 'react'

import { dateFormatee } from '@/content/dates'
import { chemin } from '@/content/langues'
import type { Langue } from '@/content/langues'
import { PHOTOS } from '@/content/photos'
import type { Article, Contenu } from '@/content/types'
import { CarteArticle } from '@/components/sections/carte-article'
import { Apparition } from '@/components/shared/apparition'
import { BarreProgression } from '@/components/shared/barre-progression'
import { Bouton } from '@/components/shared/bouton'
import { classes } from '@/components/shared/classes'
import { delaiDeGrille } from '@/components/shared/decalage'
import { Lien } from '@/components/shared/lien'
import { Pilule } from '@/components/shared/pilule'
import { CONTENEUR, GRILLE_INTITULE, Section } from '@/components/shared/section'

const FOCUS = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-encre'

/** L'ancre d'une section, par rang d'apparition. */
function ancre(rang: number) {
  return `section-${rang + 1}`
}

/**
 * WEB-15 — le gabarit d'article, sur le design « Article Maldia ».
 *
 * Le sommaire est **déduit** des blocs `titre` du corps, dans leur ordre : une
 * section renommée renomme son entrée, une section déplacée déplace son lien.
 * Écrit à côté du corps, il finirait par pointer vers un titre disparu.
 *
 * Les ancres sont numérotées par rang et non tirées du texte : un titre
 * reformulé ne casse alors pas un lien déjà partagé vers `#section-2`.
 *
 * L'en-tête et le pied du site sont ceux de l'accueil — le design de l'article
 * propose les siens, écartés sur décision du client. L'en-tête étant
 * transparent, la bande nuit lui rend son fond.
 */
export function BlogArticle({
  article,
  autres,
  contenu,
  langue,
  enTete,
}: {
  article: Article
  /** Les autres articles, pour la section « dans la même série ». */
  autres: readonly Article[]
  contenu: Contenu
  langue: Langue
  enTete: ReactNode
}) {
  const { blog } = contenu

  // Le sommaire, et la table des rangs qui donne son ancre à chaque titre.
  const titres = article.corps.flatMap((bloc, position) =>
    bloc.type === 'titre' ? [{ texte: bloc.texte, position }] : [],
  )
  const rangDuTitre = new Map(titres.map((titre, rang) => [titre.position, rang]))

  return (
    <>
      <div className="bg-nuit pb-6.5">{enTete}</div>
      <BarreProgression />

      <article className="bg-fond pt-[clamp(2.125rem,3.6vw,3.5rem)] pb-[clamp(3.5rem,6vw,6rem)]">
        <div className={CONTENEUR}>
          <Lien
            href={chemin(langue, 'blog')}
            className={classes(
              'inline-flex min-h-11 items-center gap-2.25 etiquette text-[0.6875rem] text-encre-2 transition-[color] hover:text-encre',
              FOCUS,
            )}
          >
            <ArrowLeft aria-hidden className="size-3.5" />
            {blog.retour}
          </Lien>

          <div className={classes('mt-[clamp(1.375rem,2.4vw,2.125rem)]', GRILLE_INTITULE)}>
            <Apparition>
              <Pilule intitule={article.categorie} registre="clair" />
            </Apparition>

            <div className="flex flex-col gap-[clamp(1.625rem,2.8vw,2.5rem)]">
              <Apparition>
                <div className="flex flex-col items-start gap-5 large:flex-row large:items-end large:justify-between large:gap-[clamp(1.5rem,3vw,3rem)]">
                  <h1
                    id="titre-page"
                    className="max-w-[24ch] font-titre text-[clamp(1.875rem,3.4vw,3.5rem)] leading-[1.04] tracking-[-0.05em] text-encre"
                  >
                    {article.titre}
                  </h1>
                  <p className="max-w-[26ch] shrink-0 text-[0.875rem] leading-[1.6] text-encre-2 large:text-right">
                    {article.duree} {blog.deLecture} ·{' '}
                    <time dateTime={article.date}>{dateFormatee(article.date, langue)}</time>
                  </p>
                </div>
              </Apparition>

              <div className="flex flex-wrap items-center gap-4 border-y border-trait-2 py-4">
                <span className="flex items-center gap-2.75">
                  {/* Décoratif : les articles ne sont pas signés par une personne. */}
                  <span aria-hidden className="size-8.5 shrink-0 rounded-pilule bg-[#dfe6e0]" />
                  <span className="flex flex-col">
                    <strong className="text-[0.84375rem] font-semibold tracking-[-0.01em] text-encre">
                      {blog.auteur.nom}
                    </strong>
                    <span className="etiquette-fine text-[0.625rem] tracking-[0.07em] text-encre-3">
                      {blog.auteur.lieu}
                    </span>
                  </span>
                </span>
                <ul className="ml-auto flex flex-wrap gap-1.75">
                  {article.etiquettes.map((etiquette) => (
                    <li
                      key={etiquette}
                      className="rounded-[0.4375rem] bg-fond-2 px-2.5 py-1.5 etiquette-fine text-[0.625rem] tracking-[0.07em] text-encre-2"
                    >
                      {etiquette}
                    </li>
                  ))}
                </ul>
              </div>

              {/* alt vide : le titre et le chapeau de l'article portent l'information. */}
              <div className="relative min-h-[clamp(13.75rem,26vw,25rem)] overflow-hidden rounded-carte-large bg-[#eceeea]">
                <Image
                  src={PHOTOS.blog[article.identifiant]}
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 1400px) 100vw, 1400px"
                  className="object-cover"
                />
              </div>

              <div className="grid grid-cols-1 items-start gap-[clamp(1.75rem,3vw,3rem)] frise:grid-cols-[minmax(0,13.75rem)_minmax(0,1fr)]">
                {titres.length > 0 ? (
                  <aside className="flex flex-col gap-3 rounded-carte border border-trait bg-fond-2 p-5 frise:sticky frise:top-6">
                    <span className="etiquette-fine text-[0.625rem] tracking-[0.1em] text-encre-3">
                      {blog.sommaire}
                    </span>
                    <nav aria-label={blog.sommaire}>
                      <ul className="flex flex-col gap-2.25">
                        {titres.map((titre, rang) => (
                          <li key={titre.position}>
                            <a
                              href={`#${ancre(rang)}`}
                              className={classes(
                                'flex min-h-11 items-center text-[0.8125rem] leading-[1.4] text-encre-2 transition-[color] hover:text-primaire',
                                FOCUS,
                              )}
                            >
                              {titre.texte}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </aside>
                ) : null}

                <div className="flex min-w-0 max-w-[68ch] flex-col gap-6.5">
                  {article.corps.map((bloc, position) => {
                    if (bloc.type === 'chapeau') {
                      return (
                        <p
                          key={position}
                          className="font-titre text-[clamp(1.0625rem,1.5vw,1.3125rem)] leading-[1.5] font-medium tracking-[-0.02em] text-encre"
                        >
                          {bloc.texte}
                        </p>
                      )
                    }

                    if (bloc.type === 'titre') {
                      return (
                        <h2
                          key={position}
                          id={ancre(rangDuTitre.get(position) ?? 0)}
                          className="font-titre text-[clamp(1.25rem,1.7vw,1.625rem)] leading-[1.2] tracking-[-0.035em] text-encre"
                        >
                          {bloc.texte}
                        </h2>
                      )
                    }

                    if (bloc.type === 'citation') {
                      return (
                        <figure key={position} className="border-l-2 border-primaire pl-4.5">
                          <blockquote className="font-titre text-[clamp(1.0625rem,1.5vw,1.25rem)] leading-[1.45] font-medium tracking-[-0.025em] text-encre">
                            {bloc.texte}
                          </blockquote>
                        </figure>
                      )
                    }

                    if (bloc.type === 'liste') {
                      return (
                        <ul key={position} className="flex flex-col gap-2.75">
                          {bloc.items.map((item) => (
                            <li key={item} className="flex gap-3">
                              <span
                                aria-hidden
                                className="mt-2 size-1.25 shrink-0 rounded-pilule bg-primaire"
                              />
                              <span className="text-[0.96875rem] leading-[1.65] text-prose">
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )
                    }

                    return (
                      <p key={position} className="text-[0.96875rem] leading-[1.7] text-prose">
                        {bloc.texte}
                      </p>
                    )
                  })}

                  <Apparition>
                    <div className="mt-1.5 flex flex-wrap items-center gap-5 rounded-carte-large bg-encre p-[clamp(1.375rem,2.2vw,1.875rem)]">
                      <span className="flex min-w-0 flex-1 basis-65 flex-col gap-2">
                        <strong className="font-titre text-[clamp(1.0625rem,1.5vw,1.3125rem)] leading-[1.25] tracking-[-0.03em] text-white">
                          {blog.appelArticle.titre}
                        </strong>
                        <span className="text-[0.84375rem] leading-[1.55] text-sur-sombre">
                          {blog.appelArticle.texte}
                        </span>
                      </span>
                      <Bouton
                        destination="rendezVous"
                        libelle={blog.appelArticle.cta}
                        variante="lime"
                        ornement="fleche"
                        className="shrink-0"
                      />
                    </div>
                  </Apparition>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {autres.length > 0 ? (
        <Section titreId="titre-serie" fond="fond-2" className="!py-[clamp(3rem,5vw,5rem)]">
          <div className={GRILLE_INTITULE}>
            <Apparition>
              <Pilule intitule={blog.serie.intitule} registre="gris" />
            </Apparition>

            <div className="flex flex-col gap-[clamp(1.5rem,2.6vw,2.25rem)]">
              <Apparition>
                <h2
                  id="titre-serie"
                  className="max-w-[22ch] font-titre text-[clamp(1.5rem,2.4vw,2.375rem)] leading-[1.1] tracking-[-0.045em] text-encre"
                >
                  {blog.serie.titre}
                </h2>
              </Apparition>

              <ul className="grid grid-cols-1 gap-[clamp(0.875rem,1.4vw,1.25rem)] duo:grid-cols-2 frise:grid-cols-3">
                {autres.map((autre, indice) => (
                  <li key={autre.identifiant} className="min-w-0">
                    <Apparition delai={delaiDeGrille(indice)} className="h-full">
                      <CarteArticle article={autre} langue={langue} />
                    </Apparition>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>
      ) : null}
    </>
  )
}
