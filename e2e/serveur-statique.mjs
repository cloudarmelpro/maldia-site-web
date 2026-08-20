import { createReadStream, statSync } from 'node:fs'
import { createServer } from 'node:http'
import { extname, join, normalize, resolve } from 'node:path'

/**
 * Sert le dossier `out/` comme le ferait un hebergement mutualise.
 *
 * Les tests visaient `next dev`, qui compile chaque route a la premiere
 * requete : sous sept navigateurs en parallele, la premiere visite d'une page
 * depassait le delai et l'echec ressemblait a un defaut de la page. Ici il n'y a
 * rien a compiler.
 *
 * Et surtout : c'est l'artefact qui part en production qui est mesure. `next
 * dev` ne produit pas l'export — il en produit une approximation.
 *
 * Aucune dependance : un serveur de fichiers tient en quarante lignes, et en
 * ajouter une pour ca en ferait une de plus a tenir a jour.
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
  '.woff2': 'font/woff2',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.ico': 'image/x-icon',
}

function fichier(chemin) {
  // normalize apres le join : c'est ce qui neutralise un `..` dans l'URL.
  const absolu = normalize(join(RACINE, decodeURIComponent(chemin)))
  if (!absolu.startsWith(RACINE)) return null

  try {
    if (statSync(absolu).isDirectory()) {
      const index = join(absolu, 'index.html')
      return statSync(index).isFile() ? index : null
    }
    return absolu
  } catch {
    return null
  }
}

createServer((requete, reponse) => {
  const chemin = new URL(requete.url ?? '/', 'http://localhost').pathname
  const trouve = fichier(chemin) ?? fichier('/404/index.html')

  if (!trouve) {
    reponse.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' })
    reponse.end('404')
    return
  }

  reponse.writeHead(fichier(chemin) ? 200 : 404, {
    'content-type': TYPES[extname(trouve)] ?? 'application/octet-stream',
  })
  createReadStream(trouve).pipe(reponse)
}).listen(PORT, () => {
  console.log(`out/ servi sur http://localhost:${PORT}`)
})
