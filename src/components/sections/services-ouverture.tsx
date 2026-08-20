import Image from 'next/image'

import { PHOTOS } from '@/content/photos'
import type { Contenu } from '@/content/types'
import { Apparition } from '@/components/shared/apparition'
import { CartesArguments } from '@/components/shared/cartes-arguments'
import { Pilule } from '@/components/shared/pilule'
import { CONTENEUR, DECALAGE_CONTENU, GRILLE_INTITULE } from '@/components/shared/section'

/**
 * WEB-4 et WEB-12 — l'ouverture de la page Services, sur le design
 * « Services Maldia ».
 *
 * Le `h1` de la page est ici : le design ne lui donne pas de bande sombre, son
 * titre vit dans la premiere section claire. C'est aussi pour ca que la section
 * porte ses propres paddings et non ceux de `Section` — elle ouvre la page,
 * elle ne s'inscrit pas dans son rythme.
 *
 * Les chiffres viennent de `commun.pourquoi.liste`, la source que l'accueil et
 * la page A propos lisent aussi ; seule leur disposition change ici.
 */
export function ServicesOuverture({
  contenu,
  arguments: liste,
}: {
  contenu: Contenu['services']['entete']
  arguments: Contenu['commun']['pourquoi']['liste']
}) {
  return (
    <section
      aria-labelledby="titre-page"
      className="bg-fond pt-[clamp(2.75rem,4.6vw,4.5rem)] pb-[clamp(3.5rem,6vw,5.5rem)]"
    >
      <div className={CONTENEUR}>
        <div className={GRILLE_INTITULE}>
          <Apparition>
            <Pilule intitule={contenu.intitule} registre="clair" />
          </Apparition>

          <div className="flex flex-col gap-[clamp(1.625rem,2.8vw,2.5rem)]">
            <Apparition>
              <div className="flex flex-col items-start gap-5 large:flex-row large:items-end large:justify-between large:gap-[clamp(1.5rem,3vw,3rem)]">
                <h1
                  id="titre-page"
                  className="max-w-[17ch] font-titre text-[clamp(2.125rem,4.1vw,4.25rem)] leading-[0.99] tracking-[-0.055em] text-encre"
                >
                  {contenu.titre}
                </h1>
                <p className="max-w-[30ch] shrink-0 text-[0.9375rem] leading-[1.6] text-encre-2 large:text-right">
                  {contenu.description}
                </p>
              </div>
            </Apparition>

            <CartesArguments liste={liste} disposition="frise" />

            <p className="etiquette text-[0.6875rem] tracking-[0.08em] text-encre-3">
              {contenu.mention}
            </p>
          </div>
        </div>

        <Apparition className={DECALAGE_CONTENU}>
          {/* alt vide : le titre et les chiffres au-dessus portent l'information. */}
          <div className="relative mt-[clamp(1.875rem,3.2vw,3.125rem)] aspect-[1024/300] overflow-hidden rounded-panneau bg-trait-2">
            <Image
              src={PHOTOS.services}
              alt=""
              fill
              sizes="(max-width: 1000px) 100vw, 80vw"
              className="object-cover"
            />
          </div>
        </Apparition>
      </div>
    </section>
  )
}
