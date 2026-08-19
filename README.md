# maldia-site-web

La vitrine publique d'Agence Maldia — `agencemaldia.com`.

Site bilingue français / anglais, en **export statique** : aucune base, aucun
compte, aucun secret. Il se sert comme des fichiers, sur n'importe quel
hébergement mutualisé.

## Commandes

| | |
|---|---|
| `npm run dev` | serveur de développement |
| `npm run build` | export statique dans `out/` |
| `npm run verifier` | types, lint et tests |
| `npm run e2e` | Playwright sur sept écrans, de 360 à 2560 px |

## Avant toute mise en ligne

`npm run verifier` **échoue volontairement** tant que les deux destinations
sortantes sont vides — l'adresse Cal.com et celle du bouton de candidature. Un
bouton mort ne peut donc pas partir en production par oubli.

Les photos sont pour l'instant des images de banque hébergées chez un tiers ;
voir `src/content/photos.ts`.

## Documentation

- `docs/cahier-site-web.MD` — les exigences `WEB-1` à `WEB-10`, qui font autorité
- `docs/decisions/` — une décision par fichier : ce qu'on a décidé, pourquoi, ce
  qu'on a écarté
- `CLAUDE.md` — les conventions du dépôt
