/**
 * Les trois marques de réseaux, dessinées ici.
 *
 * `lucide-react` ne fournit plus d'icônes de marque depuis la version 1 — elles
 * ont été retirées de la bibliothèque. Les redessiner évite une dépendance
 * supplémentaire pour trois glyphes, et le dépôt interdit l'emoji comme icône.
 *
 * Elles héritent de `currentColor` et se dimensionnent par `className`, comme
 * celles de lucide : un appelant ne voit pas la différence.
 */

type Props = { className?: string }

export function Facebook({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.6c-.29-.04-1.27-.13-2.4-.13-2.38 0-4 1.45-4 4.12v2.31H7.6V13h2.7v8z" />
    </svg>
  )
}

export function Linkedin({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M6.94 5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0M3.5 8.5h3.1V21H3.5zM9.6 8.5h2.97v1.71h.04c.42-.78 1.43-1.6 2.94-1.6 3.13 0 3.71 2.06 3.71 4.74V21h-3.1v-5.9c0-1.41-.03-3.22-1.96-3.22-1.96 0-2.26 1.53-2.26 3.11V21H9.6z" />
    </svg>
  )
}

export function Instagram({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  )
}
