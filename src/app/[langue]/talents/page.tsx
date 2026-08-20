import type { Metadata } from 'next'

import { LANGUES } from '@/content/langues'
import type { Langue } from '@/content/langues'
import { metadonnees } from '@/content/metadonnees'
import { Gabarit } from '@/components/layout/gabarit'
import { Cloture } from '@/components/sections/cloture'
import { Opportunites } from '@/components/sections/opportunites'
import { PourLesTalents } from '@/components/sections/pour-les-talents'
import { Profils } from '@/components/sections/profils'
import { TitrePage } from '@/components/sections/titre-page'
import { Bouton } from '@/components/shared/bouton'

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
 * WEB-3 et WEB-5 — la page destinee aux candidats a Madagascar.
 *
 * Aucun argument de cout ni de delai ici : ils s'adressent a l'entreprise qui
 * achete, pas a la personne qui postule.
 */
export default async function PageTalents({ params }: PageProps<'/[langue]/talents'>) {
  const { langue, contenu } = resoudre((await params).langue)
  const { entete, opportunites, cartes, criteres, profils } = contenu.talents

  return (
    <Gabarit langue={langue} page="talents" contenu={contenu}>
      <TitrePage titre={entete.titre} description={entete.description} mention={entete.mention}>
        <Bouton destination="candidature" libelle={entete.cta} />
      </TitrePage>
      <Opportunites contenu={opportunites} />
      <PourLesTalents cartes={cartes} criteres={criteres} />
      <Profils contenu={profils} />
      <Cloture contenu={contenu.commun.cloture} />
    </Gabarit>
  )
}
