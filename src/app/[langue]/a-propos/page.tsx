import type { Metadata } from 'next'

import { LANGUES } from '@/content/langues'
import type { Langue } from '@/content/langues'
import { metadonnees } from '@/content/metadonnees'
import { Gabarit } from '@/components/layout/gabarit'
import { AProposContenu } from '@/components/sections/a-propos-contenu'
import { Cloture } from '@/components/sections/cloture'
import { Marches } from '@/components/sections/marches'
import { TitrePage } from '@/components/sections/titre-page'

import { resoudre } from '../resoudre'

export function generateStaticParams(): Array<{ langue: Langue }> {
  return LANGUES.map((langue) => ({ langue }))
}

export async function generateMetadata({
  params,
}: PageProps<'/[langue]/a-propos'>): Promise<Metadata> {
  const { langue, contenu } = resoudre((await params).langue)
  return metadonnees(langue, { page: 'a-propos' }, contenu.aPropos.meta)
}

/** WEB-6 — a propos. */
export default async function PageAPropos({ params }: PageProps<'/[langue]/a-propos'>) {
  const { langue, contenu } = resoudre((await params).langue)

  return (
    <Gabarit langue={langue} page="a-propos" contenu={contenu}>
      <TitrePage titre={contenu.aPropos.titre} description={contenu.aPropos.description} />
      <AProposContenu contenu={contenu} />
      <Marches contenu={contenu.commun.marches} titreId="titre-marches" />
      <Cloture contenu={contenu.commun.cloture} />
    </Gabarit>
  )
}
