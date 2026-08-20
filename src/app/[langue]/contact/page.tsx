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
 * WEB-7 — contact, sur le design « Contact Maldia ».
 *
 * Le design y met deux formulaires, dont un depot de CV. Ils ne sont pas
 * construits : cette application est un export statique, il n'y a aucun serveur
 * pour recevoir un envoi ni aucun stockage pour un fichier (WEB-10). Chaque
 * onglet mene a la destination reelle. Voir decision 0019.
 *
 * L'en-tete et le pied sont ceux de l'accueil. L'en-tete etant transparent, la
 * bande nuit lui rend son fond.
 */
export default async function PageContact({ params }: PageProps<'/[langue]/contact'>) {
  const { langue, contenu } = resoudre((await params).langue)

  return (
    <Gabarit langue={langue} page="contact" contenu={contenu}>
      {(enTete) => (
        <>
          <div className="bg-nuit pb-6.5">{enTete}</div>
          <ContactPage contenu={contenu} pied={contenu.commun.pied} />
        </>
      )}
    </Gabarit>
  )
}
