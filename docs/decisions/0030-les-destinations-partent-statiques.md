# 0030 — Les trois destinations peuvent partir vides, et le site part statique

- Statut : **acceptée** — 1er octobre 2026
- Date : 2026-10-01
- Exigences : `WEB-1`, `WEB-2`, `WEB-3` (candidature), `WEB-7` (rendez-vous)
- Tranche : client — « on met le formulaire en statique d'abord, pour que ça
  marche », puis « statique pour l'instant » pour le calendrier et le portail
- Amende : `0007` et `0019`, sur le seul point du refus à la construction
- Portée : `src/content/liens.ts`, `scripts/verifier-destinations.mjs`

## Contexte

Le dépôt est branché sur Vercel : chaque poussée sur `main` lance une
construction de production. Le projet n'y porte aucune variable, et
`npm run destinations` refusait la construction entière tant que les trois
adresses manquaient. Le site en ligne restait donc figé sur une version
antérieure — **qui servait déjà ces trois destinations vides**.

Aucune des trois n'a de valeur aujourd'hui : `cv/` n'est déployé nulle part,
l'identifiant Cal.com n'a pas été donné, et aucun point de réception n'est
choisi pour le formulaire.

## Décision

**Les trois variables deviennent facultatives** — l'ensemble `FACULTATIVES` de
`src/content/liens.ts`. Absentes, la porte de construction les accepte, et
**l'écrit dans le journal** au lieu de se taire :

    candidature  STATIQUE — NEXT_PUBLIC_PORTAIL_CANDIDATS absente, boutons sans destination (0030)

Ce que voit le visiteur :

- **les boutons de lien** — candidature, et les deux rendez-vous de la page
  contact — sont rendus **sans `href`**. Ce n'est pas `href=""`, qui pointerait
  vers la page courante : un `<a>` sans `href` n'est pas un lien, il ne prend pas
  le focus et ne s'annonce pas comme tel. C'est le rendu de la version en ligne ;
- **le formulaire** est affiché, ses boutons d'envoi **désactivés**, et la note
  dit pourquoi. Rien ne peut partir dans le vide, pas même au clavier.

**Une adresse posée reste vérifiée.** Facultative ne veut pas dire sans règle :
une adresse relative, `admin.`, `mailto:` pour la candidature et `http://` pour
le formulaire sont toujours refusés.

## Ce qui tient la garantie, maintenant que la porte ne la tient plus

Le formulaire était protégé deux fois — la porte, et le bouton désactivé. Il ne
l'est plus qu'une : `tests/formulaire.spec.ts` le rend vide et branché, avec un
contrôle négatif, et il a été vu rouge sur le défaut exact avant d'être cru vert.

Les liens, eux, ne sont plus protégés du tout contre l'oubli : c'est le risque
accepté. Un bouton qui ne mène nulle part **ressemble** à un bouton, et rien ne
le dit au visiteur. `0007` le nommait « le défaut le plus visible qu'un site
vitrine puisse avoir ». Maldia l'accepte pour l'instant, en connaissance de
cause, plutôt qu'un site en ligne figé.

## Comment on en sort

**Une ligne par destination.** Le jour où une adresse est arrêtée : la poser
dans les variables du projet Vercel, **puis retirer son nom de `FACULTATIVES`**.
La porte la refuse alors de nouveau absente — `tests/liens.spec.ts` prouve que le
refus revient. Sans ce retrait, une variable effacée par erreur repartirait
statique en silence.

`0007` demandait que la candidature soit arrêtée **avant que
`agencemaldia.com` soit public**. Cette condition n'est pas levée : c'est le
moment, au plus tard, où `candidature` doit quitter l'ensemble.

## Écarté

**Poser des adresses provisoires.** `cal.com/agencemaldia` figure dans le
design, mais personne n'a confirmé que le compte existe ; une adresse du portail
mènerait à une application qui ne répond pas. Un lien vers une erreur est pire
qu'un bouton inerte : le visiteur part.

**Garder la porte et ne pas déployer.** C'était l'état d'avant, et il laissait la
production sur une version que plus personne ne développe.
