# 0027 — Les jetons du site sont calibrés sur blanc, et une surface teintée se remesure

- Statut : **acceptée** — 1er septembre 2026
- Date : 2026-09-01
- Exigences : aucune — c'est une propriété des jetons, pas une fonction
- Tranche : ingénierie, sur trois mesures
- Portée : `site-web/src/app/globals.css`, et les trois applications qui en héritent

## Contexte

Le site est une vitrine sur blanc. Ses encres claires ont été calibrées contre
`#ffffff`, et les commentaires de `globals.css` le disent depuis longtemps, un
jeton à la fois — `--color-indicatif` va jusqu'à écrire « le formulaire est en
`bg-white`, et c'est sur ce blanc qu'il faut mesurer ».

**La règle existait donc déjà, par jeton, et elle n'a empêché aucun des trois
accidents.** Un lecteur qui reprend le fichier de jetons y voit une palette
validée ; il ne voit pas que la validation porte sur un fond.

## La mesure, trois fois, sur trois dépôts

**`--color-encre-3` `#687b72` — 4,50:1 sur blanc, 4,12:1 sur `--color-fond-2`.**
Le CRM l'avait recopié pour son texte tertiaire. Il est fait de surfaces teintées :
la paire tombait sous le seuil AA. Trouvé en comparant les fichiers de jetons de
`cv/`, du CRM et du site — `crm/docs/jetons-comparaison.md`.

**`--color-primaire` `#177e4f` — 4,65:1 sur `--color-fond-2`.** Au-dessus du
seuil, avec **quinze centièmes**. Il portait les liens du CRM. La paire
n'apparaissait sur aucun des trois écrans relevés à la main ; elle est sortie dès
que la dérivation a parcouru les dix.

**`--color-indicatif` `#697a72` — 4,54:1 sur blanc, 4,15:1 sur
`--color-fond-2`, 4,10:1 sur `--color-pilule`.** **Quatre centièmes** de marge sur
le fond pour lequel il a été calibré. Trouvé sur la planche de `team/`, et
**seulement à la main** : la dérivation lit `color` sur l'élément, jamais
`::placeholder`. Aucun instrument ne couvre ce jeton aujourd'hui.

Trois jetons, trois dépôts, **un seul mécanisme**.

## Décision

**Les jetons d'encre claire du site sont calibrés sur blanc. Une application qui
pose une surface teintée REMESURE la paire au lieu d'en hériter.**

Hériter d'un jeton, c'est hériter de sa valeur — jamais de sa conformité. La
conformité appartient au couple encre-fond, et le fond change d'un dépôt à
l'autre.

Trois conséquences, qui sont la forme utile de cette phrase :

**Une encre à moins de 0,20 de marge sur son fond de calibrage n'a de marge nulle
part ailleurs.** `--color-encre-3` (4,50), `--color-indicatif` (4,54) et
`--color-primaire` sur teinté (4,65) sont les trois cas connus. Ils se traitent
comme des valeurs à vérifier, pas comme des valeurs acquises.

**Un jeton non couvert par la dérivation se mesure à la main, et le relevé dit
qu'il l'a été.** C'est le cas du texte indicatif. Un relevé qui tait ce qu'il ne
voit pas se lit comme une couverture complète — c'est la leçon du troisième nombre
du triplet, appliquée aux jetons.

**Le fichier de jetons du site ne bouge pas** : il est juste pour le site, mesuré
sur son propre fond. Ce n'est pas lui qu'on corrige, c'est l'héritage qu'on
qualifie.

## Ce que ce choix coûte

**Chaque application remesure ce qu'elle croit acquis**, et paie une dérivation de
contraste par écran plutôt qu'une lecture du fichier de jetons. C'est
exactement le coût que `cv/`, le CRM et `team/` ont déjà payé — la nouveauté est
qu'il est maintenant attendu.

**Cette fiche ne rend rien vrai par elle-même.** Elle nomme un mécanisme ; c'est
la dérivation qui l'attrape. Une fiche sans vérification est une convention, et ce
dépôt a écrit ailleurs que les conventions ne se transmettent pas — seules les
vérifications qui les rendent vraies se transmettent.

## Écarté

**Assombrir les trois encres du site jusqu'à leur donner de la marge sur
`--color-fond-2`.** Écarté : le site est juste sur son fond, il n'a pas de surface
teintée, et on dégraderait sa hiérarchie visuelle pour un défaut qui n'est pas le
sien. Le CRM a pris l'autre chemin — employer `--encre-2` pour son texte
tertiaire, et porter la hiérarchie par le corps et les capitales.

**Écrire la règle une fois de plus dans un commentaire de jeton.** Écarté, parce
que c'est ce qui a été fait trois fois et que les trois accidents ont eu lieu
quand même. Un commentaire se lit au moment où on regarde la ligne ; le problème
se produit au moment où on recopie le fichier.

**Interdire de recopier le fichier de jetons.** Écarté : c'est la copie qui garde
les valeurs identiques, et l'inventer à nouveau est pire — `cv/` l'a prouvé avec
`#5f7268`, `#f8f9f7` et `#f2f4f2`, trois valeurs qui n'existaient dans aucun
fichier de jetons et qui ont voyagé jusqu'au CRM.

## À rouvrir si

**Un quatrième jeton se fait prendre.** Le signal serait qu'une règle par
mécanisme ne suffit pas, et qu'il faut une vérification qui refuse un couple
encre-fond non mesuré plutôt qu'un document qui le rappelle.

**Un instrument couvre enfin le texte indicatif.** La dérivation lirait alors
`::placeholder` — ce qui demande de résoudre la pseudo-classe, que le protocole
de débogage expose. Ce jour-là, le deuxième point de la décision perd son objet,
et c'est le seul des trois qui se retire.

## Suite

La marge de quinze centiemes relevee ici sur `--color-primaire` a ete jugee trop
mince. Le jeton vaut `#14603f` depuis la decision **0028** : 6,92:1 sur
`--color-fond-2` au lieu de 4,65:1. La mesure ci-dessus reste juste pour la
valeur qu'elle mesurait.
