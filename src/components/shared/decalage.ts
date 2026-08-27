// Module sans "use client" : exportees depuis apparition.tsx, ces valeurs
// deviendraient des references client — incallables depuis un Server Component.

/** Valeur du design : 60 ms entre deux elements d'une meme grille. */
export const PAS_DECALAGE_MS = 60

// Au-dela, le decalage fait attendre le lecteur : les elements suivants d'une
// grille arrivent tous avec le dernier decale. C'est le plafond du design.
const DERNIER_INDICE_DECALE = 11

/** Decalage d'un element de grille : indice x PAS_DECALAGE_MS, plafonne. */
export function delaiDeGrille(indice: number): number {
  return Math.min(indice, DERNIER_INDICE_DECALE) * PAS_DECALAGE_MS
}
