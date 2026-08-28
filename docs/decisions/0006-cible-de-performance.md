# 0006 — Cible de performance du site

**Statut :** Acceptée
**Date :** 17 août 2026 · tranchée le 28 août 2026

## Décision

`WEB-9` demande un site « rapide » sans chiffre. Six mots décrivent le site
attendu — « professionnel, moderne, crédible, simple, rapide, adapté au
mobile » — et « rapide » est le seul qui se chiffre. Voici le chiffre.

**Mesuré sur `/fr/` et `/fr/services/`, en laboratoire à 1,6 Mbit/s avec un
processeur ralenti quatre fois** — un téléphone d'entrée de gamme sur un réseau
malgache, pas une fibre montréalaise.

| | cible | où on en était au 28 août |
| --- | --- | --- |
| **LCP** | **≤ 2,0 s** en labo, ≤ 2,5 s au 75ᵉ centile terrain | 3,1 à 3,3 s — **non tenu** |
| **INP** | **≤ 200 ms** | non mesuré, faute de données terrain |
| **CLS** | **≤ 0,05** | 0,000 — **tenu largement** |
| **JS gzippé par page** | **≤ 180 Ko** | 230 à 240 Ko — **non tenu** |
| **images par page** | **≤ 250 Ko**, aucune au-dessus de 100 Ko | une image à 142 Ko — **non tenu** |
| **poids total, première visite** | **≤ 500 Ko** | 281 à 446 Ko — tenu |

## Pourquoi ces nombres, et pas d'autres

**LCP à 2,0 s et non 2,5.** 2,5 s est le seuil « bon » de Google. On peut viser
plus bas ici, et il faut le faire : le TTFB mesuré est de **2 à 16 ms**. Il n'y
a ni base de données, ni rendu serveur, ni appel distant à attendre — le site
est un fichier posé sur un disque. **Tout le LCP est du travail client, donc
tout est actionnable.** Se donner 2,5 s reviendrait à s'accorder une marge qu'on
n'a aucune raison de consommer.

**CLS à 0,05 et non 0,1.** Le site mesure **0,000** sur les sept pages, dans les
deux profils réseau. Écrire 0,1 accorderait le droit de régresser sur ce qui est
déjà parfait. 0,05 laisse la marge d'un basculement de police et interdit le
reste.

**JS à 180 Ko, et c'est le nombre qui tranche.** React 19 et le runtime de
Next 16 valent **145 Ko incompressibles** — on ne les négocie pas sans changer
de cadre. 180 Ko laissent donc **35 Ko d'application**. Ce n'est pas assez pour
garder les trois bibliothèques d'animation, et c'est délibéré : la décision 0025
a laissé ouverte la question « GSAP ou `motion` », et un budget doit la
trancher plutôt que la contourner.

Mesuré : GSAP et ses trois greffons valent 51,7 Ko, `motion` 30,3 Ko, Lenis
5,4 Ko — **87 Ko à eux trois, soit 36 % du JavaScript de chaque page**. Retirer
`motion` mène à 204 Ko ; retirer GSAP et Lenis mène à 182 Ko mais fait perdre
`SplitText`, donc la révélation par lignes, donc la signature du design.

**Images à 250 Ko et rien au-dessus de 100.** Une seule photo pèse 142 Ko
aujourd'hui. En local, au format WebP, à la largeur réellement affichée, la même
vaut 40 à 60 Ko. Un site vitrine sans catalogue n'a aucune raison de dépasser.

## Ce qu'on a écarté

**Un budget à 240 Ko de JavaScript**, qui aurait acté les trois bibliothèques.
C'était l'option honnête si l'on voulait tout garder — mais elle transforme un
budget en constat. Un budget qu'on découvre après coup n'est pas un budget.

**Se contenter des seuils de Google.** Ils sont écrits pour un site quelconque,
avec un serveur, une base et des tiers. Celui-ci n'a rien de tout ça ; s'aligner
sur le minimum acceptable ailleurs serait renoncer à l'avantage qu'on a.

**Mesurer en production seulement.** Le terrain viendra — il faut vérifier le
domaine dans la Search Console dès la mise en ligne, sans quoi l'INP restera
invérifiable. Mais une cible qui ne se mesure qu'après la livraison n'empêche
aucune régression avant elle.

## Ce que ça engage

La cible se mesure **sur l'export**, jamais sous `next dev` : le site s'y
assemble autrement, et les deux ne sont pas comparables.

Trois des six lignes ne sont pas tenues aujourd'hui. C'est le but : une cible
qu'on atteint le jour où on l'écrit ne mesure rien.
