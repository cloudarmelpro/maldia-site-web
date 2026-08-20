# 0017 — DM Sans, en Light, et elle seule

**Tranchée par le client** le 20 août 2026 : « on change tout le font à DM Sans,
c'est décidé », graisse Light.

## Ce qui est décidé

Une seule famille pour tout le site — titres, corps, libellés, chiffres — et
**deux graisses**, pas plus :

- **Regular (400)** pour le registre d'affichage, celui que marque `font-titre` :
  les `h1`, les `h2` de section, les chiffres du compteur et des repères, les
  intitulés d'action des cartes.
- **Light (300)** pour tout le reste, posé sur `body` : sous-titres,
  paragraphes, listes, libellés, boutons. Tout ce qui ne déclare rien en hérite.

Light seul avait été essayé d'abord, sur l'ensemble. Le client l'a refusé sur
les grands titres — à 70 px, une graisse Light ne porte plus le titre, elle
l'efface. Les sous-titres, eux, la gardent : c'est le contraste entre les deux
qui fait la hiérarchie, maintenant que la famille est unique.

Au-dessus, deux graisses d'appui subsistent là où un élément doit se détacher
sans être un titre : `font-medium` sur un titre de carte, `font-semibold` sur
une pastille en capitales. Aucune ne porte du texte courant.

## Ce que ça a demandé au-delà du nom de la police

**Toutes les graisses descendent d'un cran.** Ce qui était `bold` devient
`semibold`, `semibold` devient `medium`, `medium` devient `normal`, et `normal`
disparaît pour hériter du Light — puis le registre d'affichage le récupère
explicitement. La hiérarchie relative est conservée ; c'est le registre entier
qui s'allège. Sans ce décalage, cinquante-quatre déclarations de graisse
auraient annulé le Light là où il compte le plus.

Le décalage se fait en **une seule passe**, par jetons intermédiaires. Appliqué
en séquence, `font-bold` traverserait `semibold` puis `medium` et perdrait deux
crans au lieu d'un.

**Le crénage est repris, valeur par valeur.** Les valeurs négatives du dépôt
avaient été réglées sur une police d'affichage étroite : `-0.075em` sur les `h1`
et `h2`, et une dizaine de valeurs entre `-0.015em` et `-0.05em` dans les
composants. DM Sans est plus large — au même resserrement, ses lettres se
touchent.

La base des titres tient `-0.05em` de crénage et `-0.03em` de resserrement des
mots : le client veut les grands titres serrés, sur les deux axes. Les valeurs
des composants suivent la taille du texte qu'elles portent — `-0.055em` sur les
104 px du compteur, `-0.02em` sur les 21 px d'un titre de carte.

Un mapping global a été essayé et écarté : appliqué en une passe de
remplacements successifs, il traversait ses propres clés et divisait certaines
valeurs deux fois. Les valeurs sont donc posées une par une, ancrées sur la
taille de police de l'élément.

**La police à chasse fixe disparaît.** Elle ne portait que les numéros d'étapes
et de puces numérotées. Une famille de moins à télécharger, et une utilitaire
`font-mono` qui ne mentait plus sur ce qu'elle applique.

## Pourquoi les trois jetons restent distincts

`--font-titre`, `--font-corps` et `--font-description` désignent maintenant la
même famille. Ils ne sont pas fusionnés parce que les composants les citent
**par rôle** : le jour où une seconde police revient, elle se branche dans
`globals.css` et nulle part ailleurs. Fusionner ferait gagner trois lignes et
coûterait une passe sur tous les composants.

## Ce qu'on a écarté

**Le couple Bricolage Grotesque + Outfit**, qui reproduisait le site de
référence du début de projet. Écarté par le client. Il coûtait deux familles au
chargement pour une distinction — titres contre paragraphes — que DM Sans porte
seule par la graisse.

**Satoshi**, mesurée sur le site de référence et téléchargée. Jamais installée :
elle n'est pas sur Google Fonts, donc elle demanderait des fichiers dans le
dépôt et une déclaration `@font-face` à tenir à la main. `next/font` s'en charge
pour DM Sans, sans requête vers un tiers à l'exécution.

**Garder une police à chasse fixe pour les chiffres.** Écarté : les seuls
chiffres concernés sont des numéros à deux caractères dans des pastilles de
largeur fixe. L'alignement tabulaire n'y change rien de visible.

## Ce que ça engage

La graisse Light est fine par nature. Sur les petits textes gris — `encre-2` à
14 px — elle est à la limite de ce qui reste confortable à lire. Si un audit de
lisibilité la refuse, le recours n'est pas de remonter la graisse partout mais
de remonter le contraste du gris : la décision de police, elle, est prise.
