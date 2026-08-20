import Image from 'next/image'

import { dateFormatee } from '@/content/dates'
import { cheminArticle } from '@/content/langues'
import type { Langue } from '@/content/langues'
import { PHOTOS } from '@/content/photos'
import type { Article, Contenu } from '@/content/types'
import { Apparition } from '@/components/shared/apparition'
import { delaiDeGrille } from '@/components/shared/decalage'
import { Pilule } from '@/components/shared/pilule'
import { GRILLE_INTITULE, Section } from '@/components/shared/section'
import { Lien } from '@/components/shared/lien'

/**
 * WEB-15 — l'index du blog, dans le registre du design.
 *
 * L'etat vide est rendu et non seulement prevu : le retour client demande la
 * structure avant le contenu, et une liste vide qui n'affiche rien se lit comme
 * une page cassee.
 *
 * Un seul lien par carte, pose sur le titre puis etendu a toute la carte par un
 * pseudo-element. C'est ce qui donne une grande cible tactile sans que le nom
 * accessible du lien devienne « Lire l'article » — repete trois fois, il ne
 * dirait plus ou l'on va. La mention visible est donc decorative.
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
    <Section titreId="titre-blog-liste" fond="fond">
      <div className={GRILLE_INTITULE}>
        <Apparition>
          <Pilule intitule={contenu.entete.intitule} registre="clair" />
        </Apparition>

        <div>
          {/* Le h1 de la page porte deja le titre : celui-ci nomme la liste. */}
          <h2 id="titre-blog-liste" className="sr-only">
            {contenu.entete.titre}
          </h2>

          {articles.length === 0 ? (
            <p className="py-10 text-[1.0625rem] text-encre-2">{contenu.vide}</p>
          ) : (
            <ul className="grid grid-cols-1 gap-[clamp(0.875rem,1.4vw,1.25rem)] duo:grid-cols-2 voies:grid-cols-3">
              {articles.map((article, indice) => (
                <li key={article.identifiant} className="min-w-0">
                  <Apparition delai={delaiDeGrille(indice)} className="h-full">
                    <article className="relative flex h-full flex-col overflow-hidden rounded-carte border border-trait bg-white">
                      {/* alt vide : le titre de l'article suit immediatement. */}
                      <div className="relative aspect-[16/10] w-full bg-fond-2">
                        <Image
                          src={PHOTOS.blog[article.identifiant]}
                          alt=""
                          fill
                          priority={indice === 0}
                          sizes="(max-width: 620px) 100vw, (max-width: 820px) 50vw, 33vw"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col gap-3 p-[clamp(1.125rem,1.7vw,1.5rem)]">
                        <p className="etiquette-fine text-encre-3">
                          {contenu.publieLe}{' '}
                          <time dateTime={article.date}>{dateFormatee(article.date, langue)}</time>
                        </p>
                        <h3 className="font-titre text-[clamp(1.125rem,1.4vw,1.375rem)] leading-[1.15] tracking-[-0.03em] text-encre">
                          <Lien
                            href={cheminArticle(langue, article.identifiant)}
                            // min-h-11 : la carte entiere est cliquable par le
                            // pseudo-element, mais la boite mesuree est celle du
                            // lien, et un titre d'une seule ligne y tombait a
                            // 20 px de haut.
                            className="flex min-h-11 items-center transition-[color] hover:text-primaire after:absolute after:inset-0 after:rounded-carte focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-encre"
                          >
                            {article.titre}
                          </Lien>
                        </h3>
                        <p className="text-[0.875rem] leading-[1.6] text-encre-2">
                          {article.resume}
                        </p>
                        <p aria-hidden className="mt-auto pt-3 etiquette text-primaire">
                          {contenu.lire}
                        </p>
                      </div>
                    </article>
                  </Apparition>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Section>
  )
}
