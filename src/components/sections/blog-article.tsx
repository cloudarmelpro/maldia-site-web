import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import { dateFormatee } from '@/content/dates'
import { chemin } from '@/content/langues'
import type { Langue } from '@/content/langues'
import { PHOTOS } from '@/content/photos'
import type { Article, Contenu } from '@/content/types'
import { Apparition } from '@/components/shared/apparition'
import { Bouton, LienPastille } from '@/components/shared/bouton'
import { CONTENEUR, MESURE_PROSE, Section } from '@/components/shared/section'
import { Visuel } from '@/components/shared/visuel'

/**
 * WEB-15 — le gabarit d'article.
 *
 * Le `h1` de la page est ici, comme dans `TitrePage` : l'entrée est donc en CSS
 * et non en JS, sinon le titre serait rendu à `opacity: 0` dans le HTML
 * statique et n'apparaîtrait qu'à l'hydratation.
 *
 * Le corps est plafonné à la mesure de prose partagée. Sans elle, un paragraphe
 * atteint près de 300 caractères par ligne sur un grand écran, et l'œil ne
 * retrouve plus la ligne suivante.
 */
export function BlogArticle({
  article,
  contenu,
  langue,
}: {
  article: Article
  contenu: Contenu
  langue: Langue
}) {
  const { blog, commun } = contenu

  return (
    <>
      <section aria-labelledby="titre-page" className="bg-fond pt-12 pb-6 lg:pt-16">
        <div className={CONTENEUR}>
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center motion-safe:animate-entree-hero">
            <Link
              href={chemin(langue, 'blog')}
              className="inline-flex min-h-11 items-center gap-2 font-description text-[0.9375rem] text-encre-2 hover:text-primaire focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primaire"
            >
              <ArrowLeft aria-hidden className="size-4" />
              {blog.retour}
            </Link>

            <p className="font-description text-[0.8125rem] tracking-[0.04em] text-encre-2 uppercase">
              {blog.publieLe}{' '}
              <time dateTime={article.date}>{dateFormatee(article.date, langue)}</time>
            </p>

            {/* Le crénage négatif vient du @layer base : il ne vaut que pour h1 et h2. */}
            <h1
              id="titre-page"
              className="font-titre text-[2.125rem] leading-[1.06] font-normal text-balance text-encre sm:text-[2.75rem] lg:text-[3.375rem]"
            >
              {article.titre}
            </h1>

            <p
              className={`${MESURE_PROSE} font-description text-[1.0625rem] leading-[1.6] text-encre-2`}
            >
              {article.resume}
            </p>
          </div>

          <div className="mx-auto mt-12 w-full max-w-[900px]">
            <Visuel
              ratio="bandeau"
              photo={PHOTOS.blog[article.identifiant]}
              arrondi="rounded-[1.625rem]"
              tailles="(max-width: 960px) 100vw, 900px"
              prioritaire
            />
          </div>
        </div>
      </section>

      <Section titreId="titre-appel-article" fond="fond-2" bloc dessous="fond">
        <div className={`${MESURE_PROSE} mx-auto flex flex-col gap-6`}>
          {article.corps.map((paragraphe) => (
            <Apparition key={paragraphe}>
              <p className="font-description text-[1.0625rem] leading-[1.7] text-encre-2">
                {paragraphe}
              </p>
            </Apparition>
          ))}
        </div>

        <Apparition>
          <div className="mx-auto mt-16 flex max-w-[900px] flex-col items-center gap-6 rounded-carte-large bg-carte px-8 py-11 text-center">
            <h2
              id="titre-appel-article"
              className="max-w-[24ch] font-titre text-[1.75rem] leading-[1.12] font-normal text-balance text-encre sm:text-[2.125rem]"
            >
              {blog.appelArticle}
            </h2>
            <p
              className={`${MESURE_PROSE} font-description text-[0.97rem] leading-[1.6] text-encre-2`}
            >
              {commun.cloture.description}
            </p>
            <div className="mt-1 flex flex-wrap items-center justify-center gap-6">
              <Bouton destination="rendezVous" libelle={commun.cloture.ctaPrincipal} />
              <LienPastille destination="candidature" libelle={commun.cloture.ctaSecondaire} />
            </div>
          </div>
        </Apparition>
      </Section>
    </>
  )
}
