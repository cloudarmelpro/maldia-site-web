import Image from 'next/image'

import { PHOTOS } from '@/content/photos'
import type { Contenu } from '@/content/types'
import { Apparition } from '@/components/shared/apparition'
import { delaiDeGrille } from '@/components/shared/decalage'
import { Pilule } from '@/components/shared/pilule'
import { CONTENEUR, DECALAGE_CONTENU, GRILLE_INTITULE } from '@/components/shared/section'

/**
 * WEB-6 — l'ouverture de la page A propos, sur le design « A propos Maldia ».
 *
 * Le `h1` de la page est ici : le design ne lui donne pas de bande sombre comme
 * aux autres pages interieures, son titre vit dans la premiere section claire.
 * C'est aussi pour ca que la section porte ses propres paddings et non ceux de
 * `Section` — elle ouvre la page, elle ne s'inscrit pas dans son rythme.
 *
 * Le rang des principes est calcule : un principe insere au milieu renumerote
 * les suivants tout seul.
 */
export function AProposContenu({ contenu }: { contenu: Contenu['aPropos'] }) {
  return (
    <section
      aria-labelledby="titre-page"
      className="bg-fond pt-[clamp(2.75rem,4.6vw,4.5rem)] pb-[clamp(3.5rem,6vw,5.5rem)]"
    >
      <div className={CONTENEUR}>
        <div className={GRILLE_INTITULE}>
          <Apparition>
            <Pilule intitule={contenu.entete.intitule} registre="clair" />
          </Apparition>

          <div className="flex flex-col gap-[clamp(1.625rem,2.8vw,2.5rem)]">
            <Apparition>
              <div className="flex flex-col items-start gap-5 large:flex-row large:items-end large:justify-between large:gap-[clamp(1.5rem,3vw,3rem)]">
                <h1
                  id="titre-page"
                  className="max-w-[17ch] font-titre text-[clamp(2.125rem,4.1vw,4.25rem)] leading-[0.99] tracking-[-0.055em] text-encre"
                >
                  {contenu.entete.titre}
                </h1>
                <p className="max-w-[30ch] shrink-0 text-[0.9375rem] leading-[1.6] text-encre-2 large:text-right">
                  {contenu.entete.description}
                </p>
              </div>
            </Apparition>

            <Apparition>
              <p className="max-w-[62ch] text-[clamp(1.0625rem,1.5vw,1.3125rem)] leading-[1.5] tracking-[-0.02em] text-encre">
                {contenu.chapeau}
              </p>
            </Apparition>

            <ul className="grid grid-cols-1 gap-3.5 duo:grid-cols-2 frise:grid-cols-3">
              {contenu.principes.map((principe, indice) => (
                <li key={principe.titre} className="min-w-0">
                  <Apparition delai={delaiDeGrille(indice)} className="h-full">
                    <div className="carte-claire grid h-full min-w-0 grid-rows-[auto_auto_1fr] rounded-carte-large border border-trait p-[clamp(1.375rem,1.9vw,1.75rem)]">
                      <span className="flex items-center justify-between gap-3">
                        <span
                          aria-hidden
                          className="grid size-8.5 shrink-0 place-items-center rounded-liste bg-encre etiquette text-[0.6875rem] tracking-[0.04em] text-lime"
                        >
                          {String(indice + 1).padStart(2, '0')}
                        </span>
                        <span className="etiquette-fine text-[0.625rem] tracking-[0.09em] text-encre-3">
                          {principe.intitule}
                        </span>
                      </span>
                      <strong className="mt-[clamp(1.875rem,3vw,2.875rem)] font-titre text-[clamp(1.125rem,1.5vw,1.375rem)] leading-[1.16] tracking-[-0.038em] text-encre">
                        {principe.titre}
                      </strong>
                      <span className="mt-3.5 border-t border-trait pt-3.75 text-[0.84375rem] leading-[1.6] text-encre-2">
                        {principe.texte}
                      </span>
                    </div>
                  </Apparition>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Apparition className={DECALAGE_CONTENU}>
          {/* alt vide : le chapeau et les principes au-dessus portent l'information. */}
          <div className="relative mt-[clamp(1.875rem,3.2vw,3.125rem)] aspect-[1024/300] overflow-hidden rounded-panneau bg-trait-2">
            <Image
              src={PHOTOS.aPropos}
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
