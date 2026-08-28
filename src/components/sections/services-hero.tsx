import type { Contenu } from '@/content/types'
import { HeroPage } from '@/components/shared/hero-page'

/**
 * WEB-4 — l'ouverture de la page Services.
 *
 * Les marches sont une liste : ce sont des elements de meme rang, et aucune
 * autre marque ne le dirait a un lecteur d'ecran.
 *
 * Elles sont **inertes** : meme aplat, memes coins et meme hauteur qu'un bouton
 * du site, mais rien n'est cliquable. C'est le seul hero de page sans appel, et
 * l'audit de direction artistique le releve — sept formes de bouton, aucun
 * bouton. A trancher avec le client : un appel a cote, ou des pastilles qui
 * cessent d'en avoir l'air.
 */
export function ServicesHero({
  contenu,
  marches,
}: {
  contenu: Contenu['services']['entete']
  marches: Contenu['commun']['marches']['liste']
}) {
  return (
    <HeroPage
      intitule={contenu.intitule}
      titre={contenu.titre}
      description={contenu.description}
    >
      <ul className="flex flex-wrap gap-1.75">
        {marches.map((marche) => (
          <li
            key={marche}
            className="rounded-liste bg-voile/26 px-4 py-2.25 text-[0.78125rem] tracking-[0.04em] whitespace-nowrap text-white"
          >
            {marche}
          </li>
        ))}
      </ul>

      {/* WEB-12 : « Le delai de WEB-12.b est une moyenne, jamais une garantie
          absolue. La page doit le dire, pas seulement l'omettre. » La chaine
          existait dans le contenu depuis la refonte et AUCUN composant ne la
          rendait — l'exigence n'etait donc pas tenue sur cette page, alors
          qu'elle y affiche le chiffre. */}
      <p className="max-w-[46ch] text-[0.90625rem] leading-[1.6] text-white">{contenu.mention}</p>
    </HeroPage>
  )
}
