import type { Metadata } from 'next'

import { LANGUES } from '@/content/langues'
import type { Langue } from '@/content/langues'
import { metadonnees } from '@/content/metadonnees'
import { Gabarit } from '@/components/layout/gabarit'
import { Questions } from '@/components/sections/questions'
import { TitrePage } from '@/components/sections/titre-page'
import { Bouton } from '@/components/shared/bouton'
import { CONTENEUR, GRILLE_INTITULE } from '@/components/shared/section'

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
 * La mention le dit au visiteur plutot que de le laisser le decouvrir.
 *
 * Les deux voies reelles — le calendrier et la candidature — sont dans le bloc
 * d'appel que le gabarit rend au bas de chaque page. Les repeter ici en ferait
 * deux paires de cartes identiques a un ecran d'intervalle.
 */
export default async function PageContact({ params }: PageProps<'/[langue]/contact'>) {
  const { langue, contenu } = resoudre((await params).langue)

  return (
    <Gabarit langue={langue} page="contact" contenu={contenu}>
      {(enTete) => (
        <>
          <TitrePage
            intitule={contenu.contact.entete.intitule}
            titre={contenu.contact.entete.titre}
            description={contenu.contact.entete.description}
            mention={contenu.contact.entete.mention}
            enTete={enTete}
          >
            <Bouton
              destination="rendezVous"
              libelle={contenu.contact.entete.cta}
              variante="lime"
              ornement="fleche"
            />
          </TitrePage>

          <section
            aria-labelledby="titre-sans-formulaire"
            className="bg-fond pt-[clamp(3rem,5vw,4.5rem)]"
          >
            <div className={CONTENEUR}>
              <div className={GRILLE_INTITULE}>
                <span />
                <p
                  id="titre-sans-formulaire"
                  className="max-w-[62ch] text-[0.90625rem] leading-[1.65] text-encre-2"
                >
                  {contenu.contact.mention}
                </p>
              </div>
            </div>
          </section>

          <Questions contenu={contenu.accueil.questions} />
        </>
      )}
    </Gabarit>
  )
}
