import Image from 'next/image'

import { dateFormatee } from '@/content/dates'
import { cheminArticle } from '@/content/langues'
import type { Langue } from '@/content/langues'
import { PHOTOS } from '@/content/photos'
import type { Article } from '@/content/types'
import { FOCUS } from '@/components/shared/focus'
import { classes } from '@/components/shared/classes'
import { Lien } from '@/components/shared/lien'

/**
 * La ligne de metadonnees d'un article : la categorie s'il y a lieu, la date,
 * puis la duree de lecture.
 *
 * Elle parait sur l'index, en tete d'article et sous un article. Ecrite quatre
 * fois, elle finirait par ne plus mettre le point median au meme endroit.
 *
 * La typographie vient de l'appelant : les quatre emplacements du design ne
 * posent ni la meme taille ni la meme couleur, et une taille par defaut ici
 * entrerait en conflit avec celle qu'on lui passe — entre deux utilitaires de
 * meme propriete, c'est l'ordre du CSS engendre qui tranche, pas l'ordre des
 * classes ecrites.
 */
export function MetaArticle({
  article,
  langue,
  deLecture,
  avecCategorie = false,
  className,
}: {
  article: Article
  langue: Langue
  /** « de lecture », accole a la duree — `contenu.blog.deLecture`. */
  deLecture: string
  /** Le design prefixe la ligne de la categorie sur les cartes et en tete d'article. */
  avecCategorie?: boolean
  className?: string
}) {
  return (
    <span className={className}>
      {avecCategorie ? `${article.categorie} · ` : null}
      <time dateTime={article.date}>{dateFormatee(article.date, langue)}</time> · {article.duree}{' '}
      {deLecture}
    </span>
  )
}

/**
 * La carte d'article de la grille du blog : la photo, puis la categorie, la
 * date, le titre et le resume.
 *
 * Une seule cible : la carte entiere. Le titre n'est pas un lien separe, sinon
 * la carte porterait deux fois la meme destination — et le nom accessible de la
 * seconde serait indiscernable de la premiere.
 *
 * Le titre est un `h3` : la grille est introduite par le `h2` de sa section.
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
      className={classes('group flex w-full min-w-0 flex-col items-stretch gap-4.5', FOCUS)}
    >
      {/* alt vide : le titre de l'article suit immediatement. */}
      <span className="relative block h-[clamp(10.625rem,17vw,14.0625rem)] w-full overflow-hidden rounded-carte bg-fond-2">
        <Image
          src={PHOTOS.blog[article.identifiant]}
          alt=""
          fill
          sizes="(min-width: 51.25rem) 33vw, (min-width: 38.75rem) 50vw, 100vw"
          className="object-cover"
        />
      </span>

      <div className="flex min-w-0 flex-col gap-3">
        <MetaArticle
          article={article}
          langue={langue}
          deLecture={deLecture}
          avecCategorie
          className="etiquette-fine tracking-[0.1em] text-encre-2"
        />
        <h3 className="font-titre text-[clamp(1.0625rem,1.35vw,1.25rem)] leading-[1.2] tracking-[-0.03em] text-encre transition-[color] duration-[220ms] group-hover:text-primaire">
          {article.titre}
        </h3>
        <p className="text-[0.84375rem] leading-[1.55] text-encre-2">{article.resume}</p>
      </div>
    </Lien>
  )
}
