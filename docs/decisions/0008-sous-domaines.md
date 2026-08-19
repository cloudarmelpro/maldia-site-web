# 0008 — Sous-domaines des quatre applications

**Statut :** À TRANCHER
**Date :** 17 août 2026

## Décision

**Arrêté :** `agencemaldia.com` pour le site, `cv.agencemaldia.com` pour le portail
public des candidats, `admin.agencemaldia.com` pour l'administration privée.

**En attente :** `team/` et `crm/` n'ont pas d'adresse. Le plan initial en prévoyait
trois pour quatre applications.

Proposition : `crm.agencemaldia.com` et `team.agencemaldia.com`, et
`admin.agencemaldia.com` devient l'administration de la banque de CV.

## Pourquoi

Chaque application est déployée séparément, donc chacune a besoin de son propre
nom. Le nom entre dans la validation d'origine de l'authentification et dans les
liens des courriels : il doit être arrêté avant le premier déploiement, pas
après.

## Ce qu'on a écarté

**Plusieurs applications sur des chemins d'un même sous-domaine.** Cela reviendrait
à un déploiement partagé, ce que 0001 écarte.
