# 0013 — Un dépôt par application

**Statut :** ARRÊTÉE
**Date :** 18 août 2026 · hébergement tranché le 28 août 2026

## Décision

**Un dépôt Git par application, privé.** Celui-ci est `site-web` : la vitrine
`agencemaldia.com`. Le CRM, l'application interne et la banque de CV auront chacun
le leur, créés au moment où on les commence.

Chaque dépôt porte tout ce dont il a besoin pour être travaillé seul : ses agents et
ses skills dans `.claude/`, sa part du cahier dans `docs/`, ses décisions.

## Pourquoi

**On avance une application à la fois** (0002). Un dépôt unique aurait tenu trois
dossiers vides pendant des mois, et il aurait obligé à ouvrir la session à sa racine
pour que les agents soient trouvés — les agents et les skills ne descendent que du
dossier d'ouverture, alors que les instructions d'un `CLAUDE.md` remontent
l'arborescence.

Un dépôt par application supprime ce piège : on ouvre `site-web`, et tout est là.

Le coût assumé : ce qui est vraiment commun — la typographie française, la règle
« aucun libellé inventé », les règles de commentaire — existera en plusieurs copies.
Elles divergeront. On l'accepte parce que ces règles bougent peu, et parce que la
recopie se fait au moment de créer le dépôt suivant, pas en continu.

## Le dépôt est privé

`site-web` n'a aucun secret — c'est ce qui le définit. Les trois autres en auront :
chaînes de connexion, clés IAM, secret de session.

> Sur un autre projet, un mot de passe d'administrateur est parti dans un dépôt
> public au premier commit et y est resté des mois. Un dépôt privé n'aurait pas
> empêché la faute, mais il en aurait borné la portée.

## Hostinger : deux produits, deux réponses

**`site-web` — l'hébergement mutualisé suffit.** Export statique : des fichiers,
servis depuis `public_html`. Rien à surveiller, rien à redémarrer, aucune surface
d'attaque côté serveur. C'est le plan le moins cher qui convient.

**Les trois autres — un VPS sera nécessaire.** Ce sont des applications Node en
exécution, avec une base et des migrations : un hébergement mutualisé ne les fait pas
tourner.

**Ce qu'il reste à trancher :** acheter le mutualisé maintenant pour le site et le
VPS plus tard, ou le VPS tout de suite et y servir aussi les fichiers du site. Le
second simplifie — un seul endroit, un seul certificat à renouveler — au prix de
payer un VPS pendant les semaines où seul le site existe.

## Comment le site arrive chez Hostinger — tranché le 28 août 2026

**Par la « Node app » d'Hostinger, connectée à ce dépôt GitHub.** C'est la
méthode que le client emploie déjà sur ses autres projets : on choisit le dépôt
dans le panneau, et Hostinger clone, installe et démarre.

**Ce qui manquait pour que ça marche, et qui explique le blocage.** Une Node app
lance une *commande de démarrage*. Ce dépôt n'en avait aucune, et il ne peut pas
avoir celle de Next : avec `output: 'export'`, `next start` n'existe pas — la doc
de Next dit que le résultat se sert « par n'importe quel serveur web ».

Sans commande de démarrage, Hostinger clone, installe, et n'a rien à lancer.

**La réponse est `serveur.mjs`**, à la racine, et `npm start` qui l'appelle. Il ne
sert que des fichiers : il ne rend rien, ne consulte rien, n'a aucun état. Les
deux réglages à mettre dans le panneau :

| champ | valeur |
| --- | --- |
| commande de construction | `npm run build` |
| commande de démarrage | `npm start` |

Ce serveur tient ce qu'un hébergeur tiendrait autrement : le 404 servi **avec le
code 404** et non un 200 qu'un moteur indexerait, les types MIME, les en-têtes de
cache — `immutable` sur les avoirs hachés de `/_next/static/`, revalidation sur
les pages — et la compression, qui fait passer l'accueil de 250 Ko à 25 Ko.

**`public/.htaccess` reste, et ne sert pas ici.** Il tient les mêmes garanties
pour Apache, si le site passait un jour sur du mutualisé simple. C'est le seul
doublon assumé du dépôt, et son en-tête le dit.

Deux conséquences à ne pas découvrir plus tard :

**`out/` n'est pas dans le dépôt.** Il est ignoré, et c'est voulu : un build commité
crée un conflit à chaque poussée et gonfle l'historique sans rien prouver. C'est
Hostinger qui construit, à partir des sources.

**Aucun identifiant nulle part.** La connexion passe par GitHub, dans le panneau
d'Hostinger : rien à mettre dans le dépôt, et c'est ce qui garde `site-web` sans
secret.

**Aucune redirection côté serveur n'est possible depuis le code.** Une URL qui change
se gère chez l'hébergeur — d'où la règle du `CLAUDE.md` : figer la structure des
adresses avant la mise en ligne, pas après.

## Ordre de mise en ligne

Le domaine chez Hostinger, puis le certificat, puis la première construction
vérifiée en local, puis la tâche de déploiement, puis le premier dépôt réel.

Les destinations des deux boutons (0007, `WEB-7`) doivent être remplies **avant**
cette dernière étape : `npm run verifier` échoue tant qu'elles sont vides.

## Ce qu'on a écarté

**Un dépôt unique pour les quatre applications.** Retenu un temps, puis écarté : il
imposait d'ouvrir la session à la racine pour que les agents soient visibles, et il
gardait trois dossiers vides pendant des mois.

**Commiter `out/`.** Ce serait le chemin le plus court vers un déploiement par
`git pull` chez l'hébergeur. Écarté : un artefact de construction dans l'historique
est un conflit à chaque poussée, et il ne prouve rien sur ce qui l'a produit.

**Vercel ou Netlify pour le site.** Techniquement idéal pour un export statique, mais
le client a arrêté un hébergement chez Hostinger, et deux hébergeurs pour un domaine
font deux endroits où chercher quand le certificat expire.
