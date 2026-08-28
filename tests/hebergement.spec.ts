import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

import { SITE_URL } from '@/content/langues'

/**
 * Le `.htaccess` est la SEULE facon de poser une redirection ou un en-tete sur
 * ce site : `output: 'export'` desactive `redirects`, `rewrites` et `headers`
 * dans `next.config.ts`. Ce que le code ne peut pas dire, ce fichier le dit.
 *
 * Il est dans `public/`, donc copie dans `out/` par le build, donc depose dans
 * `public_html` avec le reste — verifie en appelant `recursiveCopy`, la fonction
 * que Next emploie lui-meme : elle ne filtre pas les fichiers caches.
 *
 * Ces tests ne prouvent pas qu'Apache l'applique. Ils prouvent qu'il existe
 * encore, et que son contenu n'a pas diverge des constantes du site — un
 * fichier de configuration sans appelant dans le code est exactement ce qu'on
 * supprime un jour sans savoir a quoi il servait.
 */
const HTACCESS = readFileSync('public/.htaccess', 'utf8')

describe('la configuration de l hebergement mutualise — decision 0013', () => {
  it('branche la page 404, qu Apache ne sert pas de lui-meme', () => {
    // `404.html` n'a aucun sens particulier pour Apache. Sans cette directive,
    // une adresse inconnue rend la page d'erreur generique de l'hebergeur, et
    // la 404 du site n'est jamais servie — sans aucun signal.
    expect(HTACCESS).toMatch(/^ErrorDocument\s+404\s+\/404\.html$/m)
  })

  it('ne redirige pas vers un hote que le site ne declare jamais', () => {
    // Les canoniques, le sitemap et les declarations hreflang descendent tous de
    // SITE_URL. Si elle prenait un `www`, la redirection de ce fichier enverrait
    // les visiteurs a l'oppose de ce que les pages annoncent.
    expect(SITE_URL, 'SITE_URL porte un www : la regle du .htaccess est a inverser').not.toMatch(
      /^https?:\/\/www\./,
    )
    expect(HTACCESS, 'la redirection www vers apex a disparu').toContain('RewriteCond %{HTTP_HOST} ^www\\.')
  })

  it('garde chaque bloc par IfModule', () => {
    // Sur un mutualise, une directive dont le module manque ne produit pas un
    // avertissement : elle rend le site entier en erreur 500. Le garde
    // transforme cette panne en simple absence d'effet.
    const ouverts = HTACCESS.match(/<IfModule /g) ?? []
    const fermes = HTACCESS.match(/<\/IfModule>/g) ?? []
    expect(ouverts.length).toBeGreaterThan(0)
    expect(ouverts.length, 'un IfModule non referme casse tout le fichier').toBe(fermes.length)

    for (const directive of ['RewriteEngine', 'Header set', 'AddOutputFilterByType']) {
      const ligne = HTACCESS.split('\n').findIndex((l) => l.trim().startsWith(directive))
      expect(ligne, `${directive} absent`).toBeGreaterThan(-1)
      const avant = HTACCESS.split('\n').slice(0, ligne)
      const ouvertsAvant = avant.filter((l) => l.includes('<IfModule ')).length
      const fermesAvant = avant.filter((l) => l.includes('</IfModule>')).length
      expect(ouvertsAvant, `${directive} est hors d'un IfModule`).toBeGreaterThan(fermesAvant)
    }
  })

  it('force https, puisque toutes les adresses du site sont en https', () => {
    expect(SITE_URL).toMatch(/^https:\/\//)
    expect(HTACCESS).toContain('RewriteCond %{HTTPS} !=on')
  })
})
