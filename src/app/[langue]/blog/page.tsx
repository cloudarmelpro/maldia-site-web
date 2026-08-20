import type { Metadata } from 'next'

import { articlesTriees } from '@/content/articles'
import { LANGUES } from '@/content/langues'
import type { Langue } from '@/content/langues'
import { metadonnees } from '@/content/metadonnees'
import { Gabarit } from '@/components/layout/gabarit'
import { BlogListe } from '@/components/sections/blog-liste'
import { Cloture } from '@/components/sections/cloture'
import { TitrePage } from '@/components/sections/titre-page'

import { resoudre } from '../resoudre'

export function generateStaticParams(): Array<{ langue: Langue }> {
  return LANGUES.map((langue) => ({ langue }))
}

export async function generateMetadata({ params }: PageProps<'/[langue]/blog'>): Promise<Metadata> {
  const { langue, contenu } = resoudre((await params).langue)
  return metadonnees(langue, { page: 'blog' }, contenu.blog.meta)
}

/** WEB-15 — l'index du blog. */
export default async function PageBlog({ params }: PageProps<'/[langue]/blog'>) {
  const { langue, contenu } = resoudre((await params).langue)

  return (
    <Gabarit langue={langue} page="blog" contenu={contenu}>
      <TitrePage titre={contenu.blog.titre} description={contenu.blog.description} />
      <BlogListe contenu={contenu.blog} articles={articlesTriees(langue)} langue={langue} />
      <Cloture contenu={contenu.commun.cloture} />
    </Gabarit>
  )
}
