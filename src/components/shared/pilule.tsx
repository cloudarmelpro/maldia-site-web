import { classes } from '@/components/shared/classes'

/**
 * L'intitule de section : une pilule a puce, en capitales espacees.
 *
 * Elle se pose AU-DESSUS du contenu, dans la colonne de la section. La refonte
 * « Site Maldia » abandonne la colonne d'intitule de 190 px qui la tenait a
 * gauche, et avec elle le recalage vertical qu'elle demandait.
 *
 * Sur le vert, le voile est SOMBRE et jamais blanc : le blanc sur `#177e4f` ne
 * donne que 5,1 : 1, et un voile blanc eclaircirait le fond au point de faire
 * passer le texte sous le seuil AA.
 */
export type RegistrePilule = 'clair' | 'gris' | 'sombre'

const REGISTRES: Record<RegistrePilule, string> = {
  clair: 'bg-primaire/7 text-encre',
  gris: 'bg-white text-encre',
  sombre: 'bg-voile/26 text-white',
}

const PUCES: Record<RegistrePilule, string> = {
  clair: 'bg-primaire',
  gris: 'bg-primaire',
  sombre: 'bg-white',
}

export function Pilule({
  intitule,
  registre = 'clair',
}: {
  intitule: string
  registre?: RegistrePilule
}) {
  return (
    <span
      data-pilule
      className={classes(
        'inline-flex w-fit items-center gap-2.25 self-start justify-self-start rounded-pilule px-4 py-2 etiquette text-[0.6875rem] tracking-[0.1em]',
        REGISTRES[registre],
      )}
    >
      <span aria-hidden className={classes('size-1.5 shrink-0 rounded-pilule', PUCES[registre])} />
      {intitule}
    </span>
  )
}
