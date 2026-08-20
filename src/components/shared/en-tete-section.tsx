import type { ReactNode } from 'react'

/**
 * L'en-tete de section du design : le titre a gauche, une phrase courte alignee
 * a droite, sur la meme ligne de base.
 *
 * Au-dessus de 1000 px les deux se posent cote a cote, le paragraphe cale sur
 * le bas du titre. En dessous ils s'empilent et le paragraphe reprend
 * l'alignement a gauche — aligne a droite dans une colonne etroite, il se
 * lirait comme une erreur.
 */
export function EnTeteSection({
  titreId,
  titre,
  description,
  sombre = false,
  children,
}: {
  titreId: string
  titre: ReactNode
  description?: string
  /** Sur les sections `encre` et `nuit` : la description change de gris. */
  sombre?: boolean
  /** Un appel a la place de la description — la page Profils en met un. */
  children?: ReactNode
}) {
  return (
    <div className="flex flex-col items-start gap-5 large:flex-row large:items-end large:justify-between large:gap-[clamp(1.5rem,3vw,3rem)]">
      <h2
        id={titreId}
        className={`max-w-[22ch] font-titre text-[clamp(1.75rem,2.8vw,2.75rem)] leading-[1.1] tracking-[-0.045em] ${
          sombre ? 'text-white' : 'text-encre'
        }`}
      >
        {titre}
      </h2>
      {description ? (
        <p
          className={`max-w-[34ch] shrink-0 text-[0.90625rem] leading-[1.6] large:text-right ${
            sombre ? 'text-sur-sombre' : 'text-encre-2'
          }`}
        >
          {description}
        </p>
      ) : null}
      {children}
    </div>
  )
}
