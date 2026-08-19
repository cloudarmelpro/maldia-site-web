# Cahier des charges — Agence Maldia

Quatre applications. Ce fichier **fait autorité pour le développement**.

`Official CC170826.docx` est l'artefact client, la version du 17 août 2026 telle
que convenue. On n'y touche plus. Le présent fichier porte les mêmes exigences,
numérotées, plus les décisions prises depuis.

Si les deux divergent, celui-ci décrit le produit et le `.docx` décrit ce qu'on
avait promis.

## Comment lire les identifiants

`WEB-3`, `CV-5`, `TEAM-11`, `CRM-8` — un par section du cahier d'origine. Le code
et les tests les citent.

Quand un point d'une exigence doit être visé seul, on écrit `CV-5.a`, dans l'ordre
des puces telles qu'elles apparaissent ci-dessous. Ne jamais renuméroter : un
identifiant est une adresse, pas un rang.

Les exigences marquées **[À TRANCHER]** sont des manques du cahier d'origine,
relevés à l'analyse. Elles attendent une décision, et chacune a son fichier dans
`decisions/`.

---

# SITE WEB — `site-web/`

`agencemaldia.com` · vitrine publique · export statique, aucune base, aucun compte

## WEB-1 — Objectif

Le site a deux objectifs.

**Recrutement à Madagascar.** Présenter Agence Maldia aux talents basés à
Madagascar et leur permettre de découvrir les opportunités. Les candidats pourront
éventuellement rejoindre directement l'équipe de Maldia, travailler sur ses
projets, ou travailler auprès d'entreprises clientes dans le cadre du staff
augmentation. Le site doit notamment servir pour les campagnes de recrutement
réalisées à Madagascar. CTA principal : **Déposer ma candidature**.

**Staff augmentation.** Présenter aux entreprises le service offert : renforcer
leurs équipes avec des talents professionnels basés à Madagascar et travaillant à
distance. Marchés ciblés — Québec et Canada francophone, France, Belgique, Suisse,
Luxembourg, Monaco. CTA principal : **Prendre rendez-vous**.

## WEB-2 — Page d'accueil

Elle doit permettre de comprendre rapidement les deux volets.

Deux entrées : **Pour les talents**, qui présente les opportunités de travailler
avec Maldia ou auprès d'entreprises internationales, CTA « Déposer ma
candidature » ; **Pour les entreprises**, qui présente le service de staff
augmentation, CTA « Prendre rendez-vous ».

## WEB-3 — Candidats / Opportunités

Section destinée aux personnes à Madagascar. Présenter qui est Maldia, les types
d'opportunités, le principe du travail à distance, les possibilités de travailler
avec des entreprises internationales, les domaines professionnels recherchés, le
fonctionnement général du recrutement. CTA « Déposer ma candidature ».

## WEB-4 — Staff Augmentation

Section destinée aux entreprises, expliquant clairement le fonctionnement.

Le fonctionnement, en six étapes : l'entreprise explique le profil recherché ;
Maldia recherche et présélectionne ; Maldia présente les profils pertinents ; le
client participe à la sélection ; le talent rejoint l'équipe du client à distance ;
Maldia assure le suivi.

Une entreprise doit comprendre rapidement ce que Maldia offre, comment le service
fonctionne, quels profils peuvent être recherchés, comment commencer. CTA
« Prendre rendez-vous ».

## WEB-5 — Profils

Présenter les catégories de talents : développement web, développement logiciel,
design, montage vidéo, community management, marketing numérique, administration,
service client, comptabilité, assistance virtuelle, autres profils professionnels.

## WEB-6 — À propos

Présenter brièvement Agence Maldia et son rôle. Positionnement : Maldia connecte
les talents de Madagascar avec des entreprises internationales qui souhaitent
renforcer leurs équipes.

## WEB-7 — Contact / Prise de rendez-vous

Pour les entreprises, le principal moyen de contact est la prise de rendez-vous,
par **Cal.com**, avec le même système de réservation et le même calendrier déjà
utilisés.

CTA possibles : « Prendre rendez-vous », « Discuter de vos besoins ». Ils peuvent
apparaître à l'accueil, dans la section Staff Augmentation, dans la navigation, au
bas des sections destinées aux entreprises, et dans la section Contact.

Parcours : entreprise intéressée → Prendre rendez-vous → Cal.com → rendez-vous
réservé.

## WEB-8 — Langues

Français et anglais dès le départ. L'utilisateur doit pouvoir passer facilement
d'une langue à l'autre.

## WEB-9 — Design

Professionnel, moderne, crédible, simple, rapide, adapté au mobile. Un visiteur
doit comprendre rapidement qui est Maldia, ce que Maldia offre, et quelle action
prendre ensuite.

**[À TRANCHER]** « Rapide » n'est pas vérifiable en l'état. Il faut un chiffre —
voir `decisions/0006-cible-de-performance.md`.

## WEB-10 — Périmètre

Ce cahier concerne uniquement le site web public.

**[À TRANCHER]** Le bouton « Déposer ma candidature » paraît à quatre endroits.
Tant que `cv/` n'est pas en ligne, il doit mener quelque part — voir
`decisions/0007-destination-du-bouton-candidature.md`.

---
