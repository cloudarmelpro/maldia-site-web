import type { Metadata } from 'next'

import { LANGUES } from '@/content/langues'
import type { Langue } from '@/content/langues'
import { metadonnees } from '@/content/metadonnees'
import { Gabarit } from '@/components/layout/gabarit'
import { TalentsContenu } from '@/components/sections/talents-contenu'
import { TalentsDeroule } from '@/components/sections/talents-deroule'
import { TalentsDomaines } from '@/components/sections/talents-domaines'

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
 * WEB-3 et WEB-5 — la page destinee aux candidats a Madagascar, sur le design
 * « Talents Maldia ».
 *
 * Aucun argument de cout ni de delai ici : ils s'adressent a l'entreprise qui
 * achete, pas a la personne qui postule.
 *
 * Le `h1` reste ou le design le met : dans la premiere section claire, sans bande
 * sombre. La page n'a donc pas de `TitrePage`, et l'en-tete de l'accueil —
 * transparent, fait pour se poser sur la photo du hero — recoit son fond de la
 * bande nuit ci-dessous. Le meme geste que sur A propos et sur le blog.
 */
export default async function PageTalents({ params }: PageProps<'/[langue]/talents'>) {
  const { langue, contenu } = resoudre((await params).langue)
  const { commun, talents } = contenu

  return (
    <Gabarit langue={langue} page="talents" contenu={contenu}>
      {(enTete) => (
        <>
          <div className="bg-nuit pb-6.5">{enTete}</div>
          <TalentsContenu contenu={talents} />
          <TalentsDomaines contenu={talents.domaines} profils={commun.profils.liste} />
          <TalentsDeroule contenu={talents.deroule} />
        </>
      )}
    </Gabarit>
  )
}
