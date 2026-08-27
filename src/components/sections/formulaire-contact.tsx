'use client'

import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

import { DESTINATION_FORMULAIRE } from '@/content/liens'
import type { ChampFormulaire, Contenu } from '@/content/types'
import { classes } from '@/components/shared/classes'

const FOCUS = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-encre'

// Aucune bordure : le champ se detache par son aplat blanc sur le panneau
// teinte, et c'est l'anneau de focus qui signale l'etat actif. Le design le pose
// un peu sous la cible tactile, que `e2e/adaptation.spec.ts` exige a 44 px sous
// 768 px — la cible passe devant, l'ecart ne se voit pas.
const CHAMP =
  'min-h-11 w-full rounded-marque border-0 bg-white px-3.75 py-3.25 text-base text-encre placeholder:text-indicatif focus:outline-2 focus:outline-offset-2 focus:outline-encre'

const LIBELLE = 'mb-1.75 block text-[0.65625rem] tracking-[0.08em] uppercase text-encre-2'

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
  className,
}: {
  onglets: Contenu['contact']['onglets']
  voies: Contenu['contact']['voies']
  /** Les classes du panneau, posees par la section : c'est elle qui range la rangee. */
  className: string
}) {
  const [onglet, setOnglet] = useState(0)
  const voie = voies[onglet]
  const branche = DESTINATION_FORMULAIRE !== ''

  return (
    <div className={className}>
      <div className="flex gap-1 rounded-bloc bg-white p-1">
        {onglets.map((libelle, indice) => {
          const actif = indice === onglet
          return (
            <button
              key={libelle}
              type="button"
              aria-pressed={actif}
              aria-controls={ID_FORMULAIRE}
              onClick={() => setOnglet(indice)}
              // Le design pose 40 px de haut ; sous 768 px la cible tactile
              // passe devant, et `e2e/adaptation.spec.ts` l'exige.
              className={classes(
                'min-h-11 flex-1 cursor-pointer rounded-liste px-3.5 text-[0.78125rem] transition-colors duration-200 md:min-h-10',
                FOCUS,
                actif ? 'bg-primaire text-white' : 'text-encre-2',
              )}
            >
              {libelle}
            </button>
          )
        })}
      </div>

      <div className="flex items-baseline justify-between gap-4">
        <h2
          id={ID_TITRE_VOIE}
          className="min-w-0 font-titre text-[clamp(1.125rem,1.5vw,1.375rem)] leading-[1.15] tracking-[-0.035em] text-encre"
        >
          {voie.titre}
        </h2>
        <span className="shrink-0 text-right text-[0.65625rem] tracking-[0.08em] uppercase text-encre-2">
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
        className="flex flex-1 flex-col gap-5"
      >
        <div className="flex flex-col gap-3">
          {/* Les deux voies partagent des `name` — `nom`, `courriel`. La cle de
              l'onglet remonte le formulaire au changement, sinon React garderait
              la saisie d'une voie dans les champs de l'autre. */}
          {voie.champs.map((champ) => (
            <Champ key={`${onglet}-${champ.nom}`} champ={champ} />
          ))}
        </div>

        <button
          type="submit"
          disabled={!branche}
          className={classes(
            'mt-auto min-h-12 w-full rounded-bloc border-0 px-5 text-[0.6875rem] tracking-[0.08em] uppercase transition-colors duration-200',
            FOCUS,
            // Desactive, la surface verte du design s'eteint en un lavis. Un
            // simple voile d'opacite sur le vert l'eclaircirait sans le montrer
            // inactif, et le libelle blanc y passerait sous le seuil AA.
            branche
              ? 'cursor-pointer bg-primaire text-white hover:bg-primaire-fonce'
              : 'cursor-not-allowed bg-primaire/12 text-encre-2',
          )}
        >
          {voie.envoyer}
        </button>

        <span className="text-center text-[0.78125rem] leading-[1.5] text-encre-2">
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
      <label className="block">
        <span className={LIBELLE}>{champ.libelle}</span>
        {/* Le chevron est un noeud et non l'image de fond du design : un SVG en
            `background-image` ne suit pas la couleur du texte. */}
        <span className="relative flex">
          <select
            name={champ.nom}
            defaultValue={champ.options[0]}
            className={classes(CHAMP, 'cursor-pointer appearance-none pr-11 text-encre-2')}
          >
            {champ.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <ChevronDown
            aria-hidden
            className="pointer-events-none absolute top-1/2 right-3.75 size-3.5 -translate-y-1/2 text-encre-2"
          />
        </span>
      </label>
    )
  }

  if (champ.type === 'zone') {
    return (
      <label className="block">
        <span className={LIBELLE}>{champ.libelle}</span>
        <textarea
          name={champ.nom}
          rows={3}
          placeholder={champ.exemple}
          className={classes(CHAMP, 'min-h-23 resize-y leading-[1.5]')}
        />
      </label>
    )
  }

  if (champ.type === 'fichier') {
    return (
      <label className="block">
        <span className={LIBELLE}>{champ.libelle}</span>
        <span className="flex flex-col items-center gap-1.5 rounded-marque bg-white px-3.75 py-5.5 text-center">
          <span className="text-[0.875rem] text-encre">{champ.titre}</span>
          <span className="text-[0.78125rem] text-encre-2">{champ.precision}</span>
          {/* Le controle natif est laisse visible : il est le seul a nommer le
              fichier retenu, et le design ne prevoit rien qui le dise. */}
          <input
            type="file"
            name={champ.nom}
            accept=".pdf,.doc,.docx"
            className="mt-1.5 min-h-11 max-w-full text-[0.75rem] text-encre-2 file:mr-3 file:min-h-9 file:cursor-pointer file:rounded-liste file:border-0 file:bg-primaire/7 file:px-3 file:text-[0.75rem] file:text-encre"
          />
        </span>
      </label>
    )
  }

  return (
    <label className="block">
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
