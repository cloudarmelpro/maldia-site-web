import type { Metadata } from 'next'

import { LANGUES } from '@/content/langues'
import type { Langue } from '@/content/langues'
import { metadonnees } from '@/content/metadonnees'
import { Gabarit } from '@/components/layout/gabarit'
import { Argumentaire } from '@/components/sections/argumentaire'
import { BandeauOutils } from '@/components/sections/bandeau-outils'
import { Cloture } from '@/components/sections/cloture'
import { Compteur } from '@/components/sections/compteur'
import { Deroulement } from '@/components/sections/deroulement'
import { Domaines } from '@/components/sections/domaines'
import { Marches } from '@/components/sections/marches'
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
 * leur parle. L'argumentaire chiffre y passe en haut, avant le deroulement —
 * une entreprise decide de lire la suite sur le cout et le delai.
 */
export default async function PageServices({ params }: PageProps<'/[langue]/services'>) {
  const { langue, contenu } = resoudre((await params).langue)
  const { entete } = contenu.services

  return (
    <Gabarit langue={langue} page="services" contenu={contenu}>
      <TitrePage titre={entete.titre} description={entete.description} mention={entete.mention}>
        <Bouton destination="rendezVous" libelle={entete.cta} />
      </TitrePage>
      <Argumentaire contenu={contenu.commun.argumentaire} titreId="titre-argumentaire" />
      <Deroulement contenu={contenu.services.deroulement} />
      <Domaines contenu={contenu.services.domaines} />
      <BandeauOutils contenu={contenu.commun.outils} titreId="titre-outils" />
      <Marches contenu={contenu.commun.marches} titreId="titre-marches" />
      <Compteur
        contenu={contenu.commun.compteur}
        langue={langue}
        titreId="titre-compteur"
        dessous="fond"
      />
      <Cloture contenu={contenu.commun.cloture} />
    </Gabarit>
  )
}
