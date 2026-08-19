import Image from 'next/image'

/**
 * Le bloc visuel de la maquette.
 *
 * Le ratio est posé en CSS et non déduit du fichier : c'est ce qui empêche la
 * mise en page de sauter quand une photo change de dimensions ou tarde.
 *
 * `alt=""` est délibéré : chaque visuel est accolé à un titre et à une
 * description qui portent déjà l'information. Une alternative les répéterait,
 * et le lecteur d'écran l'annoncerait deux fois.
 */

type Ratio = 'large' | 'projet' | 'carre' | 'bandeau'

const RATIOS: Record<Ratio, string> = {
  large: 'aspect-[1024/431]',
  projet: 'aspect-[720/600]',
  carre: 'aspect-square',
  bandeau: 'aspect-[16/7]',
}

export function Visuel({
  photo,
  ratio = 'large',
  arrondi = 'rounded-[1.125rem]',
  /** Ce que le navigateur doit réserver — évite de télécharger une image trop large. */
  tailles = '(max-width: 768px) 100vw, 33vw',
}: {
  photo: string
  ratio?: Ratio
  arrondi?: string
  tailles?: string
}) {
  return (
    <div className={`relative w-full overflow-hidden ${RATIOS[ratio]} ${arrondi} bg-fond-2`}>
      <Image src={photo} alt="" fill sizes={tailles} className="object-cover" />
    </div>
  )
}
