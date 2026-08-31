import type { Etape } from '@/content/types'
import { Apparition } from '@/components/shared/apparition'
import { classes } from '@/components/shared/classes'
import { delaiDeGrille } from '@/components/shared/decalage'

/**
 * Une etape de parcours : son rang, qui agit, le titre, la description.
 *
 * Un seul lieu pour une carte que rendent l'accueil, Services et Talents. La
 * meme carte recopiee par section derive sans bruit : un ecart ecrit sous deux
 * orthographes (`mt-6.5` contre `mt-[1.625rem]`) se lit identique et ne l'est
 * pas au premier changement d'echelle.
 *
 * **Le rang est calcule depuis l'indice**, jamais recopie dans le contenu : une
 * etape inseree renumerote les suivantes toute seule.
 *
 * **Le cote se lit sur `etape.cote` et jamais sur `acteur`**, qui est traduit :
 * comparer a « Vous » marcherait en francais et nulle part ailleurs.
 */
export type RegistreEtape = 'vert' | 'clair'

const CARTE: Record<RegistreEtape, string> = {
  vert: 'bg-voile/26',
  clair: 'bg-primaire/5',
}

const RANG: Record<RegistreEtape, string> = {
  vert: 'text-white',
  clair: 'text-encre-2',
}

/** Le cote qui agit prend la surface pleine ; l'autre, le repos. */
const PASTILLE: Record<RegistreEtape, { client: string; maldia: string }> = {
  vert: { client: 'bg-white text-encre', maldia: 'bg-voile/34 text-white' },
  clair: { client: 'bg-primaire text-white', maldia: 'bg-white text-encre-2' },
}

const TITRE: Record<RegistreEtape, string> = {
  vert: 'text-white',
  clair: 'text-encre',
}

const DESCRIPTION: Record<RegistreEtape, string> = {
  vert: 'text-white',
  clair: 'text-encre-2',
}

export function CarteEtape({
  etape,
  indice,
  registre,
}: {
  etape: Etape
  /** Donne le rang affiche et le decalage d'entree. */
  indice: number
  registre: RegistreEtape
}) {
  return (
    /* La carte est l'element anime : `display: contents` sur un conteneur
       intermediaire annulerait la transformation. */
    <Apparition
      delai={delaiDeGrille(indice)}
      className={classes(
        'flex h-full min-h-[clamp(12.25rem,16vw,14.125rem)] min-w-0 flex-col rounded-carte p-[clamp(1rem,1.4vw,1.25rem)]',
        CARTE[registre],
      )}
    >
      <span className="flex items-center justify-between gap-3">
        <span
          className={classes(
            'etiquette-fine text-[0.6875rem] tracking-[0.09em] normal-case',
            RANG[registre],
          )}
        >
          {String(indice + 1).padStart(2, '0')}
        </span>
        <span
          className={classes(
            'rounded-etiquette px-2.25 py-1.25 etiquette-fine text-[0.6875rem] tracking-[0.07em] whitespace-nowrap',
            PASTILLE[registre][etape.cote],
          )}
        >
          {etape.acteur}
        </span>
      </span>

      <span className="mt-6.5 flex min-w-0 flex-col gap-2.25">
        <strong
          className={classes(
            'font-titre text-[clamp(1.0625rem,1.35vw,1.25rem)] leading-[1.2] tracking-[-0.03em]',
            TITRE[registre],
          )}
        >
          {etape.titre}
        </strong>
        <span className={classes('text-[0.78125rem] leading-[1.45]', DESCRIPTION[registre])}>
          {etape.description}
        </span>
      </span>
    </Apparition>
  )
}
