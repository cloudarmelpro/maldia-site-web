# 0022 — Retour à DM Sans, en Light, et elle seule

**Demandée par le client** le 21 août 2026 : « on a changé le font et surtout au
grand titre, l'espace entre mot et texte », puis implémenter
`Hero Maldia v2.dc.html`.

Le fichier de design a été mis à jour : il charge maintenant **DM Sans** et plus
rien d'autre. C'est un retour au choix de la décision 0017, que la décision 0018
avait remplacé le jour même.

## Ce qui change

**Une seule police.** DM Sans porte tout : titres, texte lu et étiquettes.
Archivo et IBM Plex Mono disparaissent. Le fichier de design ne contient plus une
seule occurrence de `monospace` ni de `Plex` — vérifié.

**Une seule graisse, 300.** Le design ne pose que `font-weight: 300`, sur le
corps comme sur les titres et les `strong`. **Seule la marque « Agence Maldia »
monte à 400** — c'est la seule graisse que le design distingue encore.

Conséquence : le poids ne marque plus rien, ni registre ni emphase. Ce qui
distingue un titre est sa taille et son crénage ; ce qui distingue une étiquette
est ses capitales et l'espacement de ses lettres.

**Les étiquettes perdent le monospace** mais gardent capitales et espacement.
Les utilitaires `etiquette` et `etiquette-fine` n'ont donc plus de
`font-family` : elles héritent de DM Sans.

**L'axe de taille optique est demandé** (`axes: ['opsz']`, que le design appelle
par `opsz@9..40`). Sans lui la police se figerait sur un seul dessin, et le titre
à 104 px porterait celui conçu pour du texte à 14 px.

## Le crénage des grands titres était déjà juste

Le client pointe l'espacement du grand titre. Les valeurs du hero — `-0.055em`
entre les lettres et `-0.03em` entre les mots — **étaient déjà en place** depuis
la décision 0018. Ce qui a changé, c'est la police : DM Sans n'a pas les
métriques d'Archivo, donc le même réglage se lit autrement.

Mesuré sur l'export à 1440 px, contre les valeurs déclarées du design :

| Élément | Police | Graisse | Taille | Lettres | Mots |
|---|---|---|---|---|---|
| `h1` du hero | DM Sans | 300 | 92,2 px | −5,07 px | −2,76 px |
| `h2` de section | DM Sans | 300 | 40,3 px | −1,81 px | — |
| `h2` de contact | DM Sans | 300 | 60,5 px | −3,02 px | — |
| marque | DM Sans | 400 | 21 px | −0,94 px | — |
| étiquette | DM Sans | 300 | 11,5 px | +0,92 px | — |
| corps | DM Sans | 300 | 15,1 px | — | — |

`font-optical-sizing` vaut `auto` partout. Toutes les valeurs correspondent aux
déclarations du design au centième.

## Ce que ça donne sur le poids servi

Trois fichiers de police avant — Archivo variable, Plex Mono 400, Plex Mono 500.
Deux après, tous deux DM Sans : le découpage `latin` et `latin-ext` que Google
sert. C'est une police entière retirée du chemin critique, ce qui pèse sur
`WEB-9` (décision 0006, cible encore à trancher).

## Les autres fichiers de design sont restés en Archivo

`Services Maldia.dc.html` — et les autres — chargent encore Archivo. Seul le
fichier Hero a été mis à jour. La règle globale sur `body` vit dans ce fichier,
donc c'est lui qui décide de la police du site : une page d'accueil en DM Sans et
cinq pages en Archivo n'aurait aucun sens.

Conséquence assumée : les graisses `500` que posent les designs À propos,
Talents, Services, Blog et Contact sur leurs titres et leurs `strong` sont
**écartées** au profit du 300 global. Dix graisses explicites ont été retirées
des composants pour cette raison, et trois `strong` qui étaient en 600 sont
redescendus à 300.
