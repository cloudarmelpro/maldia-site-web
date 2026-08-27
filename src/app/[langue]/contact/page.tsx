import type { Metadata } from 'next'

import { LANGUES } from '@/content/langues'
import type { Langue } from '@/content/langues'
import { metadonnees } from '@/content/metadonnees'
import { Gabarit } from '@/components/layout/gabarit'
import { ContactPage } from '@/components/sections/contact-page'

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
 * WEB-7 — contact, sur le design « Site Maldia ».
 *
 * Le design y met deux formulaires, dont un depot de CV. Ils sont rendus, mais
 * leur bouton d'envoi est desactive : cette application est un export statique,
 * il n'y a aucun serveur pour recevoir un envoi ni aucun stockage pour un
 * fichier (WEB-10). La voie qui aboutit est la carte Cal.com, a cote. Voir
 * decision 0019.
 */
export default async function PageContact({ params }: PageProps<'/[langue]/contact'>) {
  const { langue, contenu } = resoudre((await params).langue)

  return (
    <Gabarit langue={langue} page="contact" contenu={contenu}>
      <ContactPage contenu={contenu} pied={contenu.commun.pied} />
    </Gabarit>
  )
}
