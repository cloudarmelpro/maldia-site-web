import { Jost } from 'next/font/google'
import type { Metadata } from 'next'

import { fr } from '@/content/fr'
import { chemin, LANGUE_PAR_DEFAUT, SITE_URL } from '@/content/langues'
import { Gabarit } from '@/components/layout/gabarit'
import { BoutonPage } from '@/components/shared/bouton'
import { HeroPage } from '@/components/shared/hero-page'

import './globals.css'

/**
 * La page 404 du site.
 *
 * **`global-not-found` et non `not-found`.** La doc de Next le donne pour ce cas
 * precis : le gabarit racine de ce depot est `app/[langue]/layout.tsx`, un
 * segment dynamique de premier niveau, donc il n'existe aucun gabarit commun ou
 * composer un 404. Sans ce fichier — et sans `experimental.globalNotFound` dans
 * `next.config.ts` — l'export livre le 404 interne de Next : anglais, sans
 * `lang`, sans navigation, et avec des balises Open Graph resolues sur
 * `localhost:3000`.
 *
 * Le prix a payer : ce fichier contourne le gabarit, donc il monte lui-meme la
 * balise `<html>`, la police et la feuille de style. C'est l'API qui le veut.
 *
 * **Elle est en francais**, la langue par defaut du site (decision 0014), celle
 * que `x-default` designe et celle vers laquelle le routeur de la racine
 * renvoie. Une adresse qui ne correspond a aucune route n'a pas de langue ; le
 * selecteur de l'en-tete mene a l'accueil anglais, seule page equivalente
 * puisqu'il n'existe qu'un fichier 404 pour tout le site.
 *
 * `page={null}` : aucune des six entrees du menu n'est courante ici, et marquer
 * « Accueil » le serait faussement.
 *
 * **Le hero est clair, et c'est la seule difference avec les cinq autres pages.**
 * Le bloc d'appel du gabarit est vert : un hero vert le toucherait, et deux
 * bandes vertes qui se suivent ne font qu'une — il ne resterait qu'une couture
 * au milieu d'un aplat.
 */
const jost = Jost({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jost',
})

const CONTENU = fr.commun.nonTrouve

export const metadata: Metadata = {
  // Sans lui, Next resout l'image Open Graph sur `http://localhost:3000`.
  metadataBase: new URL(SITE_URL),
  title: CONTENU.metaTitre,
  description: CONTENU.metaDescription,
  // Une page d'erreur n'a rien a faire dans un index.
  robots: { index: false, follow: true },
}

export default function PageIntrouvable() {
  return (
    <html lang={LANGUE_PAR_DEFAUT} className={jost.variable}>
      <body>
        <Gabarit langue={LANGUE_PAR_DEFAUT} page={null} contenu={fr}>
          <HeroPage
            intitule={CONTENU.intitule}
            titre={CONTENU.titre}
            description={CONTENU.texte}
            registre="clair"
          >
            {/* Enveloppe en `flex` comme les autres heros de page : les enfants
                tombent dans une colonne, et un bouton nu s'y etirerait sur toute
                la gouttiere. */}
            <div className="flex flex-wrap items-center gap-2.5">
              <BoutonPage
                vers={chemin(LANGUE_PAR_DEFAUT)}
                libelle={CONTENU.retour}
                variante="vert"
                taille="haute"
                ornement="fleche"
              />
            </div>
          </HeroPage>

        </Gabarit>
      </body>
    </html>
  )
}
