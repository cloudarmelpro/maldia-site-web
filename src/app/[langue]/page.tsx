import { notFound } from 'next/navigation'

import { en } from '@/content/en'
import { fr } from '@/content/fr'
import { LANGUES } from '@/content/langues'
import type { Langue } from '@/content/langues'
import type { Contenu } from '@/content/types'
import { EnTete } from '@/components/layout/en-tete'
import { Pied } from '@/components/layout/pied'
import { RetourEnHaut } from '@/components/shared/retour-en-haut'
import { Cloture } from '@/components/sections/cloture'
import { Commencer } from '@/components/sections/commencer'
import { Deroulement } from '@/components/sections/deroulement'
import { Entreprises } from '@/components/sections/entreprises'
import { Faq } from '@/components/sections/faq'
import { Hero } from '@/components/sections/hero'
import { Marches } from '@/components/sections/marches'
import { Opportunites } from '@/components/sections/opportunites'
import { Profils } from '@/components/sections/profils'
import { Talents } from '@/components/sections/talents'

const CONTENUS: Record<Langue, Contenu> = { fr, en }

export function generateStaticParams(): Array<{ langue: Langue }> {
  return LANGUES.map((langue) => ({ langue }))
}

function estLangue(valeur: string): valeur is Langue {
  return (LANGUES as readonly string[]).includes(valeur)
}

// L'ordre des sections est celui de la maquette « Landing Page.dc.html », que
// le client a réécrite avec le contenu du cahier.
export default async function Page({ params }: PageProps<'/[langue]'>) {
  const { langue } = await params
  if (!estLangue(langue)) notFound()

  const contenu = CONTENUS[langue]

  return (
    <>
      <EnTete
        langue={langue}
        contenu={contenu.enTete}
        changerDeLangue={contenu.enTete.changerDeLangue}
      />
      <main>
        <Hero contenu={contenu.hero} />
        <Marches contenu={contenu.marches} />
        <Opportunites contenu={contenu.opportunites} />
        <Entreprises contenu={contenu.entreprises} />
        <Deroulement contenu={contenu.deroulement} />
        <Talents contenu={contenu.talents} />
        <Commencer contenu={contenu.commencer} />
        <Profils contenu={contenu.profils} />
        <Faq contenu={contenu.faq} />
        <Cloture contenu={contenu.cloture} />
      </main>
      <Pied
        langue={langue}
        contenu={contenu.pied}
        changerDeLangue={contenu.enTete.changerDeLangue}
      />
      <RetourEnHaut libelle={contenu.retourEnHaut} />
    </>
  )
}
