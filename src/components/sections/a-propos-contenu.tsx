import Image from 'next/image'

import { PHOTOS } from '@/content/photos'
import type { Contenu } from '@/content/types'
import { Apparition } from '@/components/shared/apparition'
import { classes } from '@/components/shared/classes'
import { BAS, CONTENEUR, HAUT } from '@/components/shared/section'

/**
 * WEB-6 — la declaration de la page, face a la photo.
 *
 * Sans titre et sans `aria-labelledby` : le `h1` est dans le hero, et le design
 * ne pose ici qu'une phrase en grand corps. Un titre ajoute pour nommer la
 * region serait une chaine que personne n'a ecrite. La section batit donc son
 * `<section>` elle-meme — `Section` exige l'id d'un titre.
 */
export function AProposContenu({ chapeau }: { chapeau: Contenu['aPropos']['chapeau'] }) {
  return (
    <section className={classes('bg-fond', HAUT, BAS)}>
      <div className={classes(CONTENEUR, 'flex flex-wrap items-stretch gap-[clamp(2rem,5vw,4rem)]')}>
        <Apparition registre="texte" className="min-w-0 grow basis-[28.75rem]">
          <p className="max-w-[32ch] font-titre text-[clamp(1.25rem,2.1vw,1.6875rem)] font-extralight leading-[1.35] tracking-[-0.015em] text-pretty text-encre">
            {chapeau}
          </p>
        </Apparition>

        <Apparition className="min-w-0 grow basis-[23.75rem]">
          {/* alt vide : la declaration ci-contre porte l'information. */}
          <div className="relative h-full min-h-[18.75rem] overflow-hidden rounded-panneau bg-trait-2">
            <Image
              src={PHOTOS.aPropos}
              alt=""
              fill
              sizes="(max-width: 1000px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
        </Apparition>
      </div>
    </section>
  )
}
