/**
 * Le logotype Maldia, fourni par le client.
 *
 * Trace en `currentColor` : il prend la couleur du texte de son parent, ce dont
 * l'en-tete a besoin — il bascule du vert au blanc selon la luminance du fond
 * qu'il survole, et un `fill` en dur l'en empecherait.
 *
 * Les deux rectangles et le point du `i` sont pleins ; tout le reste est un
 * contour de 26 unites. Le `viewBox` et cette epaisseur viennent du fichier du
 * client et ne se retouchent pas : les redessiner changerait la marque.
 */
export function Logo({ hauteur = 24, className }: { hauteur?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 765 209"
      role="img"
      aria-label="Agence Maldia"
      style={{ height: hauteur }}
      className={className}
    >
      <g
        transform="translate(0,-17)"
        fill="none"
        stroke="currentColor"
        strokeWidth="26"
        strokeLinecap="butt"
        strokeLinejoin="miter"
      >
        <path d="M13 200V127A47 47 0 0 1 107 127V200M107 127A47 47 0 0 1 201 127V200" />
        <circle cx="290" cy="140" r="47" />
        <path d="M337 80V200" />
        <path d="M379 30V200" />
        <circle cx="468" cy="140" r="47" />
        <path d="M515 30V200" />
        <path d="M557 80V200" />
        <rect x="544" y="40" width="26" height="26" fill="currentColor" stroke="none" />
        <circle cx="646" cy="140" r="47" />
        <path d="M693 80V200" />
        <rect x="94" y="200" width="26" height="26" fill="currentColor" stroke="none" />
        <circle cx="740" cy="93" r="22" strokeWidth="5" />
        <path d="M740 81L729 105M740 81L751 105M733.5 99H746.5" strokeWidth="4.5" />
      </g>
    </svg>
  )
}
