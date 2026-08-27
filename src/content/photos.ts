import type { IdentifiantArticle } from './types'

/**
 * Photos du design « Hero Maldia v2 », hebergees chez Unsplash.
 *
 * **Temporaires.** Elles tiennent la place des photos d'Agence Maldia et
 * doivent etre remplacees avant la mise en ligne : ce sont des images de
 * banque, elles ne montrent ni l'equipe, ni les bureaux, ni les talents reels.
 *
 * Elles ne vivent pas dans `fr.ts` / `en.ts` parce qu'une photo ne depend pas
 * de la langue — les y mettre imposerait de les tenir en double.
 *
 * Deux consequences de leur hebergement externe, a connaitre : le site depend
 * d'un tiers pour son rendu tant qu'elles sont la, et rien ne garantit qu'une
 * adresse Unsplash reste servie. Les photos definitives iront dans `public/`.
 */

const BASE = 'https://images.unsplash.com/photo-'

/** `w` cadre le poids servi ; `q=80` est le palier au-dela duquel l'oeil ne voit plus la difference. */
function photo(id: string, largeur: number): string {
  return `${BASE}${id}?w=${largeur}&q=80&auto=format&fit=crop`
}

export const PHOTOS = {
  /** La photo pleine largeur du hero, derriere le degrade. */
  hero: photo('1522071820081-009f0129c71c', 2000),

  /** La vignette de la carte d'appel du hero. */
  vignetteAppel: photo('1547658719-da2b51169166', 200),

  /**
   * Les vignettes de la colonne defilante du hero, dans l'ordre du design : les
   * quatre premieres pour la sous-colonne descendante, les quatre suivantes pour
   * la montante. Plusieurs de ces identifiants reviennent ailleurs dans ce
   * fichier a d'autres largeurs — `unoptimized` fige la largeur dans l'adresse,
   * donc chaque usage sert la sienne et non celle d'un hero pleine page.
   */
  vignettesHero: [
    photo('1522071820081-009f0129c71c', 600),
    photo('1517180102446-f3ece451e9d8', 600),
    photo('1497366754035-f200968a6e72', 600),
    photo('1561070791-2526d30994b5', 600),
    photo('1454165804606-c3d57bc86b40', 600),
    photo('1553877522-43269d4ea984', 600),
    photo('1574717024653-61fd2cf4d44d', 600),
    photo('1499750310107-5fef28a66643', 600),
  ] as const,

  /**
   * Une par categorie de profils (WEB-5), designee par position dans
   * `commun.profils.liste`. Le tuple force les six : un profil ajoute sans sa
   * photo ne compile pas.
   */
  profils: [
    photo('1517180102446-f3ece451e9d8', 1200),
    photo('1561070791-2526d30994b5', 1200),
    photo('1574717024653-61fd2cf4d44d', 1200),
    photo('1611926653458-09294b3142bf', 1200),
    photo('1553877522-43269d4ea984', 1200),
    photo('1454165804606-c3d57bc86b40', 1200),
  ] as const satisfies readonly [string, string, string, string, string, string],

  /**
   * Une par article du blog (WEB-15), designee par identifiant et non par
   * position : un article insere ailleurs dans la liste ne decale rien.
   */
  blog: {
    'staff-augmentation': photo('1499750310107-5fef28a66643', 1200),
    'preparer-sa-candidature': photo('1486312338219-ce68d2c6f44d', 1200),
    'travailler-avec-vos-outils': photo('1522202176988-66273c2fd55f', 1200),
  } satisfies Record<IdentifiantArticle, string>,

  /** La photo de la page A propos. */
  aPropos: photo('1497366754035-f200968a6e72', 1200),

  /**
   * La bande de la page Talents. Le design y pose la meme image que le hero de
   * l'accueil ; elle est servie a la largeur de la bande et non a celle du hero.
   */
  talents: photo('1522071820081-009f0129c71c', 1200),

  /**
   * La bande de la page Services. C'est celle que son design designe, et c'est
   * aussi la derniere du selecteur de profils : les deux ne paraissent jamais
   * sur la meme page. A separer quand les photos definitives arriveront.
   */
  services: photo('1454165804606-c3d57bc86b40', 1200),
} as const
