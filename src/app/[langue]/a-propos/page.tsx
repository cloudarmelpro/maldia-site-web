import type { Metadata } from 'next'

import { LANGUES } from '@/content/langues'
import type { Langue } from '@/content/langues'
import { metadonnees } from '@/content/metadonnees'
import { Gabarit } from '@/components/layout/gabarit'
import { AProposContenu } from '@/components/sections/a-propos-contenu'
import { AProposFonctionnement } from '@/components/sections/a-propos-fonctionnement'
import { AProposHero } from '@/components/sections/a-propos-hero'
import { AProposPrincipes } from '@/components/sections/a-propos-principes'
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
 * WEB-6 — a propos, sur le design « Site Maldia » v2.
 *
 * Le hero vert porte le `h1`, et l'en-tete du gabarit repose dessus. Le bloc
 * d'appel et le pied ferment la page, eux aussi rendus par le gabarit.
 */
export default async function PageAPropos({ params }: PageProps<'/[langue]/a-propos'>) {
  const { langue, contenu } = resoudre((await params).langue)
  const { commun, aPropos } = contenu

  return (
    <Gabarit langue={langue} page="a-propos" contenu={contenu}>
      <AProposHero contenu={aPropos.entete} />
      <AProposContenu chapeau={aPropos.chapeau} suite={aPropos.chapeauSuite} />
      <AProposPrincipes intitule={aPropos.principesIntitule} liste={aPropos.principes} />
      <AProposFonctionnement contenu={aPropos.fonctionnement} langue={langue} />
      <AProposReperes contenu={aPropos.reperes} arguments={commun.pourquoi.liste} />
    </Gabarit>
  )
}
