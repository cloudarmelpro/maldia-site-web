import type { Metadata } from 'next'

import { LANGUES } from '@/content/langues'
import type { Langue } from '@/content/langues'
import { metadonnees } from '@/content/metadonnees'
import { Gabarit } from '@/components/layout/gabarit'
import { Methode } from '@/components/sections/methode'
import { ServicesOuverture } from '@/components/sections/services-ouverture'
import { ServicesPostes } from '@/components/sections/services-postes'

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
 * WEB-4 — la page destinee aux entreprises, sur le design « Services Maldia ».
 *
 * Le design a son propre en-tete, clair et colle, et sa propre cloture. Les deux
 * sont ecartes : le site garde ceux de l'accueil (decision 0018). L'en-tete de
 * l'accueil est transparent — la bande nuit ci-dessous lui rend le fond que la
 * photo du hero lui donne ailleurs.
 *
 * Le `h1` reste ou le design le met : dans la premiere section claire, sans
 * bande sombre. La page n'a donc pas de `TitrePage`.
 *
 * La methode perd sa conclusion et ses appels ici : le design ne les met pas
 * entre les etapes et les postes, l'appel de la page etant celui de l'encart.
 */
export default async function PageServices({ params }: PageProps<'/[langue]/services'>) {
  const { langue, contenu } = resoudre((await params).langue)
  const { commun, services } = contenu

  return (
    <Gabarit langue={langue} page="services" contenu={contenu}>
        <>
          <ServicesOuverture contenu={services.entete} arguments={commun.pourquoi.liste} />
          <Methode contenu={commun.methode} titreId="titre-methode" avecAppel={false} />
          <ServicesPostes contenu={services.postes} familles={commun.profils.liste} />
        </>
    </Gabarit>
  )
}
