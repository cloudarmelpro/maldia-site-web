# 0026 — L'espacement de la page d'article, et une cible sous le seuil

## Statut

Acceptée le 28 août 2026, à la demande répétée du client.

## Ce qui a été mesuré

Le corps d'article tenait sur six écarts distincts, dont deux ne tombaient sur
aucune échelle :

| avant | rôle |
| --- | --- |
| 20 px ×5 | entre deux paragraphes |
| 44 px ×4 | avant un `h2` |
| 26 px | avant une liste |
| 36 px | avant une citation |
| 40 px | avant « À lire » |
| 72 px | avant le bloc d'appel |

## Décision

L'échelle est resserrée d'un cran et ramenée à trois pas, plus une respiration
de bloc :

| après | classe | rôle |
| --- | --- | --- |
| **18 px** ×6 | `mt-4.5` | paragraphes et listes — un seul pas pour le texte lu |
| **28 px** | `mt-7` | citation |
| **34 px** ×4 | `mt-8.5` | avant un `h2` |
| **44 px** ×2 | `mt-11` | avant le bloc d'appel et avant « À lire » |

26 et 36 disparaissent : la liste rejoint le rythme du paragraphe qu'elle
prolonge, la citation celui de la respiration.

### Une mesure fausse, corrigée

La première version de ce document annonçait 60 px avant le bloc d'appel et
28 avant « À lire ». **Les deux chiffres étaient faux** ; les classes ont
toujours dit 44.

La cause vaut d'être connue : ces deux blocs sont sous la ligne de flottaison,
leur `Apparition` ne s'était donc pas déclenchée au moment de la mesure, et ils
portaient encore le `translateY(16px)` de leur état de départ. D'où 44 + 16 = 60
pour l'un, et 44 − 16 = 28 pour l'autre, le bloc précédent étant décalé lui
aussi.

**Toute mesure de géométrie sur ce site doit se faire après que les entrées ont
joué** — sinon on mesure l'état de départ d'une animation, pas la mise en page.

La **signature** passe à 19 px, la hauteur de sa ligne : deux lignes qui se
lisent comme une signature, pas comme deux paragraphes.

Le **sommaire** prend l'interligne du corps d'article, **1,7** — il respire comme
le texte qu'il annonce. À 14 px cela fait 23,8 px.

## Le chemin, parce qu'il vaut la leçon

Le sommaire est passé par trois états avant de se poser :

| | écart | ce qui n'allait pas |
| --- | --- | --- |
| départ | 54 px | plancher tactile de 44 px **plus** un écart de liste de 10 |
| puis | 24 px | l'écart retiré, le plancher gardé |
| puis | 19 px | l'interligne seul — sous le seuil de cible tactile |
| retenu | **24 px** | l'interligne du corps, 1,7, plus `min-h-6` |

L'état à 19 px était le seul endroit du site **sous** WCAG 2.5.8 (AA), et il n'y
avait pas de rattrapage possible : à ce pas, deux cibles de 24 px se
chevauchent, et une visée au bord ouvre le mauvais lien — pire qu'une cible
petite.

Le client l'a trouvé trop serré et a demandé le rythme du texte de droite. Cet
interligne de 1,7 donne 23,8 px, que `min-h-6` porte à 24 : **le seuil AA est
atteint pile, sans que personne ait eu à arbitrer entre le rendu et la norme.**

`data-cible-reduite` reste, et la suite d'écrans mesure ces cibles contre 24 et
non 44 — le reste du site tenant les 44 de 2.5.5 (AAA). L'attribut rend l'écart
visible dans le balisage : une cible qui descendrait ailleurs sans le porter fait
échouer la suite comme avant.

Vérifié à 360 et 390 px, sur quatre pages dont l'article dans les deux langues :
aucune cible fautive.

## Ce qui n'a pas été touché

Le corps du texte, à 17,5 px et un interligne de 1,7, ne change pas. Le
resserrement porte sur les **écarts entre blocs**, jamais sur la lisibilité
d'une ligne.
