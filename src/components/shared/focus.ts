/**
 * L'anneau de focus, en un seul endroit.
 *
 * Il etait redefini **douze fois dans onze fichiers**, pour deux chaines
 * distinctes seulement. Aucune n'avait diverge, mais rien ne l'en empechait :
 * un anneau retire ou epaissi dans un fichier serait passe inapercu partout
 * ailleurs.
 *
 * Deux valeurs, et le choix ne tient qu'a une chose : sur quoi l'anneau se
 * dessine. Sur le vert de marque, l'encre y disparaitrait.
 *
 * Module sans `"use client"` : ce sont des chaines, lues par des composants
 * serveur comme client.
 */
const BASE = 'focus-visible:outline-2 focus-visible:outline-offset-2'

/** Sur un fond clair. */
export const FOCUS = `${BASE} focus-visible:outline-encre`

/** Sur le vert de marque, ou sur toute surface sombre. */
export const FOCUS_CLAIR = `${BASE} focus-visible:outline-white`

/**
 * Pour l'en-tete, et lui seul : son encre bascule entre le blanc et le vert
 * selon la section qu'il survole, et l'anneau doit la suivre. Ni `FOCUS` ni
 * `FOCUS_CLAIR` ne peuvent le faire — l'un disparait sur le vert, l'autre sur
 * le blanc.
 */
export const FOCUS_SUIVEUR = `${BASE} focus-visible:outline-current`

/**
 * Pour la pastille de page COURANTE de l'en-tete, et elle seule.
 *
 * Cette pastille inverse ses couleurs par rapport a la barre : sur un fond
 * clair elle est verte a texte blanc, sur le vert elle est blanche a texte
 * encre. `outline-current` suivrait donc son encre a elle — et l'anneau, trace
 * a `outline-offset: 2px`, se dessine DEHORS, sur le fond de la section.
 *
 * Mesure : blanc sur blanc = 1,00 : 1 sur le hero clair, encre sur vert =
 * 2,30 : 1 sur les pages vertes. Sous le seuil de 3 dans les deux cas, et
 * invisible dans le premier. L'anneau de la pastille courante doit donc suivre
 * le FOND de la barre, pas l'encre de l'element.
 */
export const FOCUS_COURANTE = {
  clair: `${BASE} focus-visible:outline-primaire`,
  sombre: `${BASE} focus-visible:outline-white`,
}
