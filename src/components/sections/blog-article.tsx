import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import type { ReactNode } from 'react'

import { dateFormatee } from '@/content/dates'
import { chemin } from '@/content/langues'
import type { Langue } from '@/content/langues'
import { PHOTOS } from '@/content/photos'
import type { Article, Contenu } from '@/content/types'
import { Apparition } from '@/components/shared/apparition'
import { Pilule } from '@/components/shared/pilule'
import { CONTENEUR, GRILLE_INTITULE, Section } from '@/components/shared/section'
import { Lien } from '@/components/shared/lien'

const FOCUS = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'

/**
 * WEB-15 — le gabarit d'article.
 *
 * L'en-tete sombre reprend celui d'une page interieure ; la photo de l'article
 * y sert de fond, assombrie par le meme degrade que le hero. C'est le seul
 * endroit du site ou une photo autre que celle du hero passe en fond, et c'est
 * la seule ou une image identifie la page.
 *
 * Le corps est plafonne a 68 caracteres par ligne. Sans plafond, un paragraphe
 * atteint pres de 300 caracteres par ligne sur un grand ecran, et l'oeil ne
 * retrouve plus la ligne suivante.
 */
export function BlogArticle({
  article,
  contenu,
  langue,
  enTete,
}: {
  article: Article
  contenu: Contenu
  langue: Langue
  enTete: ReactNode
}) {
  const { blog } = contenu

  return (
    <>
      <section
        aria-labelledby="titre-page"
        className="relative flex flex-col overflow-hidden bg-nuit text-white"
      >
        <div aria-hidden className="absolute inset-0 overflow-hidden">
          <Image
            src={PHOTOS.blog[article.identifiant]}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(8_20_15/0.78)_0%,rgb(8_20_15/0.62)_40%,rgb(8_20_15/0.88)_100%)]" />
        </div>

        {enTete}

        <div
          className={`${CONTENEUR} relative z-3 pt-[clamp(3rem,6vw,5.5rem)] pb-[clamp(3rem,6vw,5.5rem)]`}
        >
          <div className={GRILLE_INTITULE}>
            <div className="flex flex-col gap-5">
              <Pilule intitule={blog.entete.intitule} registre="sombre" />
              <Lien
                href={chemin(langue, 'blog')}
                className={`inline-flex min-h-12 items-center gap-2 etiquette text-sur-sombre transition-[color] hover:text-white ${FOCUS}`}
              >
                <ArrowLeft aria-hidden className="size-3.5" />
                {blog.retour}
              </Lien>
            </div>

            <div className="flex flex-col gap-6">
              <p className="etiquette-fine tracking-[0.1em] text-sur-sombre-2">
                {blog.publieLe}{' '}
                <time dateTime={article.date}>{dateFormatee(article.date, langue)}</time>
              </p>
              <h1
                id="titre-page"
                className="max-w-[24ch] font-titre text-[clamp(2rem,4.2vw,3.75rem)] leading-[1.04] tracking-[-0.05em] text-white"
              >
                {article.titre}
              </h1>
              <p className="max-w-[52ch] text-[clamp(0.9375rem,1.15vw,1.0625rem)] leading-[1.6] text-sur-sombre">
                {article.resume}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Section titreId="titre-corps-article" fond="fond">
        <div className={GRILLE_INTITULE}>
          <span />
          <div className="flex flex-col gap-6">
            <h2 id="titre-corps-article" className="sr-only">
              {article.titre}
            </h2>
            {article.corps.map((paragraphe) => (
              <Apparition key={paragraphe}>
                <p className="max-w-[68ch] text-[clamp(0.9375rem,1.15vw,1.0625rem)] leading-[1.7] text-encre-2">
                  {paragraphe}
                </p>
              </Apparition>
            ))}
          </div>
        </div>
      </Section>
    </>
  )
}
