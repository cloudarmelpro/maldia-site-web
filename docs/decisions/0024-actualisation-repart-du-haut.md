# 0024 — Une actualisation repart du haut de la page

## Statut

Acceptée le 27 août 2026.

## Contexte

Signalé par le client, captures à l'appui : en actualisant depuis le hero, la
page repart plus bas et une bande blanche apparaît sous l'aplat vert — le hero
ne touche plus le bas de la fenêtre parce que la page a glissé.

**Un premier diagnostic a conclu à tort à un artefact de `next dev`.** Il
reposait sur un scénario faux — actualiser depuis 300 px, où la restauration
rend bien 300 px. Le cas du client part **du haut de la page**, et c'est là que
tout se joue.

Mesuré sur l'export statique, séquence : descendre, remonter en haut à la
molette, vérifier `scrollY === 0`, attendre deux secondes, `Ctrl+R`.

| essai | avant | après `Ctrl+R` |
| --- | --- | --- |
| 1 | 0 | 484 |
| 2 | 0 | 642 |
| 3 | 0 | 803 |

La position rendue n'est ni celle qu'on avait, ni la même d'un essai à l'autre.
Un onglet neuf jamais défilé rend bien 0 : c'est la mémoire de l'entrée
d'historique qui est en cause, pas la mise en page.

## Décision

`history.scrollRestoration = 'manual'`, dans un `<script>` en ligne du layout
racine — donc sur les vingt-six pages, les deux langues comprises.

Il doit s'exécuter **à l'analyse du document**. Posé dans un effet React, le
navigateur aurait déjà restauré : ce ne peut pas être un composant client.

Vérifié après correction : actualisation depuis le haut → 0 ; depuis le milieu
de page → 0.

## Conséquences

**Le retour arrière ne rend plus la position non plus.** Mesuré : accueil défilé
à 1000 px, clic sur Services, retour arrière → la page revient à 0 et non à
1000.

Next ne touche jamais `scrollRestoration` — vérifié, le réglage n'apparaît nulle
part dans son runtime client — donc il laisse le navigateur faire, et ce
basculement vaut pour les deux gestes.

Le compromis est assumé : une position toujours prévisible plutôt qu'une
position parfois juste et parfois aberrante. Si la restauration au retour
arrière devient nécessaire, il faudra l'écrire à la main — mémoriser `scrollY`
dans `history.state` et le rendre sur `popstate`.

## Une entrée animée a été construite sur le hero, puis retirée

Le client a demandé un « float in » sur le titre du hero, rejouant à chaque
retour dans la fenêtre. Il a été construit, puis **retiré à sa demande** : le
motif — texte qui monte en fondu, et qui rejoue à chaque passage — lui a paru
banal.

Ce qui reste vrai et mérite d'être su avant de recommencer :

- **`whileInView` avec `viewport={{ once: false }}` ne revient pas à son
  `initial`** quand l'élément quitte la fenêtre. Mesuré : le titre à 5 635 px
  au-dessus du bord haut gardait `opacity: 1`. Rien ne peut rejouer ainsi ; il
  faut piloter l'état, avec `useInView` et `animate`.
- **Toute entrée sur le hero se paie.** `Apparition` sérialise son `initial`
  dans le HTML statique : au-dessus du pli, le titre et les deux appels de
  `WEB-2` attendent le bundle, et le LCP avec eux.
- **La courbe du design est vive.** `cubic-bezier(0.16, 1, 0.3, 1)` dépense
  presque tout le trajet d'emblée. Juste pour un bloc qu'on croise en défilant ;
  sur un écran au repos, elle se lit comme un à-coup, même étirée.

Le hero est donc revenu à son état d'origine : **aucune entrée**, comme le
commentaire du composant le documentait déjà.

## Une leçon de méthode

Deux instruments ont produit des mesures fausses, et il faut le savoir avant de
diagnostiquer quoi que ce soit qui touche au défilement :

- Un `IntersectionObserver` créé depuis le **monde isolé** de l'extension ne
  reçoit jamais ses rappels. Il n'observe rien et ne le dit pas.
- `window.scrollTo()` appelé depuis ce même monde déplace la page — les
  rectangles le confirment — mais ne réveille pas les observateurs de la page.
  Un défilement à la molette, si.

Et un scénario de test qui ne reproduit pas le geste du client ne prouve rien :
actualiser depuis 300 px et actualiser depuis le haut sont deux cas différents,
et seul le second révélait le défaut.
