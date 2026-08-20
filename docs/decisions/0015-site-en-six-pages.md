# 0015 — Le site passe d'une page à six

**Tranchée.** Remplace la décision 0014 sur le nombre de pages ; sa partie
`hreflang` et sa règle sur les segments restent en vigueur.

## Le contexte

La première version était une vitrine d'une seule page par langue, avec des
ancres de navigation. La décision 0014 avait écarté « une page par section » :
six adresses dont deux tiendraient en quelques lignes, et six fois plus de
déclarations `hreflang` à garder réciproques.

Le retour client du 20 août 2026 tranche autrement. Il fixe un menu de six
entrées — Accueil, Services, Talents, À propos, Blog, Contact — et demande un
blog, ce qu'une page unique ne peut pas porter.

## Ce qui est décidé

Six pages par langue, plus une page par article de blog.

```
/fr/                        /en/
/fr/services/               /en/services/
/fr/talents/                /en/talents/
/fr/a-propos/               /en/a-propos/
/fr/blog/                   /en/blog/
/fr/blog/<article>/         /en/blog/<article>/
/fr/contact/                /en/contact/
```

La liste vit dans `PAGES`, dans `src/content/langues.ts`. Le menu, le sitemap et
la suite Playwright la lisent — aucun des trois ne réénumère les pages, sinon une
page ajoutée échapperait à l'un d'eux sans que rien ne le signale.

Il n'y a **pas** de page « Entreprise » : `Services` s'adresse aux entreprises,
`Talents` aux candidats. C'est le retour client qui l'écarte, pas une économie de
notre part.

## Les segments ne sont pas traduits

`/en/a-propos/` et non `/en/about/`.

La décision 0014 avait écarté les chemins traduits en s'appuyant sur l'absence de
pages séparées. Cet argument tombe : il y a maintenant des pages séparées. Trois
raisons le remplacent.

Quatre des six segments s'écrivent déjà pareil dans les deux langues —
`services`, `talents`, `blog`, `contact`. Traduire ne changerait que `a-propos`,
et l'accueil qui n'a pas de segment. Le gain de référencement porte sur un mot.

Le coût, lui, porte sur la réciprocité `hreflang`, que le `CLAUDE.md` désigne
comme le piège le plus fréquent du bilinguisme. Avec des segments identiques, la
correspondance entre les deux langues se lit d'un coup d'œil et se vérifie par
une seule fonction. Avec des segments traduits, il faut une table, et une table
se désynchronise.

Enfin, l'hébergement ne redirige pas (0013). Une adresse publiée ne se change
plus. Mieux vaut donc une forme simple qu'on tiendra qu'une forme optimale qu'on
cassera.

**À rouvrir** si le site dépasse la vitrine — un blog qui grossit, des pages par
marché. Ce sera alors une décision à part, avec une table de correspondance et
un test qui la tient.

## Les identifiants d'articles sont communs aux deux langues

`/fr/blog/staff-augmentation/` et `/en/blog/staff-augmentation/`.

C'est ce qui permet au sélecteur de langue de mener **au même article** et non à
l'index du blog. Sans cette égalité, il faudrait une table de correspondance par
article, et un article traduit plus tard casserait le lien sans erreur visible.

Le type `IdentifiantArticle` est une union fermée et non `string` : la photo d'un
article manquante devient alors une erreur de compilation dans `photos.ts`, au
lieu d'un trou dans la page.

## Ce que ça change dans le code

**Plus d'ancres de navigation.** `ANCRES` disparaît de `langues.ts`, et les props
`ancre` de `Section` et `Carte` avec elle. Le sélecteur de langue n'a plus besoin
de préserver le fragment d'URL : il n'est donc plus un composant client, et ne
charge plus de JavaScript.

**Les métadonnées quittent le layout.** Le canonique et le bloc `hreflang`
dépendent de la page, pas seulement de la langue. Déclarés dans le layout, ils
désigneraient la racine de langue depuis `/fr/services/`. Chaque page les produit
par `metadonnees()`, et le sitemap lit la même fonction — deux constructions
séparées finiraient par se contredire, et un sitemap qui contredit la page fait
ignorer les deux déclarations.

**`x-default` diffère selon le groupe.** L'accueil a un vrai routeur de langue à
la racine (`public/index.html`), qui se déclare lui-même comme `x-default` : les
trois adresses de ce groupe disent `/`. Les pages intérieures n'ont pas de
routeur, et `x-default` y désigne le français, langue par défaut (0014). La
réciprocité se vérifie **par groupe d'alternatives**, pas entre groupes.

## Ce qu'on a écarté

**Un formulaire de contact.** Il supposerait un point de réception, donc un
serveur, que cette application n'a pas (WEB-10). La page Contact porte les deux
voies réelles — le calendrier Cal.com et la candidature — et dit qu'il n'y a pas
de formulaire, plutôt que de laisser le visiteur le chercher.

**Un intégré Cal.com dans la page.** Plus élégant qu'un lien, mais l'adresse du
calendrier n'est pas encore fournie (0007) : l'intégré ne pourrait pas être
essayé. La page est construite pour l'accueillir sans être redessinée.

**Garder les sections de l'accueil intactes et n'ajouter que le blog.** Ç'aurait
laissé un menu qui mélange ancres et pages, et un « Accueil » qui ne ramène nulle
part depuis une page de blog.
