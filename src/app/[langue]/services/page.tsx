import type { Metadata } from 'next'

import { LANGUES } from '@/content/langues'
import type { Langue } from '@/content/langues'
import { metadonnees } from '@/content/metadonnees'
import { Gabarit } from '@/components/layout/gabarit'
import { ServicesChiffrage } from '@/components/sections/services-chiffrage'
import { ServicesChiffres } from '@/components/sections/services-chiffres'
import { ServicesHero } from '@/components/sections/services-hero'
import { ServicesMethode } from '@/components/sections/services-methode'
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
 * WEB-4 — la page destinee aux entreprises.
 *
 * Le `h1` est dans le hero vert, seule bande de la page a en porter un ; tout
 * ce qui suit est blanc. Le bloc de contact et le pied la ferment : ils
 * viennent du gabarit.
 *
 * La methode perd ses appels ici — l'appel de la page est celui de l'encart de
 * chiffrage, qui la suit.
 */
export default async function PageServices({ params }: PageProps<'/[langue]/services'>) {
  const { langue, contenu } = resoudre((await params).langue)
  const { commun, services } = contenu

  return (
    <Gabarit langue={langue} page="services" contenu={contenu}>
      <ServicesHero contenu={services.entete} marches={commun.marches.liste} />
      <ServicesChiffres
        intitule={services.obtenez}
        entete={services.engagements}
        liste={commun.pourquoi.liste}
      />
      <ServicesPostes contenu={services.postes} profils={commun.profils} />
      <ServicesMethode contenu={commun.methode} />
      <ServicesChiffrage contenu={services.postes.encart} />
    </Gabarit>
  )
}
