import type { ReactNode } from 'react'

/**
 * La bande défilante de la maquette. Entièrement en CSS : aucun état, aucun
 * effet, donc aucun composant client — et elle reste lisible sans JavaScript.
 *
 * La liste est rendue deux fois et l'animation translate de la moitié : c'est
 * ce qui rend la boucle invisible. Le second exemplaire est masqué aux lecteurs
 * d'écran, sinon chaque libellé serait annoncé en double.
 *
 * `motion-safe:` coupe le défilement quand le visiteur réduit le mouvement —
 * une bande qui défile sans fin est le pire cas pour un trouble vestibulaire.
 * Sans animation, la liste reste simplement posée.
 */
export function Defilement({
  items,
  sens = 'gauche',
  className,
  rendu,
}: {
  items: readonly string[]
  sens?: 'gauche' | 'droite'
  className?: string
  rendu: (item: string) => ReactNode
}) {
  const animation =
    sens === 'gauche'
      ? 'motion-safe:animate-defilement'
      : 'motion-safe:animate-defilement-inverse'

  return (
    <div
      className={`overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]${className ? ` ${className}` : ''}`}
    >
      <div className={`flex w-max items-center ${animation}`}>
        <ul className="flex w-max items-center">
          {items.map((item) => (
            <li key={item} className="flex-none">
              {rendu(item)}
            </li>
          ))}
        </ul>
        <ul aria-hidden className="flex w-max items-center">
          {items.map((item) => (
            <li key={item} className="flex-none">
              {rendu(item)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
