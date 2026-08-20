import type { Metadata } from 'next'

import { LANGUES } from '@/content/langues'
import type { Langue } from '@/content/langues'
import { metadonnees } from '@/content/metadonnees'
import { Gabarit } from '@/components/layout/gabarit'
import { Base } from '@/components/sections/base'
import { Hero } from '@/components/sections/hero'
import { Methode } from '@/components/sections/methode'
import { Parcours } from '@/components/sections/parcours'
import { Pourquoi } from '@/components/sections/pourquoi'
import { Profils } from '@/components/sections/profils'
import { Questions } from '@/components/sections/questions'

import { resoudre } from './resoudre'

export function generateStaticParams(): Array<{ langue: Langue }> {
  return LANGUES.map((langue) => ({ langue }))
}

export async function generateMetadata({ params }: PageProps<'/[langue]'>): Promise<Metadata> {
  const { langue, contenu } = resoudre((await params).langue)
  return metadonnees(langue, { page: 'accueil' }, contenu.accueil.meta)
}

/**
 * WEB-2 — l'accueil, dans l'ordre du design « Hero Maldia v2 ».
 *
 * Le hero porte les deux appels : celui des entreprises et celui des talents. Le
 * reste de la page argumente, puis « Parcours » redemande de choisir un cote.
 */
export default async function Page({ params }: PageProps<'/[langue]'>) {
  const { langue, contenu } = resoudre((await params).langue)
  const { commun, accueil } = contenu

  return (
    <Gabarit langue={langue} page="accueil" contenu={contenu}>
      {(enTete) => (
        <>
          <Hero
            contenu={accueil.hero}
            courriel={commun.pied.courriel}
            lieu={commun.pied.lieu}
            marches={commun.marches.resume}
            enTete={enTete}
          />
          <Pourquoi
            contenu={commun.pourquoi}
            marches={commun.marches}
            titreId="titre-pourquoi"
          />
          <Profils contenu={commun.profils} titreId="titre-profils" />
          <Methode contenu={commun.methode} titreId="titre-methode" />
          <Parcours contenu={commun.parcours} titreId="titre-parcours" />
          <Base contenu={commun.base} langue={langue} titreId="titre-base" />
          <Questions contenu={accueil.questions} />
        </>
      )}
    </Gabarit>
  )
}
