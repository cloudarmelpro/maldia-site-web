import type { Metadata } from 'next'

import { LANGUES } from '@/content/langues'
import type { Langue } from '@/content/langues'
import { metadonnees } from '@/content/metadonnees'
import { Gabarit } from '@/components/layout/gabarit'
import { Base } from '@/components/sections/base'
import { Methode } from '@/components/sections/methode'
import { Pourquoi } from '@/components/sections/pourquoi'
import { TitrePage } from '@/components/sections/titre-page'
import { Bouton } from '@/components/shared/bouton'

import { resoudre } from '../resoudre'

export function generateStaticParams(): Array<{ langue: Langue }> {
  return LANGUES.map((langue) => ({ langue }))
}

export async function generateMetadata({
  params,
}: PageProps<'/[langue]/services'>): Promise<Metadata> {
  const { langue, contenu } = resoudre((await params).langue)
  return metadonnees(langue, { page: 'services' }, contenu.services.meta)
}

/**
 * WEB-4 — la page destinee aux entreprises.
 *
 * Le retour client supprime la page « Entreprise » separee : c'est celle-ci qui
 * leur parle. L'argumentaire chiffre y passe en haut, avant la methode — une
 * entreprise decide de lire la suite sur le cout et le delai.
 */
export default async function PageServices({ params }: PageProps<'/[langue]/services'>) {
  const { langue, contenu } = resoudre((await params).langue)
  const { commun, services } = contenu

  return (
    <Gabarit langue={langue} page="services" contenu={contenu}>
      {(enTete) => (
        <>
          <TitrePage
            intitule={services.entete.intitule}
            titre={services.entete.titre}
            description={services.entete.description}
            mention={services.entete.mention}
            enTete={enTete}
          >
            <Bouton
              destination="rendezVous"
              libelle={services.entete.cta}
              variante="lime"
              ornement="fleche"
            />
          </TitrePage>
          <Pourquoi contenu={commun.pourquoi} marches={commun.marches} titreId="titre-pourquoi" />
          <Methode contenu={commun.methode} titreId="titre-methode" />
          <Base contenu={commun.base} langue={langue} titreId="titre-base" />
        </>
      )}
    </Gabarit>
  )
}
