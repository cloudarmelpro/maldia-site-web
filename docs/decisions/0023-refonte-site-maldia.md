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

**Les héros `#0b1712` des pages intérieures.** Reste de l'ancienne charte que la
passation remplace par le vert. Les cinq pages concernées prennent `#177e4f`.

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

## Un défaut du système, trouvé à l'écran

Le bloc Contact est vert et coiffé de 28 px. **Quand la section qui le précède
est verte elle aussi, la coiffe ne se lit plus que comme deux encoches blanches
aux angles** — mesuré sur Services, dont le design fait finir la page par la
méthode.

`Methode` gagne donc un registre clair, employé sur Services, dont le défaut
laisse l'accueil inchangé. **Règle à tenir : la section qui précède le bloc
Contact doit être claire.** Les cinq autres pages la respectent déjà.

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
