import type { Metadata } from 'next'

import { LANGUES } from '@/content/langues'
import type { Langue } from '@/content/langues'
import { metadonnees } from '@/content/metadonnees'
import { Gabarit } from '@/components/layout/gabarit'
import { Argumentaire } from '@/components/sections/argumentaire'
import { BandeauOutils } from '@/components/sections/bandeau-outils'
import { Cloture } from '@/components/sections/cloture'
import { Compteur } from '@/components/sections/compteur'
import { Faq } from '@/components/sections/faq'
import { Hero } from '@/components/sections/hero'
import { Marches } from '@/components/sections/marches'
import { Parcours } from '@/components/sections/parcours'

import { resoudre } from './resoudre'

export function generateStaticParams(): Array<{ langue: Langue }> {
  return LANGUES.map((langue) => ({ langue }))
}

export async function generateMetadata({ params }: PageProps<'/[langue]'>): Promise<Metadata> {
  const { langue, contenu } = resoudre((await params).langue)
  return metadonnees(langue, { page: 'accueil' }, contenu.accueil.meta)
}

/**
 * WEB-2 — l'accueil.
 *
 * Le retour client fixe ce qu'elle doit rendre lisible en quelques secondes :
 * les deux parcours et leurs deux appels. L'argumentaire chiffre vient apres
 * eux, pas avant — un visiteur qui ne sait pas encore de quel cote il est n'a
 * rien a faire d'une reduction de cout.
 */
export default async function Page({ params }: PageProps<'/[langue]'>) {
  const { langue, contenu } = resoudre((await params).langue)

  return (
    <Gabarit langue={langue} page="accueil" contenu={contenu}>
      <Hero contenu={contenu.accueil.hero} />
      <Marches contenu={contenu.commun.marches} titreId="titre-marches" />
      <Parcours contenu={contenu.accueil.parcours} langue={langue} />
      <Argumentaire
        contenu={contenu.commun.argumentaire}
        titreId="titre-argumentaire"
        dessous="vif"
      />
      <Compteur contenu={contenu.commun.compteur} langue={langue} titreId="titre-compteur" />
      <BandeauOutils contenu={contenu.commun.outils} titreId="titre-outils" />
      <Faq contenu={contenu.accueil.faq} />
      <Cloture contenu={contenu.commun.cloture} />
    </Gabarit>
  )
}
