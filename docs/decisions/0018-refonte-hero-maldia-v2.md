# 0018 — Refonte complète sur « Hero Maldia v2 »

**Tranchée par le client** le 20 août 2026 : « on change complètement le design
alors fait le exactement comme ça, sans rien changer ».

Source : le fichier `Hero Maldia v2.dc.html` du projet de design
`6cfd7c63-9a0e-4372-b1da-57c6410026a5`, lu par le connecteur claude.ai/design.

## Ce qui change

**Le registre s'inverse.** Le site était clair, ponctué de blocs verts aux coins
arrondis qui montaient l'un sur l'autre. Il est maintenant clair **ouvert et
fermé par des bandes sombres**, aux angles droits, et c'est l'alternance
clair/sombre qui donne le rythme. Le geste des blocs arrondis disparaît.

**La palette.** Deux verts très sombres — `#0b1712` pour le hero, `#0f1d17` pour
les sections sombres et l'encre — le blanc, un gris `#f4f5f3`, le vert
`#177e4f`, et un accent **citron `#cdf565`** qui n'existait pas.

**Les polices.** **Archivo** pour tout le texte lu, **IBM Plex Mono** pour les
étiquettes en capitales espacées — intitulés de section, libellés de bouton,
métadonnées. Deux graisses, 400 et 500, et le poids ne marque donc que le
registre. Cela remplace DM Sans (décision 0017).

**La grille.** Chaque section porte une colonne d'intitulé de 190 px à gauche et
son contenu à droite, au-delà de 1000 px. En dessous, l'intitulé passe au-dessus.

**Le hero.** Une photo pleine fenêtre, l'en-tête posé dessus sans aplat, le titre
calé en bas, deux cartes d'appel — une blanche à vignette, une citron — et une
barre de coordonnées qui ferme la section.

## Les cinq points de rupture sont ceux du design

620, 760, 820, 900 et 1000 px, déclarés comme jetons. Ceux de Tailwind ne tombent
pas aux mêmes largeurs : `lg` vaut 1024 là où le design bascule à 1000, et
vingt-quatre pixels suffisent à décaler la colonne d'intitulé sur un portable de
1000 px de large.

## Le design est une page, le site en a six

C'est la seule tension réelle, et elle se résout d'elle-même.

Le fichier est une page unique à ancres. Mais sa navigation pointe vers
`#talents`, `#apropos` et `#blog` — **trois ancres qui n'existent nulle part dans
le fichier**. Ses six entrées sont donc les six pages du retour client du
20 août (WEB-11, décision 0015), pas des sections.

Le design a été implémenté comme **la page d'accueil et la langue visuelle du
site**. Les cinq autres pages reprennent la même grille, les mêmes bandes et les
mêmes appels, avec une bande sombre d'en-tête à la place du hero photographique :
une photo n'y dirait rien de plus et retarderait l'affichage.

## Ce dont on s'est écarté, et pourquoi

**Les liens sociaux ne sont pas des liens.** Le design leur donne `href="#rdv"`,
c'est-à-dire nulle part, et les comptes ne sont pas fournis. Ce sont des repères
visuels, `aria-hidden`. Un lien qui ne mène nulle part vaut moins qu'un repère.

**Trois cibles tactiles ont grandi.** Le bouton compact du design fait 42 px, le
bouton de pause du hero 30 px, et le titre d'une carte de blog tombait à 20 px.
Sous 768 px, une cible tactile doit faire 44 px — la suite d'écrans le mesure sur
les quatorze pages. Les trois passent donc à 44 px sur petit écran ; l'écart est
invisible à l'œil.

**La typographie française est appliquée.** Le design écrit « 50 % » et « frais ? »
avec des espaces ordinaires. Les mêmes mots portent ici l'espace insécable
étroite avant la ponctuation double et l'insécable avant le signe %. Ce ne sont
pas d'autres chaînes, c'est la même phrase correctement composée — et
`tests/typographie.spec.ts` le tient.

**L'en-tête est en `z-60`, pas en `z-3`.** `position` plus `z-index` créent un
contexte d'empilement, et le panneau de menu mobile en `fixed z-90` est son
descendant : son z-index ne comptait que dans ce contexte. À `z-3`, la barre de
pied du hero — même niveau, plus loin dans le DOM — se peignait par-dessus le
panneau et interceptait ses clics.

## Un défaut ancien que la refonte a mis au jour

`next/link` préfetche dès qu'un lien entre dans la fenêtre, en production : il
demande la charge RSC de la route ciblée. `output: 'export'` ne produit pas ces
charges. **Chaque page servait donc autant de 404 qu'elle porte de liens** — six
sur une page courante — invisibles à l'usage, bien réelles dans le journal d'un
hébergeur.

Il n'avait jamais été vu parce que la console n'était inspectée que sur
`next dev`, où la route existe. Tout lien interne passe désormais par
`components/shared/lien.tsx`, seul endroit où `prefetch` est décidé.

## Ce qui reste à trancher

**`contact@agencemaldia.com` et « Antananarivo, Madagascar » viennent du design.**
Ce sont deux affirmations publiques — une boîte qui doit recevoir du courrier, une
adresse qui situe l'entreprise. Ni l'une ni l'autre n'a été confirmée par le
client. Le courriel est rendu en `mailto:` ; le design, lui, le pointait vers
`#rdv`, c'est-à-dire nulle part.

**Les huit photos** sont des images de banque hébergées chez Unsplash, dont les
six du sélecteur de profils. Elles restent à remplacer avant la mise en ligne.

**Les deux destinations sortantes sont toujours vides** (décision 0007) :
`npm run verifier` échoue exprès.
