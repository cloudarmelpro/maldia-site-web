import { describe, expect, it } from 'vitest'

import { ARTICLES, articlesTriees } from '@/content/articles'
import { LANGUES } from '@/content/langues'
import { PHOTOS } from '@/content/photos'

describe('WEB-15 — le blog', () => {
  it('les identifiants sont les memes dans les deux langues, et dans le meme ordre', () => {
    // C'est cette egalite qui permet au selecteur de langue de mener au meme
    // article, et au sitemap de n enumerer qu une seule liste.
    const [premiere, ...autres] = LANGUES.map((langue) =>
      ARTICLES[langue].map((article) => article.identifiant),
    )
    for (const liste of autres) expect(liste).toEqual(premiere)
  })

  it('aucun identifiant n est en double', () => {
    for (const langue of LANGUES) {
      const identifiants = ARTICLES[langue].map((article) => article.identifiant)
      expect(new Set(identifiants).size).toBe(identifiants.length)
    }
  })

  it('chaque article a une photo', () => {
    // Le type IdentifiantArticle le garantit a la compilation ; ce test le
    // verifie aussi a l execution, au cas ou la table serait elargie sans lui.
    for (const langue of LANGUES) {
      for (const article of ARTICLES[langue]) {
        expect(PHOTOS.blog[article.identifiant], article.identifiant).toBeTruthy()
      }
    }
  })

  it('les dates sont en ISO et le tri va du plus recent au plus ancien', () => {
    for (const langue of LANGUES) {
      const dates = articlesTriees(langue).map((article) => article.date)
      for (const date of dates) expect(date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      expect(dates).toEqual([...dates].sort().reverse())
    }
  })

  it('chaque article a un corps', () => {
    for (const langue of LANGUES) {
      for (const article of ARTICLES[langue]) {
        expect(article.corps.length, `${langue}/${article.identifiant}`).toBeGreaterThan(0)
      }
    }
  })
})
