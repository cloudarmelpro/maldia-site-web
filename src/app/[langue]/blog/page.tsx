import type { Metadata } from 'next'

import { articlesTriees } from '@/content/articles'
import { LANGUES } from '@/content/langues'
import type { Langue } from '@/content/langues'
import { metadonnees } from '@/content/metadonnees'
import { Gabarit } from '@/components/layout/gabarit'
import { BlogListe } from '@/components/sections/blog-liste'

import { resoudre } from '../resoudre'

export function generateStaticParams(): Array<{ langue: Langue }> {
  return LANGUES.map((langue) => ({ langue }))
}

export async function generateMetadata({ params }: PageProps<'/[langue]/blog'>): Promise<Metadata> {
  const { langue, contenu } = resoudre((await params).langue)
  return metadonnees(langue, { page: 'blog' }, contenu.blog.meta)
}

/**
 * WEB-15 — l'index du blog.
 *
 * Le `h1` vit dans le hero vert de la page, comme sur les autres pages
 * interieures du design ; l'en-tete, le bloc Contact et le pied viennent du
 * gabarit.
 */
export default async function PageBlog({ params }: PageProps<'/[langue]/blog'>) {
  const { langue, contenu } = resoudre((await params).langue)

  return (
    <Gabarit langue={langue} page="blog" contenu={contenu}>
      <BlogListe contenu={contenu.blog} articles={articlesTriees(langue)} langue={langue} />
    </Gabarit>
  )
}
