import { describe, expect, it } from 'vitest'

import { fichier } from '../serveur.mjs'

/**
 * `serveur.mjs` n'avait AUCUN test, et c'est le seul code qui tourne en
 * production. Il est mort deux fois pendant l'audit du 1er septembre, tue par
 * un `GET /%` envoye par un agent qui sondait le site.
 *
 * `tests/hebergement.spec.ts` affirmait pourtant que « les memes garanties sont
 * tenues en JavaScript » — sans qu'une seule assertion touche ce fichier. Une
 * garantie annoncee et non testee est une garantie qu'on croit avoir.
 */
describe('serveur.mjs — la resolution de chemin', () => {
  it('ne leve JAMAIS sur une URL malformee', () => {
    // `decodeURIComponent` leve `URIError` sur toute sequence `%` invalide.
    // Hors du `try`, l'exception remontait au processus et le TUAIT : le site
    // entier tombait sur une requete d'une ligne, sans authentification.
    for (const url of ['/%', '/%zz', '/a%', '/%E0%A4%A', '/%%', '/fr/%']) {
      expect(() => fichier(url), `\`${url}\` doit rendre null, jamais lever`).not.toThrow()
      expect(fichier(url), url).toBeNull()
    }
  })

  it('refuse de sortir de `out/`', () => {
    for (const url of ['/../package.json', '/../../etc/passwd', '/%2e%2e/package.json']) {
      expect(fichier(url), url).toBeNull()
    }
  })

  it('refuse un dossier voisin dont le nom commence comme la racine', () => {
    // `startsWith(RACINE)` sans separateur laissait passer `out-vieux/`, qui
    // n'existe pas aujourd'hui — un fichier de sauvegarde depose un jour chez
    // l'hebergeur y serait devenu lisible publiquement, en silence.
    expect(fichier('/../out-vieux/secret.txt')).toBeNull()
    expect(fichier('/../outils/x')).toBeNull()
  })

  it('ne sert aucun fichier cache', () => {
    // Apache refuse `.ht*` nativement ; ce serveur n'a pas cette regle, et
    // `out/.htaccess` — la configuration de l'hebergement — partait en clair.
    for (const url of ['/.htaccess', '/.env', '/fr/.htaccess']) {
      expect(fichier(url), url).toBeNull()
    }
  })
})
