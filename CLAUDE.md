@AGENTS.md

# site-web — la vitrine d'Agence Maldia

`agencemaldia.com` · **exigences `WEB-1` à `WEB-15`** dans `docs/cahier-site-web.MD`

Agence Maldia connecte des talents basés à Madagascar avec des entreprises
internationales — Québec et Canada francophone, France, Belgique, Suisse,
Luxembourg, Monaco.

Ce dépôt est **une seule application**. Les trois autres — CRM, application interne,
banque de CV — vivront dans leurs propres dépôts. Si une fonctionnalité relève de
`CV-*`, `TEAM-*` ou `CRM-*`, elle n'appartient pas ici : arrête-toi et dis-le.

## Ce que fait cette application

Elle présente Maldia à deux publics qui n'ont rien en commun : les talents à
Madagascar, et les entreprises qui cherchent à renforcer leurs équipes. Un visiteur
doit comprendre en quelques secondes lequel des deux il est, et où cliquer.

## Ce qu'elle N'A PAS, et c'est ce qui la définit

**Aucune base de données. Aucun compte. Aucun secret. Aucun processus.**

`output: 'export'`. Le site se sert comme des fichiers, sur n'importe quel
hébergement, mutualisé compris. Rien à surveiller, rien à redémarrer, aucune surface
d'attaque côté serveur.

Donc ceci n'existe pas, et `next dev` échoue si tu l'écris : Server Actions,
`cookies()`, `proxy.ts`, les réécritures, les redirections et les en-têtes de
`next.config`, la régénération incrémentale, le mode brouillon, les routes
d'interception, une route dynamique sans `generateStaticParams()`.

**Si une fonctionnalité exige un serveur, elle n'appartient pas à cette
application.** Ne la contourne pas — c'est le signe qu'elle relève d'un des trois
autres dépôts.

## Le document qui fait autorité

`docs/cahier-site-web.MD`, exigences numérotées. Le code et les tests **les citent** :
c'est ce qui rend « est-ce que c'est construit ? » répondable au lieu d'être discuté.

Une exigence marquée **[À TRANCHER]** n'est pas décidée : ne l'implémente pas,
signale-la.

`docs/decisions/` — un fichier par décision : ce qu'on a décidé, pourquoi, ce qu'on
a écarté. Une décision prise et non écrite sera reprise à l'envers dans six mois,
par quelqu'un qui lira un document devenu faux.

**Si tu es tenté de t'écarter du cahier, arrête-toi et demande.**

## Les deux boutons

**« Prendre rendez-vous »** mène au calendrier Cal.com déjà utilisé par le client
(`WEB-7`). Un lien, rien à construire.

**« Déposer ma candidature »** paraît à quatre endroits — `WEB-1`, `WEB-2`, `WEB-3`.
La banque de CV n'existe pas encore, donc sa destination est **reportée** : la
décision 0007 tranche que le bouton se construit quand même.

Les deux destinations sont **des constantes** dans `src/content/liens.ts`, jamais un
`href` recopié. Vides, `npm run verifier` échoue — un bouton mort ne peut pas partir
en production par oubli.

## Les textes

Français et anglais dès le départ (`WEB-8`), avec un passage facile d'une langue à
l'autre.

Les textes vivent dans `src/content/`, séparés du code, une langue par fichier. Un
texte écrit dans un composant est un texte que personne ne relit et que le client ne
peut pas corriger sans toucher au code.

**Aucune chaîne visible n'est inventée.** Les CTA sont ceux du cahier — « Déposer ma
candidature », « Prendre rendez-vous ». Si un libellé manque, demande plutôt
qu'inventer.

Typographie française : apostrophe courbe, espace insécable avant `:` `;` `!` `?`,
guillemets français, majuscules accentuées.

## Conventions

- App Router dans `src/app/`, alias `@/*` → `src/*`.
- Server Components par défaut ; `"use client"` seulement s'il y a état, effet ou
  événement, et **le plus bas possible dans l'arbre**. La directive porte sur le
  module entier, pas sur l'export.
- `params` et `searchParams` sont des Promises : les `await`.
- Aucun barrel file — import direct du fichier.
- `components/ui/` vient de shadcn et ne se modifie pas à la main : une variante se
  crée par composition dans `components/shared/`.
- Aucun hex brut dans un composant — les couleurs viennent des jetons.
- **Gestionnaire de paquets : `npm`.** Pas de pnpm, pas de yarn.

## SEO — trois choses que l'export statique change

**Les métadonnées se produisent à la compilation.** Pas de `generateMetadata`
dynamique côté serveur : titres, descriptions et balises Open Graph viennent de
`src/content/`, en même temps que les textes.

**Le sitemap et `robots.txt` sont des fichiers**, produits au build, et ils doivent
lister **les deux langues**.

**Aucune redirection côté serveur.** Une URL qui change se gère chez l'hébergeur —
donc la structure des adresses se fige **avant** la mise en ligne, pas après.

### Le piège du bilinguisme, et c'est le plus fréquent

Sans `hreflang` correct, Google traite les deux versions comme du contenu dupliqué
et n'en indexe qu'une : le travail sur la seconde langue est perdu, sans aucun
signal.

Trois règles : chaque page déclare **toutes** les variantes, y compris elle-même ;
les liens sont réciproques, sinon la déclaration est ignorée ; une balise
`x-default` désigne la version servie à qui ne correspond à aucune langue.

### La performance n'est pas un adjectif

`WEB-9` demande un site « rapide ». Cinq de ses six mots ne se vérifient pas ;
celui-là se chiffre. La cible est en décision 0006 — **à trancher avant la mise en
ligne**, sinon la question reviendra sous forme de désaccord après la livraison.

## Commandes

- `npm run dev` — serveur de développement
- `npm run build` — export statique dans `out/`
- `npm run verifier` — types, lint et tests d'un coup
- `npm run e2e` — Playwright sur sept écrans réels, du téléphone au grand moniteur
- `npm run lint`, `npm run typecheck`, `npm test`

Les agents SEO sont installés au niveau utilisateur et fonctionnent depuis ce
dossier : `/seo-audit`, `/seo-page`, `/seo-technical`, `/seo-schema`,
`/seo-hreflang`, `/seo-geo`.

## Skills du dépôt

Dans `.claude/skills/` :

- `frontend-design`, `ui-ux-pro-max` — conception d'écrans
- `design-motion-principles` — jugement sur le mouvement : trois regards de designers,
  et une **anti-checklist** des motifs qui trahissent une animation faite sans
  intention (fondu uniforme sur tout, décalage en cascade sur chaque liste, flou à
  l'entrée, durées au-delà de 300 ms, départ à `scale(0)`)
- `framer-motion` — motifs d'animation pour React et Next

Les deux dernières viennent de dépôts tiers sous licence MIT
(`kylezantos/design-motion-principles`, `Schoepplake/framer-motion-skill`) et sont
laissées **telles quelles**, avis de licence compris.

> Deux écarts à garder en tête en les lisant. Elles montrent parfois
> `from "framer-motion"` : ici c'est **`motion/react*`**. Et pour le réglage des
> regards, ce site est une page vitrine — pas un outil de productivité.

## Agents du dépôt

Dans `.claude/agents/` :

- `ingenieur-next` — implémentation
- `direction-artistique` — barre premium, rythme, contrastes, après chaque section
- `adaptation-ecrans` — mesure dans un vrai navigateur, de 360 à 2560 px
- `redacteur-bilingue` — chaînes visibles, typographie des deux langues, parité
- `animation-motion` — mouvement avec `motion`, coût en bundle, mouvement réduit
- `controle-qualite` — liens qui aboutissent, hreflang, ce que l'export produit
- `mise-en-ligne` — **avant tout déploiement** : ce que `out/` contient réellement

Sept, et pas plus : sans base, sans compte et sans fichier déposé, un auditeur de
schéma, de sécurité serveur ou de stockage n'aurait rien à lire ici.

`adaptation-ecrans` est séparé de `direction-artistique` parce qu'il fait un autre
geste : il ouvre un navigateur et relève des pixels. `md:flex-row` ne prouve pas
qu'une rangée tient à 768 px, et un `min-w-0` oublié plus haut dans l'arbre défait
la déclaration en dessous sans que ça paraisse dans aucun fichier.

Et il couvre les deux bouts, pas seulement le mobile : le grand écran échoue
**autrement**. Sans largeur maximale, un paragraphe atteint 297 caractères par ligne
à 2560 px — mesuré — et l'œil ne retrouve plus la ligne suivante. La contrainte y
bascule aussi de la largeur vers la **hauteur** : un portable 1440×900 offre
proportionnellement moins de place verticale qu'un téléphone.

## L'animation

La bibliothèque est **`motion`** — l'ancien Framer Motion. Seul le nom du paquet a
changé, pas l'API : les imports viennent de `motion/react*`, jamais de
`framer-motion`. Quatre points d'entrée, et le choix pèse sur le bundle : part de `motion/react-mini` ou de
`motion/react-m` avec `LazyMotion`, et ne prends `motion/react` que si une
fonctionnalité précise l'exige — en disant laquelle.

Tout composant animé est un composant client : `"use client"`, **le plus bas possible**.

N'anime que `transform` et `opacity`. Animer `width`, `height`, `top` ou `margin`
déclenche un recalcul de mise en page à chaque image, et fait tomber le défilement à
vingt images par seconde sur un téléphone d'entrée de gamme.

`prefers-reduced-motion` se respecte — `useReducedMotion`. Ce n'est pas une préférence
esthétique : une parallaxe donne la nausée à qui a des troubles vestibulaires.

## Commentaires

Uniquement pour une contrainte que le code ne montre pas : piège, omission
délibérée, invariant réparti entre plusieurs fichiers. Une à trois lignes.

Ni historique, ni provenance, ni paraphrase du code, ni justification adressée au
relecteur.

**Et jamais un décompte ni une mesure invérifiable depuis le code.** « Les quatre
sections », « 212 px » — ces phrases deviennent fausses en silence, et un commentaire
faux est pire qu'aucun commentaire.

## À ne pas faire

Pas de `any`. Pas de `proxy.ts` ni de `middleware.ts`. Pas d'emoji comme icône —
`lucide-react`. Pas de chaîne visible inventée. Pas de secret dans le dépôt.
Ne pas coder une API Next.js sans lire la doc dans `node_modules/next/dist/docs/`.
