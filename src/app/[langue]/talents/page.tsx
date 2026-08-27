import type { Metadata } from 'next'

import { LANGUES } from '@/content/langues'
import type { Langue } from '@/content/langues'
import { metadonnees } from '@/content/metadonnees'
import { Gabarit } from '@/components/layout/gabarit'
import { TalentsDeroule } from '@/components/sections/talents-deroule'
import { TalentsDomaines } from '@/components/sections/talents-domaines'
import { TalentsHero } from '@/components/sections/talents-hero'
import { TalentsPrincipes } from '@/components/sections/talents-principes'

import { resoudre } from '../resoudre'

export function generateStaticParams(): Array<{ langue: Langue }> {
  return LANGUES.map((langue) => ({ langue }))
}

export async function generateMetadata({
  params,
}: PageProps<'/[langue]/talents'>): Promise<Metadata> {
  const { langue, contenu } = resoudre((await params).langue)
  return metadonnees(langue, { page: 'talents' }, contenu.talents.meta)
}

/**
 * WEB-3 et WEB-5 — la page destinee aux candidats a Madagascar, sur le design
 * « Site Maldia ».
 *
 * Aucun argument de cout ni de delai ici : ils s'adressent a l'entreprise qui
 * achete, pas a la personne qui postule.
 *
 * Les bandes alternent le vert et le clair, et la derniere est claire : le bloc
 * d'appel du gabarit est vert et coiffe d'arrondis.
 */
export default async function PageTalents({ params }: PageProps<'/[langue]/talents'>) {
  const { langue, contenu } = resoudre((await params).langue)
  const { commun, talents } = contenu

  return (
    <Gabarit langue={langue} page="talents" contenu={contenu}>
      <>
        <TalentsHero contenu={talents.entete} cta={talents.encart.cta} />
        <TalentsPrincipes principes={talents.principes} encart={talents.encart} />
        <TalentsDomaines contenu={talents.domaines} profils={commun.profils.liste} />
        <TalentsDeroule contenu={talents.deroule} />
      </>
    </Gabarit>
  )
}
