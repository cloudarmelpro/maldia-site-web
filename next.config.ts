import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Export statique : le resultat est un dossier de fichiers, servi par n'importe
  // quel hebergement. Ce n'est pas un choix de deploiement mais la definition de
  // cette application — voir CLAUDE.md, « Ce qu'elle n'a pas ».
  output: 'export',

  // Emet `/a-propos/index.html` plutot que `/a-propos.html`. Sur un hebergement
  // mutualise, c'est ce qui fait qu'une adresse de repertoire aboutit sans aucune
  // reecriture — et l'export statique ne permet aucune reecriture.
  trailingSlash: true,

  // Le chargeur par defaut de `next/image` exige un serveur, qui n'existe pas ici.
  // remotePatterns : les photos de remplacement sont hebergees chez Unsplash
  // (voir src/content/photos.ts) ; elles partiront avec elles.
  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
  },

  reactCompiler: true,
}

// ESLint ne tourne plus pendant `next build` en 16.3 — la cle `eslint` n'existe
// plus dans NextConfig. Le lint ne protege donc que par `npm run verifier`.

export default nextConfig
