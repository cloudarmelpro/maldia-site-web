# 0014 — Structure des adresses et découpage des pages

**Statut :** ARRÊTÉE, à confirmer par le client avant la mise en ligne
**Date :** 18 août 2026

## Décision

**Une page par langue, sections en ancres.**

```
/            routeur de langue, x-default
/fr/         la vitrine complète, en français
/en/         la vitrine complète, en anglais
```

Les six sections du cahier — `WEB-2` à `WEB-7` — sont des sections d'une même
page, atteintes par ancre :

```
#talents        WEB-3
#entreprises    WEB-4
#profils        WEB-5
#a-propos       WEB-6
#contact        WEB-7
```

**Les ancres ne sont pas traduites.** `#a-propos` est la même en anglais.

## Pourquoi une seule page

`WEB-2` demande qu'un visiteur « comprenne rapidement les deux volets ». Deux
volets qui vivent sur deux pages séparées ne se comparent pas : il faut revenir
en arrière pour voir l'autre. Sur une page unique, le choix « je suis un talent »
ou « je suis une entreprise » se fait en une seule vue.

Le contenu que le cahier décrit tient sur une page. Six pages dont deux tiennent
en trois paragraphes se lisent comme un site vide.

Et une seule page, c'est un seul document à traduire, un seul jeu de
métadonnées, un seul `hreflang` réciproque à tenir juste. Le bilinguisme est
l'endroit où ce site peut le plus facilement se casser en silence — moins il y a
de pages, moins il y a d'occasions.

## Pourquoi les ancres ne sont pas traduites

Une ancre n'est pas indexée séparément : Google ne classe pas `/fr/#profils`
comme une adresse distincte de `/fr/`. Elle ne porte donc aucune valeur SEO qui
justifierait de la traduire.

En revanche, elle porte une valeur d'usage : le sélecteur de langue conserve
l'ancre courante. Un visiteur qui lit la section « Profils » en français et
bascule en anglais reste devant la même section. Si les ancres étaient
traduites, il repartirait du haut de la page — ou il faudrait une table de
correspondance entre `#profils` et `#profiles`, maintenue à la main, fausse au
premier oubli.

## Pourquoi `/fr/` et `/en/` symétriques

Le français n'est pas à la racine.

Servir le français à `/` et l'anglais à `/en/` raccourcit les adresses du marché
principal, mais rend chaque déclaration `hreflang` asymétrique : `fr` pointe vers
une racine, `en` vers un sous-dossier, et `x-default` vers la même page que `fr`.
Trois formes à tenir réciproques au lieu d'une. C'est précisément le piège que le
`CLAUDE.md` signale — sans réciprocité, la déclaration est ignorée et une des
deux langues cesse d'être indexée, sans aucun signal.

La symétrie coûte cinq caractères dans l'adresse. Elle rend la règle
vérifiable d'un coup d'œil.

## La racine `/`

L'hébergement mutualisé ne permet **aucune redirection côté serveur** (0013).
La racine est donc un fichier statique, `public/index.html`, qui porte :

- les trois déclarations `hreflang` — `fr`, `en`, `x-default` sur lui-même ;
- une redirection par `<meta http-equiv="refresh" content="0; url=/fr/">` ;
- une détection de langue du navigateur en JavaScript, qui envoie vers `/en/`
  quand c'est la langue préférée ;
- deux liens visibles vers les deux versions, pour qui n'a pas de JavaScript.

Ce n'est pas un choix élégant, c'est le seul disponible sans serveur.

## Ce qu'on a écarté

**Une page par section.** Six adresses, dont `À propos` et `Contact` tiendraient
en quelques lignes. Elles auraient aussi multiplié par six le nombre de
déclarations `hreflang` à garder réciproques, pour un contenu que le cahier ne
justifie pas d'étaler.

**Des chemins traduits — `/fr/entreprises/` et `/en/companies/`.** Meilleur pour
le référencement de chaque marché, et c'est un vrai argument. Écarté parce qu'il
suppose des pages séparées, que la décision ci-dessus écarte déjà. À rouvrir si
le site grandit au-delà de la vitrine.

**Une page par langue avec chemin de langue optionnel.** Écarté : deux adresses
pour un même contenu, c'est du contenu dupliqué, et le canonique aurait dû
arbitrer ce que la structure aurait dû empêcher.

## Ce que cette décision engage

La structure des adresses se fige **avant** la mise en ligne, pas après : sans
redirection côté hébergeur, une URL publiée qui change laisse une erreur 404 et
un lien perdu (0013).

Si le client veut des pages séparées, c'est maintenant qu'il faut le dire.
