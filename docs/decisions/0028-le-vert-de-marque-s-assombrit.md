# 0028 — Le vert de marque s'assombrit, et le second vert disparaît

- Statut : **acceptée** — 1er septembre 2026
- Date : 2026-09-01
- Exigences : `WEB-9` par ricochet — l'accessibilité y est nommée, pas chiffrée
- Tranche : direction artistique, sur mesure de contraste
- Portée : `src/app/globals.css`, `public/favicon.svg`, et tout ce qui en hérite

## Contexte

La décision 0023 a posé deux verts : `#177e4f` pour les surfaces d'action et le
texte de marque sur fond clair, `#4fbf87` pour les accents ponctuels.

La décision 0027 a mesuré le premier et l'a laissé passer de justesse :
**4,65:1 sur `--color-fond-2`**, quinze centièmes au-dessus du seuil AA. Elle le
notait comme une marge, pas comme un problème.

Une marge de quinze centièmes n'en est pas une. Elle tient tant que le vert reste
sur les deux fonds mesurés ; elle tombe dès qu'on le pose sur une surface
légèrement teintée, ou qu'on l'affaiblit d'un voile — et le site le fait à
plusieurs endroits, dont le halo du bloc Contact et les pastilles de filtre.

## Décision

**`--color-primaire` passe de `#177e4f` à `#14603f`.** La paire sombre suit :
`--color-primaire-fonce` vaut `#0f4b31`.

Mesuré :

| paire | avant | après |
| --- | --- | --- |
| primaire sur blanc | 5,08:1 | **7,57:1** |
| primaire sur `--color-fond-2` | 4,65:1 | **6,92:1** |
| blanc sur primaire | 5,08:1 | **7,57:1** |
| blanc sur primaire-fonce | — | **10,14:1** |

Le gain est de deux points et demi partout. Ce n'est plus une marge, c'est un
écart : le vert supporte maintenant d'être posé sur une surface teintée, ou
affaibli, sans qu'il faille remesurer à chaque fois.

**Le vert clair `#4fbf87` est retiré.** Il ne servait plus qu'aux accents que la
refonte du hero a fait disparaître, et il n'a jamais tenu 4,5:1 sur blanc — il
n'était utilisable que sur un aplat sombre, c'est-à-dire nulle part depuis que le
hero est clair.

## Ce que ça coûte

Le vert est **plus sombre**, donc moins vif. Sur un grand aplat — la bande du
bloc Contact, le pied — la différence se voit : le vert lit comme un vert de
sapin là où l'ancien lisait comme un vert d'émeraude.

C'est le compromis, et il est assumé : la vivacité de l'ancien venait
précisément de la luminance qui le mettait à quinze centièmes du seuil.

## Ce qui a été écarté

**Garder `#177e4f` et interdire les surfaces teintées.** C'est la règle que 0027
proposait implicitement. Elle échoue au premier voile posé par un composant qui
ne connaît pas la règle — et c'est déjà arrivé deux fois.

**Ne changer que le texte, garder l'aplat.** Deux verts de marque à cinq
centièmes l'un de l'autre : personne ne saurait lequel appeler, et le premier
usage à côté de l'autre trahirait l'écart.

## Ce qu'il fallait chercher, et qu'un audit a trouvé

Le vert vivait à **deux endroits que le jeton ne couvre pas** :

- `public/favicon.svg` — un fichier, pas une feuille de style. Aucune variable
  CSS ne l'atteint.
- `halo-voie` dans `globals.css`, qui posait `rgb(23 126 79 / …)` en dur — les
  composantes de `#177e4f` recopiées à la main. Réécrit en
  `--alpha(var(--color-primaire) / …)`, il suit désormais le jeton.

C'est la leçon : **un jeton de couleur ne garantit rien tant qu'un hex brut
subsiste ailleurs.** Le test `tests/jetons.spec.ts` interdit le hex dans les
composants ; il ne lit ni les SVG de `public/`, ni les valeurs `rgb()` de la
feuille elle-même.

## Suite

Les décisions **0018**, **0023** et **0027** citent `#177e4f` dans leur corps.
Elles ne sont pas corrigées — elles décrivent ce qui était vrai le jour où elles
ont été prises. Chacune porte un renvoi vers celle-ci.
