import Link from 'next/link'
import type { ComponentProps } from 'react'

/**
 * Un lien interne, et le seul endroit ou `prefetch` est decide.
 *
 * `next/link` prefetche par defaut des qu'un lien entre dans la fenetre, en
 * production : il demande alors la charge RSC de la route ciblee. `output:
 * 'export'` ne produit pas ces charges — chaque page servait donc autant de 404
 * qu'elle porte de liens, invisibles a l'usage mais bien reelles dans le
 * journal d'un hebergeur.
 *
 * La navigation reste entiere : sans charge a precharger, Next retombe sur un
 * chargement de page complet, ce qui est exactement ce qu'un site statique fait
 * de mieux.
 *
 * Tout lien interne passe par ici. Importer `next/link` directement dans un
 * composant ramenerait le prefetch, une page a la fois.
 */
export function Lien(props: Omit<ComponentProps<typeof Link>, 'prefetch'>) {
  return <Link {...props} prefetch={false} />
}
