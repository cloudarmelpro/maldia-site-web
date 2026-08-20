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
 * WEB-15 — l'index du blog, sur le design « Blog Maldia ».
 *
 * C'est la seule page dont l'en-tete est clair et colle, et la seule dont la
 * cloture est courte : les deux vont ensemble, l'en-tete colle rendant la
 * navigation du pied superflue. Elle n'a pas non plus de bande d'en-tete sombre
 * — son `h1` vit dans la premiere section blanche.
 */
export default async function PageBlog({ params }: PageProps<'/[langue]/blog'>) {
  const { langue, contenu } = resoudre((await params).langue)

  return (
    <Gabarit langue={langue} page="blog" contenu={contenu} registre="clair" cloture="blog">
      {(enTete) => (
        <>
          {enTete}
          <BlogListe contenu={contenu.blog} articles={articlesTriees(langue)} langue={langue} />
        </>
      )}
    </Gabarit>
  )
}
