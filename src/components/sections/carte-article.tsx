import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'

import { dateFormatee } from '@/content/dates'
import { cheminArticle } from '@/content/langues'
import type { Langue } from '@/content/langues'
import { PHOTOS } from '@/content/photos'
import type { Article } from '@/content/types'
import { classes } from '@/components/shared/classes'
import { Lien } from '@/components/shared/lien'

const FOCUS = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-encre'

/**
 * La carte d'article du design, telle qu'elle parait sur l'index du blog et
 * sous un article.
 *
 * Une seule cible : l'article entier. Le titre n'est pas un lien separe, sinon
 * la carte porterait deux fois la meme destination — et le nom accessible de la
 * seconde serait indiscernable de la premiere.
 */
export function CarteArticle({
  article,
  langue,
  prioritaire = false,
}: {
  article: Article
  langue: Langue
  /** A poser sur la seule carte au-dessus de la ligne de flottaison. */
  prioritaire?: boolean
}) {
  return (
    <Lien
      href={cheminArticle(langue, article.identifiant)}
      className={classes(
        'flex h-full min-w-0 flex-col rounded-carte-large border border-trait bg-white p-3 transition-[transform,border-color] duration-[220ms] hover:-translate-y-0.75 hover:border-trait-4',
        FOCUS,
      )}
    >
      {/* alt vide : le titre de l'article suit immediatement. */}
      <span className="relative block min-h-44 overflow-hidden rounded-marque bg-[#eceeea]">
        <Image
          src={PHOTOS.blog[article.identifiant]}
          alt=""
          fill
          priority={prioritaire}
          sizes="(max-width: 620px) 100vw, (max-width: 900px) 50vw, 33vw"
          className="object-cover"
        />
      </span>

      <span className="flex min-w-0 flex-1 flex-col gap-2.75 px-2 pt-4.5 pb-2">
        <span className="flex flex-wrap items-center gap-2.25">
          <span className="rounded-[0.4375rem] bg-pilule px-2.25 py-1.25 etiquette-fine text-[0.625rem] tracking-[0.07em] text-encre-2">
            {article.categorie}
          </span>
          <span className="etiquette-fine text-[0.625rem] tracking-[0.07em] text-encre-3">
            {article.duree}
          </span>
        </span>
        <span className="block font-titre text-[1.0625rem] leading-[1.25] font-medium tracking-[-0.03em] text-encre">
          {article.titre}
        </span>
        <span className="block text-[0.8125rem] leading-[1.5] text-encre-2">{article.resume}</span>
        <span className="mt-auto flex items-center justify-between gap-2.5 border-t border-trait-2 pt-3.25 etiquette-fine text-[0.625rem] tracking-[0.07em] text-encre-3">
          <time dateTime={article.date}>{dateFormatee(article.date, langue)}</time>
          <span
            aria-hidden
            className="grid size-6.5 shrink-0 place-items-center rounded-pilule border border-trait text-encre"
          >
            <ArrowUpRight className="size-3" />
          </span>
        </span>
      </span>
    </Lien>
  )
}
