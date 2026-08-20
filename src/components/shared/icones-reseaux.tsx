type Props = { className?: string }

/**
 * Les trois marques du pied, aux traces du design.
 *
 * Dessinees ici et non importees : `lucide-react` ne porte plus d'icones de
 * marque depuis la version 1, et aucune bibliotheque tierce ne vaut trois
 * chemins SVG.
 */
export function Linkedin({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75V21h-4v-5.3c0-1.27-.02-2.9-1.8-2.9-1.8 0-2.07 1.37-2.07 2.8V21H9z" />
    </svg>
  )
}

export function Facebook({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.6c-.29-.04-1.28-.12-2.43-.12-2.4 0-4.04 1.47-4.04 4.16V9.9H7.5V13h2.73v8z" />
    </svg>
  )
}

export function Instagram({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="3.8" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17.1" cy="6.9" r="1.15" fill="currentColor" />
    </svg>
  )
}
