# 0007 — Destination du bouton « Déposer ma candidature »

**Statut :** ARRÊTÉE pour le bouton, REPORTÉE pour la destination
**Date :** 17 août 2026

## Décision

**Le bouton se construit maintenant. Sa destination se choisit plus tard.**

Il paraît aux quatre endroits que prévoient WEB-1, WEB-2 et WEB-3, avec son libellé
et son traitement visuel définitifs. Rien dans le site n'attend la banque de CV,
quatrième dans l'ordre de travail (0002).

Ce qui rend le report tenable : la destination est **une seule constante**, dans le
fichier de contenu, et non un `href` recopié quatre fois. Le jour où elle se décide,
c'est une ligne — pas quatre gabarits à rouvrir.

Les trois issues restent ouvertes, aucune n'est écartée : une adresse courriel, un
formulaire minimal servi par un tiers, ou le portail `cv.agencemaldia.com` quand il
existera.

## Ce que le report ne couvre pas

Le report vaut pour le **développement**, pas pour la **mise en ligne**.

Un bouton principal qui ne mène nulle part est le défaut le plus visible qu'un site
vitrine puisse avoir, et il est à quatre endroits. WEB-1 dit que le site « doit
notamment servir pour les campagnes de recrutement réalisées à Madagascar » : sans
destination, il ne sert pas à ça.

Donc la destination doit être arrêtée **avant que `agencemaldia.com` soit public**,
pas avant d'écrire le site. Tant qu'elle ne l'est pas, la constante reste vide et
la porte de vérification échoue — le lien mort ne peut pas partir en production par
inadvertance.

## Pourquoi

Attendre la décision pour construire aurait bloqué la première application sur la
quatrième. Construire avec une destination provisoire recopiée aux quatre endroits
aurait rendu le changement plus cher que la décision elle-même.

## Ce qu'on a écarté

**Ne pas mettre le bouton du tout.** Il faudrait alors reprendre trois sections du
site pour l'y insérer, et le cahier le demande explicitement à quatre endroits.

**Une destination provisoire choisie par défaut.** Le courriel aurait été le choix
facile, mais une adresse publiée sur un site ne se retire pas : elle continue de
recevoir des candidatures des mois après que le portail existe, et personne ne les
lit.
