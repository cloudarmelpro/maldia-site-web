'use client'

import Link from 'next/link'
import { useSyncExternalStore } from 'react'

import { cheminDeLangue } from '@/content/langues'
import type { Langue } from '@/content/langues'

function souscrireAncre(notifier: () => void) {
  window.addEventListener('hashchange', notifier)
  return () => window.removeEventListener('hashchange', notifier)
}

function lireAncre() {
  return window.location.hash
}

// Rendu serveur : le href reste le chemin nu — l'autre langue demeure
// atteignable sans JavaScript, le script ne fait qu'enrichir.
function lireAncreServeur() {
  return ''
}

type Props = {
  /** La langue de destination — pas la langue courante. */
  langue: Langue
  libelle: string
  className?: string
}

/** Mène à l'autre langue en conservant l'ancre courante (décision 0014). */
export function SelecteurLangue({ langue, libelle, className }: Props) {
  const ancre = useSyncExternalStore(souscrireAncre, lireAncre, lireAncreServeur)
  return (
    <Link
      href={`${cheminDeLangue(langue)}${ancre}`}
      hrefLang={langue}
      lang={langue}
      className={className}
    >
      {libelle}
    </Link>
  )
}
