import { Jost } from 'next/font/google'
import type { Metadata } from 'next'

import { fr } from '@/content/fr'
import { en } from '@/content/en'
import { chemin, LANGUES, SITE_URL } from '@/content/langues'
import { Logo } from '@/components/shared/logo'

import './globals.css'

/**
 * La page 404 du site.
 *
 * **`global-not-found` et non `not-found`.** La doc de Next le dit pour ce cas
 * precis : le gabarit racine de ce depot est `app/[langue]/layout.tsx`, un
 * segment dynamique de premier niveau. Il n'existe donc aucun gabarit commun ou
 * composer un 404 — un `not-found.tsx` retomberait sur le gabarit interne de
 * Next, celui qui rendait une page anglaise sans `lang`, sans navigation, et
 * dont les balises Open Graph pointaient vers `localhost:3000`.
 *
 * Le prix a payer : ce fichier contourne le gabarit, donc il monte lui-meme la
 * feuille de style, la police et la balise `<html>`. C'est voulu par l'API.
 *
 * **Les deux langues paraissent ensemble.** Une adresse qui ne correspond a
 * aucune route n'a pas de langue : `/en/typo/` amene un anglophone, `/fr/typo/`
 * un francophone, et une adresse malformee n'amene ni l'un ni l'autre. Choisir
 * une seule langue ici, c'est se tromper une fois sur deux.
 *
 * Ni en-tete ni pied : ils exigent une langue, et le visiteur n'en a pas encore.
 * Les deux liens de retour tiennent ce role.
 */
const jost = Jost({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jost',
})

const CONTENUS = { fr: fr.commun.nonTrouve, en: en.commun.nonTrouve } as const

export const metadata: Metadata = {
  // Sans lui, Next retombe sur `http://localhost:3000` pour resoudre l'image
  // Open Graph — mesure sur l'export, quatre occurrences dans le 404 livre.
  metadataBase: new URL(SITE_URL),
  title: CONTENUS.fr.metaTitre,
  description: CONTENUS.fr.metaDescription,
  // Une page d'erreur n'a rien a faire dans un index.
  robots: { index: false, follow: true },
}

export default function PageIntrouvable() {
  return (
    <html lang="fr" className={jost.variable}>
      <body className="bg-primaire font-corps font-light text-white antialiased">
        <main className="mx-auto flex min-h-svh w-full max-w-[67.5rem] flex-col justify-center gap-[clamp(2rem,5vw,3.5rem)] px-[clamp(1.25rem,4vw,3.5rem)] py-[clamp(3rem,8vw,6rem)]">
          <span className="flex items-center">
            <Logo hauteur={34} className="block w-auto" />
          </span>

          <div className="flex flex-col gap-[clamp(1.75rem,4vw,3rem)]">
            {LANGUES.map((langue) => {
              const contenu = CONTENUS[langue]
              // Le document est en francais — c'est ce que dit son `lang`, et
              // c'est la langue par defaut du site (decision 0014). Le bloc
              // francais porte donc le `h1`, l'anglais un `h2` : deux `h1` sur
              // une meme page defont la hierarchie que le reste du site tient.
              const Titre = langue === 'fr' ? 'h1' : 'h2'
              return (
                // `lang` sur chaque bloc : sans lui, un lecteur d'ecran lirait
                // l'anglais avec la prononciation francaise du document.
                <div key={langue} lang={langue} className="flex flex-col gap-3">
                  <Titre className="max-w-[20ch] font-titre text-[clamp(1.625rem,3.2vw,2.625rem)] leading-[1.04] tracking-[-0.045em] text-white">
                    {contenu.titre}
                  </Titre>
                  <p className="max-w-[46ch] text-[clamp(0.9375rem,1.15vw,1.09375rem)] leading-[1.55] text-white">
                    {contenu.texte}
                  </p>
                  <a
                    href={chemin(langue)}
                    className="mt-1 inline-flex min-h-11 w-fit items-center rounded-bloc bg-white px-5 etiquette text-encre transition-transform duration-[220ms] hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    {contenu.retour}
                  </a>
                </div>
              )
            })}
          </div>
        </main>
      </body>
    </html>
  )
}
