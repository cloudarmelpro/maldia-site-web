import Image from 'next/image'

import { dateFormatee } from '@/content/dates'
import { cheminArticle } from '@/content/langues'
import type { Langue } from '@/content/langues'
import { PHOTOS } from '@/content/photos'
import type { Article } from '@/content/types'
import { classes } from '@/components/shared/classes'
import { Lien } from '@/components/shared/lien'

const FOCUS = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-encre'

/**
 * La ligne de metadonnees d'un article : la date, puis la duree de lecture.
 *
 * Elle parait sur l'index, en tete d'article et sous un article. Ecrite trois
 * fois, elle finirait par ne plus mettre le point median au meme endroit.
 */
export function MetaArticle({
  article,
  langue,
  deLecture,
  className,
}: {
  article: Article
  langue: Langue
  /** « de lecture », accole a la duree — `contenu.blog.deLecture`. */
  deLecture: string
  className?: string
}) {
  return (
    <span className={classes('text-[0.84375rem] text-encre-2', className)}>
      <time dateTime={article.date}>{dateFormatee(article.date, langue)}</time> · {article.duree}{' '}
      {deLecture}
    </span>
  )
}

/**
 * La ligne d'article de l'index du blog : vignette, categorie, titre et resume,
 * metadonnees en fin de ligne.
 *
 * Une seule cible : l'article entier. Le titre n'est pas un lien separe, sinon
 * la ligne porterait deux fois la meme destination — et le nom accessible de la
 * seconde serait indiscernable de la premiere.
 */
export function CarteArticle({
  article,
  langue,
  deLecture,
}: {
  article: Article
  langue: Langue
  deLecture: string
}) {
  return (
    <Lien
      href={cheminArticle(langue, article.identifiant)}
      className={classes(
        'flex flex-wrap items-center gap-7 border-b border-trait py-6.5 transition-[background-color] duration-[220ms] hover:bg-primaire/5',
        FOCUS,
      )}
    >
      {/* alt vide : le titre de l'article suit immediatement. */}
      <span className="relative block h-23 w-33 shrink-0 overflow-hidden rounded-bloc bg-fond-2">
        <Image
          src={PHOTOS.blog[article.identifiant]}
          alt=""
          fill
          sizes="132px"
          className="object-cover"
        />
      </span>

      <span className="w-30 shrink-0 etiquette text-[0.71875rem] tracking-[0.1em] text-encre-2">
        {article.categorie}
      </span>

      <div className="min-w-0 grow basis-80">
        <h2 className="font-titre text-[clamp(1.125rem,1.8vw,1.375rem)] font-light leading-[1.2] tracking-[-0.02em] text-encre">
          {article.titre}
        </h2>
        <p className="mt-2.5 max-w-[52ch] text-[0.96875rem] leading-[1.55] text-encre-2">
          {article.resume}
        </p>
      </div>

      <MetaArticle article={article} langue={langue} deLecture={deLecture} className="shrink-0" />
    </Lien>
  )
}
