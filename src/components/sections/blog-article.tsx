import Image from 'next/image'

import { chemin, cheminArticle } from '@/content/langues'
import type { Langue } from '@/content/langues'
import { PHOTOS } from '@/content/photos'
import type { Article, Contenu } from '@/content/types'
import { MetaArticle } from '@/components/sections/carte-article'
import { Apparition } from '@/components/shared/apparition'
import { Bouton } from '@/components/shared/bouton'
import { classes } from '@/components/shared/classes'
import { delaiDeGrille } from '@/components/shared/decalage'
import { Fleche } from '@/components/shared/fleche'
import { Lien } from '@/components/shared/lien'
import { Pilule } from '@/components/shared/pilule'
import { CONTENEUR } from '@/components/shared/section'

const FOCUS = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-encre'

/**
 * L'en-tete est collant dans le flux, avec une marge basse negative egale a sa
 * hauteur : la premiere section commence donc SOUS lui, et le sommaire s'y cale
 * a son tour. Sa hauteur mesuree est publiee dans `--hauteur-en-tete` par
 * `components/layout/en-tete` — la barre grandit quand la navigation passe a la
 * ligne, et une valeur en dur laisserait alors le fil de retour dessous. Le
 * repli est accorde au `min-h-18` de la barre.
 */
const HAUT_OUVERTURE = 'pt-[calc(clamp(2.5rem,5vw,4.5rem)+var(--hauteur-en-tete,4.5rem))]'
const SOMMAIRE_COLLANT = 'frise:sticky frise:top-[calc(var(--hauteur-en-tete,4.5rem)+1.5rem)]'

/** L'ancre d'une section, par rang d'apparition. */
function ancre(rang: number) {
  return `section-${rang + 1}`
}

/**
 * WEB-15 — le gabarit d'article, sur le design « Site Maldia ».
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
        className={classes('bg-fond', HAUT_OUVERTURE)}
      >
        <div className={CONTENEUR}>
          <Lien
            href={chemin(langue, 'blog')}
            className={classes(
              'inline-flex min-h-11 items-center gap-2.5 text-[0.875rem] text-encre-2 transition-[color] duration-[220ms] hover:text-encre',
              FOCUS,
            )}
          >
            <Fleche sens="gauche" />
            {blog.retour}
          </Lien>

          <div className="mt-8.5 flex flex-wrap items-center gap-3.5">
            <Pilule intitule={article.categorie} registre="clair" />
            <MetaArticle article={article} langue={langue} deLecture={blog.deLecture} />
          </div>

          <h1
            id="titre-page"
            className="mt-6.5 max-w-[24ch] font-titre text-[clamp(1.5rem,2.9vw,2.3125rem)] leading-[1.02] tracking-[-0.035em] text-balance text-encre"
          >
            {article.titre}
          </h1>

          {/* alt vide : le titre et le chapeau de l'article portent l'information. */}
          <div className="relative mt-10 h-[clamp(15rem,34vw,27.5rem)] overflow-hidden rounded-panneau bg-fond-2">
            <Image
              src={PHOTOS.blog[article.identifiant]}
              alt=""
              fill
              preload
              sizes="(max-width: 1080px) 100vw, 1080px"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-fond pt-[clamp(3rem,6vw,5.25rem)] pb-[clamp(4rem,8vw,7rem)]">
        <div
          className={classes(
            CONTENEUR,
            'grid grid-cols-1 items-start gap-[clamp(2rem,5vw,5rem)] frise:grid-cols-[minmax(0,13.75rem)_minmax(0,1fr)]',
          )}
        >
          <aside
            className={classes(
              'flex flex-col gap-3 rounded-carte bg-primaire/5 p-5',
              SOMMAIRE_COLLANT,
            )}
          >
            {titres.length > 0 ? (
              <>
                <p className="etiquette text-[0.71875rem] tracking-[0.12em] text-encre-2">
                  {blog.sommaire}
                </p>
                <nav aria-label={blog.sommaire}>
                  <ul className="flex flex-col gap-3">
                    {titres.map((titre, rang) => (
                      <li key={titre.position}>
                        <a
                          href={`#${ancre(rang)}`}
                          // 44 px sous 768 px, 24 au-dessus. Le plancher tactile
                          // ne vaut que pour le doigt ; a la souris, 24 px est le
                          // minimum des WCAG, et 44 espacait les entrees.
                          className={classes(
                            'flex min-h-11 items-center text-[0.90625rem] leading-[1.4] text-encre-2 transition-[color] duration-[220ms] hover:text-primaire md:min-h-6',
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

            <div className={classes(titres.length > 0 && 'border-t border-trait pt-4')}>
              <p className="text-[0.90625rem] text-encre">{blog.auteur.nom}</p>
              <p className="mt-1 text-[0.84375rem] text-encre-2">{blog.auteur.lieu}</p>
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
                    className="mt-11 font-titre text-[clamp(1.375rem,2.2vw,1.75rem)] leading-[1.2] tracking-[-0.02em] text-encre"
                  >
                    {bloc.texte}
                  </h2>
                )
              }

              if (bloc.type === 'citation') {
                return (
                  <blockquote
                    key={position}
                    className="mt-9 max-w-[48ch] rounded-encart bg-primaire/5 px-8 py-7 font-titre text-[clamp(1.1875rem,1.9vw,1.5rem)] font-extralight leading-[1.45] text-encre"
                  >
                    {bloc.texte}
                  </blockquote>
                )
              }

              if (bloc.type === 'liste') {
                return (
                  <ul key={position} className="mt-6.5 flex flex-col gap-3.5">
                    {bloc.items.map((item) => (
                      <li
                        key={item}
                        className="flex max-w-[62ch] items-baseline gap-3.5 text-[1.0625rem] leading-[1.65] text-prose"
                      >
                        <span
                          aria-hidden
                          className="size-1.5 shrink-0 rounded-pilule bg-primaire"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                )
              }

              return (
                <p
                  key={position}
                  className="mt-5 max-w-[66ch] text-[1.09375rem] leading-[1.7] text-prose"
                >
                  {bloc.texte}
                </p>
              )
            })}

            <Apparition className="mt-14">
              <div className="flex flex-wrap items-center gap-6 rounded-panneau bg-primaire p-[clamp(1.625rem,3vw,2.375rem)]">
                <div className="min-w-0 grow basis-80">
                  <h2 className="font-titre text-[clamp(1.125rem,1.8vw,1.375rem)] leading-[1.15] tracking-[-0.02em] text-white">
                    {blog.appelArticle.titre}
                  </h2>
                  <p className="mt-3 max-w-[46ch] text-[0.96875rem] leading-[1.6] text-white/92">
                    {blog.appelArticle.texte}
                  </p>
                </div>
                <Bouton
                  destination="rendezVous"
                  libelle={blog.appelArticle.cta}
                  variante="blanc"
                  className="shrink-0"
                />
              </div>
            </Apparition>

            {/* Un `div` et non un `section` : la sonde de fond de l'en-tete
                retient le premier `section` sous elle, et une section imbriquee
                sans aplat lui rendrait un fond transparent. */}
            {autres.length > 0 ? (
              <div className="mt-14">
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
                            className="shrink-0"
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
      </section>
    </>
  )
}
