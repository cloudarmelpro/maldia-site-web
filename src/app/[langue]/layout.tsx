import type { Metadata } from 'next'
import { Bricolage_Grotesque, IBM_Plex_Mono, Outfit } from 'next/font/google'
import { notFound } from 'next/navigation'

import { en } from '@/content/en'
import { fr } from '@/content/fr'
import { cheminDeLangue, LANGUES, SITE_URL } from '@/content/langues'
import type { Langue } from '@/content/langues'
import type { Contenu } from '@/content/types'

import '../globals.css'

// Les noms des variables sont un invariant avec le bloc `@theme inline` de
// globals.css : toute autre valeur casse la typographie sans erreur.
// La police des titres de la maquette de référence. Variable : une seule
// requete couvre toutes les graisses.
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bricolage',
})

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
})

// Reservee aux etiquettes techniques des blocs visuels de la maquette. Un seul
// poids : elle ne porte jamais de texte courant.
const plexMono = IBM_Plex_Mono({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plex-mono',
})

const CONTENUS: Record<Langue, Contenu> = { fr, en }

const LOCALES_OPEN_GRAPH: { readonly [L in Langue]: string } = {
  fr: 'fr_FR',
  en: 'en_US',
}

function estLangue(valeur: string): valeur is Langue {
  return (LANGUES as readonly string[]).includes(valeur)
}

// Sans elle, la route dynamique fait échouer l'export statique.
export function generateStaticParams() {
  return LANGUES.map((langue) => ({ langue }))
}

// S'exécute à la compilation, une fois par langue de generateStaticParams —
// c'est le generateMetadata statique, pas le dynamique côté serveur que
// l'export interdit.
export async function generateMetadata({ params }: LayoutProps<'/[langue]'>): Promise<Metadata> {
  const { langue } = await params
  if (!estLangue(langue)) notFound()

  const { meta } = CONTENUS[langue]
  const chemin = cheminDeLangue(langue)

  return {
    metadataBase: new URL(SITE_URL),
    title: meta.titre,
    description: meta.description,
    alternates: {
      canonical: chemin,
      // Réciprocité hreflang : chaque page déclare toutes les variantes, y
      // compris elle-même, à l'identique dans les deux langues ; x-default est
      // le routeur de langue à la racine (public/index.html).
      languages: {
        fr: cheminDeLangue('fr'),
        en: cheminDeLangue('en'),
        'x-default': '/',
      },
    },
    openGraph: {
      type: 'website',
      url: chemin,
      locale: LOCALES_OPEN_GRAPH[langue],
      title: meta.openGraph.titre,
      description: meta.openGraph.description,
    },
  }
}

export default async function LayoutRacine({ children, params }: LayoutProps<'/[langue]'>) {
  const { langue } = await params
  if (!estLangue(langue)) notFound()

  return (
    <html lang={langue} className={`${bricolage.variable} ${outfit.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
