// Module sans "use client" : exportées depuis apparition.tsx, ces valeurs
// deviendraient des références client — incallables depuis un Server Component.

export const PAS_DECALAGE_MS = 60

// Au-delà, le décalage fait attendre le lecteur : les éléments suivants d'une
// grille arrivent tous avec le dernier décalé.
const DERNIER_INDICE_DECALE = 5

/** Décalage d'un élément de grille : indice × PAS_DECALAGE_MS, plafonné. */
export function delaiDeGrille(indice: number): number {
  return Math.min(indice, DERNIER_INDICE_DECALE) * PAS_DECALAGE_MS
}
