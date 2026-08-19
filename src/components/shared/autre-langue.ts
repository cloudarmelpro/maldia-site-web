import type { Langue } from '@/content/langues'

export function autreLangue(langue: Langue): Langue {
  return langue === 'fr' ? 'en' : 'fr'
}
