import { classes } from '@/components/shared/classes'

/**
 * L'intitule de section : une puce ronde, puis le libelle en capitales.
 *
 * Il remplace la pilule a fond de la version precedente du design, retiree
 * partout — heros, sections claires et sections vertes.
 *
 * Sur le vert, la puce est BLANCHE et non vert clair : le vert clair n'y tient
 * que 2,6 : 1, et il n'y a plus de fond sombre pour l'accueillir.
 *
 * Avec un `id`, il devient le `h2` qui nomme sa section. C'est le cas quand la
 * section n'a pas d'autre titre a lui donner — sur l'index du blog, ou les
 * titres d'article suivants passent alors en `h3`.
 */
export type RegistreIntitule = 'clair' | 'vert'

const ENCRES: Record<RegistreIntitule, string> = {
  clair: 'text-encre',
  vert: 'text-white',
}

const PUCES: Record<RegistreIntitule, string> = {
  clair: 'bg-primaire',
  vert: 'bg-white',
}

export function IntituleSection({
  intitule,
  registre = 'clair',
  id,
  className,
}: {
  intitule: string
  registre?: RegistreIntitule
  /** Donne a l'intitule le role de titre de sa section. */
  id?: string
  className?: string
}) {
  const Balise = id === undefined ? 'span' : 'h2'

  return (
    <Balise
      id={id}
      data-intitule
      className={classes(
        'inline-flex w-fit items-center gap-2.25 self-start justify-self-start etiquette text-[0.6875rem] tracking-[0.1em]',
        ENCRES[registre],
        className,
      )}
    >
      <span aria-hidden className={classes('size-1.5 shrink-0 rounded-pilule', PUCES[registre])} />
      {intitule}
    </Balise>
  )
}
