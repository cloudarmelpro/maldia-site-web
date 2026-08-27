import type { Contenu } from '@/content/types'
import { Apparition } from '@/components/shared/apparition'
import { classes } from '@/components/shared/classes'
import { delaiDeGrille } from '@/components/shared/decalage'
import { Pilule } from '@/components/shared/pilule'
import { BAS, CONTENEUR, HAUT } from '@/components/shared/section'

const TITRE_ID = 'titre-methode'

/**
 * WEB-4 — les cinq etapes, dans le traitement que le design reserve a Services :
 * une liste sur filets, et non les cartes de l'accueil.
 *
 * La bande est sombre, seule du site. Ce n'est pas un reste de l'ancienne
 * charte : le bloc Contact qui ferme la page est vert et coiffe d'arrondis de
 * 28 px, et une section verte avant lui ne laisserait lire la coiffe que comme
 * deux encoches aux angles — mesure sur cette page.
 *
 * Le cote se lit sur `etape.cote` et jamais sur `acteur`, qui est traduit.
 * Le rang est calcule depuis l'indice.
 */
export function ServicesMethode({ contenu }: { contenu: Contenu['commun']['methode'] }) {
  return (
    <section aria-labelledby={TITRE_ID} className={classes('bande-encre text-white', HAUT, BAS)}>
      <div className={CONTENEUR}>
        <Apparition>
          <Pilule intitule={contenu.intitule} registre="sombre" />
        </Apparition>

        <Apparition registre="texte">
          <h2
            id={TITRE_ID}
            className="mt-[clamp(1.75rem,3.2vw,2.75rem)] max-w-[24ch] font-titre text-[clamp(1.3125rem,2vw,1.75rem)] leading-[1.08] tracking-[-0.03em] text-white"
          >
            {contenu.titre}
          </h2>
        </Apparition>

        <ol className="mt-[clamp(1.875rem,3.4vw,2.875rem)] border-t border-white/12">
          {contenu.liste.map((etape, indice) => (
            <li key={etape.titre} className="border-b border-white/12">
              <Apparition
                delai={delaiDeGrille(indice)}
                className="flex flex-wrap items-start gap-x-5.5 gap-y-3 py-6"
              >
                <span
                  aria-hidden
                  className="w-11 shrink-0 font-titre text-[1.5rem] font-extralight leading-[1.2] text-white/55"
                >
                  {String(indice + 1).padStart(2, '0')}
                </span>

                <span className="flex min-w-0 flex-[1_1_18.75rem] flex-col gap-2">
                  <strong className="font-titre text-[1.1875rem] font-light text-white">
                    {etape.titre}
                  </strong>
                  <span className="max-w-[52ch] text-[0.96875rem] leading-[1.55] text-white/92">
                    {etape.description}
                  </span>
                </span>

                <span
                  className={classes(
                    'shrink-0 self-start rounded-pilule px-2.75 py-1 etiquette-fine text-[0.71875rem] tracking-[0.08em] whitespace-nowrap',
                    etape.cote === 'client' ? 'bg-white text-encre' : 'bg-voile/42 text-white',
                  )}
                >
                  {etape.acteur}
                </span>
              </Apparition>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
