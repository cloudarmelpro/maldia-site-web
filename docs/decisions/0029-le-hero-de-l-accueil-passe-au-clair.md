# 0029 — Le hero de l'accueil passe au clair, et son titre se révèle

- Statut : **acceptée** — 1er septembre 2026
- Date : 2026-09-01
- Exigences : `WEB-1` (les deux publics), `WEB-2` (les appels), `WEB-9` (rapidité)
- Tranche : client, en deux temps — la refonte, puis la révélation
- Portée : `src/components/sections/hero.tsx`, `src/components/layout/en-tete.tsx`

## Contexte

Le client a demandé d'adapter **l'en-tête et le hero seulement** — le reste du
site ne bouge pas — depuis le prototype `Site Maldia` du projet de design
`9a7a25b5-a7f4-4dbf-948f-6e5acc79b134`, celui-là même qu'implémentait la
décision 0023.

Le projet a deux sources, et **elles se contredisent sur le hero**. Le document
de remise décrit encore l'ancien : aplat vert, deux colonnes de vignettes qui
défilent verticalement. Le prototype, lui, l'a entièrement refait en clair.

La décision 0023 avait posé la règle inverse — le document de remise prime sur le
prototype. Elle vaut pour les **règles** que le document énonce et que le
prototype applique mal ; elle ne vaut pas quand le prototype décrit un écran que
le document ne décrit plus. Ici, c'est le prototype qui fait foi.

## Décision

**Le hero est blanc, et tout y est centré.** Dans l'ordre : une ligne de preuve
portant quatre portraits qui se chevauchent, le titre en encre, le chapeau, les
deux appels de `WEB-2`, puis un éventail de cinq cartes en perspective.

**L'éventail est en CSS pur.** Il tourne sans script, comme le reste du hero.
C'est le premier écran : rien n'y attend un bundle.

**Le titre et le chapeau se révèlent ligne par ligne**, à la demande du client,
comme le reste du site — `Revelation` avec `desLeMontage`, sans attendre un point
de défilement.

## Ce que ça coûte, et c'est le point de cette fiche

`Revelation` est réservée au contenu **sous la ligne de flottaison**. Sa
documentation le dit, et pour une raison qui n'est pas esthétique : le texte
**part invisible** et attend GSAP.

Le hero est au-dessus du pli. Le mettre sous `Revelation` est donc une exception
frontale à la règle, et elle a un prix mesuré : **morceau GSAP avorté, 4,15 s
d'écran sans titre** avant que le filet de sécurité de 4 s ne le rallume.

Trois choses tiennent ce compromis, et aucune n'est facultative :

- `@media (scripting: enabled)` sur l'utilitaire `revelable` — sans script, le
  texte ne part jamais invisible. La garde s'ouvre en cas d'échec, elle ne ferme
  pas.
- Le filet `secours-revelation` à 4 s, qui rallume le texte si GSAP n'arrive
  jamais.
- `Revelation` retire `revelable` dès qu'il s'exécute, sinon le filet forcerait
  l'opacité d'un bloc encore sous le pli.

**Le compromis a été tranché par le client**, en connaissance du chiffre.

## Ce qui a été retiré, et pourquoi ça compte

Les deux colonnes de vignettes disparaissent, et avec elles `PHOTOS.vignettesHero`
et les deux animations de défilement vertical de `globals.css`. Elles n'avaient
que cet appelant.

Un audit a ensuite trouvé que les quatre portraits de la ligne de preuve
chargeaient **637 Ko** pour quatre pastilles de 26 px : `unoptimized: true`
n'émet aucun `srcset`, donc `sizes` ne fait rien et c'est la largeur de l'URL qui
descend. Une entrée `PHOTOS.visages` à `w=64` ramène le tout à **14,8 Ko**.

C'est la leçon à retenir de cette refonte : **sur un export statique, la largeur
demandée dans l'URL est la largeur téléchargée.** Aucune propriété de mise en
page ne la corrige.

## Deux réglages venus de la mesure

**L'éventail est masqué sous `prefers-reduced-motion`.** Il est décoratif — pas
de texte, `aria-hidden` — et ses cartes ne signifient rien à l'arrêt.

**Sa taille est bornée par la hauteur de la fenêtre**, pas seulement par sa
largeur : `min(44vw, 20rem, 40vh)`. Sans le troisième terme, l'éventail poussait
le hero sous le pli dès que la fenêtre était basse — relevé à 1024×600. Sur
téléphone la valeur ne change rien, `44vw` y reste le minimum.

## Ce qui reste ouvert

**Le budget de JavaScript.** La décision 0006 fixe 180 Ko gzippés par page ;
l'accueil en est à **205,3 Ko**. GSAP, `SplitText` et Lenis en sont la totalité.
Arbitrage client : relever le plafond, ou retirer la révélation du hero.
