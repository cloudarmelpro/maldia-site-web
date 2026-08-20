# 0021 — Les pages Talents et Services passent sur leurs designs

**Demandées par le client** le 21 août 2026 : implémenter `Talents Maldia.dc.html`
et `Services Maldia.dc.html` du projet de design
`6cfd7c63-9a0e-4372-b1da-57c6410026a5`, lu par le connecteur claude.ai/design.

Elles achèvent la refonte ouverte par la décision 0018 : les six pages sont
maintenant sur le nouveau design.

## Le geste commun aux deux pages

Le `h1` quitte la bande sombre, comme sur le blog puis sur À propos (0020). Les
deux pages perdent `TitrePage`, et l'en-tête transparent de l'accueil reçoit son
fond d'un `bg-nuit` posé autour de lui.

**`src/components/sections/titre-page.tsx` n'est donc plus importé par aucune
page.** Il n'est pas supprimé : le geste de la bande sombre peut revenir. À
trancher.

Conséquence de contenu : `talents.entete` et `services.entete` ne sont plus des
`EnTetePage` — plus de `cta`, plus de `mention` dans l'en-tête de page.

## Talents

Ouverture claire (titre, trois principes, encart sombre avec l'appel, bande
photo) → *Domaines* sur `fond-2` → *Déroulé* sur `encre` → l'appel et le pied du
gabarit.

Les six domaines lisent `commun.profils.liste`. La page Services affiche la même
liste : deux copies divergeraient à la première correction.

Le déroulé a **quatre** étapes côté candidat, distinctes des cinq étapes client de
`commun.methode`. Elles réutilisent le type `Etape` et son champ
`cote: 'client' | 'maldia'` — `'client'` désigne ici le candidat. La comparaison
se fait sur cette donnée et jamais sur le libellé « Vous », qui est traduit.
`tests/contenu.spec.ts` vérifie que les deux langues désignent les mêmes côtés.

## Services

Ouverture claire (titre, les six chiffres, la mention du délai, bande photo) →
*Méthode* sur `encre` → *Profils* sur `fond` → l'appel et le pied.

**Le rythme du design est blanc → sombre → blanc → sombre.** Le brief de départ
annonçait `#f4f5f3` en section 2 et `#0f1d17` en section 3 : c'était faux. La
couleur `#f4f5f3` n'apparaît pas une fois dans le fichier de design. Le fichier
a été suivi, pas le brief.

Section 2 **est** la section `Methode` existante, pas une section jumelle : elle
implémentait déjà la frise défilante du design. Le design ne lui donne ni
conclusion ni boutons, d'où une prop `avecAppel` dont le défaut laisse l'accueil
inchangé. Même geste pour `CartesArguments`, qui gagne une prop `disposition`
avec `'grille'` par défaut.

### Deux sections quittent la page Services

`Pourquoi` et `Base`. Le design ne les a pas. **`Base` porte le compteur de
candidats (WEB-13) et le bandeau des outils (WEB-14)** : les deux ne sont donc
plus servis que sur l'accueil. Vérifié dans l'export : `out/fr/index.html` porte
le compteur et les outils. Les deux exigences restent tenues, sur une page au
lieu de deux. À confirmer par le client.

### Libellés du design écartés au profit du contenu existant

| Design | Contenu gardé |
|---|---|
| pilule « Déroulé » | `commun.methode.intitule` = « Méthode » |
| « Vous gardez la décision finale à chaque étape. » | la description existante, plus longue |
| « Du besoin exprimé aux profils présentés. » | « …aux candidats présentés. » |

La phrase longue de `services.entete.description` est perdue — le design ne lui
laisse pas de place.

## Ce qui est écarté des deux designs, et pourquoi

**Leur en-tête et leur pied**, comme sur les trois pages précédentes.

**Les plafonds `height: N em; overflow: hidden`** sur les titres et textes de
carte. Ils égalisent en tronquant, et l'anglais y perd des mots. La hauteur
minimale de carte suffit.

**`https://cv.agencemaldia.com`**, que le design Talents code en dur à trois
endroits. `DESTINATION_CANDIDATURE` reste vide (décision 0007) et
`tests/liens.spec.ts` échoue exprès : un bouton mort ne peut pas partir en
production par oubli.

**Les points de rupture à 560 px et 1060 px.** Le dépôt a `duo` 620, `paire` 760,
`voies` 820, `frise` 900, `large` 1000. Le plus proche est pris à chaque fois
plutôt qu'ajouter un jeton pour une seule grille. Entre 560 et 619 px les frises
restent donc sur une colonne.

**Les paddings et tailles des composants partagés.** `Section` garde 64 → 112 px
là où ces designs posent 56 → 92, et `EnTeteSection` garde ses tailles. Les
corriger ici les corrigerait sur les six pages.

## Les flèches gauche et droite

Le client a fourni `public/icons/Left.svg` et `Right.svg`. **Leurs noms sont
inversés par rapport à ce qu'ils dessinent** — vérifié au rendu, et leur `id`
interne le confirme : `Left.svg` porte `right-arrow-foward-sign`. Le composant
`src/components/shared/fleche.tsx` suit le tracé, pas le nom, et le dit en
commentaire.

Le tracé est inline et non servi en `<img>` : les polygones n'ont pas de `fill`,
donc en image ils resteraient noirs — invisibles sur les boutons encre et
contour-clair — et chaque flèche coûterait une requête.

Les cinq flèches horizontales du site passent par ce composant, dont l'ornement
`fleche` de `Bouton`, donc tous les boutons d'un coup. Les flèches diagonales
(`ArrowUpRight`, liens sortants), la flèche haute (retour en haut) et les
chevrons ne sont pas concernés : ce ne sont pas des flèches gauche/droite.

## Couleurs sans jeton exact

`#e2e7e1`, `#e3e8e2`, `#e7eae6` → `trait` `#e2e6e1`. `#eceeea` → `trait-2`.
`#a3b2ab` et `#b3c0b8` → `encre-3` `#85988f`, plus sombre donc mieux contrasté —
même geste que la décision 0020. La question ouverte par 0020 sur l'ensemble des
libellés `encre-3` sous 4,5 : 1 vaut aussi pour ces pages.

## Ce qui reste ouvert

- Les six photos sont des images de banque Unsplash. `PHOTOS.talents` reprend
  celle du hero de l'accueil et `PHOTOS.services` celle de la sixième famille de
  profils, parce que ce sont les identifiants des designs. À séparer avec les
  photos définitives.
- La mention « Le délai de 14 jours est une moyenne, pas une garantie. » est en
  capitales espacées, `text-transform: uppercase` dans le design. C'est la forme
  la moins lisible, pour la phrase dont le rôle est d'éviter une fausse attente.
- `blog.entete.cta`, `blog.entete.mention`, `contact.entete.cta` et
  `contact.entete.mention` ne sont plus lus par aucun composant : huit chaînes
  mortes dans les deux langues, héritées des refontes du blog et de Contact.
- `titre-page.tsx` n'est plus importé.
