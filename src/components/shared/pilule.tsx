/**
 * L'intitule de section du design : une pilule a puce, en capitales espacees.
 *
 * Elle occupe la colonne de gauche de la grille a deux colonnes. Sous 1000 px
 * la grille se replie et la pilule passe simplement au-dessus du titre — le
 * `large:mt-[5px]` la recale alors sur la premiere ligne du titre.
 */
export type RegistrePilule = 'clair' | 'gris' | 'sombre'

const REGISTRES: Record<RegistrePilule, string> = {
  clair: 'bg-pilule text-encre',
  gris: 'bg-white text-encre',
  sombre: 'bg-white/10 text-white',
}

const PUCES: Record<RegistrePilule, string> = {
  clair: 'bg-primaire',
  gris: 'bg-primaire',
  sombre: 'bg-lime',
}

export function Pilule({
  intitule,
  registre = 'clair',
}: {
  intitule: string
  registre?: RegistrePilule
}) {
  return (
    <span
      className={`inline-flex items-center gap-2.25 self-start rounded-pilule px-4 py-2 etiquette text-[0.6875rem] tracking-[0.1em] large:mt-[0.3125rem] ${REGISTRES[registre]}`}
    >
      <span aria-hidden className={`size-1.5 shrink-0 rounded-pilule ${PUCES[registre]}`} />
      {intitule}
    </span>
  )
}
