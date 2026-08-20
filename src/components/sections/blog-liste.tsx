import Link from 'next/link'

import { dateFormatee } from '@/content/dates'
import { cheminArticle } from '@/content/langues'
import type { Langue } from '@/content/langues'
import { PHOTOS } from '@/content/photos'
import type { Article, Contenu } from '@/content/types'
import { Apparition } from '@/components/shared/apparition'
import { Carte } from '@/components/shared/carte'
import { delaiDeGrille } from '@/components/shared/decalage'
import { Section } from '@/components/shared/section'
import { Visuel } from '@/components/shared/visuel'

/**
 * WEB-15 — l'index du blog.
 *
 * L'état vide est rendu et non seulement prévu : le retour client demande la
 * structure avant le contenu, et une liste vide qui n'affiche rien se lit comme
 * une page cassée.
 *
 * Un seul lien par carte, posé sur le titre, puis étendu à toute la carte par
 * un pseudo-élément. C'est ce qui donne une grande cible tactile sans que le
 * nom accessible du lien devienne « Lire l'article » — répété trois fois, il ne
 * dirait plus où l'on va. La mention visible est donc décorative.
 */
export function BlogListe({
  contenu,
  articles,
  langue,
}: {
  contenu: Contenu['blog']
  articles: readonly Article[]
  langue: Langue
}) {
  return (
    <Section titreId="titre-blog-liste" fond="fond-2" bloc dessous="fond">
      {/* Le h1 de la page porte déjà le titre : celui-ci nomme la liste. */}
      <h2 id="titre-blog-liste" className="sr-only">
        {contenu.titre}
      </h2>

      {articles.length === 0 ? (
        <p className="py-10 text-center font-description text-[1.0625rem] text-encre-2">
          {contenu.vide}
        </p>
      ) : (
        <ul className="grid gap-7 [&>*]:min-w-0 md:auto-rows-fr md:grid-cols-2 xl:grid-cols-3">
          {articles.map((article, indice) => (
            <li key={article.identifiant} className="min-w-0">
              <Apparition delai={delaiDeGrille(indice)} className="h-full">
                <Carte as="article" className="relative flex h-full flex-col p-3 pb-8">
                  <Visuel
                    ratio="projet"
                    photo={PHOTOS.blog[article.identifiant]}
                    tailles="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    prioritaire={indice === 0}
                  />
                  <div className="flex flex-1 flex-col gap-3.5 px-5 pt-7">
                    <p className="font-description text-[0.8125rem] tracking-[0.04em] text-encre-2 uppercase">
                      {contenu.publieLe} <time dateTime={article.date}>{dateFormatee(article.date, langue)}</time>
                    </p>
                    <h3 className="font-titre text-[1.375rem] leading-[1.15] font-medium tracking-[-0.03em] text-encre">
                      <Link
                        href={cheminArticle(langue, article.identifiant)}
                        className="hover:text-primaire after:absolute after:inset-0 after:rounded-carte focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primaire"
                      >
                        {article.titre}
                      </Link>
                    </h3>
                    <p className="font-description text-[0.97rem] leading-[1.6] text-encre-2">
                      {article.resume}
                    </p>
                    <p
                      aria-hidden
                      className="mt-auto pt-4 font-description text-[0.9375rem] font-medium text-primaire"
                    >
                      {contenu.lire}
                    </p>
                  </div>
                </Carte>
              </Apparition>
            </li>
          ))}
        </ul>
      )}
    </Section>
  )
}
