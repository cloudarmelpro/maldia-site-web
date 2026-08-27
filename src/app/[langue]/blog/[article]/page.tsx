import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { articleParIdentifiant, ARTICLES, autresArticles } from '@/content/articles'
import { LANGUES } from '@/content/langues'
import type { Langue } from '@/content/langues'
import { metadonnees } from '@/content/metadonnees'
import type { Article } from '@/content/types'
import { Gabarit } from '@/components/layout/gabarit'
import { BlogArticle } from '@/components/sections/blog-article'

import { resoudre } from '../../resoudre'

/**
 * Les deux segments sont produits ici, par le bas.
 *
 * La generation par le haut ferait executer cette fonction une fois par langue
 * pour un resultat identique : les identifiants d'article sont communs aux deux
 * langues, c'est ce qui permet au selecteur de langue de mener au meme article.
 */
export function generateStaticParams(): Array<{ langue: Langue; article: string }> {
  return LANGUES.flatMap((langue) =>
    ARTICLES[langue].map((article) => ({ langue, article: article.identifiant })),
  )
}

function resoudreArticle(langue: Langue, identifiant: string): Article {
  const article = articleParIdentifiant(langue, identifiant)
  if (!article) notFound()
  return article
}

export async function generateMetadata({
  params,
}: PageProps<'/[langue]/blog/[article]'>): Promise<Metadata> {
  const { langue: brut, article: identifiant } = await params
  const { langue, contenu } = resoudre(brut)
  const article = resoudreArticle(langue, identifiant)

  return metadonnees(
    langue,
    { page: 'blog', article: article.identifiant },
    {
      titre: `${article.titre} | ${contenu.commun.enTete.marque}`,
      description: article.resume,
      openGraph: { titre: article.titre, description: article.resume },
    },
  )
}

/** WEB-15 — le gabarit d'article. */
export default async function PageArticle({ params }: PageProps<'/[langue]/blog/[article]'>) {
  const { langue: brut, article: identifiant } = await params
  const { langue, contenu } = resoudre(brut)
  const article = resoudreArticle(langue, identifiant)

  return (
    <Gabarit langue={langue} page="blog" article={article.identifiant} contenu={contenu}>
      <BlogArticle
        article={article}
        autres={autresArticles(langue, article.identifiant)}
        contenu={contenu}
        langue={langue}
      />
    </Gabarit>
  )
}
