import { notFound } from 'next/navigation'

import { CONTENUS } from '@/content/contenus'
import { estLangue } from '@/content/langues'
import type { Langue } from '@/content/langues'
import type { Contenu } from '@/content/types'

/**
 * Valide le segment de langue et rend le contenu correspondant.
 *
 * `notFound()` a le type de retour `never` : c'est lui qui restreint `valeur` a
 * `Langue`, sans assertion de type. En pratique la branche est morte —
 * `generateStaticParams` ne produit que les langues connues — mais c'est elle
 * qui rend l'index de `CONTENUS` sur, et non l'inverse.
 */
export function resoudre(valeur: string): { langue: Langue; contenu: Contenu } {
  if (!estLangue(valeur)) notFound()
  return { langue: valeur, contenu: CONTENUS[valeur] }
}
