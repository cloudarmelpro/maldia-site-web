# 0020 — La page À propos passe sur « A propos Maldia »

**Demandée par le client** le 21 août 2026 : implémenter
`A propos Maldia.dc.html` du projet de design
`6cfd7c63-9a0e-4372-b1da-57c6410026a5`, lu par le connecteur claude.ai/design.

Elle prolonge la décision 0018 : même refonte, appliquée à la sixième page.

## Ce qui change

**Le `h1` quitte la bande sombre.** Les pages Services et Talents ouvrent sur une
bande `nuit` portée par `TitrePage`. Le design ne donne pas cette bande à À propos :
son titre vit dans la première section claire, comme sur l'index du blog. La page
n'a donc plus de `TitrePage`, et l'en-tête transparent de l'accueil reçoit son fond
d'un `bg-nuit` posé autour de lui — le même geste que sur le blog.

**Quatre sections au lieu de trois.** Ouverture claire (titre, chapeau, trois
principes, bande photo), *Fonctionnement* sur `fond-2` (les deux côtés, chacun avec
son chiffre), *Repères* sur `encre` (les six messages commerciaux), puis le bloc
d'appel et le pied que le gabarit pose sur les six pages.

**La section Méthode disparaît de cette page.** Le design ne la met pas ici. Elle
reste sur Accueil et Services.

## Ce qui est écarté du design, et pourquoi

**Son en-tête et son pied.** Le design en propose des siens, clairs et collés. Le
site garde ceux de l'accueil : la décision 0018 vaut pour les six pages, et une
page sur six avec sa propre coquille se verrait.

**Le compteur « 01 / 02 » en `#b3c0b8`.** Cette couleur donne un contraste de
1,9 : 1 sur blanc — mesuré — là où un texte de 10 px en demande 4,5. Le compteur
prend `encre-3`, la teinte que le site emploie déjà pour ses libellés discrets.
C'est plus sombre que le design, et toujours en dessous de 4,5 : 1. À reprendre
avec la direction artistique, pour l'ensemble des libellés `encre-3` et non pour
celui-ci seul.

**Sa photo.** Le design pointe l'image Unsplash `photo-1553877522-43269d4ea984`,
qui illustre déjà la cinquième catégorie de profils sur la page Talents. La page
garde la sienne, pour ne pas afficher deux fois la même photo de banque. Les huit
photos du site sont des placeholders, à remplacer avant la mise en ligne.

**Le plafond `height: 4.4em; overflow: hidden`** sur la légende des cartes de
*Repères*. Il égalise les cartes en tronquant le texte ; l'anglais y perdrait des
mots. La hauteur minimale de la carte suffit à les égaliser.

## Ce que le contenu perd

`aPropos.paragraphes` — trois paragraphes — et `aPropos.reperes.{marches,
domaines, langues}`, les trois repères comptés depuis les listes du cahier. Le
design ne leur laisse pas de place. Le chapeau et les trois principes les
remplacent.

C'est une perte réelle : ces trois chiffres se mettaient à jour tout seuls quand
une liste du cahier changeait. Rien dans la nouvelle page ne le fait plus.

## Le nombre de candidats

Le design écrit « 500+ » et « Plus de 500 candidats » en clair, deux fois, dans une
seule langue. `NOMBRE_CANDIDATS` est la seule source (WEB-13) : le contenu porte le
jeton `{nombre}`, et `avecNombre` le remplace au rendu.

Sans ça, le nombre s'écrirait à quatre endroits — deux phrases, deux langues — et
la première mise à jour en oublierait au moins un.
`tests/contenu.spec.ts` fixe la liste des champs autorisés à porter le jeton : un
jeton posé ailleurs part tel quel à l'écran.
