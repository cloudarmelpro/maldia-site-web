import type { Contenu } from '@/content/types'
import { HeroPage } from '@/components/shared/hero-page'

/**
 * WEB-6 — l'ouverture de la page A propos.
 *
 * Toute la geometrie vit dans `HeroPage` : l'aplat vert pleine largeur, le
 * padding qui rend sa place a l'en-tete collant, le resserrement de l'intitule
 * sur le titre. Cette page n'y ajoute rien.
 */
export function AProposHero({ contenu }: { contenu: Contenu['aPropos']['entete'] }) {
  return (
    <HeroPage intitule={contenu.intitule} titre={contenu.titre} description={contenu.description} />
  )
}
