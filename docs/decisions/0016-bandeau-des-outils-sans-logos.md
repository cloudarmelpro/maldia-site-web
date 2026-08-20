# 0016 — Le bandeau des outils porte des noms, pas des logos

**Tranchée** — à rouvrir si le client fournit les fichiers.

## Ce que demande le retour client

`WEB-14` : un bandeau horizontal de **logos d'outils** qui défilent, montrant
que les talents s'adaptent à l'environnement de travail du client. Trente-trois
marques, réparties en neuf catégories.

Et une contrainte, dans la même phrase : le bandeau ne doit pas laisser entendre
que Maldia est partenaire officiel de ces entreprises.

## Ce qui a été livré

Les noms des trente-trois outils, en pastilles, sur trois rangées qui défilent en
sens alternés. Le message du client au-dessus, et une mention en dessous qui dit
qu'aucun partenariat n'est sous-entendu.

## Pourquoi pas les logos

La source normale de logos de marques en SVG est `simple-icons`. Elle ne les
porte plus tous : ses mainteneurs retirent une icône quand le propriétaire de la
marque le demande. Onze des marques du retour client sont dans ce cas —
**Slack**, **Microsoft Teams**, **Microsoft 365**, **Google Workspace**, **VS
Code**, **Canva**, **Photoshop**, **Illustrator**, **CapCut**, **Premiere Pro**,
**After Effects**, **Salesforce**.

Le paquet a été installé et interrogé avant d'être retiré : il couvre à peine
deux marques sur trois de la liste. Un bandeau où un tiers des cases porte un
logo et le reste du texte ne se lit pas comme un choix graphique — il se lit
comme un affichage cassé.

Redessiner les logos manquants à la main aurait été pire : ce sont exactement les
marques dont les propriétaires ont demandé le retrait de leur redistribution.

Un détail qui n'est pas un détail : ces retraits sont eux-mêmes des demandes de
titulaires de marques. Afficher un logo suggère plus fortement un partenariat
qu'un nom écrit — donc la solution en texte sert *mieux* la contrainte que le
client a lui-même posée que celle qu'il a demandée.

## Le coût technique, accessoirement nul

Le bandeau est un composant serveur, sans JavaScript : le défilement est en CSS.
Il n'ajoute donc aucun octet au paquet client, là où trente-trois SVG en
auraient ajouté — ou auraient exigé trente-trois requêtes.

## Ce qu'il faut pour rouvrir

Les fichiers, fournis par le client, dans `public/`, avec pour chaque marque la
vérification de ses conditions d'utilisation de logo. Ce n'est pas un travail de
développement : c'est une décision de risque, et elle n'est pas la nôtre.

Le composant n'aura pas à être redessiné — `OUTILS` deviendra une liste de
`{ nom, fichier }`, et la pastille rendra l'image à côté du nom.

## Ce qu'on a écarté

**Un mélange logos et noms**, selon la disponibilité. Écarté : incohérent à
l'œil, et il aurait fallu expliquer pourquoi Slack est en texte et Notion en
image.

**Une icône générique par catégorie**, tirée de `lucide-react`. Écarté : une
bulle de dialogue à la place de « Slack » n'informe pas — elle occupe la place du
nom sans le remplacer.

**Retirer les marques sans logo de la liste.** Écarté : le retour client les
nomme une par une, et Slack ou Teams sont précisément les outils qu'une
entreprise cherche à reconnaître.
