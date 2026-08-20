import type { Metadata } from 'next'

import { LANGUES } from '@/content/langues'
import type { Langue } from '@/content/langues'
import { metadonnees } from '@/content/metadonnees'
import { Gabarit } from '@/components/layout/gabarit'
import { AProposContenu } from '@/components/sections/a-propos-contenu'
import { Methode } from '@/components/sections/methode'
import { TitrePage } from '@/components/sections/titre-page'
import { Bouton } from '@/components/shared/bouton'

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
  const { commun, aPropos } = contenu

  return (
    <Gabarit langue={langue} page="a-propos" contenu={contenu}>
      {(enTete) => (
        <>
          <TitrePage
            intitule={aPropos.entete.intitule}
            titre={aPropos.entete.titre}
            description={aPropos.entete.description}
            mention={aPropos.entete.mention}
            enTete={enTete}
          >
            <Bouton
              destination="rendezVous"
              libelle={aPropos.entete.cta}
              variante="lime"
              ornement="fleche"
            />
          </TitrePage>
          <AProposContenu contenu={contenu} />
          <Methode contenu={commun.methode} titreId="titre-methode" />
        </>
      )}
    </Gabarit>
  )
}
