# 0023 — Refonte complète sur « Site Maldia »

**Demandée par le client** le 26 et 27 août 2026 : implémenter
`Site Maldia.dc.html` du projet de design `9a7a25b5-a7f4-4dbf-948f-6e5acc79b134`,
« exactement comme dans le design, sans rien changer ni de pixel ».

Le projet fournit un document de passation détaillé, `design_handoff_site_maldia/README.md`,
qui **prime sur le prototype** partout où les deux se contredisent. Il y en a
plusieurs cas ; ils sont listés plus bas.

Cette décision remplace les décisions 0018 et 0022 pour tout ce qui touche à la
palette, à la typographie et à la mise en page.

## Ce qui change

**Deux couleurs de marque, le vert et le blanc.** Le lime `#cdf565` est
**entièrement retiré** à la demande du client : plus une trace dans le dépôt,
jeton compris. Les surfaces d'action passent au blanc sur fond vert et au vert
`#177e4f` sur fond clair ; les accents ponctuels au vert clair `#4fbf87`.

**Jost** remplace DM Sans, en fonte variable 200 à 700. Deux graisses lues :
300 pour le texte, 400 pour les titres et les intitulés ; 200 sur les très
grands chiffres.

**Le conteneur passe de 1400 à 1080 px**, gouttière posée *dans* la boîte.
L'en-tête, les sections et le pied le partagent.

**La colonne d'intitulé de 190 px disparaît.** La pastille se pose au-dessus du
contenu, dans la colonne de la section. `GRILLE_INTITULE` n'a plus d'usage.

**L'en-tête devient collant dans le flux** — `sticky` avec une marge basse
négative, jamais `fixed` : un élément fixe se cale sur la fenêtre, barre de
défilement comprise, et se décalait des sections. Il prend le fond exact de la
section qu'il survole, `background-size` et `background-position` recalés sur la
boîte de cette section pour que la jointure soit invisible, et son encre bascule
sur la luminance de ce fond.

**Le bloc Contact et le pied fusionnent** en une seule section verte, coins
supérieurs arrondis à 28 px.

**Le chevron flottant remplace le retour en haut** : il remonte à la section
précédente, calée sous l'en-tête.

## Ce qui a été écarté du prototype, et pourquoi

**Les héros des pages intérieures — deux allers-retours, tranchés par la
version 2.** Le document de passation écrit « hero vert » ; la version 1 du
prototype montrait pourtant `#0b1712`. **La version 2 tranche : `#177e4f`, avec
des coins BAS arrondis de 28 px**, en miroir de la coiffe du bloc Contact.

**La leçon de méthode.** Lire le prototype ne suffit pas : il faut le *rendre*.
Il charge React et Babel depuis un CDN et s'hydrate ; en remplaçant

```js
const initiale = this.props && this.props.pageInitiale;
```

par la page voulue et en servant le dossier en HTTP, on obtient la vérité de
référence. Comparer ensuite les fonds calculés section par section entre le
design et le site donne une réponse binaire, page par page. C'est cette
comparaison, et elle seule, qui a réglé la question.

**Les voiles blancs sur le vert.** La passation est formelle et donne le calcul :
le blanc sur `#177e4f` ne vaut que **5,1 : 1**, et un voile blanc éclaircit
l'aplat au point de faire passer le texte sous le seuil AA. Tout voile est donc
sombre — `#06301d` en opacité. Le prototype pose pourtant `rgba(255,255,255,0.42)`
sur ses pastilles de section verte : **les deux documents se contredisent, et la
règle écrite l'emporte.**

**Les gris de l'ancienne charte sombre** — `#a9bcb1`, `#8fa79a`, `#85988f` — sont
interdits sur le vert. Ils y descendent sous le seuil.

**L'échelle des titres de page.** Le prototype est incohérent avec lui-même :
42 px sur Services, 39 sur le Blog, 28 sur Contact, Talents et À propos. Le
tableau typographique de la passation tranche à `clamp(26px, 3.2vw, 42px)`, et
c'est lui qui est suivi partout.

**Le blanc sur blanc.** Le prototype donne `#ffffff` à la fois à des sections et
aux cartes qu'elles portent — invisible tel quel. La règle de carte de la
passation s'applique : `bg-primaire/5`, sans contour.

**La page Talents n'est pas réduite.** Le prototype ne lui donne que deux
sections, « volontairement, elle n'était pas dans le périmètre » selon la
passation. Ses trois sections et son contenu sont conservés, portés sur le
nouveau système par analogie.

## Version 2 du design — 27 août 2026

Le client a mis le prototype à jour. Les changements structurels :

- **Les héros intérieurs sont verts, coiffés en bas de 28 px.** Plus aucune
  section sombre sur le site : `#0b1712`, les bandes à halos radiaux et
  l'utilitaire `bande-encre` disparaissent.
- **L'intitulé de section perd son aplat.** Plus de pilule : une puce ronde de
  6 px suivie du libellé en capitales, sur toutes les pages, accueil compris.
  `Pilule` est supprimé, remplacé par `IntituleSection` (`shared/`).
- **La colonne d'intitulé de 190 px n'a plus aucun appelant** :
  `GRILLE_INTITULE` et `DECALAGE_CONTENU` sortent de `section.tsx`.
- Chaque page intérieure gagne des sections ; Talents passe de deux à cinq.

Le test d'écran « les pilules serrent leur texte » est retiré : il gardait un
défaut de la grille à deux colonnes — la pastille étirait son fond sur les
190 px de la colonne — et la pastille comme la colonne ont disparu. Il visait
`[data-pilule]`, donc il serait passé à vide sans plus rien garantir.

**Vérifié après refonte : les six pages ont, section par section, le même fond
et les mêmes rayons que le design rendu.**

## Les coiffes sont retirées — 28 août 2026

Le client a fait retirer **tous les arrondis de section** : les coins bas des
héros de page et de l'article, puis la coiffe haute du bloc Contact. Les aplats
verts vont désormais d'un bord à l'autre.

**Cela annule la règle de la section suivante.** Elle disait que la section
précédant le bloc Contact ne devait pas être verte, parce que la coiffe s'y
lisait comme deux encoches blanches aux angles. Il n'y a plus de coiffe.

La contrainte qui reste est plus simple, et elle vient du contenu et non du
dessin : **deux bandes vertes qui se touchent ne font qu'une**, et la limite
entre les deux disparaît. Les commentaires des sections concernées ont été
réécrits en ce sens — `a-propos-reperes` et `talents-candidature` justifiaient
leur fond clair par la coiffe.

Seul `a-propos-fonctionnement` garde un `rounded-coiffe` sur ses quatre coins :
c'est un bloc au milieu d'une page, pas une ouverture de section.

## Un défaut du système, trouvé à l'écran

Le bloc Contact est vert et coiffé de 28 px. **Quand la section qui le précède
est verte elle aussi, la coiffe ne se lit plus que comme deux encoches blanches
aux angles** — mesuré sur Services, dont le design fait finir la page par la
méthode.

**Règle à tenir : la section qui précède le bloc Contact ne doit pas être
verte.** Les cinq autres pages la respectent déjà.

Le prototype résout ce cas par une **bande sombre**, `#0f1d17` réveillée par deux
halos radiaux, l'un vert à gauche et l'autre blanc à droite (utilitaire
`bande-encre`). C'est le seul fond sombre du nouveau système, et il n'est pas un
reste de l'ancienne charte : il existe pour que la coiffe se lise. Services le
porte sur sa méthode, où le design le pose.

## Ce qui reste ouvert

- **Le flou à l'entrée** des titres et paragraphes est une demande du design. Le
  `CLAUDE.md` de ce dépôt demande de n'animer que `transform` et `opacity`, et la
  fiche `design-motion-principles` range le flou à l'entrée parmi les motifs à
  éviter. Il est tenu court et coupé sous `prefers-reduced-motion`. À confirmer.
- **Le hero charge seize images distantes au-dessus du pli** : elles mettent plus
  de trois secondes à arriver, mesuré. `WEB-9` demande un site rapide, et la
  décision 0006 n'a toujours pas de cible chiffrée.
- **Contenu devenu orphelin** par la refonte, laissé en place faute d'arbitrage :
  `contact.calendrier`, `contact.entete.cta`, `voie.intitule`, `blog.publieLe`,
  `blog.entete.cta`, `article.etiquettes`, `pied.titrePages`, `pied.navigation`,
  `commun.profils.cta`, `hero.carteAppel`, `hero.badges`, `hero.lecture`, et
  `etiquetteRendezVous()` de `liens.ts`.
- **Photos** : toutes des placeholders Unsplash. `PHOTOS.talents` et
  `PHOTOS.services` n'ont plus d'appelant.
- La section « Repères » d'À propos n'existe pas dans le prototype ; elle est
  gardée, la passation interdisant de changer l'architecture.
- Les intitulés « Ce que vous obtenez » (Services) et la vignette « RV » / « CV »
  du bloc Contact sont dans le prototype mais dans aucun fichier de contenu. Rien
  n'a été inventé.
