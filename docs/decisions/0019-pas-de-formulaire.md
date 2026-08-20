# 0019 — Le formulaire de contact n'a pas de destination

**Tranchée.** À rouvrir dès que le client choisit un point de réception.

## Ce que demande le design

`Contact Maldia.dc.html` pose deux formulaires, en onglets.

Pour une entreprise : nom, courriel professionnel, entreprise, profil recherché,
et une zone de texte pour le besoin. Bouton « Envoyer la demande ».

Pour un talent : nom, courriel, domaine, niveau de français, et **le dépôt d'un
CV** — PDF, DOC ou DOCX, 5 Mo. Bouton « Envoyer ma candidature ».

## Pourquoi ils ne sont pas construits

Cette application est un export statique. C'est sa définition, pas un choix de
déploiement : `output: 'export'`, aucune base, aucun compte, aucun secret, aucun
processus (WEB-10 et le `CLAUDE.md`). Il n'y a **aucun serveur pour recevoir un
envoi**, et **aucun stockage pour un fichier**.

Un formulaire rendu sans destinataire ne reste pas neutre. Le visiteur remplit
quatre champs, joint son CV, clique — et rien ne part. Il croit avoir postulé.
Maldia ne reçoit rien et ne sait pas qu'il y avait quelqu'un. Ce n'est pas une
imperfection visuelle, c'est une candidature perdue, et le candidat n'a aucun
moyen de s'en apercevoir.

Le formulaire de candidature est par ailleurs **le travail de l'application de
CV**, qui vit dans son propre dépôt. Le bouton « Déposer ma candidature » attend
justement son adresse (décision 0007). Le construire ici en ferait un second
point d'entrée à tenir, avec sa propre validation et son propre stockage.

## Ce qui est construit

**La page entière, formulaires compris.** Les deux onglets, les cinq champs de
chacun, le sélecteur à chevron, la zone de texte, le dépôt de fichier avec son
`accept=".pdf,.doc,.docx"`. Le `name` de chaque champ est dans le contenu, prêt
pour le point de réception qui le lira.

**Le bouton d'envoi est désactivé**, et c'est la seule chose qui manque. Il le
reste tant que `DESTINATION_FORMULAIRE` est vide. Un bouton désactivé ne ment
pas : il n'y a ni faux succès, ni envoi silencieux. La saisie au clavier ne peut
pas non plus déclencher un envoi — la soumission implicite d'un formulaire est
inopérante quand son bouton par défaut est désactivé.

`tests/liens.spec.ts` échoue sur cette constante comme sur les deux autres :
`npm run verifier` refuse de passer tant qu'aucune des trois destinations n'est
arrêtée. Un formulaire mort ne peut donc pas partir en production par oubli.

La voie qui aboutit est à côté, et non sous le bouton : la carte Cal.com de la
colonne de droite, et la mention au bas de la page. Un second bouton dans le
formulaire avait été essayé et retiré à la demande du client — il se lisait
comme un doublon de l'envoi.

Le reste est rendu tel quel : la section de réservation avec l'emplacement de
l'intégration Cal.com, la carte sombre du calendrier, les trois lignes de
coordonnées, les repères sociaux.

**L'emplacement Cal.com est rendu, lui.** Le design l'annonce explicitement
comme un emplacement — « l'intégration s'affiche ici sur le site en ligne ». Le
jour où l'adresse arrive, l'intégré s'y pose sans redessiner la carte.

**L'adresse du calendrier n'est pas recopiée.** Le design écrit
`cal.com/agencemaldia` en dur. Elle est dérivée de `DESTINATION_RENDEZ_VOUS` :
vide, la ligne ne s'affiche pas. Une adresse affichée qui ne correspond pas au
lien est pire qu'une adresse absente, et celle-ci n'est pas encore arrêtée.

## Ce qu'il faudrait pour rouvrir

Un point de réception, et c'est une décision du client, pas une ligne de code.
Trois questions dans l'ordre :

**Où arrivent les demandes ?** Un service de formulaires tiers, une fonction
serveur, ou l'application de CV. Chacun change l'hébergement : deux d'entre eux
sortent l'application de l'export statique, ce que la décision 0013 a écarté.

**Où vivent les CV ?** Un fichier joint est une donnée personnelle, stockée
quelque part, pour une durée décidée. Le site vise le Québec et l'Europe : la
Loi 25 et le RGPD s'appliquent tous les deux.

**Qui lit, et sous quel délai ?** La carte annonce « réponse sous un jour
ouvré ». Cette phrase engage quelqu'un.

Tant que ces trois réponses n'existent pas, mener à Cal.com et à l'application
de CV est la seule voie qui aboutisse réellement.
