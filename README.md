# maldia-site-web

La vitrine publique d'Agence Maldia — `agencemaldia.com`.

Site bilingue français / anglais, en **export statique** : aucune base, aucun
compte, aucun secret. Il se sert comme des fichiers, sur n'importe quel
hébergement mutualisé.

## Les pages

Six pages par langue, plus une par article de blog. La liste vit dans `PAGES`,
dans `src/content/langues.ts` — le menu, le sitemap et la suite Playwright la
lisent, aucun des trois ne la réénumère.

| | pour qui |
|---|---|
| `/fr/` | les deux publics, et le choix entre eux |
| `/fr/services/` | les entreprises |
| `/fr/talents/` | les candidats à Madagascar |
| `/fr/a-propos/` | — |
| `/fr/blog/` et `/fr/blog/<article>/` | — |
| `/fr/contact/` | le calendrier Cal.com, et la candidature |

Le français est servi à la racine, quelle que soit la langue du navigateur.

## Commandes

| | |
|---|---|
| `npm run dev` | serveur de développement |
| `npm run build` | export statique dans `out/` |
| `npm run verifier` | types, lint et tests |
| `npm run e2e` | Playwright sur sept écrans, de 360 à 2560 px, toutes les pages |

## Avant toute mise en ligne

`npm run verifier` **échoue volontairement** tant que les deux destinations
sortantes sont vides — l'adresse Cal.com et celle du bouton de candidature. Un
bouton mort ne peut donc pas partir en production par oubli.

Les photos sont pour l'instant des images de banque hébergées chez un tiers ;
voir `src/content/photos.ts`.

Les articles du blog sont des **textes provisoires**, à remplacer ; voir
`src/content/articles.ts`.

Le compteur de candidats se modifie à un seul endroit, `src/content/chiffres.ts`.
Il n'est pas synchronisé avec l'application de CV.

## Documentation

- `docs/cahier-site-web.MD` — les exigences `WEB-1` à `WEB-15`, qui font autorité
- `docs/decisions/` — une décision par fichier : ce qu'on a décidé, pourquoi, ce
  qu'on a écarté
- `CLAUDE.md` — les conventions du dépôt
