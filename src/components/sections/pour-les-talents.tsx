import Image from 'next/image'

import { PHOTOS } from '@/content/photos'
import type { Contenu } from '@/content/types'
import { Apparition } from '@/components/shared/apparition'
import { Carte } from '@/components/shared/carte'
import { delaiDeGrille } from '@/components/shared/decalage'
import { CONTENEUR, MESURE_PROSE } from '@/components/shared/section'
import { Visuel } from '@/components/shared/visuel'

// Le seul dégradé de fond de la maquette. Il ne devient pas un jeton : trois
// arrêts pour un seul usage, au seul endroit qui les rend.
const FOND = 'bg-[linear-gradient(150deg,#DCEEE4_20%,#E7F2EB_55%,#C9DAD1)]'

const TITRE_CARTE = 'text-[1.4375rem] font-semibold tracking-[-0.015em] text-encre'
const CORPS_CARTE = 'font-description text-[0.97rem] leading-[1.6] text-encre-2'

/**
 * WEB-3 — ce qu'il faut savoir avant de candidater, dans le bloc dégradé de la
 * maquette : une carte haute à gauche, une pile de deux à droite, puis les
 * critères du formulaire sur toute la largeur.
 *
 * L'enveloppe est `bg-fond-2` et non `bg-fond` : l'arrondi haut du bloc laisse
 * voir la couleur du parent, et cette section suit toujours les opportunités,
 * qui sont sur ce registre.
 *
 * Le fond est clair : `text-encre-3` et non `text-encre-2` pour la description
 * de section, qui tomberait sous 4,5:1 sur cette teinte.
 */
export function PourLesTalents({
  cartes,
  criteres,
}: {
  cartes: Contenu['talents']['cartes']
  criteres: Contenu['talents']['criteres']
}) {
  const [distance, marches, recrutement] = cartes.liste

  return (
    <div className="bg-fond-2">
      <section
        aria-labelledby="titre-pour-les-talents"
        className={`rounded-t-bloc ${FOND} py-20 lg:py-[4.875rem]`}
      >
        <div className={CONTENEUR}>
          <Apparition>
            <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
              <h2
                id="titre-pour-les-talents"
                className="max-w-[20ch] font-titre text-[2.125rem] leading-[1.05] font-normal text-balance text-encre sm:text-[2.75rem] lg:text-[3.375rem]"
              >
                {cartes.titre}
              </h2>
              <p
                className={`${MESURE_PROSE} font-description text-[1.0625rem] leading-[1.55] text-encre-3`}
              >
                {cartes.description}
              </p>
            </div>
          </Apparition>

          {/* [&>*]:min-w-0 : un enfant de grille vaut min-width:auto par defaut, et
              la piste s'elargit alors au contenu le plus large — la page deborde
              a 360 px sans que rien ne le laisse voir dans le fichier. */}
          <div className="mt-15 grid items-start gap-7.5 [&>*]:min-w-0 lg:grid-cols-2">
            <Apparition>
              <Carte className="rounded-carte-large p-3.5 pb-10">
                <Visuel ratio="carre" photo={PHOTOS.travailADistance} arrondi="rounded-[1.25rem]" />
                <div className="flex flex-col gap-4 px-7 pt-8">
                  <h3 className={TITRE_CARTE}>{distance.titre}</h3>
                  <p className={CORPS_CARTE}>{distance.description}</p>
                </div>
              </Carte>
            </Apparition>

            <div className="flex flex-col gap-7.5">
              <Apparition delai={delaiDeGrille(1)}>
                <Carte className="flex flex-col gap-4 rounded-carte-large p-9">
                  <h3 className={TITRE_CARTE}>{marches.titre}</h3>
                  <p className={CORPS_CARTE}>{marches.description}</p>
                  <Visuel ratio="bandeau" photo={PHOTOS.marches} arrondi="mt-3.5 rounded-[1rem]" />
                </Carte>
              </Apparition>

              <Apparition delai={delaiDeGrille(2)}>
                <Carte className="flex flex-col gap-4 rounded-carte-large p-9">
                  <h3 className={TITRE_CARTE}>{recrutement.titre}</h3>
                  <p className={CORPS_CARTE}>{recrutement.description}</p>
                  <ol className="mt-4 flex items-start gap-2.5">
                    {recrutement.frise.map((jalon, indice) => (
                      <li
                        key={jalon.libelle}
                        className="flex min-w-0 flex-1 flex-col items-center gap-3.5"
                      >
                        <span
                          className={`rounded-pilule px-4 py-2.5 text-center text-[0.9375rem] font-medium ${
                            indice === 0 ? 'bg-tendre text-primaire-2' : 'text-encre-2'
                          }`}
                        >
                          {jalon.libelle}
                        </span>
                        <span
                          aria-hidden
                          className="w-full border-t-[1.5px] border-dashed border-trait"
                        />
                        <span
                          aria-hidden
                          className={`-mt-[1.3125rem] size-3.5 rounded-full border-2 bg-carte ${
                            indice === 0 ? 'border-primaire' : 'border-encre-2'
                          }`}
                        />
                        <span className="text-sm text-encre-2">{jalon.precision}</span>
                      </li>
                    ))}
                  </ol>
                </Carte>
              </Apparition>
            </div>

            <Apparition delai={delaiDeGrille(3)} className="lg:col-span-2">
              <Carte className="flex flex-col gap-5 rounded-carte-large p-9">
                <h3 className={TITRE_CARTE}>{criteres.titre}</h3>
                {/* La carte occupe les deux colonnes : sans plafond, ce paragraphe
                    atteint 101 caractères par ligne à 1280 px et au-delà. */}
                <p className={`${MESURE_PROSE} ${CORPS_CARTE}`}>{criteres.description}</p>
                <span aria-hidden className="my-1.5 h-px bg-trait" />
                <ul className="grid grid-cols-3 gap-3.5 sm:grid-cols-5">
                  {criteres.liste.map((critere, indice) => (
                    <li
                      key={critere.libelle}
                      className="flex min-w-0 flex-col items-center text-center"
                    >
                      {/* alt vide : le libellé du critère suit immédiatement. */}
                      <span className="relative aspect-square w-full overflow-hidden rounded-[1rem] bg-fond-2">
                        <Image
                          src={PHOTOS.criteres[indice]}
                          alt=""
                          fill
                          sizes="(max-width: 640px) 33vw, 160px"
                          className="object-cover"
                        />
                      </span>
                      <span className="mt-2.5 text-sm font-semibold text-encre">
                        {critere.libelle}
                      </span>
                      <span className="text-[0.8125rem] text-encre-2">{critere.precision}</span>
                    </li>
                  ))}
                </ul>
              </Carte>
            </Apparition>
          </div>
        </div>
      </section>
    </div>
  )
}
