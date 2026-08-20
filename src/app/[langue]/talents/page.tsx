import type { Metadata } from 'next'

import { LANGUES } from '@/content/langues'
import type { Langue } from '@/content/langues'
import { metadonnees } from '@/content/metadonnees'
import { Gabarit } from '@/components/layout/gabarit'
import { Parcours } from '@/components/sections/parcours'
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
  const { commun, talents } = contenu

  return (
    <Gabarit langue={langue} page="talents" contenu={contenu}>
      {(enTete) => (
        <>
          <TitrePage
            intitule={talents.entete.intitule}
            titre={talents.entete.titre}
            description={talents.entete.description}
            mention={talents.entete.mention}
            enTete={enTete}
          >
            <Bouton
              destination="candidature"
              libelle={talents.entete.cta}
              variante="lime"
              ornement="fleche-montante"
            />
          </TitrePage>
          <Parcours contenu={commun.parcours} titreId="titre-parcours" />
          <Profils contenu={commun.profils} titreId="titre-profils" />
        </>
      )}
    </Gabarit>
  )
}
