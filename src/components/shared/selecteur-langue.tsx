import Link from 'next/link'

import type { Langue } from '@/content/langues'

/**
 * Mène à la même page dans l'autre langue (WEB-8).
 *
 * Plus aucun état, donc plus aucun JavaScript : la navigation se fait par
 * pages et non par ancres depuis le retour client, et l'adresse cible est
 * connue à la compilation. C'est `Gabarit` qui la calcule — le composant ne
 * devine pas où il se trouve.
 */
export function SelecteurLangue({
  langue,
  vers,
  libelle,
  className,
}: {
  /** La langue de destination — pas la langue courante. */
  langue: Langue
  vers: string
  libelle: string
  className?: string
}) {
  return (
    <Link href={vers} hrefLang={langue} lang={langue} className={className}>
      {libelle}
    </Link>
  )
}
