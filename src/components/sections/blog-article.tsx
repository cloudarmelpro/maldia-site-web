import Image from 'next/image'

import { chemin, cheminArticle } from '@/content/langues'
import type { Langue } from '@/content/langues'
import { PHOTOS } from '@/content/photos'
import type { Article, Contenu } from '@/content/types'
import { MetaArticle } from '@/components/sections/carte-article'
import { FOCUS, FOCUS_CLAIR } from '@/components/shared/focus'
import { Apparition } from '@/components/shared/apparition'
import { Bouton } from '@/components/shared/bouton'
import { classes } from '@/components/shared/classes'
import { delaiDeGrille } from '@/components/shared/decalage'
import { Fleche } from '@/components/shared/fleche'
import { Lien } from '@/components/shared/lien'
import { CONTENEUR } from '@/components/shared/section'

/**
 * L'en-tete est collant dans le flux, avec une marge basse negative egale a sa
 * hauteur : la premiere section commence donc SOUS lui, et le sommaire s'y cale
 * a son tour. Sa hauteur mesuree est publiee dans `--hauteur-en-tete` par
 * `components/layout/en-tete` — la barre grandit quand la navigation passe a la
 * ligne, et une valeur en dur laisserait alors le fil de retour dessous. Le
 * repli est accorde au `min-h-18` de la barre.
 */
const HAUT_OUVERTURE = 'pt-[calc(clamp(3rem,6vw,5.5rem)+var(--hauteur-en-tete,4.5rem))]'
const SOMMAIRE_COLLANT = 'frise:sticky frise:top-[calc(var(--hauteur-en-tete,4.5rem)+1.5rem)]'

/** L'ancre d'une section, par rang d'apparition. */
function ancre(rang: number) {
  return `section-${rang + 1}`
}

/**
 * WEB-15 — le gabarit d'article, sur la version 2 du design « Site Maldia » :
 * un hero vert coiffe en bas, la photo pleine largeur, puis le sommaire collant
 * a cote du corps.
 *
 * Le sommaire est **deduit** des blocs `titre` du corps, dans leur ordre : une
 * section renommee renomme son entree, une section deplacee deplace son lien.
 * Ecrit a cote du corps, il finirait par pointer vers un titre disparu.
 *
 * Les ancres sont numerotees par rang et non tirees du texte : un titre
 * reformule ne casse alors pas un lien deja partage vers `#section-2`.
 *
 * Les blocs du corps portent leur propre marge haute plutot qu'un `gap` de
 * parent, comme le design : c'est ce qui laisse les marges se fondre entre deux
 * blocs voisins. Le conteneur est un `flow-root` pour que la marge du premier
 * bloc ne sorte pas de la colonne.
 */
export function BlogArticle({
  article,
  autres,
  contenu,
  langue,
}: {
  article: Article
  /** Les autres articles, pour la section « dans la meme serie ». */
  autres: readonly Article[]
  contenu: Contenu
  langue: Langue
}) {
  const { blog } = contenu

  // Le sommaire, et la table des rangs qui donne son ancre a chaque titre.
  const titres = article.corps.flatMap((bloc, position) =>
    bloc.type === 'titre' ? [{ texte: bloc.texte, position }] : [],
  )
  const rangDuTitre = new Map(titres.map((titre, rang) => [titre.position, rang]))

  return (
    <>
      <section
        aria-labelledby="titre-page"
        className={classes(
          'bg-primaire pb-[clamp(3rem,6vw,5.25rem)]',
          HAUT_OUVERTURE,
        )}
      >
        <div className={classes(CONTENEUR, 'flex flex-col gap-[clamp(1.25rem,2.4vw,1.875rem)]')}>
          <Lien
            href={chemin(langue, 'blog')}
            className={classes(
              'inline-flex w-fit min-h-11 items-center gap-2.5 etiquette text-[0.6875rem] tracking-[0.1em] text-white underline-offset-4 hover:underline',
              FOCUS_CLAIR,
            )}
          >
            <Fleche sens="gauche" />
            {blog.retour}
          </Lien>

          <h1
            id="titre-page"
            className="max-w-[22ch] font-titre text-[clamp(1.625rem,3.2vw,2.625rem)] leading-[1.04] tracking-[-0.045em] text-balance text-white"
          >
            {article.titre}
          </h1>

          <MetaArticle
            article={article}
            langue={langue}
            deLecture={blog.deLecture}
            avecCategorie
            className="etiquette text-[0.6875rem] tracking-[0.09em] text-white"
          />
        </div>
      </section>

      <section className="bg-fond pt-[clamp(2.5rem,5vw,4.5rem)] pb-[clamp(4rem,8vw,7rem)]">
        <div className={CONTENEUR}>
          {/* alt vide : le titre et le chapeau de l'article portent l'information. */}
          <div className="relative h-[clamp(15rem,32vw,26.25rem)] overflow-hidden rounded-panneau bg-fond-2">
            <Image
              src={PHOTOS.blog[article.identifiant]}
              alt=""
              fill
              preload
              sizes="(max-width: 67.5rem) 100vw, 67.5rem"
              className="object-cover"
            />
          </div>

          <div className="mt-[clamp(3rem,6vw,5.25rem)] grid grid-cols-1 items-start gap-[clamp(2rem,5vw,5rem)] frise:grid-cols-[minmax(0,13.75rem)_minmax(0,1fr)]">
            <aside className={classes('flex flex-col gap-3.5', SOMMAIRE_COLLANT)}>
              {titres.length > 0 ? (
                <>
                  <p className="etiquette text-[0.6875rem] tracking-[0.1em] text-encre-2">
                    {blog.sommaire}
                  </p>
                  <nav aria-label={blog.sommaire}>
                    {/* Aucun ecart, a aucune largeur : c'est l'interligne qui
                        fait le rythme, comme dans la signature. */}
                    <ul className="flex flex-col">
                      {titres.map((titre, rang) => (
                        <li key={titre.position}>
                          <a
                            href={`#${ancre(rang)}`}
                            // L'interligne est celui du corps d'article, 1,7 :
                            // le sommaire respire comme le texte qu'il annonce.
                            //
                            // A 14 px, cela fait 23,8 px, et le `min-h-6` porte
                            // la cible a 24 — le minimum de WCAG 2.5.8 (AA),
                            // atteint pile. Le reste du site tient les 44 de
                            // 2.5.5 (AAA), d'ou `data-cible-reduite` : la suite
                            // d'ecrans mesure celle-ci contre 24 et non 44.
                            data-cible-reduite
                            className={classes(
                              'flex min-h-6 items-center text-[0.875rem] leading-[1.7] text-encre-2 transition-[color] duration-[220ms] hover:text-primaire',
                              FOCUS,
                            )}
                          >
                            {titre.texte}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </>
              ) : null}

              {/* Les deux lignes se lisent comme une signature, pas comme deux
                  paragraphes : hauteur de ligne resserree, et l'interligne par
                  defaut du corps ne s'applique pas ici. */}
              <div className={classes(titres.length > 0 && 'mt-1.5 border-t border-trait pt-3.5')}>
                <p className="text-[0.875rem] leading-[1.35] text-encre">{blog.auteur.nom}</p>
                <p className="text-[0.8125rem] leading-[1.35] text-encre-2">{blog.auteur.lieu}</p>
              </div>
            </aside>

            <article className="min-w-0 flow-root">
              {article.corps.map((bloc, position) => {
                if (bloc.type === 'chapeau') {
                  return (
                    <p
                      key={position}
                      className="max-w-[40ch] pb-3.5 font-titre text-[clamp(1.125rem,1.8vw,1.375rem)] font-extralight leading-[1.45] text-encre"
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
                      className="mt-8.5 font-titre text-[clamp(1.375rem,2.2vw,1.75rem)] leading-[1.2] tracking-[-0.02em] text-encre"
                    >
                      {bloc.texte}
                    </h2>
                  )
                }

                if (bloc.type === 'citation') {
                  return (
                    <blockquote
                      key={position}
                      className="mt-7 max-w-[48ch] rounded-encart bg-primaire/5 px-8 py-7 font-titre text-[clamp(1.1875rem,1.9vw,1.5rem)] font-extralight leading-[1.45] text-encre"
                    >
                      {bloc.texte}
                    </blockquote>
                  )
                }

                if (bloc.type === 'liste') {
                  return (
                    <ul key={position} className="mt-4.5 flex flex-col gap-2.5">
                      {bloc.items.map((item) => (
                        <li
                          key={item}
                          className="flex max-w-[62ch] items-baseline gap-3.5 text-[1.0625rem] leading-[1.65] text-prose"
                        >
                          <span aria-hidden className="size-1.5 shrink-0 rounded-pilule bg-primaire" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )
                }

                return (
                  <p
                    key={position}
                    // 57ch et non 66 : l'unite `ch` vaut la largeur du « 0 », bien plus
                    // large que la lettre moyenne en Jost Light. `66ch` achetait
                    // 87 caracteres reels — mesure —, la ou l'optimum de lecture
                    // est a 75.
                    className="mt-4.5 max-w-[57ch] text-[1.09375rem] leading-[1.7] text-prose"
                  >
                    {bloc.texte}
                  </p>
                )
              })}

              <Apparition className="mt-11">
                <div className="flex flex-wrap items-center justify-between gap-5.5 rounded-carte-large bg-primaire p-[clamp(1.25rem,2.2vw,1.75rem)]">
                  <div className="flex min-w-0 grow basis-65 flex-col gap-2.25">
                    <h2 className="max-w-[26ch] font-titre text-[clamp(1.0625rem,1.4vw,1.3125rem)] leading-[1.25] tracking-[-0.03em] text-white">
                      {blog.appelArticle.titre}
                    </h2>
                    <p className="max-w-[44ch] text-[0.84375rem] leading-[1.55] text-white">
                      {blog.appelArticle.texte}
                    </p>
                  </div>
                  <Bouton
                    destination="rendezVous"
                    libelle={blog.appelArticle.cta}
                    variante="blanc"
                    taille="compacte"
                    ornement="fleche"
                    className="shrink-0"
                  />
                </div>
              </Apparition>

              {/* Un `div` et non un `section` : la sonde de fond de l'en-tete
                  retient le premier `section` sous elle, et une section imbriquee
                  sans aplat lui rendrait un fond transparent. */}
              {autres.length > 0 ? (
                <div className="mt-11">
                  <h2 className="etiquette text-[0.71875rem] tracking-[0.12em] text-encre-2">
                    {blog.serie.intitule} · {blog.serie.titre}
                  </h2>
                  <ul className="mt-5.5 border-t border-trait">
                    {autres.map((autre, indice) => (
                      <li key={autre.identifiant} className="min-w-0">
                        <Apparition delai={delaiDeGrille(indice)}>
                          <Lien
                            href={cheminArticle(langue, autre.identifiant)}
                            className={classes(
                              'flex flex-wrap items-center gap-5 border-b border-trait py-5 transition-[background-color] duration-[220ms] hover:bg-primaire/5',
                              FOCUS,
                            )}
                          >
                            <span className="min-w-0 grow basis-65 text-[1.1875rem] leading-[1.3] text-encre">
                              {autre.titre}
                            </span>
                            <MetaArticle
                              article={autre}
                              langue={langue}
                              deLecture={blog.deLecture}
                              className="shrink-0 text-[0.84375rem] text-encre-2"
                            />
                          </Lien>
                        </Apparition>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </article>
          </div>
        </div>
      </section>
    </>
  )
}
