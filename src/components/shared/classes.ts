/**
 * Assemble une liste de classes.
 *
 * Ce n'est pas une commodite : c'est un garde-fou. Ecrite a la main, une liste
 * de classes finit par coller une classe a une interpolation —
 * `py-[clamp(...)]${className}` — et l'extracteur de Tailwind lit alors la
 * classe et le debut de l'expression comme un seul jeton. Il n'engendre rien,
 * silencieusement : la regle CSS n'existe pas, et la page perd son espacement
 * sans qu'aucune erreur ne soit levee.
 *
 * `tests/classes.spec.ts` refuse toute adjacence de ce type dans `src/`.
 */
export function classes(...parties: Array<string | false | null | undefined>): string {
  return parties.filter(Boolean).join(' ')
}
