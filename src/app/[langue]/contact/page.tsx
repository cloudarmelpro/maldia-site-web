import type { Metadata } from 'next'

import { LANGUES } from '@/content/langues'
import type { Langue } from '@/content/langues'
import { metadonnees } from '@/content/metadonnees'
import { Gabarit } from '@/components/layout/gabarit'
import { Cloture } from '@/components/sections/cloture'
import { ContactVoies } from '@/components/sections/contact-voies'
import { TitrePage } from '@/components/sections/titre-page'

import { resoudre } from '../resoudre'

export function generateStaticParams(): Array<{ langue: Langue }> {
  return LANGUES.map((langue) => ({ langue }))
}

export async function generateMetadata({
  params,
}: PageProps<'/[langue]/contact'>): Promise<Metadata> {
  const { langue, contenu } = resoudre((await params).langue)
  return metadonnees(langue, { page: 'contact' }, contenu.contact.meta)
}

/**
 * WEB-7 — contact.
 *
 * Aucun formulaire : le site n'a pas de serveur pour en recevoir un (WEB-10).
 * Le rendez-vous passe par Cal.com, la candidature par l'application de CV.
 */
export default async function PageContact({ params }: PageProps<'/[langue]/contact'>) {
  const { langue, contenu } = resoudre((await params).langue)

  return (
    <Gabarit langue={langue} page="contact" contenu={contenu}>
      <TitrePage titre={contenu.contact.titre} description={contenu.contact.description} />
      <ContactVoies contenu={contenu.contact} />
      <Cloture contenu={contenu.commun.cloture} />
    </Gabarit>
  )
}
