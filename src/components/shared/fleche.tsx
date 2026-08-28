/**
 * La fleche du site, gauche et droite.
 *
 * Le trace vient des SVG du design, releve puis pose ici. Les fichiers d'origine
 * ont ete retires de `public/` : ils partaient dans l'export sans qu'aucune page
 * ne les demande, et leurs noms etaient inverses — celui nomme « Left »
 * dessinait la fleche vers la DROITE. Le trace ci-dessous suit ce qu'ils
 * dessinaient, jamais leur nom.
 *
 * Il est inline et non `<img src="…">` pour deux raisons : les polygones n'ont
 * pas de `fill`, donc en image ils resteraient noirs — invisibles sur un fond
 * sombre — et chaque fleche couterait une requete.
 */
const TRACES = {
  droite:
    '11.354,0 10.646,0.706 13.786,3.853 0,3.853 0,4.853 13.786,4.853 10.646,8 11.354,8.706 15.698,4.353',
  gauche:
    '15.699,3.854 1.914,3.854 5.061,0.707 4.354,0 0,4.354 4.354,8.707 5.061,8 1.914,4.854 15.699,4.854',
} as const

export type SensFleche = keyof typeof TRACES

// Le glyphe est plat — 15,7 sur 8,7. Une classe carree l'ecraserait dans sa
// boite, d'ou une largeur et une hauteur distinctes.
const TAILLE = 'h-[0.5625rem] w-4'

export function Fleche({
  sens = 'droite',
  className,
}: {
  sens?: SensFleche
  className?: string
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 15.699 8.707"
      fill="currentColor"
      className={className ?? `${TAILLE} shrink-0`}
    >
      <polygon points={TRACES[sens]} />
    </svg>
  )
}
