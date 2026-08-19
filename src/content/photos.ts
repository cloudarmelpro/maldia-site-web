/**
 * Photos de remplacement, hébergées chez Unsplash.
 *
 * **Temporaires.** Elles tiennent la place des photos d'Agence Maldia et
 * doivent être remplacées avant la mise en ligne : ce sont des images de
 * banque, elles ne montrent ni l'équipe, ni les bureaux, ni les talents réels.
 *
 * Elles ne vivent pas dans `fr.ts` / `en.ts` parce qu'une photo ne dépend pas
 * de la langue — les y mettre imposerait de les tenir en double.
 *
 * Deux conséquences de leur hébergement externe, à connaître : le site dépend
 * d'un tiers pour son rendu tant qu'elles sont là, et rien ne garantit qu'une
 * adresse Unsplash reste servie. Les photos définitives iront dans `public/`.
 */

const BASE = 'https://images.unsplash.com/photo-'

/** `w` cadre le poids servi ; `q=80` est le palier au-delà duquel l'œil ne voit plus la différence. */
function photo(id: string, largeur: number): string {
  return `${BASE}${id}?w=${largeur}&q=80&auto=format&fit=crop`
}

export const PHOTOS = {
  hero: photo('1522071820081-009f0129c71c', 1600),

  opportunites: [
    photo('1552664730-d307ca884978', 900),
    photo('1531482615713-2afd69097998', 900),
    photo('1556761175-b413da4baf72', 900),
  ],


  /** Une par categorie de WEB-5, dans l'ordre du cahier. */
  profils: [
    photo('1461749280684-dccba630e2f6', 240),
    photo('1547658719-da2b51169166', 240),
    photo('1561070791-2526d30994b5', 240),
    photo('1492691527719-9d1e07e534b4', 240),
    photo('1611162617474-5b21e879e113', 240),
    photo('1460925895917-afdab827c52f', 240),
    photo('1450101499163-c8848c66ca85', 240),
    photo('1553775282-20af80779df7', 240),
    photo('1554224155-6726b3ff858f', 240),
    photo('1521791136064-7986c2920216', 240),
    photo('1516321497487-e288fb19713f', 240),
  ],

  /** Les cinq critères du formulaire de candidature, dans l'ordre du cahier. */
  criteres: [
    photo('1454165804606-c3d57bc86b40', 300),
    photo('1517502884422-41eaead166d4', 300),
    photo('1503676260728-1c00da094a0b', 300),
    photo('1434626881859-194d67b2b86f', 300),
    photo('1506784983877-45594efa4cbe', 300),
  ],

  travailADistance: photo('1588196749597-9ff075ee6b5b', 1000),
  marches: photo('1524758631624-e2822e304c36', 1000),
  aPropos: photo('1497366754035-f200968a6e72', 1000),
} as const
