import type { Metadata } from 'next'

import { LANGUES } from '@/content/langues'
import type { Langue } from '@/content/langues'
import { metadonnees } from '@/content/metadonnees'
import { Gabarit } from '@/components/layout/gabarit'
import { AProposContenu } from '@/components/sections/a-propos-contenu'
import { AProposFonctionnement } from '@/components/sections/a-propos-fonctionnement'
import { AProposReperes } from '@/components/sections/a-propos-reperes'

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

/**
 * WEB-6 — a propos, sur le design « A propos Maldia ».
 *
 * Le design a son propre en-tete, clair et colle, et sa propre cloture. Les deux
 * sont ecartes : le site garde ceux de l'accueil, pour ne pas qu'une page sur six
 * ait une coquille a elle. L'en-tete de l'accueil est transparent — la bande nuit
 * ci-dessous lui rend le fond que la photo du hero lui donne ailleurs.
 *
 * Le `h1` reste ou le design le met : dans la premiere section claire, sans bande
 * sombre. La page n'a donc pas de `TitrePage`.
 */
export default async function PageAPropos({ params }: PageProps<'/[langue]/a-propos'>) {
  const { langue, contenu } = resoudre((await params).langue)
  const { commun, aPropos } = contenu

  return (
    <Gabarit langue={langue} page="a-propos" contenu={contenu}>
        <>
          <AProposContenu contenu={aPropos} />
          <AProposFonctionnement contenu={aPropos.fonctionnement} langue={langue} />
          <AProposReperes contenu={aPropos.reperes} arguments={commun.pourquoi.liste} />
        </>
    </Gabarit>
  )
}
