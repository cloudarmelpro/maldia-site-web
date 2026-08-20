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
 * Le design du blog a son propre en-tete, clair et colle, et sa propre cloture
 * courte. Les deux sont ecartes : le site garde ceux de l'accueil, pour ne pas
 * qu'une page sur six ait une coquille a elle.
 *
 * L'en-tete de l'accueil est transparent — il est fait pour se poser sur la
 * photo du hero. La bande nuit ci-dessous lui rend ce fond, faute de quoi son
 * texte blanc se retrouverait sur la premiere section blanche du blog.
 *
 * Le `h1` de la page reste ou le design le met : dans cette premiere section
 * blanche, et non dans la bande sombre comme sur les autres pages interieures.
 */
export default async function PageBlog({ params }: PageProps<'/[langue]/blog'>) {
  const { langue, contenu } = resoudre((await params).langue)

  return (
    <Gabarit langue={langue} page="blog" contenu={contenu}>
      {(enTete) => (
        <>
          <div className="bg-nuit pb-6.5">{enTete}</div>
          <BlogListe contenu={contenu.blog} articles={articlesTriees(langue)} langue={langue} />
        </>
      )}
    </Gabarit>
  )
}
