'use client'

import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

import { DESTINATION_FORMULAIRE } from '@/content/liens'
import type { ChampFormulaire, Contenu } from '@/content/types'
import { classes } from '@/components/shared/classes'

const FOCUS = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-encre'

// Aucune bordure : le champ se detache par son aplat blanc sur le panneau
// teinte, et c'est l'anneau de focus qui signale l'etat actif.
const CHAMP =
  'min-h-11.5 w-full rounded-bloc border-0 bg-white px-4 py-3.5 text-[0.9375rem] text-encre placeholder:text-indicatif focus:outline-2 focus:outline-offset-2 focus:outline-encre'

const LIBELLE = 'block text-[0.84375rem] leading-[1.4] text-encre-2'

const ID_FORMULAIRE = 'formulaire-contact'
const ID_TITRE_VOIE = 'titre-voie-contact'

/**
 * Les deux voies du design, en onglets : « Je cherche du personnel » et « Je
 * cherche un poste ». Les champs changent avec l'onglet.
 *
 * **Le bouton d'envoi est desactive tant que `DESTINATION_FORMULAIRE` est
 * vide**, et il l'est aujourd'hui. Cette application est un export statique :
 * aucun serveur pour recevoir un envoi, aucun stockage pour un CV (WEB-10). Un
 * formulaire qui avale une candidature sans destinataire est pire qu'un
 * formulaire absent — le candidat croit avoir postule et personne ne le sait.
 *
 * C'est le bouton desactive, et lui seul, qui tient cette garantie : rien ne
 * peut partir dans le vide, pas meme par la soumission implicite au clavier,
 * inoperante quand le bouton par defaut est desactive. La voie qui aboutit est
 * a cote — la carte Cal.com de la colonne de gauche, et la mention au bas de la
 * page. Voir decision 0019.
 *
 * `tests/liens.spec.ts` echoue tant que la constante est vide : un formulaire
 * mort ne peut pas partir en production par oubli.
 */
export function FormulaireContact({
  onglets,
  voies,
}: {
  onglets: Contenu['contact']['onglets']
  voies: Contenu['contact']['voies']
}) {
  const [onglet, setOnglet] = useState(0)
  const voie = voies[onglet]
  const branche = DESTINATION_FORMULAIRE !== ''

  return (
    <div className="flex min-w-0 flex-1 flex-col rounded-panneau bg-primaire/5 p-[clamp(1.1875rem,1.8vw,1.5625rem)]">
      <div className="flex gap-1 rounded-bloc bg-primaire/7 p-1">
        {onglets.map((libelle, indice) => {
          const actif = indice === onglet
          return (
            <button
              key={libelle}
              type="button"
              aria-pressed={actif}
              aria-controls={ID_FORMULAIRE}
              onClick={() => setOnglet(indice)}
              // Le design pose 39 px de haut ; sous 768 px la cible tactile
              // passe devant, et `e2e/adaptation.spec.ts` l'exige.
              className={classes(
                'min-h-11 flex-1 cursor-pointer rounded-bloc px-4 text-[0.90625rem] transition-colors duration-200 md:min-h-10',
                FOCUS,
                actif ? 'bg-white text-encre' : 'text-encre-2',
              )}
            >
              {libelle}
            </button>
          )
        })}
      </div>

      <div className="mt-7.5 flex items-center justify-between gap-4">
        <h2
          id={ID_TITRE_VOIE}
          className="min-w-0 font-titre text-[clamp(1.125rem,1.8vw,1.375rem)] leading-[1.15] tracking-[-0.02em] text-encre"
        >
          {voie.titre}
        </h2>
        <span className="shrink-0 text-right text-[0.8125rem] leading-[1.4] text-encre-2">
          {voie.mention}
        </span>
      </div>

      <form
        id={ID_FORMULAIRE}
        aria-labelledby={ID_TITRE_VOIE}
        action={branche ? DESTINATION_FORMULAIRE : undefined}
        method="post"
        encType="multipart/form-data"
        onSubmit={branche ? undefined : (evenement) => evenement.preventDefault()}
        className="mt-6.5 flex flex-col gap-3.5"
      >
        {/* Les deux voies partagent des `name` — `nom`, `courriel`. La cle de
            l'onglet remonte le formulaire au changement, sinon React garderait
            la saisie d'une voie dans les champs de l'autre. */}
        {voie.champs.map((champ) => (
          <Champ key={`${onglet}-${champ.nom}`} champ={champ} />
        ))}

        <button
          type="submit"
          disabled={!branche}
          className={classes(
            'mt-2.5 min-h-12.5 w-full rounded-bloc border-0 px-5 text-[1rem] transition-colors duration-200',
            FOCUS,
            // Desactive, la surface reste celle du design ; c'est le libelle qui
            // s'eteint. Un voile d'opacite sur du blanc pose sur le panneau
            // teinte effacerait le bouton au lieu de le montrer inactif.
            branche
              ? 'cursor-pointer bg-white text-encre'
              : 'cursor-not-allowed bg-white text-indicatif',
          )}
        >
          {voie.envoyer}
        </button>

        <span className="text-center text-[0.84375rem] leading-[1.5] text-encre-2">
          {voie.note}
        </span>
      </form>
    </div>
  )
}

/** Un champ, selon son type. Le libelle enveloppe le controle : pas d'id a tenir. */
function Champ({ champ }: { champ: ChampFormulaire }) {
  if (champ.type === 'choix') {
    return (
      <label className="flex flex-col gap-1.75">
        <span className={LIBELLE}>{champ.libelle}</span>
        {/* Le chevron est un noeud et non l'image de fond du design : un SVG en
            `background-image` ne suit pas la couleur du texte. */}
        <span className="relative flex">
          <select
            name={champ.nom}
            defaultValue={champ.options[0]}
            className={classes(CHAMP, 'cursor-pointer appearance-none pr-11')}
          >
            {champ.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <ChevronDown
            aria-hidden
            className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-encre-2"
          />
        </span>
      </label>
    )
  }

  if (champ.type === 'zone') {
    return (
      <label className="flex flex-col gap-1.75">
        <span className={LIBELLE}>{champ.libelle}</span>
        <textarea
          name={champ.nom}
          rows={4}
          placeholder={champ.exemple}
          className={classes(CHAMP, 'min-h-24 resize-y leading-[1.5]')}
        />
      </label>
    )
  }

  if (champ.type === 'fichier') {
    return (
      <label className="flex flex-col gap-1.75">
        <span className={LIBELLE}>{champ.libelle}</span>
        <span className="flex flex-col items-center gap-1.5 rounded-bloc border border-dashed border-trait-4 px-4 py-6 text-center">
          <span className="text-[0.9375rem] text-encre-2">{champ.titre}</span>
          <span className="text-[0.8125rem] text-encre-2">{champ.precision}</span>
          {/* Le controle natif est laisse visible : il est le seul a nommer le
              fichier retenu, et le design ne prevoit rien qui le dise. */}
          <input
            type="file"
            name={champ.nom}
            accept=".pdf,.doc,.docx"
            className="mt-1.5 min-h-11 max-w-full text-[0.75rem] text-encre-2 file:mr-3 file:min-h-9 file:cursor-pointer file:rounded-liste file:border-0 file:bg-white file:px-3 file:text-[0.75rem] file:text-encre"
          />
        </span>
      </label>
    )
  }

  return (
    <label className="flex flex-col gap-1.75">
      <span className={LIBELLE}>{champ.libelle}</span>
      <input
        type={champ.type === 'courriel' ? 'email' : 'text'}
        name={champ.nom}
        placeholder={champ.exemple}
        className={CHAMP}
      />
    </label>
  )
}
