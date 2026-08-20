'use client'

import { ChevronDown, Upload } from 'lucide-react'

import { DESTINATION_FORMULAIRE } from '@/content/liens'
import type { ChampFormulaire, VoieContact } from '@/content/types'
import { classes } from '@/components/shared/classes'

const LABEL = 'etiquette-fine text-[0.625rem] tracking-[0.08em] text-encre-2'

// Les champs du design : aucune bordure, un aplat qui s'eclaircit au survol puis
// au focus. C'est ce changement qui signale l'etat, faute de bordure.
const CHAMP =
  'min-h-12.5 rounded-bloc border-0 bg-champ px-3.75 text-[0.90625rem] text-encre transition-[background-color] duration-[180ms] placeholder:text-indicatif hover:bg-champ-survol focus:bg-champ-actif focus:outline-2 focus:outline-offset-2 focus:outline-encre'

/**
 * Le formulaire d'une voie de la page Contact.
 *
 * **Le bouton d'envoi est desactive tant que `DESTINATION_FORMULAIRE` est
 * vide**, et il l'est aujourd'hui. Cette application est un export statique :
 * aucun serveur pour recevoir un envoi, aucun stockage pour un CV (WEB-10). Un
 * formulaire qui avale une candidature sans destinataire est pire qu'un
 * formulaire absent — le candidat croit avoir postule et personne ne le sait.
 *
 * C'est le bouton desactive, et lui seul, qui tient cette garantie : rien ne
 * peut partir dans le vide. La voie qui aboutit est a cote — la carte Cal.com
 * de la colonne de droite, et la mention au bas de la page. Voir decision 0019.
 *
 * `tests/liens.spec.ts` echoue tant que la constante est vide : un formulaire
 * mort ne peut pas partir en production par oubli.
 */
export function FormulaireContact({
  voie,
  entreprise,
}: {
  voie: VoieContact
  /** La premiere voie : registre sombre. */
  entreprise: boolean
}) {
  const branche = DESTINATION_FORMULAIRE !== ''

  // La zone de texte et le depot de fichier occupent toute la largeur ; les
  // autres champs se rangent en deux colonnes, comme dans le design.
  const enGrille = voie.champs.filter((champ) => champ.type !== 'zone' && champ.type !== 'fichier')
  const pleineLargeur = voie.champs.filter(
    (champ) => champ.type === 'zone' || champ.type === 'fichier',
  )

  return (
    <form
      action={branche ? DESTINATION_FORMULAIRE : undefined}
      method="post"
      encType="multipart/form-data"
      onSubmit={branche ? undefined : (evenement) => evenement.preventDefault()}
      className="flex flex-col gap-5"
    >
      <div className="grid grid-cols-1 gap-3.5 duo:grid-cols-2">
        {enGrille.map((champ) => (
          <Champ key={champ.nom} champ={champ} />
        ))}
      </div>

      {pleineLargeur.map((champ) => (
        <Champ key={champ.nom} champ={champ} />
      ))}

      <button
        type="submit"
        disabled={!branche}
        className={classes(
          'inline-flex min-h-11.5 items-center gap-2.5 self-start rounded-bloc border-0 px-5 etiquette whitespace-nowrap transition-[background-color,transform] duration-[220ms] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-encre',
          entreprise
            ? 'bg-encre text-white hover:bg-primaire'
            : 'bg-lime text-encre hover:-translate-y-0.5',
          branche ? 'cursor-pointer' : 'cursor-not-allowed opacity-45',
        )}
      >
        {voie.envoyer}
        {entreprise ? (
          <span aria-hidden className="text-lime">
            ✦
          </span>
        ) : null}
      </button>

      <span className="etiquette-fine text-[0.625rem] leading-[1.5] tracking-[0.06em] text-encre-3">
        {voie.note}
      </span>
    </form>
  )
}

/** Un champ, selon son type. Le libelle enveloppe le contrôle : pas d'id à tenir. */
function Champ({ champ }: { champ: ChampFormulaire }) {
  if (champ.type === 'choix') {
    return (
      <label className="flex flex-col gap-1.75">
        <span className={LABEL}>{champ.libelle}</span>
        {/* La flèche est un span et non l'image de fond du design : un SVG en
            `background-image` ne suit pas la couleur du texte. */}
        <span className="relative flex">
          <select
            name={champ.nom}
            defaultValue={champ.options[0]}
            className={classes(CHAMP, 'w-full cursor-pointer appearance-none pr-10.5')}
          >
            {champ.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <ChevronDown
            aria-hidden
            className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-encre-2"
          />
        </span>
      </label>
    )
  }

  if (champ.type === 'zone') {
    return (
      <label className="flex flex-col gap-1.75">
        <span className={LABEL}>{champ.libelle}</span>
        <textarea
          name={champ.nom}
          rows={4}
          placeholder={champ.exemple}
          className={classes(CHAMP, 'min-h-29.5 resize-y py-3.5 leading-[1.65]')}
        />
      </label>
    )
  }

  if (champ.type === 'fichier') {
    return (
      <label className="flex flex-col gap-1.75">
        <span className={LABEL}>{champ.libelle}</span>
        <span className="flex flex-wrap items-center gap-3.5 rounded-bloc bg-champ p-4.5">
          <span
            aria-hidden
            className="grid size-10 shrink-0 place-items-center rounded-marque bg-white text-encre"
          >
            <Upload className="size-4.25" />
          </span>
          <span className="flex min-w-0 flex-col gap-0.75">
            <span className="text-[0.875rem] font-medium text-encre">{champ.titre}</span>
            <span className="etiquette-fine text-[0.625rem] tracking-[0.07em] text-encre-3">
              {champ.precision}
            </span>
          </span>
          <input
            type="file"
            name={champ.nom}
            accept=".pdf,.doc,.docx"
            className="ml-auto min-h-11 max-w-full text-[0.75rem] text-encre-2 file:mr-3 file:min-h-9 file:cursor-pointer file:rounded-liste file:border-0 file:bg-white file:px-3 file:etiquette-fine file:text-encre"
          />
        </span>
      </label>
    )
  }

  return (
    <label className="flex flex-col gap-1.75">
      <span className={LABEL}>{champ.libelle}</span>
      <input
        type={champ.type === 'courriel' ? 'email' : 'text'}
        name={champ.nom}
        placeholder={champ.exemple}
        className={CHAMP}
      />
    </label>
  )
}
