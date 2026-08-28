# 0025 — Révélation par lignes : GSAP, SplitText, Lenis

## Statut

Acceptée le 27 août 2026.

## Contexte

Le client a relevé l'animation de `the-racquet-hosue.vercel.app` et en a fourni
l'inspection : GSAP 3.15, `SplitText` avec `mask: "lines"`, `ScrollTrigger`,
`CustomEase`, et Lenis pour le défilement lissé. Valeurs exactes tirées du
bundle, reprises telles quelles.

Ce dépôt anime déjà avec `motion`. La question n'était donc pas « quelle
bibliothèque », mais « laquelle pour quoi ».

## Décision

> **Lue seule, cette section est périmée.** `motion` a été retirée depuis —
> voir « Suite » en fin de document. `Apparition` est écrite en GSAP. Ce qui
> suit dit pourquoi la frontière avait été tracée, pas ce que fait le code.

**Les deux coexistent, et la frontière est le texte.**

- **`Revelation`** (GSAP + SplitText) — les titres de section, les `h1` de page,
  les paragraphes qui les accompagnent. Chaque ligne monte derrière un masque en
  `overflow: clip`.
- **`Apparition`** (`motion`) — tout le reste : cartes, grilles, encarts,
  pastilles. Un fondu de bloc, avec décalage dans une grille.

La frontière n'est pas esthétique, elle est technique : **`motion` ne sait pas
découper un texte en lignes**, et surtout pas le redécouper quand les fontes
arrivent ou que la largeur change. C'est `autoSplit` qui fait tout le travail, et
il n'a pas d'équivalent.

Empiler les deux sur le même texte est interdit : le fondu porterait sur le bloc
entier pendant que les lignes montent. Les huit `Apparition registre="texte"` qui
enveloppaient des en-têtes ont donc été retirées.

### Les valeurs

Toutes relevées dans le bundle de référence, aucune inventée.

| | lignes | caractères |
| --- | --- | --- |
| découpe | `lines` | `lines,chars` |
| départ | `yPercent: 115` | idem |
| durée | 0,9 s | 0,5 s |
| décalage | 0,07 s | 0,02 s |

Courbe `cubic-bezier(.625,.05,0,1)`, posée par `CustomEase` — GSAP n'accepte pas
`cubic-bezier()` en chaîne. Déclenchement au défilement à `top 88%`, une seule
fois.

### Trois écarts avec le composant fourni

**`prefers-reduced-motion`.** Le composant du client n'en avait aucun.
`gsap.matchMedia()` n'exécute pas le bloc sous mouvement réduit : ni découpage ni
mouvement, le texte paraît.

**Le texte ne dépend pas du script pour être lisible.** La technique impose
`opacity: 0` sur le parent, rallumé par `autoAlpha` après le découpage. Posée en
dur, elle perd le texte pour toujours si GSAP ne charge pas — et ce site n'a rien
d'autre que du texte. La règle est donc enfermée dans
`@media (scripting: enabled)` : sans script, ou sur un navigateur qui ignore
cette requête, elle ne s'applique pas. **Elle échoue du bon côté.**

**Pas de `@ts-expect-error`.** La balise polymorphe est typée sur cinq balises
admises.

### Le voile de chargement — retiré depuis

> Ce voile n'existe plus : la décision 0026 l'a supprimé, et le `h1` du hero
> n'est plus révélé. Conservé ici parce qu'il explique la forme du filet de 4 s,
> qui lui a survécu.

Il existe pour une seule raison : le titre du hero et les `h1` des pages
intérieures sont au-dessus du pli, donc invisibles tant que GSAP n'a pas découpé
leurs lignes. Le voile couvre ce délai.

Il attend `document.fonts.ready` — les fontes décident du découpage — avec une
**échéance de 2,5 s** qui n'est pas une cible mais un garde-fou : une fonte qui
n'arrive jamais ne doit pas retenir la page derrière un écran plein.

Rendu par un composant client, il est absent du HTML statique : sans script, il
n'existe pas.

`Revelation` en mode `auChargement` attend son retrait, et non son propre
montage — sinon le hero jouerait sous le voile et serait fini quand on le
découvre.

### Lenis

Piloté par le ticker de GSAP et non par son `requestAnimationFrame` interne :
deux boucles d'images indépendantes mettraient ScrollTrigger en retard d'une
image, et les révélations se déclencheraient à côté de leur point.

**Lenis défile la vraie fenêtre.** `window.scrollY` reste juste et les écouteurs
de `scroll` reçoivent leurs événements — c'est ce qui a permis de laisser
l'en-tête collant, la barre de progression et le chevron **inchangés**.

Deux choses ont dû suivre :

- Le chevron passe par `faireDefilerVers`. `window.scrollTo({ behavior: 'smooth' })`
  animerait la même valeur que Lenis en même temps, et le défilement saccaderait.
- Les ancres internes prennent un décalage explicite. `scroll-padding-top` ne
  s'applique qu'au défilement natif : dès que Lenis intercepte, un titre visé
  atterrirait sous la barre collante.

**Rien n'est construit sous `prefers-reduced-motion`** : un défilement qui
continue après le geste est un cas type de gêne vestibulaire. La page garde alors
le défilement natif.

## Conséquences

**Le poids.** GSAP et ses trois plugins pèsent **54 Ko gzippés**. Le total du
JavaScript servi passe de 283 à **289 Ko gzippés** — l'écart est faible parce que
la révélation a remplacé des `Apparition` autant qu'elle s'est ajoutée. GSAP est
maintenant chargé sur **toutes** les pages, puisque chacune a des titres révélés.

`WEB-9` demande un site rapide et la décision 0006 n'a toujours pas de cible
chiffrée. **C'est le moment de la fixer** : le site vient de gagner une
dépendance d'animation de premier plan, et on ne saura pas dire si elle coûte
trop cher sans un nombre.

**Deux bibliothèques d'animation.** C'est un coût réel de compréhension. Il est
accepté parce que chacune fait ce que l'autre ne sait pas faire, et la frontière
est nette : du texte lu, ou pas.

## Deux pièges trouvés après coup, et la règle qu'ils donnent

### `NotFoundError` sur `insertBefore`

Signalé par le client :

> Failed to execute 'insertBefore' on 'Node': The node before which the new node
> is to be inserted is not a child of this node.

Cause : le voile se retirait par `element.remove()`. **Ce nœud est rendu par
React.** Le lui arracher laisse sa trace des enfants fausse ; le voile étant le
*premier* enfant du gabarit, l'insertion suivante d'un frère prend pour repère un
nœud qui n'est plus là — et c'est mot pour mot l'erreur.

Le retrait passe désormais par un rendu React : `setParti(true)`, puis
`return null`.

**La règle : ne jamais retirer ni déplacer un nœud que React a rendu.**
Le seul autre endroit qui touche au DOM est `SplitText`, et il remet tout en
place — `revert()` au démontage, avant que React ne retire l'hôte.

### Le voile bloqué après une navigation

`prete` vit au niveau du module, donc il **survit à une navigation côté client**.
La page suivante montait un voile dont la libération tombait aussitôt sur
`if (prete) return` : plus rien ne le retirait, et la page restait derrière un
écran vert.

Deux corrections, et il fallait les deux : une garde **locale à l'instance** pour
que le retrait ne dépende jamais de l'état laissé par la page précédente, et
`prete = false` au montage pour que les révélations ne lisent pas une valeur
périmée. L'effet du voile s'exécute avant ceux de `main`, donc l'ordre tient.

### Ce que l'instrumentation ne sait pas mesurer

Trois outils ont menti au cours de ce travail, et il faut le savoir avant de
diagnostiquer une animation : un `IntersectionObserver` créé depuis le monde
isolé de l'extension ne reçoit jamais ses rappels ; `window.scrollTo()` appelé de
là ne réveille pas les observateurs de la page ; et **`requestAnimationFrame` est
bridé quand la fenêtre n'est pas au premier plan**, ce qui fait paraître bloquée
une animation GSAP qui se déroule normalement.

**Ce qui reste fiable : la capture d'écran et l'état d'arrivée.** Le reste se
vérifie à l'œil, dans une fenêtre au premier plan.

## Suite — `motion` est retirée, le 28 août 2026

La frontière posée plus haut — « du texte lu, ou pas » — justifiait deux
bibliothèques. Elle ne justifiait pas leur coût, et la cible chiffrée de la
décision 0006 l'a tranché : **180 Ko de JavaScript par page**, dont 145
incompressibles pour React et Next. Trois bibliothèques d'animation n'y tiennent
pas.

`motion` est donc retirée. `Apparition` est réécrite avec GSAP et ScrollTrigger,
déjà chargés pour `Revelation` ; le panneau mobile garde son animation de sortie
sans `AnimatePresence`, par un état `monte` qui survit à la fermeture le temps du
fondu.

**Le gain de poids n'est pas le meilleur de l'affaire.** `motion` sérialisait son
état de départ dans le HTML statique — mesuré, **31 blocs à `style="opacity:0"`
par page**. Sans script, ou avec un script qui n'arrive pas, ils restaient
invisibles pour toujours, hors de portée de la garde
`@media (scripting: enabled)` et du filet de 4 s. Ils portent maintenant la
classe `revelable` comme le reste.

| | avant | après |
| --- | --- | --- |
| JS gzippé, tous morceaux | 289,7 Ko | **264,5 Ko** |
| `opacity:0` en ligne, par page | 31 | **0** |
| bibliothèques d'animation | 3 | 2 |

**Et la question ouverte du flou se referme.** Le registre `texte` d'`Apparition`
posait un `filter: blur()` — la seule propriété animée du dépôt qui ne fût ni
`transform` ni `opacity`, que la décision 0023 laissait « à confirmer ». Son
dernier appelant, la déclaration de la page À propos, est passé à `Revelation` ;
le registre et le flou ont disparu avec lui.

Vérifié dans un navigateur : le menu s'ouvre, **se ferme en gardant son fondu de
sortie** — panneau présent à `opacity: 0` pendant la fermeture, retiré ensuite —
et se rouvre. Après défilement jusqu'au bas de l'accueil, les seuls éléments
encore masqués sont les cinq réponses repliées de la FAQ.

## Ce qui a été volontairement laissé de côté

**Les titres de cartes** — `carte-article`, `blog-liste`, `profils`,
`services-selecteur`. Ils restent sur `Apparition`. Les révéler demanderait une
instance de `SplitText` par carte, soit des dizaines par page, pour un titre
d'une ou deux lignes déjà porté par le décalage de sa grille.

**Le `h2` de Base**, qui porte le grand nombre, n'est pas découpé lui-même : il
est une colonne flex, et le découpage remplacerait ses deux enfants par des
lignes — son `gap` passerait alors entre les lignes du nombre au lieu de séparer
le nombre de sa légende. **Chaque part est révélée séparément**, et la mise en
page tient.

**Le petit texte du pied** — la mention sous le logotype. Une mention légale qui
monte ligne par ligne se remarquerait pour rien.
