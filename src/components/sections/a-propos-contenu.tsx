import Image from 'next/image'

import { PHOTOS } from '@/content/photos'
import type { Contenu } from '@/content/types'
import { Revelation } from '@/components/shared/revelation'
import { Apparition } from '@/components/shared/apparition'
import { classes } from '@/components/shared/classes'
import { BAS, CONTENEUR, HAUT } from '@/components/shared/section'

/**
 * WEB-6 — la declaration de la page, face a la photo.
 *
 * Sans titre et sans `aria-labelledby` : le `h1` est dans le hero, et le design
 * ne pose ici qu'une phrase en grand corps suivie de sa suite. Un titre ajoute
 * pour nommer la region serait une chaine que personne n'a ecrite. La section
 * batit donc son `<section>` elle-meme — `Section` exige l'id d'un titre.
 *
 * Les deux colonnes tiennent par leur base et non par un point de rupture : la
 * base vaut zero tant que la ligne fait moins que le seuil, ce qui empile les
 * colonnes, et devient enorme au-dela, ce qui les egalise. La bascule suit donc
 * la largeur disponible ici, pas celle de la fenetre.
 */
const COLONNE = 'min-w-0 shrink grow basis-[calc((51.25rem_-_100%)*999)]'

export function AProposContenu({
  chapeau,
  suite,
}: {
  chapeau: Contenu['aPropos']['chapeau']
  suite: Contenu['aPropos']['chapeauSuite']
}) {
  return (
    <section className={classes('bg-fond', HAUT, BAS)}>
      <div
        className={classes(
          CONTENEUR,
          'flex flex-wrap items-stretch gap-[clamp(1.5rem,3vw,2.75rem)]',
        )}
      >
        {/* La declaration passe en revelation par lignes, comme tout le texte
            lu du site. C'etait le dernier appelant du registre `texte`, donc du
            flou a l'entree — la seule propriete animee du depot qui ne fut ni
            `transform` ni `opacity`, et que la decision 0023 laissait « a
            confirmer ». La question se referme d'elle-meme. */}
        <div
          className={classes(
            COLONNE,
            'flex flex-col justify-center gap-[clamp(1.125rem,2vw,1.625rem)]',
          )}
        >
          <Revelation className="max-w-[34ch] font-titre text-[clamp(1.1875rem,1.8vw,1.6875rem)] leading-[1.3] font-normal tracking-[-0.04em] text-pretty text-encre">
            {chapeau}
          </Revelation>
          <Revelation
            delai={0.12}
            className="max-w-[42ch] text-[0.9375rem] leading-[1.65] text-encre-2"
          >
            {suite}
          </Revelation>
        </div>

        <Apparition className={COLONNE}>
          {/* alt vide : la declaration ci-contre porte l'information. */}
          <div className="relative h-full min-h-[clamp(16.25rem,30vw,23.75rem)] overflow-hidden rounded-panneau bg-fond-2">
            {/* Cette image est dans le pli aux deux tailles, et c'est elle que
                le navigateur retient comme LCP. Paresseuse, elle ne pouvait pas
                partir avant la mise en page : mesure, 1,2 s de retard sur le
                premier rendu de la meme page. */}
            <Image
              src={PHOTOS.aPropos}
              alt=""
              fill
              preload
              sizes="(max-width: 1000px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
        </Apparition>
      </div>
    </section>
  )
}
