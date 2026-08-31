import Image from 'next/image'

import { avecNombre } from '@/content/chiffres'
import type { Langue } from '@/content/langues'
import { PHOTOS } from '@/content/photos'
import type { Contenu } from '@/content/types'
import { Bouton } from '@/components/shared/bouton'
import { Revelation } from '@/components/shared/revelation'
import { CONTENEUR } from '@/components/shared/section'

/** Les quatre premiers profils, en pastilles rondes qui se chevauchent. */
const VISAGES = PHOTOS.profils.slice(0, 4)

/**
 * L'eventail : cinq cartes sur la meme piste, a trois secondes d'ecart sur un
 * cycle de quinze. Le decalage est NEGATIF pour que l'animation demarre deja
 * engagee — sinon les cinq cartes attendent leur tour et le premier tiers de
 * cycle est vide.
 */
const PAS_CARTE = 3

/**
 * La perspective de la maquette. Elle est posee sur le parent et non sur chaque
 * carte : `perspective()` applique a chaque enfant donnerait a chacun son propre
 * point de fuite, et l'eventail cesserait d'etre un seul objet.
 */
const PERSPECTIVE =
  '[transform:perspective(1500px)_rotateY(24deg)_rotateX(7deg)_rotateZ(-2deg)] [transform-style:preserve-3d]'

/** Le pas de la piste : la carte fait `min(44vw, 320px)` de large, en 4/3. */
const CARTE = 'w-[min(44vw,20rem)] aspect-[4/3]'

/**
 * Le hero de l'accueil, refait d'apres la maquette « Site Maldia ».
 *
 * **Il est CLAIR.** Le hero etait vert, avec deux colonnes de vignettes
 * defilantes a droite ; la maquette le pose sur blanc, centre, et remplace les
 * vignettes par un eventail de cartes en perspective. Les huit photos de
 * `PHOTOS.vignettesHero` sont parties avec, et les deux defilements verticaux
 * de `globals.css` aussi — ils n'avaient que cet appelant.
 *
 * **Le titre et le chapeau se revelent ligne par ligne, comme partout ailleurs**
 * — en `desLeMontage`, sans attendre un point de defilement : c'est le premier
 * ecran, il n'y a rien a attendre.
 *
 * Ce que ca coute, et il faut le savoir : ces deux blocs partent d'`opacity: 0`
 * et attendent GSAP. Au-dessus du pli, c'est du texte qui n'existe pas tant que
 * le paquet n'est pas la. Deux filets le rattrapent — la garde
 * `@media (scripting: enabled)` de `revelable`, qui ne masque rien sans script,
 * et le secours a 4 s si GSAP n'arrive jamais.
 *
 * **La ligne de preuve et les deux appels restent peints.** Une commande qui
 * attend une animation pour exister est une commande qu'on ne peut ni voir ni
 * atteindre, et ce sont les deux appels de WEB-2.
 *
 * L'eventail, lui, est en CSS pur : il tourne sans script.
 *
 * `min-h-svh` et non `100vh` : sur telephone, `100vh` vaut la fenetre SANS la
 * barre d'adresse, donc les deux appels de WEB-2 se retrouvent sous le pli au
 * chargement. `dvh` ferait changer la hauteur pendant le defilement.
 */
export function Hero({
  contenu,
  cta,
  langue,
}: {
  contenu: Contenu['accueil']['hero']
  /**
   * WEB-2 fige ce libelle : « CTA "Prendre rendez-vous" ». La maquette propose
   * « Appel de 30 minutes » ; le cahier l'emporte, et c'est un ecart assume
   * entre les deux.
   */
  cta: Contenu['commun']['enTete']['cta']
  langue: Langue
}) {
  return (
    <section
      aria-labelledby="titre-hero"
      className="relative flex min-h-svh flex-col overflow-hidden bg-fond"
    >
      <div className="relative z-3 flex flex-1 flex-col justify-end pt-[calc(var(--hauteur-en-tete,4.5rem)+clamp(3rem,6vw,5.5rem))] pb-[clamp(2rem,3.5vw,3.5rem)]">
        <div
          className={`${CONTENEUR} flex flex-col items-center gap-[clamp(1.125rem,2vw,1.625rem)] text-center`}
        >
          <p className="inline-flex items-center gap-3">
            {/* Muettes : la phrase a cote porte l'information, et quatre
                portraits annonces un par un n'ajouteraient rien. */}
            <span aria-hidden className="inline-flex items-center">
              {VISAGES.map((photo, indice) => (
                <span
                  key={photo}
                  className="relative block size-6.5 shrink-0 overflow-hidden rounded-pilule ring-2 ring-white"
                  style={{ marginLeft: indice ? -9 : 0, zIndex: VISAGES.length - indice }}
                >
                  <Image src={photo} alt="" fill sizes="26px" className="object-cover" />
                </span>
              ))}
            </span>
            <span className="text-[0.84375rem] tracking-[-0.005em] text-encre-2">
              {avecNombre(contenu.preuve, langue)}
            </span>
          </p>

          <Revelation
            balise="h1"
            id="titre-hero"
            desLeMontage
            className="max-w-[12ch] font-titre text-[clamp(1.875rem,4vw,3.375rem)] leading-[1.06] tracking-[-0.055em] text-balance text-encre [word-spacing:-0.02em]"
          >
            {contenu.titre}
          </Revelation>

          <Revelation
            desLeMontage
            delai={0.12}
            className="max-w-[34ch] text-[clamp(0.90625rem,1.05vw,1rem)] leading-[1.5] text-pretty text-encre-2"
          >
            {contenu.lead}
          </Revelation>

          <div className="mt-1 flex flex-wrap items-center justify-center gap-2.5">
            <Bouton destination="rendezVous" libelle={cta} variante="vert" taille="haute" />
            <Bouton
              destination="candidature"
              libelle={contenu.carteCandidature}
              variante="teinte"
              taille="haute"
            />
          </div>
        </div>

        <div className="relative mt-[clamp(1.25rem,3vw,2.5rem)] flex shrink-0 items-center justify-center overflow-hidden">
          {/* `aria-hidden` : les cinq metiers defilent sans qu'on puisse les
              atteindre, et la section Profils les liste deja de facon lisible. */}
          <div
            aria-hidden
            className={`relative h-[calc(min(44vw,20rem)*0.75+6rem)] w-[min(100%,47.5rem)] ${PERSPECTIVE}`}
          >
            {contenu.cartes.metiers.map((metier, indice) => (
              <div
                key={metier}
                className={`absolute top-1/2 left-1/2 rounded-[0.625rem] bg-white opacity-0 shadow-[0_1px_0_--alpha(var(--color-encre)/10%),0_18px_40px_-30px_--alpha(var(--color-encre)/45%)] motion-safe:animate-eventail-cartes ${CARTE}`}
                style={{ animationDelay: `-${indice * PAS_CARTE}s` }}
              >
                <span
                  className="absolute inset-0 flex flex-col justify-end gap-1.5 p-[clamp(0.875rem,1.8vw,1.25rem)] motion-safe:animate-libelle-carte"
                  style={{ animationDelay: `-${indice * PAS_CARTE}s` }}
                >
                  <span className="etiquette-fine tracking-[0.11em] text-primaire">
                    {contenu.cartes.intitule}
                  </span>
                  <span className="font-titre text-[clamp(1.0625rem,1.9vw,1.625rem)] leading-[1.05] tracking-[-0.04em] text-encre">
                    {metier}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
