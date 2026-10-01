import { createReadStream, existsSync, statSync } from 'node:fs'
import { createServer } from 'node:http'
import { extname, join, normalize, resolve, sep } from 'node:path'
import { createGzip } from 'node:zlib'

/**
 * Le serveur de production, pour la « Node app » d'Hostinger.
 *
 * **Il ne sert que des fichiers.** Cette application est en `output: 'export'` :
 * il n'y a ni rendu serveur, ni base, ni session. La doc de Next le dit pour ce
 * mode — le resultat se sert « par n'importe quel serveur web ». Celui-ci en est
 * un, et `next start` n'existe pas pour un export statique.
 *
 * Il vit ici et non dans `e2e/` parce que les deux ne repondent pas de la meme
 * chose : celui des tests reproduit un hebergement, celui-ci en est un. Le
 * premier peut rester minimal ; celui-ci doit tenir le 404, le cache et la
 * compression, faute de quoi la cible de la decision 0006 est hors d'atteinte
 * quoi qu'on fasse au code.
 *
 * Aucune dependance. Un serveur de fichiers tient en cent lignes, et en ajouter
 * une pour ca en ferait une de plus a tenir a jour.
 */
const RACINE = resolve(process.cwd(), 'out')
const PORT = Number(process.env.PORT ?? 3000)

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.ico': 'image/x-icon',
}

/** Ce que la compression fait gagner : l'accueil passe de 250 Ko a 25 Ko. */
const COMPRESSIBLES = new Set(['.html', '.css', '.js', '.json', '.svg', '.xml', '.txt'])

/**
 * Les noms de `/_next/static/` portent un hachage : a nom egal, le contenu ne
 * change jamais. Les pages, elles, changent a chaque mise en ligne — les garder
 * ferait lire une version perimee sans aucun moyen de le savoir.
 */
const AVOIRS_HACHES = join(RACINE, '_next', 'static')

function cache(chemin) {
  if (chemin.startsWith(AVOIRS_HACHES)) return 'public, max-age=31536000, immutable'
  return extname(chemin) === '.html'
    ? 'public, max-age=0, must-revalidate'
    : 'public, max-age=86400'
}

/**
 * Le chemin sur disque que sert une URL, ou `null`.
 *
 * **`decodeURIComponent` est DANS le `try`, et c'est le point de cette
 * fonction.** Il leve `URIError` sur une sequence invalide — un simple
 * `GET /%` suffit. Hors du `try`, l'exception remontait jusqu'au processus et
 * le TUAIT : le site entier tombait sur une requete d'une ligne, mal collee ou
 * envoyee par un robot. Reproduit avant correction.
 */
export function fichier(chemin) {
  try {
    const absolu = normalize(join(RACINE, decodeURIComponent(chemin)))

    // La comparaison exige le separateur : `startsWith(RACINE)` seul laisserait
    // passer un dossier voisin nomme `out-vieux`.
    if (absolu !== RACINE && !absolu.startsWith(RACINE + sep)) return null

    // Aucun fichier cache ne se sert. Apache refuse `.ht*` nativement ; ce
    // serveur n'a pas cette regle, et `out/.htaccess` partait en clair.
    if (absolu.split(sep).some((part) => part.startsWith('.'))) return null

    // `trailingSlash: true` : chaque page est un `index.html` dans son dossier.
    return statSync(absolu).isDirectory() ? join(absolu, 'index.html') : absolu
  } catch {
    return null
  }
}

function servir(reponse, chemin, code, accepte) {
  const compresse = COMPRESSIBLES.has(extname(chemin)) && /\bgzip\b/.test(accepte)
  reponse.writeHead(code, {
    'content-type': TYPES[extname(chemin)] ?? 'application/octet-stream',
    'cache-control': cache(chemin),
    // L'export ne contient aucun script tiers ; le dire ferme la question.
    'x-content-type-options': 'nosniff',
    // Le site n'a ni compte ni formulaire qui parte : la surface est mince.
    // Ces deux en-tetes ne coutent rien et ferment ce qui reste — une adresse
    // fuitee dans un referent, et l'encadrement de la page par un tiers.
    'referrer-policy': 'strict-origin-when-cross-origin',
    'x-frame-options': 'SAMEORIGIN',
    ...(compresse ? { 'content-encoding': 'gzip', vary: 'Accept-Encoding' } : {}),
  })
  const flux = createReadStream(chemin)
  // Sans cet ecouteur, un `EMFILE` sous charge ou un fichier disparu entre le
  // `existsSync` et la lecture emet une erreur que personne n'attrape — et le
  // processus meurt, comme pour `decodeURIComponent`.
  flux.on('error', () => reponse.destroy())
  if (compresse) flux.pipe(createGzip()).pipe(reponse)
  else flux.pipe(reponse)
}

/**
 * Le serveur ne demarre pas quand ce fichier est importe par un test : sans
 * cette garde, `vitest` ouvrirait un port et ne rendrait jamais la main.
 */
const LANCE_DIRECTEMENT = process.argv[1]?.endsWith('serveur.mjs') ?? false

// Sous la garde, et pas avant : les tests tournent dans `prebuild`, donc avant
// que `out/` existe, et un import ne doit jamais tuer le processus.
if (LANCE_DIRECTEMENT && !existsSync(RACINE)) {
  // Message explicite plutot qu'un 404 sur toute page : c'est l'erreur de
  // configuration la plus probable, et elle ne se devine pas depuis un journal.
  console.error(
    "Le dossier `out/` n'existe pas. Ce serveur ne construit rien : il sert ce que\n" +
      '`npm run build` a produit. Chez un hebergeur, la commande de construction\n' +
      'doit etre `npm run build`, et celle de demarrage `npm start`.',
  )
  process.exit(1)
}

if (LANCE_DIRECTEMENT)
  createServer((requete, reponse) => {
  const accepte = requete.headers['accept-encoding'] ?? ''
  const chemin = fichier(requete.url.split('?')[0])

  if (chemin && existsSync(chemin)) {
    servir(reponse, chemin, 200, accepte)
    return
  }

  // Le 404 du site, avec le code 404 — pas une page d'erreur avec un 200, que
  // les moteurs indexeraient comme une page valide.
  const introuvable = join(RACINE, '404.html')
  if (existsSync(introuvable)) {
    servir(reponse, introuvable, 404, accepte)
    return
  }

  reponse.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' })
  reponse.end('404')
  }).listen(PORT, () => {
    console.log(`site-web sert ${RACINE} sur le port ${PORT}`)
  })
