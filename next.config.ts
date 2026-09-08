import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /*
   * SANS CETTE LIGNE, AUCUNE PAGE NE S'ANIME EN DÉVELOPPEMENT.
   *
   * Le serveur de développement refuse la websocket de rechargement à chaud
   * quand l'`Origin` est `127.0.0.1` — mesuré le 9 septembre 2026 : la même
   * poignée de main rend `101 Switching Protocols` avec `Origin: localhost` et
   * rien du tout avec `Origin: 127.0.0.1`. Un navigateur envoie TOUJOURS
   * `Origin`, et sans cette websocket le paquet client n'est jamais amorcé :
   * l'écran est rendu, complet, et mort.
   *
   * `npm run build` puis `npm run start` ne passent par rien de tout cela, ce
   * qui rend le défaut invisible en production et le fait ressembler à un défaut
   * de l'écran qu'on vient d'écrire.
   *
   * Le raisonnement complet, avec les trois mesures, est dans le
   * `next.config.ts` de `cv/` — `CV-ADR-0083`.
   */
  allowedDevOrigins: ["127.0.0.1"],

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

  // `app/global-not-found.tsx` — la seule facon d'avoir un vrai 404 quand le
  // gabarit racine est un segment dynamique (`app/[langue]/layout.tsx`), ce que
  // la doc de Next donne comme cas d'usage. Sans ce drapeau, le fichier est
  // ignore en silence et l'export livre le 404 interne de Next : anglais, sans
  // `lang`, sans lien de retour.
  experimental: {
    globalNotFound: true,
  },
}

// ESLint ne tourne plus pendant `next build` en 16.3 — la cle `eslint` n'existe
// plus dans NextConfig. Le lint ne protege donc que par `npm run verifier`.

export default nextConfig
